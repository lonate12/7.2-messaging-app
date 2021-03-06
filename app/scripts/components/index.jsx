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

    messageBoard.fetch().then(function(){
      self.setState({collection: messageBoard});
      self.scrollToBottom();

      setInterval(function(){
        messageBoard.fetch().then(function(){
          self.setState({collection: messageBoard});
        });
      },3000);
    });

    return {
      collection: messageBoard
    };
  },
  addMessage: function(messageModel){
    this.state.collection.create(messageModel);
    this.state.collection.sort();
    this.setState({collection: this.state.collection});
  },
  scrollToBottom: function(){
    console.log('scroll');
    var messagesViewWindow = document.getElementById('messages-window');
    messagesViewWindow.scrollTop = messagesViewWindow.scrollHeight;
  },
  componentWillUpdate: function(){
    var messagesViewWindow = document.getElementById('messages-window');
    this.shouldScrollBottom = messagesViewWindow.scrollTop + messagesViewWindow.offsetHeight === messagesViewWindow.scrollHeight;
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
          <UserInfoComponent username={/*this.props.currentUser.get('username')*/sessionStorage.getItem('username')}/>
          <div className="col-md-9 message-container">
            <div className="col-md-12">
              <div className="row" id="messages-window">
                {messageList}
              </div>
            </div>
            <div className="message-input">
              <InputComponent
                collection={this.state.collection}
                username={sessionStorage.getItem('username')}
                addMessage={this.addMessage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  componentDidUpdate: function(){
    if(this.shouldScrollBottom){
      this.scrollToBottom();
    }
  }
});

var UserInfoComponent = React.createClass({
  render: function(){
    return(
      <div className="col-md-3 user-info-container">
        <img src="https://unsplash.it/250/250" alt="..." className="user-avatar"/>
        <p className="username-main">{this.props.username}</p>
      </div>
    );
  }
});

var MessageComponent = React.createClass({
  /*http://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript*/
  msToTime: function(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours-4 : hours-4;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes;
  },
  render: function(){
    var timeInMS = this.props.model.get('time');
    var formattedTime = this.msToTime(timeInMS);
    var me = sessionStorage.getItem('username');
    var thisUser = this.props.model.get('username');

    return(
      <div className={(me == thisUser) ? 'message me' : 'message'}>
        <img src={this.props.model.get('user_avatar') ? this.props.model.get('user_avatar'): 'https://unsplash.it/30/30'} alt="..." className="message-avatar" />
        <span className="message-username">{this.props.model.get('username') ? this.props.model.get('username') : 'Anonymous'}</span>
        <span className="message-time-stamp">{formattedTime}</span>
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
      <form className="form-inline message-form" onSubmit={this.handleSubmit}>
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
    sessionStorage.setItem('username', this.state.username);
    console.log(this.props.currentUser);
    Backbone.history.navigate('message-view/', {trigger:true});
  },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <h1 className="col-md-12 main-header">Zugzwang</h1>
          <form className="form-inline col-md-6 col-md-offset-3" onSubmit={this.updateCurrentUser}>
            <div className="form-group username-login-container">
              <input type="text" onChange={this.handleChange} ref="username" className="form-control" name="username" id="username-input" placeholder="Enter your username" required="required"/>
              <button type="submit" className="btn btn-success">Begin messaging</button>
            </div>
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
