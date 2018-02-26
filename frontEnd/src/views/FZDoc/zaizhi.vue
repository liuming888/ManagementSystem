<style lang="less" scoped>
    .bigbox {
      width: 100%;
      height: 547px;
      position: relative;
      .box {
        height: 480px;
        .crumbs {
          margin-bottom: 60px;
        }
        div {
          margin-bottom: 20px;
          p {
            margin-bottom: 16px;
          }
          input {
            width: 300px;
            height: 36px;
            &.cur {
              border-color: rgb(224, 224, 231);
              border-width: 3px;
            }
          }
          span {
            color: red;
            transition: all 1s;
          }
        }
      }
      .maplist {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #f5f7fc;
      }
    }
</style>

<template>
    <div class="bigbox">
        <div class="box">
            <p class="crumbs el-icon-arrow-right">查询在职人员信息</p>
            <div>
                <p>单位名称</p>
                <p>
                    <input placeholder="请输入要查询的单位" :class="{cur:isBe}" @focus="isBe=false" v-model="biaoShow.danwei"></input>
                </p>
            </div>
            <div>
                <p>职位</p>
                <p>
                    <input placeholder="请输入要查询的职位" :class="{cur:isBe}" @focus="isBe=false" v-model="biaoShow.gangwei" @keyup.enter="goRouter"></input>
                </p>
                <span v-if="isBe">您输入的单位或职位没有信息</span>
            </div>
            <el-button type="primary" size="medium" @click="goRouter" ref="btn">&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;</el-button>
        </div>
        <div class="maplist" v-if="biaoShow.showIs">
            <zaizhirenbiao :biaoShow="biaoShow"></zaizhirenbiao>
        </div>
    </div>
</template>
<script>
    import zaizhirenbiao from "../../components/zaizhirenbiao.vue";
    import { Loading } from "element-ui";
    export default {
      data() {
        return {
          isBe: false,
          biaoShow: {
            danwei: "",
            gangwei: "",
            showIs: false, //显示弹出层？
            isShow: false //显示图表?
          },
          multipleSelection: [],
          isShow: false,
          loadingInstance: null //懒加载
        };
      },
      components: { zaizhirenbiao },
      methods: {
        goRouter() {
          //向数据库拉取请求 当请求数据回了才让图表组件显示（这里有个大坑）
          if (this.danwei == "" || this.gangwei == "") {
            this.isBe = true;
            return;
          }
          this.$store.dispatch("ZAIZHIALL", {
            danwei: this.biaoShow.danwei,
            gangwei: this.biaoShow.gangwei,
            page: 1, //请求明细首页
            pagesum: 10 //默认每页5条
          });
          this.loadingInstance = Loading.service({ fullscreen: true });
        }
      },
      watch: {
        "$store.state.zaizhilist"(newval, oldval) {
          //监听全局，当它被请求回的数据改变了才让表格组件显示
          if (this.biaoShow.isShow) return;
          var arr = newval;
          if (arr.length < 1) {
            //如果用户输入的单位岗位不存在
            this.isBe = true;
            return;
          }
          this.biaoShow.isShow = true;
          this.isBe = false;
          this.biaoShow.showIs = true;
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            this.loadingInstance.close();
          });
        }
      }
    };
</script>

