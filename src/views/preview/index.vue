<template>
  <div class="preview-wrapper">
    <module-preview mode="show"></module-preview>
  </div>
</template>

<script>
import ModulePreview from '@/components/ModulePreview'

export default {
  name: 'preview',
  data () {
    return {

    }
  },
  components: {
    ModulePreview
  }
}
</script>
