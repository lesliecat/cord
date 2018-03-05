<template>
  <div class="module-section">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ShowSection',
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
.module-section {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 200px;
}
</style>
