import { Field, Label } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import Input from '../components/forms/Input'
import Button from '../components/forms/Button'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerUserService } from '../services/auth.service'
import toast from 'react-hot-toast'

const formSchema = Yup.object().shape({
  firstName:Yup.string().required('FirstName is required'),
  lastName:Yup.string().required('LastName is required'),
  email:Yup.string()
  .email('Please provide a valid email address')
  .required('Email is required'),
  password:Yup.string().required('Password is required'),
})

const RegisterPage = () => {
  const navigate = useNavigate()
  const {register, handleSubmit, formState:{errors} } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver:yupResolver(formSchema),
  })

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: registerUserService,
    onSuccess:() =>{
      toast.success('Registration Successfully!')
      navigate('/notify-email')
    },
    onError: error => {
      toast.error(error)
    },
  })

  const onSubmit = values => {
    mutation.mutate(values)
  }

  return (
    <div className='h-screen flex items-center justify-center flex-col'>
      <h1 className='font-play text-3xl font-bold'>Create an Account</h1>

      <form className='mt-10  w-[350px] space-y-3' onSubmit={handleSubmit(onSubmit)}>

      <Field className='flex flex-col space-y-1'>
          <Label>First Name</Label>
          <Input {...register('firstName')} type='text'/>
          {errors.firstName && (
            <p className='text-red-500 text-xs'>{errors.firstName.message}</p>
          )}
        </Field>

        <Field className='flex flex-col space-y-1'>
          <Label>Last Name</Label>
          <Input {...register('lastName')} type='text'/>
          {errors.lastName && (
            <p className='text-red-500 text-xs'>{errors.lastName.message}</p>
          )}
        </Field>

        <Field className='flex flex-col space-y-1'>
          <Label>Email</Label>
          <Input {...register('email')} type='email'/>
          {errors.email && (
            <p className='text-red-500 text-xs'>{errors.email.message}</p>
          )}
        </Field>

        <Field className='flex flex-col space-y-1'>
          <Label>Password</Label>
          <Input {...register('password')} type='password'/>
          {errors.password && (
            <p className='text-red-500 text-xs'>{errors.password.message}</p>
          )}
        </Field>

        <Button type='submit' className='w-full !mt-10'>Sign Up</Button>
      </form>

      <div className='mt-5'>
        <p className='text-sm'>Already have an account? <Link to='/login' className='hover:underline'>Login</Link></p>
      </div>
    </div>
  
  )
}

export default RegisterPage