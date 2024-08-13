import clsx from 'clsx'
import { forwardRef } from 'react'

const Button = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={clsx(
        'bg-dark hover:bg-dark/80 transition text-white font-medium rounded-lg h-11 flex items-center justify-center',
        className
      )}
      {...props}
      ref={ref}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
