$(document).ready(function(){
  // **********  These are the global Vars & functional calls

  // ***** This will initialize variable
  var wTeams = ['BYOB','Ikaika','Nemesis',
                'OldSchool','OneHitWonder'];
  var thTeams =['LetsPlay','HitForBrains','SetToKill',
                'AcesWild','BlockParty'];
  var SERVING = 'H';
 
  // ********  global function calls
  var getScores = function(team) {
    var hScr = $("#homescr").text();
    var vScr = $("#vistscr").text();
    return (team=="home") ? hScr+'-'+vScr : vScr+'-'+hScr;
  };

  var getPlyrNames = function (team) {
    // *** get all players names here and add them to benchPlyrs class of buttons
    return(0);
  };


  var getPlyrNum = function(id,numChar) {  // this is not used but kept for possible use
    var plyrNum = id.slice(numChar,id.length);
    return plyrNum;
  };

  // ****** This is called by setupBtn.click call if the button label is "select Team"
  var setSrvOrder = function() {
    var team = $('#teamName option:selected').text();  // get teamname that is selected
    var srvOrder = [];
    $('#frmPlyr').hide();
    $('.crtPlyrs').each( function() {srvOrder.push ($(this).text()) });
    //****  After saving servers names in order, need to reset the court/bench players
    alert (team+':\n'+srvOrder);
  };

  // ****** This is called by setupBtn.click call if the button label is "Setup"
  var resetSetupScreen = function() {
    $('#league').val('none');
    $('#teamName').val('none');
    $('#frmTeam').hide();
    $('#frmSetup').slideDown('slow');
    $('#teamName').change();
  };


 // var vbDB = function() { $('#frmT').load('initData'); }
 
 // **********  These are all the functions for . CLASSes 

//  $(".btnAC").click(function(){
//    alert( $(this).getID() ) ;
//  });

  $(".btnV").click(function(){
    $(this).toggleClass("presV");
  });

  $(".btnH").click(function(){
    $(this).toggleClass("presH");
  });

  $(".toH").click(function(){
    var $th = $(this);
    $th.toggleClass("presH");  // change color to red
    $th.text( getScores('home') ); // change text to cur Score
    $th.prop("disabled",true);  // disable the TO button
  });

  $(".toV").click(function(){
    var $th = $(this);
    $th.toggleClass("presV");  // change color to blue
    $th.text( getScores('vist') ); // change text to cur Score
    $th.prop("disabled",true);  // disable the TO button
  });
  
  // **********  These are all the functions for # ID's

  $("#ace").click(function(){ // ********** Need to finish
    var $th = $(this);
    $th.toggleClass("presA");  // change color to blue
    
		});

  $("#hSrv").click(function(){
    var bc = $(this).css('background-color');
    if (bc == 'rgb(221, 221, 221)' ) $(this).toggleClass('presS');

    // change color grey if not grey
    var bc = $('#vSrv').css('background-color');
    if ( bc != 'rgb(221, 221, 221)' ) $('#vSrv').toggleClass("presS");
    
    SERVING = 'H';
  });
 
  $("#setupBtn").click(function(){
    switch ($(this).text()) {
      case 'Select Team':
        setSrvOrder();
        $('#frmA').slideDown('slow');
        $('#frmC').slideDown('slow');
        $('#frmSetup').slideUp('slow');
        $(this).text('SETUP');
        break;
      case 'SETUP':
        $('#frmA').slideUp('slow');
        $('#frmC').slideUp('slow');
        $(this).text('Select Team');
        resetSetupScreen();
        break;
    };
  });

  $("#vSrv").click(function(){
    var bc = $(this).css('background-color'); //alert(bc);
    if (bc == 'rgb(221, 221, 221)' )
			$(this).toggleClass('presS');

    // change color grey if not grey
    bc = $('#hSrv').css('background-color');
    if ( bc != 'rgb(221, 221, 221)' )
			$('#hSrv').toggleClass("presS"); 
    
    SERVING = 'V';
  });

  $("#league").change(function() {
    var lg = $('#league').val();
    switch (lg) {
    case 'wed':
      $('#frmTeam').show();
      $('#teamName').children('option:not(:first)').remove();
      // alert (wTeams);
      jQuery.each(wTeams, function(key, value) {
        $('#teamName').append($('<option></opiton>').attr('value',value) .text(value)); });
      break;

    case 'thu':
      $('#teamName').children('option:not(:first)').remove();
      $('#frmTeam').show();
      jQuery.each(thTeams, function(key, value) {
        $('#teamName').append($('<option></opiton>').attr('value',value) .text(value)); });
      break;

    case 'none':
    default: $('#frmTeam').hide();
    };  // end switch
  });   // end #league.change  function 
  
  $("#teamName").change(function() {
    var team = $('#teamName').val();
    (team == 'none') ?
      $('#frmPlyr').hide() :
      $('#frmPlyr').show();
      getPlyrNames();
      $('.availPlyrs').children().show();

  });   // end #teamName.change  function

  // This will move players from Avail list to serving Order list
/***  $('.benchPlyrs').live('click', function() { 
    $(this)
      .remove()
      .toggleClass('benchPlyrs crtPlyrs')
      .appendTo('#servers');
//    var idBenchPlyr = "#"+e.target.id;
//    $(idBenchPlyr)
//      .appendTo('#servers')
//      .addClass('crtPlyrs')
//      .removeClass ('benchPlyrs');
//    var idAvailPlyr = e.target.id;
//    // true = plyr num is available in availPlyrNum
//    availPlyrNum[ getPlyrNum(idAvailPlyr,"avail".length) ] = true;  
//    var btnAvailPlyr = $('#'+idAvailPlyr); 
//    var btnText = btnAvailPlyr.text();
//    btnAvailPlyr.hide();   // This will hide the source button
//    var nextNum=11-$('.btnOrder:hidden').length;
//    var newId = '#plyr'+ nextNum;
//    $(newId).show();
//    $(newId).text(btnText)
    //$('#servers').append($('<button class="btnOrder" id='+newId+'>'+
    //                      th.text()+'</button>'));
  });


  // This will move players from serving Order list to Avail list 
  $('.crtPlyrs').live('click', function() {
    $(this).toggleClass('benchPlyrs crtPlyrs')
      .remove()
      .appendTo('#bench');

//    var idCrtPlyr = "#"+e.target.id;
//    $(idCrtPlyr)
//      .appendTo('#bench')
//      .addClass('benchPlyrs')
//      .removeClass('crtPlyrs');
//    var availID = $('.availPlyrs:hidden').filter(':first');
//    $(availID).show();
//    $(availID).text($(id_src).text());
//    $(id_src).hide();
  });
***/
 
});


$(document).on ('click', '.benchPlyrs',  function() { 
  $(this)
    .remove()
    .toggleClass('benchPlyrs crtPlyrs')
    .appendTo('#servers');
});

$(document).on ('click', '.crtPlyrs',  function() { 
  $(this)
    .remove()
    .toggleClass('benchPlyrs crtPlyrs')
    .appendTo('#bench');
});








