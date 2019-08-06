import Backbone from 'backbone';
import $ from 'jquery';

import UserSystemListTemplate from '../templates/user_system_list_template';
import userSystemService from '../services/user_system_service';

var UserSystemListView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
    this.userSystemService = userSystemService;
		this.message = '#message';
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
    var response = {};
    if(checked){
      // add system to user
      response = this.userSystemService.addSystem(this.userId, system_id);
    }else{
      // remove system to user
      response = this.userSystemService.removeSystem(this.userId, system_id);
    }
    if(response.status == 200){
      $(this.message).html(response.message);
			$(this.message).addClass('text-success');
			$(this.message).removeClass('text-danger');
		}else{
			$(this.message).html(response.message);
			$(this.message).removeClass('text-success');
			$(this.message).addClass('text-danger');
		}
  }
});

export default UserSystemListView;