-- MySQL Script generated by MySQL Workbench
-- Sun Jun 14 21:28:57 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema proyectobiblioteca
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema proyectobiblioteca
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `proyectobiblioteca` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci ;
USE `proyectobiblioteca` ;

-- -----------------------------------------------------
-- Table `proyectobiblioteca`.`cartas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectobiblioteca`.`cartas` (
  `idCarta` INT NOT NULL AUTO_INCREMENT,
  `nombreCarta` VARCHAR(255) NOT NULL,
  `categoria` ENUM('monstruo', 'magia', 'trampa', 'other') NOT NULL,
  `obtenida` ENUM('si', 'no', 'proxy') NOT NULL,
  PRIMARY KEY (`idCarta`),
  INDEX `nombreCarta_en_listas_info` (`nombreCarta` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `proyectobiblioteca`.`carta_imgs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectobiblioteca`.`carta_imgs` (
  `idImg` INT NOT NULL AUTO_INCREMENT,
  `cartaID` INT NOT NULL,
  `img` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idImg`),
  INDEX `id_carta_en_cartas_idx` (`cartaID` ASC) INVISIBLE,
  INDEX `id_carta_para_img` (`cartaID` ASC) VISIBLE,
  CONSTRAINT `id_carta_para_img_en_cartas`
    FOREIGN KEY (`cartaID`)
    REFERENCES `proyectobiblioteca`.`cartas` (`idCarta`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `proyectobiblioteca`.`carta_magia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectobiblioteca`.`carta_magia` (
  `idMagia` INT NOT NULL AUTO_INCREMENT,
  `tipo` ENUM('normal', 'quick', 'continuous', 'ritual', 'equip', 'field') NOT NULL,
  `first_ed` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`idMagia`),
  CONSTRAINT `id_magia_en_cartas`
    FOREIGN KEY (`idMagia`)
    REFERENCES `proyectobiblioteca`.`cartas` (`idCarta`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `proyectobiblioteca`.`carta_monstruo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectobiblioteca`.`carta_monstruo` (
  `idMonsturo` INT NOT NULL AUTO_INCREMENT,
  `tipo` ENUM('normal', 'effct', 'fusion', 'ritual', 'god', 'token') NOT NULL,
  `atributo` ENUM('earth', 'water', 'fire', 'wind', 'light', 'dark', 'divine') NOT NULL,
  `lv` ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12') NOT NULL,
  `atk` INT NOT NULL,
  `def` INT NOT NULL,
  `first_ed` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`idMonsturo`),
  CONSTRAINT `id_monstruo_en_cartas`
    FOREIGN KEY (`idMonsturo`)
    REFERENCES `proyectobiblioteca`.`cartas` (`idCarta`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `proyectobiblioteca`.`carta_other`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectobiblioteca`.`carta_other` (
  `idOther` INT NOT NULL,
  `tipo` ENUM('god', 'token') NOT NULL,
  `first_ed` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`idOther`),
  CONSTRAINT `id_other_en_cartas`
    FOREIGN KEY (`idOther`)
    REFERENCES `proyectobiblioteca`.`cartas` (`idCarta`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `proyectobiblioteca`.`carta_trampa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectobiblioteca`.`carta_trampa` (
  `idTrampa` INT NOT NULL AUTO_INCREMENT,
  `tipo` ENUM('normal', 'continuous', 'counter') NOT NULL,
  `first_ed` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`idTrampa`),
  CONSTRAINT `id_trampa_en_cartas`
    FOREIGN KEY (`idTrampa`)
    REFERENCES `proyectobiblioteca`.`cartas` (`idCarta`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `proyectobiblioteca`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectobiblioteca`.`usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(45) NOT NULL,
  `contrasena` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `foto_perfil` VARCHAR(255) NULL DEFAULT NULL,
  `listasID` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombreUsuario` ASC) VISIBLE,
  UNIQUE INDEX `usuarioscol_UNIQUE` (`correo` ASC) VISIBLE,
  INDEX `id_lista_en_usuarios_idx` (`listasID` ASC) VISIBLE,
  CONSTRAINT `id_lista_en_usuarios`
    FOREIGN KEY (`listasID`)
    REFERENCES `proyectobiblioteca`.`listas` (`idLista`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `proyectobiblioteca`.`listas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectobiblioteca`.`listas` (
  `idLista` INT NOT NULL AUTO_INCREMENT,
  `usuarioID` INT NOT NULL,
  PRIMARY KEY (`idLista`),
  UNIQUE INDEX `id_usuario_UNIQUE` (`usuarioID` ASC) VISIBLE,
  CONSTRAINT `id_usuario_en_usuarios`
    FOREIGN KEY (`usuarioID`)
    REFERENCES `proyectobiblioteca`.`usuarios` (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `proyectobiblioteca`.`listas_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectobiblioteca`.`listas_info` (
  `listaID` INT NOT NULL AUTO_INCREMENT,
  `cartaID` INT NOT NULL,
  `cartaNombre` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`listaID`),
  UNIQUE INDEX `id_carta_gral_UNIQUE` (`cartaID` ASC) INVISIBLE,
  INDEX `nombre_carta_en_cartas` (`cartaNombre` ASC) VISIBLE,
  CONSTRAINT `id_carta_en_cartas`
    FOREIGN KEY (`cartaID`)
    REFERENCES `proyectobiblioteca`.`cartas` (`idCarta`),
  CONSTRAINT `id_lista_en_listas`
    FOREIGN KEY (`listaID`)
    REFERENCES `proyectobiblioteca`.`listas` (`idLista`),
  CONSTRAINT `nombre_carta_en_cartas`
    FOREIGN KEY (`cartaNombre`)
    REFERENCES `proyectobiblioteca`.`cartas` (`nombreCarta`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
