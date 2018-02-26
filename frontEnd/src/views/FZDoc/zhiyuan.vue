<style lang="less" scoped>
    .bigbox {
      position: relative;
      span {
        position: absolute;
        bottom: 30px;
        left: 5px;
        font-size: 18px;
      }
    }
</style>

<template>
    <div class="bigbox">
        <p class="crumbs el-icon-arrow-right">公司职员统计</p>
        <schart :canvasId="canvasId" :type="type" :width="width" :height="height" :data="data" :options="options"></schart>
        <span>职员总人数：{{renshuAll}}人</span>
    </div>
</template>
<script>
    import Schart from "vue-schart";
    export default {
      created() {
           this.renshuAll=0;
        this.data = this.$store.state.zaizhirenshuArr;
        var vm = this;
        this.$store.state.zaizhirenshuArr.forEach(item => {
          vm.renshuAll += ~~item.value;
        });
      },
      watch: {
        "$store.state.zaizhirenshuArr"(newval, oldval) {
          this.data = this.$store.state.zaizhirenshuArr;
           this.renshuAll=0;
          var vm = this;
          this.$store.state.zaizhirenshuArr.forEach(item => {
            vm.renshuAll += ~~item.value;
          });
          this.$store.dispatch("ALLSUM"); //拉取招聘人数统计图数据
          this.$store.dispatch("ZAIZHISUM"); //拉取在职人数统计图数据
        }
      },
      data() {
        return {
          renshuAll: 0,
          canvasId: "myCanvas",
          type: "ring",
          width: 1000,
          height: 520,
          data: [],
          options: {
            padding: 50, // canvas 内边距
            bgColor: "#FFFFFF", // 默认背景颜色
            title: "在职人员一览图", // 图表标题
            titleColor: "#000000", // 图表标题颜色
            titlePosition: "top", // 图表标题位置: top / bottom
            legendColor: "#000000", // 图例文本颜色
            legendTop: 40, // 图例距离顶部的长度
            colorList: [
              "#1E9FFF",
              "#13CE66",
              "#F7BA2A",
              "#FF4949",
              "#72f6ff",
              "#FF1493",
              "#FF0000",
              "#EE30A7",
              "#FFAEB9",
              "#DC143C"
            ], // 环形图颜色列表,   // 环形图颜色列表
            radius: 200, // 环形图外圆半径
            innerRadius: 120 // 环形图内圆半径
          }
        };
      },
      components: {
        Schart
      }
    };
</script>

