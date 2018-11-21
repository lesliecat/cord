<template>
  <div class="module-goods" @click="handleModuleClick">
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
        v-for="(item, index) in assignChildren"
        :key="index">
        <a class="item-link" :href="item.href.value" @click.prevent="showDialog(index)" target="_blank">
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
    <el-dialog
      title="输入商品名称"
      :visible.sync="dialogVisible"
      width="30%">
      <el-select
        filterable
        value-key="productId"
        v-model="selectValue">
        <el-option
          v-for="(item, index) in goods"
          :key="item.label + index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div slot="footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button size="small" @click="handleSelectConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { handleModuleClickMixin } from '@/mixins/module'
import { deepCopy } from '@/utils'

export default {
  name: 'EditGoods',
  mixins: [handleModuleClickMixin],
  props: {
    node: {
      type: Object
    }
  },
  data () {
    return {
      dialogVisible: false,
      clickedIndex: -1,
      selectValue: '',
      goods: [
        {
          label: '手机',
          value: {
            productId: '0001',
            src: 'https://creditcard-cdn.pingan.com/img3/20180301210221112.jpg',
            productName: 'iphone X',
            href: 'https://www.hello.com',
            salePrice: 300.30,
            perStepPayInteger: 100,
            perStepPayFraction: 10,
            stageNum: 3
          }
        },
        {
          label: '化妆品',
          value: {
            productId: '0002',
            src: 'https://creditcard-cdn.pingan.com/img3/20180301210221112.jpg',
            productName: 'LOREL',
            href: 'https://www.bonjour.com',
            salePrice: 300.30,
            perStepPayInteger: 300,
            perStepPayFraction: 30,
            stageNum: 1
          }
        }
      ]
    }
  },
  computed: {
    assignChildren () {
      let showAdd = this.node.config.showAdd.value
      if (showAdd) {
        return [...this.children, this.node.config.children.placeholder]
      } else {
        return this.children
      }
    },
    children () {
      return this.node.config.children.value
    }
  },
  methods: {
    showDialog (index) {
      this.clickedIndex = index
      this.dialogVisible = true
    },
    handleSelectConfirm () {
      if (this.selectValue) {
        let placeholder = this.node.config.children.placeholder
        let child = deepCopy(placeholder)
        for (let key in child) {
          child[key].value = this.selectValue[key]
        }
        this.node.config.children.value.splice(this.clickedIndex, 1, child)
        this.dialogVisible = false
      }
    }
  },
  watch: {
    children (newValue) {
      let len = newValue.length
      this.node.config.showAdd.disabled = !len
      if (!len) {
        this.node.config.showAdd.value = true
      }
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
  .el-select {
    width: 100%;
  }
}
</style>
