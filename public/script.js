let facesLoop;
let facesLoopReversed;

const video = document.getElementById("theVideo");
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", function() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    // playButton.classList.toggle("is-hidden");
});

// if the video is playing, hide the play button
video.addEventListener("play", function() {
  playButton.classList.add("is-hidden");
})

// if the video is paused, show the play button
video.addEventListener("pause", function() {
  playButton.classList.remove("is-hidden");
})

function playAnimation() {
  if(facesLoop) {
    facesLoop.restart();
    facesLoopReversed.restart();
  }
  // console.log("start animation");
  // const wrapper = document.querySelector(".caritas-wrapper");
  // const colors = ["#f38630","#6fb936", "#ccc", "#6fb936"];
  const boxes = gsap.utils.toArray(".carita");
  const boxesReversed = gsap.utils.toArray(".carita-reversed");

  gsap.set(boxes , {
    // backgroundColor: gsap.utils.wrap(colors)
  });

  facesLoop = horizontalLoop(boxes, {
    paused: false,
    repeat: -1,
    speed: 1.25
  });

  facesLoopReversed = horizontalLoop(boxesReversed, {
    paused: false,
    repeat: -1,
    speed: 1.25,
    reversed: true
  });
}

function stopAnimation() {
  if(facesLoop) {
    facesLoop.pause();
    facesLoopReversed.pause();
  }
  // console.log("stop animation");
}


/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth, curX, distanceToStart, distanceToLoop, item, i;
  gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    }
  });
  gsap.set(items, {x: 0});
  totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
      .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = vars => toIndex(curIndex+1, vars);
  tl.previous = vars => toIndex(curIndex-1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}



$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
      $(".navbar").toggleClass("is-open");
  });

  // if they click on a navbar-item, close the navbar
  $(".navbar-item").click(function() {
    $(".navbar-burger").removeClass("is-active");
    $(".navbar-menu").removeClass("is-active");
    $(".navbar").removeClass("is-open");
  });

  // Make a function that when I click a section link, the site scrolls to that section
  $(".navbar-item").click(function() {
    var section = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(section).offset().top - ($(".navbar").height() + 20)
    }, 1000);
  });

  // check if masonry is available
  if ($('.news-grid').length) {
    $('.news-grid').masonry({
      // options
      percentPosition: true,
      columnWidth: '.grid-sizer',
      itemSelector: '.grid-item',
      // gutter: 10
    });
  }

  // check if masonry is available
  
  setTimeout(function() {
    $('.news-grid').masonry({
      // options
      percentPosition: true,
      columnWidth: '.grid-sizer',
      itemSelector: '.grid-item',
      // gutter: 10
    });
  }, 1000);

  function checkWindowSize() {
    if ($(window).width() <= 1023) {
      // console.log("window is less than 1024px");
        playAnimation();
    } else {
      // console.log("window is greater than 1024px");
        stopAnimation();
    }
}

  // Initial check
  checkWindowSize();

  // Watch for resize events
  $(window).resize(function() {
      // console.log("window resized");
      checkWindowSize();
  });
});
