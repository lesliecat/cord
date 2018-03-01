<template>
  <div class="module-config">
    <div
      class="config-content"
      v-for="(val, key) in config"
      :key="key">
      <p class="item-title">{{val.label}}:</p>
      <div class="item-content">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleConfig',
  props: {
    config: {
      type: Object
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.config-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.item-title {
  color: #666;
  width: 100px;
  flex: 0 0 100px;
  text-align: right;
  font-size: $font-size-base;
}
.item-content {
  flex: 1;
  padding-left: 20px;
}
</style>
