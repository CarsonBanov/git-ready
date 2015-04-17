'use strict';

// Loop through all comments and add expand/collapse button.
//
function addButtons(){
  $("div[id^=issuecomment-] .timeline-comment-header").each(function(){
    // Button for expanding/collapsing.
    var $toggle = $("<span class='gmrcc-toggle timeline-comment-label', style='cursor:n-resize'>Collapse</span>");

    // Add button to comment if it isn't already there.
    if(!$(this).find(".gmrcc-toggle").length > 0){
      $(this).find(".timeline-comment-actions").after($toggle);
    }
  });
}

// Set up click handler for individual expand/collapse button.
//
function handleButton(toggle){
  // Set up variables.
  var $toggle = $(toggle);
  var $parent = $toggle.parents("div[id^=issuecomment-]");
  var $comment = $parent.find(".comment-content");
  var $header = $parent.find(".timeline-comment-header");
  var isCollapsed = "gmrcc-"+$parent.attr("id");
  var colorPrev = $header.css("background-color");
  var borderPrev = $parent.css("border");

  // Expand and collapse functions to be used by logic.
  function expand(){
    $toggle.text("Collapse");
    $toggle.css("cursor", "n-resize");
    $parent.css("border", borderPrev);
    $header.css("background-color", colorPrev);
    $comment.show();
    localStorage.setItem(isCollapsed, 0);
  }
  function collapse(){
    $toggle.text("Expand");
    $toggle.css("cursor", "s-resize");
    $parent.css("border", "none");
    $header.css("background-color", "white");
    $comment.hide();
    localStorage.setItem(isCollapsed, 1);
  }

  // Initial setup (backwards logic from click handler).
  // If it was collapsed during previous page visit we want to collapse it
  // again. This will cause a small flicker.
  if(localStorage.getItem(isCollapsed)==true){
    collapse();
  }

  // Click handler for expand/collapse button.
  if(!$toggle.hasClass("gmrcc-listened")){
    // Add a class so we know the listener it has been set up.
    $toggle.addClass("gmrcc-listened");

    // Listen to click on the expand/collapse button.
    $toggle.click(function() {
      if(localStorage.getItem(isCollapsed)==true){
        expand();
      }
      else {
        collapse();
      }
    });
  }
}

// Loop through and set up click handlers for all expand/collapse buttons.
//
function handleButtons(){
  $(".gmrcc-toggle").each(function(){
    handleButton(this);
  });
}

// Set up click handlers to refresh expand/collapse buttonds when a user submits
// a new comment. New comments occur with clicking the comment button or hitting
// cmd+enter in the comment field.
//
function handleNewComment(){
  $("form[action$='comment']").each(function(){
    $(this).submit(function(){
      refreshButtons();
    });

    $(this).keyup(function(ev){
      // This is the command key.  Refresh every time because listening to the
      // full cmd+enter combo is impossible because of github's listeners.
      if(ev.keyCode == 91){
        setTimeout(refreshButtons,1000);
      }
    });
  });
}

// Add buttons and click handlers if there are any not already set up.
//
function refreshButtons(){
  addButtons();
  handleButtons();
}

// Main.
//
!function(){
  refreshButtons();
  handleNewComment();
}();
