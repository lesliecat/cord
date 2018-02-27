<template>
  <div class="configure">
    <div class="configure__module">
      <h3 class="configure__title">模块</h3>
      <p class="module__title">布局</p>
      <draggable :options="sectionsDragOptions">
        <div
          v-for="section in sectionWidgets"
          :key="section.name"
          class="widget-card"
          :type="section.placeholder.type">
          <i :class="section.icon"></i>
          <p>{{section.name}}</p>
        </div>
      </draggable>
      <p class="module__title">组件</p>
      <draggable :options="leafsDragOptions">
        <div
          v-for="leaf in leafWidgets"
          :key="leaf.name"
          class="widget-card"
          :type="leaf.placeholder.type">
          <i :class="leaf.icon"></i>
          <p>{{leaf.name}}</p>
        </div>
      </draggable>
    </div>
    <div class="configure__preview">
      <h3 class="configure__title">预览</h3>
      <the-render :node="currentPage" :themeColor="site.config.color.value"></the-render>
    </div>
    <div class="configure__edit">
      <h3 class="configure__title">编辑</h3>
      <module-edit></module-edit>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import TheRender from '@/components/TheRender'
import ModuleEdit from '@/components/ModuleEdit'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Configure',
  data () {
    return {
      sectionsDragOptions: {
        group: {
          name: 'sections',
          pull: 'clone',
          put: false
        },
        sort: false
      },
      leafsDragOptions: {
        group: {
          name: 'leafs',
          pull: 'clone',
          put: false
        },
        sort: false
      }
    }
  },
  computed: {
    ...mapState('configure', ['site', 'currentPage', 'inEditModule']),
    ...mapGetters('configure', ['sectionWidgets', 'leafWidgets'])
  },
  methods: {
    ...mapActions('configure', ['getCurrentPage'])
  },
  created () {
    this.getCurrentPage()
  },
  components: {
    Draggable,
    TheRender,
    ModuleEdit
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';
.configure {
  display: flex;
  height: 100%;

  &__module,
  &__preview,
  &__edit {
    padding: 10px;
  }

  &__module {
    flex: 1;
    .widget-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100px;
      border: 1px solid;
      border-radius: 6px;
      padding: 5px;
      color: #fff;
      background: $color-primary;
      font-size: $font-size-base;
      cursor: move;
    }

    .module__title {
      padding-bottom: 10px;
      border-bottom: 1px solid $border-color-base;
    }
  }

  &__preview {
    flex: 2;
    border-left: 1px solid $border-color-base;
    border-right: 1px solid $border-color-base;
  }

  &__edit {
    flex: 1;
  }

  &__title {
    font-size: $font-size-large;
    font-weight: normal;
    text-align: center;
    margin: 0 0 10px;
    padding: 10px 0;
    border-bottom: 1px solid $border-color-base;
  }
}
</style>
