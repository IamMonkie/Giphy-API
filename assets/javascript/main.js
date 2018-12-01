$(document).ready(function () {
  createButton();
  // goButton();

  $("#buttonContainer").on("click", ".animal-btn", function(event) {
    console.log("hit")
    event.preventDefault();

    // user Input
    let animal = $(this).attr("data-name");
    // Create Query URL
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=etI6oymnFWc2axcUGIrsEv4jRn32lOtK&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // $("#gifContainer").text(JSON.stringify(response));
      

      let results = response.data;
      var animalDiv = $("<div>");
      
      $("#gifContainer").prepend(animalImage);

      for (let i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

          var p = $("<p>").text("Rating: " + results[i].rating);
          
          animalImage.attr("src", results[i].images.fixed_height.url);

          animalDiv.append(p);
          gifDiv.append(animalImage);

          // Prepending the gifDiv to the gifContainer in the HTML
          $("#gifContainer").prepend(gifDiv);
          console.log("YAY", gifDiv);
        }
      }
    });
  });

  $("#gifContainer").on("click", ".animalImage", function(){
    let state = $(this).attr("data-state");
    let source = $(this).html("#gif");

    if(state === 'still'){

      let dataAnimate = $(this).attr("data-animate");
      $(this).attr("src", dataAnimate);
      $(this).attr("data-state", 'animate');
    }
    else if (state === 'animate') {

      let dataStill = $(this).attr('data-still');
      $(this).attr('src', dataStill);
      $(this).attr('data-state', 'still');
    }
  })
  
}) // document.ready close

//--------------------------------------------------------------------------
// functions

let gifs = ["dog", "cat", "birb", "ferret", "monkey"];
let animalImage = $("<img>");
let gifDiv = $("<div>");



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

// go button
function goButton() {

$("#searchButton").on("click", function(event) {
  event.preventDefault();
  let animal = $("#animalInput").val().trim();
  console.log(animal)
  gifs.push(animal);

  // Calling renderButtons which handles the processing of our array
  createButton();

}); 
};