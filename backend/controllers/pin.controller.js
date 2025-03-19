import Pin from '../models/pin.model.js';

export const getPins = async (req, res) => {
  const pageNumber = Number(req.query.cursor) || 0;
  const limit = 21;
  const pins = await Pin.find()
    .limit(limit)
    .skip(pageNumber * limit);

  const hasNextPage = pins.length === limit;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  res
    .status(200)
    .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
};
