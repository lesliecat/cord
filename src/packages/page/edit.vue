<template>
  <div class="module-page">
    <draggable
      class="drag-content"
      :options="dragOptions"
      @sort="handleSort"
      @add="handleAdd">
      <slot></slot>
    </draggable>
  </div>
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
.module-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
  .drag-content {
    flex: 1;
  }
}
</style>
