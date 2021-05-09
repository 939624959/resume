import $ from 'jquery';
import fullpage from 'fullpage.js';
import '../css/iconfont.css';
import '../css/resume.less';
import '../css/media.less';
// 全屏
let showWx = false;
// 重置第五页
function resizContact() {
  const w = document.documentElement.clientWidth;
  const $text = $('.contact .content .text');
  const $wxCode = $('.contact .content .wx');
  if (w > 900) {
    // 点击标题显示导航
    $wxCode.css({
      visibility: 'visible',
      transform: '',
    });
    $text.removeAttr('style');
  } else if (showWx) {
    $wxCode.css({
      visibility: 'visible', transform: 'translateX(-50%)',
    });
    $text.css('transform', 'rotateY(180deg)');
  } else {
    $wxCode.css({
      transform: 'translateX(-50%) rotateY(180deg)',
      visibility: 'hidden',
    });
    $text.removeAttr('style');
  }
}
// eslint-disable-next-line
function initFullpage() {
  const titles = ['首页', '技能', '经历', '作品', '联系'];
  // eslint-disable-next-line
  new fullpage('#fullPage', {
    sectionsColor: ['#cc8e35', '#4d5e8f', '#945c4c', '#4b85a0', '#504c94'],
    navigationTooltips: ['首页', '技能', '经历', '作品', '联系'],
    fixedElements: '#header, .footer',
    navigationColor: 'red',
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
    lockAnchors: false,
    menu: '#menu',
    afterRender: () => {
      const w = document.documentElement.clientWidth;
      // console.log(w);
      if (w < 600) {
        // 点击标题显示导航
        $('.title').on('click', () => {
          $('.title .title_content').toggleClass('rotate');
          $('#menu').toggleClass('show-nav');
        });
      }
    },
    afterLoad(anchorLink, index) {
      // 标题内容
      const indexI = index.index;
      $('.title .title_content').html(titles[indexI]).removeClass('rotate');
      // 横向导航
      $('#menu').removeClass('show-nav');
      if (indexI !== 4) {
        $('#arrow').css('display', 'block');
      } else {
        const $foot = $('.contact .foot p');
        const date = new Date();
        $foot.html(`Copyright&copy; 2021-${date.getFullYear()}`);
        $('#arrow').css('display', 'none');
        resizContact();
      }
    },
    afterResize() {
      resizContact();
    },
  });
}
initFullpage();
// 经历页轮播效果
function expSlider() {
  const $lis = $('.experience .content .shout-cut ul li');
  const $sliders = $('.experience .content .slider .slider-container');
  // eslint-disable-next-line
  $lis.on('click', function () {
    const index = $(this).data('index');
    $lis.removeClass('-selected');
    $(this).addClass('-selected');
    $sliders.css('visibility', 'hidden');
    $($sliders[index]).css('visibility', 'visible');
  });
}
// 初始化作品页
function workList(nowIndex) {
  const $lis = $('.work .work-list .work-list-item');
  const w = document.documentElement.clientWidth;
  $lis.each((index) => {
    const dis = index - nowIndex;
    if (dis < 0) {
      if (w < 600) {
        $($lis[index]).css('transform', 'translateX(-8.1rem)');
      } else {
        $($lis[index]).css('transform', 'translateX(-8.1rem)');
      }
    } else {
      $($lis[index]).css('transform', `translateX(${dis * 0.8}rem) translateZ(-${dis * 1.5}rem) scale(${1 - dis * 0.05}, ${1 - dis * 0.05})`);
    }
  });
}
// 作品页效果
function workSlider() {
  const $lis = $('.work .work-list .work-list-item');
  let nowIndex = 0;
  const $left = $('.work .content .switch .left');
  const $right = $('.work .content .switch .right');
  $left.on('click', () => {
    if (nowIndex === 0) {
      return;
    }
    $right.removeAttr('style');
    // eslint-disable-next-line
    nowIndex--;
    workList(nowIndex);
    if (nowIndex === 0) {
      $left.css('filter', 'brightness(70%)');
    }
  });
  $right.on('click', () => {
    if (nowIndex === $lis.length - 1) {
      return;
    }
    // eslint-disable-next-line
    nowIndex++;
    $left.removeAttr('style');
    workList(nowIndex);
    if (nowIndex === $lis.length - 1) {
      $right.css('filter', 'brightness(70%)');
    }
  });
}
// 联系页点击出现二维码
function wxCode() {
  const $tip = $('.contact .content .triangle_wrap');
  const $text = $('.contact .content .text');
  const $wxCode = $('.contact .content .wx');
  const $icons = $('.contact .content .triangle_wrap .iconfont');
  $tip.on('click', () => {
    if (!showWx) {
      $wxCode.css({
        visibility: 'visible', transform: 'translateX(-50%)',

      });
      $text.css('transform', 'rotateY(180deg)');
      $($icons[0]).css('opacity', '0');
      $($icons[1]).css('opacity', '1');
    } else {
      $wxCode.css({
        transform: 'translateX(-50%) rotateY(180deg)',
        visibility: 'hidden',
      });
      $text.removeAttr('style');

      $($icons[0]).css('opacity', '1');
      $($icons[1]).css('opacity', '0');
    }
    showWx = !showWx;
  });
}
// 重定向到首页
function redirect() {
  // eslint-disable-next-line
  const url = window.location.href;
  const url2 = url.replace(/[#page]{5}[1-9]{1}$/, '#page1');
  if (url !== url2) {
    window.location.replace(url2);
  }
  // 首页动画效果
  // setTimeout(() => {
  //   $('.overview').removeClass('float');
  // }, 0);
  $('#app').show();
  $('.overview').removeClass('float');
}

window.onload = () => {
  expSlider();
  workSlider();
  workList(0);
  wxCode();
  redirect();
};
