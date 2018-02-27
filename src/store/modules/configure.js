import { getSite } from '@/api/configure'
import createUniqueString from '@/utils/createUniqueString'
import { deepCopy } from '@/utils/index'

function removeOneModule (site, one) {
  if (site.children && site.children.length) {
    site.children.forEach((item, index, arr) => {
      if (item.id === one.id) {
        arr.splice(index, 1)
      } else {
        removeOneModule(item, one)
      }
    })
  }
}

const configure = {
  namespaced: true,
  state: {
    site: {
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
          type: 'ModulePage',
          name: 'the page',
          children: [
            {
              id: createUniqueString(),
              type: 'ModuleSection',
              config: {},
              children: [
                {
                  id: createUniqueString(),
                  type: 'ModuleParagraph',
                  config: {
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
                    },
                    showSubTitle: {
                      type: 'boolean',
                      value: true
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    currentPage: {},
    inEditModule: {},
    widgets: [
      {
        type: 'section',
        name: 'Section',
        icon: '',
        placeholder: {
          type: 'ModuleSection',
          config: {},
          children: []
        }
      },
      {
        type: 'leaf',
        name: 'Paragraph',
        icon: '',
        placeholder: {
          type: 'ModuleParagraph',
          config: {
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
              value: '内容部分'
            },
            showSubTitle: {
              type: 'boolean',
              value: false
            }
          }
        }
      }
    ]
  },
  getters: {
    sectionWidgets ({ widgets }) {
      return widgets.filter(widget => widget.type === 'section')
    },
    leafWidgets ({ widgets }) {
      return widgets.filter(widget => widget.type === 'leaf')
    }
  },
  mutations: {
    assignState (state, obj) {
      Object.assign(state, obj)
    },
    addModule (state, { section, widgetType, newIndex }) {
      const widget = state.widgets.find(
        widget => widget.placeholder.type === widgetType
      )
      if (widget) {
        const placeholder = deepCopy(widget.placeholder)
        section.splice(newIndex, 0, {
          ...placeholder,
          id: createUniqueString()
        })
      }
    },
    sortModule (state, { array, oldIndex, newIndex }) {
      let target = array[oldIndex]
      array.splice(oldIndex, 1)
      array.splice(newIndex, 0, target)
    }
  },
  actions: {
    removeModule ({ state, commit, dispatch }) {
      removeOneModule(state.site, state.inEditModule)
      dispatch('setEditModule', {})
    },
    getCurrentPage ({ state, commit }) {
      commit('assignState', { currentPage: state.site.children[0] })
    },
    setEditModule ({ state, commit }, module) {
      commit('assignState', { inEditModule: module })
    },
    async getSite ({ commit }, id) {
      const site = await getSite(id)
      commit('assignState', { site })
      commit('assignState', { currentPage: site.children[0] })
    }
  }
}

export default configure
