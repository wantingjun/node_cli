# 基于node的脚手架
* 一个快速搭建和开发前端VUE项目的脚手架
* 本项目仅用于个人学习理解Node
## 安装
```
npm install wantjcli -g
```
## 介绍
脚手架基于vue，安装后自带axios，vue-router，vuex，vue.config.js
### 创建项目
```
wan create <projectName>
```
会使用此脚手架生成vue项目模板，安装依赖，打开浏览器
### 创建Vue组件

* 默认存放在src/components文件夹中
```
wan addcpn <componentName>
```
* 也可以添加`<dest>`参数，指定文件夹存放，例如：
```
wan addcpn <componentName> -d <dest>
```
### 创建Vue页面，并自动添加路由
* 默认会放到`src/pages/home/Home.vue`中，并且会创建`src/page/home/router.js`
```
wan addpage <pageName> # 例如wan addpage Home
```
* 也可以指定文件夹，但需要手动集成路由
```
wan addpage <PageName> -d src/views 
```
### 创建Vuex子模块
* 默认会放到src/store/modules/home/index.js和types.js
```
wan addstore <YourVuexChildModuleName> # wan addstore home
```
* 也可以指定文件夹
```
wan addstore <YourVuexChildModuleName> -d <dest> 
```
* 创建完成后，不需要手动配置，已经动态将所有子模块集成进去
```js
// 动态加载modules
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {  
  // 获取名字
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

  modules[`${moduleName}`] = module.default;
})
```