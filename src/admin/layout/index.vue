<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
    <preview></preview>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, Preview } from '@/admin/layout/components'

export default {
  name: 'layout',
  components: {
    Preview,
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
@import "src/styles/devices.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
