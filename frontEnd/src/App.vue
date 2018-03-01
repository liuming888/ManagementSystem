<style lang="less" scoped>
    .el-header {
      background-color: #409effd1;
      line-height: 60px;
      font-weight: bold;
      font-size: 20px;
      color: #fff;
      .users {
        float: right;
        span {
          font-size: 16px;
          cursor: pointer;
          &:hover {
            color: blue;
          }
        }
        img {
            width: 30px;height: 30px;position: relative;top:16px;left:0;
          font-size: 12px;
          cursor: pointer;
          &:hover {
            color: blue;
          }
        }
      }
    }
    .el_main{
        width: calc(100%-300px);
    }
    .bigboxs{
        width: 100%;height: 100%;
        .minboxs{
            width: 100%;height: 100%;
        }
    }
</style>
<template>
    <div class="bigboxs">
        <div v-if="!showMap" class="minboxs">
            <router-view></router-view>
        </div>
        <el-container v-show="showMap">
            <el-header>
                招聘管理系统
                <div class="users">
                    <img :src="$store.state.userMap.appuserurl" alt="用户信息" @click="user" class="imgtou"/>
                    <span @click="tuichu">退出登录</span>
                </div>
            </el-header>
            <el-container>
                <el-aside width="300px">
                    <el-menu class="el-menu-vertical-demo" :default-active="curidx">
                        <el-menu-item :index="nav.id" v-for="(nav,idx) of maplist1" :key="nav.id" @click="Gorouter(nav.url)">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">{{nav.title}}</span>
                        </el-menu-item>
                        <el-submenu :index="item.id" v-for="(item,index) of maplist2" :key="item.id">
                            <template slot="title">
                                <i class="el-icon-more-outline"></i>
                                <span>{{item.title}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item :index="item.id+'-1'" @click="Gorouter(item.url1)">{{item.list1}}
                                </el-menu-item>
                                <el-menu-item :index="item.id+'-2'" @click="Gorouter(item.url2)">{{item.list2}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main class="el_main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
      created() {
        localStorage.setItem("isLogin", false); //存登录状态
        this.$store.dispatch("ALLPAGE", { page: 1 }); //拉取信息管理第一页数据
        this.$store.dispatch("ALLSUM"); //拉取招聘人数统计图数据
        this.$store.dispatch("ZAIZHISUM"); //拉取在职人数统计图数据
        if(localStorage.getItem("isLogin")=='true'){//如果登录了
            this.$store.dispatch("USERSURL");//拉取用户信息
        }
      },
      data() {
        return {
          userurl:'',
          showMap: false, //是否登录
          curidx: "1", //导航菜单加颜色
          maplist1: [
            { title: "报名登记表", url: "/doc", id: "1" },
            { title: "报名登记信息管理", url: "/CGDoc", id: "2" },
            { title: "单位报名职位一览表", url: "/postYLB", id: "3" }
          ],
          maplist2: [
            {
              title: "报名情况",
              id: "22",
              list1: "单位招聘人数统计",
              url1: "/doc_QK/gegangwei",
              list2: "查询报名信息明细",
              url2: "/doc_QK/chaMX"
            },
            {
              title: "辅助表单",
              id: "11",
              list1: "公司职员统计",
              url1: "/FZDoc/zhiyuan", //公司职员统计
              list2: "在职人员名册",
              url2: "/FZDoc/zaizhi"
            }
          ]
        };
      },
      watch: {
        $route(to, from) {
          if (to.path == "/signin" && from.path == "/login") {
            this.$alert("正在前往注册页面", "页面跳转中...", {
              confirmButtonText: "确定",
              callback: action => {
                this.$message({
                  type: "info",
                  message: `action: ${action}`
                });
              }
            });
          }
          if (to.path == "/signin" || to.path == "/login") {
            localStorage.setItem("isLogin", false); //存登录状态
            this.showMap = false;
          } else {
            //不是登录注册页面，让侧边栏显示
            localStorage.setItem("isLogin", true); //存登录状态
            this.showMap = true;
          }
          /*  if (to.path == "/doc") {
                //如果登录成功
                this.showMap = true;
              } */
          this.maplist1.forEach(item => {
            if (to.path == item.url) {
              //  this.showMap = true;
              this.curidx = item.id;
            }
          });
          var vm = this;
          this.maplist2.forEach(item => {
            if (to.path == item.url1 || to.path == item.url2) {
              //  this.showMap = true;
              if (to.path == item.url1) {
                this.curidx = item.id + "-1";
              } else {
                this.curidx = item.id + "-2";
              }
            }
          });
            if(to.path=='/user'){
                this.curidx = '';
            }
        },
        '$store.state.userMap'(newval,oldval){
            this.userurl=this.$store.state.userMap.userurl;
        }
      },
      methods: {
        Gorouter(url) {
          this.$router.push({
            path: url
          });
        },
        user() {
          this.curidx = "";
          this.$router.push({ path: "/user" });
        },
        tuichu() {
          //退出登录
          this.showMap = false;
          this.$router.push({
            path: "/login"
          });
        }
      }
    };
</script>


