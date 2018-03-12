<template>
  <div
    @click="handleModuleClick"
    class="module-gutter"
    :style="{
      'height': node.config.height.value + 'px',
      'background-color': node.config.backgroundColor.value
    }">
  </div>
</template>

<script>
import { handleModuleClickMixin } from '@/mixins/module'
import { mapState } from 'vuex'
import { deepCopy } from '@/utils'

export default {
  name: 'EditGutter',
  mixins: [handleModuleClickMixin],
  props: {
    node: {
      type: Object
    }
  },
  computed: {
    ...mapState('configure', ['currentPage'])
  },
  created () {
    if (this.currentPage.children.length) {
      for (let item of this.currentPage.children) {
        if (item.type === 'EditGutter') {
          Object.assign(this.node, {
            config: deepCopy(item.config)
          })
        }
      }
    }
  }
}
</script>
