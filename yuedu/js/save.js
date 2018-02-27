            var sex = "";
            document.querySelectorAll("#sex input")[0].onclick = function(){
                sex = this.value;
            }
            document.querySelectorAll("#sex input")[1].onclick = function(){
                sex = this.value;
            }
    document.getElementById("save").onclick = function() {
            //判断密码输入是否正确
        var pwd = document.getElementsByClassName('size1')[1].value;
        if(pwd == ""){
            alert("请输入密码");
        }else if( pwd == localStorage.pwd){
            
            //token
            var token = localStorage.token;
            //头像
            // var avatar = document.getElementById("file_img").files[0];
            //星座
            var index = document.getElementById("star").selectedIndex;
            var indexx = document.getElementById("star").value;
            var constellation = document.getElementById("star").options[index].value;
            var constellation1 = document.getElementById("star").options[index].text;
            localStorage.const = constellation1;
            localStorage.cons = String(indexx);
            console.log(localStorage.cons);
            //省
            var myselect = document.getElementById("province");
            var index1 = document.getElementById("province").selectedIndex;
            var index4 = document.getElementById("province").value;
            var se1 = document.getElementById("province").options[index1].text;
            localStorage.sheng1 = String(index4);
            localStorage.sheng2 = se1;

            //市
            var myselect1 = document.getElementById("city");
            var index2 = document.getElementById("city").selectedIndex;
            var se2 = document.getElementById("city").options[index2].text;
            localStorage.shi1 = se2;

            //区
            var myselect2 = document.getElementById("area");
            var index3 = document.getElementById("area").selectedIndex;
            var se3 = document.getElementById("area").options[index3].text;

            var city = new Array();
            city[0] = String(index1);
            city[1] = String(index2);
            city[2] = String(index3);
            var st = '[' + String(city) + ']';
            
            
            //name
            // var name1 = document.getElementsByClassName("size1")[0].value;
            var fordata = new FormData();
            fordata.append("token", token);
            fordata.append("avatar", document.getElementById("file_img").files[0]);
            fordata.append("name",document.getElementsByClassName("size1")[0].value);
            fordata.append("constellation", localStorage.cons);
            fordata.append("gender", sex);
            fordata.append("city", st);
            ajaxXHR1('POST', url + 'account/profile', function(data) {
                if (data.code == 'SUCCESS') {
                    alert("保存成功");
                    window.location.href = "login.html";
                } else {
                    alert("保存失败");
                }
                // window.location.href = "article_list.html";
            }, fordata)
        }
    }


    
