<template>
  <div class="module-field module-page">
    <draggable class="drag-content" :options="dragOptions" @sort="handleSort" @add="handleAdd">
      <slot></slot>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { handleDragMixin } from '../moduleMixin'

export default {
  name: 'ModulePage',
  mixins: [handleDragMixin],
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
@import 'src/styles/variables';

.module-page {
  display: flex;
  flex-direction: column;
  min-height: 400px;
  border: 1px solid $module-border-color;
  .drag-content {
    flex: 1;
  }
}
</style>
