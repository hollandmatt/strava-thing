export const getAccessToken = (accessCode, clientId, clientSecret) => {
  return fetch(`https://www.strava.com/oauth/token?client_id=${clientId}&code=${accessCode}&client_secret=${clientSecret}&grant_type=authorization_code`, {
    method: 'POST',
  }).then(resp => resp.json())
    .then(json => json['access_token'])
}

export const getAthlete = (accessToken) => {
  return fetch(`https://www.strava.com/api/v3/athlete`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(response => response.json())
}

export const getActivities = (accessToken, page) => {
  return fetch(`https://www.strava.com/api/v3/athlete/activities?page=${page}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(response => response.json())
}

/*
 * activity = {
 *   gear_id: bikeId
 * }
 */
export const updateActivity = (accessToken, id, activity) => {
  return fetch(`https://www.strava.com/api/v3/activities/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activity)
  }).then(response => response.json())
}