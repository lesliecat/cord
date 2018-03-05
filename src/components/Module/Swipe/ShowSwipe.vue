<template>
  <div class="module-swipe">
    <mt-swipe
      :auto="node.config.auto.value"
      :show-indicators="node.config.showIndicators.value"
      :style="{height: node.config.height.value + 'px'}">
      <mt-swipe-item v-for="(item, index) in node.config.children.value" :key="index">
        <a class="item-link" :href="item.href.value" target="_blank">
          <img class="item-pic" :src="item.src.value" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: 'ShowSwipe',
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
.module-swipe {
  .item-link {
    display: block;
  }
  .item-pic {
    width: 100%;
    height: 100%;
  }
}
</style>
