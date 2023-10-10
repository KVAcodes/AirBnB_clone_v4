$(document).ready(function () {
  // adding amenities clicked to the filter bar
  let amenities = [];
  $('div.amenities div.popover ul li input').change(function () {
    if ($(this).is(':checked')) {
      amenities.push($(this).attr('data-name'));
    } else {
      amenities.splice(amenities.indexOf($(this).attr('data-name')), 1);
    }
    const amenitiesStr = amenities.join(', ');
    $('div.amenities h4').text(amenitiesStr);
  });
  // check status of API
  $.get('http://localhost:5001/api/v1/status/', function(response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  })
    .fail(function(xhr, status, error) {
      console.error('An error occurred:', status, error);
      $('div#api_status').removeClass('available');
    });

  $.post({
    url: 'http://localhost:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function(response) {
      $.each(response, function(index, place) {
        // title_box
        const $t_box_h2 = $('<h2>').text(place.name);
        const $t_box_div = $('<div>')
          .addClass('price_by_night')
          .text(place.price_by_night);
        const $title_box_div = $('<div>').addClass('title_box');
        $title_box_div.append($t_box_h2, $t_box_div);
        // information
        const $inf_max = $('<div>')
          .addClass('max_guest')
          .text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
        const $inf_num_r = $('<div>')
          .addClass('number_rooms')
          .text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
        const $inf_num_b = $('<div>')
          .addClass('number_bathrooms')
          .text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
        const $information_div = $('<div>').addClass('information');
        $information_div.append($inf_max, $inf_num_r, $inf_num_b);
        // description
        const $desc_div = $('<div>')
          .addClass('description')
          .text(place.description);
        // article
        const $article = $('<article>')
          .append($title_box_div, $information_div, $desc_div);
        $('section.places').append($article);
      });
    },
    error: function(xhr, textStatus, errorThrown) {
      console.error("An error occurred:", textStatus, errorThrown);
    }
  });
});
