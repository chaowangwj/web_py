$(function(){
	var error_name = false;
	var error_password = false;
	var error_check_password = false;
	var error_email = false;
	var error_check = true;
	var $user_name=$('#user_name');
	var $flg=false

	$("#user_name").blur(function(){
		check_user_name();
	});
	$("#pwd").blur(function(){
		check_pwd();
	});
	$("#cpwd").blur(function(){
		check_cpwd();
	});
	$("#email").blur(function(){
		check_email();
	});
	$("#allow").click(function(){
		if ($(this).is(':checked')){
			$(this).siblings('span').hide();
			error_check = true;
		}
		else{
			
			$(this).siblings('span').html('请勾选同意');
			$(this).siblings('span').show();
			error_check=false;
		}

	});

	function check_user_name()
	{	
		
		
		var len = $user_name.val().length;
		var re=/^\w+\w$/ ;
		// alert(len);
		if (len<6 || len>18)
		{
			$user_name.next().html('请输入6-18个字符的用户名')
			$user_name.next().show();
			error_name = false;
		}
		else if (re.test($user_name.val())){
			$user_name.next().hide();
			error_name = true;
		}
		else
		{
			$user_name.next().html('用户名不能含有特殊字符，请输入字母数字下划线');
			$user_name.next().show();
			error_name = false;
		}	;
	
		aa();
  }
function aa() {
			$.ajax({
    // url: '../static/js/goods.json',
    url: 'http://192.168.60.128:8080/usermessage',
    type: 'GET',
    dataType: 'json',
    data:{'name':$user_name.val()}
	})
	.done(function(data) {
		// alert(data.find)
		if (data.find==false){
			$flg = true
		
		}
		else{
				$user_name.next().html('用户名已存在');
				$user_name.next().show();
				error_name = false;	
				$flg = false
					}
	})

	.fail(function() {
		error_name = false;
    alert('服务器超时，请重试！');
	});
}

  function check_pwd()
  {
  	var $pwd=$("#pwd");
  	var len = $pwd.val().length;
  	var re=/^[A-Za-z0-9]+$/ ;
  	if (len<6||len>18){
  		$pwd.next().html('请输入6-18个字符的密码')
		$pwd.next().show();
		error_password = false;
  	}
  	else if(re.test($pwd.val())){
  		$pwd.next().hide();
		error_password = true;
  	}
  	else{
  		$pwd.next().html('密码格式不对，由6-18位字母数字组成');
		$pwd.next().show();
		error_password = false;
  	}
  }
  function check_cpwd(){
  	// alert(error_name);
  	$cpwd=$("#cpwd");
  	if ($("#pwd").val()==$cpwd.val()){
  		$cpwd.next().hide();
		error_check_password = true;
  	}
  	else{
  		$cpwd.next().html('两次输入密码不一致');
		$cpwd.next().show();
		error_check_password = false
  	}
  }
   function check_email(){
  	var $email=$("#email");
  	var re=/^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/
  	if (re.test($email.val())){
  		$email.next().hide();
		error_email = true;
  	}
  	else{
  		$email.next().html('邮箱格式不正确');
		$email.next().show();
		error_email = false;

  	}
  }
  $('#reg_form').submit(function() {
		check_user_name();
		aa();
		check_pwd();
		check_cpwd();
		check_email();

		// alert(error_name);
		// alert(error_password);alert(error_check_password);alert(error_email);alert(error_check);
		// alert(error_name);
		if(error_name == true && $flg==true && error_password == true && error_check_password == true && error_email == true && error_check == true)
		{
			return true;
		}
		else
		{
			return false;
		}
})

})