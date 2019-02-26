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
        return value !== $this.attr('data-id');
      });
      amenityListName = $.grep(amenityListName, function (value) {
        return value !== $this.attr('data-name');
      });
    }
    let amenityListFormatted = amenityListName.join(', ');
    $('.amenities h4').text(amenityListFormatted);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data['status'] !== 'OK') {
      $('#api_status').removeClass('available');
    } else {
      $('#api_status').addClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}'
  }).done(function (data) {
    for (let singlePlace of data) {
      $('section.places').append(
        `<article>
          <div class="title">
            <h2> ${singlePlace.name}</h2>
              <div class="price_by_night">
                ${singlePlace.price_by_night}
              </div>
            </div>
            <div class="information">
              <div class="max_guest">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                <br />
                ${singlePlace.max_guest} Guests
              </div>
              <div class="number_rooms">
                <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                <br />
                ${singlePlace.number_rooms} Bedrooms
              </div>
              <div class="number_bathrooms">
                <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                <br />
                ${singlePlace.number_bathrooms} Bathroom
              </div>
            </div>
            <div class="description">
              ${singlePlace.description}
            </div>
          </article>`
      );
    }
  });

  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({"amenities": amenityListID}),
      dataType: 'json',
      success: function (data) {
        $('article').remove()
        console.log(data.length);
        for (let singlePlace of data) {
          $('section.places').append(
            `<article>
              <div class="title">
                <h2> ${singlePlace.name}</h2>
                  <div class="price_by_night">
                    ${singlePlace.price_by_night}
                  </div>
                </div>
                <div class="information">
                  <div class="max_guest">
                    <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                    <br />
                    ${singlePlace.max_guest} Guests
                  </div>
                  <div class="number_rooms">
                    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                    <br />
                    ${singlePlace.number_rooms} Bedrooms
                  </div>
                  <div class="number_bathrooms">
                    <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                    <br />
                    ${singlePlace.number_bathrooms} Bathroom
                  </div>
                </div>
                <div class="description">
                  ${singlePlace.description}
                </div>
              </article>`
          )}
        }
    });
  })
});
