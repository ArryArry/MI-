//搜索框
$(".search-text").focus(function () {
   $(this).addClass("search-focus");
   $(".search-btn").addClass("search-focus");
   $(".keywords").show();
}).blur(function () {
    $(this).removeClass("search-focus");
    $(".search-btn").addClass("search-focus");
    $(".keywords").hide();
});
//业务逻辑：当用户点击搜索框时，表单获得焦点并给对应元素添加样式，
// 给关键词列表添加显示效果。同理当用户点击其他则该表单失去焦点。

$('.nav-item').on('mouseenter','li',function () {
    var index=$(this).index();
    var that=$('.header-nav-menu');
    if(index>=7){
        that.stop().slideUp();
    }else {
        that.stop().slideDown().find('ul').siblings().fadeOut().eq(index).fadeIn().hover(function () {
            that.show();
        }, function () {
            that.stop().slideUp();
        });
    }
});
//业务逻辑：给nav-item的每个li绑定鼠标移入事件，获取弹出的导航菜单栏和当前位置的索引，
// 如果当前点击的位置是nav-item的第8个就收回弹窗，否则当前位置弹出弹窗，
// 除自己外的其他弹窗均淡出（隐藏），当光标移入当前位置时显示，光标移除时收回弹窗。

$(function(){
    var length=$('.slider-main>li').length,
        startIndex=null,
        canAuto=false,
        t=3000,
        timer=null,
        currentIndex=0;
    $('.slider-main>li:not(:first)').hide();
    $('.slider-main,.btn,.index').hover(
        function(){
            stop();
        },
        function(){
            start();
        });
    //当光标移到按钮或者焦点上时停止动画，移开时开启动画。回调函数的思路，在函数内部给本身添加新的方法。
    $(".index>li").mouseenter(function(){
        startIndex=currentIndex;
        currentIndex=$(this).index();
        play(startIndex,currentIndex);
    });
    $('.pre').click(function(){
        startIndex=currentIndex;
        currentIndex=--currentIndex % length;//🤔️待处理
        play(startIndex,currentIndex);
    });
    $('.next').click(function(){
        startIndex=currentIndex;
        currentIndex=++currentIndex % length;
        play(startIndex,currentIndex);
    });
    //分别给按钮和焦点绑定鼠标滑动事件和点击事件，事件执行函数设计原理：调用执行函数play（startIndex,currentIndex），
    // 当前位置默认为0，当移动到其他位置时就记录在currentIndex中，将其赋值给初始位置。
    //分别获取当前位置的索引。按钮中通过当前事件触发者调用索引的方法来获取。
    // 焦点中由于当前位置在不断变化所以通过当前位置索引对轮播数量进行取余来获得，通过自加自减的方式来实现向前或者向后的取值。
    function play(){
        if (startIndex === currentIndex) {
            return;
        }
        $('.slider-main>li').eq(startIndex).stop().fadeOut(500).
        parent().children().eq(currentIndex).stop().fadeIn(1000);
        $('.index>li').eq(currentIndex).addClass
        ('active').siblings().removeClass('active');
    }
    //play（）设计思路，如果当前位置刚好等于开始位置，就继续执行当前操作。否则利用排他思想除自己外排除其他元素的作用。
    //
    function start(){
        if(!canAuto){
            canAuto=true;
            timer=setInterval(function(){$('.next').triggerHandler('click');},t);
        }
    }
    function stop(){
        canAuto=false;
        clearInterval(timer);
    }
    start();
});