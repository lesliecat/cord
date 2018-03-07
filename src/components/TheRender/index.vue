<template>
  <component
    class="module-field"
    :class="{'is-edit': isEditMode(node.type)}"
    data-component-active="false"
    :is="node.type"
    :node="node">
    <the-render
      v-for="child in node.children"
      :key="child.id"
      :node="child">
    </the-render>
  </component>
</template>

<script>
// 导入 JSON 树中所涉及的所有节点
// 页面
import EditPage from '@/components/Module/Page/EditPage'
import ShowPage from '@/components/Module/Page/ShowPage'
// 区域
import EditSection from '@/components/Module/Section/EditSection'
import ShowSection from '@/components/Module/Section/ShowSection'
// 文字段落
import EditParagraph from '@/components/Module/Paragraph/EditParagraph'
import ShowParagraph from '@/components/Module/Paragraph/ShowParagraph'
// 轮播
import EditSwipe from '@/components/Module/Swipe/EditSwipe'
import ShowSwipe from '@/components/Module/Swipe/ShowSwipe'
// 多列图片
import EditMultiPic from '@/components/Module/MultiPic/EditMultiPic'
import ShowMultiPic from '@/components/Module/MultiPic/ShowMultiPic'
// 标题
import EditTitle from '@/components/Module/Title/EditTitle'
import ShowTitle from '@/components/Module/Title/ShowTitle'
// 全屏图片
import EditFullPic from '@/components/Module/FullPic/EditFullPic'
import ShowFullPic from '@/components/Module/FullPic/ShowFullPic'

export default {
  name: 'TheRender',
  props: {
    node: {
      type: Object
    }
  },
  methods: {
    isEditMode (type) {
      if (type) {
        return type.startsWith('Edit')
      }
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
    ShowSwipe,
    EditMultiPic,
    ShowMultiPic,
    EditTitle,
    ShowTitle,
    EditFullPic,
    ShowFullPic
  }
}
</script>

<style lang="scss">
.module-field {
  margin-bottom: 5px;
  .is-edit {
    outline: 1px dashed tomato;
  }
}
</style>
