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
              border-color: red;
            }
          }
          span {
            color: red;
            transition: all 1s;
          }
        }
      }
      .router {
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
            <p class="crumbs el-icon-arrow-right">单位报名职位一览表</p>
            <div>
                <p>单位名称</p>
                <p>
                    <input placeholder="请输入要查询的单位" @keyup.enter="goRouter" v-model.trim="mapView.options.title" :class="{cur:isBe}" @focus="isBe=false"></input>
                </p>
                <span v-if="isBe">您输入错误，或您输入的单位没有招聘报名信息，请从新输入</span>
            </div>
            <el-button type="primary" size="medium" @click="goRouter" ref="btn">&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;</el-button>
        </div>
        <div class="router" v-if="mapView.biaoShow">
            <gangwei :mapView="mapView"></gangwei>
        </div>
    </div>
</template>
<script>
    import gangwei from "../../components/gangweibiao.vue";
    export default {
      data() {
        return {
          mapView: {
            biaoShow: false,
            canvasId: "myCanvas",
            type: "bar",
            width: 1000,
            height: 520,
            data: [],
            options: {
              title: ""
            }
          },
          isBe: false
        };
      },
      components: {
        gangwei
      },
      methods: {
        goRouter() {//向数据库拉取请求 当请求数据回了才让图表组件显示（这里有个大坑）
          if (this.mapView.options.title == "") return;
          this.$store.dispatch("ZHUTUSHUZHU", {
            danwei: this.mapView.options.title
          });
        }
      },
      watch: {
        "$store.state.gangweilist"(newval, oldval) {//监听全局，当它被请求回的数据改变了才让图表组件显示
          this.mapView.data = newval;
          if (this.mapView.data.length < 1) {
            //如果用户输入的单位不存在
            this.isBe = true;
            return;
          }
          this.isBe = false;
          this.mapView.biaoShow = true;
        }
      }
    };
</script>

