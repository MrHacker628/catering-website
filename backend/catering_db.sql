-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: catering_db
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Abrar Shaikh','abushaikh0018@gmail.com','9699791068','Hno.32 G Takaband cuncolim sal','2026-03-01 18:14:00'),(2,'sam','samshaikh@gmail.com','9823148908','Hno.32 G margoa','2026-03-01 18:27:01'),(3,'saeil','saeili@gmail.com','1234569876','canacona','2026-03-02 04:47:35'),(4,'Saieel ','saieel@gmail.com','9764499100','Margao Goa','2026-03-02 05:09:40'),(5,'juju','juju@gamil.com','9823148908','panajim','2026-03-02 07:57:20'),(6,'Test Bro','test@gmail.com','9999999999','Test City','2026-04-11 06:39:09'),(7,'san','san@gmail.com','1234567891','','2026-04-15 15:11:22'),(8,'sam','sam@gmial.com','1234569871','','2026-04-15 18:28:38'),(9,'afu','afu@gmail.com','9823148908','','2026-04-18 13:53:35'),(10,'san','141917codgamer@gmail.com','9699791068','Hno.32 G Takaband cuncolim sal','2026-04-19 01:51:07');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `unit` varchar(20) NOT NULL,
  `minimum_stock` int NOT NULL DEFAULT '10',
  `price_per_unit` decimal(10,2) NOT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'jeera ','food ',2,'1',1,250.00,'2026-03-05 15:14:46');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `package_type` varchar(50) DEFAULT 'All',
  `description` text,
  `image_url` varchar(500) DEFAULT NULL,
  `is_veg` tinyint(1) DEFAULT '1',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,'Chicken Biryani','Rice','All','Aromatic basmati rice with spiced chicken','https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',0,1,'2026-04-19 03:57:03'),(2,'Chicken Dum Biryani','Rice','All','Slow cooked chicken dum biryani','https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',0,1,'2026-04-19 03:57:03'),(3,'Mutton Dum Biryani','Rice','Premium','Slow cooked mutton dum biryani','https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',0,1,'2026-04-19 03:57:03'),(4,'Mutton Biryani','Rice','Premium','Fragrant mutton biryani','https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',0,1,'2026-04-19 03:57:03'),(5,'Chicken Tikka Biryani','Rice','Mannat Special','Biryani with grilled tikka chicken','https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',0,1,'2026-04-19 03:57:03'),(6,'Steam Rice','Rice','All','Plain steamed basmati rice','https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',1,1,'2026-04-19 03:57:03'),(7,'Fried Rice','Rice','All','Wok tossed fried rice with vegetables','https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',1,1,'2026-04-19 03:57:03'),(8,'Ghee Rice','Rice','All','Fragrant basmati rice cooked in ghee','https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',1,1,'2026-04-19 03:57:03'),(9,'Chicken Pulao','Rice','All','One pot chicken and rice dish','https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',0,1,'2026-04-19 03:57:03'),(10,'Chicken Fried Rice','Rice','All','Indo-Chinese style chicken fried rice','https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',0,1,'2026-04-19 03:57:03'),(11,'Zalfran Pulao','Veg Rice','All','Saffron flavoured aromatic pulao','https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',1,1,'2026-04-19 03:57:03'),(12,'Mix Pulao','Veg Rice','All','Mixed vegetable pulao','https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',1,1,'2026-04-19 03:57:03'),(13,'Peas Pulao','Veg Rice','All','Green peas and basmati rice','https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',1,1,'2026-04-19 03:57:03'),(14,'Dum Veg Biryani','Veg Rice','All','Slow cooked vegetable dum biryani','https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',1,1,'2026-04-19 03:57:03'),(15,'Jeera Rice','Veg Rice','All','Cumin tempered basmati rice','https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',1,1,'2026-04-19 03:57:03'),(16,'Veg Fried Rice','Veg Rice','All','Wok tossed rice with vegetables','https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',1,1,'2026-04-19 03:57:03'),(17,'Smoked Biryani','Veg Rice','Mannat Special','Smoky flavoured veg biryani','https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',1,1,'2026-04-19 03:57:03'),(18,'Veg Biryani','Veg Rice','All','Fragrant rice with mixed vegetables','https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',1,1,'2026-04-19 03:57:03'),(19,'Chicken Masala','Non-Veg Gravy','All','Classic spiced chicken curry','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(20,'Butter Chicken','Non-Veg Gravy','All','Chicken in rich buttery tomato sauce','https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',0,1,'2026-04-19 03:57:03'),(21,'Chilly Chicken','Non-Veg Gravy','All','Indo-Chinese style chilly chicken','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(22,'Chicken Bhuna Masala','Non-Veg Gravy','All','Dry roasted chicken in thick masala','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(23,'Chicken Anagara','Non-Veg Gravy','All','Spicy chicken in charcoal style gravy','https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400',0,1,'2026-04-19 03:57:03'),(24,'Chicken Hara Masala','Non-Veg Gravy','All','Chicken in green herb masala','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(25,'Peshwari Chicken Xacuti','Non-Veg Gravy','Mannat Special','Goan style spiced chicken xacuti','https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400',0,1,'2026-04-19 03:57:03'),(26,'Chicken Korma','Non-Veg Gravy','Premium','Mild creamy chicken korma','https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',0,1,'2026-04-19 03:57:03'),(27,'Chicken Hyderabadi','Non-Veg Gravy','Premium','Hyderabadi style spiced chicken','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(28,'Chicken Kolhapuri','Non-Veg Gravy','All','Fiery Kolhapuri style chicken','https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400',0,1,'2026-04-19 03:57:03'),(29,'Chicken Xacuti','Non-Veg Gravy','All','Traditional Goan coconut chicken','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(30,'Chicken Sukha','Non-Veg Gravy','All','Semi dry spiced chicken','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(31,'Chicken Handi','Non-Veg Gravy','All','Slow cooked chicken in handi pot','https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400',0,1,'2026-04-19 03:57:03'),(32,'Chicken Mughlai','Non-Veg Gravy','Premium','Rich Mughlai style chicken','https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',0,1,'2026-04-19 03:57:03'),(33,'Chicken Magaj','Non-Veg Gravy','Mannat Special','Special brain masala chicken','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(34,'Chicken Haryali','Non-Veg Gravy','All','Chicken in fresh green herb gravy','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(35,'Chicken Tadka','Non-Veg Gravy','All','Tempered chicken curry','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(36,'Chicken Manchurian','Non-Veg Gravy','All','Indo-Chinese chicken manchurian','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(37,'Chicken Kheema','Non-Veg Gravy','All','Spiced minced chicken curry','https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400',0,1,'2026-04-19 03:57:03'),(38,'Chicken Kadai','Non-Veg Gravy','All','Chicken cooked in kadai with peppers','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(39,'Mutton Masala','Non-Veg Gravy','Premium','Classic spiced mutton curry','https://images.unsplash.com/photo-1545247181-516773cae754?w=400',0,1,'2026-04-19 03:57:03'),(40,'Mutton Xacuti','Non-Veg Gravy','Premium','Goan style mutton xacuti','https://images.unsplash.com/photo-1545247181-516773cae754?w=400',0,1,'2026-04-19 03:57:03'),(41,'Mutton Chilly','Non-Veg Gravy','Premium','Spicy mutton chilly fry','https://images.unsplash.com/photo-1545247181-516773cae754?w=400',0,1,'2026-04-19 03:57:03'),(42,'Mutton Hyderabadi','Non-Veg Gravy','Premium','Hyderabadi style mutton curry','https://images.unsplash.com/photo-1545247181-516773cae754?w=400',0,1,'2026-04-19 03:57:03'),(43,'Mutton Kolhapuri','Non-Veg Gravy','Mannat Special','Fiery Kolhapuri mutton','https://images.unsplash.com/photo-1545247181-516773cae754?w=400',0,1,'2026-04-19 03:57:03'),(44,'Mutton Kadai','Non-Veg Gravy','Premium','Mutton cooked in kadai masala','https://images.unsplash.com/photo-1545247181-516773cae754?w=400',0,1,'2026-04-19 03:57:03'),(45,'Veg Kurma','Veg Gravy','All','Mixed vegetables in creamy korma','https://images.unsplash.com/photo-1574484284002-952d92456975?w=400',1,1,'2026-04-19 03:57:03'),(46,'Dal Fry','Veg Gravy','All','Tempered yellow lentils','https://images.unsplash.com/photo-1585237421612-70a008356fbe?w=400',1,1,'2026-04-19 03:57:03'),(47,'Mix Veg Masala','Veg Gravy','All','Seasonal vegetables in spiced gravy','https://images.unsplash.com/photo-1574484284002-952d92456975?w=400',1,1,'2026-04-19 03:57:03'),(48,'Dal Makhani','Veg Gravy','All','Creamy black lentils slow cooked','https://images.unsplash.com/photo-1585237421612-70a008356fbe?w=400',1,1,'2026-04-19 03:57:03'),(49,'Veg Jalfrazi','Veg Gravy','All','Stir fried vegetables in tangy gravy','https://images.unsplash.com/photo-1574484284002-952d92456975?w=400',1,1,'2026-04-19 03:57:03'),(50,'Paneer Butter Masala','Veg Gravy','All','Cottage cheese in rich tomato gravy','https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',1,1,'2026-04-19 03:57:03'),(51,'Mutter Paneer','Veg Gravy','All','Peas and cottage cheese curry','https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',1,1,'2026-04-19 03:57:03'),(52,'Shahi Kaju Kurma','Veg Gravy','Premium','Rich cashew and paneer korma','https://images.unsplash.com/photo-1574484284002-952d92456975?w=400',1,1,'2026-04-19 03:57:03'),(53,'Mushroom Xacuti','Veg Gravy','All','Goan style mushroom xacuti','https://images.unsplash.com/photo-1574484284002-952d92456975?w=400',1,1,'2026-04-19 03:57:03'),(54,'Chicken Satay','Dry Items','All','Grilled chicken skewers with sauce','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(55,'Chicken Pakoda','Dry Items','All','Crispy battered fried chicken','https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400',0,1,'2026-04-19 03:57:03'),(56,'Chicken Kofta','Dry Items','All','Spiced chicken meatballs','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(57,'Chicken Lollipop','Dry Items','All','Crispy chicken lollipop fry','https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400',0,1,'2026-04-19 03:57:03'),(58,'Chicken Crispy','Dry Items','All','Extra crispy fried chicken','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(59,'Chicken Green Kabab','Dry Items','All','Herb marinated green chicken kabab','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(60,'Chicken Dry Fry','Dry Items','All','Spicy dry fried chicken pieces','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(61,'Chicken Crunchy Dry','Dry Items','All','Double fried crunchy chicken','https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400',0,1,'2026-04-19 03:57:03'),(62,'Chicken Kabab','Dry Items','All','Classic grilled chicken kabab','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(63,'Shezwan Chicken','Dry Items','All','Spicy Indo-Chinese shezwan chicken','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(64,'Garlic Chicken','Dry Items','All','Crispy chicken tossed in garlic','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(65,'Seekh Kabab (Live)','Dry Items','All','Live grilled minced meat seekh','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(66,'Tandoori Chicken','Dry Items','All','Whole chicken marinated and tandoor grilled','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(67,'Chicken Malai Seekh','Dry Items','Premium','Creamy malai chicken seekh kabab','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(68,'Russian Kebab','Dry Items','Mannat Special','Special Russian style kebab','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(69,'Chicken Chutney Kebab','Dry Items','All','Kebab with green chutney marinade','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(70,'Chicken Cheese Stuff Kebab','Dry Items','Premium','Cheese stuffed chicken kebab','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(71,'Chicken Pepper Dry','Dry Items','All','Black pepper spiced chicken dry','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(72,'Chicken 65','Dry Items','All','Classic spicy South Indian chicken 65','https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400',0,1,'2026-04-19 03:57:03'),(73,'Chicken Reshmi Kabab','Dry Items','Premium','Silky smooth reshmi chicken kabab','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(74,'Chicken Stick','Dry Items','All','Grilled chicken on stick','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(75,'Chicken Cutlet','Dry Items','All','Pan fried crispy chicken cutlet','https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400',0,1,'2026-04-19 03:57:03'),(76,'Chicken Seekh Kabab','Dry Items','All','Classic minced chicken seekh kabab','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(77,'Chicken Tikka Kabab','Dry Items','All','Tandoor grilled chicken tikka','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(78,'Cutlet','Veg Starters','All','Crispy vegetable cutlet','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',1,1,'2026-04-19 03:57:03'),(79,'Gobi Manchurian','Veg Starters','All','Crispy cauliflower in manchurian sauce','https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400',1,1,'2026-04-19 03:57:03'),(80,'Baby Corn Chilly Crispy','Veg Starters','All','Baby corn in chilly crispy style','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',1,1,'2026-04-19 03:57:03'),(81,'Paneer Chilly Manchurian','Veg Starters','All','Cottage cheese in manchurian sauce','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(82,'Veg Stick','Veg Starters','All','Fried vegetable sticks','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',1,1,'2026-04-19 03:57:03'),(83,'Paneer Stick','Veg Starters','All','Crispy paneer sticks','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(84,'Shezwan Shanghai Stick','Veg Starters','All','Shezwan flavoured veg sticks','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',1,1,'2026-04-19 03:57:03'),(85,'Hara Bhara Kebab','Veg Starters','All','Spinach and pea patties','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',1,1,'2026-04-19 03:57:03'),(86,'Paneer Tikka','Veg Starters','All','Marinated paneer grilled in tandoor','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(87,'Potato Crispy','Veg Starters','All','Crispy fried spiced potatoes','https://images.unsplash.com/photo-1574484284002-952d92456975?w=400',1,1,'2026-04-19 03:57:03'),(88,'Potato French Fry','Veg Starters','All','Golden crispy french fries','https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',1,1,'2026-04-19 03:57:03'),(89,'Mirchi Bhaji','Veg Starters','All','Battered fried green chillies','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',1,1,'2026-04-19 03:57:03'),(90,'Onion Pakoda Crispy','Veg Starters','All','Crispy onion fritters','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',1,1,'2026-04-19 03:57:03'),(91,'Potato Kapa','Veg Starters','All','Goan style potato kapa','https://images.unsplash.com/photo-1574484284002-952d92456975?w=400',1,1,'2026-04-19 03:57:03'),(92,'Dahi Vada','Veg Starters','All','Lentil dumplings in cool yogurt','https://images.unsplash.com/photo-1601303516534-bf33e9c26b40?w=400',1,1,'2026-04-19 03:57:03'),(93,'Veg Roll','Veg Starters','All','Crispy vegetable filled roll','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',1,1,'2026-04-19 03:57:03'),(94,'Veg Samosa','Veg Starters','All','Crispy pastry with spiced filling','https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=400',1,1,'2026-04-19 03:57:03'),(95,'Veg Patties','Veg Starters','All','Baked vegetable patties','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',1,1,'2026-04-19 03:57:03'),(96,'Finger Chips','Veg Starters','All','Crispy golden finger chips','https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',1,1,'2026-04-19 03:57:03'),(97,'Sandwich','Veg Starters','All','Grilled vegetable sandwich','https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',1,1,'2026-04-19 03:57:03'),(98,'Veg Nuggets','Veg Starters','All','Crispy vegetable nuggets','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',1,1,'2026-04-19 03:57:03'),(99,'Rumali Roti','Breads','All','Paper thin handkerchief roti','https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',1,1,'2026-04-19 03:57:03'),(100,'Tandoori Roti','Breads','All','Whole wheat roti baked in tandoor','https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',1,1,'2026-04-19 03:57:03'),(101,'Garlic Naan','Breads','All','Soft naan topped with garlic butter','https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',1,1,'2026-04-19 03:57:03'),(102,'Plain Naan','Breads','All','Classic soft leavened bread','https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',1,1,'2026-04-19 03:57:03'),(103,'Plain Roti','Breads','All','Simple whole wheat roti','https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',1,1,'2026-04-19 03:57:03'),(104,'Paratha','Breads','All','Flaky layered whole wheat paratha','https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',1,1,'2026-04-19 03:57:03'),(105,'Slice Bread','Breads','All','Soft sliced bread','https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',1,1,'2026-04-19 03:57:03'),(106,'Dinner Roll','Breads','All','Soft baked dinner rolls','https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',1,1,'2026-04-19 03:57:03'),(107,'Chapati','Breads','All','Soft whole wheat chapati','https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',1,1,'2026-04-19 03:57:03'),(108,'Puri','Breads','All','Deep fried puffed wheat bread','https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',1,1,'2026-04-19 03:57:03'),(109,'Shahi Paratha','Breads','Premium','Rich stuffed shahi paratha','https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',1,1,'2026-04-19 03:57:03'),(110,'Goan Bread Poli','Breads','All','Traditional Goan bread poli','https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',1,1,'2026-04-19 03:57:03'),(111,'Rashmi Roti','Breads','All','Soft silky rashmi roti','https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',1,1,'2026-04-19 03:57:03'),(112,'Butter Naan','Breads','All','Soft naan with butter','https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',1,1,'2026-04-19 03:57:03'),(113,'Kulcha','Breads','All','Soft stuffed kulcha bread','https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',1,1,'2026-04-19 03:57:03'),(114,'Green Salad','Salads','All','Fresh green vegetables salad','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',1,1,'2026-04-19 03:57:03'),(115,'Mix Salad','Salads','All','Mixed seasonal vegetable salad','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',1,1,'2026-04-19 03:57:03'),(116,'Onion Coriander Salad','Salads','All','Classic onion and coriander mix','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',1,1,'2026-04-19 03:57:03'),(117,'Hawaiian Salad','Salads','Premium','Tropical fruits and vegetables salad','https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',1,1,'2026-04-19 03:57:03'),(118,'Caesar Veg Salad','Salads','Premium','Classic Caesar style vegetarian salad','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',1,1,'2026-04-19 03:57:03'),(119,'Russian Salad','Salads','All','Creamy Russian style salad','https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',1,1,'2026-04-19 03:57:03'),(120,'Mix Vegan Salad','Salads','All','Fresh vegan mixed salad bowl','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',1,1,'2026-04-19 03:57:03'),(121,'Sprout Salad','Salads','All','Healthy mixed sprouts salad','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',1,1,'2026-04-19 03:57:03'),(122,'Soft Beverages','Welcome Drink','All','Assorted cold soft drinks','https://images.unsplash.com/photo-1548940740-204726a19be3?w=400',1,1,'2026-04-19 03:57:03'),(123,'Lime Water','Welcome Drink','All','Fresh chilled lime water','https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400',1,1,'2026-04-19 03:57:03'),(124,'Kokum Sarbat','Welcome Drink','All','Traditional Goan kokum drink','https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400',1,1,'2026-04-19 03:57:03'),(125,'Lemon Mint Mojito','Welcome Drink','All','Fresh lemon and mint mojito','https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400',1,1,'2026-04-19 03:57:03'),(126,'Green Apple Mojito','Welcome Drink','Premium','Refreshing green apple mojito','https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400',1,1,'2026-04-19 03:57:03'),(127,'Blue Lagoon','Welcome Drink','Premium','Blue lagoon mocktail','https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400',1,1,'2026-04-19 03:57:03'),(128,'Watermelon Lemonade','Welcome Drink','All','Fresh watermelon lemonade','https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400',1,1,'2026-04-19 03:57:03'),(129,'Pineapple Juice','Welcome Drink','All','Fresh pressed pineapple juice','https://images.unsplash.com/photo-1546173159-315724a31696?w=400',1,1,'2026-04-19 03:57:03'),(130,'Watermelon Juice','Welcome Drink','All','Fresh chilled watermelon juice','https://images.unsplash.com/photo-1546173159-315724a31696?w=400',1,1,'2026-04-19 03:57:03'),(131,'Mosambi Juice','Welcome Drink','All','Fresh sweet lime juice','https://images.unsplash.com/photo-1546173159-315724a31696?w=400',1,1,'2026-04-19 03:57:03'),(132,'Banana Milkshake','Welcome Drink','All','Thick creamy banana milkshake','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',1,1,'2026-04-19 03:57:03'),(133,'Papaya Milkshake','Welcome Drink','All','Fresh papaya milkshake','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',1,1,'2026-04-19 03:57:03'),(134,'Chickoo Milkshake','Welcome Drink','All','Creamy chickoo milkshake','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',1,1,'2026-04-19 03:57:03'),(135,'Mango Milkshake','Welcome Drink','All','Fresh mango milkshake','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',1,1,'2026-04-19 03:57:03'),(136,'Chocolate Milkshake','Welcome Drink','All','Rich chocolate milkshake','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',1,1,'2026-04-19 03:57:03'),(137,'Pani Puri','Chaat','All','Crispy puris with tangy pani','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(138,'Sev Puri','Chaat','All','Crispy puris topped with sev and chutney','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(139,'Bhel Puri','Chaat','All','Puffed rice tossed with chutneys','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(140,'Dahi Puri','Chaat','All','Puris filled with yogurt and chutney','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(141,'Ragada Tikki','Chaat','All','Potato patties with white pea curry','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(142,'Papadi Chaat','Chaat','All','Crispy papadi with yogurt and chutney','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(143,'Sev Batata Puri','Chaat','All','Puri with potato and sev topping','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(144,'Delhi Aloo Chaat','Chaat','All','Spiced Delhi style potato chaat','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(145,'Roti Counter','Live Counters','All','Live roti making counter','https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',1,1,'2026-04-19 03:57:03'),(146,'Salad Bar Counter','Live Counters','Premium','Fresh salad bar counter','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',1,1,'2026-04-19 03:57:03'),(147,'Chaat Counter','Live Counters','All','Live chaat making counter','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',1,1,'2026-04-19 03:57:03'),(148,'Live Tandoori Counter','Live Counters','Premium','Live tandoor grilling counter','https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',0,1,'2026-04-19 03:57:03'),(149,'Authentic Dosa Counter','Live Counters','Premium','Live South Indian dosa counter','https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',1,1,'2026-04-19 03:57:03'),(150,'Shahi Mithai Tawa Counter','Live Counters','Mannat Special','Live sweet tawa counter','https://images.unsplash.com/photo-1601303516534-bf33e9c26b40?w=400',1,1,'2026-04-19 03:57:03'),(151,'Shawarma Counter','Live Counters','Mannat Special','Live shawarma counter','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',0,1,'2026-04-19 03:57:03'),(152,'Paan Counter','Live Counters','All','Variety of paan counter','https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400',1,1,'2026-04-19 03:57:03'),(153,'Ice Cream Counter','Live Counters','Premium','Live ice cream serving counter','https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',1,1,'2026-04-19 03:57:03'),(154,'Jilebi Counter','Live Counters','All','Live hot jalebi making counter','https://images.unsplash.com/photo-1601303516534-bf33e9c26b40?w=400',1,1,'2026-04-19 03:57:03'),(155,'Shahi Paan','Paan','All','Rich and royal shahi paan','https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400',1,1,'2026-04-19 03:57:03'),(156,'Thandai Paan','Paan','All','Cool thandai flavoured paan','https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400',1,1,'2026-04-19 03:57:03'),(157,'Mithai Paan','Paan','All','Sweet mithai filled paan','https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400',1,1,'2026-04-19 03:57:03'),(158,'Chocolate Paan','Paan','Premium','Chocolate filled sweet paan','https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400',1,1,'2026-04-19 03:57:03'),(159,'Banarasi Mint Paan','Paan','All','Classic Banarasi mint paan','https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400',1,1,'2026-04-19 03:57:03'),(160,'Calcutta Sweet Paan','Paan','All','Traditional Calcutta sweet paan','https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400',1,1,'2026-04-19 03:57:03'),(161,'Banarasi Sweet Paan','Paan','All','Sweet Banarasi paan','https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400',1,1,'2026-04-19 03:57:03'),(162,'Jalebi (Live)','Dessert','All','Hot crispy jalebis made live','https://images.unsplash.com/photo-1601303516534-bf33e9c26b40?w=400',1,1,'2026-04-19 03:57:03'),(163,'Rabdi','Dessert','All','Thick creamy rabdi','https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',1,1,'2026-04-19 03:57:03'),(164,'Muzaffar Kheer','Dessert','All','Saffron rice kheer','https://images.unsplash.com/photo-1567337710282-00832b415979?w=400',1,1,'2026-04-19 03:57:03'),(165,'Pumpkin Halwa','Dessert','All','Sweet pumpkin halwa with dry fruits','https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',1,1,'2026-04-19 03:57:03'),(166,'Bread Halwa','Dessert','All','Rich bread halwa with ghee','https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',1,1,'2026-04-19 03:57:03'),(167,'Gajar Halwa','Dessert','All','Classic carrot pudding with dry fruits','https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',1,1,'2026-04-19 03:57:03'),(168,'Gulab Jamun','Dessert','All','Soft milk dumplings in sugar syrup','https://images.unsplash.com/photo-1601303516534-bf33e9c26b40?w=400',1,1,'2026-04-19 03:57:03'),(169,'Kulfi Toppings','Dessert','All','Traditional kulfi with toppings','https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',1,1,'2026-04-19 03:57:03'),(170,'Rasmalai','Dessert','Premium','Soft cheese patties in saffron milk','https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',1,1,'2026-04-19 03:57:03'),(171,'Shahi Tukda','Dessert','Mannat Special','Fried bread in saffron rabri','https://images.unsplash.com/photo-1601303516534-bf33e9c26b40?w=400',1,1,'2026-04-19 03:57:03'),(172,'Fruit Salad Ice Cream','Dessert','All','Fresh fruit salad with ice cream','https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',1,1,'2026-04-19 03:57:03'),(173,'Ice Creams','Dessert','All','Variety of ice cream flavours','https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',1,1,'2026-04-19 03:57:03'),(174,'Live Meetha','Dessert','All','Live sweet counter','https://images.unsplash.com/photo-1601303516534-bf33e9c26b40?w=400',1,1,'2026-04-19 03:57:03');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `event_type` varchar(100) NOT NULL,
  `event_date` date NOT NULL,
  `event_location` text NOT NULL,
  `num_of_guests` int NOT NULL,
  `package_id` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `advance_amount` decimal(10,2) NOT NULL,
  `balance_amount` decimal(10,2) NOT NULL,
  `order_status` enum('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'Birthday','2026-05-02','GM HALL ',600,1,126000.00,37800.00,88200.00,'pending','2026-04-18 15:05:09'),(2,1,'Corporate','2026-05-02','GM HALL ',500,1,115000.00,34500.00,80500.00,'pending','2026-04-18 15:13:55'),(3,1,'Birthday','2026-05-07','Margao hall',500,1,115000.00,34500.00,80500.00,'pending','2026-04-18 15:25:21'),(4,1,'Birthday','2026-05-05','cuncolim muncipal',500,1,115000.00,34500.00,80500.00,'pending','2026-04-18 15:32:06'),(5,1,'Birthday','2026-05-02','swarna',500,2,125000.00,37500.00,87500.00,'pending','2026-04-18 15:43:41'),(6,1,'Anniversary','2026-05-02','GM hall',500,2,125000.00,37500.00,87500.00,'pending','2026-04-18 16:28:37'),(7,1,'Birthday','2026-05-01','GM hall',500,1,115000.00,34500.00,80500.00,'pending','2026-04-18 16:38:34'),(8,10,'Birthday','2026-04-25','G. M. Celebration Hall, IDC, Canacona Industrial Estate, Canacona, Goa 403702, India',500,6,300000.00,90000.00,210000.00,'pending','2026-04-19 01:51:07');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_name` varchar(100) NOT NULL,
  `package_type` enum('Standard','Premium','Mannat Special') NOT NULL,
  `counter_setup` varchar(100) DEFAULT NULL,
  `waiter_info` varchar(100) DEFAULT NULL,
  `min_guests` int DEFAULT '600',
  `price_500` int NOT NULL,
  `price_600` int NOT NULL,
  `total_500` int NOT NULL,
  `total_600` int NOT NULL,
  `welcome_drink` text,
  `main_course` text,
  `desserts` text,
  `extras` text,
  `is_available` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
INSERT INTO `packages` VALUES (1,'Standard Package No-01','Standard','Normal Counter','Limited Waiter',600,230,210,115000,126000,'Lemon Water (Complimentary)','Chicken Biryani, Chicken Gravy, Chicken Dry Fry, Mix Chopped Green Salad, Rumali Roti (Live), Water Bottle, Soft Drinks','Gulab Jamun / Kheer',NULL,1,'2026-04-12 14:51:55'),(2,'Standard Package No-02','Standard','Normal Counter','Limited Waiter',600,250,220,125000,132000,'Lemon Water (Complimentary)','Chicken Dum Biryani, Chicken Bhuna Masala Gravy, Chicken Kebab Fry, Veg Pulav (10%), Shahi Korma Mix Veg (10%), Gobi Manchurian Tossed (10%), Mix Chopped Green Salad, Pickle, Rumali Roti (Live), Water Bottle, Soft Drinks','Gulab Jamun / Live Jalebi / Kheer',NULL,1,'2026-04-12 14:51:55'),(3,'Premium Package No-01','Premium','Golden Counter Setup','35 Waiters',600,260,240,130000,144000,'Blue Lagoon Mojito (Complimentary)','Chicken Dum Biryani, Butter Chicken / Chicken Masala, Chicken Juicy Kebab, Veg Pulav, Shahi Korma Mix Veg, Gobi Manchurian Tossed, Mix Chopped Green Salad, Raita, Pickle, Rumali Roti (Live), Water Bottle, Soft Drinks (Unlimited)','Gulab Jamun / Live Jalebi / Ice Cream','Mojito for all on Family Table, Additional 2 types of Chicken Dishes',1,'2026-04-12 14:51:55'),(4,'Premium Package No-02','Premium','Golden Counter Setup','40 Waiters',600,300,280,150000,168000,'Lemon & Mint Refresher, Blue Lagoon Mojito (Complimentary)','Chicken Dum Biryani, Chicken Hyderabadi Gravy, Chicken Juicy Tandoori (Live), Chicken Shahi Kabab, Veg Dum Biryani, Kadai Mutter Paneer, Gobi Crispy Dry Tossed, Mix Vegan Salad, Boondi Raita, Special Pickle, Rumali Roti (Live), Water Bottle (Unlimited), Soft Drink (Unlimited)','Gulab Jamun / Ras Malai / Ice Cream / Special Shahi Kheer','Mojito for all on Family Table, Additional 2 types of Chicken Dishes',1,'2026-04-12 14:51:55'),(5,'Mannat Special Package No-01','Mannat Special','Golden Counter Setup','40 Waiters',600,450,400,225000,240000,'Virgin Mojito, Blue Lagoon, Strawberry Delight (Complimentary)','Chicken Dum Biryani, Mughlai Chicken Lababdar Gravy, Chicken Afghani Tandoori, Chicken Kebab Two Types, Chicken Sizzler (Live On Table), Green Peas Pulav, Mutter Paneer, Veg Crispy Dry, Green Salad, Boondi Raita, Pickle, Rumali Roti (Live), Water Bottle (Unlimited), Soft Drink (Unlimited)','Fresh Fruits Ice Cream with Falooda','Mojito for all on Family Table, Additional 2 types of Chicken Dishes',1,'2026-04-12 14:51:55'),(6,'Mannat Special Package No-02','Mannat Special','Golden Counter Setup','50 Waiters',600,600,520,300000,312000,'Virgin Mojito, Strawberry Delight, Lemon & Mint Refresher, Veg Spring Roll, Veg Crispy, Chicken Kabab, Chicken Pahadi Kabab','Mutton Dum Biryani, Chicken Bhuna Masala / Chicken Changezi, Chicken Sizzler (Live On Table), Murg Malai Sheek Kebab, Zafrani Veg Pulav, Chole Masala, Veg Crispy Dry Fry, Green Salad, Russian Salad, Boondi Raita, Pickle, Rumali Roti (Live), Water Bottle (Unlimited), Soft Drink (Unlimited)','Live Jalebi Rabdi, Live Roller Charka Ice Cream, Fresh Fruits','Mojito for all on Family Table, Additional 2 types of Chicken Dishes',1,'2026-04-12 14:51:55'),(7,'Mannat Special Package No-03','Mannat Special','Golden Counter Setup','50 Waiters',600,650,600,325000,360000,'Mojito, Blue Lagoon, Summer Hummer, Curaoco, Lemon Mint Mojito','Mutton Dum Biryani, Chicken Rogan Josh, Pathani Seekh Kebab, Chicken Sattey, Veg Dum Biryani, Hara Bhara Kebab, Veg Shahi Kurma, Roomali Roti (Live), Kulcha Naan (Live)','Gulab Jamun, Rabdi Jalebi, Shahi Tukda, Ice Cream','Starters: Corn Cheese Balls, Chicken Kheema Kebab, Chicken Palodi Kebab, Chicken Pakoda, Chicken Chilli, Gobi Manchurian, Chicken Malai. Fresh Fruit Juice Counter: Watermelon, Orange. Live Counters: Live Paan Station, Pani Puri, Natural Ice Cream, Fish Live Counter. Mojito for all on Family Table',1,'2026-04-12 14:51:55');
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `razorpay_order_id` varchar(100) DEFAULT NULL,
  `razorpay_payment_id` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_status` enum('pending','success','failed') DEFAULT 'pending',
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,4,1,'order_Sf0QDYXeiBADrt',NULL,3450000.00,'pending','2026-04-18 15:32:08'),(2,5,1,'order_Sf0cS2lxpcEKgG',NULL,3750000.00,'pending','2026-04-18 15:43:43'),(3,6,1,'order_Sf1Nv443tFDlol',NULL,3750000.00,'pending','2026-04-18 16:28:39'),(4,7,1,'order_Sf1YPpYdFP93cQ',NULL,3450000.00,'pending','2026-04-18 16:38:35'),(5,8,10,'order_SfAy8m1YLbb1wK',NULL,9000000.00,'pending','2026-04-19 01:51:10');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` text,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'roshel','roshel@gmail.com','78451223','','$2b$10$laqX19xhxsU4H62s.90rE.hkOD1Yoh0U3Md3VwQIT0ph5RLumr4TK','2026-03-09 01:09:39'),(2,'Abrar Shaikh','abushaikh0018@gmail.com','9823148908','Hno.32 G Takaband cuncolim sal','$2b$10$TciIY0LdInP1eHU0sk1ozOg8GADxK0UXKTKTFPyjA9VROa99J8x62','2026-03-11 04:39:18'),(3,'san','san@gmail.com','1234567891','','$2b$10$ut5XtsMtMx2cUlwLpnPKWO3YwgLX/eI0BTRjmcOCinJjNiaaRDF2.','2026-03-29 12:18:23'),(4,'sam','sam@gmial.com','1234569871','','$2b$10$0gp8v3o1HnHX6dYmjCzC4ulWg/8tv6B0/cFhv1IStxEc/ZLFbvyMO','2026-04-15 18:28:12'),(5,'afu','afu@gmail.com','99999999','','$2b$10$Qou71q29bd7PqDl6zTQTT.WR6W.QMECXoOLHwTpuGjO8L/KxUWCKG','2026-04-18 13:52:47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-19  9:48:29
