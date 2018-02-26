# ManagementSystem（微型招聘管理系统）
 

# 文件结构大概说明
  frontEnd文件夹里是前端部分
  
  rear-end文件夹里是后端nodejs部分，主要提供接口
 
# 技术栈
vue2+vuex+vue-router+vue-cli+ES6+axios+vue-axios+Element-ui+less+vee-validate+vue-schart+nodejs+express+gm+mongodb+jquery+jquery-ui+localStorage



# 项目运行
  一.首先确保已安装mongoDB数据库，nodejs运行平台,以及gm软件（本项目用它裁切图片，下载地址：ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/windows/ ）
  
  
  二.请按以下步骤操作：
    
    
    1.打开数据库，导入这个模拟数据，具体操作为：
        开一个CMD窗口，运行
            mongod --dbpath c:\database（当然你要保证已经在c盘已经有了这个文件夹，并且已经装了mongodb）
        然后在项目文件夹的根目录（注意路径），再开一个CMD（刚才开的那个mongod的那个CMD不能关闭！），复制下面的语句到CMD中按回车
            mongoimport -d zpglxt -c zzries ./init/在职人员模拟数据.txt --drop（此时数据库就会被自动创建，表也会自动创建，数据库的名字zpglxt，表的名字叫做zzries。）
            mongoimport -d zpglxt -c bmries ./init/招聘人员模拟数据.txt --drop（此时数据库就会被自动创建，表也会自动创建，数据库的名字zpglxt，表的名字叫做bmries。）
            
            
            
     2.打开CMD窗口：
        在rear-end文件夹下根目录运行:cnpm install
        在frontEnd文件夹下根目录运行：cnpm install
                
      
      
    3.再开一个CMD窗口，在rear-end文件夹下根目录运行
          node app.js
      接着再开一个CMD窗口，在frontEnd文件夹下根目录运行
          npm run dev
          
          
  三.恭喜！项目已经运行在了8080端口！！
      也就是说：本项目需要同时打开3个CMD窗口！
      
      分别在运行：
        mongod、node app.js、npm run dev
      
      然后注册个账号，注册成功后登陆。
      
      
      
# 总结
  我是一名来自湖北黄冈的前端程序员，技术有限，有些功能实现的不太完美，希望各位大牛多多提拔，多多指点下,谢谢。  
  
  
  
 # 意见
   QQ邮箱：1311737393@qq.com
   
   提示：个人不常用QQ邮箱，但还是期待您的意见
  
