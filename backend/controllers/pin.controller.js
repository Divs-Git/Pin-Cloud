import Pin from '../models/pin.model.js';
import User from '../models/user.model.js';
import sharp from 'sharp';
import ImageKit from 'imagekit';
import { response } from 'express';

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

export const createPin = async (req, res) => {
  const { title, description, link, board, tags, textOptions, canvasOptions } =
    req.body;

  const file = req.files.file;

  if (!title || !description || !file) {
    res.status(400).json({ message: 'Please enter all fields.' });
  }

  const parsedTextOptions = JSON.parse(textOptions || '{}');
  const parsedCanavasOptions = JSON.parse(canvasOptions || '{}');

  // console.log(title, description, link, board, tags);
  // console.dir(file);
  // console.dir(parsedTextOptions);
  // console.dir(parsedCanavasOptions);

  const metaData = await sharp(file.data).metadata();
  const originalOrientation =
    metaData.width < metaData.height ? 'portrait' : 'landscape';
  const originalAspectRatio = metaData.width / metaData.height;

  let clientAspectRatio;
  let width;
  let height;

  if (parsedCanavasOptions.size != 'original') {
    clientAspectRatio =
      parsedCanavasOptions.size.split(':')[0] /
      parsedCanavasOptions.size.split(':')[1];
  } else {
    parsedCanavasOptions.orientation = originalOrientation
      ? (clientAspectRatio = originalOrientation)
      : (clientAspectRatio = 1 / originalAspectRatio);
  }

  width = metaData.width;
  height = metaData.width / clientAspectRatio;

  const imageKit = new ImageKit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
  });

  const textLeftPosition = Math.round((parsedTextOptions.left * width) / 375);
  const textTopPosition = Math.round(
    (parsedTextOptions.top * height) / parsedCanavasOptions.height
  );

  let croppingStrategy = '';

  if (parsedCanavasOptions.size !== 'original') {
    if (originalAspectRatio > clientAspectRatio) {
      croppingStrategy = ',cm-pad_resize';
    }
  } else {
    if (
      originalOrientation === 'landscape' &&
      parsedCanavasOptions.orientation === 'portrait'
    ) {
      croppingStrategy = ',cm-pad_resize';
    }
  }

  const transformationString = `w-${width},h-${height}${croppingStrategy},bg-${parsedCanavasOptions.backgroundColor.substring(
    1
  )}${
    parsedTextOptions.text
      ? `,l-text,i-${parsedTextOptions.text},fs-${
          parsedTextOptions.fontSize * 2
        },lx-${textLeftPosition},ly-${textTopPosition},co-${parsedTextOptions.color.substring(
          1
        )},l-end`
      : ''
  }`;

  imageKit
    .upload({
      file: file.data,
      fileName: file.name,
      folder: 'pins',
      transformation: {
        pre: transformationString,
      },
    })
    .then(async (response) => {
      // console.dir(response);
      const newPin = await Pin.create({
        user: req.userId,
        title,
        description,
        link: link || '',
        board: link || null,
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : {},
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
