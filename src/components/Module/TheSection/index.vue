<template>
  <div class="module-field module-section" @click="handleModuleClick">
    <draggable :options="dragOptions" @sort="handleSort" @add="handleAdd">
      <slot></slot>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { mapMutations, mapActions } from 'vuex'
import { handleModuleClickMixin } from '../moduleMixin'

export default {
  name: 'ModuleSection',
  mixins: [handleModuleClickMixin],
  props: {
    node: {
      type: Object
    },
    themeColor: {
      type: String
    }
  },
  data () {
    return {
      dragOptions: {
        group: {
          name: 'widgets',
          pull: false,
          put: true
        },
        sort: true
      }
    }
  },
  methods: {
    ...mapMutations('configure', ['sortModule']),
    ...mapActions('configure', ['addModule']),
    handleSort (e) {
      let { oldIndex, newIndex, from, to } = e
      if (from === to) {
        this.sortModule({ array: this.node.children, oldIndex, newIndex })
      }
    },
    handleAdd (e) {
      let { item, newIndex } = e
      const widgetType = item.getAttribute('type')
      item.parentElement.removeChild(item)
      this.addModule({ section: this.node.children, widgetType, newIndex })
    }
  },
  components: {
    Draggable
  }
}
</script>

<style lang="scss" scoped>
.module-section {
  border: 1px solid transparent;
  &:hover {
    border-color: tomato;
  }
}
</style>
