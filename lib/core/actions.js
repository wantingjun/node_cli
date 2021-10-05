
const {promisify} = require('util')
const download = promisify(require("download-git-repo"))
const open = require('open');


const {vueRepo} = require('../config/repo-config')
const {commandSpawn} = require('../utils/terminal')
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

module.exports= {
    createProjectAction
} 