$(function(){
	// $.ajax({
	// 	url: '../static/js/user.json',
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	// data: {param1: 'value1'},
	// })
	// .done(function(data) {
	// 	// alert(data.code)
	// 	if(data.code==1)
	// 	{
	// 		$('.user_name').html('欢迎您：<em>'+ data.userinfo.name +'</em>');
	// 		$('.user_name').show();
	// 		$('.loging').hide();
	// 	}
	// })
	// .fail(function() {
	// 	alert('服务器超时，请重试！');
	// });

	$.ajax({
		url: 'http://192.168.60.128:8080/login.html',
		type: 'POST',
		dataType: 'json',
		// data: {param1: 'value1'},
	})
	.done(function(data) {
		// alert(data.code)
		if(data.code==1)
		{
			$('.user_name').html('欢迎您：<em>'+ data.userinfo.name +'</em>');
			$('.user_name').show();
			$('.loging').hide();
		}
	})
	.fail(function() {
		alert('服务器超时，请重试！');
	});
	
	

	$.ajax({
		url: '../static/js/goods.json',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		if(data.code==1)
		{
			var str = '<span>|</span>';
			var len = data.goodsinfo.recommend.length;

			for(var i=0;i<len;i++)
			{
				str += '<a href="'+data.goodsinfo.recommend[i].goodslink+'">'+data.goodsinfo.recommend[i].goodsname+'</a>';
			}

			$('#hot_fruit1').html(str);


			var str2 = '';
			var len2 = data.goodsinfo.goodslist.length;

			for(var i=0;i<len2;i++)
			{
				str2 += '<li>'+
						'<h4>'+ data.goodsinfo.goodslist[i].goodsname +'</h4>'+
						'<a href="'+ data.goodsinfo.goodslist[i].goodslink +'"><img src="'+ data.goodsinfo.goodslist[i].goodspic +'" alt="商品图片"></a>'+
						'<p>¥ '+ (data.goodsinfo.goodslist[i].price).toFixed(2) +'</p>'+
						'</li>';
			}
			$('#goods_list01').html(str2);
		}

	})
	.fail(function() {
		alert('服务器超时，请重试！');
	});


})