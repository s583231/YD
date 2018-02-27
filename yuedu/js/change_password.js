window.onload = function(){
    userinfo();
    checkLogin();

}
//修改密码
document.getElementById("btnCode").onclick = function(){
    
 var phone = document.getElementById('textPhone').value;
 var password = document.getElementById('pwd2').value;
 var captcha = document.getElementById('code').value;
    ajaxXHR('GET',url+'captcha?type=reset&phone='+phone,function(data){
        if(data.code == 'param_incomplete'){
            alert('请求参数不完整!');
            return;
        }
        if(data.code == 'account_has_registered'){
            alert('用户已注册!');
            return;
        }
        if(data.code == 'phone_format_error'){
            alert('手机号格式有误!');
            return;
        }
        if(data.code == 'param_type_error'){
            alert('参数只能传规定值');
            return;
        }
        if(data.code == 'SUCCESS'){
            document.getElementById('code').value = data.captcha;
            alert('您的验证码是'+data.captcha);
        }
    });
}
document.getElementById('btnClick').onclick = function(){
    var phone = document.getElementById('textPhone').value;
    var password = document.getElementById('pwd2').value;
    var captcha = document.getElementById('code').value;
    ajaxXHR('POST',url+'account/reset',function(data){
        if(data.code == 'SUCCESS'){
            //localStorage.token = data.data.user.token;
            //localStorage.account = data.data.user.account;
            //localStorage.name = data.data.user.name;
            window.location.href = "login.html";
        }
        if(data.code == 'account_token_invalid'){
            alert('身份已失效,请重新登陆');
            return;
        }
        if(data.code == 'code": "sms_captcha_fail'){
            alert('短信验证码错误');
            return;
        }
        if(data.code == 'sms_captcha_overdue'){
            alert('短信验证码已过期');
            return;
        }

        if(data.code == 'phone_format_error'){
            alert('手机格式错误');
            return;
        }
    },'phone='+phone+'&password='+password+'&captcha='+captcha+'&token='+'');
}