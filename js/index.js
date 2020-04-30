$(function(){
    $.ajax({
        url:'../../../../WisdomBank/xlqiang/timebf',
        type:'get',
        data:{},
        dataType:'json',
        success:function(ret){
            var width = screen.width;
            var height = screen.height;
            $('.totalContainer').css('width',''+(ret.returnData.length+1)*width+''+'px');
            $('.totalContainer').css('height',''+height+''+'px');
            for(var i=0;i<ret.returnData.length;i++){
                if(ret.returnData[i].fltyp=='1'){
                    // 该文件为视屏
                    // console.log(ret.returnData[i].flnm);
                    var html = '<li class="container"><video width="'+width+'px" height = "'+height+'px" class="player'+i+'" src="" zt="mp4"></video> </li>';
                    $('.totalContainer').append(html);
                    $('.player'+i+'').attr('src',ret.returnData[i].flnm).css('float','left');
                }
                else if(ret.returnData[i].fltyp=='2'){
                    // 改文件为图片
                    // console.log(ret.returnData[i].flnm);
                    var html = '<li class="container"><img width="'+width+'px" height = "'+height+'px" src="" alt="" class="img'+i+'" zt="png"></li>'
                    $('.totalContainer').append(html);
                    $('.img'+i+'').attr('src',ret.returnData[i].flnm).css('float','left');
                    // $('.totalContainer').css({'transform':'translateX('+(i+1)*(-1920)+'px)',"transition": "transform 2s ease 4s"});
                };
            };
            // 添加一个标签，把第一个放到最后一个
            if(ret.returnData[0].fltyp=='1'){
                var li = '<li class="container"><video width="'+width+'px" height = "'+height+'px" class="player'+i+'" src="'+ret.returnData[0].flnm+'"></video> </li>';
                $('.totalContainer').append(li);
            }
            else if(ret.returnData[0].fltyp=='2') {
                var li = '<li class="container"><img width="'+width+'px" height = "'+height+'px" class="player'+i+'" src="'+ret.returnData[0].flnm+'"></li>';
                $('.totalContainer').append(li); 
            }

            // 动效
            var index = 0;
            if($('li').eq(index).children().attr('zt') !== 'png'){
                $('.player'+index+'')[0].play();
            }
            var timer = setInterval(function(){
                if($('li').eq(index).children().attr('zt') == 'png'){
                    index++;
                    $('.totalContainer').css({'transform':'translateX('+(index)*(-width)+'px)',"transition": "transform 2s"});
                    if(index==ret.returnData.length) {
                        setTimeout(function(){
                            $('.totalContainer').css({'transform':'translateX(0px)',"transition": "transform 0s"});
                            index = 0;
                            if($('li').eq(index).children().attr('zt') !== 'png'){
                                $('.player'+index+'')[0].play();
                            }
                        },2000)
                        // $('.totalContainer').css({'transform':'translateX(0px)'});
                        // index = 0;
                    }
                    else {
                        setTimeout(() => {
                            if($('li').eq(index).children().attr('zt') !== 'png'){
                                $('.player'+index+'')[0].play();
                            }
                        }, 2000);
                    }
                }
                else{
                    var player = $('li').eq(index).children();
                    if(player[0].ended == true){
                        player[0].currentTime = 0;
                        player[0].paused = true;
                        index++;
                        $('.totalContainer').css({'transform':'translateX('+(index)*(-width)+'px)',"transition": "transform 2s"});
                        if(index==ret.returnData.length) {
                            setTimeout(function(){
                                $('.totalContainer').css({'transform':'translateX(0px)',"transition": "transform 0s"});
                                index = 0;
                                if($('li').eq(index).children().attr('zt') !== 'png'){
                                    $('.player'+index+'')[0].play();
                                }
                            },2000)
                        }
                        else {
                            setTimeout(() => {
                                if($('li').eq(index).children().attr('zt') !== 'png'){
                                    $('.player'+index+'')[0].play();
                        }
                            }, 2000);
                        }
                    }
                }
            },7000);
        }
    });
    
    function getTime(){
        var date=new Date();
        var minute=date.getMinutes();
        var second=date.getSeconds();
        // console.log(minute);
        // console.log(second);
        if(minute ==1 && second==0 ) {
            location.reload(true);
        }
    }
    setInterval(getTime,1000);
});

// 思路
// var index = 0;
// setInterval(function(){
//     if(zt =='png'){
//         index++;
//         $('.totalContainer').css({'transform':'translateX('+(index)*(-1920)+'px)',"transition": "transform 2s"});
//         setTimeout(() => {
//          //    播放视屏
//         }, 2000);
//     }
//     else{
//      //    是否播放完
//         if(zt= '播完'){
//             index++;
//             setTimeout(() => {
//          //    播放视屏
//         }, 2000);
//         }
//     }
// },4000)  

// 移动到最后一个视屏或者图片
// if(index>=ret.returnData.length-1) {
//     clearInterval(timer);
//     if($('li').eq(index).children().attr('zt') == 'png'){
//         setTimeout(() => {
//             location.reload(false);
//         }, 2000);
//     }
//     if($('li').eq(index).children().attr('zt') !== 'png'){
//         var player = $('li').eq(index).children();
//         if(player[0].ended == true){
//             console.log(ok);
//             location.reload(false);
//         }
//     }
// }


// 不同分辨率的思路
/* 获取当前页面的宽高,设置video和img的大小，还有总的ul标签的宽度及高度 
  页面可见宽度：width = screen.width ;  1920px
  页面高度：  height = screen.height ; 1080px
*/