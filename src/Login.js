import React from 'react'

const Login = ({clientId, redirectUri}) => 
    <header className="App-header">
    <p>
      Click below to authenticate with Strava
    </p>
    <a
      className="App-link"
      href={`https://www.strava.com/oauth/mobile/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read_all,activity:read_all,profile:read_all,activity:write&response_type=code`}
    >
      Authenticate
    </a>
  </header>

export default Login
