<!doctype html>
<head>
<head>
<meta charset="UTF-8">
<meta name="author" content="Edgar Molina">
<meta name="viewport" content="width=device-width, user-scalable=no">
	<title>ed-edw solutions	</title>  
  <script type="text/javascript" src="js/gastos.js"></script>		
  <script type="text/javascript" src="js/jquery-1.8.3.js"></script>
 <script type="text/javascript" src="js/jquery.mobile-1.4.5.min.js"></script>
 
	<link rel="stylesheet" type="text/css" href="css/gastos.css">
</head>  
<body >
  <h1>CONTROL DE GASTOS Y PRESUPUESTO</h1>

  <div data-role="main" class="ui-content">
	  <div id="OK" class="mensaje" style="display:none"><p>saassasa</p></div>
     <input type="text" id="g_name" name="fname" placeholder="descripcion"/>
	 <input type="number" id="g_monto" name="fname" placeholder="monto"/>
	  <input id="presupuesto" style="display:none"/>
	  <select name="select-choice-0" class="add gasto_tc" onchange="field()" id="select-choice-5">
   <option value="false">Gasto Comun</option>
   <option value="true">Gasto TC</option>
</select>
	  <button class="add" onclick="gastos.add()" type="submit">Agregar Gasto</button>
	  <h2>OTRAS OPERACIONES</h2>
<select name="select-choice-0" class="add" onchange="field()" id="select-choice-1">
   <option value="default_">Elige Acción</option>
   <option value="gasto_day">Gastos del día</option>
   <option value="presupuesto">Modificar Presupuesto</option>
   <option value="all_gastos">Todos los gastos</option>
   <option value="gastos_date">Gasto por fecha</option>
   <option value="gastos_tc">Gastos tc</option>
   
</select>
  <button class="add" onclick="gastos.traer()" type="submit">Ejecutar</button>
   <table data-role="table" class="ui-responsive">
   <div class="total">Haz gastado:<span id="total_g" style="padding-left: 10px;padding-right: 13px;"></span>presupuesto dia:<span id="total_p" style="padding-left: 10px;padding-right: 13px;"></span>Gasto total en tc:<span id="gasto_tot_tc" style="padding-left: 10px;padding-right: 13px;"></span>presupuesto total:<span id="presupuesto_tot" style="padding-left: 10px;padding-right: 13px;"></span><div/>
   <input style="display:none" type="text" id="g_fecha" name="fname" placeholder="introduce fecha formato mm/dd "/> 	
   <input style="display:none" type="number" id="g_Presupuesto" name="fname" placeholder="introduce nuevo presupuesto"/>	
  <thead class="ttitle_th">
	 <tr>
          <th>No Gasto</th>
          <th>Gasto Name</th>
          <th>Monto</th>
          <th>Fecha</th>
		  <th>hora y Día</th>
     </tr>
	</thead>
	 <tbody id="datos_des">
	 </tbody>
    </table>
  </div>
		
        
        
          
         
      
	
 
   
</body> 
