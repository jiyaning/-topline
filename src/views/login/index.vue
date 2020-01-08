<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="formref" :model="loginForm" :rules="formrules">
        <img src="./logo_index.png" alt />
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号">
            <i slot="prefix" class="iconfont icon-shoujihao"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="验证码">
            <i slot="prefix" class="iconfont icon-yanzhengma"></i>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align:left" prop="xieyi">
          <el-checkbox v-model="loginForm.xieyi" style="margin-right:10px"></el-checkbox>
          <span>
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width:100%"
            type="primary"
            @click="login()"
            :disabled="isLoading"
            :loading="isLoading"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import './gt.js'
import '../../assets/iconfont/iconfont.css'
export default {
  name: 'Login',
  data () {
    var xieyiTest = function (rule, value, callback) {
      value ? callback() : callback(new Error('请遵守协议'))
    }
    return {
      capobj: null,
      isLoading: false,
      loginForm: {
        mobile: '',
        code: '',
        xieyi: false
      },
      formrules: {
        mobile: [
          { required: true, message: '手机号码必须填写' },
          { pattern: /^1[35789]\d{9}$/, message: '手机号码格式不对' }
        ],
        code: [{ required: true, message: '验证码必须填写' }],
        xieyi: [{ validator: xieyiTest }]
      }
    }
  },
  methods: {
    login () {
      // this.$router.push('/home')
      this.$refs.formref.validate(valid => {
        if (!valid) {
          return false
        }
        if (this.capobj) {
          return this.capobj.verify()
        }
        this.isLoading = true
        let pro = this.$http({
          url: '/mp/v1_0/captchas/' + this.loginForm.mobile,
          method: 'GET'
        })
        pro
          .then(result => {
            let { data } = result.data
            window.initGeetest(
              {
                // 以下配置参数来自服务端 SDK
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success,
                new_captcha: true,
                product: 'bind' // 设置验证窗口样式的
              },
              captchaObj => {
                // 这里可以调用验证实例 captchaObj 的实例方法
                captchaObj
                  .onReady(() => {
                    // 验证码ready之后才能调用verify方法显示验证码(可以显示窗口了)
                    captchaObj.verify() // 显示验证码窗口
                    this.isLoading = false
                    this.capobj = captchaObj
                  })
                  .onSuccess(() => {
                    // 行为校验正确的处理
                    // B. 验证账号，登录系统
                    this.loginAct()
                  })
                  .onError(() => {
                    // 行为校验错误的处理
                  })
              }
            )
          })
          .catch(err => {
            this.$message.error('获取秘钥失败' + err)
          })
      })
    },
    loginAct () {
      let pro = this.$http({
        url: '/mp/v1_0/authorizations',
        method: 'POST',
        data: this.loginForm
      })
      pro
        .then(result => {
          window.sessionStorage.setItem(
            'userInfo',
            JSON.stringify(result.data.data)
          )
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          // this.$message.error('手机号或者验证码错误' + err)
          this.$message({
            type: 'error',
            message: '手机号或者验证码错误' + err,
            duration: 1000
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.login-container {
  background-color: gray;
  background-image: url("./login_bg.jpg");
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 410px;
    height: 370px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 75%;
      text-align: center;
      img {
        width: 60%;
        margin: 20px auto;
      }
    }
  }
}
</style>
