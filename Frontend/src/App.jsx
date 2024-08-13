import React, { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from './layouts/Adminlayout'
// import HomePage from './pages/HomePage'
// import LoginPage from './pages/LoginPage'
// import RegisterPage from './pages/RegisterPage'

const HomePage = lazy(() => import('./pages/HomePage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const NotifyEmailPage = lazy(() => import('./pages/NotifyEmail'))
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmail'))

const SingleBlogPage = lazy(() => import('./pages/SingleBlogPage'))

// Admin Pages
const AdminCreateBlogPage = lazy(() => import('./pages/admin/CreateBlogPage'))
const AdminPublishBlogPage = lazy(() => import('./pages/admin/PublishBlogPage'))
const AdminEditBlogPage = lazy(() => import('./pages/admin/EditBlogPage'))
const AdminProfilePage = lazy(() => import('./pages/admin/ProfilePage'))
// const AdminBlogsPage = lazy(() => import('./pages/admin/BlogsPage'))



const  App = () => {
  return (
    <>
    <Suspense fallback={<h1>Loading....</h1>}>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/notify-email' element={<NotifyEmailPage/>} />
      <Route path='/verify-email/:token' element={<VerifyEmailPage/>} />
      <Route path='/blog/:blogId'element={<SingleBlogPage />} />
      <Route path='/admin/*' element={<AdminLayout />}>
      <Route path='create' element={<AdminCreateBlogPage />}  />
      <Route path='publish'element={<AdminPublishBlogPage />} />
      <Route path='edit/:blogId'element={<AdminEditBlogPage />} />
      <Route path='profile'element={<AdminProfilePage />} />

    </Route>
    </Routes>
    </Suspense>
    <Toaster position='top-center' reverseOrder={false}/>
    </>
  )
}

export default App