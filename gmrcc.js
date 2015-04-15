'use strict';


// Main.
!function(){
  console.log("GMRCC HERE");


  // Todo: loop thru all div[id^=issuecomment-] and collapse any items that should be collapsed

  $("div[id^=issuecomment-] .timeline-comment-actions").each(function(){

    // Set up button for expanding/collapsing.
    var $toggle = $("<span class='gmrcc-toggle timeline-comment-label'>image here</span>")

    // Add button to comment header space.
    $(this).after($toggle);


    // Set up variable to represent state of expanded/collapsed (0 collapsed,
    // 1 is expanded).
    var doneState = 1;
    // Keep track of parent comment and comment.
    var $parent = $(this).parents("div[id^=issuecomment-]");
    var $comment = $parent.find(".comment-content");
    var $header = $parent.find(".timeline-comment-header");
    var colorPrev = $header.css("background-color");
    var borderPrev = $parent.css("border");

    // When clicked, toggle should expand/collapse the comment.
    //
    $toggle.click(function() {
      if(doneState==1){
        // Collapse elements.
        $parent.css("border", "none");
        $header.css("background-color", "white");
        $comment.hide();
        doneState = 0;
      }
      else {
        // Expand elements.
        $parent.css("border", borderPrev);
        $header.css("background-color", colorPrev);
        $comment.show();
        doneState = 1;
      }
    });


    // Todo: as we loop thru gmrcc-toggle elements to set up a click handler that does something
    // something should be:
    //   - set up local storage for page with toggle state so we can read it on return to this page (^Todo)
    //   - if expanded, collapse the current div[id^=issuecomment-] so the expand button is still visible
    //   - if collapsed, restore comment to expanded state
  });







}();
