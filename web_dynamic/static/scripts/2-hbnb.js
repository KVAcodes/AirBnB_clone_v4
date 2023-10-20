$(document).ready(function () {
  // adding amenities clicked to the filter bar
  let amenities = [];
  $('div.amenities div.popover ul li input').change(function() {
    if ($(this).is(':checked')) {
      amenities.push($(this).attr('data-name'));
    } else {
      amenities.splice(amenities.indexOf($(this).attr('data-name')), 1);
    }
    const amenitiesStr = amenities.join(', ');
    $('div.amenities h4').text(amenitiesStr);
  });
  // check status of API
  $.get('http://18.234.253.121:5000/api/v1/status/', function(response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  })
  .fail(function(xhr, status, error) {
    console.error("An error occurred:", status, error);
    $('div#api_status').removeClass('available');
  });
});
