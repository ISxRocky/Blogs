import { BadRequestError, UnauthorizedError } from '../helpers/error-handlers.js'
import { deleteImage, uploadImage } from '../helpers/cloudinary.js'
import { BlogModel } from '../models/blog.model.js'
import { findBlogById } from '../services/blog.service.js'
import { CommentModel } from '../models/comment.model.js'
import { findCommentById } from '../services/comment.service.js'
import { ObjectId } from 'mongodb'


export const createBlog = async (req, res) => {
    const { title, content, tags, shortDescription} = req.body

    if(!req.file) {
        throw new BadRequestError('Cover Image is Required')
    }

    const result = await uploadImage(req.file)
    if(!result.public_id){
        throw new BadRequestError('Failed to upload cover image')
    }

    const blog = new BlogModel({
        title,
        content,
        tags,
        shortDescription,
        author: req.user.id,
        coverImage:{
            publicId: result.public_id,
            url: result.secure_url,
        },
    })

    await blog.save()

    return res.status(200).json({
        message: 'Blog created successfully',
        blog,
    })
}

export const updateBlog = async (req, res) => {
    try {
      const { title, content, tags, shortDescription} = req.body
      const blog = await findBlogById(req.params.id)
  
      if (blog.author.toString() !== req.user.id) {
        throw new UnauthorizedError(
          'Unauthorized. Only the author can update the blog'
        )
      }
  
      let imageResult
  
      if (req.file) {
        await deleteImage(blog.coverImage.publicId)
  
        imageResult = await uploadImage(req.file)
        if (!imageResult.public_id) {
          throw new BadRequestError('Error while uploading image')
        }
      }
  
      const updatedBlog = await BlogModel.findByIdAndUpdate(
        blog._id,
        {
          $set: {
            title,
            content,
            shortDescription,
            tags,
            ...(imageResult && {
              coverImage: {
                publicId: imageResult.public_id,
                url: imageResult.secure_url,
              },
            }),
          },
        },
        { new: true }
      )
  
      return res.status(200).json({
        message: 'Blog updated successfully',
        blog: updatedBlog,
      })
    } catch (error) {
      console.log(error)
      throw new BadRequestError('Error updating blog')
    }
}
  
export const deleteBlog = async (req, res) => {
    const blog = await findBlogById(req.params.id)
  
    if (blog.author.toString() !== req.user.id) {
      throw new UnauthorizedError(
        'Unauthorized. Only the author can delete the blog'
      )
    }
  
    await deleteImage(blog.coverImage.publicId)
    await BlogModel.findByIdAndDelete(blog._id)
  
    return res.status(200).json({
      message: 'Blog deleted successfully',
    })
}
  
export const fetchSingleBlog = async (req, res) => {
    try {
      const blog = await findBlogById(req.params.id)
      console.log(blog)
  
      await blog.populate('author', 'email profilePicture firstName lastName')
  
      return res.status(200).json({
        message: 'Blog fetched successfully',
        blog,
      })
    } catch (error) {
      console.log(error)
      throw new BadRequestError('Error fetching blog')
    }
}

export const fetchBlogs = async (req, res) => {
  try {
    const search = req.query.search || ''
    const page = +req.query.page || 1
    const limit = +req.query.limit || 5

    const skip = (page - 1) * limit

    const query = { title: { $regex: search, $options: 'i' } }

    const blogs = await BlogModel.find(query)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('author', 'email profilePicture firstName lastName')

    const total = await BlogModel.countDocuments(query)

    const totalPages = Math.ceil(total / limit)

    return res.status(200).json({
      blogs,
      total,
      page,
      totalPages,
    })
  } catch (error) {
    console.log(error)
    throw new BadRequestError('Error fetching blogs')
  }
}

export const likeBlog = async (req, res) => {
  const blog = await findBlogById(req.params.id)

  const isAlreadyLiked = blog.likes.includes(req.user.id)

  const updatedBlog = await BlogModel.findOneAndUpdate(
    { _id: req.params.id },

    isAlreadyLiked
      ? {
          $inc: { likesCount: -1 },
          $pull: { likes: req.user.id },
        }
      : { $inc: { likesCount: 1 }, $push: { likes: req.user.id } }
  )

  res.status(200).json(updatedBlog)
}

export const createComment = async (req, res) => {
  const { content } = req.body

  const blog = await findBlogById(req.params.id)

  const comment = await CommentModel.create({
    content,
    author: req.user.id,
    blog: blog._id,
  })

  await BlogModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $inc: {
        commentCount: 1,
      },
    }
  )

  return res.status(201).json({
    message: 'Comment created successfully',
    comment,
  })
}

/**
 * READ => Also populate the author of the comment
 * UPDATE => Only update your blog
 * DELTE => Only delete your blog
 */

export const fetchComments = async (req, res) => {
  try {
    const comment = await CommentModel.find({blog: req.params.id}).populate('author', 'email profilePicture firstName lastName')
    return res.json(comment)
    } catch (error){
      console.log(error)
      throw new BadRequestError('Error fetching comment')
    }
  }

export const fetchUserBlogs = async (req, res) => {
  try{
    console.log(req.user)
    const blogs= await BlogModel.find({author:req.user.id})
  return res.status(200).json(blogs)
  }catch (error){
    console.log(error)
} 
}