import { X } from 'lucide-react'
import Image from 'next/image'

interface PendingImage {
  id: string
  url: string
}

interface PendingImagesProps {
  pendingImages: PendingImage[]
  removePendingImage: (id: string) => void
}

export function PendingImages({ pendingImages, removePendingImage }: PendingImagesProps) {
  return (
    <div className="w-full flex flex-wrap gap-2 p-3 rounded-2xl bg-white border border-purple-100">
      {pendingImages.map((img) => (
        <div key={img.id} className="relative group">
          <Image
            src={img.url}
            alt="Vista previa"
            width={100}
            height={100}
            className="rounded-lg object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <button
            onClick={() => removePendingImage(img.id)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  )
}
