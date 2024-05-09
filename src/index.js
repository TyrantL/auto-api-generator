const mergeConfig = require('./config');
const { getApiData, formatApiData } = require('./data');
const { generateCodeFile, generateAxiosTemplate, mergeLocalAndRemoteApiConfig } = require('./file');

async function generateCode(opts) {
  const { projects } = opts;

  if (!projects || !Array.isArray(projects)) {
    throw new TypeError('projects must be an array');
  }

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].projectName) {
      const curProject = projects[i];
      const { apis, basePath } = await getApiData(curProject);

      const config = mergeConfig({
        output: opts.output,
        basePath: `/${basePath}`,
        ...curProject,
      });

      let data = formatApiData(apis, config);

      if (config.mergeConfig !== false) {
        data = mergeLocalAndRemoteApiConfig(data, config);
      }

      await generateCodeFile(data, config, opts);
    }
  }
  generateAxiosTemplate(opts);
}

module.exports = generateCode;
