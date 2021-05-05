import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError
} from 'axios'

type Handler = (url: string, config?: AxiosRequestConfig) => Promise<any>

type Handlers = {
  get: Handler
  post: Handler
  put: Handler
  patch: Handler
  del: Handler
}

class ApiBuilder {
  private config: AxiosRequestConfig
  public instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.config = config
    this.instance = axios.create(config)
  }

  update(config: AxiosRequestConfig): void {
    this.instance = axios.create({ ...this.config, ...config })
  }

  setAuthToken(authToken?: string): void {
    if (authToken) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${authToken}`
    } else {
      delete this.instance.defaults.headers.common.Authorization
    }
  }

  /**
   * Set instance default header
   *
   * @param header header name
   * @param value header value
   */
  setHeader(header: string, value: string): void {
    this.instance.defaults.headers.common[header] = value
  }

  makeRequest(
    method: AxiosRequestConfig['method'],
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse | Error> {
    const headers = { ...this.instance.defaults.headers, ...options.headers }

    if (process.env.NODE_ENV === 'development') {
      console.log('REQUEST', {
        options,
        config: this.config,
        url
      })
    }

    return this.instance({
      ...options,
      method,
      url,
      headers
    })
      .then((resp: AxiosResponse) => resp?.data)
      .catch(({ response }: AxiosError) => Promise.reject(response?.data))
  }

  get: Handler = (url, config) => this.makeRequest('get', url, config)

  post: Handler = (url, config) => this.makeRequest('post', url, config)

  put: Handler = (url, config) => this.makeRequest('put', url, config)

  patch: Handler = (url, config) => this.makeRequest('patch', url, config)

  del: Handler = (url, config) => this.makeRequest('delete', url, config)

  requestHandlers: Handlers = {
    get: this.get,
    post: this.post,
    put: this.put,
    patch: this.patch,
    del: this.del
  }
}

export default ApiBuilder
