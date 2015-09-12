'use strict';

var COLLAPSER_HTML = "<div class='g_r-toggle', style='cursor:n-resize; height: 1.5em; background-color: #F6F1FE; border-radius: 4px 4px 0 0; padding: 0 5px; border: 1px solid #DFBFFC; overflow: hidden;'></div>";

function addButtons(selector, id_sel, comment_sel_arr){
  $(selector).each(function(){
    // Set this.
    var $this = $(this);

    // Id for saving.
    var id;
    if(id_sel){
      id = $this.find(id_sel).attr("id");
    } else{
      id = $this.attr("id");
    }
    // Only add button if we have a reliable (not null/undefined) id to record.
    // If we do, prefix it for safekeeping.
    if(!id){
      return;
    } else{
      id = "g_r_" + window.location + "_" + id;
    }

    // Text to show when collapsed.
    var text = [];
    if (comment_sel_arr && comment_sel_arr.length) {
      for (var i = 0; i < comment_sel_arr.length; i++) {
        text.push($this.find(comment_sel_arr[i]).text().replace(/\s\s+/g, ' ').slice(0, 250));
      };
    }

    // Add button to comment if it isn't already there.
    if(!$this.find(".g_r-toggle").length > 0){
      // Button for expanding/collapsing.
      var $toggle = $(COLLAPSER_HTML).attr("id", id).attr("data-g_r-text", text);
      $this.prepend($toggle);
    }
  });
}

// Set up click handler for individual expand/collapse button.
//
function handleButton(toggle){
  // Set up variables.
  var $toggle = $(toggle);
  var id = $toggle.attr("id");

  // Expand and collapse functions to be used by logic.
  function expand(){
    $toggle.css("cursor", "n-resize");
    $toggle.css("box-shadow", "none");
    $toggle.text("");
    $toggle.siblings().show();
    localStorage.setItem(id, 0);
  }
  function collapse(){
    $toggle.css("cursor", "s-resize");
    $toggle.css("box-shadow", "inset 1px 1px 2px 2px #27496D");
    $toggle.text($toggle.attr("data-g_r-text"));
    $toggle.siblings().hide();
    localStorage.setItem(id, 1);
  }

  // Initial setup (backwards logic from click handler).
  // If it was collapsed during previous page visit we want to collapse it
  // again. This will cause a small flicker.
  if(localStorage.getItem(id)==true){
    collapse();
  }

  // Click handler for expand/collapse button.
  if(!$toggle.hasClass("g_r-listened")){
    // Add a class so we know the listener it has been set up.
    $toggle.addClass("g_r-listened");

    // Listen to click on the expand/collapse button.
    $toggle.click(function(){
      if(localStorage.getItem(id)==true){
        expand();
      }
      else{
        collapse();
      }
    });
  }
}

// Loop through and set up click handlers for all expand/collapse buttons.
//
function handleButtons(){
  $(".g_r-toggle").each(function(){
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
  addButtons(".timeline-comment-wrapper", "div[id^=issuecomment-]", [".timeline-comment-header", ".comment-body"]);
  addButtons("div[id^=diff-for-comment-]", null, [".discussion-item-header", ".comment-body"]);
  addButtons("div[id^=diff-]", null, [".file-info .user-select-contain"]);
  handleButtons();
}

// Main.
//
!function(){
  refreshButtons();
  handleNewComment();
}();
