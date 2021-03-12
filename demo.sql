-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (11,'Joyeux anniversaire Aurélie !','2021-02-02 15:53:18','2021-02-02 15:53:18',9,4),(12,'Bienvenu Nicolas !','2021-02-02 15:54:05','2021-02-02 15:54:05',9,7),(13,'Ca m\'a l\'air super ! et Si on y allait demain midi ?','2021-02-02 15:54:24','2021-02-02 15:54:24',9,9),(14,'Hâte d\'en savoir plus :)','2021-02-02 15:54:49','2021-02-02 15:54:49',9,12),(15,'Eric que le temps passe vite !','2021-02-02 15:55:02','2021-02-02 15:55:02',9,13),(16,'Bienvenu Maria !','2021-02-02 15:55:12','2021-02-02 15:55:12',9,14),(17,'Encore un record pour Eric !!','2021-02-02 15:56:06','2021-02-02 15:56:06',13,13),(18,'Joyeux anniversaire ! :))','2021-02-02 15:56:31','2021-02-02 15:56:31',13,4),(19,'Ah l\'humour des développeurs ...','2021-02-02 15:56:55','2021-02-02 15:56:55',13,6),(20,'Je peux me joindre à vous ?  Ce restau à l\'air incroyable','2021-02-02 15:58:37','2021-02-02 15:58:37',8,9),(21,'Bravo Eric et merci pour toutes ces années de bon humeur au quotidien :)','2021-02-02 15:59:18','2021-02-02 15:59:18',8,13),(22,'Ahah !','2021-02-02 15:59:34','2021-02-02 15:59:34',8,5),(23,'Bienvenu Nicolas, j\'espères que tu te plairas parmi nous !','2021-02-02 16:01:09','2021-02-02 16:01:09',10,7);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int NOT NULL,
  `PostId` int NOT NULL,
  PRIMARY KEY (`UserId`,`PostId`),
  UNIQUE KEY `Like_UserId_PostId_unique` (`UserId`,`PostId`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `like_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `like_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `post` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES ('2020-12-04 10:51:28','2020-12-04 10:51:28',1,1),('2020-12-04 10:51:28','2020-12-04 10:51:28',1,6),('2020-12-04 10:51:28','2020-12-04 10:51:28',1,12),('2020-12-04 10:51:28','2020-12-04 10:51:28',2,1),('2020-12-04 10:51:28','2020-12-04 10:51:28',2,7),('2020-12-04 10:51:28','2020-12-04 10:51:28',2,11),('2020-12-04 10:51:28','2020-12-04 10:51:28',2,13),('2020-12-04 10:51:28','2020-12-04 10:51:28',3,2),('2020-12-04 10:51:28','2020-12-04 10:51:28',3,6),('2020-12-04 10:51:28','2020-12-04 10:51:28',3,7),('2020-12-04 10:51:28','2020-12-04 10:51:28',3,11),('2020-12-04 10:51:28','2020-12-04 10:51:28',3,13),('2020-12-04 10:51:28','2020-12-04 10:51:28',4,2),('2020-12-04 10:51:28','2020-12-04 10:51:28',4,5),('2020-12-04 10:51:28','2020-12-04 10:51:28',4,8),('2020-12-04 10:51:28','2020-12-04 10:51:28',4,14),('2020-12-04 10:51:28','2020-12-04 10:51:28',5,3),('2020-12-04 10:51:28','2020-12-04 10:51:28',5,8),('2020-12-04 10:51:28','2020-12-04 10:51:28',5,12),('2020-12-04 10:51:28','2020-12-04 10:51:28',6,3),('2020-12-04 10:51:28','2020-12-04 10:51:28',6,9),('2020-12-04 10:51:28','2020-12-04 10:51:28',7,4),('2020-12-04 10:51:28','2020-12-04 10:51:28',7,9),('2020-12-04 10:51:28','2020-12-04 10:51:28',8,4),('2021-02-02 15:57:53','2021-02-02 15:57:53',8,8),('2020-12-04 10:51:28','2020-12-04 10:51:28',8,10),('2021-02-02 15:57:49','2021-02-02 15:57:49',8,13),('2021-02-02 15:57:58','2021-02-02 15:57:58',8,15),('2021-02-02 15:52:19','2021-02-02 15:52:19',9,1),('2020-12-04 10:51:28','2020-12-04 10:51:28',9,5),('2021-02-02 15:55:18','2021-02-02 15:55:18',9,7),('2020-12-04 10:51:28','2020-12-04 10:51:28',9,10),('2021-02-02 15:55:14','2021-02-02 15:55:14',9,13),('2021-02-02 16:00:43','2021-02-02 16:00:43',10,1),('2021-02-02 16:00:34','2021-02-02 16:00:34',10,13),('2021-02-02 15:56:19','2021-02-02 15:56:19',13,4),('2021-02-02 15:56:58','2021-02-02 15:56:58',13,8),('2021-02-02 15:55:56','2021-02-02 15:55:56',13,13);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ConversationId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ConversationId` (`ConversationId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`ConversationId`) REFERENCES `conversation` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant` (
  `ConversationId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`ConversationId`,`UserId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `participant_ibfk_1` FOREIGN KEY (`ConversationId`) REFERENCES `conversation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `participant_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant`
--

LOCK TABLES `participant` WRITE;
/*!40000 ALTER TABLE `participant` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int NOT NULL,
  `subject_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'N\'oubliez pas de vous inscrire pour l\'évenement de mardi prochain concernant les formations mise en place pour ce semestre !',NULL,NULL,'2020-12-04 10:51:28','2020-12-04 10:51:28',2,1),(2,'Qui est partant pour un karaoké vendredi après le travail ?','https://www.sortiraparis.com/images/80/62403/550318-confinement-un-karaoke-chez-soi.jpg',NULL,'2020-12-12 10:51:28','2020-12-12 10:51:28',3,2),(3,'Parmis les nouveautés de cette semaine: 2 départs, 2 arrivées, beaucoup d`\'émotions et pleins d\'autres surprises !',NULL,NULL,'2020-12-24 10:51:28','2020-12-24 10:51:28',3,3),(4,'Et on souhaite un joyeux anniversaire à Aurélie qui fête ses 6 ans chez Groupomania !','https://www.drostatic.com/images/lemagfemmes/home/gateau_fusee.jpg',NULL,'2021-01-04 10:51:28','2021-01-04 10:51:28',4,4),(5,'Quand ton client manges pour 57$ de saumon car il sait que c\'est toi qui invites ... ',NULL,NULL,'2021-01-04 10:51:28','2021-01-04 10:51:28',5,5),(6,'Il y a deux sortes de gens : ceux qui comprennent la notion de récursivité et ceux qui ne comprennent pas qu’il y a deux sortes de gens : ceux qui comprennent la notion de récursivité et ceux qui ...','https://coub-anubis-a.akamaized.net/coub_storage/coub/simple/cw_image/ea3e4731891/a4c3e355a14f2ea09a8b7/1598028129_00024.jpg',NULL,'2020-12-04 10:51:28','2020-12-04 10:51:28',6,6),(7,'Bonjour à Nicolas, notre nouveaux stagaire en développement back end !',NULL,NULL,'2020-11-04 10:51:28','2020-11-04 10:51:28',7,7),(8,'Les chèques vacances sont disponibles au bureau =)','https://www.foamite.com/wp-content/uploads/2016/03/vacation-keep-calm.png',NULL,'2020-11-17 10:51:28','2020-11-17 10:51:28',8,8),(9,'Allez voir ce resto pour la pause dej, c\'est à  quelques minutes du parc et c\'est juste  délicieux !',NULL,'https://www.thefork.fr/restaurant/le-mazenay-r72168','2020-10-21 10:51:28','2020-10-21 10:51:28',9,9),(10,'Pour ceux qui ont besoin d\'un nouveau clavier, les nouveaux sont arrivés hier, merci de vous rapprocher de l\'IT pour récupérer le votre','https://i0.wp.com/macsources.com/wp-content/uploads/2019/06/VicTisng-MechanicalGamingKeyboard-RedSwitches-003.jpg?fit=1080%2C608&ssl=1',NULL,'2020-12-04 10:51:28','2020-12-04 10:51:28',12,1),(11,'On va réserver une table pour le départ de Nicole, pour ceux qui veulent venir, dites le moi pour la résérvation :)',NULL,NULL,'2020-10-30 10:51:28','2020-10-30 10:51:28',13,2),(12,'Encore une superbe nouvelle à venir ! Nous vous en dirons plus dans les jours qui suivent :) ',NULL,NULL,'2020-12-04 10:51:28','2020-12-04 10:51:28',13,3),(13,'Et encore un anniversaire cette semaine avec Eric qui fêtent ces 18 ans dans nos locaux !',NULL,NULL,'2020-11-26 10:51:28','2020-11-26 10:51:28',14,4),(14,'Bienvenu à Maria, notre nouvelle chargée de communication !','https://upload.wikimedia.org/wikipedia/fr/b/b9/Bienvenue_chez_nous.jpg',NULL,'2021-01-26 10:51:28','2021-01-26 10:51:28',17,7),(15,'Les chèques restaurants sont disponibles au bureau =)',NULL,NULL,'2021-01-19 10:51:28','2021-01-19 10:51:28',18,8),(16,'Quelqu\'un aurait une adresse à conseiller pour ce midi ?',NULL,NULL,'2020-12-25 10:51:28','2020-12-25 10:51:28',19,9);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `item_type` text NOT NULL,
  `message` text NOT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'News','2020-12-04 10:51:28','2020-12-04 10:51:28'),(2,'Afterworks','2020-12-04 10:51:28','2020-12-04 10:51:28'),(3,'A venir','2020-12-04 10:51:28','2020-12-04 10:51:28'),(4,'Anniversaires','2020-12-04 10:51:28','2020-12-04 10:51:28'),(5,'Histoires de clients','2020-12-04 10:51:28','2020-12-04 10:51:28'),(6,'Humour','2020-12-04 10:51:28','2020-12-04 10:51:28'),(7,'Présentations','2020-12-04 10:51:28','2020-12-04 10:51:28'),(8,'Commité d\'entreprise','2020-12-04 10:51:28','2020-12-04 10:51:28'),(9,'Pause dej','2020-12-04 10:51:28','2020-12-04 10:51:28');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectfollows`
--

DROP TABLE IF EXISTS `subjectfollows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectfollows` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `SubjectId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`SubjectId`,`UserId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `subjectfollows_ibfk_1` FOREIGN KEY (`SubjectId`) REFERENCES `subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subjectfollows_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectfollows`
--

LOCK TABLES `subjectfollows` WRITE;
/*!40000 ALTER TABLE `subjectfollows` DISABLE KEYS */;
INSERT INTO `subjectfollows` VALUES ('2020-12-04 10:51:28','2020-12-04 10:51:28',1,1),('2020-12-04 10:51:28','2020-12-04 10:51:28',1,6),('2021-02-02 15:45:18','2021-02-02 15:45:18',1,9),('2021-02-02 16:00:31','2021-02-02 16:00:31',1,10),('2020-12-04 10:51:28','2020-12-04 10:51:28',1,12),('2020-12-04 10:51:28','2020-12-04 10:51:28',2,1),('2020-12-04 10:51:28','2020-12-04 10:51:28',2,7),('2021-02-02 16:00:17','2021-02-02 16:00:17',2,10),('2020-12-04 10:51:28','2020-12-04 10:51:28',2,11),('2020-12-04 10:51:28','2020-12-04 10:51:28',2,13),('2020-12-04 10:51:28','2020-12-04 10:51:28',3,2),('2020-12-04 10:51:28','2020-12-04 10:51:28',3,6),('2020-12-04 10:51:28','2020-12-04 10:51:28',3,7),('2021-02-02 15:45:17','2021-02-02 15:45:17',3,9),('2021-02-02 16:00:32','2021-02-02 16:00:32',3,10),('2020-12-04 10:51:28','2020-12-04 10:51:28',3,11),('2020-12-04 10:51:28','2020-12-04 10:51:28',3,13),('2020-12-04 10:51:28','2020-12-04 10:51:28',4,2),('2020-12-04 10:51:28','2020-12-04 10:51:28',4,5),('2020-12-04 10:51:28','2020-12-04 10:51:28',4,8),('2021-02-02 15:45:17','2021-02-02 15:45:17',4,9),('2021-02-02 16:00:32','2021-02-02 16:00:32',4,10),('2021-02-02 15:55:48','2021-02-02 15:55:48',4,13),('2020-12-04 10:51:28','2020-12-04 10:51:28',4,14),('2020-12-04 10:51:28','2020-12-04 10:51:28',5,3),('2020-12-04 10:51:28','2020-12-04 10:51:28',5,8),('2021-02-02 16:00:19','2021-02-02 16:00:19',5,10),('2020-12-04 10:51:28','2020-12-04 10:51:28',5,12),('2020-12-04 10:51:28','2020-12-04 10:51:28',6,3),('2020-12-04 10:51:28','2020-12-04 10:51:28',6,9),('2021-02-02 15:55:46','2021-02-02 15:55:46',6,13),('2020-12-04 10:51:28','2020-12-04 10:51:28',7,4),('2020-12-04 10:51:28','2020-12-04 10:51:28',7,9),('2021-02-02 16:00:20','2021-02-02 16:00:20',7,10),('2020-12-04 10:51:28','2020-12-04 10:51:28',8,4),('2021-02-02 15:57:42','2021-02-02 15:57:42',8,8),('2020-12-04 10:51:28','2020-12-04 10:51:28',8,10),('2021-02-02 15:55:45','2021-02-02 15:55:45',8,13),('2020-12-04 10:51:28','2020-12-04 10:51:28',9,5),('2021-02-02 15:57:42','2021-02-02 15:57:42',9,8),('2020-12-04 10:51:28','2020-12-04 10:51:28',9,10);
/*!40000 ALTER TABLE `subjectfollows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `parentEmail` varchar(255) DEFAULT NULL,
  `restricted` tinyint(1) DEFAULT '1',
  `shareWithPartners` tinyint(1) DEFAULT '0',
  `contactable` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Anonyme','anonyme@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(2,'Marc','marc@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(3,'Josiane','josiane@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(4,'Walid','walid@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(5,'Aurélien','aurelien@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(6,'Catherine','catherine@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(7,'Aurélie','aurelie@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(8,'Evelina','evelina@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(9,'Filipe','filipe@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(10,'Joseph','joseph@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(11,'Pauline','pauline@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(12,'Marga','marga@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(13,'Dialo','dialo@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(14,'Helene','helene@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(15,'Laurent','laurent@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(16,'Diala','diala@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(17,'Marie','marie@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(18,'Sophie','sophie@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(19,'Chloé','chloe@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(20,'Maxence','maxence@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(21,'Demo1','Demo1@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28'),(22,'Demo2','Demo2@mail.com','$2b$10$8a8HN13IWPk3Sy.nzbqmLOFNiyFkJ/kmdZSqQh98GEhlT/MVqrbly','http://localhost:3000/images/public/anonyme_avatar.png','1990-12-04',NULL,1,0,0,'2020-12-04 10:51:28','2020-12-04 10:51:28');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-02 17:03:07
