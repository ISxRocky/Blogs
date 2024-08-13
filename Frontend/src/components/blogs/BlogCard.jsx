import { Link } from 'react-router-dom'
import moment from 'moment'
import { AiOutlineLike } from 'react-icons/ai'
import { FaRegCommentAlt } from 'react-icons/fa'

import Avatar from '../common/Avatar'

const BlogCard = ({ blog }) => {
  return (
    <div className='w-[600px] h-full flex justify-between'>
      <div className='h-full'>
        <Avatar author={blog.author} />
        <Link to={`/blog/${blog._id}`}>
          <h1 className='mt-3 text-xl font-bold'>{blog.title}</h1>
        </Link>

        <div className='mt-10 flex gap-x-5'>
          <p className='text-sm text-gray-600'>
            {moment(blog.createdAt).format('MMMM Do YYYY')}
          </p>

          <div className='flex items-center gap-x-1 text-gray-600'>
            <AiOutlineLike size={20} />
            <p className=''>{blog.likesCount}</p>
          </div>

          <div className='flex items-center gap-x-1 text-gray-600'>
            <FaRegCommentAlt size={16} />
            <p className=''>{blog.commentCount}</p>
          </div>
        </div>
      </div>
      <div className='w-[150px] h-[150px]'>
        <img
          src={blog.coverImage.url}
          alt=''
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  )
}
export default BlogCard
