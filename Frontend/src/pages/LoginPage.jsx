import { Field, Label } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import Input from '@/components/forms/Input'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { loginUserService } from '../services/auth.service'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { SETUSER } from '../store/userSlice'
import Button from '../components/forms/Button'

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(formSchema),
  })

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUserService,
    onSuccess: data => {
      dispatch(SETUSER(data.user))
      localStorage.setItem('access-token', data.accessToken)
      navigate('/')
    },
    onError: error => {
      // console.log(error)
      toast.error(error)
    },
  })

  const onSubmit = values => {
    mutation.mutate(values)
  }

  return (
    <div className='h-screen flex items-center justify-center flex-col'>
      <h1 className='font-play text-3xl font-bold'>Welcome back!</h1>

      <form
        className='mt-10 w-[350px] space-y-3'
        onSubmit={handleSubmit(onSubmit)}>
        <Field className='flex flex-col space-y-1'>
          <Label className='text-sm'>Email</Label>
          <Input
            {...register('email')}
            type='email'
          />
          {errors.email && (
            <p className='text-red-500 text-xs'>{errors.email.message}</p>
          )}
        </Field>

        <Field className='flex flex-col space-y-1'>
          <Label className='text-sm'>Password</Label>
          <Input
            {...register('password')}
            type='password'
          />
          {errors.password && (
            <p className='text-red-500 text-xs'>{errors.password.message}</p>
          )}
        </Field>

        <Button
          type='submit'
          className='w-full !mt-10'>
          Sign In
        </Button>
      </form>

      <div className='mt-5'>
        <p className='text-sm'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='hover:underline'>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
export default LoginPage