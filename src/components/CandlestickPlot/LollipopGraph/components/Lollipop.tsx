import * as React from 'react'
import {getTooltipContent} from './Tooltip'

class Lollipop extends React.Component<any,any> {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: props.selected
    }
  }

  headRadius = () => {
    return this.state.isSelected ? this.props.hoverHeadRadius : this.props.headRadius
  }

  circleX = () => {
    return this.props.x
  }

  circleY = () => {
    return this.props.stickBaseY - this.props.stickHeight
  }

  circleHitRect = () => {
    return {
      x: this.circleX() - this.props.hoverHeadRadius,
      y: this.circleY() - this.props.hoverHeadRadius,
      width: this.props.hoverHeadRadius * 2,
      height: this.props.hoverHeadRadius * 2
    }
  }

  onClickHandler = (e) => {
    if (this.props.onClick) {
      const toolTipContent = getTooltipContent(this.props.tooltip)
      const sgRNA = toolTipContent.split(":")[1].split("<")[0]
      console.log(toolTipContent)
      console.log(sgRNA)
      this.props.onClick(sgRNA)
    }
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render() {
    let label = null
    if (this.props.label) {
      label = (
        <text
          fill='#2E3436'
          style={{
            fontSize: this.props.label.fontSize || 10,
            fontFamily: this.props.label.fontFamily || 'arial'
          }}
          textAnchor={this.props.label.textAnchor || 'middle'}
          x={this.props.x}
          y={this.props.stickBaseY - this.props.stickHeight - this.props.headRadius - 5}
        >
          {this.props.label.text}
        </text>
      )
    }
    return (
      <g>
        <line
          strokeWidth='1'
          stroke={this.props.stickColor || '#BABDB6'}
          x1={this.props.x}
          x2={this.props.x}
          y1={this.props.stickBaseY}
          y2={this.props.stickBaseY - this.props.stickHeight}
        />
        <circle
          stroke='#BABDB6'
          strokeWidth='0.5'
          fill={this.props.headColor || '#000000'}
          r={this.headRadius()}
          cx={this.circleX()}
          cy={this.circleY()}
          data-tip={getTooltipContent(this.props.tooltip)}
          data-for='lollipopTooltip'
          onClick={this.onClickHandler}
        />
        {label}
      </g>
    )
  }
}

export default Lollipop
