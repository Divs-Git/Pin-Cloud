import Pin from '../models/pin.model.js';

export const getPins = async (req, res) => {
  const pageNumber = Number(req.query.cursor) || 0;
  const search = req.query.search;
  const limit = 21;

  const pins = await Pin.find(
    search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { tags: { $in: [search] } },
          ],
        }
      : {}
  )
    .limit(limit)
    .skip(pageNumber * limit);

  const hasNextPage = pins.length === limit;

  res
    .status(200)
    .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
};
