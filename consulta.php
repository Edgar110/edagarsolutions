<?php
$data = file_get_contents("https://arkservers.net/api/query/72.251.237.153:27019");
$products = json_decode($data, true);
 $data = array();
	 $i=0;
foreach ($products as $product) {
	$data[$i] =$product;
        $i++;
    
	
}
echo json_encode($data);
?>


