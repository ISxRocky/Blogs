import Logo from '@/components/common/Logo'
import Button from '@/components/forms/Button'
import Editor from '@/components/forms/Editor'
import Textarea from '@/components/forms/Textarea'
import { SETBLOG } from '@/store/blogSlice'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const CreateBlogPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogContent, setBlogContent] = useState('')

  const handleTitleKeyDown = e => {
    if (e.code === 'Enter') {
      e.preventDefault()
    }
  }

  const handleBlog = () => {
    if (blogTitle.trim() === '' || blogContent.trim() === '') {
      toast.error('Please fill both fields')
      return
    }
    dispatch(SETBLOG({ title: blogTitle, content: blogContent }))
    navigate('/admin/publish')
  }

  return (
    <div className='w-full'>
      <div className='fixed top-0 left-0 w-full flex items-center h-[60px] bg-gray-100'>
        <div className='w-full px-5 md:px-0 md:w-[80%] flex mx-auto items-center justify-between'>
          <div className=''>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          <div className=''>
            <Button
              onClick={handleBlog}
              className='w-[120px] text-sm !rounded-full h-10 bg-green-600 hover:bg-green-700'>
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className='mt-[90px] w-full px-5 md:px-0 md:w-[80%] mx-auto'>
        <Textarea
          onChange={e => setBlogTitle(e.target.value)}
          onKeyDown={handleTitleKeyDown}
          placeholder='Blog Title'
        />

        <div className=''>
          <Editor
            value={blogContent}
            setValue={setBlogContent}
          />
        </div>
      </div>
    </div>
  )
}
export default CreateBlogPage
