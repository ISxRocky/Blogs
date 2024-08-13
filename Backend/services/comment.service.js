import { NotFoundError } from '../helpers/error-handlers.js'
import { CommentModel } from '../models/comment.model.js'

export const findCommentById = async id => {
    const comment = await CommentModel.find({blog: id});
    if (!comment) throw new NotFoundError(`Comment with id ${id} not found`);
    return comment;
  };
