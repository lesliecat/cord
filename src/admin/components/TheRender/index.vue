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
import EditPage from '@/woods/Page/EditPage'
import ShowPage from '@/woods/Page/ShowPage'
// 区域
import EditSection from '@/woods/Section/EditSection'
import ShowSection from '@/woods/Section/ShowSection'
// 文字段落
import EditParagraph from '@/woods/Paragraph/EditParagraph'
import ShowParagraph from '@/woods/Paragraph/ShowParagraph'
// 轮播
import EditSwipe from '@/woods/Swipe/EditSwipe'
import ShowSwipe from '@/woods/Swipe/ShowSwipe'
// 多列图片
import EditMultiPic from '@/woods/MultiPic/EditMultiPic'
import ShowMultiPic from '@/woods/MultiPic/ShowMultiPic'
// 标题
import EditTitle from '@/woods/Title/EditTitle'
import ShowTitle from '@/woods/Title/ShowTitle'
// 全屏图片
import EditFullPic from '@/woods/FullPic/EditFullPic'
import ShowFullPic from '@/woods/FullPic/ShowFullPic'

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
