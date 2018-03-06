<template>
  <div
    class="module-paragraph">
    <h2>{{node.config.title.value}}</h2>
    <h3 v-if="node.config.showSubTitle.value">{{node.config.subTitle.value}}</h3>
    <p>{{node.config.detail.value}}</p>
  </div>
</template>

<script>
export default {
  name: 'ShowParagraph',
  props: {
    node: {
      type: Object
    }
  }
}
</script>
