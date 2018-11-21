<template>
  <div class="module-preview">
    <div class="preview__wrapper">
      <div class="preview__content">
        <the-render :node="currentPage"></the-render>
      </div>
      <div class="preview__aside">
        <el-button plain @click="openPublish" :disabled="!isReady">发布</el-button>
        <el-button plain @click="openPreview" :disabled="!isReady">预览</el-button>
      </div>
    </div>

    <el-dialog
      title="提示"
      width="40%"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="页面名称">
          <el-input v-model="form.pageName"></el-input>
        </el-form-item>
        <el-form-item label="页面ID">
          <el-input v-model="form.pageId" disabled></el-input>
        </el-form-item>
        <el-form-item label="业务模块">
          <el-select
            v-model="form.biz"
            @change="chooseBiz"
            placeholder="请选择业务模块">
            <el-option label="口袋商城" value="mall"></el-option>
            <el-option label="活动页面" value="activity"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面生成地址">
          <el-input v-model="form.pageUrl" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmPublish">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TheRender from '@/packages/render'
import { mapState, mapMutations, mapActions } from 'vuex'

const getOriginUrl = () => {
  let url = ''
  // Some browsers (mainly IE) does not have this property, so we need to build it manually...
  if (window.location.origin) {
    url = window.location.origin
  } else {
    url = window.location.protocol + '//' + window.location.hostname +
      (window.location.port ? (':' + window.location.port) : '')
  }
  return url
}

export default {
  name: 'ModulePreview',
  data () {
    return {
      dialogVisible: false,
      form: {
        pageName: '',
        pageId: '',
        biz: '',
        pageUrl: ''
      }
    }
  },
  computed: {
    ...mapState('configure', ['currentPage']),
    isReady () {
      return !!(this.currentPage.children && this.currentPage.children.length)
    }
  },
  methods: {
    ...mapMutations('configure', ['assignState']),
    ...mapActions('configure', ['getSite', 'savePreviewData']),
    chooseBiz (value) {
      // 生成页面地址
      this.form.pageUrl = getOriginUrl() + '/' + value + '/' + this.currentPage.id
    },
    handleClose (done) {
      this.$confirm('确认关闭？').then(action => {
        done()
      }).catch(action => {})
    },
    confirmPublish () {
      this.$confirm('确认发布？').then(() => {
        this.dialogVisible = false
        this.assignState({
          currentPage: {
            ...this.currentPage,
            isPublish: true,
            pageUrl: this.form.pageUrl
          }
        })
        this.savePreviewData()
      }).catch((err) => {
        console.log(err)
      })
    },
    openPublish () {
      this.form.pageId = this.currentPage.id
      this.form.pageName = this.currentPage.name
      this.dialogVisible = true
    },
    openPreview () {
      if (this.isReady) {
        const iframeUrl = getOriginUrl()
        this.$store.commit('SET_PREVIEW_URL', iframeUrl + '/preview')
        this.$store.commit('TOGGLE_PREVIEW', true)
      }
    }
  },
  components: {
    TheRender
  },
  created () {
    this.getSite()
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.module-preview {
  height: 100%;
  .preview {
    &__wrapper {
      display: flex;
      justify-content: center;
      height: 572px;
    }
    &__content {
      flex: 0 0 324px;
      width: 324px;
      border: 2px solid $module-border-color;
      box-shadow: 0 2px 10px 2px rgba($module-border-color, 0.2);
    }
    &__aside {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 80px;
      padding-left: 5px;
      .el-button {
        + .el-button {
          margin-top: 10px;
          margin-left: 0;
        }
      }
    }
  }
}
</style>
