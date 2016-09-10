$(document).ready(function() {
var url='https://test-88cb4.firebaseio.com/';
var myBase = new Firebase(url);
console.log("page was loaded");

$('#addTrain').on('click', function(event) {
  event.preventDefault();
  var trainName = $('#trainName').val().trim();
  var trainDestination = $('#destination').val().trim();
  var firstTime =$('#startInput').val().trim();
  console.log($('#frequency').val());
  var frequency =$('#frequency').val().trim();

  var train = {
    name: trainName,
    destination: trainDestination,
    often: frequency,
    first: firstTime,
  };

  myBase.push(train);

  trainName = $('#trainName').val("");
  trainDestination = $('#destination').val("");
  firstTime =$('#startInput').val("");
  frequency =$('#frequency').val("");

});

function buildTable(){
myBase.off("child_added");

myBase.on("child_added", function(childSnapshot, prevChildKey){
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().often;
	var tFirst = childSnapshot.val().first;
  var firstTimeConverted = moment(tFirst,"hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTime = moment(nextTrain).format("hh:mm");
	$("tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + nextTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});
}

buildTable();

setInterval(function(){
    $('tbody').empty();
    buildTable();
},1000*60);

});
