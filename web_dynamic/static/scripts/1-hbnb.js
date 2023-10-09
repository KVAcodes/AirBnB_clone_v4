$(document).ready(function () {
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
});
