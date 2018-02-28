<template>
  <div class="module-field module-page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ShowPage',
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

.module-page {
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 568px;
  margin-left: auto;
  margin-right: auto;
  min-height: 400px;
  border: 2px solid $module-border-color;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.2);
}
</style>
