-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-07-2015 a las 01:09:18
-- Versión del servidor: 5.6.24
-- Versión de PHP: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `venta_libros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE IF NOT EXISTS `autores` (
  `clave_autor` bigint(20) NOT NULL,
  `nombre_autor` varchar(30) COLLATE utf8_bin NOT NULL,
  `apellido_autor` varchar(30) COLLATE utf8_bin NOT NULL,
  `estado` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`clave_autor`, `nombre_autor`, `apellido_autor`, `estado`) VALUES
(1, 'jorge', 'bucay', 'ACTIVO'),
(2, 'carlos Cuahuctemoc', 'sanchez', 'ACTIVO'),
(3, 'vina', 'jackson', 'ACTIVO'),
(4, 'dante ', 'alighieri', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `matricula` bigint(20) NOT NULL,
  `empresa` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `nombre_contacto` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `apellido_paterno` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `apellido_materno` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `calle` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `numero` int(11) NOT NULL,
  `colonia` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ciudad` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `telefono` int(11) NOT NULL,
  `celular` int(11) NOT NULL,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` char(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`matricula`, `empresa`, `nombre_contacto`, `apellido_paterno`, `apellido_materno`, `calle`, `numero`, `colonia`, `ciudad`, `estado`, `telefono`, `celular`, `email`, `status`) VALUES
(1, '', 'cliente general', '', '', 'xx', 0, 'xx', 'xx', 'xx', 0, 0, 'null@null.com', 'ACTIVO'),
(2, 'ed', 'de', 'de', 'de', 'ed', 3, 'de', 'ed', 'BAJA', 3, 3, 'swswsw', 'BAJA'),
(3, 'fr', 'vfr', 'vr', 'vr', 'vr', 44444, 'frf', 'fffr', 'frfr', 2147483647, 2147483647, 'ejemplo@yo.com', 'ACTIVO'),
(5, 'librerÃ­a del sol', 'luis', 'perez', 'oso', 'lejana', 22, 'de', 'culiacan', 'sinaloa', 2222, 222, 'ejemplo@yo.com', 'ACTIVO'),
(6, 'libreria caracol', 'jorge', 'mendoza', 'lopez', 'muy lejana', 4040, 'mazatlan', 'mazatlan', 'sinaloa', 657154875, 657859545, 'caracol@gmail.com', 'ACTIVO'),
(7, 'librerÃ­a mÃ©xico', 'rosa', 'osuna', 'lopez', 'grande', 1515, 'centro', 'los mochis', 'sinaloa', 2147483647, 2147483647, 'yo@gmail.com', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE IF NOT EXISTS `compras` (
  `folio` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `proveedor` bigint(20) NOT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`folio`, `fecha`, `proveedor`, `total`) VALUES
(2015070001, '2015-07-17', 2, '700.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compra`
--

CREATE TABLE IF NOT EXISTS `detalle_compra` (
  `folio` bigint(20) NOT NULL,
  `clave_producto` bigint(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `detalle_compra`
--

INSERT INTO `detalle_compra` (`folio`, `clave_producto`, `cantidad`, `precio`, `subtotal`) VALUES
(2015070001, 3, 2, '150.00', '300.00'),
(2015070001, 4, 2, '200.00', '400.00');

--
-- Disparadores `detalle_compra`
--
DELIMITER $$
CREATE TRIGGER `entra_producto` AFTER INSERT ON `detalle_compra`
 FOR EACH ROW UPDATE productos SET cantidad_actual = cantidad_actual+new.cantidad 
WHERE clave_producto = new.clave_producto
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE IF NOT EXISTS `detalle_venta` (
  `folio` bigint(20) NOT NULL,
  `clave_producto` bigint(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `detalle_venta`
--

INSERT INTO `detalle_venta` (`folio`, `clave_producto`, `cantidad`, `precio`, `subtotal`) VALUES
(2015070001, 3, 1, '200.00', '200.00'),
(2015070001, 4, 2, '251.00', '502.00'),
(2015070002, 3, 1, '200.00', '200.00'),
(2015070002, 4, 2, '251.00', '502.00'),
(2015070003, 3, 3, '200.00', '600.00'),
(2015070007, 3, 1, '200.00', '200.00'),
(2015070007, 5, 2, '50.00', '100.00');

--
-- Disparadores `detalle_venta`
--
DELIMITER $$
CREATE TRIGGER `sale_producto` AFTER INSERT ON `detalle_venta`
 FOR EACH ROW UPDATE productos SET cantidad_actual = cantidad_actual-new.cantidad 
WHERE clave_producto = new.clave_producto
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `editoriales`
--

CREATE TABLE IF NOT EXISTS `editoriales` (
  `clave_editorial` bigint(20) NOT NULL,
  `nombre_editorial` varchar(30) COLLATE utf8_bin NOT NULL,
  `status` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `editoriales`
--

INSERT INTO `editoriales` (`clave_editorial`, `nombre_editorial`, `status`) VALUES
(1, 'tomo', 'ACTIVO'),
(2, 'oceano', 'ACTIVO'),
(3, 'rancho', 'BAJA'),
(4, 'patria', 'BAJA'),
(5, 'mega', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE IF NOT EXISTS `empleados` (
  `matricula` bigint(20) NOT NULL,
  `nombre` varchar(20) CHARACTER SET latin1 NOT NULL,
  `apellido_paterno` varchar(30) CHARACTER SET latin1 NOT NULL,
  `apellido_materno` varchar(30) CHARACTER SET latin1 NOT NULL,
  `calle` varchar(20) CHARACTER SET latin1 NOT NULL,
  `numero` int(5) NOT NULL,
  `colonia` varchar(30) CHARACTER SET latin1 NOT NULL,
  `ciudad` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `estado` varchar(30) CHARACTER SET latin1 NOT NULL,
  `telefono` char(10) CHARACTER SET latin1 NOT NULL,
  `celular` char(10) CHARACTER SET latin1 NOT NULL,
  `sueldo` char(5) CHARACTER SET latin1 NOT NULL,
  `tipo` char(10) CHARACTER SET latin1 NOT NULL,
  `status` char(10) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`matricula`, `nombre`, `apellido_paterno`, `apellido_materno`, `calle`, `numero`, `colonia`, `ciudad`, `estado`, `telefono`, `celular`, `sueldo`, `tipo`, `status`) VALUES
(1, 'jorge', 'leon', 'moreno', 'ececec', 33333, 'ecwecew', 'cewcwe', 'cececew', '3333333333', '3333333333', '1100', 'vent', 'ACTIVO'),
(2, 'felipe', 'monzÃ³n', 'mendoza', 'sindicalismo', 4818, 'infonavit barrancos', 'culiacan', 'sinaloa', '7123455', '6671234567', '5500', 'admin', 'ACTIVO'),
(3, 'luis', 'perez', 'oso', 'ececec', 33333, 'ecwecew', 'cewcwe', 'cececew', '3333333333', '3333333333', '1100', 'vent', 'BAJA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `folios`
--

CREATE TABLE IF NOT EXISTS `folios` (
  `id` bigint(20) NOT NULL,
  `nombre` char(10) COLLATE utf8_bin NOT NULL,
  `anio` int(11) NOT NULL,
  `consecutivo` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `folios`
--

INSERT INTO `folios` (`id`, `nombre`, `anio`, `consecutivo`) VALUES
(1, 'ventas', 2015, 7),
(4, 'compras', 2015, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE IF NOT EXISTS `generos` (
  `clave_genero` bigint(20) NOT NULL,
  `nombre_genero` varchar(20) COLLATE utf8_bin NOT NULL,
  `status` char(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`clave_genero`, `nombre_genero`, `status`) VALUES
(1, 'romance', 'ACTIVO'),
(2, 'terror', 'ACTIVO'),
(3, 'ClÃ¡sico literario', 'ACTIVO'),
(4, 'comedia', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE IF NOT EXISTS `libros` (
  `clave_libro` bigint(20) NOT NULL,
  `nombre_libro` varchar(50) COLLATE utf8_bin NOT NULL,
  `isbn` varchar(20) COLLATE utf8_bin NOT NULL,
  `genero` bigint(11) NOT NULL,
  `autor` bigint(11) NOT NULL,
  `editorial` bigint(11) NOT NULL,
  `pag` int(11) NOT NULL,
  `descripcion` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `status` char(15) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`clave_libro`, `nombre_libro`, `isbn`, `genero`, `autor`, `editorial`, `pag`, `descripcion`, `status`) VALUES
(1, 'el camino largo', '15141545', 3, 2, 2, 33, 'vida diaria de un poeta', 'DISPONIBLE'),
(2, 'ochenta melodÃ­as de pasiÃ³n en amarillo', '9786074009811', 1, 3, 2, 335, 'Summer es una joven violinista que ansia vivir emociones fuertes y se aburre en una relaciÃ³n que no la satisface. Entonces aparece Dominik, una atractivo y enigmÃ¡tico profesor de literatura que, fascinado por el talento  musical de Summer, se ofrece a regalarle un nuevo violÃ­n a cambio de que ella toque en privado para Ã©l', 'DISPONIBLE'),
(3, 'la divina comedia infierno', '9706667253', 3, 4, 1, 272, 'la divina comedia una gran obra de la literatura medieval', 'DISPONIBLE'),
(4, 'la divina comedia purgatorio', '98758154871', 3, 4, 1, 280, 'continuaciÃ³n de la divina comedia infierno', 'DISPONIBLE'),
(6, 'la divina comedia paraiso', '15148725666', 3, 4, 1, 300, 'ultimo libro de la saga', 'DISPONIBLE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE IF NOT EXISTS `productos` (
  `clave_producto` bigint(20) NOT NULL,
  `nombre_producto` bigint(20) NOT NULL,
  `proveedor` bigint(20) NOT NULL,
  `codigo_proveedor` bigint(20) NOT NULL,
  `cantidad_actual` int(11) NOT NULL,
  `cantidad_minima` int(11) NOT NULL,
  `compra` decimal(10,0) NOT NULL,
  `venta` decimal(10,0) NOT NULL,
  `status` varchar(15) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`clave_producto`, `nombre_producto`, `proveedor`, `codigo_proveedor`, `cantidad_actual`, `cantidad_minima`, `compra`, `venta`, `status`) VALUES
(3, 1, 2, 1515, 4, 1, '150', '200', 'DISPONIBLE'),
(4, 2, 3, 151515, 6, 1, '200', '251', 'DISPONIBLE'),
(5, 3, 5, 302530, 2, 1, '30', '50', 'DISPONIBLE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE IF NOT EXISTS `proveedores` (
  `clave_proveedor` bigint(20) NOT NULL,
  `nombre` varchar(30) COLLATE utf8_bin NOT NULL,
  `contacto` varchar(30) COLLATE utf8_bin NOT NULL,
  `observaciones` varchar(100) COLLATE utf8_bin NOT NULL,
  `calle` varchar(15) COLLATE utf8_bin NOT NULL,
  `num_ext` int(5) NOT NULL,
  `num_int` int(5) DEFAULT NULL,
  `colonia` varchar(30) COLLATE utf8_bin NOT NULL,
  `ciudad` varchar(20) COLLATE utf8_bin NOT NULL,
  `estado` varchar(30) COLLATE utf8_bin NOT NULL,
  `telefono` char(10) COLLATE utf8_bin NOT NULL,
  `celular` char(10) COLLATE utf8_bin NOT NULL,
  `email` varchar(20) COLLATE utf8_bin NOT NULL,
  `status` char(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`clave_proveedor`, `nombre`, `contacto`, `observaciones`, `calle`, `num_ext`, `num_int`, `colonia`, `ciudad`, `estado`, `telefono`, `celular`, `email`, `status`) VALUES
(2, 'rsoft', 'hector lopez', 'ventas', 'lejana', 44444, 44, 'muy lejos', 'grande', 'sinaloa', '4333434343', '4343434343', 'ejemplo@yo.com', 'ACTIVO'),
(3, 'oceano', 'juan perez', 'eccewec', 'ceceec', 33333, 33333, 'cecece', 'cececeec', 'ceecec', '3333333333', '3333333333', 'ejemplo@yo.com', 'ACTIVO'),
(4, 'ecwewccew', 'cececeecw', 'cewceecwecwecw', 'ecceece', 33, 3333, 'ceceecec', 'ceceececw', 'ecwecc', '3333333333', '3323223332', 'ejemplo@yo.com', 'ACTIVO'),
(5, 'tomo sa de cv', 'jorge lopez', 'editorial tomo', 'nicolÃ¡s san ju', 1043, 1043, 'del valle', 'd f', 'd f', '55756615', '55750186', 'tomo@gmail.com', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `matricula` bigint(20) NOT NULL,
  `nombre_usuario` varchar(20) COLLATE utf8_bin NOT NULL,
  `password` varchar(80) COLLATE utf8_bin NOT NULL,
  `status` varchar(10) COLLATE utf8_bin NOT NULL,
  `fecha_creacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`matricula`, `nombre_usuario`, `password`, `status`, `fecha_creacion`) VALUES
(1, 'felipe', '$2y$10$xhqmAjGWdUqMmk6m3Lpg1eR8ahaURvodZPTwDAPVhDSj.C3byMOfm', 'ACTIVO', '2015-07-10 01:01:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE IF NOT EXISTS `ventas` (
  `folio` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `empleado` bigint(20) NOT NULL,
  `cliente` bigint(20) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` char(15) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`folio`, `fecha`, `empleado`, `cliente`, `total`, `status`) VALUES
(2015070001, '2015-07-16', 1, 1, '702.00', 'CANCELADA'),
(2015070002, '2015-07-16', 1, 1, '702.00', 'CANCELADA'),
(2015070003, '2015-07-16', 2, 1, '600.00', 'PAGADO'),
(2015070007, '2015-07-22', 1, 1, '300.00', 'CANCELADA');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`clave_autor`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`matricula`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`folio`), ADD KEY `proveedor` (`proveedor`);

--
-- Indices de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`folio`,`clave_producto`), ADD KEY `clave_producto` (`clave_producto`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`folio`,`clave_producto`), ADD KEY `venta_producto` (`clave_producto`);

--
-- Indices de la tabla `editoriales`
--
ALTER TABLE `editoriales`
  ADD PRIMARY KEY (`clave_editorial`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`matricula`);

--
-- Indices de la tabla `folios`
--
ALTER TABLE `folios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`clave_genero`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`clave_libro`), ADD KEY `genero` (`genero`), ADD KEY `autor` (`autor`), ADD KEY `editorial` (`editorial`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`clave_producto`), ADD KEY `proveedor` (`proveedor`), ADD KEY `nombre_producto` (`nombre_producto`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`clave_proveedor`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`matricula`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`folio`), ADD KEY `empleado` (`empleado`), ADD KEY `cliente` (`cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autores`
--
ALTER TABLE `autores`
  MODIFY `clave_autor` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `matricula` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `editoriales`
--
ALTER TABLE `editoriales`
  MODIFY `clave_editorial` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `matricula` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `folios`
--
ALTER TABLE `folios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `clave_genero` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `clave_libro` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `clave_producto` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `clave_proveedor` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
ADD CONSTRAINT `compra_proveedor` FOREIGN KEY (`proveedor`) REFERENCES `proveedores` (`clave_proveedor`);

--
-- Filtros para la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
ADD CONSTRAINT `compra_detalle` FOREIGN KEY (`folio`) REFERENCES `compras` (`folio`),
ADD CONSTRAINT `compra_producto` FOREIGN KEY (`clave_producto`) REFERENCES `productos` (`clave_producto`);

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
ADD CONSTRAINT `venta_detalle` FOREIGN KEY (`folio`) REFERENCES `ventas` (`folio`),
ADD CONSTRAINT `venta_producto` FOREIGN KEY (`clave_producto`) REFERENCES `productos` (`clave_producto`);

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
ADD CONSTRAINT `libro_autor` FOREIGN KEY (`autor`) REFERENCES `autores` (`clave_autor`),
ADD CONSTRAINT `libro_editorial` FOREIGN KEY (`editorial`) REFERENCES `editoriales` (`clave_editorial`),
ADD CONSTRAINT `libro_genero` FOREIGN KEY (`genero`) REFERENCES `generos` (`clave_genero`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
ADD CONSTRAINT `producto_libro` FOREIGN KEY (`nombre_producto`) REFERENCES `libros` (`clave_libro`),
ADD CONSTRAINT `producto_proveedor` FOREIGN KEY (`proveedor`) REFERENCES `proveedores` (`clave_proveedor`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
ADD CONSTRAINT `empleado_usuario` FOREIGN KEY (`matricula`) REFERENCES `empleados` (`matricula`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
ADD CONSTRAINT `venta_cliente` FOREIGN KEY (`cliente`) REFERENCES `clientes` (`matricula`),
ADD CONSTRAINT `venta_empleado` FOREIGN KEY (`empleado`) REFERENCES `empleados` (`matricula`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
