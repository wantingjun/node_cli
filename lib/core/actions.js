
const {promisify} = require('util')
const download = promisify(require("download-git-repo"))
const open = require('open');
const path= require('path')


const {vueRepo} = require('../config/repo-config')
const {commandSpawn} = require('../utils/terminal')
const {compile,writeToFile,createDirSync} = require('../utils/utils');
const { program } = require('commander');
const createProjectAction = async (project) =>{
  console.log("why helps you create your project~")
//1. clone项目
await download(vueRepo, project, { clone: true });
//await download(vueRepo,project,{clone:true}); // 1. 模板地址 2. 项目名称
// 2. 执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

//3. 运行 npm run serve
//防止阻塞，不要加await
commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });
//4. 打开浏览器
open("http://localhost:8080/");
}

// 添加组件的action
const  addComponentAction = async (name,dest)=>{
  // 1. 有对应的ejs模板
  // 2. 编译ejs模板 生产result
  const result = await compile('vue-component.ejs',{name,lowerName:name.toLowerCase()})
  console.log(result)
  // 3. 写入文件（应该是一个独立的操作）
  const targetPath = path.resolve(dest, `${name}.vue`)
  console.log(targetPath) // 拼接路径
  writeToFile(targetPath,result) // 写入文件
}

// 添加组件和路由
const addPageAndRouteAction = async(name,dest)=>{
  console.log(program.dest)

   // 1. 编译ejs模板: 包括page和router
   const data ={name,lowerName:name.toLowerCase()}
   const pageResult  = await compile('vue-component.ejs',data)
   const routerResult  = await compile('vue-router.ejs',data)
   // 2. 写入文件
   const targetDest = path.resolve(dest, name.toLowerCase());
   if(createDirSync(targetDest)){
    const targetPagePath = path.resolve(targetDest,`${name}.vue`)
    const targetRouterPath = path.resolve(targetDest,'router.js') // router的路径是固定的
    writeToFile(targetPagePath,pageResult)
    writeToFile(targetRouterPath,routerResult)
   }

}
// 添加store
const addStoreAction = async (name, dest) =>{
  // 1. 编译ejs模板:
  const storeResult = await compile('vue-store.ejs',{})
  const typesResult = await compile('vue-types.ejs',{})
// 2. 写入文件
  // 2.创建文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetStorePath = path.resolve(targetDest, `${name}.js`);
    const targetTypePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetStorePath, storeResult);
    writeToFile(targetTypePath, typesResult);
  }
}






module.exports= {
    createProjectAction,
    addComponentAction,
    addPageAndRouteAction,
    addStoreAction
} 