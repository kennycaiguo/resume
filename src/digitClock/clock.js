//彩色小球的出现的过程：时间改变，某位置上的某数字发生改变，彩色小球在刚刚改变的数字上出现并且自带初速度和方向等属性
//每个彩色小球都是不一样的一个对象，每一次改变都会同时产生一个位置上的一堆小球
//要在正确的位置上出现改变数字的一堆小球，肯定要先拿到改变的数字的值以及它的位置（不一定只有一个数字变）
//那么就在时间发生改变的时候顺便创建这些彩色小球对象，
//它们不仅仅有位置属性，还应该有速度属性（因为它们后面还要动起来），用balls数组装起来
//和时钟一起同时渲染（画）出来，render函数
//小球们都画出来了，还要让它们动起来，upDateBalls函数



var windowWidth = 960;
var windowHeight = 550;
//为后续做自适应做准备
var marginLeft = 20;
var marginTop = 50;
var radius = 7;
var canvas = document.getElementById("canvas");
var balls=[];
var time = [];
if (canvas.getContext) {
  var context = canvas.getContext("2d");

  canvas.width = windowWidth;
  canvas.height = windowHeight;

}

(function() {
  var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
  //原来的时间
  time.push(temp[1], temp[2], 10, temp[3], temp[4], 10, temp[5], temp[6])//注意里面时间的数字都是字符串
})();


//每过半秒执行一次的函数，既要拿到最新时间，也要把把前面canvas画布画的先去掉再画新的
//小球掉落效果：只要有数字改变，就要掉落一批小球，也应该写在里面

function upDateTime() {
  var changedTimeNum = [];
  var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
  var newTime = [];
  newTime.push(temp[1], temp[2], 10, temp[3], temp[4], 10, temp[5], temp[6]);
  //判断哪个数字变了
  for (var i = 0; i < newTime.length; i++) {
    if (time[i] !== newTime[i]) {
      changedTimeNum.push(i + '_' + (Number(newTime[i])))//用来装改变的那个数字的index和num
    }
  }
  //
  for (var i = 0; i < changedTimeNum.length; i++) {
    describeBalls.apply(this, changedTimeNum[i].split('_'));//注意传进去的参数其实是字符串，只是传给num的会自动隐式转换成数字
    console.log(changedTimeNum[i]);
  }
  time = newTime.concat();//相当于把newTime直接给了time
}



//要render函数能访问上面那些私有变量，用闭包，不用的话，render函数放全局，那上面的变量就拿不到，除非
//全部不要var，变全局变量，但是这样全局里面一直有这些变量，防止冲突之类。。。用闭包吧。
//全部数字和分号显示的方法
function render(ct) {
  //重置画布宽度，达到清空画布的效果
  canvas.height = windowHeight;
  // var hour = now.getHours();
  // var minute = now.getMinutes();
  // var second = now.getSeconds();
  //一整个数字的宽(radius+1)*2*7=(radius+1)*14
  renderDigit(marginLeft, marginTop, Number(time[0]), ct);
  renderDigit(marginLeft + (radius + 1) * 15, marginTop, Number(time[1]), ct);
  renderDigit(marginLeft + (radius + 1) * 30, marginTop, 10, ct);//注意这个分号只占四个“格子”
  renderDigit(marginLeft + (radius + 1) * 39, marginTop, Number(time[3]), ct);
  renderDigit(marginLeft + (radius + 1) * 54, marginTop, Number(time[4]), ct);
  renderDigit(marginLeft + (radius + 1) * 69, marginTop, 10, ct);
  renderDigit(marginLeft + (radius + 1) * 78, marginTop, Number(time[6]), ct);
  renderDigit(marginLeft + (radius + 1) * 97, marginTop, Number(time[7]), ct);
//渲染彩色小球
  for(var i = 0; i < balls.length; i++){
    ct.beginPath();
    ct.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI);
    ct.fillStyle = balls[i].color;
    ct.closePath();
    ct.fill();
  }
}





//每个数字或符号的方法
function renderDigit(x, y, num, ct) {
  //x：第一个格子的x轴方向的位置
  //y: 第一个格子的y轴方向的位置
  //num：是0-9或分号的哪一个
  ct.fillStyle = "blue";
  //嵌套循环 i是Y轴的 j是X轴的
  for (i = 0; i < digit[num].length; i++) {
    //外层把一个数字的每行循环
    for (j = 0; j < digit[num][i].length; j++) {
      //里面把一行的每个“格子”（0或1）循环一遍
      if (digit[num][i][j] == 1) {//是1的话就显示一个小圆点,注意一定是==,=就会全都是原点，不为空都=1
        ct.beginPath();
        //(x+radius+1，y+radius+1)是第一个“格子”的center
        ct.arc(x + radius + 1 + j * 2 * (1 + radius), y + radius + 1 + i * 2 * (1 + radius), radius, 0, 2 * Math.PI);
        ct.closePath();
        ct.fill();

      }

    }
  }
}



//彩色小球对象都准备好了，要让它们动起来
function upDateBalls() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    //到达底部弹起来，y的速度相反
    if (balls[i].y >= windowHeight - radius) {
      balls[i].y = windowHeight - radius;
      balls[i].vy = -balls[i].vy * 0.75//向上的时候速度肯定是有所减弱
    }
  }
}


//用来装全部已经画出来的彩色小球
//画彩色小球的函数
function describeBalls(index, num) {//一次“画”一个数字那么多的小球

  var colors = ['pink', 'yellow', 'green', 'red', 'orange'];

  for (i = 0; i < digit[num].length; i++) {
    //外层把一个数字的每行循环
    for (j = 0; j < digit[num][i].length; j++) {
      //里面把一行的每个“格子”（0或1）循环一遍
      if (digit[num][i][j] == 1) {
        //index不同，x不一样

        switch (index) {
          case "0":
            var x1 = marginLeft + radius + 1 + j * 2 * (radius + 1);
            break;
          case "1":
            var x1 = marginLeft + (radius + 1) * 15 + j * 2 * (radius + 1);
            break;
          case "3":
            var x1 = marginLeft + (radius + 1) * 39 + j * 2 * (radius + 1);
            break;
          case "4":
            var x1 = marginLeft + (radius + 1) * 54 + j * 2 * (radius + 1);
            break;
          case "6":
            var x1 = marginLeft + (radius + 1) * 78 + j * 2 * (radius + 1);
            break;
          default:
            var x1 = marginLeft + (radius + 1) * 97 + j * 2 * (radius + 1);
        }
        var oneBall = {
          x: x1,
          y: marginTop + radius + 1 + i * 2 * (radius + 1),
          g: 6 + Math.random(),//随机向下的加速度，看起来乱一点比较自然
          vx: Math.floor(Math.random() * 7 -3),//随机x轴初速度
          vy: -Math.random()*20,//让小球稍微向上飞一下再掉落
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        balls.push(oneBall)
      }

    }
  }

}




clearInterval(oTimer);
var oTimer = setInterval(function () {
  upDateTime();
  upDateBalls();
  render(context);

}, 50);
