const program = require("commander")
const {createProjectAction} = require ("./actions")
const createCommands = () =>{
    program
    .command("create <project> [others...]") //创建指令, wan create demo 可选参数
    .description("clone repository into a folder")
    .action((project,others)=>{
        console.log(project,others)
    })

}

module.exports = createCommands