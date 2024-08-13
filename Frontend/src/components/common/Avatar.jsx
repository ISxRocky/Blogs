const Avatar = ({ author }) => {
  return (
    <div className='flex items-center gap-x-3'>
      <div className='w-6 h-6 rounded-full overflow-hidden'>
        <img
          src={author.profilePicture}
          alt={author.name}
          className='w-full h-full object-cover'
        />
      </div>
      <p className='text-gray-500 text-xs'>{author.fullName}</p>
    </div>
  )
}
export default Avatar
