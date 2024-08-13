import express from 'express'
import{ isLoggedIn, isAdmin } from '../middlewares/auth.middleware.js'
import { upload }  from '../middlewares/multer.js'
import {
    createBlog,
    createComment,
    deleteBlog,
    fetchBlogs,
    fetchComments,
    fetchSingleBlog,

    fetchUserBlogs,

    likeBlog,
    updateBlog,
} from '../controllers/blog.controller.js'
import { findUser } from '../services/user.service.js'

const router = express.Router()

router.get('/', fetchBlogs)
router.get('/user', isLoggedIn, isAdmin, fetchUserBlogs )
router.post('/', isLoggedIn, isAdmin, upload.single('file'), createBlog)
router.get('/:id', fetchSingleBlog)
router.get('/comment/:id', fetchComments)

router.put('/:id', isLoggedIn, isAdmin, upload.single('file'), updateBlog)
router.delete('/:id', isLoggedIn, isAdmin, deleteBlog)

router.put('/like/:id', isLoggedIn, likeBlog)
router.put('/comment/:id', isLoggedIn, createComment)


export default router