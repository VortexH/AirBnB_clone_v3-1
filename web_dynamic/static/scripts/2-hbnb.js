$( document ).ready(function() {
  let amenityListID = [];
  let amenityListName = [];
  $("input:checkbox").click(function(){
    var $this = $(this);
    if($this.is(":checked")){
        amenityListID.push($this.attr("data-id"));
        amenityListName.push($this.attr("data-name"));
    } else {
      amenityListID = $.grep(amenityListID, function(value){ 
        return value != $this.attr("data-id");  
      });
      amenityListName = $.grep(amenityListName, function(value){ 
        return value != $this.attr("data-name"); 
      });
    }
    let amenityListFormatted = amenityListName.join(', ');
    $( '.amenities h4').text(amenityListFormatted);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function(data, textStatus) {
    if (textStatus !== '200') {
      $('#api_status').removeClass('available');
    } else {
      $('#api_status').addClass('available');
    }
});
