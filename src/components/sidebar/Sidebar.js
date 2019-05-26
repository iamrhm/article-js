import React, { Component } from "react";
import ReactDOM from "react-dom";
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import { getSelectedBlockElement } from '../../util/index'
import './Sidebar.css'
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { top: -17 };
  }
  componentDidUpdate = () => {
    if (this.updatingPosition) {
      clearImmediate(this.updatingPosition);
    }
    this.updatingPosition = null;
    this.updatingPosition = setImmediate(() => {
      return this.setBarPosition();
    });
  }

  setBarPosition = () => {
    const sidebarContainer = ReactDOM.findDOMNode(this.sidebarEl)
    const editorContainer = sidebarContainer ? sidebarContainer.parentElement : null
    const selection = window.getSelection()
    /*Checks if cursor on Editor or not*/
    if (selection.rangeCount === 0) {
      return null;
    }
    const theDataBLock = getSelectedBlockElement(selection.getRangeAt(0))
    if (!editorContainer || !sidebarContainer || !editorContainer || !editorContainer.contains(theDataBLock)) {
      return;
    }
    // const sidebarSontainerTop = sidebarContainer.getBoundingClientRect().top - document.documentElement.clientTop
    //108 cursor offset -15 is starting position
    let top = theDataBLock.getBoundingClientRect().top - 110
    top = Math.max(-17, Math.floor(top));
    //TODO:
    //TO FIX HEIGHT ISSUE WITHOUT OFFSET
    if (this.state.top !== top) {
      this.setState({
        top: top
      });
    }
  }

  render() {
    return (
      <div
        className='sidebar-wrapper'
        ref={el => {
          this.sidebarEl = el;
        }}
        style={{ top: `${this.state.top}px` }}
      >
        <div className='menue-wrapper'>
          <Fab aria-label="Add">
            <Icon>add</Icon>
          </Fab>
        </div>
      </div>
    )
  }
}

export default Sidebar