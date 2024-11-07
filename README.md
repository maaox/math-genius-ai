# MathGeniusAI

![MathGeniusAI Banner](./public/images/banner.png)

📚 **Plataforma Educativa Impulsada por IA para Generar Recursos Matemáticos Personalizados**

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Descripción General

**MathGeniusAI** es una plataforma educativa impulsada por inteligencia artificial que permite a docentes y padres generar recursos matemáticos personalizados y de alta calidad. La plataforma ofrece herramientas para crear fichas de multiplicación, ejercicios, exámenes, textos educativos y desafíos interactivos, todo diseñado para mejorar el aprendizaje de las matemáticas de una manera atractiva y eficiente.

---

## Características Principales

1. ### **Generador de Fichas de Multiplicación** 📝

   - Selección personalizada de tablas de multiplicar del 1 al 12.
   - Plantillas visuales predefinidas con opciones minimalistas y temáticas para niños.
   - Vista previa interactiva en tiempo real.
   - Opciones de descarga en formatos **WORD**, **PDF** y **JPG**.

2. ### **Generador de Ejercicios de Matemática** ➕➖✖️➗

   - Amplia selección de temas matemáticos (fracciones, geometría, álgebra, etc.).
   - Personalización de la cantidad de ejercicios y nivel de dificultad.
   - Plantillas visuales adaptadas a diferentes edades.
   - Descarga en formatos **WORD** y **PDF**.

3. ### **Generador de Exámenes de Matemática** 🧮

   - Creación de exámenes personalizados con selección de temas y tipos de preguntas.
   - Opciones para preguntas abiertas, de opción múltiple o combinadas.
   - Vista previa completa con respuestas al final.
   - Descarga en formatos **WORD** y **PDF**.

4. ### **Chat de Resolución de Ejercicios** 💬🤖

   - Interfaz de chat en tiempo real con IA especializada en matemáticas.
   - Soporte para cargar imágenes de ejercicios escritos a mano o de libros.
   - Respuestas didácticas con soluciones paso a paso.
   - Funciones adicionales como solicitar más detalles o ejemplos similares.

5. ### **Creación de Textos Educativos** 📖

   - Generación de cuentos cortos que integran conceptos matemáticos.
   - Plantillas visuales atractivas para diferentes edades.
   - Descarga en formatos **WORD** y **PDF**.

6. ### **Desafíos y Ejercicios Motivacionales** 🏆

   - Presentación interactiva de ejercicios con elementos gamificados.
   - Feedback inmediato y mensajes motivacionales personalizados.
   - Sistema de puntuación en tiempo real.
   - Adaptabilidad a diferentes niveles de dificultad y edades.

---

## Tecnologías Utilizadas

- **Frontend:**
  - [Next.js 13](https://nextjs.org/) con [TypeScript](https://www.typescriptlang.org/)
  - [React](https://reactjs.org/)
- **Estilos:**
  - CSS Modules
  - Variables y temas CSS
- **Linter y Formateador:**
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
- **Control de Calidad:**
  - [Husky](https://typicode.github.io/husky) para Git Hooks
  - [lint-staged](https://github.com/okonet/lint-staged)
- **Gestor de Paquetes:**
  - [pnpm](https://pnpm.io/)

---

## Instalación

### Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/)

### Pasos de Instalación

1. **Clonar el Repositorio**

   ```bash
   git clone https://github.com/maaox/math-genius-ai.git
   cd math-genius-ai
   ```

2. **Instalar Dependencias**

   ```bash
   pnpm install
   ```

3. **Configurar Variables de Entorno**

   Crea un archivo \`.env.local\` en la raíz del proyecto y configura las variables necesarias.

   ```env
   API_KEY_AI=https://api.mathgeniusai.com
   ```

4. **Ejecutar la Aplicación en Desarrollo**

   ```bash
   pnpm dev
   ```

   La aplicación estará disponible en \`http://localhost:3000\`.

---

## Uso

### Scripts Disponibles

- **Iniciar el Servidor de Desarrollo**

  ```bash
  pnpm dev
  ```

- **Construir la Aplicación para Producción**

  ```bash
  pnpm build
  ```

- **Iniciar el Servidor en Producción**

  ```bash
  pnpm start
  ```

- **Ejecutar ESLint**

  ```bash
  pnpm lint
  ```

- **Formatear Código con Prettier**

  ```bash
  pnpm format
  ```

- **Ejecutar Pruebas**

  ```bash
  pnpm test
  ```

---

## Estructura del Proyecto

```
MathGeniusAI/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── multiplication-sheets/
│   ├── math-exercises/
│   ├── math-exams/
│   ├── math-tutor-chat/
│   ├── educational-texts/
│   └── motivational-challenges/
├── components/
│   ├── common/
│   └── ui/
├── lib/
│   ├── api/
│   ├── utils/
│   └── constants/
├── hooks/
├── styles/
│   ├── globals.css
│   ├── variables.css
│   ├── themes.css
│   ├── components/
│   └── pages/
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── .eslintrc.js
├── .prettierrc
├── next.config.js
├── package.json
└── README.md
```

**Descripción:**

- **app/**: Contiene las páginas y rutas principales de la aplicación.
- **components/**: Componentes reutilizables organizados en \`common\`, \`ui\`.
- **lib/**: Lógica de negocio, llamadas a APIs, utilidades y constantes.
- **hooks/**: Custom hooks de React.
- **styles/**: Archivos de estilos globales y específicos.
- **public/**: Recursos estáticos como imágenes y fuentes.

---

## Contribución

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (\`git checkout -b feature/nueva-funcionalidad\`).
3. Realiza tus cambios y haz commits descriptivos (\`git commit -m 'feat: agregar nueva funcionalidad'\`).
4. Haz push a tu rama (\`git push origin feature/nueva-funcionalidad\`).
5. Abre un Pull Request.

Por favor, asegúrate de que tu código sigue las convenciones establecidas y pasa todas las pruebas antes de enviar el Pull Request.

---

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más información.

---

## Contacto

📧 **Email:** maaox.dev@gmail.com  

---

¡Gracias por usar **MathGeniusAI**! Esperamos que esta herramienta te sea de gran ayuda para enriquecer la experiencia de aprendizaje de las matemáticas. Si tienes alguna sugerencia o encuentras algún problema, no dudes en contactarnos.