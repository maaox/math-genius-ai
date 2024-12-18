import Image from 'next/image'
import React from 'react'

import { Card } from '@/components/ui/card'

interface MultiplicationCardProps {
  number: number
  template: string
  logoUrl: string
}

export const MultiplicationCard: React.FC<MultiplicationCardProps> = ({ number, template, logoUrl }) => {
  // Generar las multiplicaciones
  const table = Array.from({ length: 12 }, (_, i) => `${number} x ${i + 1} = ${number * (i + 1)}`)

  return (
    <Card className="multiplication-card relative w-72 h-[26rem] overflow-hidden">
      {/* Imagen de fondo (plantilla) */}
      <Image src={template} alt="Plantilla" fill style={{ objectFit: 'cover' }} />

      {/* Contenido superpuesto */}
      <div className="absolute inset-0 p-8 flex flex-col items-center">
        {/* Logo en la parte superior */}
        <div className="relative w-8 h-8 mt-4">
          <Image src={logoUrl} alt="Logo" fill style={{ objectFit: 'contain' }} />
        </div>

        {/* Título */}
        <h2 className="mt-4 text-xl font-bold text-[#10528a]">Tabla del {number}</h2>

        {/* Marca de agua */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="relative w-40 h-40">
            <Image src={logoUrl} alt="Marca de agua" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>

        {/* Tablas de multiplicar */}
        <div className="mt-4 grid grid-cols-2 gap-x-8 text-sm text-black">
          {table.map((item, index) => (
            <div key={index} className="mb-2 font-indieFlower">
              {item}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
