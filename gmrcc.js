'use strict';


// Main.
!function(){
  console.log("GMRCC HERE");


  // Todo: loop thru all div[id^=issuecomment-] and collapse any items that should be collapsed

  $("div[id^=issuecomment-] .timeline-comment-label").each(function(){
    $(this).after("<span class='gmrcc-toggle timeline-comment-label'>image here</span>");

    // Todo: as we loop thru gmrcc-toggle elements to set up a click handler that does something
    // something should be:
    //   - set up local storage for page with toggle state so we can read it on return to this page (^Todo)
    //   - if expanded, collapse the current div[id^=issuecomment-] so the expand button is still visible
    //   - if collapsed, restore comment to expanded state
  });







}();
