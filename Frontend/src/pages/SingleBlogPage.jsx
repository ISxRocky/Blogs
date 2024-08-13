import Header from '@/components/common/Header'
import {
  addComment,
  addLiketoBlog,
  fetchSingleBlogService,
} from '@/services/blog.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Parser } from 'html-to-react'
import { PiHandsClappingThin } from 'react-icons/pi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Button from '@/components/forms/Button'
import CommentsSection from '@/components/blogs/Comment'


const SingleBlogPage = () => {
  const params = useParams()
  const queryClient = useQueryClient()
  const { user } = useSelector(state => state.auth)
  const { data, isLoading } = useQuery({
    queryKey: ['blog', params.blogId],
    queryFn: () => fetchSingleBlogService(params.blogId),
  })

  const [loading, setLoading] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [content, setContent] = useState('')
  

  useEffect(() => {
    setLikesCount(data?.blog.likesCount)
  }, [data])

  const handleLikeCount = async () => {
    try {
      setLoading(true)
      setLikesCount(count => count + 1)
      if (data?.blog.likes.includes(user._id)) {
        setLikesCount(count => count - 1)
        await addLiketoBlog(params.blogId)
      } else {
        setLikesCount(count => count + 1)
        await addLiketoBlog(params.blogId)
      }
      queryClient.invalidateQueries({ queryKey: ['blog', params.blogId] })
    } catch (error) {
      toast.error(error)
    }
  }

  const mutation = useMutation({
    mutationKey: ['create-comment'],
    mutationFn: value => addComment(value, params.blogId),
    onSuccess: () => {
      toast.success('Comment added successfully!')
    },
    onError: error => {
      toast.error(error)
    },
  })

  return (
    <div>
      <Header />
      <div className='mt-[90px] w-[80%] mx-auto space-y-5 mb-10'>
        {isLoading ? (
          <>Loading</>
        ) : (
          <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-bold'>{data.blog?.title}</h1>

            <div className='flex gap-x-3 mt-5'>
              <div className='h-11 w-11 rounded-full overflow-hidden'>
                <img
                  src={data.blog?.author.profilePicture}
                  alt=''
                  className='w-full h-full object-cover'
                />
              </div>
              <div>
                <p className='font-medium'>{data.blog?.author.fullName}</p>
                <p className='text-sm text-gray-500'>
                  {data.blog?.author.email}
                </p>
              </div>
            </div>

            <div className='border-t border-b py-2 w-[80%] mt-5 flex gap-x-4'>
              <button
                onClick={handleLikeCount}
                className='flex gap-x-2 text-gray-600'>
                <PiHandsClappingThin size={24} />
                <p>{likesCount}</p>
              </button>
            </div>

            <div className='my-10 h-[400px] w-[80%]'>
              <img
                src={data.blog.coverImage.url}
                alt=''
                className='w-full h-full object-cover'
              />
            </div>

            {Parser().parse(data.blog.content)}
          </div>
        )}

        <div>
          <strong>Comment</strong>
          <CommentsSection />
        </div>

        <div className='w-[80%]'>
          <textarea
            onChange={e => setContent(e.target.value)}
            placeholder='Write a comment'
            className='bg-gray-100 my-3 p-2 text-sm focus-visible:outline-none w-[50%] resize-none h-[100px]'></textarea>
          <Button
            className='px-3'
            onClick={() => {
              mutation.mutate(content)
              setContent('')
            }}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}
export default SingleBlogPage