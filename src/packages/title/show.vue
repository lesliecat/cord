<template>
  <div class="module-title">
    <p class="title-text">{{node.config.title.value}}</p>
    <a
      v-if="node.config.showMore.value"
      class="title-link" :href="node.config.href.value">
      更多
    </a>
  </div>
</template>

<script>
export default {
  name: 'ShowTitle',
  props: {
    node: {
      type: Object
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
