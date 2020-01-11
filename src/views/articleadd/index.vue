<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>发表文章</span>
    </div>
    <el-form ref="articleFormRef" :model="articleForm" label-width="100px" :rules="addrules">
      <el-form-item label="标题:" prop="title">
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容:" prop="content">
        <quill-editor v-model="articleForm.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面:" >
        <el-radio-group v-model="articleForm.cover.type">
          <el-radio :label="-1">自动</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">3张</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道:" prop="channel_id">
        <el-select v-model="articleForm.channel_id" placeholder="请选择" clearable>
          <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" @click="articleAdd(false)">发表</el-button>
        <el-button @click="articleAdd(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'articleadd',
  components: {
    quillEditor
  },
  created () {
    this.getchannelList()
  },
  data () {
    return {
      channelList: [],
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      addrules: {
        title: [
          { required: true, message: '请输入文章标题' },
          { min: 5, max: 30, message: '文章标题在5到30个字符' }
        ],
        content: [
          { required: true, message: '请输入文章内容' },
          { min: 5, max: 90, message: '文章内容在5到90个字符' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
    }
  },
  methods: {
    articleAdd (flag) {
      this.$refs.articleFormRef.validate((valid) => {
        if (!valid) {
          return false
        }
        let pro = this.$http({
          url: '/mp/v1_0/articles',
          method: 'post',
          data: this.articleForm,
          params: { draft: flag }
        })
        pro
          .then(result => {
            console.log(result)
            this.getchannelList()
            this.$router.push('/article')
          })
          .catch(err => {
            this.$message.error('发布文章错误' + err)
          })
      })
    },

    getchannelList () {
      let pro = this.$http({
        url: '/mp/v1_0/channels',
        method: 'GET'
      })
      pro
        .then(result => {
          this.channelList = result.data.data.channels
        })
        .catch(err => {
          return this.$message.error('获取列表频道失败' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 450px;
}
.quill-editor /deep/ .ql-container {
  height: 200px;
}
</style>
