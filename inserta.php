<?php
//if(!($iden = mysql_connect("localhost", "1", "1")))
// produccion
if(!($iden = mysql_connect("localhost", "usuarioedagar", "01091988fch"))) 
    die("Error: No se pudo conectar");
 if(!mysql_select_db("gastos", $iden)) 
    die("Error: No existe la base de datos"); 
	
$consulta=$_REQUEST['type'];
$gasto_tc=$_REQUEST['gasto_tar'];
if($consulta=='insert'){
	$monto=$_REQUEST['m'];
	$des=$_REQUEST['n'];
	$date=$_REQUEST['d'];
	$tiempo=$_REQUEST['t'];
	$sql = "INSERT INTO gastos_table (descripcion, monto, fecha,tiempo)
	VALUES ('$des', '$monto', '$date','$tiempo')";
	mysql_query($sql);
	if(!$sql){
	}else{
      echo 'inserte';
	}
	if($gasto_tc == "true"){
	$sql = "INSERT INTO gastos_table_tc (descripcion, monto, fecha,tiempo)
	VALUES ('$des', '$monto', '$date','$tiempo')";
	mysql_query($sql);
	if(!$sql){
	}else{
      echo 'inserte en tc';
	}	
	}
	
}elseif($consulta=='query_day'){
	$fecha=$_REQUEST['dia'];
    $sentencia = "SELECT * FROM gastos_table where fecha='$fecha'";
    $resultado = mysql_query($sentencia, $iden); 
    if(!$resultado) 
    die("Error: no se pudo realizar la consulta");
     $data = array();
	 $i=0;
	while($fila = mysql_fetch_assoc($resultado)) 
	{
		$data[$i] = $fila;
        $i++;
	} 
	$myarray = $data;
	echo json_encode($myarray);
		
}elseif($consulta=='query_tc'){
	$dia=$_REQUEST['dia'];
	$month=$_REQUEST['mes'];
	
    $sentencia = "SELECT * FROM gastos_table_tc " ;
    $resultado = mysql_query($sentencia, $iden); 
    if(!$resultado) 
    die("Error: no se pudo realizar la consulta");
     $data = array();
	 $i=0;
	while($fila = mysql_fetch_assoc($resultado)) 
	{
		$data[$i] = $fila;
        $i++;
	} 
	$myarray = $data;
	echo json_encode($myarray);
		
}elseif($consulta=='presupuesto'){
	$sentencia = "SELECT * FROM presupuesto where id=1";
	 $resultado = mysql_query($sentencia, $iden);
	 $data = array();
	 $i=0;
	 while($fila = mysql_fetch_assoc($resultado)) 
	{
		$data[$i] = $fila;
	} 
	$myarray = $data;
	echo json_encode($myarray);	
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
mail("feso7ico@gmail.com","Accion completada correctamente","tu accion se ejecuto en gastos web app")
?>
