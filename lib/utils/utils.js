const ejs = require('ejs')
const path = require('path')
const fs = require('fs')


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

const writeToFile = (path,content) =>{ // path: 文件应该写入哪个位置
    return fs.promises.writeFile(path,content); //返回一个promsie
} 

module.exports = {
    compile,
    writeToFile

}