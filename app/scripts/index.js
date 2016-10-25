// Make work manually, then hook up router
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var AppComponent = require('./components/index.jsx').AppComponent;
var User = require('./models/user.js').User;

// DOM Ready
$(function(){
  // sign-in first, then, fetch, then render

  ReactDOM.render(
    React.createElement(AppComponent),
    document.getElementById('app')
  );
});
