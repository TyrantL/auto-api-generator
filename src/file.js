const path = require('path');
const fs = require('fs-extra');
const prettier = require('prettier');

const { renderApiConfigCode } = require('../template/config');

const tsCodeTemplateConfig = {
  'config.ts': {
    render: renderApiConfigCode,
  },
};

async function generateCodeFile(data, config, opt) {
  const folderName = config.folderName ?? config.projectName;
  const outputFolder = path.resolve(config.output, folderName);

  await fs.ensureDirSync(outputFolder);

  for (const fileName in tsCodeTemplateConfig) {
    const item = tsCodeTemplateConfig[fileName];

    if (item && item.render) {
      const code = item.render(data, config);

      genFile(code, fileName, outputFolder, config);
    }
  }
}

function prettierCode(code) {
  return prettier.format(code, {
    tabWidth: 2,
    printWidth: 250,
    singleQuote: true,
    parser: 'babel-ts',
  });
}

function genFile(code, fileName, outputFolder, config) {
  const outputPath = path.resolve(outputFolder, fileName);
  fs.outputFileSync(outputPath, prettierCode(code), 'utf8');
  console.log(`${outputPath}更新完成!`);
}

async function generateAxiosTemplate(opts) {
  const outputFile = path.resolve(opts.output, 'request.js');

  // 如果request.js不存在，则生成一个request模板，后续考虑剥离axios模板成为一个独立的通用请求库
  const isExist = await fs.pathExists(outputFile);

  if (!isExist) {
    const template = await fs.readFileSync(path.resolve(__dirname, '../template/request.js'), 'utf8');
    fs.outputFileSync(path.resolve(opts.output, 'request.js'), template, 'utf8');
  }
}

module.exports = {
  generateCodeFile,
  generateAxiosTemplate,
};
