import request from '../service/request'
import getBaseUrl from '../utils/base_api_url'

export async function user_login(payload) {
  return request.post(getBaseUrl() + '/api/login', payload)
}

export async function user_register(payload) {
  return request.post(getBaseUrl() + '/api/register', payload)
}

export async function captcha(payload) {
  return request.post(getBaseUrl() + '/api/captcha', payload)
}
