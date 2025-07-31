-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server-Version:               8.4.3 - MySQL Community Server - GPL
-- Server-Betriebssystem:        Win64
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Exportiere Daten aus Tabelle map_mtest.menu_items: ~8 rows (ungefähr)
INSERT INTO `menu_items` (`id`, `parent_id`, `position`, `label`, `slug`, `sort_order`, `icon_url`, `css_class`, `target_type`) VALUES
	(1, NULL, 1, 'Home', 'seite1', 10, NULL, NULL, 'page'),
	(2, NULL, 1, 'Über uns', 'seite2', 20, NULL, NULL, 'page'),
	(3, NULL, 1, 'Produkte', 'produkte', 30, NULL, NULL, 'page'),
	(4, NULL, 1, 'Kontakt', 'seite3', 40, NULL, NULL, 'page'),
	(5, 3, 1, 'Produkt A', 'produkt-a', 10, NULL, NULL, 'page'),
	(6, 3, 1, 'Produkt B', 'produkt-b', 20, NULL, NULL, 'page'),
	(7, 5, 1, 'Details A1', 'details-a1', 10, NULL, NULL, 'page'),
	(8, 5, 1, 'Details A2', 'details-a2', 20, NULL, NULL, 'page'),
	(9, NULL, 2, 'Impressum', 'impr', 10, NULL, NULL, 'page'),
	(10, NULL, 2, 'Testunten', 'teun', 20, NULL, NULL, 'page');

-- Exportiere Daten aus Tabelle map_mtest.seiten_inhalte: ~3 rows (ungefähr)
INSERT INTO `seiten_inhalte` (`id`, `titel`, `inhalt`, `slug`) VALUES
	(1, 'Seite Eins', 'Dies ist der Inhalt von Seite Eins aus der Datenbank.', 'seite1'),
	(2, 'Seite Zwei', 'Dies ist der Inhalt von Seite Zwei aus der Datenbank.', 'seite2'),
	(3, 'Seite Drei', 'Dies ist der Inhalt von Seite Drei aus der Datenbank.', 'seite3'),
	(4, 'Seite unten 1', 'das ist von unten 1', 'impr'),
	(5, 'Seite von unten 2', 'das ist von unten 2', 'teun'),
	(6, 'Produkte', 'Produktseite', 'produkte');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
