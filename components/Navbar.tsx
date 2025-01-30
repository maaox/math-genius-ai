'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const MENU_OPTIONS = [
  { text: 'Fichas', path: '/fichas-de-multiplicacion' },
  { text: 'Ejercicios', path: '/generador-de-ejercicios' },
  { text: 'Examenes', path: '/generador-de-examenes' },
  { text: 'KAI Chat', path: '/chat-tutor-academico' },
]

export const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
          <Image src="images/KAI.png" alt="Flowbite Logo" fill className="object-contain" priority />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#6559ff] rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 "
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} z-50 w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-[#6559ff] rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {MENU_OPTIONS.map((option) => (
              <li key={option.text}>
                <Link
                  href={option.path}
                  className={`font-bold block p-2 rounded-md ${
                    pathname === option.path ? 'text-[#6559ff] bg-violet-50 md:bg-transparent' : 'text-[#293745]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {option.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
