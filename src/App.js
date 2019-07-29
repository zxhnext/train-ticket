import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App(props) {
  const [count, setCount] = useState(() => {
    return props.defaultCount || 0
  })
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }
  useEffect(() => {
    document.title = count
  })
  useEffect(() => {
    window.addEventListener("resize", onResize, false)
    return () => { // 解绑
      window.removeEventListener("resize", onResize, false)
    }
  }, []) // 数组中的每一项都不变，useEffect才不会执行
  return (
    <button
      type="button"
      onClick={() => {setCount(count+1)}}
    >
      Click({count})
      size: {size.width}X{size.height}
    </button>

  );
}

export default App;
