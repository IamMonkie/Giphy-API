$(document).ready(function () {

window.onload = function () {

};

let gifs = ["dog", "cat", "birb", "ferret", "monkey"];
var animalImage = $("<img>");
let gifDiv = $("<div>");
//--------------------------------------------------------------------------
// functions

function animalInfo() {
  $("#searchButton").on("click", function(event) {
    
    event.preventDefault();
  
    // user Input
    let animal = $(this).attr("data-animal");
    // Create Query URL
    let queryURL = $.get("http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=etI6oymnFWc2axcUGIrsEv4jRn32lOtK&limit=5");
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // $("#gifContainer").text(JSON.stringify(response));
      console.log("YAY", response);
      $("#gifContainer").prepend(animalImage);

      for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

      animalImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(animalImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifContainer").prepend(gifDiv);
            }
          }
    }); 
  });
}


function createButton() {

  
  

$("#buttonContainer").empty();

for (let i = 0; i < gifs.length; i++) {
  
  let a = $("<button>");
    a.addClass("animal-btn");
    a.attr("data-name", gifs[i]);
    a.text(gifs[i]);
    $("#buttonContainer").append(a);
  }
}

// button Click
$("#searchButton").on("click", function(event) {
  event.preventDefault();
  let animal = $("#animalInput").val().trim();

  gifs.push(animal);

  // Calling renderButtons which handles the processing of our array
  createButton();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".searchButton", animalInfo);

createButton();


}); //ready close



   