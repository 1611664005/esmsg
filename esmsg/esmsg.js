
//获取全局路径
var path = $("script").eq(-1).attr("src").replace(/[^\/]+$/,""); 
//引入css文件
var link = document.createElement('link');
link.href = path + 'esmsg.css';
link.rel = 'stylesheet';
link.type = 'text/css';
$('head').append(link);

var esmsg = {
    uid:120,
    msgClass:"",
    clearHandle:0,
    //简单提示msg
    msg:function(text){
        this.uid++;
        if (this.msgClass !== "") {
            $(this.msgClass).remove();
            clearTimeout(this.clearHandle);
            clearHandle = 0;
        }
        this.msgClass = ".esmsg-msg" + this.uid;
        var content = `<div class="esmsg-msg esmsg-msg${this.uid}">
            <div class="msg-box">
                ${text}
            </div>
        </div>`;
        $("body").append(content);

        this.clearHandle = setTimeout(() => {
            this.closeDom(this.msgClass);
        }, 1200);
        
    },
    //模态框alert
    alert:function(obj){
        if (this.msgClass !== "") {
            $(this.msgClass).remove();
            clearTimeout(this.clearHandle);
            clearHandle = 0;
        }
        var that = this;
        var content = `<div class="esmsg-alert ${obj.background ? 'esmsg-alert-bg' : ''}">
            <div class="alert-box" unselectable="on" onselectstart="return false;">
                <div class="alert-box-head">
                    <div class="l">
                        ${obj.title ? obj.title : '提示：'}
                    </div>
                    <div class="r">
                        <img src="${path}img/close.png" alt="">
                    </div>
                </div>
                <div class="alert-box-main">
                    <div class="l ${obj.type ? obj.type : ''}">
                        <img src="${obj.type ? path+'img/' + obj.type + '.png' : ''}" alt="">
                    </div>
                    <div class="r">
                        ${obj.text}
                    </div>
                    
                </div>
                <div class="alert-box-footer">
                    <div class="alert-box-footer_btn">
                        确认
                    </div>
                </div>
            </div>
        </div>`;
        
        $("body").delegate('.alert-box-footer_btn','click',function(event){
            
            that.closeDom('.alert-box');
            $('body').off('click','.alert-box-footer_btn');
            if(obj.yes){
                setTimeout(() => {
                    obj.yes();
                }, 250);
                
            }
            
        });
        $("body").append(content);
        this.msgClass = '.esmsg-alert';
    },
    //加载弹窗
    loading:function(){
        if (this.msgClass !== "") {
            $(this.msgClass).remove();
            clearTimeout(this.clearHandle);
            clearHandle = 0;
        }
        var content = `
        <div class="esmsg-loading">
            <div class="loading-box">
                <div class="loading-line">

                </div>  
                <div class="loading-yan">
                    
                </div> 
                <div class="loading-text">
                    Hai 稍等
                </div>
            </div>
        </div>
        `;
        $("body").append(content);
        this.msgClass = '.esmsg-loading';
        
    },
    //关闭所有类型弹窗
    close:function(){
        this.closeDom(this.msgClass);
        this.msgClass = "";
    },
    //移动窗口
    moveDom:function(dom,event){ 
        //鼠标点击位置与dom窗口位置差值计算
        var ClientDom = $(dom).eq(0);
        var LeftCz = event.pageX - ClientDom[0].offsetLeft;
        var TopCz = event.pageY - ClientDom[0].offsetTop;
        //添加监听鼠标事件
        $("body").mousemove(function(e){
            $(dom).css("left",e.pageX - LeftCz);
            $(dom).css("top",e.pageY - TopCz);
        });
        //清除监听鼠标事件
        $("body").delegate(dom,'mouseup',function(event){
            $("body").off("mousemove");
        });
    },
    //结束各类dom
    closeDom:function(dom){
        
        $(dom).css("animation","EsZoomOff 0.3s");
        if(dom == ".alert-box"){
            $('.esmsg-alert').css("animation","EsFildOff 0.3s");
            $('body').off('click','.alert-box-footer_btn');
        }
        this.clearHandle = setTimeout(() => {
            $(dom).remove();
            if(dom == ".alert-box"){
                $('.esmsg-alert').remove();
            }
            
        }, 200);
        
    },
    //初始化EsMsg.js
    reload:function(){
        console.log("初始化EsMsg.js成功！");
        var that = this;

        $("body").delegate('.alert-box-head','mousedown',function(event){
            that.moveDom('.alert-box',event);
        });
        $("body").delegate('.alert-box-head .r','click',function(event){
            
            that.closeDom('.alert-box');
        });
        
        
    }
};
window.onload = function(){
    //初始化EsMsg.js
    esmsg.reload();
}


