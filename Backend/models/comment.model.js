import { Schema, model } from 'mongoose'

const commentModel = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
})

export const CommentModel = model('Comment', commentModel)
