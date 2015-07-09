<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Menu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">

</head>
<body data-spy="scroll" data-target=".bs-docs-sidebar">
<div align="center">
<table width="80%" border="0">
  <tr>
    <td>
    <div id="navbar-example" class="navbar navbar-static">
      <div class="navbar-inner">
        <div class="container" style="width: auto;">
          <a class="brand" href="empresa.php" target="admin">Administrador</a>
          <a class="brand" href="caja.php?ddes=0" target="admin">Ventas</a>
          <ul class="nav" role="navigation">
            <li class="dropdown">
              <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Clientes <b class="caret"></b></a>
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
              <ul class="dropdown-menu" role="menu" aria-labelledby="drop2">
                <li role="presentation"><a role="menuitem" tabindex="-1" href="PDFclientes.php" target="admin"><i class="icon-th-list"></i> 
                Listado de Usuarios</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="PDFproveedores.php" target="admin"><i class="icon-th-list"></i> 
                Listados de Proveedores</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="PDFproducto.php" target="admin"><i class="icon-th-list"></i> 
                Listado de Productos</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="PDFestado_inventario.php" target="admin"><i class="icon-th-list"></i> 
                Estado de Inventario</a></li>

              </ul>
            </li>
          </ul>
          <ul class="nav pull-right">
            <li id="fat-menu" class="dropdown">
              <a href="#" id="drop3" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-user"></i> Hola!<b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu" aria-labelledby="drop3">
                <li role="presentation"><a role="menuitem" tabindex="-1" href="cambiar_clave.php" target="admin"><i class="icon-refresh"></i> Cambiar Contraseña</a></li>
                <li role="presentation" class="divider"></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="php_cerrar.php"><i class="icon-off"></i> Salir</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </td>
  </tr>
  <tr>
    <td><iframe src="" frameborder="0" scrolling="auto" name="admin" width="100%" height="500"></iframe></td>
  </tr>
    <tr>
    <td>
    <pre><center><strong>Distribuciones y Representaciones Arvizu</strong></center></pre>
    </td>
  </tr>
</table>
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap/bootstrap-transition.js"></script>
    <script src="js/bootstrap/bootstrap-alert.js"></script>
    <script src="js/bootstrap/bootstrap-modal.js"></script>
    <script src="js/bootstrap/bootstrap-dropdown.js"></script>
    <script src="js/bootstrap/bootstrap-scrollspy.js"></script>
    <script src="js/bootstrap/bootstrap-tab.js"></script>
    <script src="js/bootstrap/bootstrap-tooltip.js"></script>
    <script src="js/bootstrap/bootstrap-popover.js"></script>
    <script src="js/bootstrap/bootstrap-button.js"></script>
    <script src="js/bootstrap/bootstrap-collapse.js"></script>
    <script src="js/bootstrap/bootstrap-carousel.js"></script>
    <script src="js/bootstrap/bootstrap-typeahead.js"></script>
    <script src="js/bootstrap/bootstrap-affix.js"></script>
    <script src="js/holder/holder.js"></script>
</body>
</html>