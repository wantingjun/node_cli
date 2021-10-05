const program = require("commander")
const {createProjectAction,addComponentAction} = require ("./actions")
const createCommands = () =>{
    program
    .command("create <project> [others...]") //创建指令, wan create demo 可选参数
    .description("clone repository into a folder")
    .action(createProjectAction)

    program
    .command("addcpn <name>") //创建指令, wan create demo 可选参数
    .description("add vue component,例如:wan addcpn HeeloWorld -d src/components")
    .action(addComponentAction)

}

module.exports = createCommands