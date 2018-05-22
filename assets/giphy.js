$(document).ready(function() {

var pageButtons = ["Egypt", "Japan", "Iceland", "New Zealand", "Chile", "United States"];

var apiKey = "&api_key=spmJZeSndVCMYDdcytHjalTrFSqTQJ34";

function makeButton() {
    $("#buttonHolder").empty();
    for (var i = 0; i < pageButtons.length; i++) {
        var myButton = $("<button>");
        myButton.attr("data-country", pageButtons[i]);
        myButton.html(pageButtons[i]);
        myButton.addClass("button");
        $("#buttonHolder").prepend(myButton);
    }
}

$(document).on("click", ".button", function() {
    var country = $(this).attr("data-country");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
      country + "&limit=10&offset=0&rating=G&lang=en" + apiKey;
      console.log(country);
      console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    })
        .then(function(response) {

        var userImages = response.data;

        console.log(response);
        for (var i=0; i<response.data.length; i++) {
            var bothDiv = $("<div>");
            bothDiv.addClass("imageP");
            var p = $("<p>");
            var imgGif = $("<img>");
            imgGif.attr("src", userImages[i].images.fixed_height_small_still.url);
            imgGif.attr("data-still", userImages[i].images.fixed_height_small_still.url);
            imgGif.attr("data-moving", userImages[i].images.fixed_height_small.url);
            imgGif.attr("data-state", "still");
            
            imgGif.attr("alt", "country image");
            imgGif.addClass("countryImage");
            p.text(country + " Rated: " + userImages[i].rating);
            bothDiv.prepend(p);
            bothDiv.prepend(imgGif);
            
            $("#images").prepend(bothDiv);
        }
    });
});

$(document).on("click", ".countryImage", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-moving"));
        $(this).attr('data-state', "moving");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr('data-state', "still");
      }

});

$("#add-country").on("click", function(event) {
    event.preventDefault();
    var country = $("#country-input").val().trim();
    pageButtons.push(country);
    makeButton();
    $("#gif-form").find('input:text').val("");
  });

makeButton();

 

});
