<template>
  <component :is="node.type" :node="node" :theme="themeColor">
    <the-render
      v-for="child in node.children"
      :key="child.id"
      :node="child"
      :theme="themeColor">
    </the-render>
  </component>
</template>

<script>
// 导入 JSON 树中所涉及的所有节点
import EditPage from '@/components/Module/Page/EditPage'
import ShowPage from '@/components/Module/Page/ShowPage'
import EditSection from '@/components/Module/Section/EditSection'
import ShowSection from '@/components/Module/Section/ShowSection'
import EditParagraph from '@/components/Module/Paragraph/EditParagraph'
import ShowParagraph from '@/components/Module/Paragraph/ShowParagraph'

export default {
  name: 'TheRender',
  props: {
    node: {
      type: Object
    },
    themeColor: {
      type: String
    }
  },
  components: {
    EditPage,
    ShowPage,
    EditSection,
    ShowSection,
    EditParagraph,
    ShowParagraph
  }
}
</script>
