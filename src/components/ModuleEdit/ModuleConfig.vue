<template>
  <div class="module-config">
    <div
      class="config-content"
      v-for="(val, key) in config"
      :key="key"
      :class="{'single-row': isSingleRow(val.type)}">
      <template v-if="val.type !== 'children'">
        <p class="item-title">{{val.label}}:</p>
        <el-switch v-if="val.type === 'boolean'" v-model="val.value"></el-switch>
        <el-input
          v-if="val.type === 'text'"
          v-model="val.value"
          clearable>
        </el-input>
        <el-input-number
          v-if="val.type === 'number'"
          v-model="val.value"
          :min="val.min"
          :max="val.max"
          :step="val.step"
          size="small">
        </el-input-number>
        <el-select v-if="val.type === 'select'" v-model="val.value">
          <el-option
            v-for="item in val.items"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-upload
          class="upload-field"
          v-if="val.type === 'image'"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleUploadSuccess">
          <img v-if="val.value" :src="val.value" class="upload-image">
          <i v-else class="el-icon-plus upload-icon"></i>
        </el-upload>
      </template>
      <template v-if="val.type === 'children'">
        <div class="single-row">
          <p class="item-title">{{val.label}}:共{{val.value.length}}</p>
          <el-button-group>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-minus"
              :disabled="val.value.length === 1"
              @click="reduceChild(val)">
              减少
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="addChild(val)">
              增加
            </el-button>
          </el-button-group>
        </div>
        <div class="sub-config" v-for="(child, index) in val.value" :key="index">
          <p class="sub-title">
            <el-tag
              size="small"
              type="warning"
              :closable="val.value.length > 1"
              @close="reduceChild(val, index)">
              {{index + 1}}
            </el-tag>
          </p>
          <module-config :config="child"></module-config>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { deepCopy } from '@/utils'
const SingleRowType = ['boolean', 'number', 'image', 'select']

export default {
  name: 'ModuleConfig',
  props: {
    config: {
      type: Object
    }
  },
  methods: {
    isSingleRow (type) {
      return SingleRowType.includes(type)
    },
    addChild (val) {
      let length = val.value.length
      let last = val.value[length - 1]
      this.$set(val.value, length, deepCopy(last))
    },
    reduceChild (val, index = 0) {
      if (val.value.length > 1) {
        val.value.splice(index, 1)
      }
    },
    handleUploadSuccess (res, file) {
      console.log(res, file)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.module-config {
  .item-title {
    color: #666;
    font-size: $font-size-small;
  }
  .single-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item-title {
      width: 100px;
      flex: 0 0 100px;
      padding-right: 20px;
    }
  }
}
.config-content {
  + .config-content {
    padding-top: 10px;
    border-top: 1px solid $border-color-base;
    margin-top: 12px;
  }
  .module-config {
    padding: 10px;
    border: 1px dashed $border-color-base;
    border-radius: 6px;
  }
}
.sub-config {
  .sub-title {
    margin-bottom: 0;
    text-align: right;
  }
}
.upload-field {
  .upload-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .upload-image {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>

<style lang="scss">
.upload-field {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
}
</style>
