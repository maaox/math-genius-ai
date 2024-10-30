import { getTemplateById } from '@/lib/constants/templates'
import { Exercise } from '@/lib/interfaces/exercise'

const selectedTopic = 'test'
const selectedDifficulty = [1, 2, 3, 4]
const selectedTemplate = 'random'

export const generateImageWithExercises = async (exercises: Exercise[]): Promise<string[]> => {
  const images: string[] = []
  const template = getTemplateById(selectedTemplate)

  if (!template) {
    throw new Error('Plantilla no encontrada')
  }

  const templateImage = new Image()
  templateImage.crossOrigin = 'Anonymous'
  templateImage.src = template.image // Asegúrate de que las imágenes estén en la carpeta `public/images`

  const logoImage = new Image()
  logoImage.crossOrigin = 'Anonymous'
  logoImage.src = '/images/logo.png' // Ruta al logo

  try {
    // Esperar a que ambas imágenes se carguen
    await Promise.all([
      new Promise((res, rej) => {
        templateImage.onload = res
        templateImage.onerror = rej
      }),
      new Promise((res, rej) => {
        logoImage.onload = res
        logoImage.onerror = rej
      }),
    ])

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.width = templateImage.width
    canvas.height = templateImage.height

    const exercisesPerPage = [] // Arreglo de ejercicios por página
    let currentPageExercises: string[] = []
    let currentHeight = 0
    const maxContentHeight = 710 // Ajustar según necesidad

    // Medir altura de cada ejercicio y distribuirlos en páginas
    ctx.font = '24px Arial'
    exercises.forEach((exercise, index) => {
      const text = `${index + 1}. ${exercise.question}`
      const textHeight = measureTextHeight(ctx, text, canvas.width - 280, 30)
      const lineHeight = index === 0 ? 150 : 30 // Espacio considerable entre ejercicios
      if (currentHeight + textHeight + lineHeight > maxContentHeight && currentPageExercises.length > 0) {
        exercisesPerPage.push(currentPageExercises)
        currentPageExercises = []
        currentHeight = 0
      }
      currentPageExercises.push(text)
      currentHeight += textHeight
    })
    if (currentPageExercises.length > 0) {
      exercisesPerPage.push(currentPageExercises)
    }

    console.log(exercisesPerPage)

    // Generar imágenes por cada página
    for (let i = 0; i < exercisesPerPage.length; i++) {
      // Dibujar la imagen de plantilla
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(templateImage, 0, 0)

      // Dibujar el logo centrado en la parte superior
      const logoWidth = canvas.width * 0.07
      const logoHeight = (logoImage.height / logoImage.width) * logoWidth
      const logoX = canvas.width - logoWidth - 200
      const logoY = 150 // Margen superior
      ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight)

      // Dibujar el logo como marca de agua
      ctx.globalAlpha = 0.05 // 95% de transparencia
      const watermarkWidth = canvas.width * 0.5 // Ajustar tamaño si es necesario
      const watermarkHeight = (logoImage.height / logoImage.width) * watermarkWidth
      const watermarkX = (canvas.width - watermarkWidth) / 2
      const watermarkY = (canvas.height - watermarkHeight) / 2
      ctx.drawImage(logoImage, watermarkX, watermarkY, watermarkWidth, watermarkHeight)
      ctx.globalAlpha = 1.0 // Restablecer opacidad

      // Posiciones iniciales
      const startX = 150 // Sangría
      let startY = logoY + logoHeight + 95 // Margen superior
      const lineHeight = 30 // Espacio considerable entre ejercicios

      // En la primera página, añadir el título
      if (i === 0) {
        ctx.font = 'bold 40px Arial'
        ctx.fillStyle = '#10528a'
        ctx.textAlign = 'center'
        const difficultyText = selectedDifficulty.join(', ')
        const titleText = `Ejercicios sobre ${selectedTopic} de nivel ${difficultyText}`
        const textHeight = wrapText(ctx, titleText, canvas.width / 2, startY, canvas.width - 280, 40)
        startY += textHeight + 40 // Espacio después del título
      }

      // Configurar estilo del texto
      ctx.font = '24px Arial'
      ctx.fillStyle = 'black'
      ctx.textAlign = 'left'

      // Añadir ejercicios de la página actual
      for (const exerciseText of exercisesPerPage[i]) {
        const textHeight = wrapText(ctx, exerciseText, startX, startY, canvas.width - 280, lineHeight)
        startY += textHeight + lineHeight
      }

      // Obtener la imagen generada
      const dataUrl = canvas.toDataURL('image/jpeg')
      images.push(dataUrl)
    }
  } catch (error) {
    console.error('Error al cargar las imágenes o generar las imágenes:', error)
    throw error
  }

  return images
}

// Función para ajustar el texto y devolver la altura utilizada
function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(' ')
  let line = ''
  let totalHeight = 0

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = context.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y)
      line = words[n] + ' '
      y += lineHeight
      totalHeight += lineHeight
    } else {
      line = testLine
    }
  }
  context.fillText(line, x, y)
  totalHeight += lineHeight
  return totalHeight
}

// Función para medir la altura del texto sin dibujarlo
function measureTextHeight(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(' ')
  let line = ''
  let totalHeight = 0

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = context.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      line = words[n] + ' '
      totalHeight += lineHeight
    } else {
      line = testLine
    }
  }
  totalHeight += lineHeight
  return totalHeight
}
