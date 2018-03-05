<template>
  <div class="module-imglink" @click="handleModuleClick">
    <div
      class="imglink-item"
      :style="{width: (100 / node.config.columnNum.value) + '%'}"
      v-for="(item, index) in node.config.children.value"
      :key="index">
      <a class="item-link" :href="item.href.value" onclick="return false" target="_blank">
        <div
          class="item-picbox"
          :class="{'circle-box': node.config.picShape.value === 'circle'}">
          <img class="item-pic" :src="item.src.value" alt="">
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
</template>

<script>
import { handleModuleClickMixin } from '../moduleMixin'

export default {
  name: 'EditImgLink',
  mixins: [handleModuleClickMixin],
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
@import 'src/styles/variables';

.module-imglink {
  display: flex;
  flex-wrap: wrap;
  .imglink-item {
    width: 20%;
    text-align: center;
    padding: 0 5px;
    .item-link {
      display: block;
    }
    .item-picbox {
      position: relative;
      height: 0;
      padding-top: 100%;
      overflow: hidden;
      &.circle-box {
        border-radius: 50%;
      }
    }
    .item-pic {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
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
