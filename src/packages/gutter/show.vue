<template>
  <div
    class="module-gutter"
    :style="{
      'height': node.config.height.value + 'px',
      'background-color': node.config.backgroundColor.value
    }">
  </div>
</template>

<script>
export default {
  name: 'ShowGutter',
  props: {
    node: {
      type: Object
    }
  }
}
</script>
