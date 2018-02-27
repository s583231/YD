function ajaxXHR (type,url,cb,params){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var data = JSON.parse(xhr.responseText);        
            cb(data);
        }
    }
    xhr.open(type,url);
    xhr.withCredentials = true; 
    //作用:在跨域的情况下,允许写入本地cookie;是一个安全验证,在调用接口时,页面会弹出一个身份验证;
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(params);
}
function ajaxXHR1 (type,url,cb,params){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var data = JSON.parse(xhr.responseText);        
            cb(data);
        }
    }
    xhr.open(type,url);
    xhr.withCredentials = true; 
    //作用:在跨域的情况下,允许写入本地cookie;是一个安全验证,在调用接口时,页面会弹出一个身份验证;
    // xhr.setRequestHeader("Content-Type","multipart/form-data");
    xhr.send(params);
}
var url = 'https://dev.apis.sh/n7VWiYVk@/';   //url
var image = 'https://dev.apis.sh/n7VWiYVk@/static/';  //图片


function checkLogin(){  //封装一个登录状态栏的函数
    var Otoken = document.getElementsByClassName("user_name")[0];
    var tokenNull = document.getElementsByClassName("tokenNull")[0];
    var token = localStorage.token;
    if (token != ''){  //如果页面的token值为空,令页面的顶部显示的是登录和注册
        tokenNull.style.display = "none";
        Otoken.style.display = "block";

    }else{  // 如果有token值,则显示的他内容
        Otoken.style.display = "none";
        tokenNull.style.display = "block";        
    }
}



// 退出登录
document.getElementById("td").onclick = function(){  //退成登录的点击事件
    localStorage.token = "";  //清除他的token值
    window.location.href = "login.html"
} 

//登录 信息
function userinfo(){  //封装一个登录状态栏用户信息的函数
    document.getElementById("user_name_pic").src =image+ localStorage.avatar;  //用户的头像
    // console.log(localStorage.avatar);
    document.getElementById("user_name").innerHTML = localStorage.name;  //用户的姓名
    // console.log(localStorage.name);
}
