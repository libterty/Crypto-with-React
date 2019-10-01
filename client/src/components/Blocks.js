import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Block from './Block';

class Blocks extends Component {
  state = { blocks: [], paginationId: 1, blocksLength: 0 };

  componentDidMount() {
    // fetch(`${document.location.origin}/api/blocks`)
    //   .then(response => response.json())
    //   .then(json => this.setState({ blocks: json }))
    //   .catch(err => console.log(err));
    fetch(`${document.location.origin}/api/blocks/length`)
      .then(response => response.json())
      .then(json => this.setState({ blocksLength: json }))
      .catch(err => console.log(err));
    // adding callback to avoid infinity roop
    this.fetchPaginationBlocks(this.state.paginationId)();
  }

  // return own callbck to avoid infinity roop
  fetchPaginationBlocks = paginationId => () => {
    fetch(`${document.location.origin}/api/blocks/${paginationId}`)
      .then(response => response.json())
      .then(json => this.setState({ blocks: json }))
      .catch(err => console.log(err));
  };

  render() {
    console.log('Blocks this.state', this.state);
    return (
      <div>
        <div>
          {' '}
          <Link to="/"> Home </Link>{' '}
        </div>{' '}
        <h3> Blocks </h3>{' '}
        <div>
          {' '}
          {[...Array(Math.ceil(this.state.blocksLength / 5)).keys()].map(
            key => {
              const paginationId = key + 1;

              return (
                <span
                  key={key}
                  onClick={this.fetchPaginationBlocks(paginationId)}
                >
                  <Button bsSize="small" bsStyle="danger">
                    {' '}
                    {paginationId}{' '}
                  </Button>{' '}
                </span>
              );
            }
          )}{' '}
        </div>{' '}
        {this.state.blocks.map(block => {
          return <Block key={block.hash} block={block} />;
        })}{' '}
      </div>
    );
  }
}

export default Blocks;
