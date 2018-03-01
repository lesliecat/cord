<template>
  <div class="module-edit" v-show="isShow">
    <div class="edit-title">
      <el-button type="warning" @click="removeModule">删除此模块</el-button>
    </div>
    <div class="edit-title">
      <el-tag type="info">{{inEditModule.type}}</el-tag>
    </div>
    <module-config :config="inEditModule.config"></module-config>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModuleConfig from './ModuleConfig'

export default {
  name: 'ModuleEdit',
  computed: {
    ...mapState('configure', ['inEditModule']),
    isShow () {
      return Object.keys(this.inEditModule).length
    }
  },
  methods: {
    ...mapActions('configure', ['removeModule'])
  },
  components: {
    ModuleConfig
  }
}
</script>

<style lang="scss" scoped>
.module-edit {
  .edit-title {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
