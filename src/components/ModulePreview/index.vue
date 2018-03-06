<template>
  <div class="module-preview">
    <the-render :node="node" :mode="mode"></the-render>
  </div>
</template>

<script>
import TheRender from '../TheRender'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ModulePreview',
  props: {
    mode: {
      type: String,
      default: 'edit'
    }
  },
  computed: {
    ...mapState('configure', ['site', 'currentPage']),
    ...mapGetters('configure', ['previewPage']),
    node () {
      if (this.mode === 'show') {
        return this.previewPage
      } else {
        return this.currentPage
      }
    }
  },
  methods: {
    ...mapActions('configure', ['getCurrentPage'])
  },
  created () {
    this.getCurrentPage()
  },
  components: {
    TheRender
  }
}
</script>
