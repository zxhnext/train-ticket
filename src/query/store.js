import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'

import reducers from './reducers'
import thunk from 'redux-thunk' // 支持异步action

import { h0 } from '../common/fp'
import { ORDER_DEPART } from './constant'

export default createStore(
  combineReducers(reducers),
  {
    from: null,
    to: null,
    departDate: h0(Date.now()), // 出发日期
    highSpeed: false, // 是否展示高铁动车
    trainList: [], // 火车列表
    orderType: ORDER_DEPART,
    onlyTickets: false, // 只看有票
    ticketTypes: [], // 筛选条件列表
    checkedTicketTypes: {}, // 选中的筛选条件
    trainTypes: [], // 车次类型
    checkedTrainTypes: {}, // 选中车次类型
    departStations: [], // 出发车站
    checkedDepartStations: {}, // 选中车站
    arriveStations: [], // 到达车站
    checkedArriveStations: {}, // 选中到达车站
    departTimeStart: 0, // 出发时间起点
    departTimeEnd: 24,
    arriveTimeStart: 0, // 到达时间起点
    arriveTimeEnd: 24,
    isFiltersVisible: false, // 综合筛选
    searchParsed: false, // url是否解析完毕
  },
  applyMiddleware(thunk)
)