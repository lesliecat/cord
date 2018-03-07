<template>
  <div
    class="module-paragraph"
    @click.stop="handleModuleClick">
    <h2>{{node.config.title.value}}</h2>
    <h3 v-if="node.config.showSubTitle.value">{{node.config.subTitle.value}}</h3>
    <p>{{node.config.detail.value}}</p>
  </div>
</template>

<script>
import { handleModuleClickMixin } from '../../mixins/module-mixin'

export default {
  name: 'EditParagraph',
  mixins: [handleModuleClickMixin],
  props: {
    node: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.module-paragraph {
  cursor: move;
  &:hover {
    outline: 1px dashed $module-border-color;
  }
}
</style>
