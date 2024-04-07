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
}

module.exports = {
  generateCodeFile,
};
