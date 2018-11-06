<?php 
$nameBD="TomaTurno";
$operacion=$_REQUEST['op'];

$newbase = new baseDB;
$newbase->Abreconexion($nameBD);
if($operacion=="lecajas"){
	$consulta = "SELECT * FROM caja_catalog";
	$newbase->query($consulta);	
}elseif($operacion=="leeturnos"){
	$cajaid=$_REQUEST['cajaid'];
	$consulta = "SELECT * FROM caja where idcaja='$cajaid'";
	$newbase->query($consulta);
}
	

class baseDB{ 
   	var $basename;  
function Abreconexion($basename){ 
	//dev
	//if(!($iden = mysql_connect("localhost", "edgar", "1")))
	//prod
	 if(!($iden = mysql_connect("localhost", "usuarioedagar", "01091988fch"))) 
		die("Error: No se pudo conectar");
	
	if(!mysql_select_db($basename, $iden)) 
		die("Error: No existe la base de datos");  
		
} 

function query($consulta){ 
	 
    $resultado = mysql_query($consulta); 
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
}
}
?>

