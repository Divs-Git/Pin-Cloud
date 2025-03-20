import Comment from '../models/comment.model.js';
import User from '../models/user.model.js';

export const getPostsComment = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ pin: postId })
    .populate('user', 'username image displayName')
    .sort({ craetedAt: -1 });

  res.status(200).json(comments);
};
