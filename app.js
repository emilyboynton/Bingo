var arrayNums = new Array();   //array of nums to fill bingo spaces
var generateNums = new Array();  //array of random game play nums
var uniqueNum, $randNum, newNum;  

//**************************************//
//	Randomly Generate Numbers	          //
//	And fill each bingo space	          //
//**************************************//

$(".fill").each(function() {

  do {
  
    $randNum = (Math.floor(Math.random()*100));
 
    //make sure the random number wasn't already generated 
    if (arrayNums.length === 0){
      uniqueNum = true;
    } else {
      $.each(arrayNums, function(index, value){
        if($randNum === value){
          uniqueNum = false;
          return false;
        } else {
          uniqueNum = true;
        }
      });  
    }

    //add the paragraph tag with the number to the bingo space div
    if (uniqueNum){
      var $par = $("<p></p>");
      $par.text($randNum);
      $(this).append($par);
      arrayNums.push($randNum);
    } 

  } while (!uniqueNum);

});

//**************************************//
//	On click, change space		          //
//	color and see if a win		          //
//**************************************//

$(".fill").on("click", function() {
  $(this).toggleClass("clicked");

  //Give the most recently clicked space id of "lastClicked"
  $(this).attr('id', 'lastClicked');

  //Create an array of class lists from the "lastClicked" space
  var classList = document.getElementById('lastClicked').className.split(/\s+/);

  //Go through class list to check if 5 in a row are clicked
  for (var i = 0; i < classList.length; i++) {
    var classToCheck = classList[i];

    //exclude certain classes from winning combo check
    if (classToCheck === "square" || classToCheck === "fill" || classToCheck === "clicked") {
      //do nothing
      ; 
    } else {
      //determine number of spaces that have the class AND are clicked
      var newList = boardgame.getElementsByClassName(classToCheck + " clicked");
    
      //if all five in the class are clicked: 
      //Show winning overlay
      if (newList.length > 4) {
	     $(".overlay").toggleClass("overlay-front");
	     console.log(generateNums);
      }
    }
  }
  
  //Make sure only one element at a time is "lastClicked"
  $(lastClicked).removeAttr('id');
});

//**************************************//
//	Generate Number			                //
//	Variables and behavior		          //
//**************************************//


var $parNum = $("<p></p>");
$("#number").append($parNum);

$("#generator").on("click", function(){
  do {
    $randNum = (Math.floor(Math.random()*100));

    if (generateNums.length === 0){
      newNum = true;
    } else {
   
      //make sure the random number wasn't already generated
      $.each(generateNums, function(index, value){
        if($randNum === value){
          newNum = false;
          return false;
        } else {
          newNum = true;
        }
      });
  
    }

    //show the random number 
    if (newNum){
      $parNum.text($randNum);
      generateNums.push($randNum);
    }
  }  while (!newNum);
});

//******************************//
//	Play Again		              //
//	Button behavior		          // 
//******************************//

$("#yes").on("click", function(){
  $(".overlay").toggleClass("overlay-front");
  setTimeout( function(){ 
    window.location.reload(false);
  }, 780 )  //reload the page after .78s
});

$("#no").on("click", function(){
  $(".overlay").toggleClass("overlay-front");
});
