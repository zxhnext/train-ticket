import React from 'react'
import { connect } from 'react-redux'
import './App.css'

import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

function App(props) {
  return(
    <div>
      <Header />
      <Journey />
      <DepartDate />
      <HighSpeed />
      <Submit />
    </div>
  )
}

function mapStateToProps(state) {
  
}

function mapDispatchToProps(dispatch) {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)