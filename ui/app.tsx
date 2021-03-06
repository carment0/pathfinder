import * as React from 'react'
import * as ReactDOM from 'react-dom'
import axios, { AxiosResponse, AxiosError } from 'axios'
import Grid from './grid'
import './app.scss'

class App extends React.Component<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      paths: []
    }
  }

  private handleFetchPath = () => {
    axios.get("/api/paths").then((res: AxiosResponse) => {
      this.setState({
        paths: res.data.path
      })
    }).catch((err) => {
      console.log(err.response.data.error)
    })
  }

  get start() {
    return { i: 0, j: 0 }
  }

  get goal() {
    return { i: 30, j: 45 }
  }

  render() {
    return (
      <section className="app">
        <Grid row={50} col={50} start={this.start} goal={this.goal} paths={this.state.paths}/>
        <button onClick={this.handleFetchPath}>Find Path!</button>
      </section>
    )
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"))
})