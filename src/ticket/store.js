import { createStore, combineReducers, applyMiddleware } from 'redux'

import reducers from './reducers'
import thunk from 'redux-thunk'

export default createStore(
  combineReducers(reducers),
  {
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: null, // 到达时间小时
    arriveTimeStr: null,
    departStation: null, // 出发车站
    arriveStation: null,
    trainNumber: null, // 车次
    durationStr: null, // 运行时间
    tickets: [], // 坐次与出票渠道
    isScheduleVisible: false, // 列出时刻表浮层
    searchParsed: false, // 是否解析完url
  },
  applyMiddleware(thunk)
)
