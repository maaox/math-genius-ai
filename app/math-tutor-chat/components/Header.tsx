import { Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center py-6 relative">
      <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-32 h-32 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="relative">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <div className="h-8 w-8">
            <svg
              id="Layer_6"
              data-name="Layer 6"
              viewBox="0 0 108 108"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full"
            >
              <path d="M0 0h108v108H0z" fill="none"></path>
              <g id="Icono">
                <g id="Hojas_Izquierda" data-name="Hojas Izquierda">
                  <path
                    d="M2.97 17.16v34.97s16.15-4.1 28.73 0.79 16.04 11.13 16.04 11.13C27.7 43.84 0 56.47 0 56.47V14.51Z"
                    fill="#10528a"
                  ></path>
                  <path
                    d="M6.27 49.16c31.49-7.47 40.47 8.42 40.47 8.42S39.52 42.25 9.08 45.46L9.24 7.25C41.3 0.67 46.31 39.31 46.31 39.31S45.04-1 6.27 7.86Z"
                    fill="#7fb542"
                  ></path>
                </g>
                <g id="Hojas_Derecha" data-name="Hojas Derecha">
                  <path
                    d="M105.03 17.16v34.97s-16.15-4.1-28.73 0.79-16.04 11.13-16.04 11.13C80.31 43.84 108 56.47 108 56.47V14.51Z"
                    fill="#10528a"
                  ></path>
                  <path
                    d="M101.73 49.16c-31.49-7.47-40.47 8.42-40.47 8.42s6.97-17.47 37.41-14.26l-0.16-35.11C77.48 0.67 72.47 39.31 72.47 39.31S75.17-1 101.73 7.86Z"
                    fill="#7fb542"
                  ></path>
                </g>
                <g id="Circulos">
                  <circle cx="54" cy="18.59" r="5.62" fill="#10528a"></circle>
                  <circle cx="63.88" cy="8.69" r="2.81" fill="#7fb542"></circle>
                </g>
                <g id="Lapiz">
                  <path
                    d="M49.79 30.38l1.69 1.69v16.78l-1.69-1.69v-16.78zM58.22 30.38l-1.69 1.69v16.78l1.69-1.69v-16.78zM53.16 38.38h1.69v10.47h-1.69zM56.53 55.13v3.05h-1.69v-3.04h-1.69v3.04h-1.69v-3.05l-1.69-1.69v6.42L54 69.62l4.22-9.76v-6.42Zm-0.51 5.74L55.01 62.9h-2.02l-1.01-2.02-0.51-1.01h5.05Z"
                    fill="#10528a"
                  ></path>
                </g>
              </g>
              <g id="Academia">
                <path
                  d="M23.93 85.56q-0.16-0.51-0.35-1.04c-0.12-0.36-0.25-0.71-0.37-1.06H19.4l-0.37 1.07q-0.19 0.54-0.35 1.04h-2.27q0.55-1.57 1.04-2.91t0.97-2.52q0.47-1.18 0.93-2.24t0.95-2.07h2.08q0.48 1.01 0.95 2.07t0.94 2.24q0.47 1.18 0.97 2.52t1.05 2.91Z"
                  fill="#7fb542"
                ></path>
                {/* Other paths for the "Academia" group */}
              </g>
              <g id="Jose_Sabogal" data-name="Jose Sabogal">
                <path
                  d="M7.85 98.65a5.47 5.47 0 0 1-0.16 1.35 2.6 2.6 0 0 1-1.64 1.84q-0.68 0.28-1.72 0.27a5.16 5.16 0 0 1-1.64-0.23 4.59 4.59 0 0 1-1.13-0.54l0.73-1.7a6.16 6.16 0 0 0 0.87 0.42 2.73 2.73 0 0 0 1.01 0.18q0.8 0 1.15-0.39t0.35-1.32v-6.94h2.85Z"
                  fill="#10528a"
                ></path>
                {/* Other paths for the "Jose Sabogal" group */}
              </g>
            </svg>
          </div>
          Tutor Matemático IA
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          Tu asistente personal para aprender matemáticas
        </p>
      </div>
    </header>
  )
}
