<template>
  <div class="module-list">
    <p class="module__title">组件</p>
    <draggable class="module__field" :options="sectionsDragOptions">
      <div
        v-for="section in sectionWidgets"
        :key="section.name"
        class="widget-card"
        :type="section.placeholder.type">
        <i :class="section.icon"></i>
        <p>{{section.name}}</p>
      </div>
    </draggable>
    <!-- <p class="module__title">组件</p>
    <draggable class="module__field" :options="leafsDragOptions">
      <div
        v-for="leaf in leafWidgets"
        :key="leaf.name"
        class="widget-card"
        :type="leaf.placeholder.type">
        <i :class="leaf.icon"></i>
        <p>{{leaf.name}}</p>
      </div>
    </draggable> -->
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { mapGetters } from 'vuex'

export default {
  name: 'ModuleList',
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
    ...mapGetters('configure', ['sectionWidgets', 'leafWidgets'])
  },
  components: {
    Draggable
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.module-list {
  .module__title {
    padding-bottom: 10px;
    border-bottom: 1px solid $border-color-base;
  }
  .module__field {
    display: flex;
    flex-wrap: wrap;
  }
  .widget-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    border: 1px solid;
    border-radius: 6px;
    color: #fff;
    background: $color-primary;
    font-size: $font-size-base;
    cursor: move;
  }
}
</style>
