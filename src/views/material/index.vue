<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>图片管理</span>
    </div>
    <div class="navmenu">
      <el-radio-group v-model="imgForm.collect">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <el-upload
        class="upload-demo"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="setToken"
        name="image"
        :show-file-list="false"
        :on-success="onSuccess"
      >
        <el-button type="primary" size="small">上传图片</el-button>
      </el-upload>
    </div>
    <div class="text item">
      <p v-if="imgList.length===0">暂无图片素材</p>
      <ul class="imglist" v-else>
        <li class="imgbox" v-for="item in imgList" :key="item.id">
          <img :src="item.url" alt />
          <div class="imgbtn">
            <el-button type="warning" icon="el-icon-star-off" circle size="mini"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="imgDel(item.id)"
            ></el-button>
          </div>
        </li>
      </ul>
    </div>
    <el-pagination
    background layout="prev, pager, next"
    :total="total"
    @current-change="handleCurrentChange"
    :current-page="imgForm.page"
    :hide-on-single-page="valueFlag"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'material',
  data () {
    return {
      valueFlag: false,
      total: 0,
      imgList: [],
      imgForm: {
        page: 1,
        per_page: 12,
        collect: false
      }
    }
  },
  created () {
    this.getImgList()
  },
  computed: {
    setToken () {
      let token = JSON.parse(window.sessionStorage.getItem('userInfo')).token
      return { Authorization: 'Bearer ' + token }
    }
  },
  watch: {
    imgForm: {
      handler: function () {
        this.getImgList()
      },
      deep: true
    }
  },
  methods: {
    // 当前页变动时候触发的事件
    handleCurrentChange (val) {
      this.imgForm.page = val
    },
    // 删除素材图片
    imgDel (imgId) {
      this.$confirm('是否删除该图片?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let pro = this.$http({
            url: '/mp/v1_0/user/images/' + imgId,
            method: 'delete'
          })
          pro
            .then(result => {
              console.log(result)
              this.getImgList()
            })
            .catch(err => {
              this.$message.error('删除图片错误' + err)
            })
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          })
        })
    },
    onSuccess () {
      this.$message.success('图片上传成功!')
      this.getImgList()
    },
    // 获取素材图片
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
          this.total = result.data.data.total_count
        })
        .catch(err => {
          this.$message.error('获取素材图片错误' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.navmenu {
  display: flex;
  justify-content: space-between;
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
    margin: 20px 25px;
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
