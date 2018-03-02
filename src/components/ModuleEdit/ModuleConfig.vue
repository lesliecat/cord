<template>
  <div class="module-config">
    <div
      class="config-content"
      v-for="(val, key) in config"
      :class="{'single-row': val.type !== 'children'}"
      :key="key">
      <p class="item-title">{{val.label}}:</p>
      <div class="item-content" v-if="val.type !== 'children'">
        <el-switch v-if="val.type === 'boolean'" v-model="val.value"></el-switch>
        <el-input v-if="val.type === 'text'" v-model="val.value" clearable></el-input>
        <el-input-number v-if="val.type === 'number'" v-model="val.value"></el-input-number>
        <el-select v-if="val.type === 'select'" v-model="val.value">
          <el-option
            v-for="item in val.items"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <module-config v-if="val.type === 'children'" :config="val.config"></module-config>
      <el-button
        v-if="val.type === 'children'"
        type="primary"
        @click="addChild(val)">
        添加子项
      </el-button>
    </div>
  </div>
</template>

<script>
import { deepCopy } from '@/utils'

export default {
  name: 'ModuleConfig',
  props: {
    config: {
      type: Object
    }
  },
  computed: {
    children () {
      if (this.config && this.config.children) {
        return this.config.children
      }
    }
  },
  methods: {
    normalizeChildrenConfig (childrenValue) {
      if (childrenValue) {
        let config = {}
        childrenValue.forEach((item, index) => {
          for (let [key, val] of Object.entries(item)) {
            config[key + index] = val
          }
        })
        this.$set(this.children, 'config', config)
      }
    },
    addChild (val) {
      let length = val.value.length
      let last = val.value[length - 1]
      this.$set(val.value, length, deepCopy(last))
    }
  },
  watch: {
    'children.value': {
      deep: true,
      handler (newVal) {
        this.normalizeChildrenConfig(newVal)
      }
    }
  },
  created () {
    if (this.children) {
      this.normalizeChildrenConfig(this.children.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.config-content {
  margin-bottom: 12px;
  .item-title {
    width: 100px;
    text-align: right;
    color: #666;
    font-size: $font-size-base;
  }
  &.single-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item-title {
      flex: 0 0 100px;
    }
    .item-content {
      flex: 1;
      padding-left: 20px;
    }
  }
}

</style>
