<template>
  <div class="module-page">
    <draggable class="drag-content" :options="dragOptions" @sort="handleSort" @add="handleAdd">
      <slot></slot>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { handleDragMixin } from '../moduleMixin'

export default {
  name: 'EditPage',
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
  width: 320px;
  height: 568px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  min-height: 400px;
  border: 2px solid $module-border-color;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.2);
  .drag-content {
    flex: 1;
  }
}
</style>
