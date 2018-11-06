$("#add_propietario").click(function() {
	$("#container_prop").append('<input type="text" class="form-control propietarios"  placeholder="ENTER PROPIETARIO">');	
});	
$("#add_propietario").click(function() {
	$("#container_prop").append('<input type="text" class="form-control propietarios"  placeholder="ENTER PROPIETARIO">');	
});	
$(".options-menu ul li").click(function() {
	var i = $(this).index()
	$(".ed-contendor").hide();
	$(".cont"+i+"").show();
	
});	
var dat = new Array()
var c_vacio = new RegExp("^\s*$");
var mac = new RegExp("^\s*$");
var formulario = {
	enviar: function(){
		$.each($(".cont1 input"), function( index, value ) {
			var dato = $(this).val();
			formulario.validaciones($(this).attr("id"));
			// if(dato	== "" ||dato == undefined){
				// $(this).css("border","1px solid #FF0000")
				// var element = $(this).siblings("span");
				// element.show();
				// element.css("color","#FF0000");
				// element.html("X")
			// }else{
				// var validation = $(this).attr("id");	
				// formulario.validaciones(validation);
			// }
		});
		formulario.validaciones("sel_idf");
		
		
	},
	validaciones: function(campo){	
	 
	switch(campo) {
    case "inp_mac":
		var inp = $("#"+campo+"")
		if(c_vacio.test(inp.val())){
			formulario.error(campo); return false;	
			
		}else{
			formulario.limpiaerror(campo);
				
		}
			
    break;
    case "inp_ip":
         var inp = $("#"+campo+"")
		if(c_vacio.test(inp.val())){
			formulario.error(campo); return false;	
		}else{
			formulario.limpiaerror(campo);
				
		}
    break;
	case "inp_area":
         var inp = $("#"+campo+"")
		if(c_vacio.test(inp.val())){
			formulario.error(campo); return false;	
		}else{
			formulario.limpiaerror(campo);
			
		}
    break;
	case "inp_prop":
         var inp = $("#"+campo+"")
		if(c_vacio.test(inp.val())){
			formulario.error(campo); return false;	
		}else{
			formulario.limpiaerror(campo);		
		}	
    break;
	case "inp_ubic":
         var inp = $("#"+campo+"")
		if(c_vacio.test(inp.val())){
			formulario.error(campo); return false;	
		}else{
			formulario.limpiaerror(campo);
				
		}
    break;
	case "inp_nodo":
         var inp = $("#"+campo+"")
		if(c_vacio.test(inp.val())){
			formulario.error(campo); return false;	
		}else{
			formulario.limpiaerror(campo);
				
		}
    break;
	case "sel_idf":
         var inp = $("#"+campo+"").val()
		if(inp == "Seleccionar"){
			formulario.error(campo); return false;	
		}else{
			formulario.limpiaerror(campo);
		}
    break;
	
    default:
        
	 }

	 	
	},
	enviarfinal: function(){
		if($(".unready").size() == 0){formulario.enviar_dat()}	
	},
	enviar_dat: function(){
		
		console.log("send")
		dat[0] = $("#inp_mac").val();
		dat[1] = $("#inp_ip").val();
		dat[2] = $("#inp_area").val();
		var prop;
		$.each($(".propietarios"), function( index, value ){
				prop = prop + "," + $(this).val(); 
			});
		dat[3] = prop;
		dat[4] = $("#inp_ubic").val();
		dat[5] = $("#inp_nodo").val();
		dat[6] = $("#sel_idf").val();
		var niv;
			$.each($( "input[name='st']" ), function( index, value ){
				if($(this).is(':checked')){ niv = niv +","+ $(this).val();} 
			});
		dat[7] = niv;
		
		
		$.get("motorgest.php",{
			NB:"gastos",
			m:dat[0],
			i:dat[1],
			ar:dat[2],
			prop:dat[3],
			ub:dat[4],
			nod:dat[5],
			idf:dat[6],
			bck:dat[7],
			}, 
				function (respuesta) {
					console.log(respuesta)
					alert("registro exitoso")
			});
	},
	limpiaerror: function(campo){
		$("#"+campo+"").css("border","none")
		$("#"+campo+"").removeClass("unready")
		var element = $("#"+campo+"").siblings("span");
		element.show();
		element.css("color","#00FF00");
		element.html("ok")	
		
	},
	error: function(campo){
		$("#"+campo+"").css("border","1px solid #FF0000");
		$("#"+campo+"").addClass("unready")
		var element = $("#"+campo+"").siblings("span");
		element.show();
		element.css("color","#FF0000");
		element.html("X")
	}
}
$( document ).ready(function() {
    $("input").focusout(function() { formulario.validaciones($(this).attr("id"));})
});
