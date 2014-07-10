'use strict';
// Animate sidebar on load
$(document).on("ready", function () {
  $(".sidenav li")
    .velocity("transition.slideLeftIn", { stagger: 25 }, 250)
    .velocity({ opacity: 1 }, 25)
});
