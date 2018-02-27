// 在文章详情页里面用url传递参数
// 参数并不是敏感的参数,所以可以用url

window.onload = function(){
    checkLogin();  //登录状态
    userinfo();  //登陆状态栏的个人信息
    article_details();  //文章的内容
    comment_add (1);  //发表评论
    comment_list(1);  //评论列表
    lazyLoad();    //监听滚动条
    window.addEventListener('scroll',_.throttle(lazyLoad(),1000)); //监听滚动条,加载下一页
    window.addEventListener('scroll',returnTop);  //返回顶部的按钮
}

// 文章
function article_details(){  //封装一个动态添加文章的函数
    var id=document.location.href;    //获取id
    id = id.split("=")[id.split("=").length-1];    // 切割符,让id从=符切割
    console.log(id);
    var url1=url+'posts/details?id='+id;
    // var url1="../php/article2.js"
    ajaxXHR('GET',url1,function(data){
        // 错误时返回：
        if(data.code =='param_incomplete'){
            alert ('请求参数不完整');
            return false;
        }else if (data.code == 'article_not_found'){
            alert ('文章不存在');
            return false;            
        }
        console.log(data);
        dt = data.data.article; 
        var wz = `
            <div class="box">
            <span id='article_details_title'>
                `+dt.title+`
            </span>
            <span class="icon" id="icon"><img src="../images/icon_share.png" alt="分享">分享                      
            <div class="Qr-box" id="Qr-box">
                使用微信扫一扫
                <div class="Qr" id="Qr">
                    <img src="../images/Qr_code.jpg" alt="">                   
                </div>
            </div>        
            </span>
            <div class="author">
            
                <span class="pic">
                    <img src=`+image+dt.author.avatar+` alt="头像"></span>
                <span>`+ dt.author.name+`</span>
                <span>`+moment(dt.create_time).format('YY/MM/DD HH:mm')+`</span>
                <span class="icon">
                <img src="../images/icon_thumb_up.png" alt="赞">
                `+dt.author.praise_sum+`
                </span>
                <span class="icon" class="icon-share">
                <img src="../images/icon_share.png" alt="分享">
                `+dt.author.look_sum+`
                </span>
            </div>
            <div class="picture">
                <img src=`+image+dt.pic+`>
            </div>
            <div class="text">   
                `+dt.body+`      
            </div>
            </div>
            </div>
            
        `
    document.querySelector(".center").insertAdjacentHTML('afterbegin',wz);   
    })
}

//发表评论
 function comment_add (){
     console.log(123);
    var id=document.location.href;//获取id
    id = id.split("=")[id.split("=").length-1];      // 切割符
    console.log(id);
    var body = document.getElementById("text_area").value;
    var token = localStorage.token;
    url1 = url+"comment/add";
    ajaxXHR("POST",url1,function(data){
        if (data.code == "param_incomplete"){
            alert("请求参数不完整");
        }else if(data.code == "article_not_found"){
            alert("文章不存在");             
        }else if(data.code == "account_token_invalid"){
            alert("身份已失效,请重新登录");                
        }else if(data.code == "SUCCESS"){
            alert("发表成功");
        }
        console.log(data);
    },'token='+token+'&body='+body+'&article='+id);
}



//评论列表
var page = 1;//定义评论页数
var limit = 5;//定义评论每页显示数量
function comment_list(page){
    console.log('123456');
    // var plcd=data.data.comments;  获取到评论
    var id=document.location.href;//获取id
    id = id.split("=")[id.split("=").length-1];// 切割符
    var url1 = url + 'comment/list?page='+page+'&article='+id+'&limit=3';
    ajaxXHR ('GET',url1,function(data){
        if (data.code == "param_incomplete"){
            document.getElementById('user-comments').innerHTML='请求参数不完整';
            return false;
        }else if(data.code == "param_error"){
            document.getElementById('user-comments').innerHTML='请求参数有误';
        }

        for (i=0 ;i<3;i++){
            var da = data.data.comments;
            var comment_list1 = `
            <div class="comment1">
                <span class="pic">
                    <img src=`+image+da[i].author.avatar+` alt="头像">
                </span>
                <span>`+da[i].author.name+`</span>
                <span>
                    `+moment(da[i].create_time).format('YY/MM/DD HH:mm')+`
                </span>
                <span class="icon">
                    <img src="../images/icon_thumb_up.png" alt="赞">
                    `+da[i].praise_sum+`
                </span>
                <p>
                    `+da[i].body+`
                </p>
            </div>
            `
    // console.log('456');
    document.querySelector(".user-comments").insertAdjacentHTML('beforeend',comment_list1);
        }
    })
}

function lazyLoad(page){ // 监听滚动条,加载第下页
    console.log('11');
    var page = 2;
    return function(){
        console.log(123);
        var loading = document.getElementById("loading");
        if(loading.getBoundingClientRect().top + loading.offsetHeight < document.body.clientHeight){
            // console.log(loading.getBoundingClientRect().top + loading.offsetHeight < document.body.clientHeight//document.documentElement.clientHeight);
            //不能用body.clientHeight,它的高度包含了滚动条的高度,所以条件一直是成立的,因此,只要滚动条一滚动,他便会一下加载下一页的内容
            // console.log(4);
            comment_list(page++);
        }
    }
}

    // 返回顶部按钮    
    function returnTop(){
    // 可视区高度
    var clientHeight=document.body.clientHeight;
    // 回到顶部的按钮
    var btn = document.getElementsByClassName('btnReturn')[0];
    var timer = null;
    // 开关
    var isTop = true;
    // 滚动条滚动时触发
    // window.onscroll = function() {
        // 获取页面卷起高度
        // 滚动条的高度
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 显示回到顶部按钮
        // 如果滚动条的高度大于可视区的高度
        if (osTop >= clientHeight) {
            // 让按钮显示
        btn.style.display = "block";
        } else {
            // 否则不显示
        btn.style.display = "none";
        };
        // 回到顶部过程中用户滚动滚动条，停止定时器 
        // 如果，不是ture
        if (!isTop) {
            // 那么，清除定时器并打印istop的值
            clearInterval(timer);
            console.log("当回到顶部过程中用户滚动滚动条时，isTop为"+isTop); //false
        };
        isTop = false; 
        // 设置页面下拉到正在加载时禁止下拉 

    btn.onclick = function() {
    // 设置定时器
        timer = setInterval(function(){
            // 获取滚动条距离顶部高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            console.log('滚动条距离顶部高度 '+osTop);
            // 创建一条滚动条距离顶部高度为负数的数据 
            // 当点击返回顶部按钮时，用卷起距离 + 为负的卷起距离
            // 为负的卷起距离除以一个数 除数越小 为负的卷起距离越接近于卷起距离 滚动条速度越快
            var ispeed = Math.floor(-osTop / 7);
            console.log('ispeed '+ispeed);
            document.documentElement.scrollTop = document.body.scrollTop = osTop+ispeed;
            //到达顶部，清除定时器
            if (osTop === 0) {
                clearInterval(timer);
            };
            isTop = true;
        },30); 
    };
};
// 怎样做响应式
// 媒体查询
// rem代替px;
// rem与em
// rem与px