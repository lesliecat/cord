import { createUniqueString } from '@/utils'

export function getSite (id = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(oneSite)
    }, 200)
  })
}

const oneSite = {
  id: createUniqueString(),
  type: 'site',
  name: 'pingan',
  config: {
    color: {
      type: 'color',
      value: 'tomato'
    }
  },
  children: [
    {
      id: createUniqueString(),
      type: 'EditPage',
      name: 'Page Name',
      children: []
    }
  ]
}
