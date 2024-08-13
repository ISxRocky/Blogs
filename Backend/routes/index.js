import express from 'express'
import authRoutes from './auth.routes.js'
import blogRoutes from './blog.routes.js'
// import { upload } from '../middlewares/multer.js'
// import { uploadImage } from '../helpers/cloudinary.js'
const router = express.Router()

// router.post('/file', upload.single('photo'), async (req, res) => {
//     if (req.file) {
//         const result = await uploadImage(req.file)
//         console.log(result)
//     }
//     return res.send('File uploaded successfully!')
// })

router.use('/auth', authRoutes)
router.use('/blog', blogRoutes)

export default router