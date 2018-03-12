<template>
  <draggable
    class="drag-content"
    :options="dragOptions"
    @sort="handleSort"
    @add="handleAdd">
    <slot></slot>
  </draggable>
</template>

<script>
import Draggable from 'vuedraggable'
import { handleDragMixin } from '@/mixins/module'

export default {
  name: 'EditPage',
  mixins: [handleDragMixin],
  props: {
    node: {
      type: Object
    }
  },
  data () {
    return {
      dragOptions: {
        group: {
          name: 'sections',
          pull: false,
          put: true
        },
        sort: true
      }
    }
  },
  components: {
    Draggable
  }
}
</script>

<style lang="scss" scoped>
  .drag-content {
    flex: 1;
  }
</style>
