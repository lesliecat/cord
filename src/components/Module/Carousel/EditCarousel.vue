<template>
  <div class="module-carousel" @click.stop="handleModuleClick">
    <el-carousel
      :height="node.config.height.value + 'px'"
      :arrow="node.config.arrow.value"
      :autoplay="node.config.autoplay.value">
      <el-carousel-item v-for="(item, index) in node.config.list.itemNum.value" :key="index">
        <!-- <a :href="node.config.images[index].href" target="_blank">
          <img :src="node.config.images[index].src || DefaultImg" alt="">
        </a> -->
        111
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { handleModuleClickMixin, handleDragMixin } from '../moduleMixin'
import DefaultImg from './default.jpg'

export default {
  name: 'EditCarousel',
  mixins: [handleModuleClickMixin, handleDragMixin],
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
      DefaultImg,
      dragOptions: {
        group: {
          name: 'leafs',
          pull: false,
          put: true
        },
        sort: true
      }
    }
  },
  components: {
    Draggable
  }
}
</script>

<style lang="scss">
.el-carousel__item {
  display: flex;
  flex-direction: column;
  .drag-content {
    flex: 1;
  }
}
</style>
