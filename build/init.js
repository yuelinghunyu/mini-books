process.env.NODE_ENV = 'production'
const path = require('path')

const webpack = require('webpack')
const chalk = require('chalk') // 终端输出包 着色
const rm = require('rimraf') // 删除功能模块
const ora = require('ora') // 终端输出包 loading等临时状态显示

const prodConfig = require('./webpack.prod');

const spinner = ora('building......')

spinner.start()

rm(prodConfig.output.path,err =>{
    if(err) throw err
    webpack(prodConfig,(err,stats)=>{
        spinner.stop()
        if(err) throw err
        process.stdout.write(stats.toString({
            colors:true,
            modules:false,
            children:false,
            chunks:false,
            chunkModules:false
        }) + '\n\n')
        if(stats.hasErrors()){
            console.log(chalk.red('error......fail......'))
            process.exit(1)
        }
        console.log(chalk.cyan('complete!\n'))
        console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})
