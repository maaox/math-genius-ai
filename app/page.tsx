'use client'

import { Calculator, BookOpen, GraduationCap, MessageSquare } from 'lucide-react'
import Image from 'next/image'

import { Background } from '@/components/Background'
import { FeatureCard } from '@/components/FeatureCard'

const features = [
  {
    title: 'Fichas de Multiplicación',
    href: '/fichas-de-multiplicacion',
    icon: Calculator,
    bgColor: 'bg-[#6559ff15]',
    iconColor: 'bg-[#6559ff]',
    textColor: 'text-[#6559ff]',
  },
  {
    title: 'Generador de ejercicios',
    href: '/generador-de-ejercicios',
    icon: BookOpen,
    bgColor: 'bg-[#ffd90015]',
    iconColor: 'bg-[#ffd700]',
    textColor: 'text-[#ffd700]',
  },
  {
    title: 'Generador de exámenes',
    href: '/generador-de-examenes',
    icon: GraduationCap,
    bgColor: 'bg-[#ef2e8b15]',
    iconColor: 'bg-[#ef2e8b]',
    textColor: 'text-[#ef2e8b]',
  },
  {
    title: 'Chat con KAI',
    href: '/chat-tutor-academico',
    icon: MessageSquare,
    bgColor: 'bg-[#00d1ff15]',
    iconColor: 'bg-[#00d1ff]',
    textColor: 'text-[#00d1ff]',
  },
]

export default function Home() {
  return (
    <>
      <Background />

      <div className="flex flex-col items-center gap-12 md:relative md:w-[580px] md:h-[580px] lg:w-[730px] lg:h-[730px] mx-auto">
        <div className="hidden md:flex flex-col items-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 text-center ">
          <div className="relative md:w-80 md:h-80 lg:w-80 lg:h-80">
            <Image src="images/KAI.png" alt="Pepe IA Robot" fill className="object-contain drop-shadow-2xl" priority />
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 md:w-full md:h-full">
          {features.map((feature) => (
            <div key={feature.href} className="feature-item  w-[250px] sm:max-md:w-full lg:w-[350px] lg:h-[200px]">
              <FeatureCard
                title={feature.title}
                href={feature.href}
                icon={feature.icon}
                bgColor={feature.bgColor}
                iconColor={feature.iconColor}
                textColor={feature.textColor}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
