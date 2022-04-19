import request from '../service/request'
const BASE_URL = 'http://127.0.0.1:8000'

export async function get_login(payload) {
  return request.post(BASE_URL + '/api/get_login/', payload)
}

export async function get_login_code(payload) {
  return request.post(BASE_URL + '/api/get_login_code/', payload)
}

export async function get_info(payload) {
  return request.get(BASE_URL + '/api/get_info/', payload)
}

export async function insert_source(payload) {
  return request.post(BASE_URL + '/api/insert_source/', payload)
}

export async function get_source_list(payload) {
  return request.get(BASE_URL + '/api/get_source_list/', payload)
}
export async function update_info(payload) {
  return request.get(BASE_URL + '/api/update_info/', payload)
}

export async function get_single_source(payload) {
  return request.get(BASE_URL + '/api/get_single_source/', payload)
}

