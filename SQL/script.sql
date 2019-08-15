-- MySQL Script generated by MySQL Workbench
-- Mon Jun 10 13:50:35 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema codeline
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema codeline
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `codeline` DEFAULT CHARACTER SET utf8 ;
USE `codeline` ;

-- -----------------------------------------------------
-- Table `codeline`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`user` ;

CREATE TABLE IF NOT EXISTS `codeline`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `birth` DATE NOT NULL,
  `telephone` VARCHAR(30) NOT NULL,
  `zipcode` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `state` VARCHAR(2) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `number` INT NOT NULL,
  `complement` VARCHAR(15) NULL,
  `profilePhoto` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`seller`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`seller` ;

CREATE TABLE IF NOT EXISTS `codeline`.`seller` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`, `userId`),
  INDEX `fk_seller_user1_idx` (`userId` ASC),
  CONSTRAINT `fk_seller_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `codeline`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`establishment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`establishment` ;

CREATE TABLE IF NOT EXISTS `codeline`.`establishment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `zipcode` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `number` INT NOT NULL,
  `complement` VARCHAR(15) NULL,
  `category` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `email` VARCHAR(255) NULL,
  `telephone` VARCHAR(30) NULL,
  `site` VARCHAR(255) NULL,
  `logoImgPath` VARCHAR(255) NULL,
  `sellerId` INT NOT NULL,
  PRIMARY KEY (`id`, `sellerId`),
  INDEX `fk_establishment_seller1_idx` (`sellerId` ASC),
  CONSTRAINT `fk_establishment_seller1`
    FOREIGN KEY (`sellerId`)
    REFERENCES `codeline`.`seller` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`establishmentPhoto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`establishmentPhoto` ;

CREATE TABLE IF NOT EXISTS `codeline`.`establishmentPhoto` (
  `imgPath` VARCHAR(255) NOT NULL,
  `establishmenIid` INT NOT NULL,
  PRIMARY KEY (`imgPath`, `establishmenIid`),
  INDEX `fk_establishmentPhoto_establishment1_idx` (`establishmenIid` ASC),
  CONSTRAINT `fk_establishmentPhoto_establishment1`
    FOREIGN KEY (`establishmenIid`)
    REFERENCES `codeline`.`establishment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`login` ;

CREATE TABLE IF NOT EXISTS `codeline`.`login` (
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(90) NOT NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`coupon`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`coupon` ;

CREATE TABLE IF NOT EXISTS `codeline`.`coupon` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(500) NOT NULL,
  `expirationDate` DATETIME NOT NULL,
  `activated` TINYINT NOT NULL DEFAULT 1,
  `photoPath` VARCHAR(255) NULL,
  `establishmentId` INT NOT NULL,
  PRIMARY KEY (`id`, `establishmentId`),
  INDEX `fk_coupon_establishment1_idx` (`establishmentId` ASC),
  CONSTRAINT `fk_coupon_establishment1`
    FOREIGN KEY (`establishmentId`)
    REFERENCES `codeline`.`establishment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`loyaltyCard`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`loyaltyCard` ;

CREATE TABLE IF NOT EXISTS `codeline`.`loyaltyCard` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantityOfPurchasesRequired` INT NOT NULL,
  `couponId` INT NOT NULL,
  PRIMARY KEY (`id`, `couponId`),
  INDEX `fk_loyaltyCard_coupon1_idx` (`couponId` ASC),
  CONSTRAINT `fk_loyaltyCard_coupon1`
    FOREIGN KEY (`couponId`)
    REFERENCES `codeline`.`coupon` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`QRCode`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`QRCode` ;

CREATE TABLE IF NOT EXISTS `codeline`.`QRCode` (
  `hash` VARCHAR(90) NOT NULL,
  `used` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`hash`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`couponQRCode`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`couponQRCode` ;

CREATE TABLE IF NOT EXISTS `codeline`.`couponQRCode` (
  `hash` VARCHAR(90) NOT NULL,
  `couponId` INT NOT NULL,
  PRIMARY KEY (`hash`, `couponId`),
  INDEX `fk_couponQRCode_coupon1_idx` (`couponId` ASC),
  CONSTRAINT `fk_couponQRCode_QRCode1`
    FOREIGN KEY (`hash`)
    REFERENCES `codeline`.`QRCode` (`hash`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_couponQRCode_coupon1`
    FOREIGN KEY (`couponId`)
    REFERENCES `codeline`.`coupon` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`consumer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`consumer` ;

CREATE TABLE IF NOT EXISTS `codeline`.`consumer` (
  `id` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`, `userId`),
  INDEX `fk_consumer_user1_idx` (`userId` ASC),
  CONSTRAINT `fk_consumer_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `codeline`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`couponRecord`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`couponRecord` ;

CREATE TABLE IF NOT EXISTS `codeline`.`couponRecord` (
  `couponQRCodeHash` VARCHAR(90) NOT NULL,
  `consumerId` INT NOT NULL,
  PRIMARY KEY (`couponQRCodeHash`, `consumerId`),
  INDEX `fk_couponRecord_couponQRCode1_idx` (`couponQRCodeHash` ASC),
  INDEX `fk_couponRecord_consumer1_idx` (`consumerId` ASC),
  CONSTRAINT `fk_couponRecord_couponQRCode1`
    FOREIGN KEY (`couponQRCodeHash`)
    REFERENCES `codeline`.`couponQRCode` (`hash`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_couponRecord_consumer1`
    FOREIGN KEY (`consumerId`)
    REFERENCES `codeline`.`consumer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`loyaltyCardQRCode`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`loyaltyCardQRCode` ;

CREATE TABLE IF NOT EXISTS `codeline`.`loyaltyCardQRCode` (
  `hash` VARCHAR(90) NOT NULL,
  `loyaltyCardId` INT NOT NULL,
  PRIMARY KEY (`hash`, `loyaltyCardId`),
  INDEX `fk_loyaltyCardQRCode_loyaltyCard1_idx` (`loyaltyCardId` ASC),
  CONSTRAINT `fk_loyaltyCardQRCode_QRCode1`
    FOREIGN KEY (`hash`)
    REFERENCES `codeline`.`QRCode` (`hash`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_loyaltyCardQRCode_loyaltyCard1`
    FOREIGN KEY (`loyaltyCardId`)
    REFERENCES `codeline`.`loyaltyCard` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codeline`.`loyaltyCardRecord`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeline`.`loyaltyCardRecord` ;

CREATE TABLE IF NOT EXISTS `codeline`.`loyaltyCardRecord` (
  `pursachesCount` INT NOT NULL DEFAULT 0,
  `loyaltyCardQRCodeHash` VARCHAR(90) NOT NULL,
  `consumerId` INT NOT NULL,
  PRIMARY KEY (`loyaltyCardQRCodeHash`, `consumerId`),
  INDEX `fk_loyaltyCardRecord_consumer1_idx` (`consumerId` ASC),
  CONSTRAINT `fk_loyaltyCardRecord_loyaltyCardQRCode1`
    FOREIGN KEY (`loyaltyCardQRCodeHash`)
    REFERENCES `codeline`.`loyaltyCardQRCode` (`hash`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_loyaltyCardRecord_consumer1`
    FOREIGN KEY (`consumerId`)
    REFERENCES `codeline`.`consumer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
