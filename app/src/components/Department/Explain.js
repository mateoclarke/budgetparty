import React, { Component } from 'react'

import Navigation from '../Navigation'

class Explain extends Component {
  constructor(props) {
    super(props);
    const departmentId = Number(this.props.match.params.id) - 1
    this.state = {value: this.props.departments[departmentId].explainYourSpending || ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    const serviceId = this.props.match.params.service_id
    const departmentId = this.props.match.params.id

    this.props.onSubmit(departmentId, this.state.value)
    this.props.history.push(`/service/${serviceId}/department/${departmentId}`)
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {

    return (
      <div style={{height: '100%'}}>
        <Navigation {...this.props} showClose="true" centerText="Explain Your Spending" />

        <div className="Explain">
          <form onSubmit={this.handleSubmit}>
            <div className="Explain__body">
              <h1 className="Explain__title">Write a little something about your budget spending</h1>
              <textarea type="textarea" className="Explain__textarea"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Why did you increase or decrease this deparment's budget?"/>
            </div>
            <button type="submit" className="Explain__close-button">
              Done
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Explain
