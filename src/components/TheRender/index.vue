<template>
  <component class="module-field" :is="node.type" :node="node" :themeColor="themeColor">
    <the-render
      class="module-field"
      v-for="child in node.children"
      :key="child.id"
      :node="child"
      :themeColor="themeColor">
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
import EditSwipe from '@/components/Module/Swipe/EditSwipe'
import ShowSwipe from '@/components/Module/Swipe/ShowSwipe'

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
    ShowParagraph,
    EditSwipe,
    ShowSwipe
  }
}
</script>
