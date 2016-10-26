// Third party libraries
var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

// Local imports
var AppComponent = require('./components/index.jsx').AppComponent;
var UsernameFormComponent = require('./components/index.jsx').UsernameFormComponent;
var UserModel = require('./models/user.js').User;
var currentUser;

var AppRouter = Backbone.Router.extend({
  initialize: function(){
    this.currentUser = new UserModel();
    this.currentUser.set({username: 'lonate12'});
  },
  routes: {
    '': 'index',
    'message-view/': 'viewMessages'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(UsernameFormComponent, {currentUser: this.currentUser}),
      document.getElementById('app')
    );
  },
  viewMessages: function(){
    ReactDOM.render(
      React.createElement(AppComponent, {currentUser: this.currentUser}),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = {
  router: router,
  currentUser: currentUser
};
