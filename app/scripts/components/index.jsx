var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var Message = require('../models/message.js').Message;
var MessageCollection = require('../models/message.js').MessageCollection;
var currentUser = require('../router.js').currentUser;

var AppComponent = React.createClass({
  getInitialState: function(){
    var self = this;
    var messageBoard = new MessageCollection();


    messageBoard.fetch().then(function(){
      self.setState({collection: messageBoard})
    });

    return {
      collection: messageBoard
    };
  },
  addMessage: function(messageModel){
    this.state.collection.create(messageModel);
    this.setState({collection: this.state.collection});
  },
  render: function(){
    var messageList = this.state.collection.map(function(message){
      return (
        <MessageComponent
          key={message.get('_id')}
          model={message}
        />
      );
    });

    return(
      <div className="container">
        <div className="row">
          <UserInfoComponent />
          <div className="col-md-9 message-container">
            <div className="row messages-window">
              {messageList}
            </div>
            <div className="message-input">
              <InputComponent model={this.state.newMessage} username={this.props.currentUser.get('username')}/>
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
    console.log(this.props);
    return(
      <div className="message">
        <img src={this.props.model.get('user_avatar')} alt="..." />
        <span className="username-message">{this.props.model.get('username')}</span>
        <span className="time-stamp">{this.props.model.get('time')}</span>
        <p className="message-content">{this.props.model.get('content')}</p>
      </div>
    );
  }
});

var InputComponent = React.createClass({
  getInitialState: function(){
    return {
      content: ''
    };
  },
  handleSubmit: function(e){
    e.preventDefault();
    var currentTime = new Date();
    var newMessage = {
    username: this.props.username,
    content: this.state.content,
    /* user_avatar: this.state.user_avatar,*/
    time: currentTime.getHours() + ':' + currentTime.getMinutes()
    };

    /* this.props.addMessage(newMessage); */
    console.log(newMessage);
  },
  handleContent: function(e){
    var contentValue = e.target.value;
    this.setState({content: contentValue});
    console.log(this.state.content);
  },
  render: function(){
    return(
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input onChange={this.handleContent} type="text" className="form-control" value={this.state.content} name="message-input" id="message-input" placeholder="Your message here..." />
        </div>
        <button type="submit" className="btn btn-success">Post Message</button>
      </form>
    );
  }
});

var UsernameFormComponent = React.createClass({
  getInitialState: function(){
    return {
      username: ''
    };
  },
  handleChange: function(e){
    e.preventDefault();
    var inputData = e.target.value;
    this.setState({username: inputData});
  },
  updateCurrentUser: function(e){
    e.preventDefault();

    var currentUserName = this.state.username;
    this.props.currentUser.set({username: currentUserName});
  },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <form className="form-inline col-md-6 col-md-offset-3" onSubmit={this.updateCurrentUser}>
            <div className="form-group">
              <input type="text" onChange={this.handleChange} className="form-control" name="username" id="username-input" placeholder="myCoolUsername" />
            </div>
            <button type="submit" className="btn btn-success">Begin messaging</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = {
  AppComponent: AppComponent,
  UsernameFormComponent: UsernameFormComponent
};
