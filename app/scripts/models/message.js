var Backbone = require('backbone');

var Message = Backbone.Model.extend({
  idAttribute: '_id'
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/messages',
  comparator: function(message){
    return message.get('time');
  }
});

module.exports = {
  Message: Message,
  MessageCollection: MessageCollection
};
