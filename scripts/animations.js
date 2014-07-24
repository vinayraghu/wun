'use strict';
// Animate sidebar on load
$(document).on("ready", function () {
  $(".sidenav li, .sidenav li a")
    .velocity("transition.slideLeftIn", { stagger: 25 }, 250)
    .velocity({ opacity: 1 }, 25);
  $("#collapse-sidebar").on("click", function () {
    $(".sidebar-primary").toggleClass("is-collapsed");
    $(".content-main").toggleClass("is-expanded");
  });
});
