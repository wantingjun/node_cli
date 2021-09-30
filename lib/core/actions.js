
const {promisify} = reuqire('util')
const download = promisify(require("download-git-repo"))
const {vueRepo} = require('../config/repo-config')
const createProjectAction = async (project) =>{
//1. clone项目
await download(vueRepo,project,{clone:true}); // 1. 模板地址 2. 项目名称
// 2. 执行npm install
//3. 运行 npm run serve
//4. 打开浏览器

}

module.exports= {
    createProjectAction
} 