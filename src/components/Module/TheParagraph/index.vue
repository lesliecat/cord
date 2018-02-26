<template>
  <div
    class="module-field module-paragraph"
    @click.stop="handleModuleClick">
    <h2>{{node.config.title.value}}</h2>
    <h3 v-if="node.config.showSubTitle.value">{{node.config.subTitle.value}}</h3>
    <p>{{node.config.detail.value}}</p>
  </div>
</template>

<script>
import { handleModuleClickMixin } from '../moduleMixin'

export default {
  name: 'ModuleParagraph',
  mixins: [handleModuleClickMixin],
  props: {
    node: {
      type: Object
    },
    themeColor: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.module-paragraph {
  cursor: move;
  &:hover {
    background: #ddd;
  }
}
</style>
