import BlogCard from '@/components/blogs/BlogCard'
import Header from '@/components/common/Header'
import { fetchBlogsService } from '@/services/blog.service'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSearchParams } from 'react-router-dom'

const HomePage = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const { ref, inView } = useInView()

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['blogs'],
    queryFn: ({ pageParam }) =>
      fetchBlogsService(pageParam, searchParams.get('q')),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1
      }
      return undefined
    },

    select: data => ({
      ...data,
      pages: data.pages.flat().map(page => page.blogs),
    }),
  })

  useEffect(() => {
    if (searchParams.get('q')) {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  }, [searchParams])

  useEffect(() => {
    if (hasNextPage) {
      if (inView) {
        fetchNextPage()
      }
    }
  }, [hasNextPage, inView])

  return (
    <div>
      <Header />
      <div className='mt-[90px] w-[80%] mx-auto space-y-5'>
        {isLoading ? (
          <>Loading</>
        ) : (
          <>
            {data?.pages?.flat().map(blog => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}
            <div ref={ref}></div>
          </>
        )}
      </div>
    </div>
  )
}
export default HomePage
