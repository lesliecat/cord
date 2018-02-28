<template>
  <div class="module-edit" v-show="isShow">
    <div class="edit-title">
      <el-button type="warning" @click="removeModule">删除此模块</el-button>
    </div>
    <div class="edit-title">
      <el-tag type="info">{{inEditModule.type}}</el-tag>
    </div>
    <div
      class="edit-content"
      :class="{'single-row': isSingleRow(val.type)}"
      v-for="(val, key) in inEditModule.config"
      :key="key">
      <p class="item-title">{{val.label}}:</p>
      <div class="item-content">
        <el-switch v-if="val.type === 'boolean'" v-model="val.value"></el-switch>
        <el-input v-if="val.type === 'text'" v-model="val.value" clearable></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const SingleRowArr = ['boolean']

export default {
  name: 'ModuleEdit',
  computed: {
    ...mapState('configure', ['inEditModule']),
    isShow () {
      return Object.keys(this.inEditModule).length
    }
  },
  methods: {
    ...mapActions('configure', ['removeModule']),
    isSingleRow (type) {
      return SingleRowArr.includes(type)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.edit-title {
  text-align: center;
  margin-bottom: 20px;
}
.edit-content {
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
