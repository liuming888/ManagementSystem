<style lang="less" scoped>
    .bigbox {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      .el-icon-printer {
        float: right;
        cursor: pointer;
      }
      .main {
        background: rgba(255, 255, 255, 0.8);
        p {
          margin-bottom: 8px;
          font-size: 14px;
          color: rgb(63, 29, 29);
          span {
            color: #d84636;
          }
          .input {
            width: 500px;
          }
        }

        .relative {
          overflow: hidden;
          margin-bottom: 26px;
          .nape {
            float: left;
          }
        }

        textarea {
          font-size: 16px;
          color: #000;
          background: #f5f7fc;
        }
        div.cur {
          color: red;
          p {
            span {
              color: red;
            }
            .input {
              border: 1px solid red;
            }
          }
        }
        .btn {
          a {
            color: #3a8ee6;
            float: right;
            transform: translateY(30px);
          }
        }
      }
    }
</style>
<template>
    <div class="bigbox">
        <el-dialog title="求职报名表" :visible.sync="chagaishuju.dialogFormVisible" top="0" class="box" center>
            <p>
                <button @click="daying()" class="el-icon-printer">
                    <i></i>打印
                </button>
            </p>

            <div class="main">
                <el-form>
                    <div :class="{cur:txt1show}">
                        <p id="dingbu">应聘单位
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt1" required @focus="txt1show=false" v-model="danwei"></el-input><br/>
                            <span v-if="txt1show">此项为必填项</span>
                        </p>
                    </div>
                    <div :class="{cur:txt2show}">
                        <p>应聘岗位
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt2" required @focus="txt2show=false" v-model="gangwei"></el-input><br/>
                            <span v-if="txt2show">此项为必填项</span>
                        </p>
                    </div>
                    <div :class="{cur:txt3show}">
                        <p>姓名
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt3" required @focus="txt3show=false" v-model="name"></el-input><br/>
                            <span v-if="txt3show">此项为必填项</span>
                        </p>
                    </div>
                    <div :class="{cur:txt4show}">
                        <p>身份证号码
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt4" required @focus="txt4show=false" v-model="shenfenzheng"></el-input><br/>
                            <span v-if="txt4show">此项为必填项</span>
                        </p>
                    </div>
                    <div>
                        <p>民族
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt5" v-model="mingzhu"></el-input>
                        </p>
                    </div>
                    <div>
                        <p>婚姻状况
                            <span>*</span>
                        </p>
                        <p>
                            <template>
                                <el-radio v-model="hunyin" label="已婚">已婚</el-radio>
                                <el-radio v-model="hunyin" label="未婚">未婚</el-radio>
                                <el-radio v-model="hunyin" label="离异">离异</el-radio>
                                <el-radio v-model="hunyin" label="丧偶">丧偶</el-radio>
                            </template>
                        </p>
                    </div>
                    <div>
                        <p>户籍性质
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt7" required v-model="huji"></el-input>
                        </p>
                    </div>
                    <div>
                        <p>政治面貌
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt8" v-model="zhengzhimianmao"></el-input>
                        </p>
                    </div>
                    <div :class="{cur:txt9show}">
                        <p>学历
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt9" required @focus="txt9show=false" v-model="xueli"></el-input><br/>
                            <span v-if="txt9show">此项为必填项</span>
                        </p>
                    </div>
                    <div>
                        <p>生育状况
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt10" v-model="shengyu"></el-input>
                        </p>
                    </div>
                    <p>【联系方式】</p>
                    <hr/>
                    <div :class="{cur:txt11show}">
                        <p>手机
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt11" required @focus="txt11show=false" v-model="shoujihao"></el-input><br/>
                            <span v-if="txt11show">此项为必填项</span>
                        </p>
                    </div>
                    <div>
                        <p>居住地址
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt12" required v-model="dizhi"></el-input>
                        </p>
                    </div>
                    <div :class="{cur:txt13show}">
                        <p>紧急情况联系人
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt13" required @focus="txt13show=false" v-model="liaoxiren"></el-input><br/>
                            <span v-if="txt13show">此项为必填项</span>
                        </p>
                    </div>
                    <div :class="{cur:txt14show}">
                        <p>紧急情况联系人手机
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt14" required @focus="txt14show=false" v-model="liaoxirenhaoma"></el-input><br/>
                            <span v-if="txt14show">此项为必填项</span>
                        </p>
                    </div>
                    <div class="nape">
                        <div class="sub-title">是否有亲友在应聘单位工作</div>
                        <br/>
                        <br/>
                        <template>
                            <el-radio v-model="shifouyouqinyou" label="有">有</el-radio>
                            <el-radio v-model="shifouyouqinyou" label="无">无</el-radio>
                        </template>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div :class="{cur:txt19show}">
                        <p>期望月收入
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt19" required @focus="txt19show=false" v-model="qipanyueshouru"></el-input><br/>
                            <span v-if="txt19show">此项为必填项</span>
                        </p>
                    </div>
                    <div :class="{cur:txt20show}">
                        <p>最迟到岗时间
                            <span>*</span>
                        </p>
                        <p>
                            <el-input class="input" ref="txt20" required @focus="txt20show=false" v-model="zuichidaogangshijian"> </el-input><br/>
                            <span v-if="txt20show">此项为必填项</span>
                        </p>
                    </div>
                    <div class="filtter">
                        <p>
                            诚信承诺
                        </p>
                        <p>
                            <textarea cols="60" rows="10" disabled ref="txt21" v-model="chengxinchengnuo">

                            </textarea>
                        </p>
                    </div>
                </el-form>
                <p class="btn">
                    <el-button icon="el-icon-edit" round type="text" @click="xiugai">修改</el-button>
                    <el-button icon="el-icon-delete" round type="text" @click="shanchu">录取</el-button>
                    <a href="#dingbu">返回顶部</a>
                </p>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
      props: ["chagaishuju"],
      data() {
        return {
          txt1show: false,
          txt2show: false,
          txt3show: false,
          txt4show: false,
          txt9show: false,
          txt11show: false,
          txt13show: false,
          txt14show: false,
          txt19show: false,
          txt20show: false,
          danwei: "",
          gangwei: "",
          name: "",
          shenfenzheng: "",
          mingzhu: "",
          hunyin: "",
          huji: "",
          zhengzhimianmao: "",
          xueli: "",
          shengyu: "",
          shoujihao: "",
          dizhi: "",
          liaoxiren: "",
          liaoxirenhaoma: "",
          shifouyouqinyou: "",
          qipanyueshouru: "",
          zuichidaogangshijian: "",
          chengxinchengnuo: ""
        };
      },
      created() {
        this.danwei = this.chagaishuju.form.danwei;
        this.gangwei = this.chagaishuju.form.gangwei;
        this.name = this.chagaishuju.form.name;
        this.shenfenzheng = this.chagaishuju.form.shenfenzheng;
        this.mingzhu = this.chagaishuju.form.mingzhu;
        this.hunyin = this.chagaishuju.form.hunyin;
        this.huji = this.chagaishuju.form.huji;
        this.zhengzhimianmao = this.chagaishuju.form.zhengzhimianmao;
        this.xueli = this.chagaishuju.form.xueli;
        this.shengyu = this.chagaishuju.form.shengyu;
        this.shoujihao = this.chagaishuju.form.shoujihao;
        this.dizhi = this.chagaishuju.form.dizhi;
        this.liaoxiren = this.chagaishuju.form.liaoxiren;
        this.liaoxirenhaoma = this.chagaishuju.form.liaoxirenhaoma;
        this.shifouyouqinyou = this.chagaishuju.form.shifouyouqinyou;
        this.qipanyueshouru = this.chagaishuju.form.qipanyueshouru;
        this.zuichidaogangshijian = this.chagaishuju.form.zuichidaogangshijian;
        this.chengxinchengnuo = this.chagaishuju.form.chengxinchengnuo;
      },
      methods: {
        xiugai() {
          this.chagaishuju.dialogFormVisible = false;
          let valArr = Object.values(this.chagaishuju); //得到chagaishuju的所有V,并依次装进个数组
          let keyArr = Object.keys(this.chagaishuju); //得到chagaishuju的所有K,并依次装进个数组
          var sumArr = [1, 2, 3, 4, 9, 11, 13, 14, 19, 20]; //不能为空的这几项把它们的数装进数组
          for (var i = 0; i < valArr.length; i++) {
            if (valArr[i] == "") {
              //如果这个V为空
              var sum = ~~keyArr[i].substr(3, 2); //因为这两个组数对应的索引对应的KV成对,取出这K有的数
              if (sumArr.indexOf(sum) != -1) {
                //不为负一就表示是要验证的
                this["txt" + sum + "show"] = true; //把这项改为true
              }
            }
          }
          for (var j = 0; j < sumArr.length; j++) {
            if (this["txt" + sumArr[j] + "show"]) return; //为true,不执行下面的提交
            this["txt" + sumArr[j] + "show"] = false; //没空就让它们返回false
          }
          this.$alert("信息修改", "修改成功", {
            //Element-ui的
            confirmButtonText: "确定",
            callback: action => {
              this.$message({
                type: "info",
                message: `action: ${action}`
              });
            }
          });
          var vm = this;
          //有个bug，因为v-model双向绑定，所以只要表单内容变，没按修改都变了。。。解决方案，在data里定义几个k，v初始是this.chagaishuju.form里的，v-model绑定它，点修改时，提交这些v的值过去改数据库，没点提交，改不了全局，就没bug了，到这一步改太麻烦，姑且算了
          this.$store.dispatch("XIUGAI", {
            //修改填写内容过去
            id: this.chagaishuju.form.id,
            danwei: this.danwei,
            gangwei: this.gangwei,
            name: this.name,
            shenfenzheng: this.shenfenzheng,
            mingzhu: this.mingzhu,
            hunyin: this.hunyin,
            huji: this.huji,
            zhengzhimianmao: this.zhengzhimianmao,
            xueli: this.xueli,
            shengyu: this.shengyu,
            shoujihao: this.shoujihao,
            dizhi: this.dizhi,
            liaoxiren: this.liaoxiren,
            liaoxirenhaoma: this.liaoxirenhaoma,
            shifouyouqinyou: this.shifouyouqinyou,
            qipanyueshouru: this.qipanyueshouru,
            zuichidaogangshijian: this.zuichidaogangshijiane,
            chengxinchengnuo: this.chengxinchengnuo
          });
          
        },
        shanchu() {
          //录取表示删除这项
          this.$store.dispatch("DEL", [
            {
              //删除
              ...this.chagaishuju.form,
              ruzhishijian: new Date().getTime(),
              id: this.chagaishuju.form.id,
              danwei: this.chagaishuju.form.danwei,
              gangwei: this.chagaishuju.form.gangwei,
              name: this.chagaishuju.form.name,
              shenfenzheng: this.chagaishuju.form.shenfenzheng,
              mingzhu: this.chagaishuju.form.mingzhue,
              hunyin: this.chagaishuju.form.hunyin,
              huji: this.chagaishuju.form.huji,
              zhengzhimianmao: this.chagaishuju.form.zhengzhimianmao,
              xueli: this.chagaishuju.form.xueli,
              shengyu: this.chagaishuju.form.shengyu,
              shoujihao: this.chagaishuju.form.shoujihaoe,
              dizhi: this.chagaishuju.form.dizhi,
              liaoxiren: this.chagaishuju.form.liaoxiren,
              liaoxirenhaoma: this.chagaishuju.form.liaoxirenhaoma,
              shifouyouqinyou: this.chagaishuju.form.shifouyouqinyou,
              qipanyueshouru: this.chagaishuju.form.qipanyueshouru,
              zuichidaogangshijian: this.chagaishuju.form.zuichidaogangshijiane,
              chengxinchengnuo: this.chagaishuju.form.chengxinchengnuo
            }
          ]);
          this.$store.dispatch("LUQU", [
            {
              //录取
              ...this.chagaishuju.form,
              ruzhishijian: new Date().getTime(),
              id: this.chagaishuju.form.id,
              danwei: this.chagaishuju.form.danwei,
              gangwei: this.chagaishuju.form.gangwei,
              name: this.chagaishuju.form.name,
              shenfenzheng: this.chagaishuju.form.shenfenzheng,
              mingzhu: this.chagaishuju.form.mingzhue,
              hunyin: this.chagaishuju.form.hunyin,
              huji: this.chagaishuju.form.huji,
              zhengzhimianmao: this.chagaishuju.form.zhengzhimianmao,
              xueli: this.chagaishuju.form.xueli,
              shengyu: this.chagaishuju.form.shengyu,
              shoujihao: this.chagaishuju.form.shoujihaoe,
              dizhi: this.chagaishuju.form.dizhi,
              liaoxiren: this.chagaishuju.form.liaoxiren,
              liaoxirenhaoma: this.chagaishuju.form.liaoxirenhaoma,
              shifouyouqinyou: this.chagaishuju.form.shifouyouqinyou,
              qipanyueshouru: this.chagaishuju.form.qipanyueshouru,
              zuichidaogangshijian: this.chagaishuju.form.zuichidaogangshijiane,
              chengxinchengnuo: this.chagaishuju.form.chengxinchengnuo
            }
          ]);
        },
        daying() {
          window.print();
        }
      },
      watch: {
        "$store.state.maplist"() {
          //当删除好后
          this.chagaishuju.dialogFormVisible = false;
          this.$store.dispatch("ALLSUM"); //拉取招聘人数统计图数据
          this.$store.dispatch("ZAIZHISUM"); //拉取在职人数统计图数据
        }
      }
    };
</script>
