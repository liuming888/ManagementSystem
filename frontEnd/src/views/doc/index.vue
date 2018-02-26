<style lang="less" scoped src="./index.less"></style>
<template>
    <el-form>
        <p class="crumbs el-icon-arrow-right">报名登记表</p>
        <div :class="{cur:txt1show}">
            <p>应聘单位
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt1" required @focus="txt1show=false"></el-input><br/>
                <span v-if="txt1show">此项为必填项</span>
            </p>
        </div>
        <div :class="{cur:txt2show}">
            <p>应聘职位
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt2" required @focus="txt2show=false"></el-input><br/>
                <span v-if="txt2show">此项为必填项</span>
            </p>
        </div>
        <div :class="{cur:txt3show}">
            <p>姓名
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt3" required @focus="txt3show=false"></el-input><br/>
                <span v-if="txt3show">此项为必填项</span>
            </p>
        </div>
        <div :class="{cur:txt4show}">
            <p>身份证号码
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model.number.trml="txtlist.txt4" required @focus="txt4show=false"></el-input><br/>
                <span v-if="txt4show">此项为必填项</span>
            </p>
        </div>
        <div>
            <p>民族
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt5"></el-input>
            </p>
        </div>
        <div>
            <p>婚姻状况
                <span>*</span>
            </p>
            <p>
                <template>
                    <el-radio v-model="txtlist.txt6" label="已婚">已婚</el-radio>
                    <el-radio v-model="txtlist.txt6" label="未婚">未婚</el-radio>
                    <el-radio v-model="txtlist.txt6" label="离异">离异</el-radio>
                    <el-radio v-model="txtlist.txt6" label="丧偶">丧偶</el-radio>
                </template>
            </p>
        </div>
        <div>
            <p>户籍性质
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt7" required></el-input>
            </p>
        </div>
        <div>
            <p>政治面貌
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt8"></el-input>
            </p>
        </div>
        <div :class="{cur:txt9show}">
            <p>学历
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt9" required @focus="txt9show=false"></el-input><br/>
                <span v-if="txt9show">此项为必填项</span>
            </p>
        </div>
        <div>
            <p>生育状况
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt10"></el-input>
            </p>
        </div>
        <p>【联系方式】</p>
        <hr/>
        <div :class="{cur:txt11show}">
            <p>手机
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model.number.trml="txtlist.txt11" required @focus="txt11show=false"></el-input><br/>
                <span v-if="txt11show">此项为必填项</span>
            </p>
        </div>
        <div>
            <p>居住地址
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt12" required></el-input>
            </p>
        </div>
        <div :class="{cur:txt13show}">
            <p>紧急情况联系人
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt13" required @focus="txt13show=false"></el-input><br/>
                <span v-if="txt13show">此项为必填项</span>
            </p>
        </div>
        <div :class="{cur:txt14show}">
            <p>紧急情况联系人手机
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model.number.trml="txtlist.txt14" required @focus="txt14show=false"></el-input><br/>
                <span v-if="txt14show">此项为必填项</span>
            </p>
        </div>
        <p>【家庭成员】</p>
        <hr/>
        <div class="relative">
            <div class="nape">
                <div class="sub-title"> 关系（称呼）</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt15_1"></el-input>
            </div>
            <div class="nape">
                <div class="sub-title">姓名</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt15_2"></el-input>
            </div>
            <div class="nape">
                <div class="sub-title"> 职务</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt15_3"></el-input>
            </div>
            <div class="nape">
                <div class="sub-title"> 手机</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt15_4"></el-input>
            </div>
        </div>
        <div class="relative">
            <div class="nape">
                <div class="sub-title"> 关系（称呼）</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt16_1"></el-input>
            </div>
            <div class="nape">
                <div class="sub-title">姓名</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt16_2"></el-input>
            </div>
            <div class="nape">
                <div class="sub-title"> 职务</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt16_3"></el-input>
            </div>
            <div class="nape">
                <div class="sub-title"> 手机</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt16_4"></el-input>
            </div>
        </div>
        <div class="relative">
            <div class="nape">
                <div class="sub-title"> 关系（称呼）</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt17_1"></el-input>
            </div>
            <div class="nape">
                <div class="sub-title">姓名</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt17_2"></el-input>
            </div>
            <div class="nape">
                <div class="sub-title"> 职务</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt17_3"></el-input>
            </div>
            <div class="nape">
                <div class="sub-title"> 手机</div>
                <el-input class="inline-input" placeholder="请输入内容" v-model="txtlist.txt17_4"></el-input>
            </div>
        </div>
        <hr/>
        <div class="nape">
            <div class="sub-title">是否有亲友在应聘单位工作</div>
            <br/>
            <br/>
            <template>
                <el-radio v-model="txtlist.txt18" label="有">有</el-radio>
                <el-radio v-model="txtlist.txt18" label="无">无</el-radio>
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
                <el-input class="input" v-model="txtlist.txt19" required @focus="txt19show=false"></el-input><br/>
                <span v-if="txt19show">此项为必填项</span>
            </p>
        </div>
        <div :class="{cur:txt20show}">
            <p>最迟到岗时间
                <span>*</span>
            </p>
            <p>
                <el-input class="input" v-model="txtlist.txt20" required @focus="txt20show=false"> </el-input><br/>
                <span v-if="txt20show">此项为必填项</span>
            </p>
        </div>
        <div class="filtter">
            <p>
                诚信承诺
            </p>
            <p>
                <textarea cols="60" rows="10" disabled v-model="txtlist.txt21">

                </textarea>
            </p>
        </div>
        <p class="btns">
            <template>
                <el-button type="primary" @click="tijiao">提交</el-button>
            </template>
            <el-button type="primary" @click="congzhi">重置</el-button>
            <el-button type="info" @click="uptit">返回顶部</el-button>
        </p>
    </el-form>
</template>
<script>
    export default {
      data() {
        return {
          txtlist: {
            txt1: "",
            txt2: "",
            txt3: "",
            txt4: "",
            txt5: "",
            txt6: "", //婚姻状况
            txt7: "",
            txt8: "",
            txt9: "",
            txt10: "",
            txt11: "",
            txt12: "",
            txt13: "",
            txt14: "",

            //以下【家庭成员】
            txt15_1: "",
            txt15_2: "",
            txt15_3: "",
            txt15_4: "",
            txt16_1: "",
            txt16_2: "",
            txt16_3: "",
            txt16_4: "",
            txt17_1: "",
            txt17_2: "",
            txt17_3: "",
            txt17_4: "",
            //以上【家庭成员】
            txt18: "",
            txt19: "", //是否有亲友在应聘单位工作
            txt20: "",
            txt21:
              " 提交后，本人郑重承诺以上内容属实并同意招聘单位对以上情况进行调查，如有任何虚假，本人愿无条件接受解聘处理！"
          },
          txt1show: false,
          txt2show: false,
          txt3show: false,
          txt4show: false,
          txt9show: false,
          txt11show: false,
          txt13show: false,
          txt14show: false,
          txt19show: false,
          txt20show: false
        };
      },
      methods: {
        tijiao() {
          let valArr = Object.values(this.txtlist); //得到txtlist的所有V,并依次装进个数组
          let keyArr = Object.keys(this.txtlist); //得到txtlist的所有K,并依次装进个数组
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
          this.$alert("请耐心等待公司处理", "提交成功", {
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
          this.$store.dispatch("TIJIAO", {
            //提交填写内容过去
            danwei: this.txt1,
            gangwei: this.txt2,
            name: this.txt3,
            shenfenzheng: this.txt4,
            mingzhu: this.txt5,
            hunyin: this.txt6,
            huji: this.txt7,
            zhengzhimianmao: this.txt8,
            xueli: this.txt9,
            shengyu: this.txt10,
            shoujihao: this.txt11,
            dizhi: this.txt12,
            liaoxiren: this.txt13,
            liaoxirenhaoma: this.txt14,
            jiantichengyuan: [
              {
                guanxi: vm.txt15_1,
                name: vm.txt15_2,
                zhiwu: vm.txt15_3,
                shoujihao: vm.txt15_4
              },
              {
                guanxi: vm.txt16_1,
                name: vm.txt16_2,
                zhiwu: vm.txt16_3,
                shoujihao: vm.txt16_4
              },
              {
                guanxi: vm.txt17_1,
                name: vm.txt17_2,
                zhiwu: vm.txt17_3,
                shoujihao: vm.txt17_4
              }
            ],
            shifouyouqinyou: this.txt18,
            qipanyueshouru: this.txt19,
            zuichidaogangshijian: this.txt20,
            chengxinchengnuo: this.txt21
          });
          this.congzhi(); //重置初始化表单为空
        },
        congzhi() {
          this.txtlist = {
            //重置初始化表单为空
            txt1: "",
            txt2: "",
            txt3: "",
            txt4: "",
            txt5: "",
            txt6: "", //婚姻状况
            txt7: "",
            txt8: "",
            txt9: "",
            txt10: "",
            txt11: "",
            txt12: "",
            txt13: "",
            txt14: "",

            //以下【家庭成员】
            txt15_1: "",
            txt15_2: "",
            txt15_3: "",
            txt15_4: "",
            txt16_1: "",
            txt16_2: "",
            txt16_3: "",
            txt16_4: "",
            txt17_1: "",
            txt17_2: "",
            txt17_3: "",
            txt17_4: "",
            //以上【家庭成员】
            txt18: "",
            txt19: "", //是否有亲友在应聘单位工作
            txt20: "",
            txt21:
              " 提交后，本人郑重承诺以上内容属实并同意招聘单位对以上情况进行调查，如有任何虚假，本人愿无条件接受解聘处理！"
          };
        },
        uptit() {
          //返回顶部
          document.documentElement.scrollTop = 0;
        }
      }
    };
</script>