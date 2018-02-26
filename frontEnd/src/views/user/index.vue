<style lang="less" scoped src="./index.less"></style>
<template>
    <div class="bigbox">
        <p class="crumbs el-icon-arrow-right">用户信息</p>
        <div class="box">
            <div class="left">
                <p>昵称：{{nicheng}}
                    <span @click="sgnicheng=true">修改</span>
                    <input type="text" v-model.trim="gainicheng" v-if="sgnicheng" v-focus @keyup.enter="setUser('nicheng')">
                    <span v-show="sgnicheng" @click="setUser('nicheng')">设置</span>
                </p>
                <p>账号：{{zhanghao}}
                </p>
                <p>密码：******
                    <span @click="sgmima=true">修改</span>
                    <input type="text" v-model.trim="gaimima" v-if="sgmima" v-focus @keyup.enter="setUser('mima')">
                    <span v-show="sgmima" @click="setUser('mima')">设置</span>
                </p>
                <p>手机：{{shoujihao}}
                    <span @click="sgshoujihao=true">更换</span>
                    <input type="number" v-model.trim="gaishoujihao" v-if="sgshoujihao" v-focus @keyup.enter="setUser('shoujihao')">
                    <span v-if="sgshoujihao" @click="setUser('shoujihao')">设置</span>
                </p>
                <p>邮箱：{{youxiang}}
                </p>
            </div>
            <div class="right">
                <el-upload class="avatar-uploader" action="/api/changeimg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" v-show="false">
                    <i class="el-icon-plus avatar-uploader-icon" id="setImage"></i>
                </el-upload>
                <img :src="$store.state.userMap.userurl" alt="头像" width="50" height="50" />
                <p>
                    <span @click='setImages' class="btn">修改</span>
                </p>

                <!-- 弹出层的 -->
                <el-dialog title="请裁剪头像" :visible.sync="dialogVisible" width="60%" height="100%" :before-close="handleClose" center class="tanchuceng">
                    <div class="inner">
                        <img :src="imageUrl" class="bigimg">
                        <div class="minbox">
                            <img :src="imageUrl" class="ximg">
                        </div>
                    </div>
                    <div class="rightimg">
                        <div class="boxmin">
                            <img :src="imageUrl" class="ximg">
                        </div>
                        <p>预览头像</p>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="quxiao">取 消</el-button>
                        <el-button type="primary" @click="caiqie">裁切</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import { Loading } from "element-ui";
    export default {
      updated() {
        var vm = this;
        $(".bigimg").load(function() {
          //必须等图片加载完了
          var x = 0,
            y = 0,
            //初始比例
            roatw = $(".inner .minbox").width() / $(".bigimg").width(),
            roath = $(".inner .minbox").height() / $(".bigimg").height(),
            roatx = 1,
            roaty = 1;

          //初始宽高 所有猫腻大图片的。下面执行左拉伸了，右的要缩小
          $(".ximg").css({
            width: $(".bigimg").width() + "px",
            height: $(".bigimg").height() + "px"
          });

          //拉伸 注意拉伸就负责宽高
          $(".minbox").resizable({
            aspectRatio: 1,
            containment: "parent",
            resize: function(evnet, ui) {
              //拉伸的左边盒子宽高
              var cutW = ui.size.width;
              var cutH = ui.size.height;
              //拉伸后的比例
              roatw = $(".inner .minbox").width() / $(".bigimg").width();
              roath = $(".inner .minbox").height() / $(".bigimg").height();

              //注意当盒子被拉伸时，x,y的原比例也变了
              roatx = x / cutW;
              roaty = y / cutH;

              //必须在里面执行，要放外面拖拽，拉伸部会实时更新
              $(".inner .minbox .ximg").css({
                //左边移动的da图
                width: $(".bigimg").width() + "px",
                height: $(".bigimg").height() + "px",
                left: -x + "px",
                top: -y + "px"
              });
              $(".rightimg .boxmin .ximg").css({
                //右边移动的da图
                width: $(".rightimg .boxmin").width() / roatw + "px",
                height: $(".rightimg .boxmin").height() / roath + "px",
                left: -$(".rightimg .boxmin").width() * roatx + "px",
                top: -$(".rightimg .boxmin").height() * roaty + "px"
              });

              //要传给服务器的裁切的没从大图算比例的目前裁切框的宽高
              vm.w = cutW;
              vm.h = cutH;
            }
          });

          //拖拽 注意拖拽就注意移动的值
          $(".minbox").draggable({
            containment: "parent",
            drag: function(event, ui) {
              x = ui.position.left;
              y = ui.position.top;

              //x,y的拖拽时的比例
              roatx = x / $(".inner .minbox").width();
              roaty = y / $(".inner .minbox").height();

              //必须在里面执行，要放外面拖拽，拉伸部会实时更新
              $(".inner .minbox .ximg").css({
                //左边移动的da图
                width: $(".bigimg").width() + "px",
                height: $(".bigimg").height() + "px",
                left: -x + "px",
                top: -y + "px"
              });

              $(".rightimg .boxmin .ximg").css({
                //右边移动的da图
                left: -$(".rightimg .boxmin").width() * roatx + "px",
                top: -$(".rightimg .boxmin").height() * roaty + "px"
              });

              //要传给服务器的裁切的没从大图算比例的目前裁切框的x y值
              vm.x = x;
              vm.y = y;
            }
          });
        });
      },
      data() {
        return {
          isGo: false,
          dialogVisible: false,
          nicheng: "admin",
          zhanghao: "",
          mima: "", //密码
          shoujihao: "",
          youxiang: "",
          gainicheng: "",
          gaishoujihao: "",
          gaimima: "",
          //是否显示的各项修改表单
          sgnicheng: false,
          sgmima: false,
          sgshoujihao: false,
          imageUrl:
            "../../../static/image/upload_2a34fc3af7b2c9b747ade955e00497f5.jpg", //初始头像图片的
          dialogVisible: false, //弹出框的
          w: 50,
          h: 50,
          x: 0,
          y: 0,
          urlimg: "",
          loads: null //控制懒加载
        };
      },
      created() {
        this.nicheng = localStorage.getItem("nicheng");
        this.zhanghao = JSON.parse(localStorage.getItem("userObj")).zhanghao;
        this.shoujihao = JSON.parse(localStorage.getItem("userObj")).shoujihao;
        this.youxiang = JSON.parse(localStorage.getItem("userObj")).youxiang;
      },
      methods: {
        handleClose(done) {
          this.$confirm("确认关闭？")
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        setUser(type) {
          this["sg" + type] = false;
          if (type == "nicheng") {
            this.$store.commit("NICHENG", { [type]: this["gai" + type] }); //改昵称
          } else if (type == "mima") {
            this.$store.dispatch("GAIUSERS", {
              [type]: this["gai" + type],
              id: this.$store.state.userMap.userObj.id
            });
            this.$router.push({ path: "/login" });
            alert("密码已经修改，请重新登录");
          } else if (type == "shoujihao") {
            this.$store.dispatch("GAIUSERS", {
              [type]: this["gai" + type],
              id: this.$store.state.userMap.userObj.id
            });
          }
          this["gai" + type] = ""; //清空
        },
        setImages() {
          //触发选择文件上传功能
        //   this.loads = Loading.service({ fullscreen: true });
          document.getElementById("setImage").click();
        },
        handleAvatarSuccess(res, file) {
          //上传成功回调
          this.urlimg = res.data;
          this.$store.commit("CHANGEIMG", res.data + "?1");
          var img = new Image();
          img.src = "../../../static/image/" + res.data + "?t=" + Math.random();
          var vm = this;
          this.loads = Loading.service({ fullscreen: true });
          $(img).load(function() {
            vm.dialogVisible = true;
          });
          //URL.createObjectURL(file.raw)是绝对地址 element-ui自带的。我没用到
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === "image/jpeg";
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error("上传头像图片只能是 JPG 格式!");
          }
          if (!isLt2M) {
            this.$message.error("上传头像图片大小不能超过 2MB!");
          }
          return isJPG && isLt2M;
        },
        handleClose(done) {
          this.$confirm("确认关闭？")
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        caiqie() {
          var vm = this;
          this.axios({
            method: "post",
            url: "/api/caiqie",
            data: {
              w: vm.w,
              h: vm.h,
              x: vm.x,
              y: vm.y,
              imageUrl: vm.urlimg,
              //因为传过去的是原图片，而我们显示的时候限制了宽高，缩小了。把原图片缩小我想不到。所以把缩小的宽高传过去，裁切再除比例，得到在原图片中要裁的话的正确的位置。
              minimgw: $(".bigimg").width(),
              minimgh: $(".bigimg").height(),
              id: this.$store.state.userMap.userObj.id
            }
          }).then(res => {
            vm.$store.commit("CHANGEIMG", res.data.data); //把裁切好后的图片地址传给仓库state里，改变
          });
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            this.loads.close(); //关闭懒加载
          });
          location.reload(); //页面缓存问题，用笨办法刷新页面解决
          this.dialogVisible = false;
        },
        quxiao() {
          this.dialogVisible = false;
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            this.loads.close(); //关闭懒加载
          });
        }
      },
      watch: {
        "$store.state.userMap"(newval, oldval) {
          //当它的地址只要一改变时
          this.nicheng = this.$store.state.userMap.nicheng;
          this.zhanghao = this.$store.state.userMap.userObj.zhanghao;
          this.shoujihao = this.$store.state.userMap.userObj.shoujihao;
          this.youxiang = this.$store.state.userMap.userObj.youxiang;
          this.imageUrl = this.$store.state.userMap.userurl;
          $(".minbox").css({
            //初始化裁切小框
            width: "50px",
            height: "50px",
            left: 0,
            right: 0
          });
        }
      },
      directives: {
        focus: {
          //表单v-if动态出现时自动获取焦点的自定义指令 v-show没效果
          inserted(el) {
            el.focus();
          }
        }
      }
    };
</script>

