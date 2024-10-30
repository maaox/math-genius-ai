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
    {
      id: 'minimalista6',
      name: 'Minimalista 6',
      image: '/images/minimalista6.jpg',
    },
    {
      id: 'minimalista7',
      name: 'Minimalista 7',
      image: '/images/minimalista7.jpg',
    },
    {
      id: 'minimalista8',
      name: 'Minimalista 8',
      image: '/images/minimalista8.jpg',
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
    {
      id: 'infantil6',
      name: 'Infantil 6',
      image: 'images/infantil6.jpg',
    },
    {
      id: 'infantil7',
      name: 'Infantil 7',
      image: 'images/infantil7.jpg',
    },
    {
      id: 'infantil8',
      name: 'Infantil 8',
      image: 'images/infantil8.jpg',
    },
    {
      id: 'infantil9',
      name: 'Infantil 9',
      image: 'images/infantil9.jpg',
    },
    {
      id: 'infantil10',
      name: 'Infantil 10',
      image: 'images/infantil10.jpg',
    },
    {
      id: 'infantil11',
      name: 'Infantil 11',
      image: 'images/infantil11.jpg',
    },
    {
      id: 'infantil12',
      name: 'Infantil 12',
      image: 'images/infantil12.jpg',
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
