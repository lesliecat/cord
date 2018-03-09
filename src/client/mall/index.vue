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
      msg: '页面不存在'
    }
  },
  created () {
    let previewDate = JSON.parse(localStorage.getItem('previewData'))
    console.log(previewDate)
    if (previewDate.isPublish) {
      this.node = JSON.parse(localStorage.getItem('previewData'))
    }
  },
  components: {
    TheRender
  }
}
</script>
