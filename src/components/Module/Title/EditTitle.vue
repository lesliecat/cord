<template>
  <div class="module-title" @click="handleModuleClick">
    <p class="title-text">{{node.config.title.value}}</p>
    <a class="title-link" :href="node.config.href.value" onclick="return false">更多</a>
  </div>
</template>

<script>
import { handleModuleClickMixin } from '../moduleMixin'

export default {
  name: 'EditTitle',
  mixins: [handleModuleClickMixin],
  props: {
    node: {
      type: Object
    },
    themeColor: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.module-title {
  font-size: $font-size-small;
  display: flex;
  justify-content: space-between;
  .title-text {
    position: relative;
    margin: 0;
    flex: 1;
    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -0.5em;
      width: 0.25em;
      height: 1em;
      background-color: #f37938;
    }
  }
  .title-link {
    text-align: right;
    padding: 10px;
    &:after {
      content: '>';
      color: #666;
    }
  }
}
</style>
