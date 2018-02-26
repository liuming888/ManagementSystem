<style lang="less" scoped src="./index.less"></style>
<template>
    <div class="bigbox">
        <div class="loginbox">
            <h2>招聘管理系统</h2>
            <div>
                <p>账号： <input type="text" placeholder="请输入账号" v-model="zhanghao" @focus="foucus('zhanghao')" /></p>
                </p>
                <p>
                    密码： <input type="password" placeholder="请输入密码" v-model="mima" @focus="foucus" @keyup.enter="delu"/> <span @click="zhuce">注册账号？</span>
                </p>
                <p class="cuowu" v-show="$store.state.isshow">账号或密码输入错误</p>

                <p class="btn">
                    <el-button type="primary" class="denglu" @click="delu">登录</el-button>
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
          zhanghao: "",
          mima: ""
        };
      },
      methods: {
        delu() {
          //登录按钮点击
          this.$store.dispatch("LOGIN", {
            zhanghao: this.zhanghao,
            mima: this.mima
          });
        },
        foucus(type) {
          this.$store.commit("XLOGIN", {
            //获取焦点时
            a: "false"
          });
          if (type == "zhanghao") {
            //账号
            this.zhanghao = "";
            this.mima = "";
          }
        },
        zhuce(){
            localStorage.setItem("isLogin", true); //存登录状态
            this.$router.push({path:'/signin'});
        }
      },
      watch: {
        $route(to, from) {
          if (to.path == "/login") {
            this.zhanghao = "";
            this.mima = "";
          }
        },
        "$store.state.isshow"(newval, oldval) {
          this.mima = "";
        }
      }
    };
</script>

