//globales
var datos;
$( document ).ready(function() {
   $(".c_inactive").eq(0).addClass("c_active")
});

jQuery( document ).ready(function( $ ) {
	$("#group4").colorbox({iframe:true, innerWidth:640, innerHeight:390});
	//$(".group4").trigger( "click" );
	$("#tabs-3").css("display","none")
	$("#tabs-2").css("display","none")
	
});

$( "#tabs2" ).click(function() {
	$("#tabs-1").css("display","none");$("#tabs-3").css("display","none");$("#tabs-2").css("display","block");
});

$( "#tabs3" ).click(function() {
	$("#tabs-1").css("display","none");$("#tabs-2").css("display","none");$("#tabs-3").css("display","block");
});

$( "#tabs1" ).click(function() {
	$("#tabs-2").css("display","none");$("#tabs-3").css("display","none");$("#tabs-1").css("display","block");
});
$( ".prev" ).click(function() {
var $last = $('.carr div:last');
    $last.remove().css({ 'margin-left': '+1000px' });
    $('.carr div:first').before($last);
    $last.animate({ 'margin-left': '0px' }, 500); 
});

$( ".next" ).click(function() {
 var $first = $('.carr div:first');
    $first.animate({ 'margin-left': '+1000px' }, 500, function() {
        $first.remove().css({ 'margin-left': '0px' });
        $('.carr div:last').after($first);
    });

});

var carrusel = new Object();{

carrusel.derecha = function(t) {
		if(t<2){
		var num = $(".c_active").text();$(".c_inactive").removeClass("c_active");if(num=="1"){$(".c_inactive").eq(1).addClass("c_active")}else if(num=="2"){$(".c_inactive").eq(2).addClass("c_active")}
		$("#carrusel").find( "ul" ).animate({
		left: "-=953"	
		
		})}else{  $("#carrusel").find( "ul" ).animate({
		left: "0" 
		});$(".c_inactive").removeClass("c_active");$(".c_inactive").eq(0).addClass("c_active")
		}
}
carrusel.izquierda = function(t) { 
		$("#carrusel").find( "ul" ).animate({
		left: "+=953"	
		})
};

}
  var time=0;setInterval('carrusel.derecha(time)',5000);setInterval('if(time==2){time=0}else{time=time+1;}',5000);

  var hospitales = new Object();{
	hospitales.leerdatos = function(){
		$.ajax({
		dataType: "json",
		url:"json/hospitales.json",
		data: "",
		success:function(respuesta) {
			$.each(respuesta.res, function(i,valor){
				datos.nombre.push(valor.name)
				datos.dir.push(valor.description)
				datos.cordenadas.push(valor.coordinates)
				var temp = datos.delegaciones.indexOf(valor.Delegación)
				if(temp == -1 ){
				$("#del").append('<option>'+valor.Delegación+'</option>');}
				datos.delegaciones.push(valor.Delegación)
				// console.log(valor.name)
				
			});
		}
		});
	}
	hospitales.datos = function() {
			 datos =  new Array();
			datos.delegaciones = new Array();
			datos.nombre = new Array();
			datos.dir = new Array();
			datos.cordenadas = new Array();	
	}
	hospitales.muestra = function(){
		$("#del").change(function(){
            var del = $('#del').val()
			$(".table tbody").html("");
			var elementos;
			$.each(datos.delegaciones, function(i,delegacion){
				if(del == delegacion){
				elementos = elementos + "<tr><td>"+datos.nombre[i]+"</td><td>"+datos.dir[i]+"</td><td>"+datos.delegaciones[i]+"</td><td><a class='cmapa' onclick='hospitales.movemapa(\""+datos.cordenadas[i]+"\")'>ver mapa</a></td><td>"+datos.cordenadas[i]+"</td></tr>"
				 console.log(datos.nombre[i])
				 console.log(datos.dir[i])
				 console.log(datos.delegaciones[i])
				 console.log(datos.cordenadas[i])
				}
			});
			$(".table tbody").html(elementos)
		});
	}
	hospitales.movemapa = function(cordenada){
        var zoom = 18;
		var part = cordenada.indexOf(',')
		var lon = cordenada.slice(0,part);
	    var cordenda2 = cordenada.slice(part + 1)
		part = cordenda2.indexOf(',')
		var lat = cordenda2.slice(0,part);
		lat =  parseFloat(lat)
		lon =  parseFloat(lon)
		var mapOptions = {
          center: { lat: lat, lng: lon},
          zoom: zoom
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
       google.maps.event.addDomListener(window, 'load', initialize);
	}
  }
