$(document).ready(function () {
  createButton();
})


let gifs = ["dog", "cat", "birb", "ferret", "monkey"];
let animalImage = $("<img>");
let gifDiv = $("<div>");
//--------------------------------------------------------------------------
// functions

// fu
  $(".animal-btn").on("click", function(event) {
    console.log("hit")
    event.preventDefault();
  
    // user Input
    let animal = $(this).attr("data-animal");
    // Create Query URL
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=etI6oymnFWc2axcUGIrsEv4jRn32lOtK&limit=5";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // $("#gifContainer").text(JSON.stringify(response));
      console.log("YAY", queryURL);

      let results = response.data;

      $("#gifContainer").prepend(animalImage);

      for (let i = 0; i < results.length; i++) {

      // Only taking action if the photo has an appropriate rating
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        animalImage.attr("src", results[i].images.fixed_height.url);
        
        gifDiv.append(animalImage);

        // Prepending the gifDiv to the gifContainer in the HTML
        $("#gifContainer").prepend(gifDiv);
        }
      }
    }); 
  });
  


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

// gobutton
$("#searchButton").on("click", function(event) {
  event.preventDefault();
  let animal = $("#animalInput").val().trim();
console.log(animal)
  gifs.push(animal);

  // Calling renderButtons which handles the processing of our array
  createButton();
});





   