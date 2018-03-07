<template>
  <div class="module-multipic" @click="handleModuleClick">
    <div
      class="imglink-row"
      :style="{
        'margin-left': -node.config.columnGutter.value + 'px',
        'margin-right': -node.config.columnGutter.value + 'px',
        'margin-top': -node.config.rowGutter.value + 'px'
      }">
      <div
        class="imglink-item"
        :style="{
          width: (100 / node.config.columnNum.value) + '%',
          'padding-left': node.config.columnGutter.value + 'px',
          'padding-right': node.config.columnGutter.value + 'px',
          'margin-top': node.config.rowGutter.value + 'px'
        }"
        v-for="(item, index) in node.config.children.value"
        :key="index">
        <a class="item-link" :href="item.href.value" onclick="return false" target="_blank">
          <div
            class="item-picbox"
            :class="{
              'square-box': node.config.picShape.value !== 'rectangle',
              'circle-box': node.config.picShape.value === 'circle'
            }">
            <img
              class="item-pic"
              :src="item.src.value"
              :style="{
                height: node.config.picHeight.visible ? node.config.picHeight.value + 'px' : ''
              }"
              alt="">
          </div>
          <div
            class="item-titlebox"
            v-if="node.config.showTitle.value || node.config.showSubTitle.value">
            <p class="item-title" v-if="node.config.showTitle.value">{{item.title.value}}</p>
            <p class="item-sub-title" v-if="node.config.showSubTitle.value">
              {{item.subTitle.value}}
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { handleModuleClickMixin } from '../moduleMixin'

export default {
  name: 'EditImgLink',
  mixins: [handleModuleClickMixin],
  props: {
    node: {
      type: Object
    }
  },
  computed: {
    picShape () {
      return this.node.config.picShape.value
    },
    showTitle () {
      return this.node.config.showTitle.value
    },
    showSubTitle () {
      return this.node.config.showSubTitle.value
    }
  },
  watch: {
    picShape (newVal) {
      this.node.config.picHeight.visible = newVal === 'rectangle'
    },
    showTitle (newVal) {
      this.node.config.children.value.forEach(child => {
        child.title.visible = newVal
      })
    },
    showSubTitle (newVal) {
      this.node.config.children.value.forEach(child => {
        child.subTitle.visible = newVal
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.module-multipic {
  overflow: hidden;
  .imglink-row {
    display: flex;
    flex-wrap: wrap;
  }
  .imglink-item {
    text-align: center;
    .item-link {
      display: block;
    }
    .item-picbox {
      .item-pic {
        max-width: 100%;
      }
      &.square-box {
        position: relative;
        height: 0;
        padding-top: 100%;
        overflow: hidden;
        .item-pic {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }
      }
      &.circle-box {
        .item-pic {
          border-radius: 50%;
        }
      }
    }
    .item-title,
    .item-sub-title {
      font-size: $font-size-small;
      margin: 5px 0 0;
    }
    .item-sub-title {
      color: #666;
    }
  }
}
</style>
