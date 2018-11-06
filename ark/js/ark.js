$( document ).ready(function() {
    console.log( json.load());
});
setInterval('json.load()',50000);
var notification;
var dataJson;
var res;
var listadeusuarios = new Array();
var listadetiempos = new Array();
var date = new Date();
var json = (function() {
return{
	load:function(event){
		if(date.getHours() == 24){
			if(date.getMinutes() > 0 && date.getMinutes() < 20){
			$.get("ark.php",{type:"envia_reporte"}, 
				function (respuesta) {
			});	
			}
		}
			
		listadeusuarios=[];
		listadetiempos=[];
		$.ajax({
        type: "POST",
        url:"consulta.php",
		async: true,
        success: function(datos){
         console.log(datos) 
		  dataJson = eval(datos);
		 }
		});
		 setTimeout(function(){json.leer()},3000);
	},
	leer:function(){
		if(dataJson[0].Players == 0){return}
		for(var i=0;i<dataJson[0].Players;i++){
			var user = dataJson[1][i].Name
			var tiempo = dataJson[1][i].TimeF
			listadeusuarios.push(user);
			listadetiempos.push(tiempo);
			if( jQuery.inArray( user, clan_users ) == -1){
				//json.notifica(user,tiempo)
			}
		}
		buscausuario();
				
 	},
	notifica:function(usuario,tiempo){
		document.addEventListener('DOMContentLoaded', function () {
		if (Notification.permission !== "granted")
		Notification.requestPermission();
		});

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    notification = new Notification('¡¡intruso en el server llamado "'+usuario+'"', {
      icon: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRnLDzPrsn9bGPz8-2k0DSVGAld-QM3EcZ2IBP4Zzr6tewIXNoJ',
      body: "lleva "+tiempo+" conectado matalo",
    });

    notification.onclick = function () {
      window.open("https://arkservers.net/server/72.251.237.153:27019");      
    };

  }
	setTimeout(function(){notification.close()},10000);
	},
	Agrega:function(){
		
		
	}
}	
})()
var player = function (nombre,horas){
	this.name = new String(nombre);
	this.horas = new String(horas);
	
}
function buscausuario(){
	
	$.each(listadeusuarios, function(i,valor){
		
	if(valor != ""){	
		$.ajax({
        type: "POST",
        url:"ark.php?type=consulta&usuario="+valor+"",
		async: false,
        success: function(respuesta){
			var datos = respuesta.split(",");
			if(listadeusuarios[i] == datos[0]){
				var time = datos[1];
				listadetiempos[i]
				
				var timeserver = time.split(":");
				var timeactual = listadetiempos[i].split(":");
				
				var compact,compserver;
				
				if(timeserver.length == 1){timeserver = compact=timeserver[0]}
				if(timeserver.length == 2){
					var first = parseInt(timeserver[0]);
					var second = parseInt(timeserver[1]);
					second = second * 60;
					compact =  first + second;
					
				}
				if(timeserver.length == 3){
					var first = parseInt(timeserver[0]);
					var second = parseInt(timeserver[1]);
					second = second * 60;
					var third = parseInt(timeserver[2]);
					third = (third * 60) * 60; 
					compact = first + second + third;
				}
				//valida tiempo actual
				if(timeactual.length == 1){timeactual = compserver=timeactual[0]}
				if(timeactual.length == 2){
					var first = parseInt(timeactual[0]);
					var second = parseInt(timeactual[1]);
					second = second * 60;
					compserver =  first + second;
					
				}
				if(timeactual.length == 3){
					var first = parseInt(timeactual[0]);
					var second = parseInt(timeactual[1]);
					second = second * 60;
					var third = parseInt(timeactual[2]);
					third = (third * 60) * 60; 
					compserver = first + second + third;
				}
				var timefinal;
				if (compact > compserver){
				}else{
					timefinal = compserver + compact;
				}
				
				var tiempofinal
				$.get("ark.php",{n:valor,h:timefinal,type:"modifica"}, 
				function (respuesta) {
			});
			}else{
			
			$.get("ark.php",{n:valor,h:listadetiempos[i],type:"insert"}, 
				function (respuesta) {
			});		
			}
						
		},
        error: function (){
            gastos.mensajes("OK","fallo query")
        }
	});
	}
	});

	
	
}



var clan_users = new Array();
clan_users[0] = "edagar"
clan_users[1] = "Gassad"