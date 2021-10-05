const program = require("commander")
const {createProjectAction,addComponentAction,addPageAndRouteAction} = require ("./actions")
const createCommands = () =>{
    program
    .command("create <project> [others...]") //创建指令, wan create demo 可选参数
    .description("clone repository into a folder")
    .action(createProjectAction)

    program
    .command("addcpn <name>") //创建指令, wan create demo 可选参数
    .description("add vue component,例如:wan addcpn HeeloWorld -d src/components")
    .action((name)=>{
        addComponentAction(name,program.dest ||'src/components') // 使用help.js文件中定义的dest
    })

    program
    .command('addpage <page>')
    .description('add vue page and router config, 例如: wan addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRouteAction(page, program.dest || 'src/pages')
    })

}

module.exports = createCommands