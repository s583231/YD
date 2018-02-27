document.getElementById('btnlogin').onclick = function login(){ //登录按钮点击事件
    var pwd = document.getElementById('pwd').value;  //
    var phone = document.getElementById('textPhone').value;
    if(phone==""){
        alert("手机号不能为空");
        return false;
    }
    if(!(/^1[34578]\d{9}$/.test(phone))){
        alert("手机号码格式不正确");
        return false;
    }
    if(pwd==""){
        alert("密码为空,请输入密码");
        return false;
    }else{
        ajaxXHR('POST',url+'account/login',function(data){
            if(data.code == 'SUCCESS'){
                localStorage.token = data.data.user.token;  
                localStorage.account = data.data.user.account;
                localStorage.avatar = data.data.user.avatar;
                localStorage.name = data.data.user.name;
                localStorage.gender = data.data.user.gender;
                localStorage.city = data.data.user.city;
                localStorage.background = data.data.user.background;
                localStorage.pwd = pwd;
                localStorage._id = data.data.user._id;
                console.log(data.data.user.avatar)
                localStorage.constellations=data.data.user.constellations;
                console.log(data.data.user.constellations);
                alert("登陆成功,即将进入首页");
                window.location.href = 'article_list.html';//登录成功,进入文章列表页面
            }
            if(data.code == 'param_incomplete'){
                alert('请求参数不完整');
                return;
            }
            if(data.code == 'account_password_error'){
                alert('账户或密码错误');
                return;
            }
        },'account='+phone+'&password='+pwd);
    }
}