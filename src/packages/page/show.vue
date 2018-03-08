<template>
  <div class="module-page">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'ShowPage',
  props: {
    node: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.module-page {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  overflow: auto;
}
</style>
