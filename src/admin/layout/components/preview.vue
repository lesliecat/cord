<template>
  <div class="page-preview" v-if="preview.opened">
    <span class="page-preview-close" @click="colosePreview">x</span>
    <div class="page-preview-phone">
      <div class="marvel-device note8">
        <div class="top-bar"></div>
        <div class="sleep"></div>
        <div class="volume"></div>
        <div class="camera"></div>
        <div class="sensor"></div>
        <div class="speaker"></div>
        <div class="screen">
          <!-- Content goes here -->
          <iframe class="page-preview-content" :src="preview.url"></iframe>
        </div>
        <div class="home"></div>
        <div class="bottom-bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'preview',
  computed: {
    ...mapGetters(['preview'])
  },
  methods: {
    colosePreview () {
      this.$store.commit('TOGGLE_PREVIEW', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/styles/devices.scss";

  .page-preview {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(51, 51, 51, 0.81);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .page-preview-phone {
    transform: scale(.75, .75);
  }

  .page-preview-content {
    width: 100%;
    height: 100%;
  }

  .page-preview-close {
    color: #fff;
    position: absolute;
    right: 30px;
    top: 20px;
    font-size: 50px;
    cursor: pointer;
    overflow: hidden;
    border-radius: 25px;
    display: block;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
</style>
