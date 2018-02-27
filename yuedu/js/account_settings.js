window.onload = function(){
    checkLogin();
    userinfo();
    star();//星座
    getPro();//调取省级函数
    getCity();   

}

// 上传图片
var userimg=""; 
document.getElementById("file_img").onchange = function(){
  var file = this.files[0];
  var img_reader = new FileReader;
  img_reader.onload = function(e){
      console.log(e.target);
      document.getElementById("div_img").innerHTML = '<img src="'+ e.target.result +'" width="50px" height="50px">';
  }
  img_reader.readAsDataURL(file);
  userimg=file;
};


// 星座
function star(){
    
    ajaxXHR('GET',url+'constellations/query',function(data){

        var xzarr = data.data.constellations;
        //创建一个星座数组
        console.log(xzarr);
        for(var i=0;i<xzarr.length;i++){
            var perxz = xzarr[i]; 

            //获取星座的select           
            var xzsel = document.getElementById("star");
            //创建option
            var xzopt = document.createElement("option");
            //创建文本
            var xzval = document.createTextNode(perxz);
            // xzopt.innerText = perxz;
            //将文本插入到option
            xzopt.appendChild(xzval);
            //将option插入select
            xzsel.appendChild(xzopt);
               
        // var xzarr = new Array(白羊座,金牛座,双子座,巨蟹座,狮子座,处女座,天秤座,天蝎座,人马座,摩羯座,水瓶座,双鱼座);   
        }
    });
}


// 省市区三级联动
//获取省份接口的数据
function getPro(){
    ajaxXHR('GET',url+'city/province',function(data){
        //如果错误时,返回
        // console.log(province);
        if(data.code != 'SUCCESS'){
            document.getElementById('province').insertAdjacentHTML('afterbegin','<option>无法加载城市信息请刷新重试</option>');
            return;
        }
        //添加省级选项
        var dt = data.data.province; 
        var str = '<option>请选择...</option>'; 
        for (var i = 0;i < dt.length; i++){
            str+='<option data-id='+dt[i].ProID+'>';
            str+=dt[i].name; 
            str+='</option>';
        }
        document.getElementById('province').innerHTML = str;
    });
}

//调取市的接口
function getCity(pro_id){
    var str = '<select id="city" class="form-control">';
    ajaxXHR('GET',url+'city/city?ProID=' + pro_id, function(data){
        //错误时返回
        if(data.code !='SUCCESS'){
            str = '<select class="form-control">请求失败</select>';
            return;
        }
        //添加市级选项
        str+='<option>请选择</option>';
        var dt = data.data.city;
        for (var i = 0;i<dt.length;i++){
            str+='<option data-id='+dt[i].CityID+'>';
            str+= dt[i].name;
            str+= '</option>';
        }
        str+='</select>';
        document.getElementById('province').insertAdjacentHTML('afterend',str);
        document.getElementById('city').onchange = function(){
            if(document.getElementById('area') != null){
                this.parentNode.removeChild(document.getElementById('area')); 
             } 
             //清除
            // 获取城市的id
            var city_id = this.selectedOptions[0].dataset.id;
            var str = '<select id="area" class="form-control">';

            ajaxXHR('GET',url+'city/area?CityID=' + city_id, function(data){
                //错误时返回
                if(data.code != 'SUCCESS'){
                    str = '<select class="form-control">请求失败</select>';
                    return;
                }
                //添加县/区选项
                str+='<option>请选择</option>'
                var dt = data.data.area;
                for (var i = 0;i<dt.length;i++){
                    str+='<option data-id='+dt[i].id+'>';
                    str+= dt[i].DisName;
                    str+= '</option>';
                }
                str+='</select>';
                document.getElementById('city').insertAdjacentHTML('afterend',str);
            });
        }
    });
}


//省份的选中事件
document.getElementById('province').onchange  = function (){
    if(document.getElementById('city') != null){
        this.parentNode.removeChild(document.getElementById('city'));
        //removeChild清除父节点中的某一个子节点
    }
    if(document.getElementById('area') != null){
        this.parentNode.removeChild(document.getElementById('area'));
        //removeChild清除父节点中的某一个子节点
    }
    //取到所选省
    var id = this.selectedOptions[0].dataset.id;
    if (id===undefined) return;
    //调取市的函数
    getCity(id);
}
