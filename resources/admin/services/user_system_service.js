import $ from 'jquery';

var UserSystemService = {
  list: function(user_id){
    var resp = {
      status: 200, 
      message: ''
    };
    $.ajax({
      type: 'GET',
      url: BASE_URL + 'user/system/list',
      data: { 
        user_id: user_id,
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data){
				resp.message = JSON.parse(data);
      },
      error: function(xhr, status, error){
        console.error(error);
				resp.message = JSON.parse(xhr.responseText);
				resp.status = 500;
      }
    });
    return resp;
  },
};

export default UserSystemService;
