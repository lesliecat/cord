import { getSite } from '@/api/configure'
import createUniqueString from '@/utils/createUniqueString'
import { deepCopy } from '@/utils/index'

function getLeaf (obj) {
  let leaf = []
  void (function f (obj) {
    if (obj.children) {
      for (let child of obj.children) {
        f(child)
      }
    } else {
      leaf.push(obj)
    }
  })(obj)
  return leaf
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
        name: 'paragraph',
        icon: 'el-icon-edit',
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
    leafModules ({site}) {
      return getLeaf(site)
    }
  },
  mutations: {
    assignState (state, obj) {
      Object.assign(state, obj)
    },
    sortModule (state, { array, oldIndex, newIndex }) {
      let target = array[oldIndex]
      array.splice(oldIndex, 1)
      array.splice(newIndex, 0, target)
    }
  },
  actions: {
    addModule ({ state, commit }, { section, widgetType, newIndex }) {
      const widget = state.widgets.find(widget => widget.placeholder.type === widgetType)
      if (widget) {
        const placeholder = deepCopy(widget.placeholder)
        section.splice(newIndex, 0, { ...placeholder, id: createUniqueString() })
      }
    },
    getCurrentPage ({state, commit}) {
      commit('assignState', { currentPage: state.site.children[0] })
    },
    setEditModule ({state, commit}, module) {
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
