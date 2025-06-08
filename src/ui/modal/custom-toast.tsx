import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'

export interface CustomToastProps {
  message: string
  title?: string
  type?: 'success' | 'info' | 'danger' | 'warning'
  onClose?: () => void,
  open: boolean
}

export function CustomToast({ open, message, title, type = 'info', onClose }: CustomToastProps) {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false)
      onClose?.()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      title: 'text-green-700',
      text: 'text-green-900',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      title: 'text-blue-700',
      text: 'text-blue-900',
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      title: 'text-red-700',
      text: 'text-red-900',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      title: 'text-yellow-700',
      text: 'text-yellow-900',
    },
  }

  const current = colors[type]

  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-500"
      enterFrom="opacity-0 translate-y-8"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-300"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-8"
    >
      <div className="fixed top-4 inset-x-0 flex justify-center items-start z-[9999]">
        <div className={`max-w-lg w-full rounded border-l-4 shadow-lg ${current.border} ${current.bg} p-5`}>
          <h2 className={`text-lg font-bold ${current.title}`}>{title}</h2>
          <div className={`${current.text} mb-4`}>{message}</div>
        </div>
      </div>
    </Transition>
  )
}
