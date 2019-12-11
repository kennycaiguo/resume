
//留言
function openTalk() {
  $.ajax({
    url: 'http://localhost:8080/talk',
    type: "GET",
    success: function (res) {
      console.log(res,'ok')
    },
    error: function () {
      console.log('请求评论页面失败')
    }
  });
}


//demo
//demo移动到上面就放大且把其他没选中的变透明，出来就恢复
$("#demo ul li").mouseenter(function () {
  $(this)
    .css({
      "opacity": "1", 'transform': 'scale(1.2, 1.2)', '-webkit-transform': 'scale(1.2, 1.2)',
      '-moz-transform': 'scale(1.2, 1.2)', '-o-transform': 'scale(1.2, 1.2)'
    })
    .siblings().css({
    "opacity": "0.4", 'transform': 'scale(1, 1)', '-webkit-transform': 'scale(1, 1)',
    '-moz-transform': 'scale(1, 1)', '-o-transform': 'scale(1, 1)'
  });
});
$("#demo ul").mouseleave(function () {
  $(this).find('li')
    .css({
      "opacity": "1", 'transform': 'scale(1, 1)', '-webkit-transform': 'scale(1, 1)',
      '-moz-transform': 'scale(1, 1)', '-o-transform': 'scale(1, 1)'
    });
});


//控制github地址从右往左移动出来
var width = document.body.clientWidth;
let demo = document.getElementById('demo');
let gh = document.getElementById('gh');
gh.style.left = '90vw';
setInterval(function () {
  let demoS = demo.getBoundingClientRect();
  // console.log(demoS.top);
  if (0 < demoS.top < 100) {
    gh.style.left = '90vw';
    gh.style.left = parseInt(gh.style.left) + demoS.top * 0.6 + 'vw'
  } else if (demoS.top <= 0) {
    gh.style.left = '90vw';
    gh.style.left = parseInt(gh.style.left) - demoS.top * 0.6 + 'vw'
  }
}, 100)


// 技能skills

const $sk = $("#skillsBox>div");
$sk.mouseenter(function () {
  $(this).children("ul").show();
});

$sk.mouseleave(function () {
  $(this).children("ul").hide();
});

//技能改成canvas
var js = document.getElementById('j');
var html = document.getElementById('h');
var css = document.getElementById('c');
var ctj = js.getContext('2d');
var cth = html.getContext('2d');
var ctc = css.getContext('2d');

drawBook(ctj, 'orange');
drawBook(cth, 'blue');
drawBook(ctc, 'green');

//画书本函数
function drawBook(ct, color) {
  ct.beginPath();
  ct.moveTo(200, 0);
  ct.lineTo(200, 140);
  ct.lineTo(100, 140);
  ct.arcTo(90, 140, 90, 130, 10);
  ct.lineTo(90, 10);
  ct.arcTo(90, 0, 100, 0, 10);
  ct.lineTo(190, 0);
  ct.fillStyle = color;
  ct.fill();
  ct.strokeStyle = color;
  ct.stroke();
  ct.beginPath();
  ct.rect(198, 122, -98, 16);
  ct.fillStyle = 'white';
  ct.fill();
  ct.strokeStyle = 'white';
  ct.beginPath();
  ct.arc(100, 130, 8, 0, Math.PI * 2);
  ct.fillStyle = 'white';
  ct.fill();
}
