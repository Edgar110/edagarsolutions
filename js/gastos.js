var gastos = new Object();var d = new Date();var dia_hoy = d.getDate();var month = d.getMonth();var sumt = 0;var pres,p_total,restantes,monto,accion;
month = month + 1;
gastos.add = function(){
	var intarjeta = $("#select-choice-5").val()
	var week = d.getDay();
	var name = $("#g_name").val();
	monto = $("#g_monto").val();
	if(name  == ""|| monto == ""){gastos.mensajes("OK","Llena los Campos");return false; }
	var day = d.getDate();
	var hr = d.getHours() + ":" + d.getMinutes();
	if(week == 1){week = "lunes"};if(week == 2){week = "martes"};if(week == 3){week = "miercoles"};if(week == 4){week = "jueves"};if(week == 5){week = "viernes"};if(week == 6){week = "sabado"};if(week == 0){week = "domingo"}
	var fecha = month + "/" + day ; 
	var time =  week + " " + hr;
	$.get("inserta.php",{n:name,m:monto,d:fecha,t:time ,type:"insert",gasto_tar:""+intarjeta+""}, function (respuesta) {
	if(respuesta=="inserte"){
		gastos.mensajes("OK","Quedo registrado valedor")
	}else{
		gastos.mensajes("OK","Intentalo mas tarde")
	}
	}); 	
	$("#g_name").val(''); $("#g_monto").val('');
	gastos.presupuesto("gasto");

	
}
var id = new Array();
var desc = new Array();
var mont = new Array();
var fecha = new Array();
var elementos;
gastos.traer = function(){
$("#datos_des").html("")
accion = $("#select-choice-1").val();
switch(accion) {
  case "default_":
	gastos.mensajes("OK","Elige una Opción")
  break;
  case "gasto_day":
  gastos.presupuesto();
	var week = d.getDate();
	var today = month+"/"+week;
	$.ajax({
        type: "POST",
        url:"inserta.php?type=query_day&dia="+today+"",
		async: true,
        success: function(datos){
            var dataJson = eval(datos);
			$.each(dataJson,function(i,valor){ 
			id.push(valor.id_gasto)
			desc.push(valor.descripcion)			
			mont.push(valor.monto)
			var suma = parseInt(valor.monto)
			sumt = suma + sumt;
		    elementos = elementos + "<tr><td>"+valor.id_gasto+"</td><td>"+valor.descripcion+"</td><td>"+valor.monto+"</td><td>"+valor.fecha+"</td><td>"+valor.tiempo+"</td></tr>"
			gastos.mensajes("OK","consulta exitosa")
			});
			$("#datos_des").html(elementos)
			$("#total_g").html(sumt);
        },
        error: function (){
            gastos.mensajes("OK","fallo query")
        }
	});
    
	
			
	break;
	
	
	case "presupuesto":
	  var new_p = $("#g_Presupuesto").val()		
	  new_p = parseInt(new_p);
	  gastos.UpdateP(new_p);
	break;
	case "all_gastos":
		
		$.ajax({
        type: "POST",
        url:"inserta.php?type=query",
		async: true,
        success: function(datos){
            var dataJson = eval(datos);
			$.each(dataJson,function(i,valor){ 
			id.push(valor.id_gasto)
			desc.push(valor.descripcion)			
			mont.push(valor.monto)
			var suma = parseInt(valor.monto)
			sumt = suma + sumt;
		    elementos = elementos + "<tr><td>"+valor.id_gasto+"</td><td>"+valor.descripcion+"</td><td>"+valor.monto+"</td><td>"+valor.fecha+"</td><td>"+valor.tiempo+"</td></tr>"
			gastos.mensajes("OK","consulta exitosa")
			});
			$("#datos_des").html(elementos)
			$("#total_g").html(sumt);
        },
        error: function (){
            gastos.mensajes("OK","fallo query")
        }
		});
	break;
	case "gastos_date":
	sumt = 0;
	var today_e = $("#g_fecha").val();
	var find = '0';
	var re = new RegExp(find, 'g');
	today_e = today_e.replace(re, "");
		$.ajax({
        type: "POST",
        url:"inserta.php?type=query_day&dia="+today_e+"",
		async: true,
        success: function(datos){
            var dataJson = eval(datos);
			$.each(dataJson,function(i,valor){ 
			id.push(valor.id_gasto)
			desc.push(valor.descripcion)			
			mont.push(valor.monto)
			var suma = parseInt(valor.monto)
		    sumt = suma + sumt;
		    elementos = elementos + "<tr><td>"+valor.id_gasto+"</td><td>"+valor.descripcion+"</td><td>"+valor.monto+"</td><td>"+valor.fecha+"</td><td>"+valor.tiempo+"</td></tr>"
			gastos.mensajes("OK","consulta exitosa")
			});
			$("#datos_des").html(elementos)
			$("#total_g").html(sumt);
        },
        error: function (){
            gastos.mensajes("OK","fallo query")
        }
	});
	break;
	case "gastos_tc":
	sumt = 0;
		$.ajax({
        type: "POST",
        url:"inserta.php?type=query_tc&dia="+dia_hoy+"&mes="+month,
		async: true,
        success: function(datos){
            var dataJson = eval(datos);
			$.each(dataJson,function(i,valor){ 
			id.push(valor.id_gasto)
			desc.push(valor.descripcion)			
			mont.push(valor.monto)
			var suma = parseInt(valor.monto)
		    sumt = suma + sumt;
		    elementos = elementos + "<tr><td>"+valor.id_gasto+"</td><td>"+valor.descripcion+"</td><td>"+valor.monto+"</td><td>"+valor.fecha+"</td><td>"+valor.tiempo+"</td></tr>"
			gastos.mensajes("OK","consulta exitosa")
			});
			$("#datos_des").html(elementos)
			$("#gasto_tot_tc").html(sumt);
        },
        error: function (){
            gastos.mensajes("OK","fallo query")
        }
	});
	break;

	// $.ajax({
        // type: "POST",
        // url:"inserta.php?type=query",
		// async: true,
        // success: function(datos){
            // var dataJson = eval(datos);
			// $.each(dataJson,function(i,valor){ 
			// id.push(valor.id_gasto)
			// desc.push(valor.descripcion)			
			// mont.push(valor.monto)
			// fecha.push(valor.fecha)
		    // elementos = elementos + "<tr><td>"+valor.id_gasto+"</td><td>"+valor.descripcion+"</td><td>"+valor.monto+"</td><td>"+valor.fecha+"</td><td>"+valor.tiempo+"</td></tr>"
			// gastos.mensajes("OK","consulta exitosa")
			// });
        // },
        // error: function (){
            // gastos.mensajes("OK","fallo query")
        // }
// });
	
	}
}
gastos.UpdateP = function(p){
	
	$.get("inserta.php",{prep_new:p ,type:"modificar_p"}, function (respuesta) {
	if(respuesta=="modifique presupuesto"){
		gastos.mensajes("OK","Presupuesto actualizado")
	}else{
		gastos.mensajes("OK","Intentalo mas tarde")
	}
	});
}
gastos.presupuesto = function (req){
	$.ajax({
        type: "POST",
        url:"inserta.php?type=presupuesto",
		async: true,
        success: function(res){
			var pr;
            var dataJson = eval(res);
			pr = dataJson[0].presupuesto;
			pr = parseInt(pr)
			$("#presupuesto").val(pr)
			
			if(req == "gasto"){
					var presupuestot = $("#presupuesto").val();
					presupuestot = parseInt(presupuestot);
					monto = parseInt(monto);
					presupuestot = presupuestot - monto;
					gastos.UpdateP(presupuestot);
					$("#presupuesto_tot").html(presupuestot);
			}else{gastos.pinta_pres()}
        },
        error: function (){
            gastos.mensajes("OK","fallo query")
        }
	});
}
gastos.pinta_pres = function(){
	var week = d.getDate();
	var restantes;
	if(week<15){
		restantes = 15 - week;
	}else{
	restantes = 30 - week;
	}
	var p_datbase = $("#presupuesto").val()
			p_datbase = parseInt(p_datbase)
			$("#presupuesto_tot").html(p_datbase);
			var p_dia = p_datbase/restantes;
			p_total = p_dia - sumt;
			$("#total_p").html(p_total);
}
gastos.mensajes = function(id,mensaje){
$("#"+id+"").html(mensaje);
$("#"+id+"").show();
$("#"+id+"").delay(2000).hide(300);
}
function field(){
accion = $("#select-choice-1").val();
switch(accion) {
  case "gastos_date":
	$("#g_fecha").show()
	$("#g_Presupuesto").hide()
  break;
  case "presupuesto":
	$("#g_Presupuesto").show()
	 $("#g_fecha").hide()
  break;
   default:	
   $("#g_fecha").hide()
   $("#g_Presupuesto").hide()
   }
}