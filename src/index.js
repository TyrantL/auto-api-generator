const chalk = require('chalk');
const mergeConfig = require('./config');
const { getApiData, formatApiData, formatData } = require('./data');
const { generateCodeFile, generateAxiosTemplate } = require('./file');

async function generateCode(opts) {
  const { projects } = opts;

  if (!projects || !Array.isArray(projects)) {
    throw new TypeError('projects must be an array');
  }

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].projectName) {
      const curProject = projects[i];
      const { apis, responseInfoMap, basePath } = await getApiData(curProject);

      if (apis.length === 0) {
        console.error(chalk.red(`projectName:【${chalk.blueBright(curProject.projectName)}】获取到的接口数据为空，请确认配置是否正确或者接口服务正常`));
      }

      const config = mergeConfig({
        output: opts.output,
        basePath: `/${basePath}`,
        ...curProject,
      });

      const ret = formatData({ apis, responseInfoMap });

      const data = formatApiData(ret, config);

      await generateCodeFile(data, config, opts);
    }
  }
  generateAxiosTemplate(opts);
}

module.exports = generateCode;
