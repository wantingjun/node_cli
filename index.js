#!/usr/bin/env node
//shebang：在当前的电脑环境里找node可执行文件，之后会根据node可执行文件执行当前文件
const program = require("commander")


const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/create")

//查看版本号
program.version(require('./package.json').version) //加载package.json，读取显示版本号


// 帮助和可选信息
helpOptions();
createCommands()

program.parse(process.argv) // 解析参数，放在最后
