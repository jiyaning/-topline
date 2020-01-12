<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账号信息</span>
    </div>
    <div class="text item">
      <div class="avatarbox">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :http-request="editavatar"
        >
          <img
            v-if="infoForm.photo"
            :src="infoForm.photo"
            class="avatar"
            style="width:80px;height:80px;border-radius:50%"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="usercon" v-show="edittag===false">
        <div class="lt">
          <p>{{infoForm.name}}</p>
          <p>{{infoForm.intro}}</p>
        </div>
        <div class="rt">
          <el-link type="primary" :underline="false" @click.native="edittag = true">修改</el-link>
        </div>
      </div>
      <el-form
        ref="infoFormRef"
        :rules="accountrules"
        :model="infoForm"
        label-width="110px"
        v-show="edittag===true"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="infoForm.name" placeholder="请输入头条号名称"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="infoForm.intro" placeholder="请输入头条号简介"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          size="mini"
          style="margin-left:110px"
          @click.native="infoEdit()"
        >保存</el-button>
        <el-button size="mini" @click.native="edittag = false">取消</el-button>
      </el-form>
    </div>
    <el-divider></el-divider>
    <div class="text">
      <div class="avatarbox">
        <span>账号信息</span>
      </div>
      <div class="infolist">
        <span class="title">头条号类型</span>
        <span>个人</span>
        <el-divider></el-divider>
        <span class="title">头条号ID</span>
        <span>{{infoForm.id}}</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="text">
      <div class="loginbox">
        <span>登录方式</span>
      </div>
      <div class="infolist">
        <span class="title">绑定手机</span>
        <span>{{infoForm.mobile}}</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="text">
      <div class="emailbox">
        <span>邮箱</span>
      </div>
      <div class="usercon" v-show="editEmail===false">
        <div class="lt">
          <p v-if="infoForm.email===null">暂无绑定邮箱</p>
          <p v-else>{{infoForm.email}}</p>
        </div>
        <div class="rt">
          <el-link type="primary" :underline="false" @click.native="editEmail = true">修改邮箱</el-link>
        </div>
      </div>
      <el-form
        ref="infoFormRef"
        :rules="accountrules"
        :model="infoForm"
        label-width="110px"
        v-show="editEmail===true"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="infoForm.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          size="mini"
          style="margin-left:110px"
          @click.native="infoEdit()"
        >保存</el-button>
        <el-button size="mini" @click.native="editEmail = false">取消</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import bus from '@/utils/bus.js'
export default {
  created () {
    this.getuserInfo()
  },
  data () {
    return {
      edittag: false,
      editEmail: false,
      infoForm: {
        email: '',
        id: 0,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      accountrules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 7, message: '长度在 1到 7 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确' }
        ]
      }
    }
  },
  methods: {
    // 更换头像
    editavatar (resourse) {
      let pic = resourse.file
      let fd = new FormData()
      fd.append('photo', pic)
      let pro = this.$http({
        url: '/mp/v1_0/user/photo',
        method: 'patch',
        data: fd
      })
      pro.then(result => {
        console.log(result)
        this.infoForm.photo = result.data.data.photo
        this.$message.success('更新头像成功')
        bus.$emit('upAccountPhoto', result.data.data.photo)
      })
        .catch(err => {
          this.$message.error('上传头像错误' + err)
        })
    },
    // 修改用户信息
    infoEdit () {
      this.$refs.infoFormRef.validate(valid => {
        if (!valid) {
          alert(111)
          return false
        }
        let pro = this.$http({
          url: '/mp/v1_0/user/profile',
          method: 'patch',
          data: this.infoForm
        })
        pro
          .then(result => {
            this.$message({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            })
            this.edittag = false
            this.editEmail = false
            bus.$emit('upAccountName', this.infoForm.name)
          })
          .catch(err => {
            this.$message.error('保存用户信息错误' + err)
          })
      })
    },
    // 获取用户信息
    getuserInfo () {
      let pro = this.$http({
        url: '/mp/v1_0/user/profile',
        method: 'GET'
      })
      pro
        .then(result => {
          console.log(result)
          this.infoForm = result.data.data
        })
        .catch(err => {
          this.$message.error('获取用户信息错误' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  display: flex;
  .avatarbox {
    width: 120px;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-avatar {
      margin-bottom: 10px;
    }
  }
  .usercon {
    flex: 1;
    display: flex;
    justify-content: space-between;
    .rt {
      display: flex;
      align-items: center;
    }
  }
  .loginbox {
    width: 120px;
    height: 20px;
    text-align: center;
  }
  .emailbox {
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .infolist {
    flex: 1;
    .title {
      display: inline-block;
      width: 120px;
    }
  }
  .el-input {
    width: 260px;
  }
}
</style>
