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
  },
  render: function(userId){
    this.userId = userId;
    var resp = this.userSystemService.list(this.userId);
    console.log(resp.message);
    $(this.el).html(
      UserSystemListTemplate({
        systems: resp.message,
				base_url: BASE_URL,
			})
		);
	},
});

export default UserSystemListView;