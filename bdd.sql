-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           10.11.2-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage des données de la table myefrei.absence : ~3 rows (environ)
/*!40000 ALTER TABLE `absence` DISABLE KEYS */;
INSERT INTO `absence` (`idAbsence`, `dateAbsence`, `idCourse`, `idStudent`) VALUES
	(1, '2023-03-24', 1, 1),
	(2, '2023-03-24', 1, 2),
	(3, '2023-04-10', 1, 1);
/*!40000 ALTER TABLE `absence` ENABLE KEYS */;

-- Listage des données de la table myefrei.course : ~4 rows (environ)
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` (`idCourse`, `nameCourse`, `idTeacher`, `idProgramGroup`) VALUES
	(1, 'GraphQl', 1, 1),
	(2, 'NestJs', 3, 1),
	(3, 'GraphQl', 1, 2),
	(4, 'NestJs', 3, 2);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;

-- Listage des données de la table myefrei.program : ~5 rows (environ)
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` (`idProgram`, `nameProgram`, `idProgramType`, `isApprendiceship`) VALUES
	(1, 'Mastère Dev Manager Full Stack', 1, 1),
	(2, 'Prépa L1', 2, 0),
	(3, 'Prépa L2', 2, 0),
	(4, 'BTS Communication', 1, 1),
	(5, 'Marketing & Data', 1, 1);
/*!40000 ALTER TABLE `program` ENABLE KEYS */;

-- Listage des données de la table myefrei.programgroup : ~10 rows (environ)
/*!40000 ALTER TABLE `programgroup` DISABLE KEYS */;
INSERT INTO `programgroup` (`idProgramGroup`, `levelProgramGroup`, `nameProgramGroup`, `idProgram`) VALUES
	(1, 4, 'dev-a', 1),
	(2, 4, 'dev-b', 1),
	(3, 3, 'mark-a', 5),
	(4, 5, 'dev-a', 1),
	(5, 5, 'dev-b', 1),
	(6, 5, 'dev-c', 1),
	(7, 1, 'l1-a', 2),
	(8, 1, 'l1-b', 2),
	(9, 2, 'l2-a', 3),
	(10, 2, 'l2-b', 3);
/*!40000 ALTER TABLE `programgroup` ENABLE KEYS */;

-- Listage des données de la table myefrei.programtype : ~2 rows (environ)
/*!40000 ALTER TABLE `programtype` DISABLE KEYS */;
INSERT INTO `programtype` (`idProgramType`, `nameProgramType`) VALUES
	(1, 'Programme experts'),
	(2, 'Programme ingénieur');
/*!40000 ALTER TABLE `programtype` ENABLE KEYS */;

-- Listage des données de la table myefrei.rating : ~9 rows (environ)
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` (`idRating`, `ratingValue`, `idStudent`, `idCourse`) VALUES
	(1, 12.0, 1, 1),
	(2, 12.0, 1, 2),
	(3, 16.0, 1, 1),
	(4, 16.0, 2, 1),
	(5, 16.5, 2, 2),
	(6, 11.0, 3, 1),
	(7, 11.0, 3, 2),
	(8, 10.0, 4, 1),
	(9, 8.0, 4, 2);
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;

-- Listage des données de la table myefrei.schedule : ~8 rows (environ)
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` (`idSchedule`, `scheduleDay`, `scheduleStartTime`, `scheduleEndTime`, `idCourse`) VALUES
	(1, '2023-04-11', '08:00:00', '12:00:00', 1),
	(2, '2023-04-12', '08:00:00', '12:00:00', 1),
	(3, '2023-04-13', '08:00:00', '12:00:00', 1),
	(4, '2023-04-11', '08:00:00', '12:00:00', 3),
	(5, '2023-04-12', '08:00:00', '12:00:00', 3),
	(6, '2023-04-14', '08:00:00', '12:00:00', 2),
	(7, '2023-04-15', '08:00:00', '12:00:00', 2),
	(8, '2023-03-24', '08:00:00', '12:00:00', 1);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;

-- Listage des données de la table myefrei.student : ~15 rows (environ)
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` (`idStudent`, `firstName`, `lastName`, `idProgramGroup`) VALUES
	(1, 'Sophie ', 'Martin', 1),
	(2, 'Lucas ', 'Nguyen', 1),
	(3, 'Clara ', 'Thompson', 1),
	(4, 'Benjamin ', 'Lee', 1),
	(5, 'Camille ', 'Smith', 4),
	(6, 'Hugo ', 'Wang', 4),
	(7, 'Emma ', 'Kim', 2),
	(8, 'Gabriel ', 'Chen', 2),
	(9, 'Léa ', 'Patel', 2),
	(10, 'Louis ', 'Garcia', 2),
	(11, 'Manon ', 'Martinez', 6),
	(12, 'Nathan ', 'Ali', 6),
	(13, 'Sarah ', 'Johnson', 6),
	(14, 'Raphaël ', 'Hernandez', 6),
	(15, 'Camila ', 'Wong', 7);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;

-- Listage des données de la table myefrei.teacher : ~4 rows (environ)
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` (`idTeacher`, `firstName`, `lastName`) VALUES
	(1, 'Mathis ', 'Lopez'),
	(2, 'Noah ', 'Brown'),
	(3, 'Arthur', 'Patel'),
	(4, 'Tomasz ', 'Kowalski');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
