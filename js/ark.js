setInterval('json.load()',50000);
var notification;
var dataJson;
var json = (function() {
return{
	load:function(event){
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
			if( jQuery.inArray( user, clan_users ) == -1){
				json.notifica(user,tiempo)
			}
		}
				
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

var clan_users = new Array();
clan_users[0] = "edagar"
clan_users[1] = "Gassad"