export function getSite (id = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(oneSite)
    }, 200)
  })
}

const oneSite = {
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
      type: 'ModulePage',
      name: 'the page',
      children: [
        {
          type: 'ModuleSection',
          config: {},
          children: [
            {
              type: 'ModuleParagraph',
              config: {
                showSubTitle: {
                  type: 'boolean',
                  value: true
                }
              },
              content: {
                title: {
                  type: 'text',
                  value: '正标题'
                },
                subTitle: {
                  type: 'text',
                  value: '副标题'
                },
                detail: {
                  type: 'text',
                  value: '正心诚意，格物致知'
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
