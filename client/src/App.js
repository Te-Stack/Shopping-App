import React, { Component } from 'react'
import AppNavBar from './components/AppNavBar'
import ShoppingList from './components/ShoppingList'
import ItemModal from "./components/ItemModal"
import "./index.css"
import {Provider} from "react-redux"
import store from './store'
import {Container} from "reactstrap" 
import {loaduser} from "./actions/authActions"


class App extends Component {
  componentDidMount(){
    store.dispatch(loaduser())
  }
  render() {
    return (
      <Provider store={store}>
         <div className="App">
        <AppNavBar/>
          <Container>
            <ItemModal/>
            <ShoppingList/>
         </Container> 
        </div>
      </Provider>
     
    )
  }
}


export default App

