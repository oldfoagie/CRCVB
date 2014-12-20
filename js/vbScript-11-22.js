$(document).ready(function(){
  // **********  These are the global Vars & functional calls
  var getScores = function(team) {
    var hScr = $("#homescr").text();
    var vScr = $("#vistscr").text();
    return (team=="home") ? hScr+'-'+vScr : vScr+'-'+hScr;
  }

  $('#frameT').slideToggle();

  var getTeam = function() {
    $('#frameT').load('getTeam');
      }

 
  var setSrvOrder = function() {
    var team = $('#teamName option:selected').text();
    alert (team);
  }
  
  // ***** This will get all initial data for teams
  var vbDB = function() { $('#frameT').load('initData'); }

  var SERVING = 'H';
  
  // **********  These are all the functions for . CLASSes 

  $(".btnv").click(function(){
    $(this).toggleClass("presV");
  });

  $(".btnh").click(function(){
    $(this).toggleClass("presH");
  });

  $(".toh").click(function(){
    var $th = $(this);
    $th.toggleClass("presH");  // change color to red
    $th.text( getScores('home') ); // change text to cur Score
    $th.prop("disabled",true);  // disable the TO button
  });

  $(".tov").click(function(){
    var $th = $(this);
    $th.toggleClass("presV");  // change color to blue
    $th.text( getScores('vist') ); // change text to cur Score
    $th.prop("disabled",true);  // disable the TO button
  });
  
  // **********  These are all the functions for # ID's

  $("#ace").click(function(){ // ********** Need to finish
    var $th = $(this);
    $th.toggleClass("presV");  // change color to blue
    $th.text( getScores('vist') ); // change text to cur Score
    $th.prop("disabled",true);  // disable the TO button
  });

  $("#hSrv").click(function(){
    var bc = $(this).css('background-color');
    if (bc == 'rgb(221, 221, 221)' ) $(this).toggleClass('presS');

    // change color grey if not grey
    var bc = $('#vSrv').css('background-color');
    if ( bc != 'rgb(221, 221, 221)' ) $('#vSrv').toggleClass("presS");
    
    SERVING = 'H';
  });
 
  $("#order").click(function(){
   if ($(this).text() == 'Select Team') setSrvOrder();
   $(this).text(($(this).text()=='SETUP') ?
      'Select Team':'SETUP');
    $('#frameC').slideToggle('slow');
    $('#frameA').slideToggle('slow');
    $('#frameT').slideToggle('slow');
    var team = getTeam();
//    $('#frameC').slideToggle('slow');
//    $('#frameA').slideToggle('slow');
  });

  $("#vSrv").click(function(){
    var bc = $(this).css('background-color');
    if (bc == 'rgb(221, 221, 221)' ) $(this).toggleClass('presS');

    // change color grey if not grey
    bc = $('#hSrv').css('background-color');
    if ( bc != 'rgb(221, 221, 221)' ) $('#hSrv').toggleClass("presS"); 
    
    SERVING = 'V';
  });
 
 
});
