<template>
  <div class="module-section" @click="handleModuleClick">
    <draggable class="drag-content" :options="dragOptions" @sort="handleSort" @add="handleAdd">
      <slot></slot>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { handleModuleClickMixin, handleDragMixin } from '../moduleMixin'

export default {
  name: 'EditSection',
  mixins: [handleModuleClickMixin, handleDragMixin],
  props: {
    node: {
      type: Object
    }
  },
  data () {
    return {
      dragOptions: {
        group: {
          name: 'leafs',
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
@import 'src/styles/variables';

.module-section {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  outline: 1px dashed $module-border-color;
  cursor: move;
  .drag-content {
    flex: 1;
  }
}
</style>
