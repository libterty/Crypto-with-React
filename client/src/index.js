import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import App from './components/App';
import Blocks from './components/Blocks';
import './index.css';

// class Comp extends React.Component {
//     componentDidUpdate(prevProps) {
//         // will be true
//         const locationChanged = this.props.location !== prevProps.location

//         // INCORRECT, will *always* be false because history is mutable.
//         const locationChanged =
//             this.props.history.location !== prevProps.history.location
//     }
// }

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>{' '}
      <Route exact path="/blocks">
        <Blocks />
      </Route>{' '}
    </Switch>{' '}
  </Router>,
  document.getElementById('root')
);

// render(
//   <Router history={history}>
//     <Switch>
//       <Route exact path="/" render={() => <App />}>
//         {' '}
//       </Route>{' '}
//       <Route exact path="/blocks" render={() => <Blocks />}>
//         {' '}
//       </Route>{' '}
//     </Switch>{' '}
//   </Router>,
//   document.getElementById('root')
// );
