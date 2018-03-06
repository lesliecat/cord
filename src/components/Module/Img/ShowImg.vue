<template>
  <div class="module-img">
    <a
      class="item-link"
      v-for="(item, index) in node.config.children.value" :key="index"
      :href="item.href.value"
      target="_blank">
      <img
        class="item-pic"
        :style="{height: node.config.picHeight.value + 'px'}"
        :src="item.src.value" alt="">
    </a>
  </div>
</template>

<script>
export default {
  name: 'ShowImg',
  props: {
    node: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.module-img {
  .item-link {
    display: block;
    text-align: center;
    + .item-link {
      margin-top: 5px;
    }
  }
  .item-pic {
    border-radius: 5px;
    max-width: 100%;
  }
}
</style>
