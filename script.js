/*最近阅读书本信息*/
    var recently = [{bookCover:'',name:'书名1',author:'作者1',newist:'最新1',readTo:'读至1'},
                   {bookCover:'',name:'书名2',author:'作者2',newist:'最新2',readTo:'读至2'},
                   {bookCover:'',name:'书名3',author:'作者3',newist:'最新3',readTo:'读至3'}];
/*我的书架书本信息*/
    var collection = [{bookCover:'',name:'书名1',author:'作者1',newist:'最新1',readTo:'读至1'},
                   {bookCover:'',name:'书名2',author:'作者2',newist:'最新2',readTo:'读至2'},
                   {bookCover:'',name:'书名3',author:'作者3',newist:'最新3',readTo:'读至3'},{bookCover:'',name:'书名4',author:'作者4',newist:'最新4',readTo:'读至4'}];
    
    //页面书籍展示方式
    var myBook_listStyle = 'tile';
    var recently_listStyle = 'listing';
    
    $(document).ready(function(e){
        
        /*我的书架页面初始化*/
        $('.collectionNum').text('共收藏'+collection.length+'本');
        showStyle(collection,myBook_listStyle);
        
        /*点击 我的书架 触发动作*/
        $('.myBookshelf').click(function(e){
            $(this).css('color','#33cc99');
            $(this).css('border-bottom-color','#33cc99');
            $('.recentlyRead').css('color','black');
            $('.recentlyRead').css('border-bottom-color','#dddddd');
            
            $('#myBookshelf').show();
            $('#recentlyRead').hide();
            
            $('.collectionNum').text('共收藏'+collection.length+'本');
            
            showStyle(collection,myBook_listStyle);
        });
        
        /*点击 最近阅读 触发动作*/
        $('.recentlyRead').click(function(e){
            $(this).css('color','#33cc99');
            $(this).css('border-bottom-color','#33cc99');
            $('.myBookshelf').css('color','black');
            $('.myBookshelf').css('border-bottom-color','#dddddd');
            
            $('#myBookshelf').hide();
            $('#recentlyRead').show();
            
            $('.readNum').text('最近读过'+recently.length+'本');
            
            showStyle(recently,recently_listStyle);
        });
        
        /*我的书架 书籍展示*/
        $('.myListStyle').click(function(e){
            if(myBook_listStyle == 'listing'){
                myBook_listStyle = 'tile';
                $('.myListStyle img').attr('src','tile.PNG');
            }else{
                myBook_listStyle = 'listing';
                $('.myListStyle img').attr('src','list.PNG');
            }
            
            showStyle(collection,myBook_listStyle);
        });
        
        /*最近阅读 书籍展示*/
        $('.recentListStyle').click(function(e){
            if(recently_listStyle == 'listing'){
                recently_listStyle = 'tile';
                $('.recentListStyle img').attr('src','tile.PNG');
            }else{
                recently_listStyle = 'listing';
                $('.recentListStyle img').attr('src','list.PNG');
            }
            
            showStyle(recently,recently_listStyle);
        });
        
        /*书架书籍展示方式*/
        function showStyle(data,style){
            if(style=='listing'){
                listShow(data);
            }else{
                tileShow(data);
            }
        }
        
        /*列表展示*/
        function listShow(data){
            $('.books').empty();
            $.each(data,function(i,item){
                var listView = "<article><div class='bookCover' style='background-image:url("+data[i].bookCover+");'><input type='checkbox' value="+i+"></div><div class='detail'><header><h2>"+data[i].name+"</h2><p class='auther'>"+data[i].author+"</p></header><p class='chapterInfo'>最新：<span class='newist'>"+data[i].newist+"</span></p><p>读至：<span class='readTo'>"+data[i].readTo+"</span></p></div><hr/></article>";
                
                $('.books').append(listView);
            });
        }
                   
        /*平铺展示*/
        function tileShow(data){
            $('.books').empty();
            $.each(data,function(i,item){
                var tileView = "<article><dl class='book"+i+"'><dt style='background-image:url("+data[i].bookCover+");'><input type='checkbox' value="+i+"></dt><dd>"+data[i].name+"</dd></dl></article>";
               
               $('.books').append(tileView);
                
               var _widht = document.documentElement.clientWidth;
               $('dl').css('width',_widht/4); $('dt').css('height',_widht/4*1.3);
               
               if(i%3==1){
                   $('.book'+i).css({marginLeft:'9%',marginRight:'8%'});
               }
            });  
        }
        
        /*清空*/
        $('.clearAll').click(function(e){
            $.MsgBox.Confirm('确定要清空最近阅读记录吗？','清空','取消',function(){
                recently.length = 0;
                $('.books').empty();
                $('.readNum').text('最近读过0本');
            });
        });
        
        /*整理*/
        $('.sort').click(function(e){
            if($(this).text()=='整理'){
                $('.moveout').show();
                $('.shadeLayer').show();
                $('input:checkbox').show();
                $(this).text('取消');
            }else{
                $('.moveout').hide();
                $('.shadeLayer').hide();
                $('input').hide();
                $(this).text('整理');
            }
        });
        
        /*移出书架*/
        $('.moveout').click(function(e){
            var toMove = new Array();
            $.each($('input:checkbox:checked'),function(){
                toMove.push($('input:checkbox:checked').val());
            });
            
            if(toMove.length==0){
                $.MsgBox.Alert('请选择要移除的书籍');
            }else{
               $.MsgBox.Confirm('确定要将选中书籍移出书架吗？','确定','取消',function(){
                   collection.splice(toMove,toMove.length);
                   showStyle(collection,myBook_listStyle);
                   $('.collectionNum').text('共收藏'+collection.length+"本");
                   $('.sort').text('整理');
                   $('.moveout').hide();
               });
            }
        });   
    });
    
/*弹出框样式设置*/
(function () {
    $.MsgBox = {
        Alert: function (msg) {
            GenerateHtml("alert", msg);
            btnOk(); 
            btnNo();
        },
        Confirm: function (msg, ok, no, callback) {
            GenerateHtml("confirm", msg, ok, no);
            btnOk(callback);
            btnNo();
        }
    }
    
    //生成Html
    var GenerateHtml = function (type, msg, ok, no) {
        var _html = "";
        _html += '<div id="mb_box"></div><div id="mb_con"><a id="mb_ico">x</a><div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
        if (type == "alert") {
            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
        }
        if (type == "confirm") {
            _html += '<input id="mb_btn_no" type="button" value="'+no+'" />';
            _html += '<input id="mb_btn_ok" type="button" value="'+ok+'" />';
        }
        _html += '</div></div>';
        //必须先将_html添加到body，再设置Css样式
        $("body").append(_html); 
        //生成Css
         GenerateCss();
    }
 
    //生成Css
    var GenerateCss = function () {
        //弹出框背景图样式
         $("#mb_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
            filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'
        });
        
        //弹出框样式
        $("#mb_con").css({ zIndex: '999999', width: '400px', position: 'fixed',
            backgroundColor: 'white', borderRadius: '15px'
        });
        
        //提示信息样式
        $("#mb_msg").css({ padding: '30px', lineHeight: '40px', fontSize: '17px',textAlign:'center',letterSpacing:'1px',color:'#666666'
        });
        
        //右上角关闭按钮样式
        $("#mb_ico").css({ display: 'block', position: 'absolute', right: '10px', top: '9px',
            border: '1px solid #cccccc', width: '25px', height: '25px', textAlign: 'center',
            lineHeight: '20px', cursor: 'pointer', borderRadius: '50%', fontFamily: '',fontSize:'26px',color:'#cccccc'
        });
        
        
        $("#mb_btnbox").css({ marginBottom: '30px', textAlign: 'center' });
        
        //确认、取消按钮样式
        $("#mb_btn_ok,#mb_btn_no").css({ width: '40%', height: '40px',borderRadius:'5px', lineHeight: '40px', fontSize: '16px',letterSpacing:'1px' });
        $("#mb_btn_ok").css({ backgroundColor: '#4ab27b' , color: 'white', border: 'none', marginLeft: '30px'});
        $("#mb_btn_no").css({ backgroundColor: 'white',color:'#666666',border:'1px solid #cccccc' });
        
        //右上角关闭按钮hover样式
        $("#mb_ico").hover(function () {
            $(this).css({ borderColor: '#4ab27b', color: '#4ab27b' });
        }, function () {
            $(this).css({ borderColor: '#cccccc', color: '#cccccc' });
        });
        
        //设置弹出框位置
        var _widht = document.documentElement.clientWidth;  //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();
        //让提示框居中
        $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
    }
    
    //确定按钮事件
    var btnOk = function (callback) {
        $("#mb_btn_ok").click(function () {
            $("#mb_box,#mb_con").remove();
            if (typeof (callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function () {
        $("#mb_btn_no,#mb_ico").click(function () {
            $("#mb_box,#mb_con").remove();
        });
    }
})();