import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface FeatureCardProps {
  title: string
  href: string
  icon: LucideIcon
  bgColor: string
  iconColor: string
  textColor: string
}

export function FeatureCard({ title, href, icon: Icon, bgColor, iconColor, textColor }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={`${bgColor} rounded-2xl lg:rounded-3xl p-8 shadow-md transition-all hover:scale-105 hover:shadow-lg flex items-center space-x-4 w-full h-full`}
    >
      <div className={`${iconColor} p-3 rounded-full`}>
        <Icon className="text-white h-6 w-6 lg:h-14 lg:w-14" />
      </div>
      <h3 className={`text-lg lg:text-2xl ${textColor} font-semibold`}>{title}</h3>
    </Link>
  )
}
