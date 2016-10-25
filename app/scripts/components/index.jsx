var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var Message = require('../models/message.js').Message;
var MessageCollection = require('../models/message.js').MessageCollection;

var AppComponent = React.createClass({
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <UserInfoComponent />
          <div className="col-md-9 message-container">
            <div className="row messages-window">
              <MessageComponent />
            </div>
            <div className="message-input">
              <InputComponent />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var UserInfoComponent = React.createClass({
  render: function(){
    return(
      <div className="col-md-3 user-info-container">
        <img src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/10258884_692431914150232_1608469162711838332_n.jpg?oh=5944c50a2c6b944d502dbba0317212ad&oe=588EE2CD" alt="..." />
        <p className="username-main">lonate12</p>
      </div>
    );
  }
});

var MessageComponent = React.createClass({
  render: function(){
    return(
      <div className="message">
        <img src="..." alt="..." />
        <span className="username-message">dantheman</span>
        <span className="time-stamp">5:30 PM</span>
        <p className="message-content">This is a message that Dan sent</p>
      </div>
    );
  }
});

var InputComponent = React.createClass({
  render: function(){
    return(
      <form className="form-inline">
        <div className="form-group">
          <input type="text" className="form-control" name="message-input" id="message-input" placeholder="Your message here..." />
        </div>
        <button type="submit" className="btn btn-success">Post Message</button>
      </form>
    );
  }
});

var UsernameFormComponent = React.createClass({
  render: function(){
    return(
      <form className="form-inline col-md-6 col-md-offset-3">
        <div className="form-group">
          <input type="text" className="form-control" name="username" id="username-input" placeholer="myCoolUsername" />
        </div>
        <button type="submit" className="btn btn-success">Begin messaging</button>
      </form>
    );
  }
});

module.exports = {
  AppComponent: AppComponent,
  UsernameFormComponent: UsernameFormComponent
};
