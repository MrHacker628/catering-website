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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Abrar Shaikh','abushaikh0018@gmail.com','9699791068','Hno.32 G Takaband cuncolim sal','2026-03-01 18:14:00'),(2,'sam','samshaikh@gmail.com','9823148908','Hno.32 G margoa','2026-03-01 18:27:01'),(3,'saeil','saeili@gmail.com','1234569876','canacona','2026-03-02 04:47:35'),(4,'Saieel ','saieel@gmail.com','9764499100','Margao Goa','2026-03-02 05:09:40'),(5,'juju','juju@gamil.com','9823148908','panajim','2026-03-02 07:57:20'),(6,'Test Bro','test@gmail.com','9999999999','Test City','2026-04-11 06:39:09'),(7,'san','san@gmail.com','1234567891','','2026-04-15 15:11:22');
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
  `category` enum('Veg Thali','Non-Veg Thali','Biryani','Starters','Desserts','Beverages','Custom Package') NOT NULL,
  `description` text,
  `price_per_plate` decimal(10,2) NOT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,'Veg Thali Special','Veg Thali','Dal, Rice, Roti, Sabji, Salad, Papad',250.00,1,'2026-03-01 09:12:47'),(2,'Non-Veg Thali Special','Non-Veg Thali','Chicken Curry, Rice, Roti, Salad, Papad',350.00,1,'2026-03-01 09:12:47'),(3,'Chicken Biryani','Biryani','Hyderabadi style chicken biryani with raita',300.00,1,'2026-03-01 09:12:47'),(4,'Veg Biryani','Biryani','Aromatic veg biryani with raita',200.00,1,'2026-03-01 09:12:47'),(5,'Paneer Tikka','Starters','Tandoori paneer tikka with mint chutney',150.00,1,'2026-03-01 09:12:47'),(6,'Chicken Tikka','Starters','Juicy chicken tikka with mint chutney',180.00,1,'2026-03-01 09:12:47'),(7,'Gulab Jamun','Desserts','2 pieces per plate with sugar syrup',80.00,1,'2026-03-01 09:12:47'),(8,'Ice Cream','Desserts','2 scoops vanilla or chocolate',60.00,1,'2026-03-01 09:12:47'),(9,'Cold Drinks','Beverages','Pepsi, Sprite or Maaza',40.00,1,'2026-03-01 09:12:47'),(10,'Fresh Juice','Beverages','Orange, Watermelon or Mango',60.00,1,'2026-03-01 09:12:47');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_menu_items`
--

DROP TABLE IF EXISTS `order_menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_menu_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `menu_item_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price_per_plate` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `order_menu_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_menu_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_menu_items`
--

LOCK TABLES `order_menu_items` WRITE;
/*!40000 ALTER TABLE `order_menu_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_menu_items` ENABLE KEYS */;
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
  `menu_selected` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `advance_amount` decimal(10,2) NOT NULL,
  `balance_amount` decimal(10,2) NOT NULL,
  `order_status` enum('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'Wedding','2026-12-20','swarna',500,'7,8,9,10,6,5',285000.00,85500.00,199500.00,'pending','2026-03-01 18:14:00'),(2,2,'Birthday','2026-11-18','kGN hall phonda',600,'7,8,10,9,5,6,4',462000.00,138600.00,323400.00,'pending','2026-03-01 18:27:01'),(3,3,'Corporate','2026-11-10','cuncolim muncipal',200,'9,8,7,10',48000.00,14400.00,33600.00,'pending','2026-03-02 04:47:35'),(4,4,'Anniversary','2024-03-25','Margao hall',99,'1,2,3,4',108900.00,32670.00,76230.00,'pending','2026-03-02 05:09:40'),(5,5,'Other','2026-11-10','mapusa',200,'3,4,5',130000.00,39000.00,91000.00,'completed','2026-03-02 07:57:20'),(6,6,'Wedding','2026-10-25','test location',100,'9,10,8,7',24000.00,7200.00,16800.00,'pending','2026-04-11 06:39:09'),(7,7,'Wedding','2026-05-09','test location',500,'Standard Package No-01',115000.00,34500.00,80500.00,'pending','2026-04-15 15:11:22'),(8,7,'Wedding','2026-05-07','test location',500,'Standard Package No-01',115000.00,34500.00,80500.00,'pending','2026-04-15 15:38:44'),(9,7,'Wedding','2026-05-06','test location',500,'Standard Package No-01',115000.00,34500.00,80500.00,'pending','2026-04-15 15:43:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,7,7,'order_SdoT0iKYj2xQGE',NULL,34500.00,'pending','2026-04-15 15:11:26'),(2,8,7,'order_SdovrUFCxHrmrg',NULL,34500.00,'pending','2026-04-15 15:38:45'),(3,8,7,'order_Sdow2FhKIrXWgk',NULL,34500.00,'pending','2026-04-15 15:38:55'),(4,9,7,'order_Sdp1NGZmJHQGK5',NULL,34500.00,'pending','2026-04-15 15:43:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'roshel','roshel@gmail.com','78451223','','$2b$10$laqX19xhxsU4H62s.90rE.hkOD1Yoh0U3Md3VwQIT0ph5RLumr4TK','2026-03-09 01:09:39'),(2,'Abrar Shaikh','abushaikh0018@gmail.com','9823148908','Hno.32 G Takaband cuncolim sal','$2b$10$TciIY0LdInP1eHU0sk1ozOg8GADxK0UXKTKTFPyjA9VROa99J8x62','2026-03-11 04:39:18'),(3,'san','san@gmail.com','1234567891','','$2b$10$ut5XtsMtMx2cUlwLpnPKWO3YwgLX/eI0BTRjmcOCinJjNiaaRDF2.','2026-03-29 12:18:23');
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

-- Dump completed on 2026-04-15 22:26:35
