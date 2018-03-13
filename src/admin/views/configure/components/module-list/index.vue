<template>
  <div class="module-list">
    <draggable class="module__field" :options="dragOptions">
      <div
        v-for="widget in widgets"
        :key="widget.name"
        class="widget-card"
        :type="widget.placeholder.type">
        <p>{{widget.name}}</p>
      </div>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { mapState } from 'vuex'

export default {
  name: 'ModuleList',
  data () {
    return {
      dragOptions: {
        group: {
          name: 'sections',
          pull: 'clone',
          put: false
        },
        sort: false
      }
    }
  },
  computed: {
    ...mapState('configure', ['widgets'])
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
