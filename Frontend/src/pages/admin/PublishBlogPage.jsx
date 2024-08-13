import Logo from '@/components/common/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Textarea from '@/components/forms/Textarea'
import ReactSelect from 'react-select'
import { useMutation } from '@tanstack/react-query'
import { createBlogService } from '@/services/blog.service'
import toast from 'react-hot-toast'
import { REMOVEBLOG } from '@/store/blogSlice'
import Button from '@/components/forms/Button'
import { tagOptions } from '../../../utils'


const PublishBlogPage = () => {
  const dispatch = useDispatch()
  const { blog } = useSelector(state => state.blog)
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [tags, setTags] = useState([])
  const [shortDescription, setShortDescription] = useState('')

  useEffect(() => {
    if (!blog) {
      navigate('/admin/create')
    }
  }, [blog])

  const mutation = useMutation({
    mutationKey: ['create-blog'],
    mutationFn: createBlogService,
    onSuccess: () => {
      toast.success('Blog published successfully!')
      dispatch(REMOVEBLOG())
      navigate('/')
    },
    onError: error => {
      toast.error(error)
    },
  })

  const blogTags = useMemo(() => tagOptions, [tagOptions])

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(acceptedFile =>
      Object.assign(acceptedFile, {
        preview: URL.createObjectURL(acceptedFile),
      })
    )
    setFile(acceptedFiles[0])
  })

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
  })

  const handleBlogPublish = async () => {
    const formData = new FormData()
    formData.append('title', blog.title)
    formData.append('content', blog.content)
    formData.append('file', file)
    formData.append('shortDescription', shortDescription)
    tags.forEach(tag => {
      formData.append('tags', tag.value)
    })

    mutation.mutate(formData)
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
              onClick={handleBlogPublish}
              className='w-[120px] text-sm !rounded-full h-10 bg-green-600 hover:bg-green-700'>
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className='w-full px-5 md:px-0 mx-auto md:w-[80%] mt-[90px] flex flex-col md:gap-x-10 md:flex-row'>
        <div className='w-full md:w-1/2 flex flex-col'>
          <div>
            {file ? (
              <div className='w-full  bg-gray-200 h-[400px] rounded-md cursor-pointer'>
                <img
                  src={file.preview}
                  alt=''
                  className='h-full w-full object-cover overflow-hidden rounded-md'
                />
              </div>
            ) : (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='w-full  bg-gray-200 h-[400px] rounded-md cursor-pointer'>
                  <img
                    src='https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
                    alt=''
                    className='h-full w-full object-cover overflow-hidden rounded-md'
                  />
                </div>
              </div>
            )}
          </div>

          <div className='mt-10 space-y-2'>
            <p className='text-gray-600 text-sm'>Blog Title</p>
            <h1 className='text-3xl font-semibold'>{blog.title}</h1>
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <div className='space-y-2'>
            <p className='text-gray-600 text-sm'>Short Description</p>
            <Textarea
              onChange={e => setShortDescription(e.target.value)}
              className='bg-gray-100 text-sm !font-normal h-[200px]'
            />
          </div>

          <div className='space-y-2 mt-10'>
            <p className='text-gray-600 text-sm'>Tags</p>
            <ReactSelect
              options={blogTags}
              isMulti
              onChange={value => setTags(value)}
              value={tags}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PublishBlogPage
