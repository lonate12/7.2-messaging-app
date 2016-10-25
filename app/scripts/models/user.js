var Backbone = require('backbone');

var User = Backbone.Model.extend({
  defaults: {
    username: ''
  }
});

module.exports = {
  User: User
};
