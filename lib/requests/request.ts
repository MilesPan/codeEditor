import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

class Axios {
  private instance!: AxiosInstance;
  private baseConfig: AxiosRequestConfig = {
    timeout: 1200000,
    baseURL: '/api'
  };
  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config));
    this.interceptors();
  }
  public async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<T>(config);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
  private interceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  // 请求拦截器
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截器
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      res => {
        return res.data;
      },
      (error: AxiosError) => {
        return Promise.reject(error.response?.data);
      }
    );
  }
}

const instance = new Axios();
// 返回一个Promise(发送post请求)
export function fetchPost<T = ResponseResult<any>>(url: string, params?: any): Promise<AxiosResponse<T>> {
  return new Promise((resolve, reject) => {
    instance
      .request({
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        url,
        method: 'POST',
        data: params
      })
      .then(
        response => {
          resolve(response as AxiosResponse<T>);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}

// 返回一个Promise(发送get请求)
export function fetchGet<T = ResponseResult<any>>(url: string, param?: any): Promise<AxiosResponse<T>> {
  return new Promise((resolve, reject) => {
    instance
      .request({
        method: 'GET',
        params: param,
        url
      })
      .then(
        response => {
          resolve(response as AxiosResponse<T>);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}

export default { fetchPost, fetchGet };
