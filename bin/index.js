#!/usr/bin/env node

const path = require('path');
const { Command } = require('commander');
const pkg = require('../package.json');
const generateCode = require('../src/index');
const program = new Command();

program.version(pkg.version);

program
  .command('create')
  .option('-c, --config [string]', '配置文件')
  .action(async (options) => {
    let opts = {};
    // 获取用户指定的配置文件路径，如果未指定，则使用项目根目录下的.api.config.js文件
    const configPath = options.config || './.api.config.js';

    try {
      opts = require(path.resolve(process.cwd(), configPath));
    } catch (err) {
      console.log('缺失配置文件');
      throw new Error(err);
    }

    await generateCode(opts);
  });

program.parse();
