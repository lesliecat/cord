<template>
  <component :is="node.type" :node="node" :theme="themeColor">
    <sub-render
      v-for="child in node.children"
      :key="child.id"
      :node="child"
      :theme="themeColor">
    </sub-render>
  </component>
</template>

<script>
// 导入 JSON 树中所涉及的所有节点
import ModulePage from '@/components/Module/ThePage'
import ModuleSection from '@/components/Module/TheSection'
import ModuleParagraph from '@/components/Module/TheParagraph'

export default {
  name: 'SubRender',
  props: {
    node: {
      type: Object
    },
    themeColor: {
      type: String
    }
  },
  methods: {
  },
  components: {
    ModulePage,
    ModuleSection,
    ModuleParagraph
  }
}
</script>
