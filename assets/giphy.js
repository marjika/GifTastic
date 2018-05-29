$(document).ready(function() {

var pageButtons = ["Egypt", "Japan", "Iceland", "New Zealand", "Bolivia", "United States"];

var offset = 0;

var apiKey = "&api_key=spmJZeSndVCMYDdcytHjalTrFSqTQJ34";

//Creates buttons from pageButtons array and gives each a country and offset attribute, name and class
function makeButton() {
    $("#buttonHolder").empty();
    for (var i = 0; i < pageButtons.length; i++) {
        var myButton = $("<button>");
        myButton.attr("data-country", pageButtons[i]);
        myButton.attr("data-offset", 0);
        myButton.html(pageButtons[i]);
        myButton.addClass("button");
        $("#buttonHolder").prepend(myButton);
    }
}

//On button click, the AJAX query is sent using information from the button attributes
//10 images are created for each click with still and moving states on click and title and rating listed
//Each click changes the offset by ten to enable user to view more gifs
$(document).on("click", ".button", function() {
    var country = $(this).attr("data-country");
    var currentOffset = $(this).attr("data-offset");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        country + "&limit=10&offset=" + currentOffset + "&rating=G&lang=en" + apiKey;
    var newOffset = 10 + parseInt(currentOffset);
    $(this).attr("data-offset", newOffset);

    $.ajax({
      url: queryURL,
      method: "GET"
    })
        .then(function(response) {

        var userImages = response.data;

        for (var i=0; i<response.data.length; i++) {
            var bothDiv = $("<div>");
            bothDiv.addClass("imageP");
            var p = $("<p>");
            var gifTitle = $("<p>");
            var imgGif = $("<img>");
            imgGif.attr("src", userImages[i].images.fixed_height_small_still.url);
            imgGif.attr("data-still", userImages[i].images.fixed_height_small_still.url);
            imgGif.attr("data-moving", userImages[i].images.fixed_height_small.url);
            imgGif.attr("data-state", "still");            
            imgGif.attr("alt", "country image");
            imgGif.addClass("countryImage");
            gifTitle.addClass("gifTitle");
            gifTitle.text(userImages[i].title);
            p.text("Rated: " + userImages[i].rating);
            bothDiv.prepend(p);
            bothDiv.prepend(gifTitle);
            bothDiv.prepend(imgGif);            
            $("#images").prepend(bothDiv);
        }
    });
});

//Changes the state on image click which enables the gif to move or be still
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

//The form element which allows the user to add another button and pushes the new button into the buttonsArray
$("#add-country").on("click", function(event) {
    event.preventDefault();
    var country = $("#country-input").val().trim();
    pageButtons.push(country);
    makeButton();
    $("#gif-form").find('input:text').val("");
  });

makeButton();
 
});
