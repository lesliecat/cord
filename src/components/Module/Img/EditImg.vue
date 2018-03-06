<template>
  <div class="module-img" @click="handleModuleClick">
    <a
      class="item-link"
      v-for="(item, index) in node.config.children.value" :key="index"
      :href="item.href.value"
      target="_blank"
      onclick="return false">
      <img
        class="item-pic"
        :style="{height: node.config.picHeight.value + 'px'}"
        :src="item.src.value" alt="">
    </a>
  </div>
</template>

<script>
import { handleModuleClickMixin } from '../moduleMixin'
export default {
  name: 'EditShow',
  mixins: [handleModuleClickMixin],
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
  }
}
</style>
