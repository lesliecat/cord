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
              min: 100,
              max: 300,
              step: 10,
              value: 100
            },
            children: {
              label: '子项',
              type: 'children',
              value: [
                {
                  src: {
                    label: '图片',
                    type: 'image',
                    value: 'https://creditcard-cdn.pingan.com/img3/20180205150948767.png'
                  },
                  href: {
                    label: '链接',
                    type: 'text',
                    value: 'https://b.pingan.com.cn/creditcard/huodong/SP201801012/index.html'
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
              min: 1,
              max: 5,
              value: 5
            },
            gutter: {
              label: '列间距',
              type: 'number',
              min: 0,
              max: 10,
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
                    value: 'https://creditcard-cdn.pingan.com/img3/20180207203251911.jpg'
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
                    value: 'https://b.pingan.com.cn/mall/mobile/'
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
            showMore: {
              label: '显示更多',
              type: 'boolean',
              value: false
            },
            href: {
              label: '链接',
              type: 'text',
              value: 'https://b.pingan.com.cn/mall/mobile/'
            }
          }
        }
      },
      {
        type: 'section',
        name: 'IMG',
        icon: '',
        placeholder: {
          type: 'EditImg',
          config: {
            picHeight: {
              label: '图片高',
              type: 'number',
              min: 20,
              max: 100,
              value: 60
            },
            children: {
              label: '子项',
              type: 'children',
              value: [
                {
                  src: {
                    label: '图片',
                    type: 'image',
                    value: 'https://creditcard-cdn.pingan.com/img3/20180205153504236.png'
                  },
                  href: {
                    label: '链接',
                    type: 'text',
                    value: 'https://b.pingan.com.cn/mall/mobile/'
                  }
                }
              ]
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
          id: createUniqueString(),
          ...placeholder
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
    },
    saveSite ({ state }) {
      localStorage.setItem('site', state.site)
    }
  }
}

export default configure
