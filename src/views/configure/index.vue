<template>
  <div class="configure">
    <div class="configure__module">
      <h3 class="configure__title">Module</h3>
      <draggable :options="dragOptions">
        <div
          v-for="widget in widgets"
          :key="widget.name"
          class="widget-card"
          :type="widget.placeholder.type">
          <i :class="widget.icon"></i>
          <p>{{widget.name}}</p>
        </div>
      </draggable>
    </div>
    <div class="configure__preview">
      <h3 class="configure__title">Preview</h3>
      <the-render :node="currentPage" :themeColor="site.config.color.value"></the-render>
    </div>
    <div class="configure__edit">
      <h3 class="configure__title">Edit</h3>
      <module-edit></module-edit>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import TheRender from '@/components/TheRender'
import ModuleEdit from '@/components/ModuleEdit'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Configure',
  data () {
    return {
      dragOptions: {
        group: {
          name: 'widgets',
          pull: 'clone',
          put: false
        },
        sort: false
      }
    }
  },
  computed: {
    ...mapState('configure', ['site', 'currentPage', 'widgets', 'inEditModule'])
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
      border-radius: 2px;
      padding: 5px;
      cursor: move;
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
