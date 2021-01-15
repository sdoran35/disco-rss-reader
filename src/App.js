const React = require('react');
const { Router, Route } = require('react-router-dom');
const { createBrowserHistory } = require('history');
const HomePage = require('./HomePage');
const TopBar = require('./TopBar');
const FeedPage = require('./FeedPage');
const history = createBrowserHistory();
require('../styles/App.css');

function App({ feedsStore }) {
  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route
          path="/"
          exact
          component={props => <HomePage {...props} feedsStore={feedsStore} />}
        />
        <Route
          path="/feed"
          exact
          component={props => <FeedPage {...props} feedsStore={feedsStore} />}
        />
      </Router>
    </div>
  );
}
export default App;