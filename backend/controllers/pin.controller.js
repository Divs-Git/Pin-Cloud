import Pin from '../models/pin.model.js';
import User from '../models/user.model.js';
import sharp from 'sharp';
import Imagekit from 'imagekit';
import { response } from 'express';
import Like from '../models/like.model.js';
import jwt from 'jsonwebtoken';
import Save from '../models/save.model.js';
import Board from '../models/board.model.js';

export const getPins = async (req, res) => {
  const pageNumber = Number(req.query.cursor) || 0;
  const search = req.query.search;
  const userId = req.query.userId;
  const boardId = req.query.boardId;
  const limit = 21;

  const pins = await Pin.find(
    search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { tags: { $in: [search] } },
          ],
        }
      : userId
      ? { user: userId }
      : boardId
      ? { board: boardId }
      : {}
  )
    .limit(limit)
    .skip(pageNumber * limit);

  const hasNextPage = pins.length === limit;

  res
    .status(200)
    .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
};

export const getPin = async (req, res) => {
  const { id } = req.params;

  const pin = await Pin.findById(id).populate(
    'user',
    'username image displayName'
  );

  res.status(200).json(pin);
};

export const interactionCheck = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;

  const likeCount = await Like.countDocuments({ pin: id });

  if (!token) {
    return res.status(200).json({ likeCount, isLiked: false, isSaved: false });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res
        .status(200)
        .json({ likeCount, isLiked: false, isSaved: false });
    }

    const userId = payload.userId;

    const isLiked = await Like.findOne({
      user: userId,
      pin: id,
    });

    const isSaved = await Save.findOne({
      user: userId,
      pin: id,
    });

    res.status(200).json({
      likeCount,
      isLiked: isLiked ? true : false,
      isSaved: isSaved ? true : false,
    });
  });
};

export const interact = async (req, res) => {
  const { id } = req.params;

  const { type } = req.body;

  if (type == 'like') {
    const isLiked = await Like.findOne({
      user: req.userId,
      pin: id,
    });

    if (isLiked) {
      await Like.deleteOne({
        user: req.userId,
        pin: id,
      });
    } else {
      await Like.create({
        user: req.userId,
        pin: id,
      });
    }
  } else {
    const isSaved = await Save.findOne({
      user: req.userId,
      pin: id,
    });

    if (isSaved) {
      await Save.deleteOne({
        user: req.userId,
        pin: id,
      });
    } else {
      await Save.create({
        user: req.userId,
        pin: id,
      });
    }
  }

  res.status(200).json({
    message: 'Successfull',
  });
};

export const createPin = async (req, res) => {
  const {
    title,
    description,
    link,
    board,
    tags,
    textOptions,
    canvasOptions,
    newBoard,
  } = req.body;

  const media = req.files.file;

  if ((!title, !description, !media)) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const parsedTextOptions = JSON.parse(textOptions || '{}');
  const parsedCanvasOptions = JSON.parse(canvasOptions || '{}');

  const metadata = await sharp(media.data).metadata();

  const originalOrientation =
    metadata.width < metadata.height ? 'portrait' : 'landscape';
  const originalAspectRatio = metadata.width / metadata.height;

  let clientAspectRatio;
  let width;
  let height;

  if (parsedCanvasOptions.size !== 'original') {
    clientAspectRatio =
      parsedCanvasOptions.size.split(':')[0] /
      parsedCanvasOptions.size.split(':')[1];
  } else {
    parsedCanvasOptions.orientation === originalOrientation
      ? (clientAspectRatio = originalOrientation)
      : (clientAspectRatio = 1 / originalAspectRatio);
  }

  width = metadata.width;
  height = metadata.width / clientAspectRatio;

  const imagekit = new Imagekit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
  });

  const textLeftPosition = Math.round((parsedTextOptions.left * width) / 375);
  const textTopPosition = Math.round(
    (parsedTextOptions.top * height) / parsedCanvasOptions.height
  );

  let croppingStrategy = '';

  if (parsedCanvasOptions.size !== 'original') {
    if (originalAspectRatio > clientAspectRatio) {
      croppingStrategy = ',cm-pad_resize';
    }
  } else {
    if (
      originalOrientation === 'landscape' &&
      parsedCanvasOptions.orientation === 'portrait'
    ) {
      croppingStrategy = ',cm-pad_resize';
    }
  }

  const transformationString = `w-${width},h-${height}${croppingStrategy},bg-${parsedCanvasOptions.backgroundColor.substring(
    1
  )}${
    parsedTextOptions.text
      ? `,l-text,i-${parsedTextOptions.text},fs-${
          parsedTextOptions.fontSize * 2.1
        },lx-${textLeftPosition},ly-${textTopPosition},co-${parsedTextOptions.color.substring(
          1
        )},l-end`
      : ''
  }`;

  imagekit
    .upload({
      file: media.data,
      fileName: media.name,
      folder: 'pins',
      transformation: {
        pre: transformationString,
      },
    })
    .then(async (response) => {
      let newBoardId;

      if (newBoard) {
        const res = await Board.create({
          title: newBoard,
          user: req.userId,
        });
        newBoardId = res._id;
      }

      const newPin = await Pin.create({
        user: req.userId,
        title,
        description,
        link: link || null,
        board: newBoardId || board || null,
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
        media: response.filePath,
        width: response.width,
        height: response.height,
      });
      return res.status(201).json(newPin);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};
