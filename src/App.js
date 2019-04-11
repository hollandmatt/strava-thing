import React, { Component } from 'react';
import './App.css';
import Login from './Login.js'
import SelectBike from './SelectBike.js'
import Apply from './Apply.js'

const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET
const redirectUri = process.env.REACT_APP_REDIRECT_URI

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bike: undefined,
      token: undefined
    }
    this.selectBike = this.selectBike.bind(this)
    this.setToken = this.setToken.bind(this)
  }

  selectBike(bike) {
    this.setState({
      bike
    })
  }

  setToken(token) {
    this.setState({
      token
    })
  }

  render() {
    const { bike, token } = this.state

    const authenticated = 
      window.location.href.includes('/authenticated') &&
      !window.location.href.includes('access_denied')
    
    const url = new URL(window.location.href)

    return (
      <div className="App">
        {
          !authenticated && <Login clientId={clientId} redirectUri={redirectUri}/>
        }
        {
          authenticated && !bike && <SelectBike setToken={this.setToken} clientId={clientId} clientSecret={clientSecret} accessCode={url.searchParams.get('code')} selectBike={this.selectBike}/>
        }
        {
          authenticated && bike && <Apply token={token} bike={bike}/>
        }
      </div>
    );
  }
}

export default App;
