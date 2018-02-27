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
    window.location.href = "login.html";   //跳转到登录页面
} 
//登录 信息
function userinfo(){  //封装一个登录状态栏用户信息的函数
    document.getElementById("user_name_pic").src =image+ localStorage.avatar;  //用户的头像
    // console.log(localStorage.avatar);
    document.getElementById("user_name").innerHTML = localStorage.name;  //用户的姓名
    // console.log(localStorage.name);
}
