// Navigation Js
$('.toggle-btn').click(function(){
	$('.navigation-boxWrap').addClass('show');
	$('.navigation-overly').show();
});
$('.close-btn').click(function(){
	$('.navigation-boxWrap').removeClass('show');
	$('.navigation-overly').hide();
});

// ***********************************************************
// Sections GSAP Parallax Effect JS
gsap.registerPlugin(ScrollTrigger);
gsap.to(".scroller", {
  ease: Linear.easeNone,
  stagger: 2,
  scrollTrigger: {
    trigger: ".aboutSec2-bg",
    start: "top bottom",
    end: "bottom top",
    y: -100,
    scrub: 1,
    repeat:-1,
    pin: false
}
});

// ************************************************************
// ShowCase Section Js

gsap.registerPlugin(ScrollTrigger);

let bodyScrollBar = Scrollbar.init(document.querySelector('.scroller'), {
  damping: 0.1,
  delegateTo: document,
  alwaysShowTracks: true,
});

ScrollTrigger.scrollerProxy(".scroller", {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
  }
  return bodyScrollBar.scrollTop;
},
});

bodyScrollBar.addListener(ScrollTrigger.update);

gsap.set(".image", { zIndex: (i, target, targets) => targets.length - i });

var images = gsap.utils.toArray('.image:not(.purple)');

images.forEach((image, i) => {

   var nextImage = image.nextElementSibling;

   var imageTimeline = gsap.timeline({

     scrollTrigger: {

       trigger: "section.showcase",
       scroller: ".scroller",

       start: () => "top -" + (window.innerHeight * i),       
       end: () => "+=" + window.innerHeight,

       // toggleActions: "play none reverse none",
       
       scrub: true,
       invalidateOnRefresh: true, 
       
   }

})

   imageTimeline
   .fromTo(image, { height: () => { return "100%" }  }, { height: () => { return "0%" }, ease: "none" }, 0)
   ;
});

ScrollTrigger.create({

  trigger: "section.showcase",
  scroller: ".scroller",

  start: () => "top top",
  end: () => "+=" + ((images.length) * window.innerHeight),

  pin: '.image-wrap', 
  anticipatePin: 1,

  invalidateOnRefresh: true,
  
});

var sideImages = gsap.utils.toArray('.side-image:not(.blue)');

sideImages.forEach((image, i) => {

   var prevImage = image.previousElementSibling;

   var imageTimeline = gsap.timeline({

     scrollTrigger: {

       trigger: "section.showcase",
       scroller: ".scroller",

       start: () => "top -" + (window.innerHeight * i),       
       end: () => "+=" + window.innerHeight,

       // toggleActions: "play none reverse none",
       
       scrub: true,
       invalidateOnRefresh: true, 
       
   }

})

   imageTimeline      
   .fromTo(image, { height: () => { return "0%" }, scale: () => { return 1.00 } }, { height: () => { return "100%" }, scale: () => { return 1.125 }, ease: "none" }, 0)
   .fromTo(prevImage, { scale: () => { return 1.125 }  }, { scale: () => { return 1.25 }, ease: "none" }, 0)
   ; 

});

ScrollTrigger.create({

  trigger: "section.showcase",
  scroller: ".scroller",

  start: () => "top top",
  end: () => "+=" + ((images.length) * window.innerHeight),

  pin: '.side-image-wrap', 
  anticipatePin: 1,

  invalidateOnRefresh: true,
  
});

// ************************************************
// Showcase Image Ripple Animation Js
$(document).ready(function() {
  $('.img-ripple').ripples('show');
});

// ************************************************
// Cta Button Js
var hoverMouse = function($el) {
  $el.each(function() {
    var $self = $(this);
    var hover = false;
    var offsetHoverMax = $self.attr("offset-hover-max") || 0.5;
    var offsetHoverMin = $self.attr("offset-hover-min") || 0.2;

    var attachEventsListener = function() {
      $(window).on("mousemove", function(e) {
        //
        var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

        // cursor
        var cursor = {
          x: e.clientX,
          y: e.clientY + $(window).scrollTop()
      };

        // size
        var width = $self.outerWidth();
        var height = $self.outerHeight();

        // position
        var offset = $self.offset();
        var elPos = {
          x: offset.left + width / 2,
          y: offset.top + height / 2
      };

        // comparaison
        var x = cursor.x - elPos.x;
        var y = cursor.y - elPos.y;

        // dist
        var dist = Math.sqrt(x * x + y * y);

        // mutex hover
        var mutHover = false;

        // anim
        if (dist < width * hoverArea) {
          mutHover = true;
          if (!hover) {
            hover = true;
        }
        onHover(x, y);
    }

        // reset
        if (!mutHover && hover) {
          onLeave();
          hover = false;
      }
  });
  };

  var onHover = function(x, y) {
      TweenMax.to($self, 0.4, {
        x: x * 0.5,
        y: y * 0.5,
        //scale: .9,
        rotation: x * 0.05,
        ease: Power2.easeOut
    });
  };
  var onLeave = function() {
      TweenMax.to($self, 0.5, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        ease: Elastic.easeOut.config(1.2, 0.4)
    });
  };

  attachEventsListener();
});
};

hoverMouse($('.cta-btn'));
hoverMouse($('.checkBox'));
hoverMouse($('.radioBox'));
hoverMouse($('.navigation-col-right>ul>li>a'));
hoverMouse($('.natigation-col-left>ul>li>a'));
hoverMouse($('.footer-right ul li a'));

// ********************************
// Inspiro Slider Js
$('.inspiro-slider').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  dots:false,
  responsive:{
    0:{
      items:1
  },
  600:{
      items:3
  },
  1000:{
      items:2
  },
  1024: {
    items: 3
  }
}
});

// ****************************
// Video Modal Close Button Js
$('.closeVideo').click(function(){
  $(this).parent().hide();
  $('.modal-backdrop').hide();
});
// CUSTOM CURSOR
var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $cur_span: document.querySelector('.cursor-dot span'),
    $outline: document.querySelector('.cursor-dot-outline'),
    $menuBar1: document.querySelector('.toggleBar'),
    $menuBar2: document.querySelector('.toggleBar1'),
    
    init: function() {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;
        
        this.setupEventListeners();
        this.animateDotOutline();
    },    
    setupEventListeners: function() {
        var self = this;

        // Banner Text Cursor Videos    
        document.querySelectorAll('.sec1-banner-anchors #anchor1').forEach(function(ho) {
            ho.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.bannerVideo1();
            });
            ho.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.bannerVideo1();
            });
        });
        document.querySelectorAll('.sec1-banner-anchors #anchor2').forEach(function(ho) {
            ho.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.bannerVideo2();
            });
            ho.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.bannerVideo2();
            });
        });
        document.querySelectorAll('.sec1-banner-anchors #anchor3').forEach(function(ho) {
            ho.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.bannerVideo3();
            });
            ho.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.bannerVideo3();
            });
        });
        // Featured Project Images
        document.querySelectorAll('.img-ripple').forEach(function(hi) {
            hi.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.featuredProjects();
            });
            hi.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.featuredProjects();
            });
        });
        // Inspiro Slider Cursor
        document.querySelectorAll('.inspiro-slider').forEach(function(hi) {
            hi.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.inspiroSlider();
            });
            hi.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.inspiroSlider();
            });
        });
        // Toggle Button Cursor
        document.querySelectorAll('.toggle-btn').forEach(function(hi) {
            hi.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.menuBtn();
            });
            hi.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.menuBtn();
            });
        });
        // Video Close Button Cursor
        document.querySelectorAll('.closeVideo').forEach(function(hi) {
            hi.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.videoCloseCursor();
            });
            hi.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.videoCloseCursor();
            });
        });
        // Footer Cursor
        document.querySelectorAll('.footerCursor').forEach(function(hi) {
            hi.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.footerCursor();
            });
            hi.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.footerCursor();
            });
        });
        // Testimonials Slider Cursor
        document.querySelectorAll('.testimonial-slider').forEach(function(hi) {
            hi.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.testimonialSlider();
            });
            hi.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.testimonialSlider();
            });
        });
        // Click events
        document.addEventListener('mousedown', function() {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function() {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });
        document.addEventListener('mousemove', function(e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';
        });        
        // Hide/show cursor
        document.addEventListener('mouseenter', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        });       
        document.addEventListener('mouseleave', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        });
    },   
    animateDotOutline: function() {
        var self = this;
        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';
        
        requestAnimationFrame(this.animateDotOutline.bind(self));
    },    
    toggleCursorSize: function() {
        var self = this;
        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.style.width = '80px';
            self.$dot.style.height = '80px';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.style.width = '6px';
            self.$dot.style.height = '6px';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },   
    toggleCursorVisibility: function() {
        var self = this;
        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    },
    bannerVideo1: function() {
        var self = this;
        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.width = '500px';
            self.$outline.style.height = '500px';
            self.$dot.innerHTML = `<video autoplay loop muted="muted"><source src="assets/videos/video1.mp4" type="video/mp4"></video>`;
            self.$dot.style.zIndex = "-2";
            self.$cur_span.style.zIndex = "-2";
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
            //self.$outline.style.zIndex = "-2";
            self.$dot.innerHTML = ``;
            self.$outline.style.width = '32px';
            self.$outline.style.height = '32px';
            self.$dot.style.zIndex = "";
            self.$cur_span.style.zIndex = "";
        }
    },
    bannerVideo2: function() {
        var self = this;
        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.width = '500px';
            self.$outline.style.height = '500px';
            self.$dot.innerHTML = `<video autoplay loop muted="muted"><source src="assets/videos/video2.mp4" type="video/mp4"></video>`;
            self.$dot.style.zIndex = "-2";
            self.$cur_span.style.zIndex = "-2";
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.innerHTML = ``;
            self.$outline.style.width = '32px';
            self.$outline.style.height = '32px';
            self.$dot.style.zIndex = "";
            self.$cur_span.style.zIndex = "";
        }
    },
    bannerVideo3: function() {
        var self = this;
        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.width = '500px';
            self.$outline.style.height = '500px';
            self.$dot.innerHTML = `<video autoplay loop muted="muted"><source src="assets/videos/video3.mp4" type="video/mp4"></video>`;
            self.$dot.style.zIndex = "-2";
            self.$cur_span.style.zIndex = "-2";
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.innerHTML = ``;
            self.$outline.style.width = '32px';
            self.$outline.style.height = '32px';
            self.$dot.style.zIndex = "";
            self.$cur_span.style.zIndex = "";
        }
    },
    featuredProjects: function() {
        var self = this;
        if (self.cursorEnlarged) {
            self.$dot.style.width = '100px';
            self.$dot.style.height = '100px';
            self.$outline.style.width = '100px';
            self.$outline.style.height = '100px';
            self.$cur_span.textContent = "View Case";
            self.$cur_span.style.transform = "scale(1)";
            self.$cur_span.style.opacity = "1";
            self.$dot.style.zIndex = "9999";
            self.$cur_span.style.zIndex = "1";
            self.$cur_span.style.color = "#fff";
        } else {
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.width = '32px';
            self.$outline.style.height = '32px';
            self.$cur_span.textContent = "";
            self.$cur_span.style.transform = "scale(0)";
            self.$cur_span.style.opacity = "0";
            self.$dot.style.zIndex = "";
            self.$cur_span.style.zIndex = "";
        }
    },
    inspiroSlider: function() {
        var self = this;
        if (self.cursorEnlarged) {
            self.$dot.style.width = '100px';
            self.$dot.style.height = '100px';
            self.$outline.style.width = '100px';
            self.$outline.style.height = '100px';
            self.$cur_span.textContent = "Drag";
            self.$cur_span.style.transform = "scale(1)";
            self.$cur_span.style.opacity = "1";
            self.$dot.style.zIndex = "2";
            self.$cur_span.style.zIndex = "3";
        } else {
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.width = '32px';
            self.$outline.style.height = '32px';
            self.$cur_span.textContent = "";
            self.$cur_span.style.transform = "scale(0)";
            self.$cur_span.style.opacity = "0";
            self.$dot.style.zIndex = "";
            self.$cur_span.style.zIndex = "";
        }
    },
    testimonialSlider: function() {
        var self = this;
        if (self.cursorEnlarged) {
            self.$dot.style.width = '100px';
            self.$dot.style.height = '100px';
            self.$outline.style.width = '100px';
            self.$outline.style.height = '100px';
            self.$cur_span.textContent = "Drag";
            self.$cur_span.style.transform = "scale(1)";
            self.$cur_span.style.opacity = "1";
            self.$dot.style.zIndex = "2";
            self.$cur_span.style.zIndex = "3";
        } else {
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.width = '32px';
            self.$outline.style.height = '32px';
            self.$cur_span.textContent = "";
            self.$cur_span.style.transform = "scale(0)";
            self.$cur_span.style.opacity = "0";
            self.$dot.style.zIndex = "";
            self.$cur_span.style.zIndex = "";
        }
    },
    menuBtn: function() {
        var self = this;
        if (self.cursorEnlarged) {
            self.$dot.style.width = '70px';
            self.$dot.style.height = '70px';
            self.$outline.style.width = '100px';
            self.$outline.style.height = '100px';
            self.$cur_span.textContent = "";
            self.$cur_span.style.transform = "scale(1)";
            self.$cur_span.style.opacity = "1";
            self.$dot.style.zIndex = "-2";
            self.$cur_span.style.zIndex = "-2";
            self.$cur_span.style.mixBlendMode = "difference";
            self.$menuBar1.style.background = "#fff";
            self.$menuBar2.style.background = "#fff";
        } else {
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.width = '32px';
            self.$outline.style.height = '32px';
            self.$cur_span.textContent = "";
            self.$cur_span.style.transform = "scale(0)";
            self.$cur_span.style.opacity = "0";
            self.$menuBar1.style.background = "";
            self.$menuBar2.style.background = "";
            self.$dot.style.zIndex = "";
            self.$cur_span.style.zIndex = "";
        }
    },
    videoCloseCursor: function() {
        var self = this;
        if (self.cursorEnlarged) {
            self.$dot.style.width = '100px';
            self.$dot.style.height = '100px';
            self.$outline.style.width = '100px';
            self.$outline.style.height = '100px';
            self.$cur_span.textContent = "Close";
            self.$cur_span.style.transform = "scale(1)";
            self.$cur_span.style.opacity = "1";
            self.$dot.style.zIndex = "9999";
            self.$cur_span.style.color = "#fff";
        } else {
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.width = '32px';
            self.$outline.style.height = '32px';
            self.$cur_span.textContent = "";
            self.$cur_span.style.transform = "scale(0)";
            self.$cur_span.style.opacity = "0";
            self.$dot.style.zIndex = "";
            self.$cur_span.style.zIndex = "";
        }
    },
    footerCursor: function() {
        var self = this;
        if (self.cursorEnlarged) {
            self.$dot.style.width = '10px';
            self.$dot.style.height = '10px';
            self.$outline.style.width = '15px';
            self.$outline.style.height = '15px';
            self.$cur_span.textContent = "";
            self.$cur_span.style.transform = "scale(1)";
            self.$cur_span.style.opacity = "1";
            self.$dot.style.background = "#fff";
        } else {
            self.$dot.style.width = '15px';
            self.$dot.style.height = '15px';
            self.$outline.style.width = '32px';
            self.$outline.style.height = '32px';
            self.$cur_span.textContent = "";
            self.$cur_span.style.transform = "scale(0)";
            self.$cur_span.style.opacity = "0";
            self.$dot.style.background = "";
        }
    },
}
cursor.init();

// Testimonials Slider JS
$('.testimonial-slider').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

// About Section2 Background Js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-sec2",
    start: "top top",
    end: "bottom top",
    scrub: true
}
});

gsap.utils.toArray(".parallax").forEach(layer => {
  const depth = layer.dataset.depth;
  const movement = -(layer.offsetHeight * depth)
  tl.to(layer, {y: movement, ease: "none"}, 0)
});

// CUSTOM CHECKBOX JS
$('.check').click(function(){
  $(this).toggleClass('active');
});

// CUSTOM RADIOBOX JS
function addCheckAttribute(){
  let val = 0;
  $("input[name='radio']").click(function(){
    let prevVal = val;
    val = $("input[name='radio']:checked").val();
    if ( val !== prevVal) {
      $(this).attr('checked', true).parent('.radio').addClass('active');
      $(`input[value=${prevVal}]`).attr('checked', false).parent('.radio').removeClass('active');
    } 
  });
};
$(document).ready(function() {
  addCheckAttribute();
});