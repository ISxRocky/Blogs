import { fetchCommentsService } from '@/services/blog.service'
import React, { useEffect, useState } from 'react'


const CommentsSection = ({ blogId }) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await fetchCommentsService(blogId)
        setComments(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [blogId])

  if (isLoading) {
    return <div>Loading comments...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Comments</h2>
      {comments.map(comment => (
        <div key={comment._id} className='mb-4'>
          <p><strong>{comment.author.name}</strong></p>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  )
}

export default CommentsSection
