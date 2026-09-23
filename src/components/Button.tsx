import type {
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = [
    'button',
    `button--${variant}`,
    fullWidth
      ? 'button--full-width'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}