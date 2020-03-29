import * as React from 'react'
import {getTooltipContent} from './Tooltip'


class Domain extends React.Component<any,any> {
  centerX = () => {
    return this.props.x + (this.props.width / 2)
  }

  centerY = () => {
    return this.props.y + (this.props.height / 2)
  }

  displayText = () => {
    const label:any = document.getElementById(this.props.id)
    let labelLength = label ? label.textLength.baseVal.value : 0
    let displayText = this.props.label
    if (labelLength) {
      let substringLength = labelLength
      // Find the number of characters that will fit inside
      while ((substringLength > 0) &&
      (label.getSubStringLength(0, substringLength) > this.props.width)) {
        substringLength -= 1
      }
      if (substringLength < labelLength) {
        // If we have to do shortening
        substringLength -= 2 // make room for ellipsis ..
        if (substringLength <= 0) {
          // too short to show any string
          displayText = ''
        } else {
          // if it's long enough to show anything at all
          displayText = displayText.substr(0, substringLength) + '..'
        }
      }
    }
    return displayText
  }

  makeTextElement = (reference) => {
    let props:any = {
      x: this.centerX(),
      y: this.centerY(),
      textAnchor: 'middle',
      dy: '0.3em',
      fill: (this.props.labelColor || '#FFFFFF'),
      style: {
        fontSize: '12px',
        fontFamily: 'arial'
      }
    }
    const text = (reference ? (this.props.label || '') : this.displayText())
    if (reference) {
      props.id = this.props.id
      props.visibility = 'hidden'
      props.style = {opacity: 0}
    }
    return (this.props.displayLabel ? <text {...props}>{text}</text> : '')
  }

  render() {
    return (
      <g>
        <rect
          x={this.props.x}
          y={this.props.y}
          width={this.props.width}
          height={this.props.height}
          fill={this.props.color}
        />
        {this.makeTextElement(true)}
        {this.makeTextElement(false)}
        <rect
          x={this.props.x}
          y={this.props.y}
          width={this.props.width}
          height={this.props.height}
          style={{opacity: 0}}
          data-tip={getTooltipContent(this.props.tooltip)}
          data-for='domainTooltip'
        />
      </g>
    )
  }
}


export default Domain
