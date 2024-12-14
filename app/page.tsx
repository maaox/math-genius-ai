'use client'

import { Calculator, BookOpen, GraduationCap, MessageSquare } from 'lucide-react'
import Image from 'next/image'

import { FeatureCard } from '@/components/FeatureCard'

const features = [
  {
    title: 'Fichas de Multiplicación',
    href: '/fichas-de-multiplicacion',
    icon: Calculator,
    bgColor: 'bg-orange-50',
    iconColor: 'bg-orange-500',
    textColor: 'text-orange-500',
  },
  {
    title: 'Generador de ejercicios',
    href: '/generador-de-ejercicios',
    icon: BookOpen,
    bgColor: 'bg-blue-50',
    iconColor: 'bg-blue-500',
    textColor: 'text-blue-500',
  },
  {
    title: 'Generador de exámenes',
    href: '/generador-de-examenes',
    icon: GraduationCap,
    bgColor: 'bg-purple-50',
    iconColor: 'bg-purple-500',
    textColor: 'text-purple-500',
  },
  {
    title: 'Chat con PepeIA',
    href: '/chat-tutor-academico',
    icon: MessageSquare,
    bgColor: 'bg-green-50',
    iconColor: 'bg-green-500',
    textColor: 'text-green-500',
  },
  /* {
    title: 'Textos Educativos',
    href: '/textos',
    icon: FileText,
    bgColor: 'bg-yellow-50',
    iconColor: 'bg-yellow-500',
    textColor: 'text-yellow-600',
  },
  {
    title: 'Desafíos Motivacionales',
    href: '/desafios',
    icon: Trophy,
    bgColor: 'bg-pink-50',
    iconColor: 'bg-pink-500',
    textColor: 'text-pink-500',
  }, */
]

export default function Home() {
  return (
    <div className="bg-home flex items-center pt-36 pb-24">
      <div className="container mx-auto">
        <div className="md:relative max-w-full mx-auto">
          <div className="flex flex-col items-center gap-12 md:relative md:w-[580px] md:h-[580px] lg:w-[730px] lg:h-[730px] mx-auto">
            <div className="flex flex-col items-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 text-center ">
              <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-secondary">Pepe IA</h1>
              <div className="relative w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80">
                <Image
                  src="images/pepeAI.png"
                  alt="Pepe IA Robot"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
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
        </div>
      </div>
    </div>
  )
}
