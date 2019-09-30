import React, { Component } from 'react';
import Blocks from './Blocks';

class App extends Component {
  state = { walletInfo: {} };

  componentDidMount() {
    fetch('http://localhost:3000/api/wallet-info')
      .then(response => response.json())
      .then(json => this.setState({ walletInfo: json }))
      .catch(err => console.log(err));
  }

  render() {
    const { address, balance } = this.state.walletInfo;
    return (
      <div className="App">
        <br />
        <div> Welcome to the My BlockChain! </div> <br />
        <div className="WalletInfo">
          <div> Address: {address} </div> <div> Balance: {balance} </div>{' '}
        </div>{' '}
        <br />
        <Blocks />{' '}
      </div>
    );
  }
}

export default App;
