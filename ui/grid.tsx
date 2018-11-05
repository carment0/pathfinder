import * as React from 'react'
import { Tile, TileType } from './tile'
import axios from 'axios'
import './grid.scss'

type GridProps = {
  row: number,
  col: number,
  start: any,
  goal: any,
  paths: number[][]
}

type GridState = {
  display: boolean,
  connected: boolean,
  obstacleMap: boolean[][]
}

class Grid extends React.Component<GridProps, GridState> {
  private ws: WebSocket
  private obstacleMap: boolean[][]
  
  constructor(props: any) {
    super(props)

    const obstacleMap: boolean[][] = []
    for (let i = 0; i < this.props.row; i++) {
      const row: boolean[] = []
      for (let j = 0; j < this.props.col; j++) {
        row.push(false)
      }
  
      obstacleMap.push(row)
    }

    this.state = {
      display: false,
      connected: false,
      obstacleMap
    }
  }

  private connectWebSocket = () => {
    this.ws = new WebSocket('ws://localhost:3000/api/costs')
    this.ws.onopen = () => this.setState({connected: true})
    this.ws.onclose = () => this.setState({connected: false})
    this.ws.onmessage = (msg: MessageEvent) => {
      const coord = JSON.parse(msg.data)
      const obstacleMap = this.state.obstacleMap
      obstacleMap[coord.i][coord.j] = true
      this.setState({obstacleMap})
    }
  }

  componentDidMount() {
    axios.post("/api/grids", {
      row: this.props.row,
      col: this.props.col
    })
    .then(() => {
      return axios.post("/api/paths/start", this.props.start)
    })
    .then(() => {
      return axios.post("/api/paths/goal", this.props.goal)
    })
    .then(() => {
      this.setState({display: true})
    })
    .catch((err) => {
      console.log(err.response.data.error)
    })

    this.connectWebSocket()
  }

  get rows(): JSX.Element[] {
    // Convert array to map for fast indexing
    const pathMap: Map<number, Set<number>> = new Map<number, Set<number>>()
    this.props.paths.forEach((path) => {
      if (!pathMap.get(path[0])) {
        pathMap.set(path[0], new Set<number>())
      }

      pathMap.get(path[0]).add(path[1])
    })

    const rows: JSX.Element[] = [];
    for (let i = 0; i < this.props.row; i++) {
      const row: JSX.Element[] = [] 
      for (let j = 0; j < this.props.col; j++) {        
        let type:number = TileType.Unoccupied
        if (this.props.start.i === i && this.props.start.j === j) {
          type = TileType.Start
        } else if (this.props.goal.i === i && this.props.goal.j === j) {
          type = TileType.Goal
        } else if (pathMap.get(i) && pathMap.get(i).has(j)) {
          type = TileType.Path
        } else if (this.state.obstacleMap[i][j]) {
          type = TileType.Obstacle
        }
        
        row.push(<Tile i={i} j={j} key={`${i},${j}`} type={type} ws={this.ws} />)
      }
      
      rows.push(<div className="row" key={`row-${i}`}>{row}</div>)
    }

    return rows
  }

  render() {
    if (this.state.display) {
      return <section className="grid">{this.rows}</section>
    }
    
    return <section className="grid"></section>
  }
}

export default Grid