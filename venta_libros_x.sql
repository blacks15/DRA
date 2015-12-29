-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2015 at 08:05 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `venta_libros`
--

-- --------------------------------------------------------

--
-- Table structure for table `autores`
--

CREATE TABLE IF NOT EXISTS `autores` (
  `clave_autor` bigint(20) NOT NULL,
  `clave_libro` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre_autor` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4612 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `matricula` bigint(20) NOT NULL,
  `rfc` char(13) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `compras`
--

CREATE TABLE IF NOT EXISTS `compras` (
  `folio` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `proveedor` bigint(20) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` char(15) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `cortecaja`
--

CREATE TABLE IF NOT EXISTS `cortecaja` (
  `folio` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `empleado` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `ingreso` decimal(10,2) NOT NULL,
  `egreso` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_compra`
--

CREATE TABLE IF NOT EXISTS `detalle_compra` (
  `folio` bigint(20) NOT NULL,
  `clave_producto` bigint(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Triggers `detalle_compra`
--
DELIMITER $$
CREATE TRIGGER `entra_producto` AFTER INSERT ON `detalle_compra`
 FOR EACH ROW UPDATE productos SET cantidad_actual = cantidad_actual+new.cantidad 
WHERE clave_producto = new.clave_producto
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_venta`
--

CREATE TABLE IF NOT EXISTS `detalle_venta` (
  `folio` bigint(20) NOT NULL,
  `clave_producto` bigint(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Triggers `detalle_venta`
--
DELIMITER $$
CREATE TRIGGER `sale_producto` AFTER INSERT ON `detalle_venta`
 FOR EACH ROW UPDATE productos SET cantidad_actual = cantidad_actual-new.cantidad 
WHERE clave_producto = new.clave_producto
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `editoriales`
--

CREATE TABLE IF NOT EXISTS `editoriales` (
  `clave_editorial` bigint(20) NOT NULL,
  `clave_libro` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre_editorial` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4612 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `empleados`
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

-- --------------------------------------------------------

--
-- Table structure for table `folios`
--

CREATE TABLE IF NOT EXISTS `folios` (
  `id` bigint(20) NOT NULL,
  `nombre` char(10) COLLATE utf8_bin NOT NULL,
  `anio` int(11) NOT NULL,
  `consecutivo` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `generos`
--

CREATE TABLE IF NOT EXISTS `generos` (
  `clave_genero` bigint(20) NOT NULL,
  `nombre_genero` varchar(20) COLLATE utf8_bin NOT NULL,
  `status` char(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `libros`
--

CREATE TABLE IF NOT EXISTS `libros` (
  `clave_libro` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre_libro` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `autor` bigint(20) NOT NULL,
  `editorial` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE IF NOT EXISTS `productos` (
  `clave_producto` bigint(20) NOT NULL,
  `nombre_producto` bigint(20) NOT NULL,
  `proveedor` bigint(20) NOT NULL,
  `codigo_proveedor` bigint(20) DEFAULT NULL,
  `cantidad_actual` int(11) NOT NULL,
  `cantidad_minima` int(11) NOT NULL,
  `compra` decimal(10,0) NOT NULL,
  `venta` decimal(10,0) NOT NULL,
  `status` varchar(15) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `proveedores`
--

CREATE TABLE IF NOT EXISTS `proveedores` (
  `clave_proveedor` bigint(20) NOT NULL,
  `nombre` varchar(30) COLLATE utf8_bin NOT NULL,
  `contacto` varchar(30) COLLATE utf8_bin NOT NULL,
  `observaciones` varchar(100) COLLATE utf8_bin NOT NULL,
  `calle` varchar(30) COLLATE utf8_bin NOT NULL,
  `num_ext` int(5) NOT NULL,
  `num_int` int(5) DEFAULT NULL,
  `colonia` varchar(30) COLLATE utf8_bin NOT NULL,
  `ciudad` varchar(20) COLLATE utf8_bin NOT NULL,
  `estado` varchar(30) COLLATE utf8_bin NOT NULL,
  `telefono` char(10) COLLATE utf8_bin NOT NULL,
  `celular` char(10) COLLATE utf8_bin NOT NULL,
  `email` varchar(20) COLLATE utf8_bin NOT NULL,
  `status` char(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `retiros`
--

CREATE TABLE IF NOT EXISTS `retiros` (
  `id_retiro` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `empleado` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `retiro` decimal(10,2) NOT NULL,
  `observacion` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `matricula` bigint(20) NOT NULL,
  `nombre_usuario` varchar(20) COLLATE utf8_bin NOT NULL,
  `password` varchar(80) COLLATE utf8_bin NOT NULL,
  `status` varchar(10) COLLATE utf8_bin NOT NULL,
  `fecha_creacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
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
-- Indexes for dumped tables
--

--
-- Indexes for table `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`clave_autor`), ADD KEY `clave_autor` (`clave_autor`), ADD KEY `clave_libro` (`clave_libro`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`matricula`);

--
-- Indexes for table `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`folio`), ADD KEY `proveedor` (`proveedor`);

--
-- Indexes for table `cortecaja`
--
ALTER TABLE `cortecaja`
  ADD PRIMARY KEY (`folio`);

--
-- Indexes for table `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`folio`,`clave_producto`), ADD KEY `clave_producto` (`clave_producto`);

--
-- Indexes for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`folio`,`clave_producto`), ADD KEY `venta_producto` (`clave_producto`);

--
-- Indexes for table `editoriales`
--
ALTER TABLE `editoriales`
  ADD PRIMARY KEY (`clave_editorial`), ADD KEY `clave_libro` (`clave_libro`);

--
-- Indexes for table `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`matricula`);

--
-- Indexes for table `folios`
--
ALTER TABLE `folios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`clave_genero`);

--
-- Indexes for table `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`clave_libro`), ADD KEY `autor` (`autor`), ADD KEY `editorial` (`editorial`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`clave_producto`), ADD KEY `proveedor` (`proveedor`), ADD KEY `nombre_producto` (`nombre_producto`);

--
-- Indexes for table `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`clave_proveedor`);

--
-- Indexes for table `retiros`
--
ALTER TABLE `retiros`
  ADD PRIMARY KEY (`id_retiro`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`matricula`);

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`folio`), ADD KEY `empleado` (`empleado`), ADD KEY `cliente` (`cliente`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `autores`
--
ALTER TABLE `autores`
  MODIFY `clave_autor` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4612;
--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `matricula` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `editoriales`
--
ALTER TABLE `editoriales`
  MODIFY `clave_editorial` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4612;
--
-- AUTO_INCREMENT for table `empleados`
--
ALTER TABLE `empleados`
  MODIFY `matricula` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `generos`
--
ALTER TABLE `generos`
  MODIFY `clave_genero` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `clave_producto` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `clave_proveedor` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `retiros`
--
ALTER TABLE `retiros`
  MODIFY `id_retiro` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `autores`
--
ALTER TABLE `autores`
ADD CONSTRAINT `libor_autor` FOREIGN KEY (`clave_libro`) REFERENCES `libros` (`clave_libro`);

--
-- Constraints for table `compras`
--
ALTER TABLE `compras`
ADD CONSTRAINT `compra_proveedor` FOREIGN KEY (`proveedor`) REFERENCES `proveedores` (`clave_proveedor`);

--
-- Constraints for table `detalle_compra`
--
ALTER TABLE `detalle_compra`
ADD CONSTRAINT `compra_detalle` FOREIGN KEY (`folio`) REFERENCES `compras` (`folio`);

--
-- Constraints for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
ADD CONSTRAINT `venta_detalle` FOREIGN KEY (`folio`) REFERENCES `ventas` (`folio`);

--
-- Constraints for table `editoriales`
--
ALTER TABLE `editoriales`
ADD CONSTRAINT `editorial_libro` FOREIGN KEY (`clave_libro`) REFERENCES `libros` (`clave_libro`);

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
ADD CONSTRAINT `producto_proveedor` FOREIGN KEY (`proveedor`) REFERENCES `proveedores` (`clave_proveedor`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
ADD CONSTRAINT `empleado_usuario` FOREIGN KEY (`matricula`) REFERENCES `empleados` (`matricula`);

--
-- Constraints for table `ventas`
--
ALTER TABLE `ventas`
ADD CONSTRAINT `venta_cliente` FOREIGN KEY (`cliente`) REFERENCES `clientes` (`matricula`),
ADD CONSTRAINT `venta_empleado` FOREIGN KEY (`empleado`) REFERENCES `empleados` (`matricula`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
