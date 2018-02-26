<style lang="less" scoped>
    .bigbox {
      width: 100%;
      height: 100%;
      position: relative;
      .el-icon-caret-left {
        font-size: 18px;
        color: rgb(58, 57, 97);
        cursor: pointer;
        color: rgb(37, 16, 156);
      }
      .block {
        position: absolute;
        bottom: 12px;
        left: 0;
        .pagebar {
          position: absolute;
          left: 160px;
          top: 0px;
        }
      }
      .tanchu {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .mohu {
        width: 200px;
        position: absolute;
        top: 20px;
        right: 0;
        height: 100px;
        p {
          height: 14px;
          span {
            color: #999;
          }
        }
      }
    }
</style>
<template>
    <div class="bigbox">
        <p class="el-icon-caret-left" @click="fanhui">返回</p>
        <div style="margin: 20px 0">
            <el-button @click="toggleSelection(tableData3)" size="small">全选</el-button>
            <el-button @click="toggleSelection()" size="small">取消选择</el-button>
            <el-button type="primary" @click="luqubtn"  size="small">确定离职</el-button>
            <div class="mohu">
                <p>
                    <span>{{this.spantxt}}</span>
                </p>
                <el-input class="sousuo" placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model.trim="sousuo" @blur="blurinput"></el-input>
            </div>
        </div>
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @row-dblclick="tanchu($event.id)" size="mini"
         v-loading="loading2" element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="职位" width="120">
                <template slot-scope="scope">{{ scope.row.gangwei}}</template>
            </el-table-column>
            <el-table-column :prop="item.yin" :label="item.hanzi" width="200" v-for="item of titArr" :key="item.yin">
            </el-table-column>
        </el-table>
        <div class="block" v-if="fenyebar">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="pagebars" :page-size="bar" layout="total, sizes, prev, pager, next, jumper" :total="lists" class="pagebar">
            </el-pagination>
        </div>
        <div class="tanchu" v-if="chagaishuju.dialogFormVisible">
            <zaizhichagai :chagaishuju='chagaishuju' :bar="bar" :page="dangqianpage"></zaizhichagai>
        </div>
    </div>
</template>
<script>
    import zaizhichagai from "./zaizhichagai.vue";
    export default {
      props: ["biaoShow"],
      data() {
        return {
          sousuo: "",
          titArr: [
            { yin: "name", hanzi: "姓名" },
            { yin: "mingzhu", hanzi: "民族" },
            { yin: "huji", hanzi: "户籍" },
            { yin: "shoujihao", hanzi: "手机号" },
            { yin: "zhengzhimianmao", hanzi: "政治面貌" },
            { yin: "dizhi", hanzi: "居住地址" },
            { yin: "liaoxiren", hanzi: "紧急联系人" },
            { yin: "liaoxirenhaoma", hanzi: "紧急联系人号码" }
          ],
          tableData3: null,
          currentPage1: 5,
          currentPage2: 5,
          currentPage3: 5,
          currentPage4: 1, //默认第一页
          fenyebar: true, //分页条显不显示
          lists: 1, //数据总数
          pagebars: [5,8, 10], //每页几条选择
          bar: 10, //每页几条
          dangqianpage: 1, //当前页
          chagaishuju: {
            //弹出层数据
            dialogFormVisible: false,
            form: {}
          },
          spantxt: "", //查询提示文字
          multipleSelection: [], //选择项
          loading2:false
        };
      },
      created() {
        this.lists = this.$store.state.listszz; //数据总数
        this.tableData3 = this.$store.state.zaizhilist; //当前页的数据
        this.currentPage4 = 1; //当前第几页
        ~~((this.lists - 1) / this.bar) > 0
          ? (this.fenyebar = true)
          : (this.fenyebar = false); //就一页分页条不显示
      },
      methods: {
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          //选中的项
          this.multipleSelection = val;
        },
        handleSizeChange(val) {
          this.bar = val; //每页几条
           this.$store.dispatch("ZAIZHIALL", {
            danwei: this.biaoShow.danwei,
            gangwei: this.biaoShow.gangwei,
            page: 1, //请求明细首页
            pagesum: val //每页多少条
          });
          this.loading2=true;
          this.dangqianpage=1;
        },
        handleCurrentChange(val) {
          //换页时
          this.dangqianpage = val;
          this.$store.dispatch("ZAIZHIALL", {
            danwei: this.tableData3[0].danwei,
            gangwei: this.tableData3[0].gangwei,
            page: this.dangqianpage, //当前页
            pagesum: this.bar //默认每页5条
          });
          this.loading2=true;
        },
        tanchu(id) {
          //弹出层
          this.chagaishuju.dialogFormVisible = true;
          this.chagaishuju.form = this.tableData3.filter(item => item.id == id)[0];
        },
        fanhui() {
          //返回
          this.biaoShow.showIs = false;
          this.biaoShow.isShow = false;
          this.biaoShow.danwei = "";
          this.biaoShow.gangwei = "";
        },
        blurinput() {
          //离开模糊查询时
          if (this.spantxt == `显示所有信息`) {
            this.spantxt = "";
          } else if (this.spantxt == `抱歉，没有找到符合信息`) {
            this.spantxt = "";
            this.lists = this.$store.state.lists; //数据总数
            this.tableData3 = this.$store.state.mingxilist; //当前页的数据
            this.sousuo = "";
          }
        },
        luqubtn() {
          //离职按钮点击时
          this.$store.dispatch("DELZAIZHI", this.multipleSelection); //删除
          this.loading2=true;
        }
      },
      watch: {
        "$store.state.listszz"() {
          this.$store.dispatch("ZAIZHIALL", {
            //重新拉取
            danwei: this.tableData3[0].danwei,
            gangwei: this.tableData3[0].gangwei,
            page: this.dangqianpage, //当前页
            pagesum: this.bar //默认每页5条
          });
        },
        "$store.state.zaizhilist"(newval, oldval) {
          this.lists = this.$store.state.listszz; //数据总数
          this.tableData3 = this.$store.state.zaizhilist; //当前页的数据
          this.currentPage4 = this.dangqianpage; //默认第一页
          ~~((this.lists - 1) / this.bar) > 0
            ? (this.fenyebar = true)
            : (this.fenyebar = false); //就一页分页条不显示
            this.loading2=false;
          this.$store.dispatch("ALLSUM"); //拉取招聘人数统计图数据
          this.$store.dispatch("ZAIZHISUM"); //拉取在职人数统计图数据
        },
        sousuo(newval, oldval) {
          if (newval == "") {
            this.$store.dispatch("ZAIZHIALL", {
              //重新拉取
              danwei: this.tableData3[0].danwei,
              gangwei: this.tableData3[0].gangwei,
              page: this.dangqianpage, //当前页
              pagesum: this.bar //默认每页5条
            });
            // this.lists = this.$store.state.listszz; //数据总数
            // this.tableData3 = this.$store.state.zaizhilist; //当前页的数据
            this.spantxt = "";
            return;
          }
          var arr = [];
          //过滤此单位此职位有没有员工信息带模糊查询框的信息，有的话就改变this.tableData3的值，从而改变视图
          var arr3 = this.$store.state.zaizhilist.filter((list, index) => {
            var arr = [];
            arr = Object.values(list); //filter遍历时把每个人的信息存进个数组里
            arr.shift(); //Object.values(list)第一项是个对象，打印看了，对象不能.indexOf(newval)
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].indexOf(newval) != -1) {
                //如果这个人的信息有这模糊查询的字符
                return true;
              }
            }
            return false;
          });
          if (arr3.length >= 1) {
            this.tableData3 = arr3; //改变表格显示数据为符合的
            this.lists = arr3.length; //符合条件多少条
            this.spantxt = `为您找到相关信息${arr3.length}条`;
            ~~((this.lists - 1) / this.bar) > 0
              ? (this.fenyebar = true)
              : (this.fenyebar = false); //就一页分页条不显示
          } else {
            this.tableData3 = [];
            this.fenyebar = false;
            this.spantxt = `抱歉，没有找到符合信息`;
          }
        }
      },
      components: {
        zaizhichagai
      }
    };
</script>

