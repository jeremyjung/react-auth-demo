import React, { Component } from 'react'

class AddGameForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: {
        name: ''
      }
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onInputChange (event) {
    const fields = this.state.fields
    fields[event.target.name] = event.target.value
    this.setState({ fields })
  }

  handleSubmit (event) {
    this.props.addGame({ name: this.state.fields.name })
    this.setState({ fields: {
      name: ''
    }})
    event.preventDefault()
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Name:<br />
          <input onChange={this.onInputChange} placeholder='Enter name' name='name' value={this.state.fields.name} type='text' />
          <input type='submit' value='Add Game' />
        </form>
      </div>
    )
  }
}

export default AddGameForm
