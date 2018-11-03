import * as React from 'react'
import './tile.scss'
import axios, { AxiosResponse } from 'axios';
import { func } from 'prop-types';

type TileState = {
  obstacle: boolean
}

type TileProps = {
  start: boolean,
  goal: boolean,
  path: boolean,
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

  private handleMouseEnter = (e: React.MouseEvent) => {
    if (this.props.start || this.props.goal) {
      return
    }

    if (this.state.obstacle) {
      return
    }

    if (!e.ctrlKey) {
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

  private handleClick = () => {
    if (this.props.start || this.props.goal) {
      return
    }

    if (this.state.obstacle) {
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

    if (this.props.path) {
      return "tile path"
    }

    if (this.props.goal) {
      return "tile goal"
    }

    if (this.props.start) {
      return "tile start"
    }
    
    return "tile"
  }

  render() {
    return (
      <div 
        className={this.classNames} 
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter} />
    )
  }
}

export default Tile