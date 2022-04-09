import axios from 'axios'
import { Modal, notification } from 'antd'

const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
}

function request(url, data = {}, method = 'GET') {
  return new Promise(function(resolve, reject) {
    let axiosJson = {
      url: url,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${store.get('token')}`,
      },
    }
    if(method === 'GET'){
      axiosJson['params'] = data
    }else{
      axiosJson['data'] = data
    }
    axios(axiosJson).then((res) => {
      if (res.status === HTTP_STATUS.SUCCESS) {
        resolve(res.data)
      }else {
        Modal.warning({
          title: '提示',
          content: res.data.msg,
        })
      }
    }).catch(err => {
      notification['warning']({
        message: '提示',
        description:
          '可能断网啦，请联网后刷新重试',
      })
      reject(err)
    })
  })
}

request.get = (url, data) => {
  return request(url, data, 'GET')
}

request.post = (url, data) => {
  return request(url, data, 'POST')
}

export default request
