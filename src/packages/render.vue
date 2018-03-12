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
import EditPage from '@/packages/page/edit'
import ShowPage from '@/packages/page/show'
// 标题
import EditTitle from '@/packages/title/edit'
import ShowTitle from '@/packages/title/show'
// 轮播
import EditSwipe from '@/packages/swipe/edit'
import ShowSwipe from '@/packages/swipe/show'
// 多列图片
import EditMultiPic from '@/packages/multi-pic/edit'
import ShowMultiPic from '@/packages/multi-pic/show'
// 全屏图片
import EditFullPic from '@/packages/full-pic/edit'
import ShowFullPic from '@/packages/full-pic/show'
// 商品
import EditGoods from '@/packages/goods/edit'
import ShowGoods from '@/packages/goods/show'

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
    EditTitle,
    ShowTitle,
    EditSwipe,
    ShowSwipe,
    EditMultiPic,
    ShowMultiPic,
    EditFullPic,
    ShowFullPic,
    EditGoods,
    ShowGoods
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
