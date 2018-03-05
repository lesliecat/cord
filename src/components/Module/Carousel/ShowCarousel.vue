<template>
  <div class="module-carousel">
    <el-carousel
      :height="node.config.height.value + 'px'"
      :arrow="node.config.arrow.value"
      :autoplay="node.config.autoplay.value">
      <el-carousel-item v-for="(image, index) in node.config.list.itemNum.value" :key="index">
        111
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'ShowCarousel',
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
