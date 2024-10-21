export const templates = {
  minimalista: [
    {
      id: 'minimalista1',
      name: 'Minimalista 1',
      image: '/images/minimalista1.jpg',
    },
    {
      id: 'minimalista2',
      name: 'Minimalista 2',
      image: '/images/minimalista2.jpg',
    },
    {
      id: 'minimalista3',
      name: 'Minimalista 3',
      image: '/images/minimalista3.jpg',
    },
    {
      id: 'minimalista4',
      name: 'Minimalista 4',
      image: '/images/minimalista4.jpg',
    },
    {
      id: 'minimalista5',
      name: 'Minimalista 5',
      image: '/images/minimalista5.jpg',
    },
  ],
  infantil: [
    {
      id: 'infantil1',
      name: 'Infantil 1',
      image: 'images/infantil1.jpg',
    },
    {
      id: 'infantil2',
      name: 'Infantil 2',
      image: 'images/infantil2.jpg',
    },
    {
      id: 'infantil3',
      name: 'Infantil 3',
      image: 'images/infantil3.jpg',
    },
    {
      id: 'infantil4',
      name: 'Infantil 4',
      image: 'images/infantil4.jpg',
    },
    {
      id: 'infantil5',
      name: 'Infantil 5',
      image: 'images/infantil5.jpg',
    },
  ],
}

export type TemplateCategory = keyof typeof templates

export const getTemplateById = (id: string) => {
  for (const category of Object.values(templates)) {
    for (const template of category) {
      if (template.id === id) {
        return template
      }
    }
  }
  return null
}
