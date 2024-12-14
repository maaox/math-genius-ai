'use client'

import Link from 'next/link'
import { FaFacebookF, FaTiktok } from 'react-icons/fa'
import { ImYoutube } from 'react-icons/im'
import { RiWhatsappFill } from 'react-icons/ri'

import AJSLogo from '@/components/logo'

const Footer = () => (
  <footer className="bg-[#13426e] text-white">
    <div className="container mx-auto px-4">
      <div className="py-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex justify-between items-center md:flex-col md:max-w-min">
          {/* Logo */}
          <Link href="/" aria-label="Academia José Sabogal Logo">
            <div className="w-16 h-16 md:w-20 md:h-20 p-2 md:p-3 bg-white rounded-full hover:opacity-80 transition-opacity">
              <AJSLogo />
            </div>
          </Link>

          {/* Redes Sociales */}
          <ul className="flex items-center gap-2">
            <li className="w-11 h-11 p-2 bg-white text-[#13426e] rounded-full hover:opacity-80">
              <Link
                href="https://wa.me/929660303"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Academia José Sabogal"
              >
                <RiWhatsappFill className="w-full h-full" />
              </Link>
            </li>
            <li className="w-11 h-11 p-2 bg-white text-[#13426e] rounded-full hover:opacity-80">
              <Link
                href="https://www.tiktok.com/@academiajosesabogal"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok Academia José Sabogal"
              >
                <FaTiktok className="w-full h-full" />
              </Link>
            </li>
            <li className="w-11 h-11 p-2 bg-white text-[#13426e] rounded-full hover:opacity-80">
              <Link
                href="https://www.facebook.com/academiajosesabogal"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Academia José Sabogal"
              >
                <FaFacebookF className="w-full h-full" />
              </Link>
            </li>
            <li className="w-11 h-11 p-2 bg-white text-[#13426e] rounded-full hover:opacity-80">
              <Link
                href="https://www.youtube.com/@AcademiaJoseSabogal"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube Academia José Sabogal"
              >
                <ImYoutube className="w-full h-full" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Enlaces de navegación */}
        <div>
          <span className="font-semibold text-lg mb-2 block">Nuestra academia</span>
          <nav className="flex flex-col">
            <Link href="/" className="py-1 font-normal text-gray-300 hover:text-white">
              Inicio
            </Link>
            <Link href="/fichas-de-multiplicacion" className="py-1 font-normal text-gray-300 hover:text-white">
              Fichas
            </Link>
            <Link href="/generador-de-ejercicios" className="py-1 font-normal text-gray-300 hover:text-white">
              Ejercicios
            </Link>
            <Link href="/generador-de-examenes" className="py-1 font-normal text-gray-300 hover:text-white">
              Examenes
            </Link>
            <Link href="/chat-tutor-academico" className="py-1 font-normal text-gray-300 hover:text-white">
              Chat PepeIA
            </Link>
          </nav>
        </div>

        {/* Información de contacto */}
        <div>
          <span className="font-semibold text-lg mb-2 block">Contacto</span>
          <ul className="flex flex-col">
            <li>
              <Link href="tel:+51987654321" className="py-1 font-normal text-gray-300 hover:text-white">
                +51 987 654 321
              </Link>
            </li>
            <li>
              <Link href="mailto:josesabogal@gmail.com" className="py-1 font-normal text-gray-300 hover:text-white">
                josesabogal@gmail.com
              </Link>
            </li>
            <li>
              <Link
                href="https://goo.gl/maps/MbM6LAhXPm1SMPPJ8"
                target="_blank"
                rel="noreferrer"
                className="py-1 font-normal text-gray-300 hover:text-white"
              >
                Av. Independencia #1520
              </Link>
            </li>
          </ul>
        </div>

        {/* Términos y condiciones */}
        <div>
          <span className="font-semibold text-lg mb-2 block">Términos y Condiciones</span>
          <ul className="flex flex-col">
            <li>
              <Link href="/" className="py-1 font-normal text-gray-300 hover:text-white">
                Términos de servicio
              </Link>
            </li>
            <li>
              <Link href="/" className="py-1 font-normal text-gray-300 hover:text-white">
                Políticas de privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Pie de página inferior */}
    <div className="bg-[#0e3252] py-5">
      <div className="container mx-auto px-4">
        <div className="text-sm text-center font-light text-gray-300">
          Copyright &copy; 2024 Academia José Sabogal. Todos los derechos reservados.
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
