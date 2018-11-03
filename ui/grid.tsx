import * as React from 'react'
import Tile from './tile'
import axios from 'axios'
import './grid.scss'

type GridProps = {
  row: number,
  col: number,
  poses: any
}

type GridState = {
  display: boolean
}

class Grid extends React.Component<GridProps, GridState> {
  constructor(props: any) {
    super(props)

    this.state = {
      display: false
    }
  }

  componentDidMount() {
    const start = this.props.poses.start
    const goal = this.props.poses.goal

    axios.post("/api/grids", {
      row: this.props.row,
      col: this.props.col
    })
    .then(() => {
      return axios.post("/api/grids/poses", {i_start: start.i, j_start: start.j, i_goal: goal.i, j_goal: goal.j})
    })
    .then(() => {
      this.setState({display: true})
    })
    .catch((err) => {
      console.log(err.response.data.error)
    })
  }

  get rows(): JSX.Element[] {
    const start = this.props.poses.start
    const goal = this.props.poses.goal

    const rows: JSX.Element[] = [];
    for (let i = 0; i < this.props.row; i++) {
      const row: JSX.Element[] = [] 
      for (let j = 0; j < this.props.col; j++) {
        if (start.i == i && start.j == j) {
          row.push(<Tile i={i} j={j} key={`${i},${j}`} start={true} goal={false} />)
        } else if (goal.i == i && goal.j == j) {
          row.push(<Tile i={i} j={j} key={`${i},${j}`} start={false} goal={true} />)
        } else {
          row.push(<Tile i={i} j={j} key={`${i},${j}`} start={false} goal={false} />)
        }
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