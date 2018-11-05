import * as React from 'react'
import './tile.scss'
import axios, { AxiosResponse } from 'axios';
import { func } from 'prop-types';

export enum TileType {
  Unoccupied = 0,
  Obstacle = 1,
  Path = 2,
  Start = 3,
  Goal = 4
}

type TileState = {}

type TileProps = {
  type: number,
  i: number,
  j: number,
  ws: WebSocket
}

export class Tile extends React.Component<TileProps, TileState> {
  constructor(props: TileProps) {
    super(props)
  }

  private handleMouseEnter = (e: React.MouseEvent) => {
    const type: number = this.props.type
    if (type === TileType.Start || type === TileType.Goal || type === TileType.Obstacle) {
      return
    }

    if (!e.ctrlKey) {
      return
    }

    this.props.ws.send(JSON.stringify({ i: this.props.i, j: this.props.j }))
  }

  private handleClick = () => {
    const type: number = this.props.type
    if (type === TileType.Start || type === TileType.Goal || type === TileType.Obstacle) {
      return
    }

    this.props.ws.send(JSON.stringify({ i: this.props.i, j: this.props.j }))
  }

  get classNames(): string {
    switch (this.props.type) {
      case TileType.Obstacle:
        return "tile obstacle"
      case TileType.Path:
        return "tile path"
      case TileType.Goal:
        return "tile goal"
      case TileType.Start:
        return "tile start"
    }
    
    return "tile"
  }

  render() {
    return <div className={this.classNames} onClick={this.handleClick} onMouseEnter={this.handleMouseEnter} />
  }
}
