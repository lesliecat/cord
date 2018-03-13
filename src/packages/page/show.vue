<template>
  <div class="module-page">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'ShowPage',
  props: {
    node: {
      type: Object
    }
  }
}
</script>
