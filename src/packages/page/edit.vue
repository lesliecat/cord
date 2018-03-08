<template>
  <div class="module-page">
    <div class="page-warpper">
      <draggable
        class="drag-content"
        :options="dragOptions"
        @sort="handleSort"
        @add="handleAdd">
        <slot></slot>
      </draggable>
    </div>
    <button class="btn-publish">发布</button>
    <button class="btn-preview">预览</button>
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
@import 'src/styles/variables';

.module-page {
  position: relative;
  width: 320px;
  height: 568px;
  margin-left: auto;
  margin-right: auto;
  .btn-publish {
    position: absolute;
    bottom: 45px;
    right: -41px;
    border: 1px solid #333;
    padding: 4px;
    cursor: pointer;
  }
  .btn-preview {
    position: absolute;
    bottom: 10px;
    right: -41px;
    border: 1px solid #333;
    padding: 4px;
    cursor: pointer;
  }
}
.page-warpper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 568px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  overflow: auto;
  border: 2px solid $module-border-color;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.2);
  .drag-content {
    flex: 1;
  }
}
</style>
