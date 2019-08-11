import React, { memo, useState, useMemo, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import leftPad from 'left-pad'
import useWinSize from '../common/useWinSize' // 监听窗口改变
import './Slider.css'

const Slider = memo(function Slider(props) {
  const {
      title,
      currentStartHours,
      currentEndHours,
      onStartChanged,
      onEndChanged,
  } = props

  const winSize = useWinSize()

  const startHandle = useRef() // 左边滑动模块
  const endHandle = useRef()

  const lastStartX = useRef() // 存储左侧滑块上一次横坐标
  const lastEndX = useRef()

  const range = useRef() // 绑定dom
  const rangeWidth = useRef() // 从range dom中获取的滑块宽度

  const prevCurrentStartHours = useRef(currentStartHours)
  const prevCurrentEndHours = useRef(currentEndHours)

  const [start, setStart] = useState(() => (currentStartHours / 24) * 100)
  const [end, setEnd] = useState(() => (currentEndHours / 24) * 100)

  if (prevCurrentStartHours.current !== currentStartHours) { // 如果有变化，就更新，防止重置时slider无变化
    setStart((currentStartHours / 24) * 100)
    prevCurrentStartHours.current = currentStartHours
  }

  if (prevCurrentEndHours.current !== currentEndHours) {
    setEnd((currentEndHours / 24) * 100)
    prevCurrentEndHours.current = currentEndHours
  }

  const startPercent = useMemo(() => { // 取整操作
    if (start > 100) {
      return 100
    }

    if (start < 0) {
      return 0
    }

    return start
  }, [start])

  const endPercent = useMemo(() => {
    if (end > 100) {
      return 100
    }

    if (end < 0) {
      return 0
    }

    return end
  }, [end])

  const startHours = useMemo(() => { // 将拖动数据转换为小时
    return Math.round((startPercent * 24) / 100)
  }, [startPercent])

  const endHours = useMemo(() => {
    return Math.round((endPercent * 24) / 100)
  }, [endPercent])

  const startText = useMemo(() => { // 将小时数后加00
    return leftPad(startHours, 2, '0') + ':00'
  }, [startHours])

  const endText = useMemo(() => {
    return leftPad(endHours, 2, '0') + ':00'
  }, [endHours])

  function onStartTouchBegin(e) {
    const touch = e.targetTouches[0]
    lastStartX.current = touch.pageX // 赋值x坐标
  }

  function onEndTouchBegin(e) {
    const touch = e.targetTouches[0]
    lastEndX.current = touch.pageX
  }

  function onStartTouchMove(e) {
    const touch = e.targetTouches[0]
    const distance = touch.pageX - lastStartX.current
    lastStartX.current = touch.pageX // 修改初始值

    setStart(start => start + (distance / rangeWidth.current) * 100) // 移动滑块位置
  }

  function onEndTouchMove(e) {
    const touch = e.targetTouches[0]
    const distance = touch.pageX - lastEndX.current
    lastEndX.current = touch.pageX

    setEnd(end => end + (distance / rangeWidth.current) * 100)
  }

  useEffect(() => { // 测量滑块宽度
    rangeWidth.current = parseFloat(
      window.getComputedStyle(range.current).width
    )
  }, [winSize.width]) // winSize.width窗口改变时重新计算

  useEffect(() => {
    startHandle.current.addEventListener( // 左侧滑块绑定dom操作
      'touchstart',
      onStartTouchBegin,
      false
    )
    startHandle.current.addEventListener(
      'touchmove', // dom操作事件
      onStartTouchMove, // 触发函数
      false
    )
    endHandle.current.addEventListener(
      'touchstart',
      onEndTouchBegin,
      false
    )
    endHandle.current.addEventListener('touchmove', onEndTouchMove, false)

    return () => { // 解绑
      startHandle.current.removeEventListener(
        'touchstart',
        onStartTouchBegin,
        false
      )
      startHandle.current.removeEventListener(
        'touchmove',
        onStartTouchMove,
        false
      )
      endHandle.current.removeEventListener(
        'touchstart',
        onEndTouchBegin,
        false
      )
      endHandle.current.removeEventListener(
        'touchmove',
        onEndTouchMove,
        false
      )
    }
  })

  useEffect(() => { // 监听滑块滑动，触发滑动函数
    onStartChanged(startHours)
  }, [startHours])

  useEffect(() => {
    onEndChanged(endHours)
  }, [endHours])

  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={range}>
          <div
            className="slider-range"
            style={{
              left: startPercent + '%',
              width: endPercent - startPercent + '%',
            }}
          ></div>
          <i
            ref={startHandle}
            className="slider-handle"
            style={{
                left: startPercent + '%',
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            ref={endHandle}
            className="slider-handle"
            style={{
                left: endPercent + '%',
            }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  )
})

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  currentStartHours: PropTypes.number.isRequired,
  currentEndHours: PropTypes.number.isRequired,
  onStartChanged: PropTypes.func.isRequired,
  onEndChanged: PropTypes.func.isRequired,
}

export default Slider
