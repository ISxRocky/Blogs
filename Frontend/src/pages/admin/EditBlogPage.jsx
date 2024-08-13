import Logo from '@/components/common/Logo'
import Button from '@/components/forms/Button'
import Editor from '@/components/forms/Editor'
import Textarea from '@/components/forms/Textarea'
import { editBlogService, fetchSingleBlogService } from '@/services/blog.service'
import { SETBLOG } from '@/store/blogSlice'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditBlogPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const params = useParams() 
  const { data, isLoading } = useQuery({
    queryKey: ['blog', params.blogId],
    queryFn: () => fetchSingleBlogService(params.blogId),
  })

  useEffect( () =>{
    if (data) {
        setBlogTitle(data.blog.title)
        setBlogContent(data.blog.content)
    }
  }, [data])

  const [blogTitle, setBlogTitle] = useState('')
  const [blogContent, setBlogContent] = useState('')

  const handleTitleKeyDown = e => {
    if (e.code === 'Enter') {
      e.preventDefault()
    }
  }

  const mutation = useMutation({
    mutationFn:(value) => editBlogService(value, params.blogId),
    onSuccess: () => {
        navigate('/')
    },
    onError: error => {
        toast.error(error)
      },
  })

  const handleBlog = () => {
    mutation.mutate({
        title: blogTitle,
        content: blogContent,
  
    })
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
          value={blogTitle}
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
export default EditBlogPage
