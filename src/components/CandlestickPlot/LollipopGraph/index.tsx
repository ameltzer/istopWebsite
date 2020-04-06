// cbioportal-frontend/src/shared/components/lollipopMutationPlot/LollipopPlotNoTooltip.tsx

import * as React from 'react'
import Lollipop from './components/Lollipop'
import Domain from './components/Domain'
import SVGAxis from './components/SVGAxis'
import Tooltip from './components/Tooltip'
import Legend from './components/Legend'
import {jsPDF as JsPDF} from 'jspdf-yworks'
import svg2pdf from 'svg2pdf.js'

const LOLLIPOP_ID_CLASS_PREFIX = 'lollipop-'
const DOMAIN_ID_CLASS_PREFIX = 'domain-'

const xAxisCandidateTickIntervals = [50, 100, 200, 250, 500, 1000, 2500, 5000, 10000, 25000]
const yAxisCandidateTickIntervals = [1, 2, 5, 10, 20, 50, 100, 200, 500]
const lollipopZeroHeight = 10
const xAxisHeight = 30
const yAxisWidth = 50
const geneHeight = 14
const domainHeight = 24


class LollipopPlot extends React.Component<any, any> {
  codonToX = (codon) => {
    return (codon / this.props.xMax) * 855
  }

  countToHeight = count => {
    return lollipopZeroHeight + (Math.max(0.06, Math.min(1, (count / this.yMax()))) * this.yAxisHeight())
  }

  countToNegHeight = count => {
    return lollipopZeroHeight - (Math.max(0.06, Math.min(1, (count / this.yMin()))) * this.yAxisHeight())
  }

  geneX = () => {
    return yAxisWidth + 20
  }

  geneY = () => {
    return (this.props.vizHeight - geneHeight + 30) /2
  }

  domainY = () => {
    return this.geneY() - ((domainHeight - geneHeight) / 2)
  }

  domains = () => {
    const {domains, options} = this.props
    return domains ? domains.map((domain, index) => {
      const x = this.codonToX(domain.startCodon)
      const width = this.codonToX(domain.endCodon) - x
      return (
        <Domain
          id={'domain_' + index}
          key={index}
          x={this.geneX() + x}
          y={this.domainY()}
          width={width}
          height={domainHeight}
          color={domain.color}
          label={domain.label}
          tooltip={domain.tooltip}
          labelColor={domain.labelColor}
          spec={domain}
          displayLabel={options.displayDomainLabel}
        />
      )
    }) : ''
  }

  lollipops = () => {
    const {lollipops, onLollipopClick} = this.props
    const hoverHeadRadius = 5
    return lollipops.map((lollipop, i) => {
      return (<Lollipop
        key={`${lollipop.codon}-${i}`}
        id={lollipop.id}
        x={this.geneX() + this.codonToX(lollipop.codon)}
        stickBaseY={lollipop.count>=0 ? this.geneY() : this.geneY() + 19}
        stickHeight={lollipop.count>=0 ? this.countToHeight(lollipop.count) : this.countToNegHeight(lollipop.count)}
        headRadius={2.8}
        hoverHeadRadius={hoverHeadRadius}
        label={lollipop.label}
        headColor={lollipop.color}
        tooltip={lollipop.tooltip}
        selected={lollipop.selected}
        onClick={onLollipopClick}
        sgRNA={lollipop.sgRNA}
      />
      )
    })
  }

  svgWidth = () => {
    return this.props.vizWidth + this.geneX() + 30
  }

  svgHeight = () => {
    return this.props.vizHeight + domainHeight + xAxisHeight
  }

  getComponentIndex = (classes, classPrefix) => {
    const match = classes.split(/[\s]+/g).map(c => c.match(new RegExp(`^${classPrefix}(.*)$`)))
      .find(x => (x !== null))
    if (!match) {
      return null
    } else {
      return parseInt(match[1], 10)
    }
  }

  getDomainIndex = classes => {
    return this.getComponentIndex(classes, DOMAIN_ID_CLASS_PREFIX)
  }

  getLollipopIndex = classes => {
    return this.getComponentIndex(classes, LOLLIPOP_ID_CLASS_PREFIX)
  }

  yAxisHeight = () => {
    return this.props.vizHeight - this.domainY() - lollipopZeroHeight
  }

  calculateTickInterval = (candidates, rangeSize, maxTickCount) => {
    let ret
    const tickInterval = candidates.find(c => ((rangeSize / c) < (maxTickCount - 1)))
    if (!tickInterval) {
      ret = 10
      while ((rangeSize / ret) > (maxTickCount - 1)) {
        ret *= 10
      }
    } else {
      ret = tickInterval
    }
    return ret
  }

  xAxisTickInterval = () => {
    return this.calculateTickInterval(xAxisCandidateTickIntervals, this.props.xMax, 16)
  }

  yAxisTickInterval = () => {
    return this.calculateTickInterval(yAxisCandidateTickIntervals, this.yMax(), 10)
  }



  calculateTicks = (tickInterval, rangeSize, labelEvenTicks) => {
    const ret = []
    let nextTick = tickInterval
    while (nextTick < rangeSize) {
      let label
      // add label only for the even ticks
      // but do not add label if it is too close to the end value
      if (labelEvenTicks && (rangeSize - nextTick > (2 * tickInterval) / 3) && (nextTick % (2 * tickInterval) === 0)) {
        label = nextTick + ''
      }
      ret.push({
        position: nextTick,
        label
      })
      nextTick += tickInterval
    }
    return ret
  }

  xTicks = () => {
    return this.calculateYTicks(0, 50, this.props.xMax, (position, end) => position < end)
  }

  yTicks = () => {
    return this.calculateYTicks(0, 0.5, this.yMax(), (position, end) => position < end)
  }

  yNegTicks = () => {
    const negTicks = this.calculateYTicks(0, -0.5, this.yMin(), (position, end) => position > end)
    return negTicks
  }

  calculateYTicks = (start, stepSize, end, comparisonOperator) => {
    const ret = []
    let position = start +stepSize;
    while(comparisonOperator(position, end)) {
      ret.push({
        position: position,
        label: position + ''
      })
      position+=stepSize
    }
    return ret;
  }

  yMax = () => {
    return this.props.yMax || this.props.lollipops.reduce((max, next) => {
      return Math.max(max, next.count)
    }, 1)
  }

  yMaxLabel = () => {
    return (this.props.lollipops.find(lollipop => (lollipop.count > this.yMax())) ? '>= ' : '') + this.yMax()
  }

  yMin = () => {
    return this.props.yMin || this.props.lollipops.reduce((min, next) => {
      return Math.min(min, next.count)
    }, 1)
  }

  yMinLabel = () => {
    return (this.props.lollipops.find(lollipop => (lollipop.count < this.yMin())) ? '<= ' : '') + this.yMin()
  }

  handleDownloadAsPNG = (hugoGeneSymbol) => {
    const svgElement = document.getElementById('lollipop-svgnode')
    const width = this.svgWidth() + 200
    const height = this.svgHeight()
    const suffix = 'lollipop.pdf'
    const fileName = hugoGeneSymbol ? `${hugoGeneSymbol}-${suffix}` : suffix

    // create a new jsPDF instance
    const pdf = new JsPDF('l', 'pt', [width, height])
    // render the svg element
    svg2pdf(svgElement, pdf, {
      xOffset: 0,
      yOffset: 0,
      scale: 1
    })
    // or simply save the created pdf
    pdf.save(`${fileName}`)
  }

  renderLegend = (options, domains) => {
    if (options.displayLegend) {
      return <Legend domains={domains} />
    } else {
      return ''
    }
  }

  renderExportToPDF = (options, hugoGeneSymbol) => {
    if (options.displayLegend) {
      return (
        <div style={{textAlign: 'left', maxWidth: this.svgWidth() + 200}}>
          <button onClick={() => this.handleDownloadAsPNG(hugoGeneSymbol)}>Save as PDF</button>
        </div>
      )
    }
  }

  render() {
    const width = 925
    return (
      <React.Fragment>
        <svg xmlns='http://www.w3.org/2000/svg' width={this.svgWidth() + 200} height={this.svgHeight()}
          className='lollipop-svgnode' id='lollipop-svgnode'>
          <rect
            fill='#FFFFFF'
            x={0}
            y={0}
            width={this.svgWidth()}
            height={this.svgHeight()}
          />
          <text x={this.geneX() - 10} y={this.geneY()+12} fill="black">1</text>          
          <rect
            fill='#BABDB6'
            x={this.geneX()}
            y={this.geneY()}
            height={geneHeight}
            width={
              // the x-axis start from 0, so the rectangle size should be (width + 1)
              width - 70
            }
          />
          <text x={width + 1} y={this.geneY()+12} fill="black">{parseInt(this.props.proteinLength)}</text>
          <text
              textAnchor='middle'
              style={{
                fontFamily: 'arial',
                fontSize: '12px',
                fontWeight: 'normal'
              }}
              fill='#2E3436'
              x={this.geneX() - 47}
              y={this.geneY()}
              transform={`rotate(270,${this.geneX() - 47},${this.geneY()})`}
            >
          {"log2-fold change"}
        </text>
          
          {this.lollipops()}
          {
            this.props.lollipops.some(lollipop => lollipop.count >= 0) ?
            <SVGAxis
              key='vert'
              x={this.geneX() - 10}
              y={this.geneY() - lollipopZeroHeight}
              length={this.yAxisHeight()}
              tickLength={7}
              rangeLower={0}
              rangeUpper={this.yMax()}
              ticks={this.yTicks()}
              vertical={true}
              isNegative={-1}
              even={false}
            />
            :""
          }
        {
          this.props.lollipops.some(lollipop => lollipop.count < 0) ?
        <SVGAxis
            isNeg={true}
            key='vert'
            x={this.geneX() - 10}
            y={this.geneY() + lollipopZeroHeight + (domainHeight-10)}
            length={this.yAxisHeight()}
            tickLength={7}
            rangeLower={0}
            rangeUpper={this.yMin() * -1}
            ticks={this.yNegTicks()}
            vertical={true}
            isNegative={1}
            even={false}
          />
          : ""
        }
        <SVGAxis 
          isNeg={false}
          key='horiz'
          x={this.geneX()}
          y={this.svgHeight()-30}
          length={width-70}
          tickLength={7}
          rangeLower={0}
          rangeUpper={this.props.xMax}
          ticks={this.xTicks()}
          vertical={false}
          isNegative={-1}
          even={true}
          />
        {this.domains()}

        </svg>
      </React.Fragment>
    )
  }
}

export default LollipopPlot
