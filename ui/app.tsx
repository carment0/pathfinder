import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './app.scss'

class App extends React.Component<any, any> {
  render() {
    return (
      <section>
        <h1>React says Hello</h1>
      </section>
    )
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"))
})