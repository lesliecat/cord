<template>
  <div class="module__page">
    <div class="module__warpper">
      <draggable
        class="drag-content"
        :options="dragOptions"
        @sort="handleSort"
        @add="handleAdd">
        <slot></slot>
      </draggable>
    </div>
    <button class="btn btn__preview" @click="openPublish">发布</button>
    <button class="btn btn__publish" @click="openPreview">预览</button>

    <el-dialog
      title="提示"
      width="30%"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="页面名称">
          <el-input v-model="form.pageName"></el-input>
        </el-form-item>
        <el-form-item label="页面ID">
          <el-input v-model="form.pageId" disabled></el-input>
        </el-form-item>
        <el-form-item label="业务模块">
          <el-select v-model="form.biz" @change="chooseBiz" placeholder="请选择业务模块">
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
import { mapGetters, mapState, mapMutations } from 'vuex'
import Draggable from 'vuedraggable'
import { handleDragMixin } from '@/mixins/module'

const getOriginUrl = () => {
  let url = ''
  if (window.location.origin) { // Some browsers (mainly IE) does not have this property, so we need to build it manually...
    url = window.location.origin
  } else {
    url = window.location.protocol + '//' + window.location.hostname +
      (window.location.port ? (':' + window.location.port) : '')
  }
  return url
}

export default {
  name: 'EditPage',
  mixins: [handleDragMixin],
  props: {
    node: {
      type: Object
    }
  },
  data () {
    return {
      dialogVisible: false,
      dragOptions: {
        group: {
          name: 'sections',
          pull: false,
          put: true
        },
        sort: true
      },
      form: {
        pageName: '',
        pageId: '',
        biz: '',
        pageUrl: ''
      }
    }
  },
  components: {
    Draggable
  },
  computed: {
    ...mapGetters('configure', ['isPreview', 'previewPage']),
    ...mapState('configure', ['currentPage'])
  },
  methods: {
    ...mapMutations('configure', ['assignState']),
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
      let iframeUrl = ''
      if (this.isPreview) {
        iframeUrl = getOriginUrl()
        this.$store.commit('SET_PREVIEW_URL', iframeUrl + '/preview')
        this.$store.commit('TOGGLE_PREVIEW', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables';

  .module {
    &__page {
      position: relative;
      width: 320px;
      height: 568px;
      margin-left: auto;
      margin-right: auto;
    }

    &__warpper {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 320px;
      height: 568px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
      overflow: auto;
      border: 2px solid $module-border-color;
      box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.2);
      .drag-content {
        flex: 1;
      }
    }
  }

  .btn {
    position: absolute;
    cursor: pointer;
    padding: 4px;
    border: 1px solid #333;
    right: -41px;

    &__publish {
      bottom: 45px;
    }

    &__preview {
      bottom: 10px;
    }
  }
</style>
