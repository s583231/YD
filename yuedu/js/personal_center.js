window.onload = function(){
    checkLogin();  //登录状态
    userinfo();  //登录成功后的用户信息
    // 请求文章列表
    user();  //个人中心的用户名称及城市星座
    loadArticle(1);  //动态添加的文章列表
    // 监听滚动事件
    window.addEventListener('scroll',_.throttle(lazyLoad(),1000));
    window.addEventListener('scroll',returnTop);
}

//动态添加用户信息
function user(){
        var userinfo = `
            <div class="user">
                <div class="user_pic">
                    <img src=`+image+localStorage.avatar+` alt="图片">
                    <p class="user_name">`+localStorage.name+`</p>
                    <p>`+localStorage.sheng1+`&nbsp&nbsp&nbsp`+localStorage.cons+`</p>
                </div>
            </div>
        `
        document.querySelector(".top").insertAdjacentHTML('beforeend',userinfo);
}


// 动态添加文章详情
var limit = 3;
function loadArticle(page){  // 动态添加文章详情
    var url1 = url+'posts/list?page=' + page + '&limit=' + 2 + '&user=' + localStorage.id;
    ajaxXHR('GET',url1,function(data){
        // 错误时返回：
        if(data.code!='SUCCESS'||data.data.articles.length==0){
            document.getElementById('loading').innerHTML='没有更多文章';
            return false;
        }
        console.log(data);
        dt = data.data.articles;
        for(i=0;i<dt.length;i++){ 
            var x = `
            <div class="new">
                <div class="photo1">
                    <a target="_blank" href="article_details.html?id=` + dt[i]._id + `">
                        <img src=`+image+dt[i].cover+`>
                    </a>
                </div>
                <div class="text1">
                    <h3>
                    <a target="_blank" href="article_details.html?id=` + dt[i]._id + `">
                            `+ dt[i].title +` 
                        </a>
                    </h3>
                    <p>`+ dt[i].abstract+`</p>
                    <div class="text_userinfo">
                        <ul>
                            <li class="new_pic">
                                <img src=`+image+dt[i].author.avatar+ ` >
                            </li>
                            <li class="user_lv">
                                `+dt[i].author.name+`
                            </li>   
                            <li class="time">
                            `+moment(dt[i].create_time).format('YY/MM/DD HH:mm')+`
                            </li>
                        </ul>
                    </div>
                    <div class="icon">
                        <li>                        
                            <img src="../images/icon_saw.png" alt="" class="zan">
                            `+ dt[i].praise_sum+`
                        </li>
                        <li>
                            <img src="../images/icon_thumb_up.png" alt="" calss="look">
                            `+ dt[i].look_sum+`    
                        </li>
                    </div>                          
                </div>
            </div>
            `
        document.querySelector(".news").insertAdjacentHTML('beforeend',x);
        }
    });
}

function lazyLoad(page){ // 监听滚动条,加载第下页
    console.log('11');
    var page = 2;
    return function(){
        console.log(123);
        var loading = document.getElementById("loading");
        if(loading.getBoundingClientRect().top+loading.offsetHeight<document.body.clientHeight){
            // console.log(loading.getBoundingClientRect().top + loading.offsetHeight < document.body.clientHeight);
            //不能用body.clientHeight,它的高度包含了滚动条的高度,所以条件一直是成立的,因此,只要滚动条一滚动,他便会一下加载下一页的内容
            // console.log(4);
            loadArticle(page++);
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
