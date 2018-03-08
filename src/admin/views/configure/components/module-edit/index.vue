<template>
  <div class="module-edit" v-show="isShow">
    <div class="edit-title">
      <el-tag type="warning" closable @close="removeModule">{{inEditModule.type}}</el-tag>
    </div>
    <module-config :config="inEditModule.config"></module-config>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModuleConfig from './module-config'

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
@import 'src/styles/variables';

.module-edit {
  .edit-title {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid $border-color-base;
    margin-bottom: 20px;
  }
}
</style>
