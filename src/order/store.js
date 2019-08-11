import { createStore, combineReducers, applyMiddleware } from 'redux'

import reducers from './reducers'
import thunk from 'redux-thunk'

export default createStore(
  combineReducers(reducers),
  {
    trainNumber: null, // 车次
    departStation: null, // 出发车站
    arriveStation: null,
    seatType: null, // 席位类型
    departDate: Date.now(), // 出发日期
    arriveDate: Date.now(),
    departTimeStr: null, // 出发时间
    arriveTimeStr: null,
    durationStr: null, // 耗时时间
    price: null, // 票价
    passengers: [], // 乘客信息
    menu: null, // 弹出菜单
    isMenuVisible: false, // 菜单是否可见
    searchParsed: false, // URL是否解析完成
  },
  applyMiddleware(thunk)
)
