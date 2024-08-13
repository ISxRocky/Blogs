import { createSearchParams, Link, useNavigate } from 'react-router-dom'

import Logo from './Logo'
import Button from '../forms/Button'
import { useSelector } from 'react-redux'
import Input from '../forms/Input'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Example from '../forms/Dropdown'

const Header = () => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const { user } = useSelector(state => state.auth)

  const handleEnterKey = e => {
    if (e.code === 'Enter') {
      navigate(`/?${createSearchParams({ q: searchInput })}`)
    }
  }


  return (
    <div className='fixed top-0 left-0 w-full flex items-center h-[70px] bg-gray-100'>
      <div className='w-[80%] flex mx-auto items-center justify-between'>
        <div className='flex items-center gap-x-10'>
          <Link to='/'>
            <Logo />
          </Link>


          <Input placeholder='Search' 
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={handleEnterKey}
          />
        </div>
        {user ? (
          <>
          <div className='flex'>
            <Example />
            </div>
          </>
        ) : (
          <div className='flex items-center gap-x-5'>
            <Link to='/login'>
              <Button className='px-8 rounded-full bg-gray-200 !text-black hover:bg-white hover:text-black'>
                Login
              </Button>
            </Link>
            <Link to='/register'>
              <Button className='px-6 rounded-full'>Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
export default Header
