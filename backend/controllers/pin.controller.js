import Pin from '../models/pin.model.js';
import User from '../models/user.model.js';

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
