<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Menu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/ok.css">
    <link rel="stylesheet" href="../jqueryui/jquery-ui.css">

</head>
<body data-spy="scroll" data-target=".bs-docs-sidebar">
<div align="center">
<table width="80%" border="1">
  <tr>
    <td>
    <div id="navbar-example" class="navbar navbar-static">
      <div class="navbar-inner">
        <div class="container" style="width: auto;">
          <ul class="nav" role="navigation">
          <li class="dropdown">
           <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Movimientos<b class="caret"></b></a>
           <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
           <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarRetiros.html" target="admin">Ver Retiros</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/Retiros.html" target="admin">Retiros</a></li>
            <li role="presentation" class="divider"></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CorteCaja.html" target="admin">Corte de Caja</a></li>
          </ul>
          </li>
          <li class="dropdown">
           <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Compras<b class="caret"></b></a>
           <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
            <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarCompras.html" target="admin">Ver Compras</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearCompras.html" target="admin">Compra Proveedor</a></li>
          </ul>
          </li>
          <li class="dropdown">
           <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Ventas<b class="caret"></b></a>
           <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
            <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarVentas.html" target="admin">Ver Ventas</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearVentas.html" target="admin">Crear Venta</a></li>
          </ul>
          </li>
            <li class="dropdown">
              <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Clientes<b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
                <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarClientes.html" target="admin">Buscar Clientes</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearClientes.html" target="admin">Crear Clientes</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" id="drop2" role="button" class="dropdown-toggle" data-toggle="dropdown">Inventarios<b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu" aria-labelledby="drop2">
                <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarProducto.html" target="admin">Buscar Producto</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearProducto.html" target="admin">Crear Producto</a></li>
                <li role="presentation" class="divider"></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarProveedor.html" target="admin">Buscar Proveedor</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearProveedor.html" target="admin">Crear Proveedor</a></li>
              </ul>
            </li>
             <li class="dropdown">
              <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Libro<b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
               <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarLibro.html" target="admin">Buscar Libro</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearLibro.html" target="admin">Crear Libro</a></li>
              </ul>
            </li>
              <li class="dropdown">
              <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Editorial/Género<b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
               <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarGenero.html" target="admin">Buscar Género</a></li>
               <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearGenero.html" target="admin"> Crear Género</a></li>
               <li role="presentation" class="divider"></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarEditorial.html" target="admin">Buscar Editorial</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearEditorial.html" target="admin">Crear Editorial</a></li>
              </ul>
            </li>
              <li class="dropdown">
              <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Autor<b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
               <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarAutor.html" target="admin">Buscar Autor</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearAutor.html" target="admin">Crear Autor</a></li>
              </ul>
            </li>
             <li class="dropdown">
              <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Usuarios/Empleados<b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
               <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarEmpleado.html" target="admin">Buscar Empleados</a></li>
               <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearEmpleado.html" target="admin">Crear Empleados</a></li>
               <li role="presentation" class="divider"></li>
               <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/BuscarUsuario.html" target="admin">Buscar Usuarios</a></li>
               <li role="presentation"><a role="menuitem" tabindex="-1" href="pages/CrearUsuario.html" target="admin">Crear Usuarios</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" id="drop2" role="button" class="dropdown-toggle" data-toggle="dropdown">Reportes<b class="caret"></b></a>
              <ul class="dropdown-menu">
              <li>
                <a href="#" class="trigger right-caret"><i class="icon-user"></i>Empleados</a>
                  <ul class="dropdown-menu sub-menu">
                    <li><a role="menuitem" tabindex="-1" target="admin" href="php/rptlistado_empleados.php"><i class="icon-th-list"></i> Lista de Empleados</a></li>
                  </ul>
              </li>
              <li>
                <a href="#" class="trigger right-caret"><i class="icon-user"></i>Clientes</a>
                  <ul class="dropdown-menu sub-menu">
                    <li><a role="menuitem" tabindex="-1" target="admin" href="php/rptlistado_cliente.php"><i class="icon-th-list"></i>Lista de Clientes</a></li>
                  </ul>
              </li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="php/rptlistado_proveedores.php" target="admin"><i class="icon-th-list"></i> 
                Listados de Proveedores</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="php/rptlistado_productos.php" target="admin"><i class="icon-th-list"></i> 
                Listado de Productos</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="php/rptestado_producto.php" target="admin"><i class="icon-th-list"></i> 
                Estado de Inventario</a></li>
              </ul>
            </li>
            <figure> <img src="img/libro.jpg" width="50"></figure>
           <ul class="nav pull-right">
            <li id="menu" class="dropdown">
              <a href="#" id="drop3" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-user"></i> Hola!<b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu" aria-labelledby="drop3">
                <li role="presentation"><a role="menuitem" tabindex="-1" href="php/cerrar_sesion.php"><i class="icon-off"></i> Salir</a></li>
              </ul>
            </li>
          </ul>  
          </ul>
        </div>
      </div>
    </div>
    </td>
  </tr>
  <tr>
    <td><iframe src="pages/CrearVentas.html" frameborder="0" scrolling="auto" name="admin" width="100%" height="500"></iframe></td>
  </tr>
    <tr>
    <td>
    <pre><center><strong>Distribuciones y Representaciones Arvizu</strong></center></pre>
    </td>
  </tr>
</table>
    <div class="" id="mensajealta" title="Alerta">
      <span class="ui-icon-red ui-icon-alert" style: "float: left; margin-right: .2em;"></span>
        <center><strong>Acceso Restringido.</strong></center>
    </div>
    <script src="js/jquery.js"></script>
    <script src="../jqueryui/jquery-ui.min.js"></script>
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <script src="js/menu.js"></script>
</body>
</html>