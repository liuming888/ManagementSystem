<style lang="less" scoped src="./index.less"></style>
<template>
    <div class="bigbox">
        <p class="crumbs el-icon-arrow-right">报名登记信息管理</p>
        <div class="tijian">
            <h3>查询条件</h3>
            <el-row class="demo-input">
                <el-col :span="5">
                    <el-input class="inline-input" placeholder="请输入身份证号码" v-model.trim="val1" @keyup.enter="cha('cc')" size="small"></el-input>
                </el-col>
                <el-col :span="5">
                    <el-input class="inline-input" placeholder="请输入姓名" v-model.trim="val2" @keyup.enter="cha('cc')" size="small"></el-input>
                </el-col>
                <el-col :span="5">
                    <el-input class="inline-input" placeholder="请输入手机" v-model.trim="val3" @keyup.enter="cha('cc')" size="small"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button class="btn1" type="primary" @click="cha('cc')" size="small">查询</el-button>
                    <el-button class="btn2" type="primary" @click="cha('cz')" size="small">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="table">

            <el-table :data="tableData" style="width: 9999" border @row-dblclick="tanchu($event.id)" size="mini" v-loading="loading2" element-loading-background="rgba(255, 255, 255, 0.8)">
                <el-table-column prop="danwei" label="应聘单位" width="100">
                </el-table-column>
                <el-table-column prop="gangwei" label="应聘职位" width="100">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="shenfenzheng" label="身份证号码" width="180">
                </el-table-column>
                <el-table-column prop="mingzhu" label="民族" width="100">
                </el-table-column>
                <el-table-column prop="hunyin" label="婚姻状况" width="100">
                </el-table-column>
                <el-table-column prop="huji" label="户籍性质" width="360">
                </el-table-column>
                <el-table-column prop="zhengzhimianmao" label="政治面貌" width="100">
                </el-table-column>
                <el-table-column prop="xueli" label="学历" width="100">
                </el-table-column>
                <el-table-column prop="shengyu" label="生育状况" width="100">
                </el-table-column>
                <el-table-column prop="shoujihao" label="手机" width="180">
                </el-table-column>
                <el-table-column prop="dizhi" label="居住地址" width="240">
                </el-table-column>
                <el-table-column prop="liaoxiren" label="紧急情况联系人" width="180">
                </el-table-column>
                <el-table-column prop="liaoxirenhaoma" label="紧急情况联系人手机" width="180">
                </el-table-column>
                <el-table-column prop="shifouyouqinyou" label="是否有亲友在应聘单位工作" width="240">
                </el-table-column>
                <el-table-column prop="qipanyueshouru" label="期望月收入" sortable width="180">
                </el-table-column>
                <el-table-column prop="zuichidaogangshijian" label="最迟到岗时间" width="180">
                </el-table-column>
                <el-table-column prop="chengxinchengnuo" label="诚信承诺" width="680">
                </el-table-column>
            </el-table>
        </div>
        <div class="setpage" v-if="$store.state.maplist.length>2">
            <el-pagination background layout="prev, pager, next" :total="pagesum" class="pages" @current-change="loadpage">
            </el-pagination>
            <span class="tishi">提示：双击某条数据修改</span>
        </div>
        <div class="tanchu" v-if="chagaishuju.dialogFormVisible">
            <chagai :chagaishuju='chagaishuju'></chagai>
        </div>
    </div>
</template>
<script>
    import chagai from "../../components/chagai.vue";
    export default {
      data() {
        return {
          val1: "",
          val2: "",
          val3: "",
          tableData: [],
          pagesum: "",
          Noloadpage: false, //分页组件不发请求 ？默认false
          chagaishuju: {
            dialogFormVisible: false,
            form: {}
          },
          loading2:false//懒加载
        };
      },
      created() {
        this.tableData = this.$store.state.maplist.slice(0, 8); //默认显示两条
        this.pagesum = this.$store.state.pages * 8; //element的分页原因乘10
      },
      watch: {
        "$store.state.maplist"(newval, oldval) {
          this.tableData = this.$store.state.maplist.slice(0, 8); //默认显示两条
          this.pagesum = this.$store.state.pages * 8; //element的分页原因乘10
          this.loading2=false;
        }
      },
      methods: {
        loadpage(page) {
          //每次点查询按钮它也插一脚，很烦
          if (this.Noloadpage) return;
          //获取当前页
          this.$store.dispatch("ALLPAGE", { page });
          this.loading2=true;
        },
        cha(type) {
          this.Noloadpage = true; //分页组件不发请求 ？
          if (type == "cz") {
            //点了重置后
            this.val1 = "";
            this.val2 = "";
            this.val3 = "";
            this.Noloadpage = false; //分页组件不发请求 ？
          }
          this.$store.dispatch("CHABM", {
            shenfenzheng: this.val1,
            names: this.val2,
            shoujihao: this.val3,
            page: 1
          });
        },
        tanchu(id) {
          this.chagaishuju.dialogFormVisible = true;
          this.chagaishuju.form = this.tableData.filter(item => item.id == id)[0];
        }
      },
      components: {
        chagai
      }
    };
</script>
