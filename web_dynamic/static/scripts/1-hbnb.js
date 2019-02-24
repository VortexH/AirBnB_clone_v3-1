$(document).ready(function () {
  let amenityListID = [];
  let amenityListName = [];
  $('input:checkbox').click(function () {
    var $this = $(this);
    if ($this.is(':checked')) {
      amenityListID.push($this.attr('data-id'));
      amenityListName.push($this.attr('data-name'));
    } else {
      amenityListID = $.grep(amenityListID, function (value) {
        return value != $this.attr('data-id');
      });
      amenityListName = $.grep(amenityListName, function (value) {
        return value != $this.attr('data-name');
      });
    }
    let amenityListFormatted = amenityListName.join(', ');
    $('.amenities h4').text(amenityListFormatted);
  });
});
