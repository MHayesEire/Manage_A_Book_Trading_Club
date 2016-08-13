//alert("connected");
/////////

$(document).ready(function() {
    //alert("JQ connected");
    validateForm1();
    validateForm2();
    validateForm3();
    requests();
    

    

});

 function validateForm1() {
$('#btn1changes').click(function(){
  //  alert("HERE");
   if($('#city1').val() == '' || $('#state1').val() == '' ){
      alert('Field can not be left blank!');
      return false;
   }
});
}

 function validateForm2() {
$('#btn2changes').click(function(){
    //alert("HERE");
   if($('#pw1').val() == '' || $('#pw2').val() == '' ){
      alert('Password Field can not be left blank!');
      return false;
   }
});
}

 function validateForm3() {
$('#btnBook').click(function(){
    //alert("HERE");
   if($('#book1').val() == '' ){
      alert('Book Title Field can not be left blank!');
      return false;
   }
});
}

function requests(){
    $(".trade1").hide();
    $(".trade2").hide();
    $('.btntradeyou').click(function() {
       //alert("here");
      // populateDiv();
      $(".trade2").hide();
        $(".trade1").toggle();
        
    });
   $('.btntradeother').click(function() {
       $(".trade1").hide();
       $(".trade2").toggle();
       
    });  
}