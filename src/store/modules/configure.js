import { getSite } from '@/api/configure'
import { deepCopy, createUniqueString } from '@/utils'

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
      isPublish: false,
      config: {
        color: {
          type: 'color',
          value: 'tomato',
          visible: true
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
    },
    currentPage: {},
    inEditModule: {},
    widgets: [
      // {
      //   type: 'section',
      //   name: 'Section',
      //   icon: '',
      //   placeholder: {
      //     type: 'EditSection',
      //     config: {},
      //     children: []
      //   }
      // },
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
              value: 3000,
              visible: true
            },
            showIndicators: {
              label: '显示指示器',
              type: 'boolean',
              value: true,
              visible: true,
              disabled: false
            },
            height: {
              label: '高度',
              type: 'number',
              min: 100,
              max: 300,
              step: 10,
              value: 100,
              visible: true
            },
            children: {
              label: '子项',
              type: 'children',
              length: 1,
              visible: true,
              showInputNumber: true,
              value: [
                {
                  src: {
                    label: '图片',
                    type: 'image',
                    value: 'https://creditcard-cdn.pingan.com/img3/20180205150948767.png',
                    visible: true
                  },
                  href: {
                    label: '链接',
                    type: 'href',
                    value: 'https://b.pingan.com.cn/creditcard/huodong/SP201801012/index.html',
                    visible: true
                  }
                }
              ]
            }
          }
        }
      },
      {
        type: 'section',
        name: 'MultiPic',
        icon: '',
        placeholder: {
          type: 'EditMultiPic',
          config: {
            showTitle: {
              label: '显示主标题',
              type: 'boolean',
              value: true,
              visible: true,
              disabled: false
            },
            showSubTitle: {
              label: '显示子标题',
              type: 'boolean',
              value: false,
              visible: true
            },
            columnNum: {
              label: '列数',
              type: 'number',
              min: 1,
              max: 5,
              value: 5,
              visible: true
            },
            rowGutter: {
              label: '行间距',
              type: 'number',
              min: 0,
              max: 10,
              value: 5,
              visible: true
            },
            columnGutter: {
              label: '列间距',
              type: 'number',
              min: 0,
              max: 10,
              value: 5,
              visible: true
            },
            picShape: {
              label: '图片形状',
              type: 'select',
              value: 'rect',
              items: ['rectangle', 'square', 'circle'],
              visible: true
            },
            picHeight: {
              label: '图片高度',
              type: 'number',
              min: 30,
              max: 100,
              value: 50,
              visible: false
            },
            children: {
              label: '子项',
              type: 'children',
              length: 1,
              visible: true,
              showInputNumber: true,
              value: [
                {
                  src: {
                    label: '图片',
                    type: 'image',
                    // value: 'https://creditcard-cdn.pingan.com/img3/20180301210221112.jpg',
                    value: 'https://creditcard-cdn.pingan.com/img3/20180205153504236.png',
                    visible: true
                  },
                  title: {
                    label: '标题',
                    type: 'text',
                    value: '东风破',
                    visible: true
                  },
                  subTitle: {
                    label: '子标题',
                    type: 'text',
                    value: '菊花残',
                    visible: false
                  },
                  href: {
                    label: '链接',
                    type: 'href',
                    value: 'https://b.pingan.com.cn/mall/mobile/',
                    visible: true
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
              value: '标题',
              visible: true
            },
            showMore: {
              label: '显示更多',
              type: 'boolean',
              value: false,
              visible: true
            },
            href: {
              label: '链接',
              type: 'href',
              value: 'https://b.pingan.com.cn/mall/mobile/',
              visible: false
            }
          }
        }
      },
      {
        type: 'section',
        name: 'Goods',
        icon: '',
        placeholder: {
          type: 'EditGoods',
          config: {
            showAdd: {
              label: '显示添加',
              type: 'boolean',
              value: true,
              visible: true,
              disabled: true
            },
            columnNum: {
              label: '列数',
              type: 'number',
              min: 1,
              max: 5,
              value: 3,
              visible: true
            },
            rowGutter: {
              label: '行间距',
              type: 'number',
              min: 0,
              max: 10,
              value: 0,
              visible: true
            },
            columnGutter: {
              label: '列间距',
              type: 'number',
              min: 0,
              max: 10,
              value: 0,
              visible: true
            },
            children: {
              label: '子项',
              type: 'children',
              visible: true,
              showInputNumber: false,
              placeholder: {
                productId: {
                  label: '商品id',
                  type: 'readonly',
                  value: '000',
                  visible: true
                },
                src: {
                  label: '图片',
                  type: 'image',
                  value: 'https://cdn4.iconfinder.com/data/icons/ios7-essence/22/add_plus-512.png',
                  visible: true
                },
                productName: {
                  label: '名称',
                  type: 'readonly',
                  value: '点击添加商品',
                  visible: true
                },
                href: {
                  label: '链接',
                  type: 'readonly',
                  value: 'https://www.baidu.com/',
                  visible: true
                },
                salePrice: {
                  label: '商品价格',
                  type: 'readonly',
                  value: 200.20,
                  visible: true
                },
                perStepPayInteger: {
                  label: '分期整数',
                  type: 'readonly',
                  value: 100,
                  visible: true
                },
                perStepPayFraction: {
                  label: '分期小数',
                  type: 'readonly',
                  value: 10,
                  visible: true
                },
                stageNum: {
                  label: '分期数量',
                  type: 'readonly',
                  value: 2,
                  visible: true
                }
              },
              value: [],
              length: 0
            }
          }
        }
      },
      {
        type: 'section',
        name: 'FullPic',
        icon: '',
        placeholder: {
          type: 'EditFullPic',
          config: {
            picHeight: {
              label: '图片高',
              type: 'number',
              min: 20,
              max: 100,
              value: 60,
              visible: true
            },
            children: {
              label: '子项',
              type: 'children',
              length: 1,
              visible: true,
              showInputNumber: true,
              value: [
                {
                  src: {
                    label: '图片',
                    type: 'image',
                    value: 'https://creditcard-cdn.pingan.com/img3/20180205153504236.png',
                    visible: true
                  },
                  href: {
                    label: '链接',
                    type: 'href',
                    value: 'https://b.pingan.com.cn/mall/mobile/',
                    visible: true
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
              value: '正标题',
              visible: true
            },
            subTitle: {
              label: '副标题',
              type: 'text',
              value: '副标题',
              visible: true
            },
            detail: {
              label: '内容',
              type: 'text',
              value: '内容部分',
              visible: true
            },
            showSubTitle: {
              label: '显示副标题',
              type: 'boolean',
              value: false,
              visible: true,
              disabled: false
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
    },
    isPreview ({ currentPage }) {
      return !!currentPage.children && currentPage.children.length
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
    sortModule (state, { section, oldIndex, newIndex }) {
      let target = section[oldIndex]
      section.splice(oldIndex, 1)
      section.splice(newIndex, 0, target)
    }
  },
  actions: {
    removeModule ({ state, dispatch }) {
      removeOneModule(state.site, state.inEditModule)
      dispatch('setEditModule', {})
    },
    getCurrentPage ({ state, commit }) {
      commit('assignState', { currentPage: state.site.children[0] })
    },
    setEditModule ({ commit }, module) {
      commit('assignState', { inEditModule: module })
    },
    async getSite ({ commit, dispatch }, id) {
      const site = await getSite(id)
      commit('assignState', { site })
      commit('assignState', { currentPage: site.children[0] })
      dispatch('savePreviewData')
    },
    // 存储预览需要的数据
    savePreviewData ({ getters }) {
      localStorage.setItem('previewData', JSON.stringify(getters.previewPage))
    }
  }
}

export default configure
