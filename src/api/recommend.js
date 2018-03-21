import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/api/getDiscList'

  let data = Object.assign({}, commonParams, {
    g_tk: 5381,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    picmid: 1,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    // 对数据的Promise化
    return Promise.resolve(res.data)
  })
}

export function getCdInfo(dissid) {
  const url = '/api/getCdInfo'

  let data = Object.assign({}, commonParams, {
    disstid: dissid,
    g_tk: 1928093487,
    platform: 'yqq',
    notice: 0,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    onlysong: 0,
    type: 1,
    json: 1,
    utf8: 1,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
