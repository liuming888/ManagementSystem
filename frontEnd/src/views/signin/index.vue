<style lang="less" scoped src="./index.less"></style>
<template>
    <div class="bigbox">
        <div class="loginbox">
            <h2>账号注册<span @click="$router.push({path:'/login'})">返回登录页面</span></h2>
            <div>
                <p>邮&nbsp;&nbsp;箱&nbsp;&nbsp;&nbsp;：&nbsp;&nbsp;
                    <input type="text" placeholder="请输入邮箱" v-validate="'required|email'" v-model="youxiang" name="email" />
                    <span v-show="errors.has('email')">格式不正确</span>
                </p>
                </p>

                <p>
                    <p>手机号&nbsp;&nbsp;：&nbsp;&nbsp;
                        <input type="number" placeholder="请输入11位手机号" v-model="shoujihao" v-validate="'required|alpha_num'" name="alpha_num" />
                        <span v-show="errors.has('alpha_num')">格式不正确</span>
                    </p>
                </p>
                <p>
                    <p>账&nbsp;&nbsp;号&nbsp;&nbsp;&nbsp;：&nbsp;&nbsp;
                        <input v-validate="'required|alpha_dash'" name="alpha_dash" type="text" placeholder="能输入字母数字破折号下划线" v-model="zhanghao" />
                        <span v-show="errors.has('alpha_dash')">格式不正确</span>
                    </p>
                </p>
                <p>
                    密&nbsp;&nbsp;码&nbsp;&nbsp;&nbsp;：&nbsp;&nbsp;
                    <input type="password" placeholder="请输入密码" v-model="mima1" name="alpha_dashs" v-validate="'required|alpha_dash'" />
                    <span v-show="errors.has('alpha_dashs')">格式不正确</span>
                </p>
                <p>
                    确定密码： <input type="password" placeholder="请输入密码" v-model="mima2" @blur="blurs" />
                </p>
                <span v-show="isShow" v-html="txt"> </span>
                <p class="btn">
                    <el-button type="primary" class="zhuce" @click="zhuce">立即注册</el-button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
      created() {
        localStorage.setItem("isLogin", false); //存登录状态
      },
      data() {
        return {
          isShow: false, //两次输入不正确
          txt: "两次输入密码不同",
          youxiang: "",
          shoujihao: "",
          zhanghao: "",
          mima1: "",
          mima2: ""
        };
      },
      methods: {
        zhuce() {
          //注册按钮点击
          if (
            this.youxiang == "" ||
            this.shoujihao == "" ||
            this.zhanghao == "" ||
            this.mima1 == "" ||
            this.mima2 == "" ||
            this.errors.has("email") ||
            this.errors.has("alpha_num") ||
            this.errors.has("alpha_dash") ||
            this.errors.has("alpha_dashs") ||
            this.isshow
          ) {
            this.isShow = true;
            this.txt = "以上都为必填项";
            return;
          }
          this.isShow = false;
          this.txt = "两次输入密码不同";
          var str = "123456789abcd",
            id = "";
          for (let i = 0; i < 9; i++) {
            id += str[~~(Math.random() * str.length)];
          }
          this.$store.dispatch("SIGNIN", {
            zhanghao: this.zhanghao,
            mima: this.mima1,
            youxiang: this.youxiang,
            shoujihao: this.shoujihao,
            id
          });
        },
        blurs() {
          if (this.mima1 != this.mima2) {
            this.isShow = true;
          } else {
            this.isShow = false;
          }
        }
      },
      watch: {
        "$store.state.zhucedata"(newval, oldval) {
          if (newval == 0) {
            this.txt = "账户名已被占用";
          } else if (newval == -1) {
            this.txt = "注册失败，请您重新注册";
          }
        }
      }
    };
</script>

