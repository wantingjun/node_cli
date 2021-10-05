// 执行终端命令相关的代码


const {spawn} = require("child_process") //开启另外一个进程，执行终端命令


const commandSpawn = (...args)=>{

    return new Promise((resolve,rejecet)=>{
        const childProcess = spawn(...args) //结构数组
        // 执行命令的过程中的打印信息，stdout标准输出流
        childProcess.stdout.pipe(process.stdout) //把输出流的东西，放到process的stdout里，在控制台显示
        childProcess.stderr.pipe(process.stderr)
        // childProcess执行完后通知,继续执行之后的操作
        childProcess.on("close",()=>{
            resolve()
        })
    })
}

// const commandSpawn = (...args) => {
//     return new Promise((resolve, reject) => {
//       const childProcess = spawn(...args);
//       childProcess.stdout.pipe(process.stdout);
//       childProcess.stderr.pipe(process.stderr);
//       childProcess.on("close", () => {
//         resolve();
//       })
//     })
//   }
module.exports ={
    commandSpawn
}