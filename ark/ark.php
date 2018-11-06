<?php
//if(!($iden = mysql_connect("localhost", "edgar", "1")))
// produccion
if(!($iden = mysql_connect("localhost", "usuarioedagar", "01091988fch"))) 
    die("Error: No se pudo conectar");
if(!mysql_select_db("gastos", $iden)) 
 //if(!mysql_select_db("usuarios_ark", $iden)) 
    die("Error: No existe la base de datos"); 
	
$consulta=$_REQUEST['type'];

if($consulta=='insert'){
	$hors_ins=$_REQUEST['h'];
	$name_ins=$_REQUEST['n'];
	$sql = "INSERT INTO usuarios (user_name,user_horas)
	VALUES ('$name_ins', '$hors_ins')";
	mysql_query($sql);
	if(!$sql){
	}else{
      echo 'inserte';
	}
	
	
}elseif($consulta=='consulta'){
	$name=$_REQUEST['usuario'];
    $sentencia = "SELECT * FROM usuarios where user_name='$name'";
    
	$result = mysql_query("SELECT * FROM usuarios where user_name='$name'");
		if($row = mysql_fetch_array($result)){
			 if($row["user_name"] == $name){
				print_r($row["user_name"]);
				echo ",";
				print_r($row["user_horas"]);	
			die();
			 } 
		}else{
				 echo "no existe usuario"; 
			 }
		
}elseif($consulta=='modifica'){
	$hors_ins=$_REQUEST['h'];
	$name_ins=$_REQUEST['n'];
	$sql = "UPDATE usuarios SET user_horas ='$hors_ins'  WHERE user_name ='$name_ins'";
	mysql_query($sql);
	if(!$sql){
	}else{
      echo 'modifique';
	}
	
}elseif($consulta=='envia_reporte'){
		$name=$_REQUEST['usuario'];
    $sentencia = "SELECT * FROM usuarios";
    
	$result = mysql_query("SELECT * FROM usuarios where user_name='$name'");
		mail("feso7ico@gmail.com",$result);

		$sentencia ="delete from usuarios";	
	mysql_query($sentencia);
	if(!$sentencia){
		echo 'error';
	}else{
      echo 'modifique presupuesto';
	}
	
}elseif($consulta=='modificar_p'){
	$NewPresupuesto =$_REQUEST['prep_new'];
	// $NewPresupuesto = intval($NewPresupuesto); 
	$sentencia ="UPDATE  presupuesto SET  presupuesto ='$NewPresupuesto' WHERE 1";	
	mysql_query($sentencia);
	if(!$sentencia){
		echo 'error';
	}else{
      echo 'modifique presupuesto';
	}
}	
mysql_close($iden);
?>