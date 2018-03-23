-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: showme
-- ------------------------------------------------------
-- Server version	10.1.26-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `showme`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `showme` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `showme`;

--
-- Table structure for table `Author`
--

DROP TABLE IF EXISTS `Author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Author` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `node_id` bigint(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `node_id` (`node_id`),
  CONSTRAINT `Author_ibfk_1` FOREIGN KEY (`node_id`) REFERENCES `Node` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Author`
--

LOCK TABLES `Author` WRITE;
/*!40000 ALTER TABLE `Author` DISABLE KEYS */;
INSERT INTO `Author` VALUES (1,'Wang',1),(2,'Feng',1),(3,'Lu',1),(4,'Yu',1),(5,'Acharya',2),(6,'Gibbons',2),(7,'Poosala',2),(8,'Agarwal',3),(9,'Agrawal',3),(10,'Deshpande',3),(11,'Gupta',3),(12,'Naughton',3),(13,'Ramakrishnan',3),(14,'Sarawagi',3),(15,'Barbar´a',4),(16,'Sullivan',4),(17,'Beyer',5),(18,'Ramakrishnan',5),(19,'Geffner',6),(20,'Agrawal',6),(21,'Abbadi',6),(22,'Smith',6),(23,'Gibbons',7),(24,'Matias',7),(25,'Gray',8),(26,'Bosworth',8),(27,'Layman',8),(28,'Pirahesh',8),(29,'Gunopulos',9),(30,'Kollios',9),(31,'Tsotras',9),(32,'Domeniconi',9),(33,'Iyer',10),(34,'Wilhite',10),(35,'Lee',11),(36,'Ling',11),(37,'Li',11),(38,'Li',12),(39,'Rotem',12),(40,'Srivastava',12),(41,'Poosala',13),(42,'Ganti',13),(43,'Ross',14),(44,'Srivastava',14),(45,'Ross',15),(46,'Zaman',15),(47,'Shanmugasundaram',16),(48,'Fayyad',16),(49,'Bradley',16),(50,'Vitter',17),(51,'Wang',17),(52,'Iyer',17),(53,'Wong',18),(54,'Liu',18),(55,'Olken',18),(56,'Rotem',18),(57,'Wong',18),(58,'Zhao',19),(59,'Deshpande',19),(60,'Naughton',19);
/*!40000 ALTER TABLE `Author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Citation_snippet`
--

DROP TABLE IF EXISTS `Citation_snippet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Citation_snippet` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `edge_id` bigint(30) DEFAULT NULL,
  `text` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `edge_id` (`edge_id`),
  CONSTRAINT `Citation_snippet_ibfk_1` FOREIGN KEY (`edge_id`) REFERENCES `Edge` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Citation_snippet`
--

LOCK TABLES `Citation_snippet` WRITE;
/*!40000 ALTER TABLE `Citation_snippet` DISABLE KEYS */;
INSERT INTO `Citation_snippet` VALUES (1,1,'Compared to the related approaches proposed in the lit- erature, a condensed cube has the following unique features. • A condensed cube is not compressed. Although the size of a condensed cube is smaller than the complete cube, it is not compressed. It does not require de- compression when the condensed cube is used to an- swer queries. Hence, no extra overhead will be intro- duced. • A condensed cube is a fully computed cube. It is dif- ferent from those approaches that reduce the size of a data cube by selectively computing some, but not all, cuboids in the cube. Therefore, no further application of aggregation function is required when a condensed cube is used to answer queries. • A condensed cube provides accurate aggregate val- It is different from those approaches that re- ues. duce the cube size through approximation with various forms, such as wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], his- togram [12], sampling [1] and others [8]. •'),(2,1,'query answering in the data warehouse environment include wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], histogram [12], sampling [1], etc. '),(3,2,'Although issues related to the size of data cubes have at- tracted the attention of researchers, and various algorithms have been developed aiming at fast computation of large sparse data cubes [2, 18, 13, 4], relatively fewer papers con- centrated on solving the complexity problem of data cube computation from its root: reducing the size of a data cube. In this paper, we introduce a novel concept, condensed cube, for reducing the size of a data cube and hence its computation time and storage overhead. A condensed cube is a fully computed cube that condenses those tu- ples, aggregated from the same set of base relation tu- '),(4,2,'As shown in Figure 3(a), the top-down approach com- putes the base cuboid ﬁrst. A cuboid of n − 1 attributes is computed from an n-attribute cuboid that contains all the n − 1 attributes. The rationale is to share the cost of parti- tioning and/or sorting, etc. among computations of related cuboids. Most cube computation algorithms belong to this category [2, 18, 13]. The bottom-up approach shown in Fig- ure 3(b) was originally proposed to process so-called ice- berg cube queries [4]. Iceberg cube queries only retrieve those partitions that satisfy user-speciﬁed aggregate condi- tions. Using the bottom-up approach, it is possible to prune off those partitions that do not satisfy the condition as early as possible. '),(5,2,'The work reported in this paper is inspired by data cube computation algorithms proposed in recent years, such as PipeSort, PipeHash, Overlap, ArrayCube, PartitionCube and BottomUpCube [2, 18, 13, 4], in particular, the work by Bayer and Ramakrishinan [4]. Since those algorithms are well noted, and we will not repeat here in detail. '),(6,3,'Compared to the related approaches proposed in the lit- erature, a condensed cube has the following unique features. • A condensed cube is not compressed. Although the size of a condensed cube is smaller than the complete cube, it is not compressed. It does not require de- compression when the condensed cube is used to an- swer queries. Hence, no extra overhead will be intro- duced. • A condensed cube is a fully computed cube. It is dif- ferent from those approaches that reduce the size of a data cube by selectively computing some, but not all, cuboids in the cube. Therefore, no further application of aggregation function is required when a condensed cube is used to answer queries. • A condensed cube provides accurate aggregate val- It is different from those approaches that re- ues. duce the cube size through approximation with various forms, such as wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], his- togram [12], sampling [1] and others [8]. •'),(7,3,'query answering in the data warehouse environment include wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], histogram [12], sampling [1], etc. '),(8,4,'It is obvious that CUBE BY is an expensive operator and its result is extremely large, especially when the number of CUBE BY attributes and the number of tuples in the base relation are large. Given a base relation R with n attributes, the number of tuples in a k-attribute cuboid (GROUP BY), 0 ≤ k ≤ n, is the number of tuples in R that have distinct attribute values on the k-attributes. The size of a cuboid is possibly close to the size of R. Since the complete cube of R consists of 2n cuboids, the size of the union of 2n cuboids is much larger than the size of R. Consequently, the I/O cost even for storing the cube result tuples becomes domi- native as indicated in [13, 4]. The huge size of a data cube makes data cube computation time-consuming. Although the cheap and high volume memory chips are available, it is difﬁcult to hold the whole data cube of a large relation in the main memory. '),(9,4,'Although issues related to the size of data cubes have at- tracted the attention of researchers, and various algorithms have been developed aiming at fast computation of large sparse data cubes [2, 18, 13, 4], relatively fewer papers con- centrated on solving the complexity problem of data cube computation from its root: reducing the size of a data cube. In this paper, we introduce a novel concept, condensed cube, for reducing the size of a data cube and hence its computation time and storage overhead. A condensed cube is a fully computed cube that condenses those tu- ples, aggregated from the same set of base relation tu- '),(10,4,'As shown in Figure 3(a), the top-down approach com- putes the base cuboid ﬁrst. A cuboid of n − 1 attributes is computed from an n-attribute cuboid that contains all the n − 1 attributes. The rationale is to share the cost of parti- tioning and/or sorting, etc. among computations of related cuboids. Most cube computation algorithms belong to this category [2, 18, 13]. The bottom-up approach shown in Fig- ure 3(b) was originally proposed to process so-called ice- berg cube queries [4]. Iceberg cube queries only retrieve those partitions that satisfy user-speciﬁed aggregate condi- tions. Using the bottom-up approach, it is possible to prune off those partitions that do not satisfy the condition as early as possible. '),(11,4,'BST condensing requires to identify those partitions with only one tuple, which is essentially similar to the require- ment of iceberg queries. The algorithm BottomU pBST is basically a modiﬁed version of the original BUC algorithm proposed by Bayer and Ramakrishnan [4]. '),(12,4,'Two heuristics for ordering the dimensions for bottom- up cube computation are proposed in [4]. The ﬁrst heuristic is to order the dimensions based on decreasing cardinality. The second heuristic is to order the dimensions based on increasing maximum number of duplicates. When the data is not skewed, the two heuristics are equivalent. For some real dataset, small difference has been found. In our im- plementation, we order the dimensions based on decreasing cardinality. The rationale is that, with higher cardinality and ﬁxed number of tuples, the probability of a tuple being sin- gle tuple because of the attribute is higher. As we mentioned earlier, it had better to ﬁnd such tuples as early as possible. '),(13,4,'All experiments are conducted on an Athlon 900Hz PC with 256M RAM, 20G hard disk. There are three classes of datasets used in the experiments. The ﬁrst two are synthetic datasets with uniform and Zipf distribution. The other is the real datasets containing weather conditions at various weather stations on land for September 1985 [13]. This weather dataset was frequently used in recent data cube computation experiments [13, 4, 14]. '),(14,4,'The last set of experiments investigates the performance of algorithms using single tuple condensing by comparing RBU-BST with a well-known fast algorithm BUC [4]. The experiment was repeated 7 times with the number of dimen- sions varying from 3 to 9. '),(15,4,'The work reported in this paper is inspired by data cube computation algorithms proposed in recent years, such as PipeSort, PipeHash, Overlap, ArrayCube, PartitionCube and BottomUpCube [2, 18, 13, 4], in particular, the work by Bayer and Ramakrishinan [4]. Since those algorithms are well noted, and we will not repeat here in detail. '),(16,4,'The work reported in this paper is inspired by data cube computation algorithms proposed in recent years, such as PipeSort, PipeHash, Overlap, ArrayCube, PartitionCube and BottomUpCube [2, 18, 13, 4], in particular, the work by Bayer and Ramakrishinan [4]. Since those algorithms are well noted, and we will not repeat here in detail. '),(17,5,'Several specialized data structures for fast processing of special types of queries were also proposed. Preﬁx sum and relative preﬁx sum methods [5] are proposed to answer range-sum queries using a large pre-computed preﬁx cube. More recently, the hierarchical compact cube is proposed to support range max queries [10]. '),(18,6,'Approximate query processing can be viewed as a tech- nique that addresses the size problem from another angle, which is especially popular in the data warehouse envi- ronment. [6] argues the importance of the synopsis data structures. Characterized by their substantially small sizes, synopsis data structures can efﬁciently provide approximate query results in many applications. The statistical meth- ods and models used for the purpose of fast approximate '),(19,7,'In order to effectively support decision support queries, a new operator, CUBE BY, was proposed [7]. It is a multi- dimensional extension of the relational operator GROUP '),(20,7,'The CUBE BY operator [7] is an n-dimensional gener- alization of the relational GROUP BY operator. For a base relation R with n dimension attributes (D1, . . . , Dn) and one measure attribute M, the complete data cube of R (de- noted as Q(R)) on all dimensions is generated by CUBE BY on D1, . . . , Dn. This is equivalent to the 2n GROUP BYs on each different subset of the n dimension set. We refer to each GROUP BY as a cuboid [13]. The cuboid on all n attributes is called base cuboid. '),(21,8,'Compared to the related approaches proposed in the lit- erature, a condensed cube has the following unique features. • A condensed cube is not compressed. Although the size of a condensed cube is smaller than the complete cube, it is not compressed. It does not require de- compression when the condensed cube is used to an- swer queries. Hence, no extra overhead will be intro- duced. • A condensed cube is a fully computed cube. It is dif- ferent from those approaches that reduce the size of a data cube by selectively computing some, but not all, cuboids in the cube. Therefore, no further application of aggregation function is required when a condensed cube is used to answer queries. • A condensed cube provides accurate aggregate val- It is different from those approaches that re- ues. duce the cube size through approximation with various forms, such as wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], his- togram [12], sampling [1] and others [8]. •'),(22,9,'Techniques directly related to size reduction include data compression, a classical technique. However, data com- pression in relational databases is not that popular. [9] gives a wide discussion on impact of compression technology in database from an architectural view, with main emphasis on the choice of algorithms. In the ﬁeld of statistical database, transposed table is used and [17] further takes the advan- tage of encoding attribute values using a small number of bits to reduce the storage space. Run length encoding was also proposed to compress the repeating sub-sequences that are likely to occur in the least rapidly varying columns. Var- ious compression techniques are also adopted in the ﬁeld of MOLAP, mainly to handle the sparsity issue [18, 11]. '),(23,10,'Compared to the related approaches proposed in the lit- erature, a condensed cube has the following unique features. • A condensed cube is not compressed. Although the size of a condensed cube is smaller than the complete cube, it is not compressed. It does not require de- compression when the condensed cube is used to an- swer queries. Hence, no extra overhead will be intro- duced. • A condensed cube is a fully computed cube. It is dif- ferent from those approaches that reduce the size of a data cube by selectively computing some, but not all, cuboids in the cube. Therefore, no further application of aggregation function is required when a condensed cube is used to answer queries. • A condensed cube provides accurate aggregate val- It is different from those approaches that re- ues. duce the cube size through approximation with various forms, such as wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], his- togram [12], sampling [1] and others [8]. •'),(24,10,'Several specialized data structures for fast processing of special types of queries were also proposed. Preﬁx sum and relative preﬁx sum methods [5] are proposed to answer range-sum queries using a large pre-computed preﬁx cube. More recently, the hierarchical compact cube is proposed to support range max queries [10]. '),(25,11,'Techniques directly related to size reduction include data compression, a classical technique. However, data com- pression in relational databases is not that popular. [9] gives a wide discussion on impact of compression technology in database from an architectural view, with main emphasis on the choice of algorithms. In the ﬁeld of statistical database, transposed table is used and [17] further takes the advan- tage of encoding attribute values using a small number of bits to reduce the storage space. Run length encoding was also proposed to compress the repeating sub-sequences that are likely to occur in the least rapidly varying columns. Var- ious compression techniques are also adopted in the ﬁeld of MOLAP, mainly to handle the sparsity issue [18, 11]. '),(26,12,'Compared to the related approaches proposed in the lit- erature, a condensed cube has the following unique features. • A condensed cube is not compressed. Although the size of a condensed cube is smaller than the complete cube, it is not compressed. It does not require de- compression when the condensed cube is used to an- swer queries. Hence, no extra overhead will be intro- duced. • A condensed cube is a fully computed cube. It is dif- ferent from those approaches that reduce the size of a data cube by selectively computing some, but not all, cuboids in the cube. Therefore, no further application of aggregation function is required when a condensed cube is used to answer queries. • A condensed cube provides accurate aggregate val- It is different from those approaches that re- ues. duce the cube size through approximation with various forms, such as wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], his- togram [12], sampling [1] and others [8]. •'),(27,12,'query answering in the data warehouse environment include wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], histogram [12], sampling [1], etc. '),(28,13,'It is obvious that CUBE BY is an expensive operator and its result is extremely large, especially when the number of CUBE BY attributes and the number of tuples in the base relation are large. Given a base relation R with n attributes, the number of tuples in a k-attribute cuboid (GROUP BY), 0 ≤ k ≤ n, is the number of tuples in R that have distinct attribute values on the k-attributes. The size of a cuboid is possibly close to the size of R. Since the complete cube of R consists of 2n cuboids, the size of the union of 2n cuboids is much larger than the size of R. Consequently, the I/O cost even for storing the cube result tuples becomes domi- native as indicated in [13, 4]. The huge size of a data cube makes data cube computation time-consuming. Although the cheap and high volume memory chips are available, it is difﬁcult to hold the whole data cube of a large relation in the main memory. '),(29,13,'Although issues related to the size of data cubes have at- tracted the attention of researchers, and various algorithms have been developed aiming at fast computation of large sparse data cubes [2, 18, 13, 4], relatively fewer papers con- centrated on solving the complexity problem of data cube computation from its root: reducing the size of a data cube. In this paper, we introduce a novel concept, condensed cube, for reducing the size of a data cube and hence its computation time and storage overhead. A condensed cube is a fully computed cube that condenses those tu- ples, aggregated from the same set of base relation tu- '),(30,13,'The CUBE BY operator [7] is an n-dimensional gener- alization of the relational GROUP BY operator. For a base relation R with n dimension attributes (D1, . . . , Dn) and one measure attribute M, the complete data cube of R (de- noted as Q(R)) on all dimensions is generated by CUBE BY on D1, . . . , Dn. This is equivalent to the 2n GROUP BYs on each different subset of the n dimension set. We refer to each GROUP BY as a cuboid [13]. The cuboid on all n attributes is called base cuboid. '),(31,13,'As shown in Figure 3(a), the top-down approach com- putes the base cuboid ﬁrst. A cuboid of n − 1 attributes is computed from an n-attribute cuboid that contains all the n − 1 attributes. The rationale is to share the cost of parti- tioning and/or sorting, etc. among computations of related cuboids. Most cube computation algorithms belong to this category [2, 18, 13]. The bottom-up approach shown in Fig- ure 3(b) was originally proposed to process so-called ice- berg cube queries [4]. Iceberg cube queries only retrieve those partitions that satisfy user-speciﬁed aggregate condi- tions. Using the bottom-up approach, it is possible to prune off those partitions that do not satisfy the condition as early as possible. '),(32,13,'All experiments are conducted on an Athlon 900Hz PC with 256M RAM, 20G hard disk. There are three classes of datasets used in the experiments. The ﬁrst two are synthetic datasets with uniform and Zipf distribution. The other is the real datasets containing weather conditions at various weather stations on land for September 1985 [13]. This weather dataset was frequently used in recent data cube computation experiments [13, 4, 14]. '),(33,13,'All experiments are conducted on an Athlon 900Hz PC with 256M RAM, 20G hard disk. There are three classes of datasets used in the experiments. The ﬁrst two are synthetic datasets with uniform and Zipf distribution. The other is the real datasets containing weather conditions at various weather stations on land for September 1985 [13]. This weather dataset was frequently used in recent data cube computation experiments [13, 4, 14]. '),(34,13,'The work reported in this paper is inspired by data cube computation algorithms proposed in recent years, such as PipeSort, PipeHash, Overlap, ArrayCube, PartitionCube and BottomUpCube [2, 18, 13, 4], in particular, the work by Bayer and Ramakrishinan [4]. Since those algorithms are well noted, and we will not repeat here in detail. '),(35,14,'All experiments are conducted on an Athlon 900Hz PC with 256M RAM, 20G hard disk. There are three classes of datasets used in the experiments. The ﬁrst two are synthetic datasets with uniform and Zipf distribution. The other is the real datasets containing weather conditions at various weather stations on land for September 1985 [13]. This weather dataset was frequently used in recent data cube computation experiments [13, 4, 14]. '),(36,15,'Compared to the related approaches proposed in the lit- erature, a condensed cube has the following unique features. • A condensed cube is not compressed. Although the size of a condensed cube is smaller than the complete cube, it is not compressed. It does not require de- compression when the condensed cube is used to an- swer queries. Hence, no extra overhead will be intro- duced. • A condensed cube is a fully computed cube. It is dif- ferent from those approaches that reduce the size of a data cube by selectively computing some, but not all, cuboids in the cube. Therefore, no further application of aggregation function is required when a condensed cube is used to answer queries. • A condensed cube provides accurate aggregate val- It is different from those approaches that re- ues. duce the cube size through approximation with various forms, such as wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], his- togram [12], sampling [1] and others [8]. •'),(37,15,'query answering in the data warehouse environment include wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], histogram [12], sampling [1], etc. '),(38,16,'Compared to the related approaches proposed in the lit- erature, a condensed cube has the following unique features. • A condensed cube is not compressed. Although the size of a condensed cube is smaller than the complete cube, it is not compressed. It does not require de- compression when the condensed cube is used to an- swer queries. Hence, no extra overhead will be intro- duced. • A condensed cube is a fully computed cube. It is dif- ferent from those approaches that reduce the size of a data cube by selectively computing some, but not all, cuboids in the cube. Therefore, no further application of aggregation function is required when a condensed cube is used to answer queries. • A condensed cube provides accurate aggregate val- It is different from those approaches that re- ues. duce the cube size through approximation with various forms, such as wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], his- togram [12], sampling [1] and others [8]. •'),(39,16,'query answering in the data warehouse environment include wavelet [16], multivariate polynomials [3], mixed model by multivariate Gaussians [15], histogram [12], sampling [1], etc. '),(40,17,'Techniques directly related to size reduction include data compression, a classical technique. However, data com- pression in relational databases is not that popular. [9] gives a wide discussion on impact of compression technology in database from an architectural view, with main emphasis on the choice of algorithms. In the ﬁeld of statistical database, transposed table is used and [17] further takes the advan- tage of encoding attribute values using a small number of bits to reduce the storage space. Run length encoding was also proposed to compress the repeating sub-sequences that are likely to occur in the least rapidly varying columns. Var- ious compression techniques are also adopted in the ﬁeld of MOLAP, mainly to handle the sparsity issue [18, 11]. '),(41,18,'Although issues related to the size of data cubes have at- tracted the attention of researchers, and various algorithms have been developed aiming at fast computation of large sparse data cubes [2, 18, 13, 4], relatively fewer papers con- centrated on solving the complexity problem of data cube computation from its root: reducing the size of a data cube. In this paper, we introduce a novel concept, condensed cube, for reducing the size of a data cube and hence its computation time and storage overhead. A condensed cube is a fully computed cube that condenses those tu- ples, aggregated from the same set of base relation tu- '),(42,18,'As shown in Figure 3(a), the top-down approach com- putes the base cuboid ﬁrst. A cuboid of n − 1 attributes is computed from an n-attribute cuboid that contains all the n − 1 attributes. The rationale is to share the cost of parti- tioning and/or sorting, etc. among computations of related cuboids. Most cube computation algorithms belong to this category [2, 18, 13]. The bottom-up approach shown in Fig- ure 3(b) was originally proposed to process so-called ice- berg cube queries [4]. Iceberg cube queries only retrieve those partitions that satisfy user-speciﬁed aggregate condi- tions. Using the bottom-up approach, it is possible to prune off those partitions that do not satisfy the condition as early as possible. '),(43,18,'The work reported in this paper is inspired by data cube computation algorithms proposed in recent years, such as PipeSort, PipeHash, Overlap, ArrayCube, PartitionCube and BottomUpCube [2, 18, 13, 4], in particular, the work by Bayer and Ramakrishinan [4]. Since those algorithms are well noted, and we will not repeat here in detail. '),(44,18,'Techniques directly related to size reduction include data compression, a classical technique. However, data com- pression in relational databases is not that popular. [9] gives a wide discussion on impact of compression technology in database from an architectural view, with main emphasis on the choice of algorithms. In the ﬁeld of statistical database, transposed table is used and [17] further takes the advan- tage of encoding attribute values using a small number of bits to reduce the storage space. Run length encoding was also proposed to compress the repeating sub-sequences that are likely to occur in the least rapidly varying columns. Var- ious compression techniques are also adopted in the ﬁeld of MOLAP, mainly to handle the sparsity issue [18, 11]. ');
/*!40000 ALTER TABLE `Citation_snippet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Edge`
--

DROP TABLE IF EXISTS `Edge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Edge` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sourcenode_id` bigint(30) DEFAULT NULL,
  `targetnode_id` bigint(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sourcenode_id` (`sourcenode_id`),
  KEY `targetnode_id` (`targetnode_id`),
  CONSTRAINT `Edge_ibfk_1` FOREIGN KEY (`sourcenode_id`) REFERENCES `Node` (`id`),
  CONSTRAINT `Edge_ibfk_2` FOREIGN KEY (`targetnode_id`) REFERENCES `Node` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Edge`
--

LOCK TABLES `Edge` WRITE;
/*!40000 ALTER TABLE `Edge` DISABLE KEYS */;
INSERT INTO `Edge` VALUES (1,1,2),(2,1,3),(3,1,4),(4,1,5),(5,1,6),(6,1,7),(7,1,8),(8,1,9),(9,1,10),(10,1,11),(11,1,12),(12,1,13),(13,1,14),(14,1,15),(15,1,16),(16,1,17),(17,1,18),(18,1,19);
/*!40000 ALTER TABLE `Edge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Node`
--

DROP TABLE IF EXISTS `Node`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Node` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(400) DEFAULT NULL,
  `journal` varchar(150) DEFAULT NULL,
  `volume` varchar(10) DEFAULT NULL,
  `pages` varchar(10) DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Node`
--

LOCK TABLES `Node` WRITE;
/*!40000 ALTER TABLE `Node` DISABLE KEYS */;
INSERT INTO `Node` VALUES (1,'Condensed cube: An effective approach to reducing data cube size',NULL,NULL,'155--165',2002),(2,'Congressional samples for approximate answering of group-by queries',NULL,'29','487--498',2000),(3,'On the computation of multidimensional aggregates',NULL,NULL,'506--521',1996),(4,'Quasi-cubes: Exploiting approximations in multidimensional databases','SIGMOD Record','26',NULL,1997),(5,'Bottom-up computation of sparse and iceberg cubes',NULL,NULL,'359--370',1999),(6,'Rel- ative preﬁx sums: An efﬁcient approach for querying dy- namic olap data cubes',NULL,NULL,'328--335',1999),(7,'Synopsis data structures for massive data sets','SODA',NULL,'909--910',1999),(8,'Data cube: A relational aggregation operator generalizing group- by, cross-tab, and sub-total',NULL,NULL,'152--159',1996),(9,'Approximating multi-dimensional aggregate range queries over real attributes',NULL,'29','463--474',2000),(10,'Data compression support in databases',NULL,NULL,'695--704',1994),(11,'Hierarchical compact cube for range-max queries',NULL,NULL,'232--241',2000),(12,'Aggregation algorithms In VLDB’99, for very large compressed data warehouses',NULL,NULL,'651--662',1999),(13,'Fast approximate answers to ag- gregate queries on a data cube','SSDBM',NULL,'24--33',1999),(14,'Fast computation of sparse datacubes',NULL,NULL,'116--185',1997),(15,'Serving datacube tuples from main memory','SSDBM','2000','pages ',2000),(16,'Compressed data cubes for olap aggregate query approxi- mation on continuous dimensions','SIGKDD',NULL,'223--232',1999),(17,'Data cube approx- imation and histograms via wavelets',NULL,NULL,'pages ',1998),(18,'Bit transposed ﬁles',NULL,NULL,'448--457',1985),(19,'An array-based algorithm for simultaneous multidimensional aggregates. Proceedings of the 18th International Conference on Data Engineering (ICDE(cid:146)02)  1063-6382/02 $17.00 \' 2002 IEEE  Authorized licensed use limited to','SUN YAT-SEN UNIVERSITY. Downloaded on April 6, 2009 at 03:26 from IEEE Xplore.  Restrictions apply',NULL,'159--170',1997);
/*!40000 ALTER TABLE `Node` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rating`
--

DROP TABLE IF EXISTS `Rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Rating` (
  `email_id` varchar(150) NOT NULL,
  `edge_id` bigint(50) NOT NULL,
  `value` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`email_id`,`edge_id`),
  KEY `edge_id` (`edge_id`),
  CONSTRAINT `Rating_ibfk_1` FOREIGN KEY (`email_id`) REFERENCES `User` (`email`),
  CONSTRAINT `Rating_ibfk_2` FOREIGN KEY (`edge_id`) REFERENCES `Edge` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rating`
--

LOCK TABLES `Rating` WRITE;
/*!40000 ALTER TABLE `Rating` DISABLE KEYS */;
INSERT INTO `Rating` VALUES ('aquib@yahoo.com',1,1),('aquib@yahoo.com',2,2),('aquib@yahoo.com',3,3),('aquib@yahoo.com',4,4),('aquib@yahoo.com',5,5),('eusha@yahoo.com',1,1),('eusha@yahoo.com',2,2),('eusha@yahoo.com',3,3),('eusha@yahoo.com',4,4),('eusha@yahoo.com',5,5),('moumita.asad@yahoo.com',1,1),('moumita.asad@yahoo.com',2,2),('moumita.asad@yahoo.com',3,3),('moumita.asad@yahoo.com',4,4),('moumita.asad@yahoo.com',5,5),('rafed@yahoo.com',1,1),('rafed@yahoo.com',2,2),('rafed@yahoo.com',3,3),('rafed@yahoo.com',4,4),('rafed@yahoo.com',5,5);
/*!40000 ALTER TABLE `Rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `email` varchar(150) NOT NULL,
  `password` varchar(65) NOT NULL,
  `oauth_provider` varchar(20) DEFAULT NULL,
  `oauth_uid` varchar(20) DEFAULT NULL,
  `fname` varchar(30) DEFAULT NULL,
  `lname` varchar(30) DEFAULT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('aquib@yahoo.com','ba83f79d43537a525eb5a38096b56f2fbee05fffdacb6ec9271b0c24b08dce24',NULL,NULL,NULL,NULL,'2018-03-23 13:02:47'),('eusha@yahoo.com','ba83f79d43537a525eb5a38096b56f2fbee05fffdacb6ec9271b0c24b08dce24',NULL,NULL,NULL,NULL,'2018-03-23 13:03:00'),('moumita.asad@yahoo.com','ba83f79d43537a525eb5a38096b56f2fbee05fffdacb6ec9271b0c24b08dce24',NULL,NULL,NULL,NULL,'2018-03-23 13:02:07'),('rafed@yahoo.com','ba83f79d43537a525eb5a38096b56f2fbee05fffdacb6ec9271b0c24b08dce24',NULL,NULL,NULL,NULL,'2018-03-23 13:02:34');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-23 16:18:08
