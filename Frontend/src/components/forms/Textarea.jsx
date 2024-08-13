import clsx from 'clsx'
import { forwardRef } from 'react'

const Textarea = forwardRef(({ className, placeholder, ...props }, ref) => {
  return (
    <textarea
      {...props}
      placeholder={placeholder}
      className={clsx(
        'w-full resize-none text-neutral-700 p-3 border-none focus-visible:outline-none font-semibold text-2xl leading-6',
        className
      )}
      ref={ref}
    />
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
