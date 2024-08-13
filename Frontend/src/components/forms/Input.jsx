import { forwardRef } from 'react'
import clsx from 'clsx'
import { Input as HeadInput } from '@headlessui/react'

const Input = forwardRef(({ type = 'text', className, ...props }, ref) => {
  return (
    <HeadInput
      className={clsx(
        'p-3 border border-gray-700 text-sm text-gray-800 focus:border-dark focus-visible:outline-none rounded-lg',
        className
      )}
      type={type}
      {...props}
      ref={ref}
    />
  )
})

Input.displayName = 'Input'

export default Input
