<template>
  <div class="module-swipe" @click="handleModuleClick">
    <mt-swipe
      :auto="node.config.auto.value"
      :show-indicators="node.config.showIndicators.value"
      :style="{height: node.config.height.value + 'px'}">
      <mt-swipe-item v-for="(item, index) in node.config.children.value" :key="index">
        <a
          class="item-link"
          :href="item.href.value"
          onclick="return false"
          target="_blank">
          <img class="item-pic" :src="item.src.value" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { handleModuleClickMixin } from '@/mixins/module'

export default {
  name: 'EditSwipe',
  mixins: [handleModuleClickMixin],
  props: {
    node: {
      type: Object
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
