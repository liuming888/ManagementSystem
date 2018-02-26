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
        <p class="crumbs el-icon-arrow-right">单位招聘人数统计</p>
        <schart :canvasId="canvasId" :type="type" :width="width" :height="height" :data="data" :options="options"></schart>
        <span>报名总人数：{{renshuAll}}人</span>
    </div>
</template>
<script>
    import Schart from "vue-schart";
    export default {
      created() {
        this.renshuAll = 0;
        if (this.$store.state.danweirenshuArr.length < 1) {
          this.$router.push({ path: "/" });//当刷新时数据没回来
          var vm=this;
          setTimeout(function() {
            vm.$router.push({ path: "/doc_QK/gegangwei" });
          }, 100);
        }
        this.data = this.$store.state.danweirenshuArr;
        var vm = this;
        this.$store.state.danweirenshuArr.forEach(item => {
          vm.renshuAll += ~~item.value;
        });
      },
      wacth: {
        "$store.state.danweirenshuArr"(newval, oldval) {
          this.data = this.$store.state.danweirenshuArr;
          console.log(this.data);
          this.renshuAll = 0;
          var vm = this;
          this.$store.state.danweirenshuArr.forEach(item => {
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
          type: "pie",
          width: 1000,
          height: 520,
          data: [],
          options: {
            padding: 50, // canvas 内边距
            bgColor: "#FFFFFF", // 默认背景颜色
            title: "招聘人数", // 图表标题
            titleColor: "#4c8fbd", // 图表标题颜色
            titlePosition: "top", // 图表标题位置: top / bottom
            legendColor: "red", // 图例文本颜色
            legendTop: 36, // 图例距离顶部的长度
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
            ], // 环形图颜色列表
            radius: 200, // 环形图外圆半径
            innerRadius: 100 // 环形图内圆半径
          }
        };
      },
      components: {
        Schart
      }
    };
</script>

