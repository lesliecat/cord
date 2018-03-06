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
import EditPage from '@/components/Module/Page/EditPage'
import ShowPage from '@/components/Module/Page/ShowPage'
import EditSection from '@/components/Module/Section/EditSection'
import ShowSection from '@/components/Module/Section/ShowSection'
import EditParagraph from '@/components/Module/Paragraph/EditParagraph'
import ShowParagraph from '@/components/Module/Paragraph/ShowParagraph'
import EditSwipe from '@/components/Module/Swipe/EditSwipe'
import ShowSwipe from '@/components/Module/Swipe/ShowSwipe'
import EditImgLink from '@/components/Module/ImgLink/EditImgLink'
import ShowImgLink from '@/components/Module/ImgLink/ShowImgLink'
import EditTitle from '@/components/Module/Title/EditTitle'
import ShowTitle from '@/components/Module/Title/ShowTitle'
import EditImg from '@/components/Module/Img/EditImg'
import ShowImg from '@/components/Module/Img/ShowImg'

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
    EditImgLink,
    ShowImgLink,
    EditTitle,
    ShowTitle,
    EditImg,
    ShowImg
  }
}
</script>

<style lang="scss">
.module-field {
  .is-edit {
    outline: 1px dashed tomato;
  }
}
</style>
