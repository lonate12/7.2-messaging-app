var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var Message = require('../models/message.js').Message;
var MessageCollection = require('../models/message.js').MessageCollection;
var currentUser = require('../router.js').currentUser;

var AppComponent = React.createClass({
  getInitialState: function(){
    var self = this;
    var messageBoard = new MessageCollection();
    setInterval(function(){
    messageBoard.fetch().then(function(){
      self.setState({collection: messageBoard})
    });
  },30000)

    return {
      collection: messageBoard
    };
  },
  addMessage: function(messageModel){
    this.state.collection.create(messageModel);
    this.state.collection.sort();
    this.setState({collection: this.state.collection});
  },
  // componentDidMount: function(){
  //   var self = this;
  //   var collection = this.state.collection;
  //   console.warn(self);
  //   setInterval(function(){
  //     self.state.collection.fetch();
  //   },2000);
  //   console.log('timeout',self);
  // },


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
          <UserInfoComponent username={this.props.currentUser.get('username')}/>
          <div className="col-md-9 message-container">
            <div className="row messages-window">
              {messageList}
            </div>
            <div className="message-input">
              <InputComponent
                collection={this.state.collection}
                username={this.props.currentUser.get('username')}
                addMessage={this.addMessage}
              />
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
        <img src="..." alt="..." />
        <p className="username-main">{this.props.username}</p>
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
    content: this.state.content,
    username: this.props.username,
    user_avatar: null,
    time: currentTime.getTime()
    };

    this.props.addMessage(newMessage);

    this.setState({content: ''});
  },
  handleContent: function(e){
    var contentValue = e.target.value;
    this.setState({content: contentValue});
  },
  render: function(){
    return(
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input onChange={this.handleContent} ref="message" type="text" className="form-control" value={this.state.content} name="message-input" id="message-input" placeholder="Your message here..." />
        </div>
        <button type="submit" className="btn btn-success">Post Message</button>
      </form>
    );
  },
  componentDidMount: function(){
    this.refs.message.focus();
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
    console.log(this.state.username);
  },
  updateCurrentUser: function(e){
    e.preventDefault();

    var currentUserName = this.state.username;
    this.props.currentUser.set({username: currentUserName});
    console.log(this.props.currentUser);
    Backbone.history.navigate('message-view/', {trigger:true});
  },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <form className="form-inline col-md-6 col-md-offset-3" onSubmit={this.updateCurrentUser}>
            <div className="form-group">
              <input type="text" onChange={this.handleChange} ref="username" className="form-control" name="username" id="username-input" placeholder="myCoolUsername" required="required"/>
            </div>
            <button type="submit" className="btn btn-success">Begin messaging</button>
          </form>
        </div>
      </div>
    );
  },
  componentDidMount: function(){
    this.refs.username.focus();
  }
});

module.exports = {
  AppComponent: AppComponent,
  UsernameFormComponent: UsernameFormComponent
};
