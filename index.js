const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./src/App')(feedsStore);
const serviceWorker = require('./serviceWorker');
const { FeedsStore } = require('./src/store');
require('./index.css');

const feedsStore = new FeedsStore();

ReactDOM.render(App,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();