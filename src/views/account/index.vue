<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账号信息</span>
    </div>
    <div class="text item">
      <div class="avatarbox">
        <el-avatar :size="55" :src="infoForm.photo"></el-avatar>
        <el-link type="primary" :underline="false" @click.native="editavatar()">更换头像</el-link>
      </div>
      <div class="usercon" v-show="edittag===false">
        <div class="lt">
          <p>{{infoForm.name}}</p>
          <p>{{infoForm.intro}}</p>
        </div>
        <div class="rt">
          <el-link type="primary" :underline="false" @click.native="editinfo()">修改</el-link>
        </div>
      </div>
      <el-form ref="infoFormRef" :model="infoForm" label-width="110px" v-show="edittag===true">
        <el-form-item label="名称">
          <el-input v-model="infoForm.name" placeholder="请输入头条号名称"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="infoForm.intro" placeholder="请输入头条号简介"></el-input>
        </el-form-item>
        <el-button type="primary" size="mini" style="margin-left:110px" @click.native="save()">保存</el-button>
        <el-button size="mini" @click.native="cancel()">取消</el-button>
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
          <p>{{infoForm.email}}</p>
        </div>
        <div class="rt">
          <el-link type="primary" :underline="false" @click.native="editemail()">修改邮箱</el-link>
        </div>
      </div>
      <el-form ref="infoListRef" :model="infoForm" label-width="110px" v-show="editEmail===true">
        <el-form-item label="邮箱">
          <el-input v-model="infoForm.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-button type="primary" size="mini" style="margin-left:110px" @click.native="saveEmail()">保存</el-button>
        <el-button size="mini" @click.native="cancelEmail()">取消</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
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
      }
    }
  },
  methods: {
    editemail () {
      this.editEmail = true
    },
    editavatar () {
      const h = this.$createElement
      this.$msgbox({
        title: '上传头像',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        })
      })
    },
    editinfo () {
      this.edittag = true
    },
    cancelEmail () {
      this.editEmail = false
    },
    saveEmail () {
      this.editEmail = true
    },
    cancel () {
      this.edittag = false
    },
    save () {
      let pro = this.$http({
        url: '/mp/v1_0/user/profile',
        method: 'PATCH',
        data: this.infoForm
      })
      pro
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          this.$message.error('保存用户信息错误' + err)
        })
    },
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
