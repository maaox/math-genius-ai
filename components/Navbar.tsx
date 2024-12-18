'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { FaFacebookF, FaTiktok } from 'react-icons/fa'
import { RiWhatsappFill } from 'react-icons/ri'

// import AJSLogo from '@/components/logo'
// import { Button } from '@/components/ui/button' // Componente de shadcn/ui
// import Image from 'next/image'

const MENU_OPTIONS = [
  { text: 'Inicio', path: '/' },
  { text: 'Fichas', path: '/fichas-de-multiplicacion' },
  { text: 'Ejercicios', path: '/generador-de-ejercicios' },
  { text: 'Examenes', path: '/generador-de-examenes' },
  { text: 'Chat PepeIA', path: '/chat-tutor-academico' },
]

export const Navbar = () => {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="z-50 w-full">
      {/* Círculo de Sombra */}
      {/* <div className="z-50 absolute top-0 md:top-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full shadow-lg"></div> */}

      {/* Menu */}
      <div className="z-50 w-full bg-white fixed top-0 left-0 shadow-lg">
        {/* Logo */}
        {/* <div className="absolute top-0 md:top-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-24 md:w-28 md:h-28 p-4 md:p-5 bg-white rounded-full">
          <Link href="/" aria-label="Academia José Sabogal Logo" className="w-20 h-20">
            <Image src="images/KAI.png" alt="Pepe IA Robot" fill className="object-contain drop-shadow-2xl" priority />
          </Link>
        </div> */}

        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Botón de regreso para móviles */}
            {/* <div className="flex items-center lg:hidden">
              <Button className="rounded-full text-base" variant="secondary" size="sm" asChild>
                <Link href="/">Regresar</Link>
              </Button>
            </div> */}

            {/* Navegación de escritorio */}
            <div className="hidden lg:flex justify-between w-full">
              {/* Enlaces del menú izquierdo */}
              <div className="flex items-center space-x-10">
                {MENU_OPTIONS.slice(0, 3).map((option) => (
                  <Link
                    key={option.text}
                    href={option.path}
                    className={`text-lg font-bold
                    ${pathname === option.path ? 'text-secondary' : 'text-primary'}`}
                  >
                    {option.text}
                  </Link>
                ))}
              </div>

              {/* Enlaces del menú derecho */}
              <div className="flex items-center space-x-10">
                {MENU_OPTIONS.slice(3).map((option) => (
                  <Link
                    key={option.text}
                    href={option.path}
                    className={`text-lg font-bold
                    ${pathname === option.path ? 'text-secondary' : 'text-primary'}`}
                  >
                    {option.text}
                  </Link>
                ))}

                {/* Botón de regreso */}
                {/*  <Button className="rounded-full text-base" variant="secondary" size="lg" asChild>
                  <Link href="/">Regresar</Link>
                </Button> */}
              </div>
            </div>

            {/* Botón de menú para móviles */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                aria-label="Desplegar menú de opciones"
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center text-primary"
              >
                <span className="text-sm font-bold mr-1">MENU</span>
                {showMenu ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {showMenu && (
        <div className="z-40 fixed top-16 left-0 w-full h-1/2 bg-white flex flex-col items-center justify-center space-y-4 shadow-lg">
          {MENU_OPTIONS.map((option) => (
            <Link
              key={option.text}
              href={option.path}
              className={`text-2xl font-bold
                ${pathname === option.path ? 'text-secondary' : 'text-primary'}`}
              onClick={() => setShowMenu(false)}
            >
              {option.text}
            </Link>
          ))}

          {/* Iconos de redes sociales */}
          <div className="flex space-x-4 mt-8">
            <Link
              href="https://wa.me/929660303"
              target="_blank"
              rel="noreferrer"
              className="text-white bg-primary p-2 rounded-full"
            >
              <RiWhatsappFill size={24} />
            </Link>
            <Link
              href="https://www.tiktok.com/@academiajosesabogal"
              target="_blank"
              rel="noreferrer"
              className="text-white bg-primary p-2 rounded-full"
            >
              <FaTiktok size={24} />
            </Link>
            <Link
              href="https://www.facebook.com/academiajosesabogal"
              target="_blank"
              rel="noreferrer"
              className="text-white bg-primary p-2 rounded-full"
            >
              <FaFacebookF size={24} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
