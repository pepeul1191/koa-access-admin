import Backbone from 'backbone';
import $ from 'jquery';

import UserSystemListTemplate from '../templates/user_system_list_template';
import userSystemService from '../services/user_system_service';

var UserSystemListView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
    this.userSystemService = userSystemService;
		this.message = '#mensaje';
    this.events = this.events || {};
    this.userId = 'E';
	},
	events: {
    'click .system-check': 'systemCheckClick',
  },
  render: function(userId){
    this.userId = userId;
    var resp = this.userSystemService.list(this.userId);
    $(this.el).html(
      UserSystemListTemplate({
        systems: resp.message,
        base_url: BASE_URL,
        user_id: this.userId,
			})
		);
  },
  systemCheckClick:function(event){
    var system_id = event.target.getAttribute('system_id');
    var checked = $(event.target).is(':checked');
    if(checked){
      // add system to user
      this.userSystemService.addSystem(this.userId, system_id);
    }else{
      // remove system to user
      this.userSystemService.removeSystem(this.userId, system_id);
    }
  }
});

export default UserSystemListView;