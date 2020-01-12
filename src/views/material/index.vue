<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>图片管理</span>
    </div>
    <div class="text item">
      <ul class="imglist">
        <li class="imgbox" v-for="item in imgList" :key="item.id">
          <img :src="item.url" alt />
          <div class="imgbtn">
            <el-button type="warning" icon="el-icon-star-off" circle size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'material',
  data () {
    return {
      imgList: [],
      imgFrom: {
        page: 1,
        per_page: 12,
        collect: false
      }
    }
  },
  created () {
    this.getImgList()
  },
  methods: {
    getImgList () {
      let pro = this.$http({
        url: '/mp/v1_0/user/images',
        method: 'get',
        params: this.imgFrom
      })
      pro
        .then(result => {
          console.log(result)
          this.imgList = result.data.data.results
        })
        .catch(err => {
          this.$message.error('获取素材图片错误' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
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
