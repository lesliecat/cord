<template>
  <div class="module-swipe">
    <mt-swipe
      :auto="node.config.auto.value"
      :style="{height: node.config.height.value + 'px'}">
      <mt-swipe-item v-for="(item, index) in node.config.children.value" :key="index">
        <a :href="item.href.value" target="_blank">
          <img :src="item.src.value || DefaultImg" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import DefaultImg from '@/assets/image/default.jpg'

export default {
  name: 'ShowSwipe',
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
      DefaultImg
    }
  }
}
</script>
