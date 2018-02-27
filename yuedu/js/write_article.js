window.onload=function(){
    checkLogin();
    userinfo();  
    header1(){

}


document.getElementById("file_img").onchange = function(){
    var file = this.files[0];
    var img_reader = new FileReader;
    img_reader.onload = function(e){
        console.log(e.target);
        document.getElementById("div_img").innerHTML = '<img src="'+ e.target.result +'">';
    }
        img_reader.readAsDataURL(file);
        var pic = file;
};

// 发表文章
document.getElementById('button').onclick = function(data){
    var title = document.getElementsByClassName("tit")[0].value;    
    var text = document .getElementsByTagName('textarea')[0].value;
    var token = localStorage.token;
    var pic = document.getElementById("file_img").files[0];
    var data = new FormData();
    data.append("token",token);
    data.append("title",title);
    data.append("pic",pic);
    data.append("body",text);
    
    console.log(token);
    console.log(title);
    console.log(pic);
    console.log(text);
    ajaxXHR1('POST',url+'/posts/add',function(data){
        if(data.code == "SUCCESS"){
            alert('发表成功');
            window.location.href = "article_list.html"
        }else if(data.code == "param_incomplete"){
            alert('请求参数不完整');
        }else if(data.code == "article_has_exist"){
            alert('文章标题已存在');
        }else if(data.code == "account_token_invalid"){
            alert('身份已失效,请重新登录');
        }
    },data);
}
