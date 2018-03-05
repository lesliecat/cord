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

function changeModuleType (module, oldMode, newMode) {
  if (module.type) {
    module.type = module.type.replace(oldMode, newMode)
  }
  if (module.children && module.children.length) {
    for (let m of module.children) {
      changeModuleType(m, oldMode, newMode)
    }
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
          type: 'EditPage',
          name: 'the page',
          children: []
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
          type: 'EditSection',
          config: {},
          children: []
        }
      },
      {
        type: 'section',
        name: 'Swipe',
        icon: '',
        placeholder: {
          type: 'EditSwipe',
          config: {
            auto: {
              label: '自动播放',
              type: 'number',
              min: 1000,
              max: 4000,
              step: 100,
              value: 3000
            },
            showIndicators: {
              label: '显示指示器',
              type: 'boolean',
              value: true
            },
            height: {
              label: '高度',
              type: 'number',
              min: 200,
              max: 300,
              step: 20,
              value: 200
            },
            children: {
              label: '子项',
              type: 'children',
              value: [
                {
                  src: {
                    label: '图片',
                    type: 'image',
                    value: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520099592250&di=7eeaf9289f9806abcedab520f6e080cf&imgtype=0&src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F24%2F0c%2F59%2F240c59f8cee297c2047387e1009b4f39.jpg'
                  },
                  href: {
                    label: '链接',
                    type: 'text',
                    value: 'https://www.baidu.com'
                  }
                }
              ]
            }
          }
        }
      },
      {
        type: 'section',
        name: 'ImgLink',
        icon: '',
        placeholder: {
          type: 'EditImgLink',
          config: {
            showTitle: {
              label: '显示主标题',
              type: 'boolean',
              value: true
            },
            showSubTitle: {
              label: '显示子标题',
              type: 'boolean',
              value: false
            },
            columnNum: {
              label: '列数',
              type: 'number',
              value: 5
            },
            picShape: {
              label: '图片形状',
              type: 'select',
              value: 'rect',
              items: ['rect', 'circle']
            },
            children: {
              label: '子项',
              type: 'children',
              value: [
                {
                  src: {
                    label: '图片',
                    type: 'image',
                    value: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520100023122&di=546a1bb118b59e39c0276ac028fe0cff&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01850455450dc50000019ae92d459c.jpg%40900w_1l_2o_100sh.jpg'
                  },
                  title: {
                    label: '标题',
                    type: 'text',
                    value: '东风破'
                  },
                  subTitle: {
                    label: '子标题',
                    type: 'text',
                    value: '菊花残'
                  },
                  href: {
                    label: '链接',
                    type: 'text',
                    value: 'http://www.baidu.com/'
                  }
                }
              ]
            }
          }
        }
      },
      {
        type: 'section',
        name: 'Title',
        icon: '',
        placeholder: {
          type: 'EditTitle',
          config: {
            title: {
              label: '文字',
              type: 'text',
              value: '标题'
            },
            href: {
              label: '链接',
              type: 'text',
              value: ''
            }
          }
        }
      },
      {
        type: 'leaf',
        name: 'Paragraph',
        icon: '',
        placeholder: {
          type: 'EditParagraph',
          config: {
            title: {
              label: '正标题',
              type: 'text',
              value: '正标题'
            },
            subTitle: {
              label: '副标题',
              type: 'text',
              value: '副标题'
            },
            detail: {
              label: '内容',
              type: 'text',
              value: '内容部分'
            },
            showSubTitle: {
              label: '显示副标题',
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
    },
    previewPage ({ currentPage }) {
      let ret = deepCopy(currentPage)
      changeModuleType(ret, 'Edit', 'Show')
      return ret
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
