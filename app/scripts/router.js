// Third party libraries
var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

// Local imports
var AppComponent = require('./components/index.jsx').AppComponent;
var UsernameFormComponent = require('./components/index.jsx').UsernameFormComponent;
var userModel = require('./models/user.js').User;

var AppRouter = Backbone.Router.extend({
  initialize: function(){
    var currentUser = new userModel();
    console.log(currentUser);
  },
  routes: {
    '': 'index',
    'message-view/': 'viewMessages'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(UsernameFormComponent),
      document.getElementById('app')
    );
  },
  viewMessages: function(){
    ReactDOM.render(
      React.createElement(AppComponent),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
