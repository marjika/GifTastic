$(document).ready(function() {

var pageButtons = ["Egypt", "Japan", "Iceland"];

var apiKey = "&api_key=spmJZeSndVCMYDdcytHjalTrFSqTQJ34";

function makeButton() {
    for (var i = 0; i < pageButtons.length; i++) {
        var myButton = $("<button>");
        myButton.attr("data-country", pageButtons[i]);
        myButton.html(pageButtons[i]);
        myButton.addClass("button");
        $("body").prepend(myButton);
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
            // var userGifs = new constructGif(userImages[i].images.fixed_height_small_still.url, userImages[i].images.fixed_height_small.url, userImages[i].rating);
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
            p.text("Rating: " + userImages[i].rating);
            
            bothDiv.prepend(imgGif);
            bothDiv.prepend(p);
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

makeButton();

        // var userGifs = userImages[i].images.fixed_height_still.url;
        // console.log(userGifs);

        // //makes a image div 
        // var imgGif = $("<img>");

        // //creates attributes for image div, where to get the source of the image (imageUrl) and an alt
        // imgGif.attr("src", userGifs);
        // imgGif.attr("alt", "Germany image");

        // //takes the image div and prepends it to the images div
        // $("#images").prepend(imgGif);
 

});
