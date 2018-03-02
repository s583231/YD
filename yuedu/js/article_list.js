window.onload = function(){
    userinfo();  //登录状态栏用户信息的函数
    checkLogin(); //登录状态
    loadArticle(1);// 请求文章列表,动态添加的
    // Preloading();  //预加载

     // 监听滚动事件
    window.addEventListener('scroll',_.throttle(lazyLoad(),1000)); //监听滚动条,加载下一页
    window.addEventListener('scroll',returnTop);  //返回顶部的按钮
    window.addEventListener('scroll',_.throttle(checkImg(),100));
    
}
// 文章列表 
function loadArticle(page){  //动态添加文章
    var url1=url+'posts/list?page='+page+'&limit=3';
    // var url1="../php/123.js"
    ajaxXHR('GET',url1,function(data){  
        // 错误时返回：
        if(data.code !='SUCCESS' || data.data.articles.length == 0 ){
            document.getElementById('loading').innerHTML='没有更多文章';
            return false;
        }
        console.log(data);
        dt = data.data.articles;
        for(i=0;i<dt.length;i++){ 
            //拼接文章
            var x = `
            <div class="new">
                <div class="photo1">
                <a target="_blank" href="article_details.html?id=` + dt[i]._id + `">
                    <img class="art-cover" src=`+image+dt[i].cover+`>
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
                            <li>
                                <img src=`+image+dt[i].author.avatar+`>
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
        document.querySelector(".news").insertAdjacentHTML('beforeend',x);//将上面拼接的内容加载到.news的
        }
    });
}


function lazyLoad(page){ // 监听滚动条,加载第下页
    console.log('11');
    var page = 2;
    return function(){
        console.log(123);
        var loading = document.getElementById("loading");
        if(loading.getBoundingClientRect().top + loading.offsetHeight < document.documentElement.clientHeight){
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
    var clientHeight=document.documentElement.clientHeight;
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

//懒加载图片
function checkImg(){
    var imgs = document.getElementsByClassName("art-cover");
    for (var i =0; i < imgs[i].lebgth;i++){
        //图片距离顶部的距离
        var imgheight = imgs[i].offsetTop;
        if(imgheight < document.documentElement.clientHeight + document.documentElement.scrollTop){
            //图片预加载
            Preloading_images(imgs[i]);
            //重置已替换calss
            imgs[i].className = imgs[i].className.replace("art-cover","")
        }
    }
}