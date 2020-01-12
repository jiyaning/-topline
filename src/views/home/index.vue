<template>
  <el-container>
    <el-aside :style="{width:iscollapse?'65px':'200px'}">
      <el-menu
        background-color="#353B4E"
        text-color="#fff"
        active-text-color="#409eff"
        :collapse="iscollapse"
        :collapse-transition="false"
        :width="iscollapse?'65px':'200px'"
        router
      >
        <el-menu-item index="/welcome" :style="{width:iscollapse?'65px':'200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="2" :style="{width:iscollapse?'65px':'200px'}">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/articleadd">发布文章</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
          <el-menu-item index="/comment">评论列表</el-menu-item>
          <el-menu-item index="/material">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3" :style="{width:iscollapse?'65px':'200px'}">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>粉丝管理</span>
          </template>
          <el-menu-item index="3-1">图文数据</el-menu-item>
          <el-menu-item index="3-2">粉丝概况</el-menu-item>
          <el-menu-item index="3-3">粉丝画像</el-menu-item>
          <el-menu-item index="3-4">粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="/account" :style="{width:iscollapse?'65px':'200px'}">
          <i class="el-icon-setting"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="lt">
          <i
            :class="iscollapse? 'el-icon-s-unfold':'el-icon-s-fold'"
            @click="iscollapse=!iscollapse"
          ></i>
          <span>江苏传智播客教育科技股份有限公司</span>
        </div>
        <div class="rt">
          <el-input placeholder="请输入搜索文章内容" type="text" v-model="search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <span class="msg">消息</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="photo" alt class="avatar" />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
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
import bus from '@/utils/bus.js'

export default {
  name: 'Home',
  data () {
    return {
      tmpname: '',
      tmpphoto: '',
      search: '',
      iscollapse: false
    }
  },
  computed: {
    name: function () {
      return this.tmpname || JSON.parse(window.sessionStorage.getItem('userInfo')).name
    },
    photo: function () {
      return this.tmpphoto || JSON.parse(window.sessionStorage.getItem('userInfo')).photo
    }
  },
  created () {
    bus.$on('upAccountName', nm => {
      let userinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      userinfo.name = nm
      window.sessionStorage.setItem('userInfo', JSON.stringify(userinfo))
      this.tmpname = nm
    })
    bus.$on('upAccountPhoto', ph => {
      let userinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      userinfo.photo = ph
      window.sessionStorage.setItem('userInfo', JSON.stringify(userinfo))
      this.tmpphoto = ph
    })
  },
  methods: {
    logout () {
      this.$confirm('是否确认退出系统?', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.removeItem('userInfo')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          duration: 500,
          message: '退出系统!'
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: #323745;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    .lt {
      width: 40%;
      display: flex;
      align-items: center;
      font-size: 20px;
      i {
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
      .msg {
        margin: 0 10px 0 20px;
      }
      .el-dropdown {
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 10px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .el-dropdown-menu {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .el-main {
    background-color: #ececec;
    padding: 8px;
  }
}
</style>
