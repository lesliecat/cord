import { mapActions } from 'vuex'

export const handleModuleClickMixin = {
  methods: {
    ...mapActions('configure', ['setEditModule']),
    getComponentNode (node) {
      if (node && node.classList.contains('module-field')) {
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
