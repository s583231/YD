// 获取验证码
var yzm="";
document.getElementById("btnCode").onclick = function code(){ //短信验证码发送请求事件
    var phone = document.getElementById("textPhone").value; //获取到手机号码
    if(phone==""){
        alert("请输入手机号码！！！");
        return false;
    }else if(!(/^1[34578]\d{9}$/.test(phone))){ //正则表达式,判断手机号码格式是否正确
        alert("手机号码有误，请重填"); 
        return false;
    }else{
        ajaxXHR('GET',url+'captcha?type=register&phone='+phone,function(data){
            yzm=data.captcha;  //验证码为...
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
            if(data.code == 'SUCCESS'){  //如果请求成功,则获取到验证码
                document.getElementById('code').value = data.captcha;  //直接将验证码写入到输入验证码区域
                alert('您的验证码是'+data.captcha); //弹出验证码
            }
        });
    }
}

// 注册按钮
document.getElementById("btnRegister").onclick = function register(){ //注册按钮绑定验证发送请求事件
    var phone = document.getElementById('textPhone').value;//获取到手机号码
    var captcha = document.getElementById('code').value; //获取到短信验证码
    var pwd1 = document.getElementById('pwd1').value; // 获取到第一次输入的密码值    
    var pwd2 = document.getElementById('pwd2').value; // 获取到第二次输入的密码值

    if(phone==""){alert("请先输入手机号码");return false;}
    if(captcha==""){alert("请输入短信验证码");return false;}
    if(captcha!=yzm){alert("验证码错误");return false;}
    if(pwd1==""){alert("密码不能为空");return false;}
    if(pwd1!=pwd2){alert("两次密码输入不一致");return false;
        }else{
            ajaxXHR('POST',url+'account/register',function(data){
                if(data.code == 'param_incomplete'){
                    alert('请求参数不完整');
                    return;
                }
                if(data.code == 'sms_captcha_fail'){
                    alert('短信验证码错误');
                    return;
                }
                if(data.code == 'sms_captcha_overdue'){
                    alert('短信验证码已过期');
                    return;
                }
                if(data.code == 'SUCCESS'){  //注册成功,直接跳转到登录页面
                    window.location.href = 'login.html';
                }
            },'account='+phone+'&password='+pwd2+'&captcha='+captcha);
        }
    }