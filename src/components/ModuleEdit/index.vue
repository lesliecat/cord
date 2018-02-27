<template>
  <div class="module-edit" v-show="isShow">
    <div class="edit-title">
      <el-button type="warning" @click="removeModule">删除此模块</el-button>
    </div>
    <p>type: {{inEditModule.type}}</p>
    <div
      class="edit-content"
      :class="{'single-row': isSingleRow(val.type)}"
      v-for="(val, key) in inEditModule.config"
      :key="key">
      <p class="item-title">{{key}}:</p>
      <el-switch v-if="val.type === 'boolean'" v-model="val.value"></el-switch>
      <el-input v-if="val.type === 'text'" v-model="val.value" clearable></el-input>
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
  &.single-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.item-title {
  color: #666;
  font-size: $font-size-base;
}
</style>
