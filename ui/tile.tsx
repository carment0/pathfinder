import * as React from 'react'
import './tile.scss'
import axios, { AxiosResponse } from 'axios';

type TileState = {
  obstacle: boolean
}

type TileProps = {
  start: boolean,
  goal: boolean,
  i: number,
  j: number
}

class Tile extends React.Component<TileProps, TileState> {
  constructor(props: TileProps) {
    super(props)

    this.state = {
      obstacle: false
    }
  }

  private handleClick = () => {
    if (this.props.start || this.props.goal) {
      return
    }

    axios.post("/api/grids/costs", {i: this.props.i, j: this.props.j})
    .then((res: AxiosResponse) => {
      this.setState({ obstacle: true })
    })
    .catch((err) => {
      console.log(err.response.data.error)
    })
  }

  get classNames(): string {
    if (this.state.obstacle) {
      return "tile obstacle"
    }

    const classes: string[] = ["tile"]
    if (this.props.goal) {
      classes.push("goal")
    } else if (this.props.start) {
      classes.push("start")
    }

    return classes.join(' ')
  }

  render() {
    return <div className={this.classNames} onClick={this.handleClick}></div>
  }
}

export default Tile