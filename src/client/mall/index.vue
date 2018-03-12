<template>
  <div class="preview-wrapper">
    <template v-if="node">
      <the-render :node="node"></the-render>
    </template>
    <template v-else>
      {{msg}}
    </template>
  </div>
</template>

<script>
import TheRender from '@/packages/render'

export default {
  name: 'preview',
  data () {
    return {
      node: null,
      msg: ''
    }
  },
  created () {
    let previewDate = JSON.parse(localStorage.getItem('previewData'))
    console.log(previewDate)
    if (window.location.href !== previewDate.pageUrl) {
      this.msg = '页面不存在'
    } else if (!previewDate.isPublish) {
      this.msg = '页面还未发布'
    } else {
      this.node = previewDate
    }
  },
  components: {
    TheRender
  }
}
</script>
