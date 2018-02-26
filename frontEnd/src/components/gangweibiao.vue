<style lang="less" scoped>
    .bigbox {
      .el-icon-caret-left {
        font-size: 18px;
        color: rgb(58, 57, 97);
        cursor: pointer;
        color:rgb(37, 16, 156);
      }
    }
</style>

<template>
    <div class="bigbox">
        <p class="el-icon-caret-left" @click="fanhui">返回</p>
        <div id="app">
            <schart :canvasId="mapView.canvasId" :type="mapView.type" :width="mapView.width" :height="mapView.height" :data="mapView.data" :options="mapView.options"></schart>
        </div>
    </div>
</template>
<script>
    import Schart from "vue-schart";
    export default {
      props: ["mapView"],
      methods: {
        fanhui() {
          this.mapView.biaoShow = false;
        }
      },
      components: {
        Schart
      }
    };
</script>

