import React, { Component } from 'react';



class BlockData extends Component {

  render() {
    return (
      <div >
        {this.props.children}
      </div>
    );
  }
}

export default BlockData;
