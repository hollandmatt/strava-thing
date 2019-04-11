import React, { Component } from 'react'
import { getActivities, updateActivity } from './Api'

const PAGE_SIZE = 30

class Apply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updated: [],
      skipped: [],
      failed: [],
      page: 1
    }
    this.processActivities = this.processActivities.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }

  componentDidMount() {
    this.processActivities()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.processActivities()
    }
  }

  nextPage() {
    const { page } = this.state
    this.setState({
      page: page + 1
    })
  }

  processActivities() {
    const { token, bike } = this.props
    const { page } = this.state
    getActivities(token, page).then(activities => {
      activities.forEach(activity => {
        if (!activity.gear_id && activity.type === 'Ride') {
          console.log('update activity', activity)
          updateActivity(token, activity.id, {
            gear_id: bike.value,
            id: activity.id
          }).then(response => {
            console.log(response)
            this.setState({
              updated: this.state.updated.concat([activity])
            })
          })
        } else {
          this.setState({
            skipped: this.state.skipped.concat([activity])
          })
        }
      })
    })
  }

  render() {
    const { bike } = this.props
    const { updated, skipped, failed, page } = this.state
    return (
      <div className="App">
        <div>Bike {bike.label} selected</div>
        <div>Page {page}</div>
        <div>Updated {updated.length} activities, {skipped.length} skipped and {failed.length} failed.</div>
        <div>
          <button disabled={(PAGE_SIZE * page) > (updated + skipped + failed)} onClick={this.nextPage}>Next Page</button>
        </div>
      </div>
    )
  }
}

export default Apply
