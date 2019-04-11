import React, { Component } from 'react'
import Select from 'react-select'
import { getAthlete, getAccessToken } from './Api'

class SelectBike extends Component { 
  constructor() {
    super()
    this.state = {
      athlete: {
        username: '',
        bikes: []
      }
    }
  }
  
  componentDidMount() {
    const { accessCode, clientId, clientSecret, setToken } = this.props
    getAccessToken(accessCode, clientId, clientSecret).then(token => {
      setToken(token)
      getAthlete(token).then(athlete => {
        this.setState({
          athlete
        })
      })
    })
  }

  render() {
    const { athlete } = this.state
    const { selectBike } = this.props

    const bikeOptions = athlete.bikes.map(bike => {
      return {
        value: bike.id,
        label: bike.name
      }
    })

    return (
      <div className="App">
        <h1>{athlete.username ? `Logged in as: ${athlete.username}` : 'Loading Data'}</h1>
        <h2>Select the bike you want to apply:</h2>
        <Select options={bikeOptions} onChange={selectBike}/>
        <div>This will be applied to all rides where the bike is unset.</div>
      </div>  
    )
  }
}

export default SelectBike
