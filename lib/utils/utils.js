const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const { setFlagsFromString } = require('v8')


const compile = (templateName, data)=>{
    const templatePosition = `../templates/${templateName}`
    const templatePath = path.resolve(__dirname,templatePosition)
    // console.log(templatePath)
    return new Promise((resolve,reject)=>{// promise的形式
        ejs.renderFile(templatePath , {data},{},(err,result)=>{
            if(err){
                console.log(err)
                reject(err)
                return ;
            }
            resolve(result) // 渲染文件，生产result，就是编译之后的模板
        }) 
    })
}
// 递归判断路径是否存在，不存在就创建文件夹
// source/components/category/xxx
const createDirSync =(pathName)=>{
    if(fs.existsSync(pathName)){ // 路径存在
        return true;
    } else{ // 不存在
        // 递归调用
        if (createDirSync(path.dirname(pathName))) { // 当前路径不存在，但父路径存在
            fs.mkdirSync(pathName); // 创建路径
            return true;
          }
    }

}

const writeToFile = (path,content) =>{ // path: 文件应该写入哪个位置
    // 判断path是否存在，如果不存在，创建对应的文件夹
        return fs.promises.writeFile(path,content); //返回一个promsie
    
    }
    

module.exports = {
    compile,
    writeToFile,
    createDirSync

}