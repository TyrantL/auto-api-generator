// 该文件自动生成，请勿修改除【customInterceptor】方法以外的方法(除非知道自己在做什么)
import axios from 'axios';
import qs from 'qs';

function baseInterceptor(instance) {
  instance.interceptors.request.use((config) => {
    const headers = config.headers || {};

    // 如果请求头的Content-Type为application/x-www-form-urlencoded，则使用qs库序列化请求数据
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      const qsOptions = config.qs || {};
      config.data = qs.stringify(config.data, qsOptions);
    }

    // 如果请求头的Content-Type为multipart/form-data，则使用FormData包装请求数据
    if (headers['Content-Type'] === 'multipart/form-data') {
      const data = new FormData();
      if (config.data) {
        Object.keys(config.data).forEach((key) => {
          if (config.data[key] !== undefined) {
            data.append(key, config.data[key]);
          }
        });
      }
      config.data = data;
    }

    // 设置自定义请求头X-Requested-With为XMLHttpRequest，标识为AJAX请求
    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    // 允许携带跨域请求cookies
    config.withCredentials = true;

    return config;
  }, (error) => {
    return Promise.reject(error);
  });
}

function argsInterceptor(instance) {
  instance.interceptors.request.use((config) => {
    // 当请求方法为GET且配置中包含data时，将data转移到params中，并清空data
    if (config.method === 'get' && config.data) {
      config.params = config.data;
      config.data = null;
    }

    // 当请求方法不为GET且请求配置中同时包含data和params时，将params从data中提取出来，并将data指向原始数据
    if (config.method !== 'get' && config.data?.data && config.data?.params) {
      config.params = config.data?.params;
      config.data = config.data?.data;
    }

    return config;
  });
}

function customInterceptor(instance) {
  // 添加请求拦截器
  instance.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    return Promise.reject(error)
  });

  // 添加响应拦截器
  instance.interceptors.response.use((response) => {
    return Promise.resolve(response);
  }, (error) => {
    return Promise.reject(error)
  });
}

function request(options) {
  const instance = axios.create(options);

  baseInterceptor(instance);
  argsInterceptor(instance);
  // 自定义拦截器，针对项目的特定需求进行自定义拦截
  customInterceptor(instance);

  return instance;
}

const instance = request({});

export default instance;

