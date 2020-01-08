<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        background-color="#353B4E"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <el-menu-item index="1" style="width:200px">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="2" style="width:200px">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="1-1">发布文章</el-menu-item>
          <el-menu-item index="1-2">内容列表</el-menu-item>
          <el-menu-item index="1-3">评论列表</el-menu-item>
          <el-menu-item index="1-4">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3" style="width:200px">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>粉丝管理</span>
          </template>
          <el-menu-item index="3-1">图文数据</el-menu-item>
          <el-menu-item index="3-2">粉丝概况</el-menu-item>
          <el-menu-item index="3-3">粉丝画像</el-menu-item>
          <el-menu-item index="3-4">粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="4" style="width:200px">
          <i class="el-icon-setting"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="lt">
          <i class="el-icon-s-unfold"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
        </div>
        <div class="rt">
          <el-input placeholder="请输入搜索文章内容" type="text" v-model="search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <span class="msg">消息</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="photo" alt="" class="avatar">
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  computed: {
    name: function () {
      return JSON.parse(window.sessionStorage.getItem('userInfo')).name
    },
    photo: function () {
      return JSON.parse(window.sessionStorage.getItem('userInfo')).photo
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  background-color: #ccc;
  .el-aside {
    background-color: #323745;
  }
  .el-header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .lt {
      width: 40%;
      display: flex;
      align-items:center;
      font-size: 20px;
      i{
        margin-right: 10px;
        font-size: 25px;
      }
    }
    .rt {
      width: 60%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-input {
        width: 180px;
        // height: 32px;
      }
      .msg{
        margin: 0 10px 0 20px
      }
      .el-dropdown{
        .avatar{
          width:35px;
          height:35px;
          border-radius:50%;
          vertical-align: middle;
        }
        .el-dropdown-menu{
        display: flex;
        align-items: center;
      }
      }

    }
  }
  .el-main {
    // background-color: #fff;
  }
}
</style>
