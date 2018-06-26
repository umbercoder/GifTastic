var soda = ["Mountain Dew", 
            "Pepsi", 
            "Coke", 
            "Diet Coke",
            "Sprite",
            "Dr. Pepper",
            "7up",
            "fanta",
            "Root Beer",
            "Diet Pepsi",
            "Mellow Yellow"];

      // Function for displaying data
function renderButtons() {

  $(".button-display").empty();

  for (var i = 0; i < soda.length; i++) {
    var a = $("<button>");
    a.addClass("clicker btn btn-primary");
    a.attr("data-name", soda[i]);
    a.text(soda[i]);
    $(".button-display").append(a);
    console.log('soda array =' + soda + '-');
  }
}

renderButtons();

$("body").on("click", '#add-soda', function(event) {

  event.preventDefault();
  var soda = $("#soda-input").val().trim();
  if (soda == '') {
    alert('What is your favorite soda ')
  }
  else {
    sodas.push(soda);
    console.log('soda array =' + sodas + '-');
    $("#soda-input").val('')
    renderButtons();
  }
});

$("body").on("click", '.clicker', function() {
  
  var soda = $(this).attr("data-name");
  console.log("data-name -" + soda + "-");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    soda+ "&api_key=Z7BB3rk9yCoL08yOtp8MnH0JzSrD515L&limit=10";
  console.log("query -" + queryURL + "-");

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {

      var results = response.data;
      console.log(response);
      $('#images').empty();

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $('<p>')
          .append('<span class="label label-lg label-info">Rating: <span class="badge">' + rating + '</span></span>');
//         <button class="btn btn-primary" type="button">
//   Messages <span class="badge">4</span>
// </button>

        var sodaImage = $("<img class='img-thumbnail'>");
        var sodaUrl = results[i].images.fixed_height.url;
        var sodaStill = results[i].images.fixed_height_still.url;
        sodaImage.attr({
            src: sodaStill,
            'data-still': sodaStill,
            'data-animate': sodaUrl,
            'data-state':"still"
        });

        gifDiv.prepend(p);
        gifDiv.prepend(sodaImage);

        $("#images").prepend(gifDiv);
      };
    });
});

$("body").on("click", '.img-thumbnail', function() {

  var state = $(this).attr('data-state');

  if (state == 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  }
  else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});