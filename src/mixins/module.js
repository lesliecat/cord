import { mapMutations, mapActions } from 'vuex'

export const handleModuleClickMixin = {
  methods: {
    ...mapActions('configure', ['setEditModule']),
    getComponentNode (node) {
      if (node && node.getAttribute('data-component-active') !== null) {
        return node
      } else if (node.parentElement) {
        return this.getComponentNode(node.parentElement)
      } else {
        return false
      }
    },
    handleModuleClick (e) {
      let componentHtml = this.getComponentNode(e.target)
      if (componentHtml) {
        let list = document.querySelectorAll('[data-component-active="true"]')
        list.forEach(el => {
          el.setAttribute('data-component-active', '')
        })
        componentHtml.setAttribute('data-component-active', 'true')
      }
      this.setEditModule(this.node)
    }
  }
}

export const handleDragMixin = {
  methods: {
    ...mapMutations('configure', ['addModule', 'sortModule']),
    handleSort (e) {
      let { oldIndex, newIndex, from, to } = e
      if (from === to) {
        this.sortModule({ section: this.node.children, oldIndex, newIndex })
      }
    },
    handleAdd (e) {
      let { item, newIndex } = e
      const widgetType = item.getAttribute('type')
      item.parentElement.removeChild(item)
      this.addModule({ section: this.node.children, widgetType, newIndex })
    }
  }
}
