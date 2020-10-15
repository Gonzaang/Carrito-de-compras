$(function (){
    $('#boton-vaciar').click ( function (e) {
        e.preventDefault () 
        alert ("Esperamos tu compra!");
})
});
$(function (){
    $('#10off').hide();
})
$(function (){
    $('#oferta').click (function() {
        $('#10off').show('slow')
    })
})




