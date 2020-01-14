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
        <ul class="uploadcon">
          <li class="uploadbox" v-for="item in covernum" :key="item" @click="showDialog(item)">
            <img v-if="articleForm.cover.images[item-1]" :src="articleForm.cover.images[item-1]" alt />
            <div class="conbox" v-else>
              <span>点击图标选择图片</span>
              <i class="el-icon-picture-outline" style="font-size:90px"></i>
            </div>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="频道:" prop="channel_id">
        <channel @slt="selectHander" :chid="articleForm.channel_id"></channel>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" @click="articleedit(false)">发表</el-button>
        <el-button @click="articleedit(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="素材库" :visible.sync="dialogVisible" width="70%">
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="素材库" name="first">
          <ul class="imglist">
            <li class="imgbox" v-for="item in imgList" :key="item.id" @click="selectImg">
              <img :src="item.url" alt />
              <div class="imgbtn">
                <el-button type="warning" icon="el-icon-star-off" circle size="mini"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <el-button type="primary" size="small">上传图片</el-button>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="imgSave()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Channel from '@/components/channel.vue'
export default {
  name: 'articleadd',
  components: {
    quillEditor,
    Channel
  },
  created () {
    this.getarticleByid()
    this.getImgList()
  },
  data () {
    return {
      imgList: [],
      activeName: 'first',
      dialogVisible: false,
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
  computed: {
    aid () {
      return this.$route.params.aid
    },
    covernum () {
      if (this.articleForm.cover.type > 0) {
        return this.articleForm.cover.type
      }
      return 0
    }
  },
  methods: {
    // 获取素材库图片
    getImgList () {
      let pro = this.$http({
        url: '/mp/v1_0/user/images',
        method: 'get',
        params: this.imgForm
      })
      pro
        .then(result => {
          console.log(result)
          this.imgList = result.data.data.results
        })
        .catch(err => {
          this.$message.error('获取素材图片错误' + err)
        })
    },
    // 选择好图片后，点击确定
    imgSave () {
      this.articleForm.cover.images[this.xu] = this.materialUrl
      this.dialogVisible = false
    },
    // 选择图片
    selectImg (event) {
      var lis = document.getElementsByTagName('li')
      for (var i = 0; i < lis.length; i++) {
        lis[i].style.border = ''
      }
      let activeLi = event.target.parentNode
      activeLi.style.border = '4px solid skyblue'
      this.materialUrl = event.target.src
    },
    showDialog (num) {
      this.xu = num - 1
      this.dialogVisible = true
    },
    // 选择频道
    selectHander (val) {
      this.articleForm.channel_id = val
    },
    getarticleByid () {
      let pro = this.$http({
        url: '/mp/v1_0/articles/' + this.aid,
        method: 'GET'
      })
      pro
        .then(result => {
          console.log(result)
          this.articleForm = result.data.data
        })
        .catch(err => {
          return this.$message.error('获取文章失败' + err)
        })
    },
    // 文章编辑
    articleedit (flag) {
      this.$refs.articleFormRef.validate((valid) => {
        if (!valid) {
          return false
        }
        let pro = this.$http({
          url: '/mp/v1_0/articles/' + this.aid,
          method: 'put',
          data: this.articleForm,
          params: { draft: flag }
        })
        pro
          .then(result => {
            this.$message({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            })
            this.$router.push('/article')
          })
          .catch(err => {
            this.$message.error('发布文章错误412' + err)
          })
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
.uploadcon {
  display: flex;
  width: 100%;
  .uploadbox {
    list-style: none;
    border: 1px solid #ccc;
    height: 200px;
    margin: 0 20px;
    .conbox {
      width: 200px;
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin: 20px;
      }
    }
    img {
      width: 200px;
      height: 200px;
    }
  }
}
.imglist {
  padding-right: 100px;
  display: flex;
  flex-wrap: wrap;
  .imgbox {
    width: 150px;
    height: 180px;
    border: 1px solid #eee;
    list-style: none;
    margin: 15px;
    display: flex;
    flex-direction: column;
    img {
      width: 150px;
      height: 140px;
    }
    .imgbtn {
      height: 40px;
      background-color: #ccc;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
