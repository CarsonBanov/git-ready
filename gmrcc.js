'use strict';

function addButtons(){
  $("div[id^=issuecomment-] .timeline-comment-header").each(function(){
    console.log(this);
    console.log($(this).find("timeline-comment-action"));

    // Set up button for expanding/collapsing.
    var $toggle = $("<span class='gmrcc-toggle timeline-comment-label'>image here</span>");

    // Add button to comment if it isn't already there.
    if(!$(this).find(".gmrcc-toggle").length > 0){
      $(this).find(".timeline-comment-actions").after($toggle);
    }
  });
}

function handleButtons(){
  $(".gmrcc-toggle").each(function(){
    // Read this from cookie or set to 0.
    var isExpanded = 1;

    // Set up variables.
    var $toggle = $(this);
    var $parent = $(this).parents("div[id^=issuecomment-]");
    var $comment = $parent.find(".comment-content");
    var $header = $parent.find(".timeline-comment-header");
    var colorPrev = $header.css("background-color");
    var borderPrev = $parent.css("border");

    $toggle.click(function() {
      if(isExpanded==1){
        // Collapse elements.
        $parent.css("border", "none");
        $header.css("background-color", "white");
        $comment.hide();
        isExpanded = 0;
      }
      else {
        // Expand elements.
        $parent.css("border", borderPrev);
        $header.css("background-color", colorPrev);
        $comment.show();
        isExpanded = 1;
      }
    });


  });
}


// Main.
!function(){
  console.log("GMRCC HERE");

    // Todo: as we loop thru gmrcc-toggle elements to set up a click handler that does something
    // something should be:
    //   - set up local storage for page with toggle state so we can read it on return to this page (^Todo)
    //   - if expanded, collapse the current div[id^=issuecomment-] so the expand button is still visible
    //   - if collapsed, restore comment to expanded state

  addButtons();
  handleButtons();




}();
