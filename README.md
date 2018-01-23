
# Wmall电商网站 （Wmall前端实现）
![](https://img.shields.io/badge/webpack-v3.10.0-green.svg)
![](https://img.shields.io/badge/npm-v4.4.7-ff69b4.svg)
![](https://img.shields.io/badge/developer-WAng91An-brightgreen.svg)


### 介绍

- 采用前后端分离架构思想
- 利用ajax渲染技术
- 进行调用接口进行页面渲染
- 模块化开发的前端电商项目
- 与服务端真实数据对接

### 使用教程

1.安装nodejs环境,推荐使用v4.4.7

 ```

    下载地址 : https://nodejs.org/download/release/v4.4.7/

 ```

2.命令行 切换到此项目根目录

3.全局安装webpack,可查看根目录pachage.json查看版本

 ```

    命令: (sudo) npm install webpack -g

    windows可以用下载GitBase 进行命令操作

```

4.全局安装webpack-dev-server v^1.16.5

```

    命令: (sudo)npm install webpack --save-dev

```



5.命令行依次运行下面的安装命令

```

     npm install css-loader style-loader --save-dev

	 npm install extract-text-webpack-plugin@1.0.1 --save-dev

	 npm install  html-webpack-plugin --save-dev

	 npm install html-loader --save-dev

	 npm install url-loader --sava-dev

     npm install webpack-dev-server --sava-dev

     npm install hogan --save

	 npm install font-awesome --save

```



6.在项目根目录执行npm初始化

```

    命令: npm install (--registry=https://registry.npm.taobao.org)

```

7.启动项目

```

    开发模式: npm run dev (windows系统上为npm run dev_win)

```

8.开发模式下预览项目

```

    访问：http://localhost:8088/dist/view/index.html

```

### 运行时注意

1. 打开nginx服务器
2. tomcat mysql
3. ftp服务器
4. 内网穿透，natapp
5. npm run dev_win
6. 注意后端服务器的端口号是否需要调整，配置文件中调整



#### 后端技术栈([后端](https://github.com/WAng91An/Wmall))

1. nginx 负载均衡，图片上传图片服务器
2. mybatis分页插件使用
3. 支付宝真实对接
4. ftp服务器连接
5. 使用mybatis插件进行自动生成dao pojo层

#### 注意
此项目为hub主的js的课程设计，用原生js开发，前后端完全分离，需要ftp服务器,npm等软件，可以发送邮箱至1027700603@qq.com
