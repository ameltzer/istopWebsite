import * as React from 'react'
import ReactTooltip from 'react-tooltip'

export const getTooltipContent = (tooltip) => {
  const header = (tooltip || {}).header ? `<div>${tooltip.header}</div>` : ''
  const body = (tooltip || {}).body ? `<div>${tooltip.body}</div>` : ''
  return (`<div>${header}${body}</div>`)
}

var dispatchGlobalEvent = function dispatchGlobalEvent(eventName, opts) {
  // Compatible with IE
  // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
  var event;

  if (typeof window.CustomEvent === "function") {
    event = new window.CustomEvent(eventName, {
      detail: opts
    });
  } else {
    event = document.createEvent("Event");
    event.initEvent(eventName, false, true);
    event.detail = opts;
  }

  window.dispatchEvent(event);
};

class Tooltip extends React.Component<any,any> {
  componentDidUpdate() {
    dispatchGlobalEvent("__react_tooltip_rebuild_even", {});
  }

  getContentHandler = (dataTip) => {
    if (!dataTip) return ''
    return (dataTip)
  }

  render() {
    return (<ReactTooltip
      place="right"
      id={this.props.id}
      html={true}
      getContent={this.getContentHandler}
    />)
  }
}


export default Tooltip
