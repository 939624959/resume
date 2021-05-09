$(function(){
  const titles = ['首页', '技能', '经历', '作品', '联系']
  $('#fullPage').fullpage({
    sectionsColor: ['#cc8e35', '#4d5e8f', '#945c4c', '#4b85a0', '#504c94'],
    navigationTooltips: ['首页', '技能', '经历', '作品', '联系'],
    fixedElements: '#header, .footer',
    navigationColor: 'red',
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
    lockAnchors: false,
    menu: '#menu',
    afterRender:()=>{
      $('.fp-root').show()

      // console.log(url);
    },
    afterLoad: function(anchorLink, index){
      //标题格式
      $('.title .title_content').html(titles[index-1]).removeClass('rotate')
      //横向导航
      $('#menu').removeClass('show-nav')
      if (index !== 5) {
        $('#arrow').css('display', 'block')
      } else {
        const $foot = $('.contact .foot p')
        let date = new Date()
        $foot.html(`Copyright&copy; 2021-${date.getFullYear()}`)
        $('#arrow').css('display', 'none')
      }
    },
    afterResize: function(){
      var pluginContainer = $(this);
      // alert("The sections have finished resizing");
    }
  });


  //点击标题显示导航
  $('.title').on('click', function () {
    $('.title .title_content').toggleClass('rotate')
    $('#menu').toggleClass('show-nav')
  })
  //经历页轮播效果
  expSlider()
  function expSlider() {
    const $lis = $('.experience .content .shout-cut ul li')
    const $sliders = $('.experience .content .slider .slider-container')
    $lis.on('click', function () {
      let index = $(this).data('index')
      $lis.removeClass('-selected')
      $(this).addClass('-selected')
      $sliders.css('visibility', 'hidden')
      $($sliders[index]).css('visibility', 'visible')
    })
  }
  //作品页效果
  workSlider()
  function workSlider() {
    const $lis = $('.work .work-list .work-list-item')
    let nowIndex = 0
    const $left = $('.work .content .switch .left')
    $left.on('click', function () {
      if (nowIndex === 0) {
        return
      }
      $right.removeAttr('style')
      nowIndex --
      workList(nowIndex)
      if (nowIndex === 0) {
        $left.css('filter', 'brightness(70%)')
      }
    })
    const $right = $('.work .content .switch .right')
    $right.on('click', function () {
      if (nowIndex === $lis.length - 1) {
        return
      }
      nowIndex ++
      $left.removeAttr('style')
      workList(nowIndex)
      if (nowIndex === $lis.length - 1) {
        $right.css('filter', 'brightness(70%)')
      }
    })
  }
  //初始化作品页
  workList(0)
  function workList(nowIndex) {
    const $lis = $('.work .work-list .work-list-item')
    const w = document.documentElement.clientWidth
    $lis.each(index => {
      let dis = index - nowIndex
      if (dis < 0) {
        if (w < 600){
          $($lis[index]).css('transform', `translateX(-310px)`)
        } else {
          $($lis[index]).css('transform', `translateX(-330px)`)
        }
      } else {
        $($lis[index]).css('transform', `translateX(${dis*0.8}rem) translateZ(-${dis*1.5}rem) scale(${1-dis*0.05}, ${1-dis*0.05})`)
      }
    })
  }
  //联系页点击出现二维码
  wxCode()
  function wxCode() {
    console.log(123)
    const $tip = $('.contact .content .triangle_wrap')
    const $text = $('.contact .content .text')
    const $wxCode = $('.contact .content .wx')
    const $icons = $('.contact .content .triangle_wrap .iconfont')
    console.log($icons)
    let showWx = false
    $tip.on('click', function () {
      if (!showWx) {
        $wxCode.css('transform', 'translateX(-50%)')
        $text.css('transform', 'rotateY(180deg)')
        $($icons[0]).css('opacity', '0')
        $($icons[1]).css('opacity', '1')
      } else {
        $wxCode.css('transform', 'translateX(-50%) rotateY(180deg)')
        $text.removeAttr('style')

        $($icons[0]).css('opacity', '1')
        $($icons[1]).css('opacity', '0')
      }
      showWx = !showWx
    })
  }

  redirect()
  function redirect() {
    let url = location.href
    let url2 = url.replace(/[#page]{5}[1-9]{1}$/, '#page1')
    console.log(url2)
    if (url !== url2) {
      window.location.replace(url2)
    }
    //首页动画效果
    // setTimeout(() => {
    //   $('.overview').removeClass('float');
    // }, 0);
    $('.overview').removeClass('float');
  }

});
