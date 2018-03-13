<template>
  <div class="preview-wrapper">
    <the-render :node="node"></the-render>
  </div>
</template>

<script>
import TheRender from '@/packages/render'

export default {
  name: 'preview',
  data () {
    return {
      node: {}
    }
  },
  created () {
    this.node = JSON.parse(localStorage.getItem('previewData'))
  },
  components: {
    TheRender
  }
}
</script>
