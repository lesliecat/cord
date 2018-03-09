<template>
  <div class="module-goods">
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
        <a class="item-link" :href="item.href.value" arget="_blank">
          <div class="item-picbox">
            <img class="item-pic" :src="item.src.value" alt="">
          </div>
          <div class="item-titlebox">
            <p class="item-title">{{item.productName.value}}</p>
            <p class="item-sub-title" v-if="item.stageNum.value > 1">
              {{item.perStepPayInteger.value}}.{{item.perStepPayFraction.value}} 元 x {{item.stageNum.value}}期
            </p>
            <p class="item-sub-title" v-else>
              {{item.salePrice.value}}元
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ShowGoods',
  props: {
    node: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.module-goods {
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
