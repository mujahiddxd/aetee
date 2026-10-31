-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 31, 2026 at 05:53 PM
-- Server version: 11.8.9-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u741481982_Aeteesbake`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `address_line_1` varchar(255) NOT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `address_line_1`, `address_line_2`, `city`, `postal_code`, `created_at`, `updated_at`) VALUES
('00ea2c54-2e42-4f9f-96d4-e4d314d8b01d', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'dd, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400089', '2026-07-22 18:56:07.580', '2026-07-22 18:56:07.580'),
('011336a8-d5cb-4eda-b652-d201247f2f37', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'jjj, 2, Road, Sane Guruji Nagar, Prem Nagar, Azad Nagar, Andheri West, Mumbai, Maharashtra 400086, India', 'klkj', 'Mumbai', '400086', '2026-08-13 15:45:13.984', '2026-08-13 15:45:13.984'),
('018782fb-c9a8-4f9b-baf3-5417f11db4fd', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'f, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'f', 'Mumbai', '400066', '2026-07-31 21:04:51.857', '2026-07-31 21:04:51.857'),
('01ff18fc-d006-401c-8054-8f46e33c0d0f', 'ff7591d5-f14f-4b4c-a8b7-70f218ece33e', 'B402, B - 402, Alaknanda CHS, Dattani Park, Kandivali East Mumbai 400101', 'Above Nakoda Chemist', 'Mumbai', '400101', '2026-07-22 18:40:39.965', '2026-07-22 18:40:39.965'),
('021a67fe-7c34-4395-9a5b-7bbdfa1e6b3d', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, LOTUS PARK WING-C, B1605, शास्त्री नगर, जोगेश्वरी वेस्ट, मुंबई, महाराष्ट्र 400102, India', NULL, 'Mumbai', '400102', '2026-09-06 17:59:47.220', '2026-09-06 17:59:47.220'),
('02e3c312-6b8d-4809-93f5-cf1c58ea2bdf', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '123, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-21 12:16:25.177', '2026-07-21 12:16:25.177'),
('03c7f178-c410-447a-a72d-36464c94e962', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'dd, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400089', '2026-07-22 18:56:05.815', '2026-07-22 18:56:05.815'),
('04509a4c-8d7d-43f6-bda6-4e83952a7eb5', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'bjkhgjkh, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400001', '2026-07-18 15:47:36.348', '2026-07-18 15:47:36.348'),
('0532f5cf-c6ee-47ed-ac99-d49757891fc7', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'jhgfds, 987y6t5re', 'nhbgvfc', 'Mumbai', '400001', '2026-07-19 07:38:28.356', '2026-07-19 07:38:28.356'),
('085f519c-b4bc-45fb-a52c-f7b974b05f15', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'ghtjymkul, hmjk,,', 'ghtjyku', 'Mumbai', '400001', '2026-07-18 19:30:31.732', '2026-07-18 19:30:31.732'),
('0980f753-b236-4a10-8bc2-c3ab0d9a74f2', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 15:18:16.702', '2026-07-27 15:18:16.702'),
('0a0b618d-4111-4403-b866-3b65469b584c', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Jogeshwari Station Rd, Momin Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-22 18:33:43.722', '2026-07-22 18:33:43.722'),
('0b54ef12-4245-42a8-89ce-95b378df3c87', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Shop no.6, Sagar Tower, Aqsa Masjid Rd, Raj Nagar, Gautam Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-31 18:57:12.238', '2026-07-31 18:57:12.238'),
('0dc8b4ea-5ab6-4695-ba4c-a32794f5f4e1', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, 4RRR+J97, Aqsa Masjid Rd, off Swami Vivekanand Road, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-22 20:19:43.801', '2026-07-22 20:19:43.801'),
('0e8738c0-60fb-4b3e-a86e-70a1dd091c1a', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'f, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'f', 'Mumbai', '400066', '2026-07-31 21:05:05.017', '2026-07-31 21:05:05.017'),
('0ebcca60-a3e7-4ba4-af57-4cf3517e06d4', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', NULL, 'Mumbai', '400012', '2026-07-31 22:08:48.031', '2026-07-31 22:08:48.031'),
('0f1a027e-642f-47b0-a7f4-8681910ffb29', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', NULL, 'Mumbai', '400012', '2026-07-31 22:06:00.117', '2026-07-31 22:06:00.117'),
('0f310cd2-8a4a-4867-9b6e-83a51aad5a32', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, Datta Wadi, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-23 08:13:14.238', '2026-07-23 08:13:14.238'),
('10c90069-06ba-49f0-a9f8-3d5cfa56cef8', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'h, khan tower jogeshwari east', NULL, 'Mumbai', '400066', '2026-07-30 15:35:14.236', '2026-07-30 15:35:14.236'),
('131a936f-2a53-4222-b7af-7d0e3a7d2df2', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 19:32:49.657', '2026-07-27 19:32:49.657'),
('132dcd83-7833-4796-be7b-9982b25eed07', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '12 building, Premier Automobiles Road Opp. HDIL Premier Exotica\nKurla', 'aqsa masjid', 'Mumbai', '400001', '2026-07-19 14:57:41.729', '2026-07-19 14:57:41.729'),
('1912f036-64fd-4155-b11e-529528edc08e', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-30 16:12:42.014', '2026-07-30 16:12:42.014'),
('1a1d38ff-859e-42f4-b670-c373ae6a4dd0', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'fgd, b bdg', 'fd', 'Mumbai', '400001', '2026-07-18 19:45:43.820', '2026-07-18 19:45:43.820'),
('1af2e466-a1f4-44a4-b3d2-6848a42f8f1b', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Kurla, Mumbai, Maharashtra, India', NULL, 'Mumbai', '', '2026-07-31 22:13:36.365', '2026-07-31 22:13:36.365'),
('1b33744a-0d2a-4e7b-befb-9d9e715c4b65', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, Kurla, Mumbai, Maharashtra, India - 400070', NULL, 'Mumbai', '400070', '2026-09-05 22:07:54.304', '2026-09-05 22:07:54.304'),
('1cb51b41-36ce-48e8-9575-f1d6e2c3be68', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 'Dombivli ,East, Green Park Gate, 3, Lodha Casa Rio Gold Rd, near Chaudhary Bhojanalya Dombivli, Nilaje, Kalyan, Maharashtra 421204, India', '128', 'Mumbai', '400001', '2026-07-28 11:08:01.230', '2026-07-28 11:08:01.230'),
('1d7d0e0a-6406-4c1c-9e81-7e5d2a3f21ec', '638bbd07-adb2-41b2-9eff-545f34d12cc8', '3rd Floor, 4RP5+RCM, JP Rd, Sai Nagar, Versova, Andheri West, Mumbai, Maharashtra 400061, India', NULL, 'Mumbai', '400061', '2026-07-23 01:35:06.919', '2026-07-23 01:35:06.919'),
('1eb7cf46-32b5-4a82-ac59-4d453642d892', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'asd, Kurla, Mumbai, Maharashtra, India', 'fd', 'Mumbai', '', '2026-08-02 13:53:31.548', '2026-08-02 13:53:31.548'),
('1ecc1610-ce1d-4e8c-9d8c-6f48e1be7871', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Majestic, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-31 22:16:13.742', '2026-07-31 22:16:13.742'),
('1f0f67c2-7f6a-484f-893e-2b235c0b6c06', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '', '2026-08-02 12:17:15.385', '2026-08-02 12:17:15.385'),
('1f93972d-7342-4db8-9ae8-1614b988aaa3', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Vaishali Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-08-04 13:17:21.188', '2026-08-04 13:17:21.188'),
('2164b82e-5236-4845-a42f-d9ff738d3ef3', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', ',,,,, Kurla, Mumbai, Maharashtra, India - 400070', ',,,,,,', 'Mumbai', '400070', '2026-09-05 21:36:27.768', '2026-09-05 21:36:27.768'),
('216e52a5-c854-4e5c-abf1-910263213e05', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Shop no.6, Sagar Tower, Aqsa Masjid Rd, Raj Nagar, Gautam Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-31 09:58:21.545', '2026-07-31 09:58:21.545'),
('24d9f9fa-608b-472f-a674-4938d7d04c34', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 52VF+55G, Mumbai - Pune Rd, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 19:38:42.154', '2026-07-27 19:38:42.154'),
('27417680-0256-4937-b438-40af5c4d9eb1', '65169bef-2351-41af-b097-f0d3940e9615', 'Gorai, Borivali-(w), Gorai BSES friends CHS LTD, L.T road', 'Opposite Maxus Cinema & Above Govindas veg restaurant', 'Mumbai', '400092', '2026-07-22 10:42:56.973', '2026-07-22 10:42:56.973'),
('277a5f3b-6860-4882-9603-ed8fad5a1b69', 'dc23128f-6967-439d-8f40-b96659dc44a7', 'jjjh, CST Road, Kunchi Kurve Nagar, Kalina, Santacruz East, Mumbai, Maharashtra, India', 'kjkj', 'Mumbai', '400001', '2026-07-19 17:49:20.508', '2026-07-19 17:49:20.508'),
('2797959b-5d12-4d82-a783-19c233519384', '7c33afbe-c547-481c-883a-d38d6a36ee0d', 'a wing, 202, Ami Dhaval Building, Service Rd, Opposite Shree Swaminarayan Vishranti Bhuvan, Venus Coop Society, Navpada, Vile Parle East, Vile Parle, Mumbai, Maharashtra 400057, India', NULL, 'Mumbai', '400057', '2026-07-23 11:17:58.648', '2026-07-23 11:17:58.648'),
('28f53138-2de4-489f-b87d-4b1227f6bbc1', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400001', '2026-07-22 18:55:38.359', '2026-07-22 18:55:38.359'),
('2926c5b9-a5ef-4ccd-a91c-0e0dd59bbfe2', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'g, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'f', 'Mumbai', '400066', '2026-07-31 20:57:35.070', '2026-07-31 20:57:35.070'),
('2a92baf1-34d3-49b4-9294-9b53e4acab23', 'dc23128f-6967-439d-8f40-b96659dc44a7', 'jjjh, CST Road, Kunchi Kurve Nagar, Kalina, Santacruz East, Mumbai, Maharashtra, India', 'kjkj', 'Mumbai', '400009', '2026-07-19 18:25:00.259', '2026-07-19 18:25:00.259'),
('2b4317cd-365b-4f06-ad17-07515e498674', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'rh, nh', 'g', 'Mumbai', '400001', '2026-07-19 07:55:22.584', '2026-07-19 07:55:22.584'),
('2b50c3f2-5f39-439f-86d2-0be4185c3b3b', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'tyhr, Sainath Hospital, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 18:24:51.353', '2026-07-27 18:24:51.353'),
('2b67c7ca-275b-41d2-a89d-8e9d6f55f1f7', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'a, 2, Road, Sane Guruji Nagar, Prem Nagar, Azad Nagar, Andheri West, Mumbai, Maharashtra 400086, India', NULL, 'Mumbai', '400086', '2026-07-21 21:16:08.919', '2026-07-21 21:16:08.919'),
('2bb9efd5-4068-4863-b7e5-2c615bd798c0', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Shop no.6, Sagar Tower, Aqsa Masjid Rd, Raj Nagar, Gautam Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-31 21:30:17.205', '2026-07-31 21:30:17.205'),
('2bd39d40-7638-4ea2-87fe-f5f94db70cd6', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'uyt6uy, 52VF+53X, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 19:56:00.614', '2026-07-27 19:56:00.614'),
('2c4b95ec-95ac-4b58-a401-8d82f0e8b88b', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'kok, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', '[po[p', 'Mumbai', '400001', '2026-07-19 13:59:32.014', '2026-07-19 13:59:32.014'),
('2cb9c568-d7aa-43b7-a85d-c38221be8c24', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'bbb, 3VJQ+FFJ, Vidya Vihar Rd, Amar Nagar, Vidyavihar West, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-07-20 09:43:57.770', '2026-07-20 09:43:57.770'),
('2e5cd7bd-4115-480b-bcf0-c80a99c2fc20', 'e8a36223-f134-4588-b219-03d575bd1d09', '405 AURA , Shimpoli, Cross Rd, behind Reliance Mall, Gautam Nagar, Borivali West, Mumbai, Maharashtra 400092, India', 'Behind reliance mall', 'Mumbai', '400092', '2026-08-08 06:40:35.319', '2026-08-08 06:40:35.319'),
('2e7ad988-fed8-473f-8d2a-c490d0beaf88', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', NULL, 'Mumbai', '400012', '2026-07-31 22:10:45.985', '2026-07-31 22:10:45.985'),
('2eafb2ee-b156-4c2c-8dff-e33e1143ef75', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 3VJQ+FFJ, Vidya Vihar Rd, Amar Nagar, Vidyavihar West, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-07-24 06:35:08.353', '2026-07-24 06:35:08.353'),
('2edd070c-9a85-42b0-b062-7590665af1c9', 'ff7591d5-f14f-4b4c-a8b7-70f218ece33e', 'B402, Alaknanda, 4, Western Express Hwy, Kandivali, Dattani Park, Thakur Village, Kandivali East, Mumbai, Maharashtra 400101, India', 'Above Nakoda Chemist', 'Mumbai', '400101', '2026-07-22 18:43:04.425', '2026-07-22 18:43:04.425'),
('2fe752da-1491-4b0f-8b78-ade0c315dac9', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-08-12 18:47:10.478', '2026-08-12 18:47:10.478'),
('3059a439-b25a-4c6b-ab60-2908d21835a2', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-31 10:02:04.818', '2026-07-31 10:02:04.818'),
('30b4a22a-e685-4389-8868-eb8a8ca64c65', '0bc963e8-0d41-4acb-971b-5c3eb941ed00', 'Lala Lajpatrai Marg, CRESCENT GRANDE, मोगरा व्हिलेज, मोगरा पाडा, नटवर नगर, जोगेश्वरी ईस्ट, मुंबई, महाराष्ट्र 400069, India', '1102- A, crescent grande building, apollo industries', 'Mumbai', '400069', '2026-07-22 09:37:53.548', '2026-07-22 09:37:53.548'),
('318f2f05-07cd-4bbb-9f68-fbc0186e09ac', 'e8d67682-c2af-486d-bbab-5c1614e2107c', 'Uuf, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', 'Jh', 'Mumbai', '400012', '2026-07-26 21:06:30.912', '2026-07-26 21:06:30.912'),
('3441e36f-51f9-4ed2-b962-98c63b64bc69', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'cdfghjk, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'f', 'Mumbai', '400066', '2026-07-20 18:30:03.672', '2026-07-20 18:30:03.672'),
('35419fb3-52c7-4165-8bf3-7e3b31baa695', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', NULL, 'Mumbai', '400012', '2026-07-31 22:02:59.781', '2026-07-31 22:02:59.781'),
('355cad7a-fb19-4bc5-8bd9-949ab3371cda', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-30 16:19:20.473', '2026-07-30 16:19:20.473'),
('362c3e34-ba1b-46cd-b2e1-6e9075d87bec', '68d68b34-c98c-4f57-8f9d-7b190716baa5', 'Ye, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', NULL, 'Mumbai', '400012', '2026-07-27 15:18:09.012', '2026-07-27 15:18:09.012'),
('365bcbce-7eef-444c-a7e9-6c27d6a2bac3', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 'Dombivli ,East, Green Park Gate, 3, Lodha Casa Rio Gold Rd, near Chaudhary Bhojanalya Dombivli, Nilaje, Kalyan, Maharashtra 421204, India', NULL, 'Mumbai', '400001', '2026-07-25 05:36:58.234', '2026-07-25 05:36:58.234'),
('38ec5f0d-77e4-4e13-b7bb-29ab0d81d29f', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-28 05:26:17.936', '2026-07-28 05:26:17.936'),
('39073293-9e76-4766-90c9-77b2121751fd', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, 4RRR+J97, Aqsa Masjid Rd, off Swami Vivekanand Road, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-22 20:20:45.496', '2026-07-22 20:20:45.496'),
('399a56ec-f6da-402f-871c-0e5311f52e33', 'e8d67682-c2af-486d-bbab-5c1614e2107c', 'Tu, St. Francis Institute Of Technology, Mandapeshwar, Dahisar West, Mumbai, Maharashtra 400103, India', NULL, 'Mumbai', '400103', '2026-07-28 03:08:40.751', '2026-07-28 03:08:40.751'),
('3aa4df29-eaca-4f16-b011-e3252410b98d', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400102', '2026-07-27 15:37:00.988', '2026-07-27 15:37:00.988'),
('3b2ce588-4db9-4434-8495-8062f4bb06f4', '231c483c-8dd4-4bbc-9cca-8b909c492eda', 'A 305, Ramanarayan Narkar Marg, Shival Nagar, Saibaba Nagar, Pant Nagar, Ghatkopar East, Mumbai, Maharashtra 400077, India', NULL, 'Mumbai', '400077', '2026-07-27 14:57:50.168', '2026-07-27 14:57:50.168'),
('3c253966-4497-44f4-a2c8-9b295b0c47a6', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-08-15 16:35:21.441', '2026-08-15 16:35:21.441'),
('3d9e69ab-2a1c-425e-ad8d-bfaf3351e7fa', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '12 building, jogeshwari west', 'aqsa masjid', 'Mumbai', '400001', '2026-07-19 14:59:44.754', '2026-07-19 14:59:44.754'),
('3dfbc84f-25f4-4b72-afa1-4e5e3cc144af', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'vv, 52VF+53X, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-23 08:32:57.627', '2026-07-23 08:32:57.627'),
('3ea8e946-ac75-403a-892d-1452ca61cd7a', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'vc, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'vds', 'Mumbai', '400066', '2026-07-27 15:23:38.763', '2026-07-27 15:23:38.763'),
('413fcd5d-f139-4c9a-b36e-5788b8999110', '68d68b34-c98c-4f57-8f9d-7b190716baa5', 'Ye, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', 'Ga', 'Mumbai', '400012', '2026-07-27 19:35:56.495', '2026-07-27 19:35:56.495'),
('41e9c02a-c848-44a0-b442-32826bb1bebe', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 15:56:41.680', '2026-07-27 15:56:41.680'),
('42032c69-0c59-4f1e-a3e9-ac59599d3fb6', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, 4RRR+J97, Aqsa Masjid Rd, off Swami Vivekanand Road, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-22 20:20:13.476', '2026-07-22 20:20:13.476'),
('44f560c7-d162-4c45-9e51-10b9bbf5d768', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'jkhkj, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400001', '2026-07-19 13:41:27.491', '2026-07-19 13:41:27.491'),
('4501aba3-85cb-4342-98f9-f6523cc5cb1b', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 19:02:35.587', '2026-07-27 19:02:35.587'),
('455d2966-ee93-4514-9d2a-3a1b1f9be8de', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'hgf, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', 'gfd', 'Mumbai', '400102', '2026-07-31 20:07:20.823', '2026-07-31 20:07:20.823'),
('458e16e8-bef4-4e1a-aa88-118868fbc65e', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', '123', 'Mumbai', '400102', '2026-07-27 15:17:29.217', '2026-07-27 15:17:29.217'),
('460079c1-01ab-411d-a94e-b8e6671626bf', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 'Dombivli ,East, Green Park Gate, 3, Lodha Casa Rio Gold Rd, near Chaudhary Bhojanalya Dombivli, Nilaje, Kalyan, Maharashtra 421204, India', NULL, 'Mumbai', '421204', '2026-08-01 07:14:58.989', '2026-08-01 07:14:58.989'),
('463a983b-9144-4e8f-a9bf-88dacac53860', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '123123, Premier Automobiles Road Opp. HDIL Premier Exotica\nKurla', NULL, 'Mumbai', '400001', '2026-07-18 18:04:43.393', '2026-07-18 18:04:43.393'),
('468a8c19-8776-4b48-ad6c-150a9e13225a', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'vf, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'fv', 'Mumbai', '400066', '2026-07-31 19:48:33.459', '2026-07-31 19:48:33.459'),
('48dbffa1-ee4d-4dff-b88a-190df881a60e', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'p, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400001', '2026-07-23 07:37:47.210', '2026-07-23 07:37:47.210'),
('499344c0-e332-4a01-9b6c-f11770b2f21a', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 'Dombivli ,East, Green Park Gate, 3, 3rd Ave St, near Chawdhary Bhojanalay, Dombivli, Kalyan, Maharashtra 421204, India', NULL, 'Mumbai', '400001', '2026-07-28 15:16:55.696', '2026-07-28 15:16:55.696'),
('49b1d563-d8ea-44c6-9749-f2590107ddb9', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'brgd, rh', 'f', 'Mumbai', '400001', '2026-07-19 07:56:30.975', '2026-07-19 07:56:30.975'),
('49d0aca6-d451-42f4-8fc2-2fb4c37cf190', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'gfd, dadar,mumbai', 'fd', 'Mumbai', '400102', '2026-07-31 20:02:02.571', '2026-07-31 20:02:02.571'),
('49e5e47b-0deb-4032-af5d-86f005537ba5', '76dd07aa-5f94-4c1f-874d-1ce0342df8d8', 'Qfwf ZZ, N-5/114, Nausena Vihar Rd, Nausena Vihar, Amar Nagar, Vidyavihar West, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-07-28 07:54:10.303', '2026-07-28 07:54:10.303'),
('4a5caef3-0502-4a14-aba7-bb6fede35f99', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'ooo, 2, Road, Sane Guruji Nagar, Prem Nagar, Azad Nagar, Andheri West, Mumbai, Maharashtra 400086, India', NULL, 'Mumbai', '400086', '2026-07-20 18:33:37.533', '2026-07-20 18:33:37.533'),
('4c4650e0-e74d-4b9e-a266-908eda13a219', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Lotus Park, 2, Swami Vivekanand Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-31 22:14:17.275', '2026-07-31 22:14:17.275'),
('4d2d67c1-3290-4e34-b594-22fcecb90614', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 52VF+53X, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 15:34:18.193', '2026-07-27 15:34:18.193'),
('4e787e39-399d-4e56-85ab-a14616a77aa4', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-08-15 11:28:43.736', '2026-08-15 11:28:43.736'),
('4fb1702a-8ba2-4f18-9421-9c948343a12b', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Shop no.6, Sagar Tower, Aqsa Masjid Rd, Raj Nagar, Gautam Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-31 21:27:53.681', '2026-07-31 21:27:53.681'),
('516e972d-f176-4e92-ad29-6a54e9b1ce92', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, Kurla West, Mumbai, Maharashtra, India - 400070', NULL, 'Mumbai', '400070', '2026-09-06 17:59:23.668', '2026-09-06 17:59:23.668'),
('51e73ad3-9c35-4721-9590-3188c5121de2', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 2, Road, Sane Guruji Nagar, Prem Nagar, Azad Nagar, Andheri West, Mumbai, Maharashtra 400086, India', 'j hnhjfvh', 'Mumbai', '400086', '2026-08-28 18:37:43.676', '2026-08-28 18:37:43.676'),
('51f5fc23-abd2-4f95-b46d-232594be2354', '325b6453-e61a-4789-afe6-cc9c2eaee7f7', 'B-703, DRUSHTI SAI PRADNYA, Chembur West, Tilak Nagar, Chembur, Mumbai, Maharashtra 400089', NULL, 'Mumbai', '400089', '2026-07-27 14:31:21.812', '2026-07-27 14:31:21.812'),
('5302c390-6575-4a17-9fce-c460759ff588', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'get, grb', 'eg', 'Mumbai', '400001', '2026-07-19 07:29:07.300', '2026-07-19 07:29:07.300'),
('563b0b5e-83ab-42f7-9828-7dc38efb3e88', '7de1ef00-4f44-440f-bc3b-7db12beebdfe', 'A-1604, 125-B/3, Shahid Bhagat Singh Kanwar Marg, Chembur West, Tilak Nagar, Chembur, Mumbai, Maharashtra 400089, India', NULL, 'Mumbai', '400089', '2026-07-24 20:16:53.213', '2026-07-24 20:16:53.213'),
('576d2e89-6783-4a08-89b6-fa5baf78c171', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400102', '2026-07-27 15:20:10.322', '2026-07-27 15:20:10.322'),
('58498899-d86b-4ff6-9f90-c279e838e59b', '638bbd07-adb2-41b2-9eff-545f34d12cc8', 'Unit No. 1, Green House, 93, Lib Rd, Nerul East, Sector 21, Nerul, Navi Mumbai, Maharashtra 400706, India', 'Dmart', 'Mumbai', '400706', '2026-07-23 01:21:34.406', '2026-07-23 01:21:34.406'),
('5851b6f9-3f22-4d85-bb3f-0562adcd3f3f', '47a93573-02ee-409d-91d1-243d462b23f7', 'A-1302, Sanskar Towers, Neelam Nagar, Near Jain Mandir, Mulund east, 5XG8+R99, Prataprao Gujar Rd, Gandhi Nagar, Mulund East, Mumbai, Maharashtra 400081, India', 'Jain Mandir', 'Mumbai', '400081', '2026-08-11 06:16:15.175', '2026-08-11 06:16:15.175'),
('593a16c4-0b36-49ef-b744-91a03372bb26', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'class, Tilak Nagar, Kurla, Mumbai, Maharashtra, India', NULL, 'Mumbai', '400001', '2026-07-21 17:48:57.665', '2026-07-21 17:48:57.665'),
('5a56f7de-1f0d-4332-9405-f35472501c9d', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'b  , 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'b', 'Mumbai', '400066', '2026-07-31 21:05:33.847', '2026-07-31 21:05:33.847'),
('5bb97ed4-faf1-4c11-b36d-822b971a7fde', '16c1589e-c59d-4faa-ac3a-140e08751aa9', 'Khan tower b wing, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', 'Near awsa masjid', 'Mumbai', '400102', '2026-07-29 16:05:53.266', '2026-07-29 16:05:53.266'),
('5cf857c8-4fc1-45dc-94ad-f1563f294c01', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, 4RRR+J97, Aqsa Masjid Rd, off Swami Vivekanand Road, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', '123', 'Mumbai', '400102', '2026-07-22 18:13:15.219', '2026-07-22 18:13:15.219'),
('5e99fbd7-48fd-4b17-a7b1-bb1f89a7aca2', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400070', '2026-07-23 07:02:09.588', '2026-07-23 07:02:09.588'),
('5e9b7b73-6bc3-488a-9810-98d2683047d0', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'a, 3VJQ+FFJ, Vidya Vihar Rd, Amar Nagar, Vidyavihar West, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-07-21 07:17:21.654', '2026-07-21 07:17:21.654'),
('5ff05191-f212-4139-9176-d6bf7b028840', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'tre, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'fd', 'Mumbai', '400066', '2026-07-31 20:03:53.746', '2026-07-31 20:03:53.746'),
('610d0fd7-b031-4944-b6f9-0513bfd37a36', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-30 16:17:42.972', '2026-07-30 16:17:42.972'),
('6139f81a-c6c8-4d53-8529-fc372250738a', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, Kurla, Mumbai, Maharashtra, India', NULL, 'Mumbai', '', '2026-07-31 22:20:16.853', '2026-07-31 22:20:16.853'),
('61bc0210-a125-4b44-9399-95c7501453ab', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 52VC+MRV, Dattu Wadi, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-23 08:08:58.406', '2026-07-23 08:08:58.406'),
('675d23b1-441b-49d9-bbc6-254014dc698c', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'uyt6uy, 52VF+53X, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 19:56:00.453', '2026-07-27 19:56:00.453'),
('67f184ce-d123-4550-ac22-0f8a9f71aaef', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'S, 3VJQ+FFJ, Vidya Vihar Rd, Amar Nagar, Vidyavihar West, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-07-22 09:32:04.610', '2026-07-22 09:32:04.610'),
('68088771-ad89-4345-a47c-5e0413edb6ed', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400102', '2026-07-27 18:20:53.976', '2026-07-27 18:20:53.976'),
('68a4a84f-c127-44f1-93a0-b5bb9726f0f0', '65169bef-2351-41af-b097-f0d3940e9615', 'Gorai, Borivali-(w), Gorai BSES friends CHS LTD, L.T road', 'Opposite Maxus Cinema & Above Govindas veg restaurant', 'Mumbai', '400092', '2026-07-22 10:42:30.485', '2026-07-22 10:42:30.485'),
('68d4fc06-4c31-487d-91d9-2008068a199a', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 16:03:56.720', '2026-07-27 16:03:56.720'),
('691fa8fa-b430-4fca-a56f-b281a419f7b2', '63ec6fb4-11d4-4277-bab5-1b0fcefbbe4b', 'Govandi mumbai, F4, Govandi Slums, Lotus Colony, Govandi, Mumbai, Maharashtra 400043, India', NULL, 'Mumbai', '400043', '2026-07-22 18:05:53.426', '2026-07-22 18:05:53.426'),
('6ddb5b12-c820-42f2-ab61-f25625b3163f', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 'Dombivli ,East, 533G+6RR, Nilaje, Kalyan, Maharashtra 421204, India', NULL, 'Mumbai', '400001', '2026-07-28 13:03:14.266', '2026-07-28 13:03:14.266'),
('6e813d49-db46-47e9-a1ff-1e91f211b3d2', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'g, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'f', 'Mumbai', '400066', '2026-07-31 20:57:53.887', '2026-07-31 20:57:53.887'),
('6f27a6e7-41e8-4753-a880-f546845ccd63', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'gfd, dadar,mumbai', 'fd', 'Mumbai', '400102', '2026-07-31 20:01:55.627', '2026-07-31 20:01:55.627'),
('7059f0b0-9448-4be9-9f00-892f934175d1', '68d68b34-c98c-4f57-8f9d-7b190716baa5', 'H, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', NULL, 'Mumbai', '400012', '2026-07-31 21:58:45.742', '2026-07-31 21:58:45.742'),
('70d36895-f9d3-47ff-b22d-25a6f059c8ed', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'sdxcfghjk, 242M+5G8, Panvel Matheran Rd, Sukapur, New Panvel East, Panvel, Shilottar Raichur, Maharashtra 410206, India', 'cvghjk', 'Mumbai', '410206', '2026-08-15 16:03:44.310', '2026-08-15 16:03:44.310'),
('70dd01e3-94ed-4d39-b233-0c3fa22f5f00', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'hkj, 2, Road, Sane Guruji Nagar, Prem Nagar, Azad Nagar, Andheri West, Mumbai, Maharashtra 400086, India', NULL, 'Mumbai', '400086', '2026-07-19 17:51:09.844', '2026-07-19 17:51:09.844'),
('71c13116-474c-45f2-bc40-b372a016182c', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-30 15:57:56.336', '2026-07-30 15:57:56.336'),
('733fdea8-6a1f-4ca1-a82b-07c84d942004', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'mm, 52VF+F2H, Dattu Wadi, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 15:16:43.768', '2026-07-27 15:16:43.768'),
('73cb38d1-6932-486b-81de-faf397e56b19', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400102', '2026-07-27 18:30:45.206', '2026-07-27 18:30:45.206'),
('775e70f6-a3c7-48ad-9114-0c27d0cf2651', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400070', '2026-07-22 18:56:53.348', '2026-07-22 18:56:53.348'),
('7950c4c9-5731-4d85-9eb4-f4a30c698e0e', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 19:32:41.991', '2026-07-27 19:32:41.991'),
('7981ced7-b900-4617-bb14-02511384217e', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'jhgjk, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400001', '2026-07-18 18:45:44.768', '2026-07-18 18:45:44.768'),
('798e43a3-ac37-4756-90cd-0522418be476', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'g, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'f', 'Mumbai', '400066', '2026-07-31 20:58:36.206', '2026-07-31 20:58:36.206'),
('79fef982-e50d-422f-9bb7-24fc18da21ec', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'a, 3VJQ+FFJ, Vidya Vihar Rd, Amar Nagar, Vidyavihar West, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-07-20 09:31:20.748', '2026-07-20 09:31:20.748'),
('7a29f17c-972d-4568-beb1-b2dd79668e61', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, Kurla West, Mumbai, Maharashtra, India - 400070', NULL, 'Mumbai', '400070', '2026-09-06 17:59:10.670', '2026-09-06 17:59:10.670'),
('7b994f29-e188-4634-8ec9-3dd3d442ae4a', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'a, 59-B, G M Rd, Chembur West, Tilak Nagar, Chembur, Mumbai, Maharashtra 400089, India', NULL, 'Mumbai', '400089', '2026-07-20 12:22:42.540', '2026-07-20 12:22:42.540'),
('7eeab566-35d0-4434-8ebe-88ab0f74d23f', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, Kurla, Mumbai, Maharashtra, India', NULL, 'Mumbai', '', '2026-08-01 20:07:25.339', '2026-08-01 20:07:25.339'),
('816b35ab-bb4b-415b-995c-cba409310209', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'ghfhgjfhgj, Sainath Hospital, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 18:21:26.894', '2026-07-27 18:21:26.894'),
('82c05c68-1afc-4cb8-a664-83c16a470489', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Jogeshwari West, Mumbai, Maharashtra, India', NULL, 'Mumbai', '400001', '2026-07-23 08:32:11.930', '2026-07-23 08:32:11.930'),
('82d42749-785b-4b5e-a9d8-61f49a325a21', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '134124, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', '124', 'Mumbai', '400102', '2026-07-20 10:58:07.580', '2026-07-20 10:58:07.580'),
('82f5881a-ea47-49cd-a0b7-e79403800e24', '9290b9d6-f155-46fd-bfc3-aee836d86909', 'assd, H1, No 1, TATA MHADA NEW REHAB Building, B Wing, BDD Chawls Worli, Worli, Mumbai, Maharashtra 400018, Indiaassd', 'assd', 'Mumbai', '400018', '2026-07-19 17:08:31.783', '2026-07-19 17:08:31.783'),
('831dfccb-0b36-41ba-ae00-1c319571b0f2', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', '502, Datta Wadi, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-23 07:13:42.831', '2026-07-23 07:13:42.831'),
('83857221-9b7e-41d4-86ca-6cef1407a30b', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, West, Vidyavihar station skywalk, near Saraswat Bank, Neelkanth Kingdom, Vidyavihar West, Vidyavihar, Mumbai, Maharashtra 400086, India', NULL, 'Mumbai', '400086', '2026-07-22 10:50:10.722', '2026-07-22 10:50:10.722'),
('8410f8c3-b3ff-42b9-91f3-e50bdd0bbda0', '5a287fa7-4c50-4cce-b431-8bb96499623e', '34567888456, Dadar Railway Station, Dadar, Mumbai, Maharashtra - 400014', 'oiug', 'Mumbai', '400014', '2026-09-06 17:59:59.555', '2026-09-06 17:59:59.555'),
('8532a758-d1c6-40db-bb9d-c4ae4914c6ae', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, Kurla, Mumbai, Maharashtra, India - 400070', NULL, 'Mumbai', '400070', '2026-09-08 14:14:48.971', '2026-09-08 14:14:48.971'),
('8582d7c7-8867-4acf-9df2-2bb18fb24b6a', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'g, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'f', 'Mumbai', '400066', '2026-07-31 20:57:42.226', '2026-07-31 20:57:42.226'),
('864b2f1f-1a6f-4817-a9ee-e16f32daf9ed', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, 4RRR+J97, Aqsa Masjid Rd, off Swami Vivekanand Road, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', '12313', 'Mumbai', '400102', '2026-07-22 18:24:37.985', '2026-07-22 18:24:37.985'),
('870464cc-2b4f-44a0-896c-8b615a81002d', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'p, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400001', '2026-07-23 07:40:31.923', '2026-07-23 07:40:31.923'),
('874a4603-8f2c-437c-99c3-e13d922656f4', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'ooo, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400001', '2026-07-18 17:12:43.950', '2026-07-18 17:12:43.950'),
('87a53c2a-a67d-449e-8f61-722958ddd000', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Jogeshwari West, Mumbai, Maharashtra, India', 'aqsa masjid', 'Mumbai', '400001', '2026-07-22 18:33:11.508', '2026-07-22 18:33:11.508'),
('8a956162-f39c-48cf-8dc8-84dc0a8c894d', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-08-04 15:16:04.927', '2026-08-04 15:16:04.927'),
('8b77a001-f0c1-4dfd-a0f9-19e6ec0eb7fd', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, 4RRR+J97, Aqsa Masjid Rd, off Swami Vivekanand Road, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-22 20:21:00.187', '2026-07-22 20:21:00.187'),
('8c8e78ae-ed5c-402d-8e94-b23d3760aca2', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'a, 3VJQ+FFJ, Vidya Vihar Rd, Amar Nagar, Vidyavihar West, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-07-20 09:31:40.639', '2026-07-20 09:31:40.639'),
('8cd7ec82-ff2d-45a2-89b0-2e675be46e39', '64b7933f-dc60-4527-832b-7d8abbfc3fa2', '179/14 Rekha sadan Flat no 14 3rd floor, 179, Rashtrasevika Laxmibai Kelkar Marg, Sion West, Sion, Mumbai, Maharashtra 400022, India', 'Beside Jaihind Diagnostics before Magnum diagnostics on highway side', 'Mumbai', '400022', '2026-08-03 03:17:46.486', '2026-08-03 03:17:46.486'),
('8d87444f-7106-48f5-aea4-6031c9c3ec1b', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', NULL, 'Mumbai', '400012', '2026-07-31 22:08:59.264', '2026-07-31 22:08:59.264'),
('90d034f8-b067-4c7a-83e0-aeffb86ea96e', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 3VJQ+FFJ, Vidya Vihar Rd, Amar Nagar, Vidyavihar West, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-10-02 03:33:36.865', '2026-10-02 03:33:36.865'),
('92821d8c-5370-41b4-ad9a-33b8d71b86cf', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 52VF+53X, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 19:53:58.972', '2026-07-27 19:53:58.972'),
('935141d4-aaa2-4afa-85fd-3b750dc3abc7', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400070', '2026-07-23 07:05:20.967', '2026-07-23 07:05:20.967'),
('93767040-c77b-485c-acff-ba25552d7c69', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'ttt, 52VF+83H, Mumbai - Pune Rd, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 18:17:50.876', '2026-07-27 18:17:50.876'),
('93fe534d-deff-4cd0-849c-118c406d6aad', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'bfx, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', NULL, 'Mumbai', '400066', '2026-07-27 15:15:28.323', '2026-07-27 15:15:28.323'),
('9726ab5a-4836-4d74-9c34-1f7c917486a5', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 18:17:54.465', '2026-07-27 18:17:54.465'),
('9a003c15-46f5-4f1d-a468-c529e032c355', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'sdxcfghjk, 242M+5G8, Panvel Matheran Rd, Sukapur, New Panvel East, Panvel, Shilottar Raichur, Maharashtra 410206, India', 'cvghjk', 'Mumbai', '410206', '2026-08-15 16:14:43.217', '2026-08-15 16:14:43.217'),
('9abbacd1-b010-4d16-8f7d-2d5661d45fdf', 'af90a053-8692-4f22-9ae1-42e1101b4589', 'Plot no 37/Room No 41 Swarajya Sadan CHS, , Plot no 37/Room No 41 Swarajya Sadan CHS, Gorai-1, Borivali West\nMUMBAI\nMAHARASHTRA\n400091', NULL, 'Mumbai', '400091', '2026-08-11 07:22:16.520', '2026-08-11 07:22:16.520'),
('9acce386-f488-4e66-9aae-8400cb63b629', '16c1589e-c59d-4faa-ac3a-140e08751aa9', '123, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-22 20:16:18.699', '2026-07-22 20:16:18.699'),
('9da59196-03c5-477d-885f-0f14a6c4afc2', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '12 building, jogeshwari west', 'aqsa masjid', 'Mumbai', '400001', '2026-07-19 14:59:44.147', '2026-07-19 14:59:44.147'),
('9dac6c9a-69bb-4ad4-886a-073f1dfdf19f', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Kurla, Mumbai, Maharashtra, India', NULL, 'Mumbai', '', '2026-08-02 09:27:50.649', '2026-08-02 09:27:50.649'),
('9dd6c921-4615-4030-8f62-d647c8ab5898', '178af738-296d-4e3d-bf65-666c858ddb48', 'P-705, Godrej Origins, The Trees, Pirojshanagar, Vikhroli East, 3WVC+J7V GODREJ APARTMENT, फिरोजशहानगर, विक्रोली, मुंबई, महाराष्ट्र 400079, India', 'Butterfly High Restaurant', 'Mumbai', '400079', '2026-07-22 09:25:43.556', '2026-07-22 09:25:43.556'),
('9e494282-dab1-4a64-ac62-20282f9cd5d0', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'jnbjkb, Mumbra Dattawadi, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-22 19:27:18.861', '2026-07-22 19:27:18.861'),
('9efe9505-64d6-4833-9cca-b32eba3bde28', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, 4RRR+J97, Aqsa Masjid Rd, off Swami Vivekanand Road, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-22 20:19:27.628', '2026-07-22 20:19:27.628'),
('9f63396f-6ace-4867-bd96-2a835b6fac21', 'd136ca9c-d5ef-44d9-b46f-ee12c627c285', '1201, 12th floor, Tower B4, GODREJ PLATINUM, Pirojshanagar, Vikhroli East, Mumbai, Maharashtra 400079, India', 'Opposite Godrej hospital', 'Mumbai', '400079', '2026-10-07 04:15:16.427', '2026-10-07 04:15:16.427'),
('9f6d594c-35de-4e45-8d59-09567223c522', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'bon dosco, 3VJQ+FFJ, Vidya Vihar Rd, Amar Nagar, Vidyavihar West, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-09-30 10:29:25.902', '2026-09-30 10:29:25.902'),
('9f9414a0-954b-48b2-8d59-efeca6c11093', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-31 09:27:40.147', '2026-07-31 09:27:40.147'),
('a0318a65-5c32-45b8-88ee-a9fc778de4f6', '0f509a41-a8ff-4bb2-98f1-1f7bedaa518d', '20b 104, EKDANT HOUSING SOCIETY, न्यू म्हाडा कॉलनी, गोरेगाव, मुंबई, महाराष्ट्र 400065, India', 'Meenatai thakre udyan', 'Mumbai', '400065', '2026-09-18 09:57:44.052', '2026-09-18 09:57:44.052'),
('a0b75b45-b766-49d0-a695-149b86c15394', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'lll, 3VRX+P9R, Ekta Nagar, Prem Nagar, Azad Nagar, Ghatkopar West, Mumbai, Maharashtra 400086, India', NULL, 'Mumbai', '400086', '2026-08-24 11:35:46.747', '2026-08-24 11:35:46.747'),
('a1c3944a-f5ce-4ec1-a4de-260d9bc967fe', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 52VF+53X, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 18:47:41.782', '2026-07-27 18:47:41.782'),
('a3ac94d4-14b8-4473-8c3c-b5997d80a9f0', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '12, Premier Automobiles Road Opp. HDIL Premier Exotica\nKurla', NULL, 'Mumbai', '400001', '2026-07-19 14:56:54.822', '2026-07-19 14:56:54.822'),
('a45181eb-861f-43f4-8083-783a7fb5eb3d', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', NULL, 'Mumbai', '400012', '2026-07-31 22:02:34.147', '2026-07-31 22:02:34.147'),
('a5303772-ebfe-41e2-94b1-ce9f08bad1ae', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'nn, Sainath Hospital, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-27 17:15:53.231', '2026-07-27 17:15:53.231'),
('a5b9b734-d24e-408f-a867-876d1e5f8c12', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 'Dombivli ,East, Green Park Gate, Nilaje, Kalyan, Maharashtra 421204, India', NULL, 'Mumbai', '400010', '2026-07-29 16:10:46.990', '2026-07-29 16:10:46.990'),
('a5df5d6a-33af-4dd0-a090-9b2b3027b151', '9290b9d6-f155-46fd-bfc3-aee836d86909', 'assd, H1, No 1, TATA MHADA NEW REHAB Building, B Wing, BDD Chawls Worli, Worli, Mumbai, Maharashtra 400018, Indiaassd', 'assd', 'Mumbai', '400018', '2026-07-19 17:03:43.239', '2026-07-19 17:03:43.239'),
('a6debc20-2a83-4b87-933f-c89283141c97', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 19:06:26.521', '2026-07-27 19:06:26.521'),
('a7247769-3775-458f-9e10-99bfbee8d261', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, Garib Nawaz Appartment', NULL, 'Mumbai', '400612', '2026-07-27 19:06:17.872', '2026-07-27 19:06:17.872'),
('a877f4d3-106c-417b-b992-aae1b466aa8a', '6d29aaf6-d689-4320-96fd-4edb7f7fc0b2', 'A 305, Ramanarayan Narkar Marg, Shival Nagar, Saibaba Nagar, Pant Nagar, Ghatkopar East, Mumbai, Maharashtra 400077, India', NULL, 'Mumbai', '400077', '2026-07-27 15:06:57.617', '2026-07-27 15:06:57.617'),
('a8eafdc4-c33d-4c72-8d66-1db9a72cb003', '80dd667b-9ff3-4941-a450-c3ba9e616c6d', 'jjjh, CST Road, Kunchi Kurve Nagar, Kalina, Santacruz East, Mumbai, Maharashtra, India', 'kjkj', 'Mumbai', '400001', '2026-07-22 18:31:36.045', '2026-07-22 18:31:36.045'),
('a96d504e-6840-4fc3-b97f-e4775b0f910a', '68d68b34-c98c-4f57-8f9d-7b190716baa5', 'H, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', NULL, 'Mumbai', '400012', '2026-07-31 21:59:26.848', '2026-07-31 21:59:26.848'),
('a9b61c8c-b12d-4b52-8074-5097b789b952', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'f, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'f', 'Mumbai', '400066', '2026-07-31 21:04:09.161', '2026-07-31 21:04:09.161'),
('ac32db99-39a3-4fc1-b12d-57e0b072f34c', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'A, Garib Nawaz Appartment\nDist:\nDattu Wadi, Mumbra', NULL, 'Mumbai', '400001', '2026-07-18 15:55:17.283', '2026-07-18 15:55:17.283'),
('accbee68-d266-4091-a35a-a8160a903a28', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Jogeshwari West, Mumbai, Maharashtra, India', '123', 'Mumbai', '400001', '2026-07-22 19:27:11.761', '2026-07-22 19:27:11.761'),
('ade880b4-273d-424c-918b-61f7a98267fb', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400070', '2026-07-23 07:05:20.960', '2026-07-23 07:05:20.960'),
('ae92ced0-bf23-4806-afbd-31093d2b5e9b', '71b12a41-66d2-41ea-ac79-cf8bdbb2d169', '202, Mumbai, Maharashtra 400093', NULL, 'Mumbai', '400093', '2026-07-23 12:05:15.152', '2026-07-23 12:05:15.152'),
('aed11877-eaaa-4cd6-94be-692cc79c93fb', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'vc, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'vds', 'Mumbai', '400066', '2026-07-27 15:24:00.510', '2026-07-27 15:24:00.510'),
('aef6b516-1eb2-4bbe-ae9c-0a077c6d61c8', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 19:33:59.599', '2026-07-27 19:33:59.599'),
('b00bfbb3-4db2-418d-9677-72eaac75f0a7', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'one , Tilak Nagar, Kurla, Mumbai, Maharashtra, India', NULL, 'Mumbai', '400001', '2026-07-21 18:02:26.623', '2026-07-21 18:02:26.623'),
('b2ed947d-fadf-47da-b7f2-8cb485ed1b7d', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'ggb, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'fvb', 'Mumbai', '400066', '2026-07-31 21:29:44.254', '2026-07-31 21:29:44.254'),
('b41201fa-3395-4289-befa-6284ef876287', '47a93573-02ee-409d-91d1-243d462b23f7', 'B-1403, Rameshwar Tower No.2, New Golden Nest, Rameshwar Tower, Queen\'s Park, Deepak Hospital Rd, Kashi Nagar, Panchamratna Park, Bhayandar East, Mira Bhayandar, Maharashtra 401105, India', 'Opp Jain Bungalow', 'Mumbai', '401105', '2026-08-08 07:20:06.285', '2026-08-08 07:20:06.285'),
('b49e93c3-c500-474b-bf76-01f4cf2a00f6', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'jkhkj, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400001', '2026-07-19 13:39:21.957', '2026-07-19 13:39:21.957'),
('b5b5ee53-314f-46ad-8fb4-631dd6dd4843', '324d2df4-2ff4-4ffd-a6f6-f739812804aa', 'B wing, 601, Ariso apartment, subhash nagar, B wing, 601, Ariso apartment (bldg nos 48) Subhash Nagar Rd, Subhash Nagar, Chembur, Mumbai, Maharashtra 400071, India', NULL, 'Mumbai', '400071', '2026-09-03 06:24:39.479', '2026-09-03 06:24:39.479'),
('b670a027-6219-4cee-9f34-dab26de4bc7e', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Borivali, Mumbai, Maharashtra, India', '123', 'Mumbai', '400001', '2026-07-22 20:13:21.994', '2026-07-22 20:13:21.994'),
('b807adec-eb64-4043-bf79-174304b0c765', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '123, Premier Automobiles Road Opp. HDIL Premier Exotica\nKurla', '123', 'Mumbai', '400001', '2026-07-19 08:45:33.624', '2026-07-19 08:45:33.624'),
('ba6dbe57-033a-4ab4-b74d-7a4773c669d2', '71b12a41-66d2-41ea-ac79-cf8bdbb2d169', 'B-703, Mumbai, Maharashtra 400089, India', NULL, 'Mumbai', '400089', '2026-07-27 14:51:22.595', '2026-07-27 14:51:22.595'),
('bb8bb364-2b8e-4deb-b4ff-7e4f28801610', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 3VJQ+FFJ, Vidya Vihar Rd, Amar Nagar, Vidyavihar West, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-07-24 06:54:44.788', '2026-07-24 06:54:44.788'),
('bbee2d97-bd18-480a-9535-a14dbc2f9075', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '123, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-19 15:29:50.735', '2026-07-19 15:29:50.735');
INSERT INTO `addresses` (`id`, `user_id`, `address_line_1`, `address_line_2`, `city`, `postal_code`, `created_at`, `updated_at`) VALUES
('bcfb0b72-e8c4-4afc-b0ef-74ddc1366880', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-30 16:12:33.939', '2026-07-30 16:12:33.939'),
('be1b541d-9d2d-4bfa-a6f9-6006d86fb7d2', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'gf, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', NULL, 'Mumbai', '400066', '2026-07-27 15:34:40.756', '2026-07-27 15:34:40.756'),
('be59c3c0-d157-4ee5-8485-3a434fe72807', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Shop no.6, Sagar Tower, Aqsa Masjid Rd, Raj Nagar, Gautam Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-31 22:15:19.695', '2026-07-31 22:15:19.695'),
('be87aaec-6832-44ec-bd6a-338ea95c0578', '3e5c4366-396c-4224-b521-47382107f5ba', 'Hh, 86 GAFUR SETH CHAWL, AZAD NAGAR,\nHILL NO 4 NR SUBEDAR HIGH SCH, GHATKOPAR W,', NULL, 'Mumbai', '400001', '2026-07-18 19:56:45.690', '2026-07-18 19:56:45.690'),
('becfa62b-4054-4da8-8acc-359400379141', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'kk, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400070', '2026-07-28 04:54:19.449', '2026-07-28 04:54:19.449'),
('c294e2a0-26a0-41dd-b0a0-6a352d38c213', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Jogeshwari West, Mumbai, Maharashtra, India', NULL, 'Mumbai', '', '2026-08-02 13:20:50.106', '2026-08-02 13:20:50.106'),
('c2ec7a7b-84bc-4895-854b-d9305dd15db1', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400102', '2026-07-27 15:37:11.176', '2026-07-27 15:37:11.176'),
('c3fb1d70-8b5a-40d1-81a7-32c268f958c0', 'd9131106-8d8c-434c-baed-a465f5a180e7', '2104, 21 st floor , D wing, oberoi eternia , Oberoi Eternia, D wing, Lal Bahadur Shastri Marg, Sambhaji Nagar, Mulund West, Mumbai, Maharashtra 400080, India', NULL, 'Mumbai', '400080', '2026-08-04 13:45:54.868', '2026-08-04 13:45:54.868'),
('c6b14981-ddeb-44d1-8def-6c63365a34ea', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'asd, Kurla, Mumbai, Maharashtra, India', 'fd', 'Mumbai', '', '2026-08-02 13:58:11.154', '2026-08-02 13:58:11.154'),
('c704816f-4342-448c-b790-35bdf2974eaf', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400102', '2026-07-27 15:18:52.369', '2026-07-27 15:18:52.369'),
('c892747d-7d3f-414c-a71c-dfd8faeba244', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'vc, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'vds', 'Mumbai', '400066', '2026-07-27 15:22:06.907', '2026-07-27 15:22:06.907'),
('c8b358e2-d95c-419c-9623-4cbfbce49800', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, Kurla, Mumbai, Maharashtra, India', NULL, 'Mumbai', '', '2026-07-31 22:18:04.173', '2026-07-31 22:18:04.173'),
('c8d1e7ce-736e-4abb-bf70-47560574304b', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'fd, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'fd', 'Mumbai', '400066', '2026-07-27 15:55:23.300', '2026-07-27 15:55:23.300'),
('c90b49b8-e263-4bfe-9ff2-a25bc37ba82e', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, 4RRR+J97, Aqsa Masjid Rd, off Swami Vivekanand Road, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-22 20:20:33.956', '2026-07-22 20:20:33.956'),
('c947f7e0-a87a-47b3-bb9d-0645f65d2792', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, 4RRR+J97, Aqsa Masjid Rd, off Swami Vivekanand Road, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-22 20:19:53.958', '2026-07-22 20:19:53.958'),
('cb924426-d2f6-460c-8e0c-dec167a51cd7', '76dd07aa-5f94-4c1f-874d-1ce0342df8d8', 'Wveg, 3VJQ+RFG, Amar Nagar, Nav Pada, Kurla, Mumbai, Maharashtra 400070, India', NULL, 'Mumbai', '400070', '2026-07-28 07:55:13.120', '2026-07-28 07:55:13.120'),
('cd69ed68-8912-4d0b-85a9-570578173abe', '9290b9d6-f155-46fd-bfc3-aee836d86909', 'assd, H1, No 1, TATA MHADA NEW REHAB Building, B Wing, BDD Chawls Worli, Worli, Mumbai, Maharashtra 400018, Indiaassd', 'assd', 'Mumbai', '400018', '2026-07-19 17:04:32.303', '2026-07-19 17:04:32.303'),
('ce390e42-6a8a-4b6c-a558-9950d904384e', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-28 05:26:41.779', '2026-07-28 05:26:41.779'),
('ce905a90-85a2-4b17-ba19-641b8dd82539', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '', '2026-08-02 12:34:03.037', '2026-08-02 12:34:03.037'),
('cf655e4b-12a4-438c-b95c-fc216ff2d230', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'dd, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400089', '2026-07-22 18:56:08.914', '2026-07-22 18:56:08.914'),
('d1668059-26d1-48b1-97bb-91e3b9b783d0', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400102', '2026-07-27 19:03:59.424', '2026-07-27 19:03:59.424'),
('d1670b0b-b099-417b-87fd-2c5de6d205ff', '151447cf-f65e-472d-b483-6f7c7d3dc6a4', 'UBM Christa Krupa Church , 3, Rd Number 1, Chembur West, Sector 1, Chedda Nagar, Mumbai, Maharashtra 400089, India', NULL, 'Mumbai', '400089', '2026-07-23 06:22:27.958', '2026-07-23 06:22:27.958'),
('d2bd9fff-83b0-41ef-b1c5-5d7a480dcaac', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '14, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-20 10:23:02.653', '2026-07-20 10:23:02.653'),
('d5305213-218e-4f37-a4b5-70b349cdcfd6', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 18:50:33.526', '2026-07-27 18:50:33.526'),
('d532b0a2-39c6-42ef-8a06-e4e203ebfdcf', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-28 05:18:39.874', '2026-07-28 05:18:39.874'),
('d82e7596-dbc4-4bdb-855f-a2a211c4cbea', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Kurla, Mumbai, Maharashtra, India', NULL, 'Mumbai', '', '2026-08-02 09:27:34.426', '2026-08-02 09:27:34.426'),
('d9367859-e814-4fc5-8e3a-5c701f96e363', 'e1064137-0eee-44e2-9230-75b6550acf5a', 'Floor 20, Suraj Millenium, Bhulabhai Desai Marg, Breach Candy, Cumballa Hill, Mumbai, Maharashtra 400026, India', 'Opp old American Consulate', 'Mumbai', '400026', '2026-08-25 12:35:52.496', '2026-08-25 12:35:52.496'),
('d98690c3-8934-4be4-8297-b470ecbe4521', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Shop no.6, Sagar Tower, Aqsa Masjid Rd, Raj Nagar, Gautam Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-31 18:57:12.192', '2026-07-31 18:57:12.192'),
('d9c34759-aa0e-489c-a238-a2dc6698e2ac', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Xx, Kurla, Mumbai, Maharashtra, India - 400070', NULL, 'Mumbai', '400070', '2026-08-13 11:09:40.560', '2026-08-13 11:09:40.560'),
('da41a906-679a-4e31-81a7-9c49be43db1e', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'hgf, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', 'gfd', 'Mumbai', '400102', '2026-07-31 20:02:58.351', '2026-07-31 20:02:58.351'),
('e0255267-55cd-465e-a83c-1e6ba70d7744', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'jnbjkb, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400089', '2026-07-22 18:56:06.374', '2026-07-22 18:56:06.374'),
('e09bd107-d911-4167-b2b3-3b07f9bc7a9f', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Dist:, 52VF+F2H, Dattu Wadi, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-25 10:52:33.305', '2026-07-25 10:52:33.305'),
('e1981fe4-a21a-476c-9188-5b628f06cb25', '71b12a41-66d2-41ea-ac79-cf8bdbb2d169', 'B-703, Mumbai, Maharashtra 400089, India', NULL, 'Mumbai', '400089', '2026-07-20 12:11:59.263', '2026-07-20 12:11:59.263'),
('e288a12e-7116-4301-aa4b-4d1069b94314', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'oiujiouj, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400001', '2026-07-19 14:01:40.847', '2026-07-19 14:01:40.847'),
('e477942b-bf34-4dda-92d4-4e13cd4f938f', 'c54c6d9d-aad9-4b72-8948-85387b46674b', 'B4 - 1201, Tower B4, Pirojshanagar, Vikhroli East, Mumbai, Maharashtra 400079, India', 'Near Godrej hospital, behind Godrej school', 'Mumbai', '400079', '2026-09-19 05:13:23.934', '2026-09-19 05:13:23.934'),
('e5ae4f15-75bc-432b-a192-c8f16e70584b', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 'Dombivli ,East, Green Park Gate, 3, 3rd Ave St, near Chawdhary Bhojanalay, Dombivli, Kalyan, Maharashtra 421204, India', 'Laxmi medico', 'Mumbai', '421204', '2026-07-30 20:58:46.492', '2026-07-30 20:58:46.492'),
('e5b86a0a-75cf-45b2-bc02-6c64c164ab9b', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400102', '2026-07-27 18:31:43.718', '2026-07-27 18:31:43.718'),
('e7ef099b-5047-4dd6-90a1-276963b5cc12', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'kjhkljh, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400001', '2026-07-18 18:42:35.498', '2026-07-18 18:42:35.498'),
('e88bf675-136f-4eff-961e-58f3f4fbceb5', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 15:56:27.732', '2026-07-27 15:56:27.732'),
('e8f5ae80-2697-4bad-97a3-96f63482e9e8', '71b12a41-66d2-41ea-ac79-cf8bdbb2d169', 'abc, Mumbai, Maharashtra 400089, India', NULL, 'Mumbai', '400089', '2026-07-19 18:45:30.998', '2026-07-19 18:45:30.998'),
('e97ff784-3d3b-4d61-a8a4-570a518fcdf6', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Premier Automobiles Road Opp. HDIL Premier Exotica', NULL, 'Mumbai', '400102', '2026-07-27 15:20:02.265', '2026-07-27 15:20:02.265'),
('e994d344-69e9-451c-8fb4-aef9c92483bd', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'fd, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'fd', 'Mumbai', '400066', '2026-07-27 15:55:34.306', '2026-07-27 15:55:34.306'),
('ea4eb03c-2bb7-472f-9bfb-ded4c547f898', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-08-12 18:45:38.994', '2026-08-12 18:45:38.994'),
('ead2ed20-3af3-4cbf-b08d-931efa3a3476', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', '1231, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-21 15:45:01.654', '2026-07-21 15:45:01.654'),
('eb90ade8-948d-44e0-bf44-aa82d76fcd0e', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-28 05:00:46.942', '2026-07-28 05:00:46.942'),
('ebd3f305-da4c-4962-9ed6-fef539fd15b7', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Kurla, Mumbai, Maharashtra, India - 400070', NULL, 'Mumbai', '400070', '2026-08-02 14:36:25.789', '2026-08-02 14:36:25.789'),
('ecd767ea-b6c7-4f41-9ad9-5c5cfaf11e63', 'dc23128f-6967-439d-8f40-b96659dc44a7', 'jjjh, WRQM+XVM, Dhobi Talao, Chhatrapati Shivaji Terminus Area, Fort, Mumbai, Maharashtra 400001, India', NULL, 'Mumbai', '400001', '2026-07-31 21:37:42.775', '2026-07-31 21:37:42.775'),
('ed18982c-2f60-48a5-8d4e-a9235991eb84', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, LOTUS PARK WING-C, B1605, शास्त्री नगर, जोगेश्वरी वेस्ट, मुंबई, महाराष्ट्र 400102, India', NULL, 'Mumbai', '400102', '2026-08-12 16:58:28.824', '2026-08-12 16:58:28.824'),
('eef3f145-62c7-4c99-93c1-492746837bf2', 'bb832641-8b2a-4027-9d1e-a8496c51c7f4', 'Flat 1503 A Wing, Yashvasin CHS, Plot 38, Sector 27, Ranjanpada, Sector 27, Kharghar, Panvel, Maharashtra 410210, India', 'BD somani School', 'Mumbai', '400001', '2026-07-22 08:24:33.839', '2026-07-22 08:24:33.839'),
('ef037b20-7a82-4e95-8ff6-a55ba2436deb', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 19:34:09.921', '2026-07-27 19:34:09.921'),
('ef353274-dd11-4c29-9be1-d46d1a5c547b', 'af90a053-8692-4f22-9ae1-42e1101b4589', 'BLDG 106 - KAMBODHI CHSL, B-Wing 1st floor, Flat-103, BLDG 106 - KAMBODHI CHSL, B-Wing 1st floor, Flat-103,\nnear Sahakar Plaza, TILAK NAGAR, CHEMBUR (W)\nMUMBAI-400089, Maharashtra', NULL, 'Mumbai', '400089', '2026-07-25 05:56:13.352', '2026-07-25 05:56:13.352'),
('f09d9c83-bbf6-4e86-8ce6-5f41f6a4ce19', '5a287fa7-4c50-4cce-b431-8bb96499623e', 'ggb, 101, Rd Number 4, Daulat Nagar, Borivali East, Mumbai, Maharashtra 400066, India', 'fvb', 'Mumbai', '400066', '2026-07-31 21:27:57.212', '2026-07-31 21:27:57.212'),
('f1ac5af3-9b6e-4375-86c6-094e2258ee06', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'fhxd, NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089', NULL, 'Mumbai', '400001', '2026-07-19 13:32:18.981', '2026-07-19 13:32:18.981'),
('f22e2b5c-413d-44cd-a027-85d95429de3f', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-30 16:12:48.427', '2026-07-30 16:12:48.427'),
('f2e6f0a8-7d18-4673-85c3-6a5d9208c960', '68d68b34-c98c-4f57-8f9d-7b190716baa5', 'Ye, 2R4X+C3J Balaji Cooperative Group Housing Society Building, Cluster_mumbai_71, Jerbai Wadia Rd, near by Tata Hospital, Bhoiwada, Wadala, Mumbai, Maharashtra 400012, India', 'Ga', 'Mumbai', '400012', '2026-07-27 19:36:04.407', '2026-07-27 19:36:04.407'),
('f3a8ac8a-9ae0-44fe-97cc-e4dc9b5fd650', 'fbf8f6d4-85f5-4a68-ace5-6094c1c21c1d', 'll;lmk;km, Kurla, Mumbai, Maharashtra, India', 'lkmlkm', 'Mumbai', '', '2026-07-31 21:56:47.770', '2026-07-31 21:56:47.770'),
('f4ab05b1-5974-457e-bf0d-6ec56faeb137', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', '502, Datta Wadi, Ilthan, Mumbra, Thane, Maharashtra 400612, India', NULL, 'Mumbai', '400612', '2026-07-23 07:12:59.601', '2026-07-23 07:12:59.601'),
('f5a0ef63-e75f-4d7f-b06c-5346f8ea2f87', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-27 15:56:16.520', '2026-07-27 15:56:16.520'),
('f6c64019-81f3-47b9-a2da-8280652a870f', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-30 16:14:25.284', '2026-07-30 16:14:25.284'),
('f9036766-f564-4688-9b06-45159d0d5e17', '71b12a41-66d2-41ea-ac79-cf8bdbb2d169', 'B-703, Mumbai, Maharashtra 400089, India', NULL, 'Mumbai', '400089', '2026-07-20 12:11:58.972', '2026-07-20 12:11:58.972'),
('fd9dcec9-bb6a-4c45-937f-a3d48c65dd3c', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-30 16:18:24.634', '2026-07-30 16:18:24.634'),
('fdece6bf-3cb0-43cb-af69-05810f734f5b', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'Kurla, Khan Tower, Aqsa Masjid Rd, Shastri Nagar, Jogeshwari West, Mumbai, Maharashtra 400102, India', NULL, 'Mumbai', '400102', '2026-07-30 16:12:33.667', '2026-07-30 16:12:33.667'),
('ff149e02-4be7-405e-a845-c4d169273082', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 'Dombivli ,East, Villa no 105, Green Park Gate, 4, Lodha Casa Rio Gold Rd, Nilaje, Thane, Kalyan, Maharashtra 421204, India', NULL, 'Mumbai', '421204', '2026-07-29 17:24:18.814', '2026-07-29 17:24:18.814');

-- --------------------------------------------------------

--
-- Table structure for table `blocked_dates`
--

CREATE TABLE `blocked_dates` (
  `id` varchar(191) NOT NULL,
  `date` date NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blocked_dates`
--

INSERT INTO `blocked_dates` (`id`, `date`, `reason`, `created_at`, `updated_at`) VALUES
('93b284e5-cd30-452b-844c-e3194b2db7af', '2026-09-20', 'Sorry, we\'re Sold Out for Today', '2026-09-19 23:30:14.192', '2026-09-19 23:30:14.192');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` varchar(191) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`, `sort_order`) VALUES
('433268e8-9ba5-4174-a0a9-e1cb5a5c2283', 'Cheesecake', '2026-07-22 02:32:59.958', '2026-07-22 06:26:51.610', 5),
('448cddf5-657b-46f3-8701-cdd708bc9aa5', 'Bento Cheesecake', '2026-07-22 06:26:11.369', '2026-07-22 06:26:51.610', 3),
('7a2f07bc-fb52-4a2d-b269-1f528d6edd8b', 'Tiramisu', '2026-07-22 02:33:09.381', '2026-07-22 06:26:51.610', 1),
('911ed0a0-0c0b-4d73-b52c-63f11d531e79', 'Specialities', '2026-07-22 02:33:18.032', '2026-07-22 06:26:51.610', 0);

-- --------------------------------------------------------

--
-- Table structure for table `filter_tags`
--

CREATE TABLE `filter_tags` (
  `id` varchar(191) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('PENDING','PAID','SHIPPED','DELIVERED','CANCELLED','FAILED') NOT NULL DEFAULT 'PENDING',
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `razorpay_signature` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `delivery_date` date DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `delivery_type` enum('DELIVERY','PICKUP') NOT NULL DEFAULT 'DELIVERY'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `status`, `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`, `created_at`, `updated_at`, `delivery_date`, `notes`, `delivery_type`) VALUES
('016c8242-683a-464e-9abe-b4efe2b89633', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2465.00, 'CANCELLED', 'order_TJm9aQHdn0e4eG', NULL, NULL, '2026-07-30 16:12:33.940', '2026-07-30 16:12:38.637', '2026-07-31', NULL, 'DELIVERY'),
('017248f5-ca11-463e-99df-bdbc1930ccbe', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TKFYrHH8VbVBJ4', NULL, NULL, '2026-07-31 20:58:36.207', '2026-07-31 20:58:36.207', '2026-08-01', NULL, 'DELIVERY'),
('01f437be-1897-4d64-8a03-2c725b0d738d', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TIZiY9Fgl5D9t1', NULL, NULL, '2026-07-27 15:23:38.764', '2026-07-27 15:23:38.764', '2026-07-28', 'dfsgvsf', 'DELIVERY'),
('05c1e108-8cf6-4ad4-9144-f10af864f08f', '71b12a41-66d2-41ea-ac79-cf8bdbb2d169', 60.00, 'PENDING', 'order_TFkiFJLiCse1NA', NULL, NULL, '2026-07-20 12:11:58.973', '2026-07-20 12:11:58.973', '2026-07-21', NULL, 'DELIVERY'),
('05f0b70a-6921-4eb9-b8fd-27dd544141b0', '325b6453-e61a-4789-afe6-cc9c2eaee7f7', 332.00, 'PENDING', 'order_TIYpK18Z3izHII', NULL, NULL, '2026-07-27 14:31:21.815', '2026-07-27 14:31:21.815', '2026-07-28', NULL, 'DELIVERY'),
('07580a51-7bbc-4c51-a779-0d669b407727', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIZesbuR2kPybt', NULL, NULL, '2026-07-27 15:20:10.323', '2026-07-27 15:20:10.323', '2026-07-28', 'ASFASFFAFASFASF', 'DELIVERY'),
('07de1e94-d6a9-4069-a6e4-cb8887d7754f', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2465.00, 'CANCELLED', 'order_TIdzBKX8ebKNtO', NULL, NULL, '2026-07-27 19:34:09.922', '2026-07-27 19:34:12.715', '2026-07-28', 'hello  my name is maaz', 'DELIVERY'),
('092ce4c1-99f6-46c8-a3c4-7dccaf41936a', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TIZZumtiE5HIDr', NULL, NULL, '2026-07-27 15:15:28.326', '2026-07-27 15:15:28.326', '2026-07-28', NULL, 'DELIVERY'),
('095d1fac-be06-4892-850e-816bd757a1f7', '65169bef-2351-41af-b097-f0d3940e9615', 1247.00, 'PAID', 'order_TGWGREhee2wVJv', NULL, NULL, '2026-07-22 10:42:56.974', '2026-07-22 10:43:19.519', '2026-07-24', 'So happy to see your page Asha!! Can\'t wait to taste the cheesecake & Tiramisu', 'DELIVERY'),
('0adbef6c-21f8-462a-8a9b-db0966b76907', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 123.08, 'PENDING', 'order_TFNXz7JkCRia0w', NULL, NULL, '2026-07-19 13:32:18.982', '2026-07-19 13:32:18.982', '2026-07-19', NULL, 'DELIVERY'),
('0ae5b932-5c35-49f7-ad92-03fd9dba97d6', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIZwqvdGWl9Iyu', NULL, NULL, '2026-07-27 15:37:11.179', '2026-07-27 15:37:11.179', '2026-07-28', 'fasfasf', 'DELIVERY'),
('0b896d8b-06db-4e67-a115-793d1406cc8a', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 966.00, 'CANCELLED', 'order_TKG6KIQ1j1Vnxp', NULL, NULL, '2026-07-31 21:30:17.206', '2026-07-31 21:30:21.574', '2026-08-01', NULL, 'DELIVERY'),
('0bfa8883-89bc-41bb-a3eb-c9e2de12fc18', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 750.00, 'CANCELLED', 'order_TYUroVnb2L9UAQ', NULL, NULL, '2026-09-05 21:02:58.574', '2026-09-05 21:03:01.989', '2026-09-06', NULL, 'PICKUP'),
('0cb90876-ef94-427a-8138-aac658449434', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 777.00, 'PENDING', 'order_TIZto71Rv6AOGA', NULL, NULL, '2026-07-27 15:34:18.195', '2026-07-27 15:34:18.195', '2026-07-28', NULL, 'DELIVERY'),
('0faf5334-7461-4f06-b153-62ac223bdcae', '5a287fa7-4c50-4cce-b431-8bb96499623e', 965.00, 'CANCELLED', 'order_TJlW9elwCXmVCE', NULL, NULL, '2026-07-30 15:35:14.241', '2026-07-30 15:35:24.482', '2026-07-31', 'gg', 'DELIVERY'),
('122fef44-3870-4b46-a29c-ce5289a45cc7', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1.04, 'PENDING', 'order_TFO30GnwJIcHAr', NULL, NULL, '2026-07-19 14:01:40.850', '2026-07-19 14:01:40.850', '2026-07-19', NULL, 'DELIVERY'),
('13626ca8-3790-4887-8d4c-2429519f595d', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TIaG51drV017rw', NULL, NULL, '2026-07-27 15:55:23.303', '2026-07-27 15:55:23.303', '2026-07-28', 'fd', 'DELIVERY'),
('13ae04c6-29d6-43fd-b411-2ba1dc52865e', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TKEd4K7ZUnho6m', NULL, NULL, '2026-07-31 20:03:53.747', '2026-07-31 20:03:53.747', '2026-08-01', 'f', 'DELIVERY'),
('163ded93-6c22-41dc-b48a-757d509bff9b', '178af738-296d-4e3d-bf65-666c858ddb48', 938.00, 'PAID', 'order_TGUwreBlPEZqH8', NULL, NULL, '2026-07-22 09:25:43.558', '2026-07-22 09:26:05.321', '2026-07-23', 'Cheesecake cups - Nutella x2, Blueberry x 2', 'DELIVERY'),
('172f0363-58a7-4e8f-a53a-b2ff4526650f', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 1824.00, 'CANCELLED', 'order_TItte02HxJgnbO', NULL, NULL, '2026-07-28 11:08:01.232', '2026-07-28 11:08:16.066', '2026-07-29', 'dd', 'DELIVERY'),
('186e00c5-f9fd-4294-aedb-089aa4982e7f', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 8916.00, 'PENDING', 'order_TGg6EX1ib6EFTy', NULL, NULL, '2026-07-22 20:20:13.477', '2026-07-22 20:20:13.477', '2026-07-23', NULL, 'DELIVERY'),
('1cc33210-bc69-4a4d-ac34-7ff083a6d5d6', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIaHDLnimpp7fg', NULL, NULL, '2026-07-27 15:56:27.733', '2026-07-27 15:56:27.733', '2026-07-28', 'gsdhsh', 'DELIVERY'),
('1d4a58a6-d068-48e4-a681-b4166a62fae8', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIZwfnxHvqFLXh', NULL, NULL, '2026-07-27 15:37:00.990', '2026-07-27 15:37:00.990', '2026-07-28', 'awrafasfasf', 'DELIVERY'),
('1db230fc-4386-4117-bcb4-c24fc860d77b', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 750.00, 'CANCELLED', 'order_TQ6fTOy4n6orNG', NULL, NULL, '2026-08-15 16:10:38.044', '2026-08-15 16:11:26.843', '2026-08-19', NULL, 'PICKUP'),
('1ee8939e-3680-4ced-b676-b046799f4f31', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 7115.00, 'PENDING', 'order_TIdRpZwOxs1sow', NULL, NULL, '2026-07-27 19:02:35.590', '2026-07-27 19:02:35.590', '2026-07-28', 'sfafs', 'DELIVERY'),
('1f9f0c2c-e0d6-4402-aa90-8f33d39af133', 'af90a053-8692-4f22-9ae1-42e1101b4589', 1088.00, 'PAID', 'order_TONWrt7zihWKpE', 'pay_TONX22slRQfbMS', NULL, '2026-08-11 07:22:16.523', '2026-08-11 07:22:47.329', '2026-08-12', NULL, 'DELIVERY'),
('2092602a-ade4-40da-a805-e9d29b555b52', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 7566.00, 'PENDING', 'order_TGfCDXg5cBEEOR', NULL, NULL, '2026-07-22 19:27:11.762', '2026-07-22 19:27:11.762', '2026-07-23', NULL, 'DELIVERY'),
('214a3081-1fd9-4160-9740-1733a662caf8', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 1725.00, 'CANCELLED', 'order_TJOqFtYIB1b6cA', NULL, NULL, '2026-07-29 17:24:18.818', '2026-07-29 17:24:29.678', '2026-07-30', NULL, 'DELIVERY'),
('234e7b41-e7ce-4278-856e-588eed6cbb27', '5a287fa7-4c50-4cce-b431-8bb96499623e', 965.00, 'PENDING', 'order_TKEc5rOAlGOFIl', NULL, NULL, '2026-07-31 20:02:58.352', '2026-07-31 20:02:58.352', '2026-08-01', 'fd', 'DELIVERY'),
('23ee4bdd-43db-4255-af86-6ccae5609377', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 39.02, 'PENDING', 'order_TFP01jtFh15We0', NULL, NULL, '2026-07-19 14:57:42.030', '2026-07-19 14:57:42.030', '2026-07-19', NULL, 'DELIVERY'),
('23f281e5-6940-48c2-8e0d-76a8a154af4c', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 101.00, 'PENDING', 'order_TF1Jm6Zlz6CKtG', NULL, NULL, '2026-07-18 15:47:36.349', '2026-07-18 15:47:36.349', NULL, NULL, 'DELIVERY'),
('24cd26b2-13bc-4894-9cd3-3f22d825a229', '5a287fa7-4c50-4cce-b431-8bb96499623e', 832.00, 'PENDING', 'order_TKvSzu4KsiAJUG', NULL, NULL, '2026-08-02 13:58:11.156', '2026-08-02 13:58:11.156', '2026-08-03', 'gfd', 'DELIVERY'),
('24d6a6a7-3fd1-4592-bc76-e8b6070323c6', '5a287fa7-4c50-4cce-b431-8bb96499623e', 965.00, 'PENDING', 'order_TKEgiM5ZBCXAlv', NULL, NULL, '2026-07-31 20:07:20.825', '2026-07-31 20:07:20.825', '2026-08-01', 'fd', 'DELIVERY'),
('255f4c3f-c63c-4073-aab8-7602d630646e', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIZdVXFVos9X7f', NULL, NULL, '2026-07-27 15:18:52.370', '2026-07-27 15:18:52.370', '2026-07-28', 'ASFASF', 'DELIVERY'),
('270074bc-ad2f-4ab6-8d58-2c51941f30de', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 6215.00, 'CANCELLED', 'order_TIdxliWT1r2SDr', NULL, NULL, '2026-07-27 19:32:49.658', '2026-07-27 19:32:52.753', '2026-07-28', NULL, 'DELIVERY'),
('27a2d59d-d801-4457-82f3-c558550e6749', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 965.00, 'PENDING', 'order_TJmFlE0GwXBGz1', NULL, NULL, '2026-07-30 16:18:24.636', '2026-07-30 16:18:24.636', '2026-07-31', NULL, 'DELIVERY'),
('2816d65a-3dec-4635-b126-f2f72d9251c1', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1074.00, 'PENDING', 'order_TGfCLId1CsfZAk', NULL, NULL, '2026-07-22 19:27:18.862', '2026-07-22 19:27:18.862', '2026-07-23', NULL, 'DELIVERY'),
('285f235c-c1cc-4ed6-af90-5af33834d2e8', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1823.00, 'PENDING', 'order_TGefOiPzwoUTot', NULL, NULL, '2026-07-22 18:56:07.581', '2026-07-22 18:56:07.581', '2026-08-05', NULL, 'DELIVERY'),
('28cffe4f-2792-4e53-9963-9f2c2e4c2f34', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 450.00, 'CANCELLED', 'order_TPY9hjbNFvkAhC', NULL, NULL, '2026-08-14 06:24:58.676', '2026-08-14 06:25:02.408', '2026-08-14', NULL, 'PICKUP'),
('29dee220-a17f-4e75-8ff9-6380cdd092a6', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 553.00, 'PENDING', 'order_TGV3ZatffbhTex', NULL, NULL, '2026-07-22 09:32:04.611', '2026-07-22 09:32:04.611', '2026-07-23', NULL, 'DELIVERY'),
('2a60333b-d861-496c-a40d-612aeada07d3', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 523.00, 'CANCELLED', 'order_TPETJtRZwgTjjr', NULL, NULL, '2026-08-13 11:09:40.567', '2026-08-13 11:09:46.448', '2026-08-14', NULL, 'DELIVERY'),
('2cd61fdf-51fe-40c5-8ccb-4e2fd1fba977', 'd9131106-8d8c-434c-baed-a465f5a180e7', 1771.00, 'PAID', 'order_TLiKHAgxetQWt8', 'pay_TLiKLxd1HSAIdL', NULL, '2026-08-04 13:45:54.872', '2026-08-04 13:46:18.767', '2026-08-05', NULL, 'DELIVERY'),
('2d4495f8-faab-4df9-80cd-8a064cefe3b8', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 750.00, 'FAILED', 'order_TRxyx8oNA8vuSq', 'pay_TRxz9Tbd3WIi6J', NULL, '2026-08-20 08:58:50.212', '2026-08-20 09:10:24.960', '2026-08-22', NULL, 'PICKUP'),
('2de884e7-d89a-4bf9-a1ae-47a78c84c6f0', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1154.00, 'CANCELLED', 'order_TQ6YBmO0o6HCEL', NULL, NULL, '2026-08-15 16:03:44.315', '2026-08-15 16:03:50.617', '2026-08-19', 'ghjk', 'DELIVERY'),
('2e3b9373-0ff5-4add-8412-c80579d9920d', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 772.00, 'FAILED', 'order_TGsAuOhCHdo7Ra', NULL, NULL, '2026-07-23 08:08:58.407', '2026-07-23 08:22:29.678', '2026-07-24', 'Hello tester', 'DELIVERY'),
('2f807156-ed77-41a6-ba7a-68c6c20d3981', '68d68b34-c98c-4f57-8f9d-7b190716baa5', 1.20, 'PAID', 'order_TKGb87CztZkwfg', 'pay_TKGbE3MiagGB4y', 'c44dfb774d1bae84a9490beda2f7bc7837f5136c1d3168c5977bd02e56c5ba49', '2026-07-31 21:59:26.849', '2026-07-31 21:59:59.180', '2026-08-01', NULL, 'DELIVERY'),
('30a32aba-d9e5-4bb1-8778-af8f8d664d65', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 965.00, 'CANCELLED', 'order_TK4NLng6WAFIZK', NULL, NULL, '2026-07-31 10:02:04.820', '2026-07-31 10:02:26.067', '2026-08-01', NULL, 'DELIVERY'),
('317d980f-bf81-43e9-a064-b601c7fb3c5e', '71b12a41-66d2-41ea-ac79-cf8bdbb2d169', 127.71, 'PENDING', 'order_TFSspRQG08KEaV', NULL, NULL, '2026-07-19 18:45:30.999', '2026-07-19 18:45:30.999', '2026-07-19', NULL, 'DELIVERY'),
('31af772a-47bb-49bd-bd93-5e2dbb15ccd8', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 8916.00, 'PENDING', 'order_TGg6atGrFeAVOX', NULL, NULL, '2026-07-22 20:20:33.957', '2026-07-22 20:20:33.957', '2026-07-23', NULL, 'DELIVERY'),
('32e4723e-9625-4031-acca-88eb7adcc8d9', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 750.00, 'CANCELLED', 'order_TKGuniR6DQilrn', NULL, NULL, '2026-07-31 22:18:04.175', '2026-07-31 22:19:30.523', '2026-08-03', NULL, 'DELIVERY'),
('337f3090-14be-4b7c-bd53-c91feef6817a', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 839.00, 'CANCELLED', 'order_TKqrQXAvTXqfsG', NULL, NULL, '2026-08-02 09:27:50.651', '2026-08-02 09:27:54.383', '2026-08-05', NULL, 'DELIVERY'),
('34ccc372-5a08-4137-b64b-4ac0562a0172', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 21.49, 'PENDING', 'order_TF2lhHyg7Y7kil', NULL, NULL, '2026-07-18 17:12:43.951', '2026-07-18 17:12:43.951', NULL, NULL, 'DELIVERY'),
('34e8432f-5f10-4878-9ec9-743f5a18bccf', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 825.00, 'CANCELLED', 'order_TIy8ZbXZqW48o9', NULL, NULL, '2026-07-28 15:16:55.697', '2026-07-28 15:17:13.408', '2026-07-29', NULL, 'DELIVERY'),
('35ee6e1d-82da-43a2-bb3f-80797512d4a9', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 966.00, 'CANCELLED', 'order_TKupXiWHvPmnxk', NULL, NULL, '2026-08-02 13:20:50.108', '2026-08-02 13:20:54.446', '2026-08-03', NULL, 'DELIVERY'),
('3703ef57-bc39-4d57-a091-e4d078e33ad6', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 8916.00, 'PENDING', 'order_TGg5tEQbhdl5UI', NULL, NULL, '2026-07-22 20:19:53.958', '2026-07-22 20:19:53.958', '2026-07-23', NULL, 'DELIVERY'),
('3b1b4a56-54d0-49f7-a815-b4a33b1e41ec', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1715.00, 'CANCELLED', 'order_TIndib0JOpIhG3', NULL, NULL, '2026-07-28 05:00:46.943', '2026-07-28 05:00:51.340', '2026-07-29', NULL, 'DELIVERY'),
('3db29713-0310-4a27-a3b1-cf71c540d186', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIZejos5pvf4IM', NULL, NULL, '2026-07-27 15:20:02.268', '2026-07-27 15:20:02.268', '2026-07-28', 'ASFASFFAFASF', 'DELIVERY'),
('3e33391c-40df-4b90-8587-01fb3b18afd3', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 839.00, 'CANCELLED', 'order_TZZW1Pc6NIv15m', NULL, NULL, '2026-09-08 14:14:48.975', '2026-09-08 14:14:56.791', '2026-09-10', NULL, 'DELIVERY'),
('3ede6636-0490-4a55-b1ca-cd13c100e038', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 3216.00, 'CANCELLED', 'order_TK4JQ5QXByCEy5', NULL, NULL, '2026-07-31 09:58:21.548', '2026-07-31 09:58:24.394', '2026-08-01', NULL, 'DELIVERY'),
('400aafd9-1e54-49a6-b4a8-a8eb7c60b978', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1565.00, 'PENDING', 'order_TIo55lgxOMmB3P', NULL, NULL, '2026-07-28 05:26:41.780', '2026-07-28 05:26:41.780', '2026-07-29', NULL, 'DELIVERY'),
('41e0cd22-f42d-4921-affa-6cd6ebeb3de8', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 551.00, 'PENDING', 'order_THFRcWd1y1A1tK', NULL, NULL, '2026-07-24 06:54:44.789', '2026-07-24 06:54:44.789', '2026-07-25', NULL, 'DELIVERY'),
('41f0ddc2-077b-4707-8c0a-d31e8e9d101e', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TKFfhgOmp6fHvJ', NULL, NULL, '2026-07-31 21:05:05.019', '2026-07-31 21:05:05.019', '2026-08-01', 'f', 'DELIVERY'),
('44178518-77dc-45c0-946e-7414dc931180', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 4704.00, 'CANCELLED', 'order_TJNaaCsfRaaqtm', NULL, NULL, '2026-07-29 16:10:46.993', '2026-07-29 16:10:55.131', '2026-07-30', NULL, 'DELIVERY'),
('442e01f0-c08c-4964-8a50-17ea8fe11aaa', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 846.00, 'CANCELLED', 'order_TVI7Q3kREsZdl1', NULL, NULL, '2026-08-28 18:37:43.678', '2026-08-28 18:37:54.023', '2026-08-29', 'jhkgjhkgjkhg', 'DELIVERY'),
('447b99f5-30ba-47a7-9bd3-611930da9cdb', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 750.00, 'CANCELLED', 'order_TKGx8YLkXpzcyw', NULL, NULL, '2026-07-31 22:20:16.854', '2026-07-31 22:20:22.748', '2026-08-01', NULL, 'DELIVERY'),
('450be582-8c0d-4c9f-b4af-6d7d01fa5335', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 96.00, 'PENDING', 'order_TFhyZJMHEFMHDG', NULL, NULL, '2026-07-20 09:31:20.907', '2026-07-20 09:31:20.907', '2026-07-21', NULL, 'DELIVERY'),
('479bbfcb-b50f-4ec7-81a6-31889f7aebb8', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2465.00, 'CANCELLED', 'order_TIdz03je9Hcg1r', NULL, NULL, '2026-07-27 19:33:59.600', '2026-07-27 19:34:02.362', '2026-07-28', 'hello', 'DELIVERY'),
('482495a8-ac90-4afc-9fbb-894705d8b647', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 185.02, 'PENDING', 'order_TFPY0AVrctDVNE', NULL, NULL, '2026-07-19 15:29:50.772', '2026-07-19 15:29:50.772', '2026-07-19', NULL, 'DELIVERY'),
('4873d229-c462-4337-bcba-c9ca073844f9', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 5572.00, 'PENDING', 'order_TIckMtE1ITuKyO', NULL, NULL, '2026-07-27 18:21:26.894', '2026-07-27 18:21:26.894', '2026-07-28', 'resfd', 'DELIVERY'),
('48d0f2df-aef2-49b9-8c26-88d51e05f106', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1073.00, 'PENDING', 'order_TIeMG0Yj6ZiO0h', NULL, NULL, '2026-07-27 19:56:00.615', '2026-07-27 19:56:00.615', '2026-07-28', NULL, 'DELIVERY'),
('497a2f73-e695-4d03-918a-9a9a3b95b803', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1480.00, 'FAILED', 'order_TGrdxtoyDrne0R', NULL, NULL, '2026-07-23 07:37:47.211', '2026-07-23 07:38:23.041', '2026-07-24', NULL, 'DELIVERY'),
('49c782d8-90f3-46d4-8f30-ff259be5c745', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1000.00, 'PENDING', 'order_TIcuCJCqljHD4M', NULL, NULL, '2026-07-27 18:30:45.207', '2026-07-27 18:30:45.207', '2026-07-28', NULL, 'DELIVERY'),
('4a2bb6da-7060-4d7b-bea1-dfa6da48c42d', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1.88, 'PENDING', 'order_TFO0jeJhzO4SBn', NULL, NULL, '2026-07-19 13:59:32.016', '2026-07-19 13:59:32.016', '2026-07-19', NULL, 'DELIVERY'),
('4b048a1a-a59b-4cf5-b34b-90950cb33e2b', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 846.00, 'CANCELLED', 'order_TPJAOsFerpJN9O', NULL, NULL, '2026-08-13 15:45:13.990', '2026-08-13 15:45:18.004', '2026-08-14', NULL, 'DELIVERY'),
('4b522bf4-dda9-4969-b362-1f0d646eee7c', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 96.00, 'PENDING', 'order_TFhyvADVXGX2a5', NULL, NULL, '2026-07-20 09:31:40.717', '2026-07-20 09:31:40.717', '2026-07-21', NULL, 'DELIVERY'),
('4dab77e7-cce6-42c4-9614-c819b1ac3cc5', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2465.00, 'PENDING', 'order_TJm9a76LBrxI0K', NULL, NULL, '2026-07-30 16:12:33.671', '2026-07-30 16:12:33.671', '2026-07-31', NULL, 'DELIVERY'),
('4e5c1388-fff4-47ef-b3fe-e08fbe6499bc', 'e8d67682-c2af-486d-bbab-5c1614e2107c', 607.00, 'PENDING', 'order_TIH1c5mRMcLhfq', NULL, NULL, '2026-07-26 21:06:30.916', '2026-07-26 21:06:30.916', '2026-07-27', NULL, 'DELIVERY'),
('4fa646bd-45e6-4fa4-a3cf-ed2fe8fc869b', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 80.00, 'PENDING', 'order_TFOzDQmU6UwkL8', NULL, NULL, '2026-07-19 14:56:54.854', '2026-07-19 14:56:54.854', '2026-07-19', NULL, 'DELIVERY'),
('50d84184-8921-4009-ab2b-e7f49ef3204e', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIaHSXw2K16S6V', NULL, NULL, '2026-07-27 15:56:41.681', '2026-07-27 15:56:41.681', '2026-07-31', 'gsdhsh', 'DELIVERY'),
('524726c4-2c89-4d8e-92d2-cc18fec73eab', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 2.05, 'PAID', 'order_TF4Lx0w7QXoQma', 'pay_TF4MAIZ5NCkerU', '38b9472fa7cf0a9f4178f3e79ca1b12ec0da5fc7de160bb73e9398e023d1b185', '2026-07-18 18:45:44.769', '2026-07-18 18:46:12.300', NULL, NULL, 'DELIVERY'),
('524d53aa-0571-42f4-b464-884323678b58', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 19594.00, 'CANCELLED', 'order_TKQ3xbgwaArXOy', NULL, NULL, '2026-08-01 07:14:58.994', '2026-08-01 07:15:07.817', '2026-08-05', NULL, 'DELIVERY'),
('544f9b5e-3700-48ed-a3d4-c6e949ef858f', '71b12a41-66d2-41ea-ac79-cf8bdbb2d169', 337.00, 'PENDING', 'order_TIZASj2DnbDka8', NULL, NULL, '2026-07-27 14:51:22.597', '2026-07-27 14:51:22.597', '2026-07-28', NULL, 'DELIVERY'),
('54571634-8911-4489-93c7-495f622185f8', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 750.00, 'PENDING', 'order_TYkFfKyct98ngV', NULL, NULL, '2026-09-06 12:05:57.598', '2026-09-06 12:05:57.598', '2026-09-07', NULL, 'PICKUP'),
('55f4dbd4-7f21-4e50-9d5f-67880a090177', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1.01, 'PENDING', 'order_TFHo40a8knfhEZ', NULL, NULL, '2026-07-19 07:55:22.586', '2026-07-19 07:55:22.586', '2026-07-19', 'tgr', 'DELIVERY'),
('58c15566-0122-4069-a319-620cf80d8e2f', '6d29aaf6-d689-4320-96fd-4edb7f7fc0b2', 980.00, 'PENDING', 'order_TIZQvLwlVcsjND', NULL, NULL, '2026-07-27 15:06:57.618', '2026-07-27 15:06:57.618', '2026-07-28', NULL, 'DELIVERY'),
('598c5089-44d5-4172-a5dd-119cbc1bfd68', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 166.02, 'PENDING', 'order_TFP2CHAWhFFzoy', NULL, NULL, '2026-07-19 14:59:44.789', '2026-07-19 14:59:44.789', '2026-07-19', NULL, 'DELIVERY'),
('599e1af1-6ee3-499d-8895-7b26d00725fd', '76dd07aa-5f94-4c1f-874d-1ce0342df8d8', 553.00, 'PENDING', 'order_TIqbysDV8rqetI', NULL, NULL, '2026-07-28 07:55:13.122', '2026-07-28 07:55:13.122', '2026-07-29', NULL, 'DELIVERY'),
('5aa9de5a-9981-49ee-89da-ffc82a4d44c2', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TKFXuLovhJmQAF', NULL, NULL, '2026-07-31 20:57:42.228', '2026-07-31 20:57:42.228', '2026-08-01', NULL, 'DELIVERY'),
('5b4fd883-d388-45ac-aa87-e7265c3d736b', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 6066.00, 'PENDING', 'order_TGegCfeiTHlhO2', NULL, NULL, '2026-07-22 18:56:53.349', '2026-07-22 18:56:53.349', '2026-07-23', NULL, 'DELIVERY'),
('5b9a5392-7d8b-4c60-bdd5-eb74152c9234', '68d68b34-c98c-4f57-8f9d-7b190716baa5', 1.00, 'CANCELLED', 'order_TKGaPFPPfTEabf', NULL, NULL, '2026-07-31 21:58:45.744', '2026-07-31 21:58:52.912', '2026-08-02', NULL, 'DELIVERY'),
('60451250-906d-472c-b2c9-69adcc502835', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 222.00, 'PENDING', 'order_TGCsPeG7m8E66R', NULL, NULL, '2026-07-21 15:45:01.656', '2026-07-21 15:45:01.656', '2026-07-22', 'ssda', 'DELIVERY'),
('6094208f-9bd9-48a9-ae85-16098445ebb1', '0bc963e8-0d41-4acb-971b-5c3eb941ed00', 638.00, 'PAID', 'order_TGV9iTfhnSYyBS', NULL, NULL, '2026-07-22 09:37:53.549', '2026-07-22 09:38:10.902', '2026-07-25', NULL, 'DELIVERY'),
('60f4b59c-c40f-446f-9aa2-f02d70a8a444', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 6216.00, 'CANCELLED', 'order_TKDUcPqaXyAPT5', NULL, NULL, '2026-07-31 18:57:12.240', '2026-07-31 18:57:16.587', '2026-08-02', NULL, 'DELIVERY'),
('64d4db8f-0591-4ac2-b129-5117bb990ef9', 'e8d67682-c2af-486d-bbab-5c1614e2107c', 1229.00, 'CANCELLED', 'order_TIljIeRx9EhdGG', NULL, NULL, '2026-07-28 03:08:40.752', '2026-07-28 03:08:51.088', '2026-07-29', NULL, 'DELIVERY'),
('64d7b8e2-9bcb-46a2-831e-db55d1b6b783', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 538.00, 'PENDING', 'order_TGWO4hDuBKm4m8', NULL, NULL, '2026-07-22 10:50:10.723', '2026-07-22 10:50:10.723', '2026-07-23', NULL, 'DELIVERY'),
('64f6d6a3-52c6-41ab-9597-45d36d1dcf8e', '80dd667b-9ff3-4941-a450-c3ba9e616c6d', 1447.00, 'PENDING', 'order_TGeFUSNSozHfSh', NULL, NULL, '2026-07-22 18:31:36.046', '2026-07-22 18:31:36.046', '2026-07-23', '.', 'DELIVERY'),
('65431398-bad5-4e81-8566-d914f3d16daa', '901f8aed-5382-4cad-8f1b-22c1d3977559', 900.00, 'PAID', 'order_TaqqnkoHX6BhiC', 'pay_TaqqtvxfiA7NBP', NULL, '2026-09-11 19:51:16.822', '2026-09-11 19:51:33.059', '2026-09-12', 'Order picked up already! Thank you babes ❤️', 'PICKUP'),
('66aafe6a-a54e-4170-ad2e-3407de130305', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1.10, 'PAID', 'order_TF5NJXDel9RlJH', 'pay_TF5NtjWclvdxPi', '0566062644e826988deb30bd90962b882842ac6088ed0b0e417de557d8845195', '2026-07-18 19:45:43.821', '2026-07-18 19:46:31.627', NULL, NULL, 'DELIVERY'),
('670c0dd2-d6d8-4e0c-af9c-257ac7dc4774', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 665.00, 'PENDING', 'order_TIcgd0plxMK7R3', NULL, NULL, '2026-07-27 18:17:54.466', '2026-07-27 18:17:54.466', '2026-07-28', 'fafa', 'DELIVERY'),
('6759faf1-5072-4bb2-8a9b-3ac1df2c67c9', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 3900.00, 'PENDING', 'order_TPb7YPCZkuv9tT', NULL, NULL, '2026-08-14 09:19:01.375', '2026-08-14 09:19:01.375', '2026-08-15', NULL, 'PICKUP'),
('67bf50d2-5d5d-442a-a22b-a4234c7aad69', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 966.00, 'CANCELLED', 'order_TKG3ndRwDGqMhK', NULL, NULL, '2026-07-31 21:27:53.683', '2026-07-31 21:27:56.989', '2026-08-01', NULL, 'DELIVERY'),
('68bfaad3-53b9-4b67-8820-d48ebe990ac1', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2315.00, 'CANCELLED', 'order_TQ75abEZ6GG5DY', NULL, NULL, '2026-08-15 16:35:21.444', '2026-08-15 16:35:24.022', '2026-08-20', NULL, 'DELIVERY'),
('68ce227f-16fa-46b3-867d-03eceaab8fae', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2315.00, 'PENDING', 'order_TOxjTDy95JqQ71', NULL, NULL, '2026-08-12 18:47:10.481', '2026-08-12 18:47:10.481', '2026-08-14', NULL, 'DELIVERY'),
('6a57dfb2-9d31-4da9-a796-50b4d87322f4', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 97.00, 'PENDING', 'order_TFrDO8We5kb8O9', NULL, NULL, '2026-07-20 18:33:37.535', '2026-07-20 18:33:37.535', '2026-07-21', NULL, 'DELIVERY'),
('6a5af8cc-15c0-4170-9d67-5f9303c9f58b', '005b1db4-a816-46fc-959d-5f6c6a402708', 450.00, 'CANCELLED', 'order_Tu2EZI1p2CfSY1', NULL, NULL, '2026-10-30 07:20:26.547', '2026-10-30 07:20:36.659', '2026-10-31', NULL, 'PICKUP'),
('6a64e7a9-2820-489d-8c4c-c6bc56abcdf9', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 6516.00, 'PENDING', 'order_TGe8885jFmtTLC', NULL, NULL, '2026-07-22 18:24:37.986', '2026-07-22 18:24:37.986', '2026-07-23', 'tqtqwtqwt', 'DELIVERY'),
('6abf26af-5d95-45f8-9be8-7ddb43448f56', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2465.00, 'CANCELLED', 'order_TJm9jERr3rentb', NULL, NULL, '2026-07-30 16:12:42.019', '2026-07-30 16:12:44.861', '2026-07-31', NULL, 'DELIVERY'),
('6b256389-fd0d-40c7-8ce8-4d7bb96f5652', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TGdw6rRr9pG6qs', NULL, NULL, '2026-07-22 18:13:15.224', '2026-07-22 18:13:15.224', '2026-07-23', 'fasfassf', 'DELIVERY'),
('6b34f159-b3cb-4ee1-ad5f-230e7930c166', 'dc23128f-6967-439d-8f40-b96659dc44a7', 107.98, 'PENDING', 'order_TFRvUOo6P3vyAM', NULL, NULL, '2026-07-19 17:49:20.510', '2026-07-19 17:49:20.510', '2026-07-16', '.', 'DELIVERY'),
('6b5d48bd-e72a-4aa2-9ecc-e79c8fbfe931', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 8916.00, 'PENDING', 'order_TGg5QUUVdGXuPv', NULL, NULL, '2026-07-22 20:19:27.629', '2026-07-22 20:19:27.629', '2026-07-23', NULL, 'DELIVERY'),
('6c14b01b-0fd2-4d51-8fe1-36faa6506690', '68d68b34-c98c-4f57-8f9d-7b190716baa5', 607.00, 'PENDING', 'order_TIZckCxiUGhsvQ', NULL, NULL, '2026-07-27 15:18:09.013', '2026-07-27 15:18:09.013', '2026-07-28', 'Ta', 'DELIVERY'),
('6c6aa033-355a-487d-80b5-d29e7b0ae1d8', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 6216.00, 'PENDING', 'order_TKDUcQK67VvZl8', NULL, NULL, '2026-07-31 18:57:12.197', '2026-07-31 18:57:12.197', '2026-08-02', NULL, 'DELIVERY'),
('6e02937a-8483-418b-a95b-1d5c3b0c2075', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'CANCELLED', 'order_TKEMrmJWOtcdgs', NULL, NULL, '2026-07-31 19:48:33.462', '2026-07-31 19:49:32.524', '2026-08-01', NULL, 'DELIVERY'),
('6ece8475-fb58-4c85-9579-5a301be4d663', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 750.00, 'PENDING', 'order_TYVOsOk618pHwM', NULL, NULL, '2026-09-05 21:34:16.546', '2026-09-05 21:34:16.546', '2026-09-06', NULL, 'PICKUP'),
('700f46d4-dd2e-49b1-99eb-c406e394413f', 'dc23128f-6967-439d-8f40-b96659dc44a7', 177.00, 'CANCELLED', 'order_TFSXA2EzJXMJKO', NULL, NULL, '2026-07-19 18:25:00.260', '2026-07-19 18:25:25.530', '2026-07-19', '..', 'DELIVERY'),
('709b1eb8-5e13-4efb-87b0-77784524b60d', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 1.00, 'PAID', 'order_TKGi3NvA0eWMab', 'pay_TKGiMXzrmtea8Z', '60310296f51ec260f7d6d97f5a45356ee4e2ddfb1a9110dcbdb0f0976f77cc53', '2026-07-31 22:06:00.118', '2026-07-31 22:06:32.085', '2026-08-01', NULL, 'DELIVERY');
INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `status`, `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`, `created_at`, `updated_at`, `delivery_date`, `notes`, `delivery_type`) VALUES
('7155ff15-eced-41d1-82a3-717d969b3735', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 1073.00, 'FAILED', 'order_TGsFPe10xO5Mwu', NULL, NULL, '2026-07-23 08:13:14.242', '2026-07-23 08:13:36.175', '2026-07-24', 'Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.Here is a step-by-step guide on how to thoroughly test both of the major changes we made to ensure everything is working perfectly in your production environment.\n\n### Test 1: Razorpay Special Instructions\nSince this involves actual payments, you can either put your Razorpay into \"Test Mode\" temporarily, or do a real transaction for ₹1 and then refund yourself.\n\n1. **The Standard Test:**\n   * Go to your checkout page.\n   * In the \"Additional Info\" or special instructions box, type: `Deliver carefully, it\'s a gift!`\n   * Complete the payment.\n   * Go to your **Razorpay Dashboard** -> **Transactions/Orders**. Click on the order you just made and look at the **Notes** section. You should clearly see `special_instructions: Deliver carefully, it\'s a gift!`.\n2. **The \"Blank\" Test (Edge case):**\n   * Do another checkout, but completely ignore the additional info box (leave it blank).\n   * Verify that the checkout popup opens normally and doesn\'t crash.\n3. **The \"Huge Paragraph\" Test (Edge case):**\n   * Paste a massive paragraph (more than 300 characters) into the additional info box.\n   * Proceed to checkout. It should successfully open the popup (proving our `.substring(0, 255)` safety trim worked and prevented Razorpay from rejecting the request).\n\n---\n\n### Test 2: The 60-Second Cache (Proving the 503 fix)\nYou can test that the caching is actually working very easily without needing any fancy load-testing software.\n\n1. **The 60-Second Delay Test:**\n   * Open two tabs side-by-side: Your **Admin Panel** and your **Live Menu Page**.\n   * In the admin panel, edit a product\'s name (e.g., change \"Chocolate Cake\" to \"Chocolate Cake TEST\").\n   * Hit save in the admin panel.\n   * Immediately go to your live Menu tab and refresh the page.\n   * **What should happen:** You should still see the OLD name (\"Chocolate Cake\"). This proves the Next.js cache is working perfectly and protecting your database!\n   * Wait exactly 60 seconds, refresh the Menu page again, and the new \"TEST\" name will magically appear.\n2. **The Real-Time Cart Test:**\n   * While you are inside that 60-second window (where the menu shows the old name), click \"Add to Cart\" and go to the Checkout page.\n   * **What should happen:** The Cart/Checkout page should instantly show the **NEW** name (\"Chocolate Cake TEST\"). This proves that our decision to leave the cart out of the cache worked, protecting your checkout flow from stale data!\n\nIf all of these tests pass, your app is practically bulletproof! Let me know if you run into any issues while testing.sddfsdvdvddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'DELIVERY'),
('71cb18b8-8690-42ec-97a5-a10f5ba0a978', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 916.00, 'PENDING', 'order_TGr5hUl6l2sjPF', NULL, NULL, '2026-07-23 07:05:20.968', '2026-07-23 07:05:20.968', '2026-07-24', NULL, 'DELIVERY'),
('71f4ffcf-2689-460e-8f98-e74f3cf236d7', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 8916.00, 'PENDING', 'order_TGg73WVRS4hR7n', NULL, NULL, '2026-07-22 20:21:00.187', '2026-07-22 20:21:00.187', '2026-07-23', NULL, 'DELIVERY'),
('724b0987-9fe2-4640-a849-d9b5b5e739c5', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1.00, 'CANCELLED', 'order_TKGsrAmIhfNNKG', NULL, NULL, '2026-07-31 22:16:13.743', '2026-07-31 22:16:30.906', '2026-08-03', NULL, 'DELIVERY'),
('732f7125-0a47-4993-8286-49ac345b3acf', 'bb832641-8b2a-4027-9d1e-a8496c51c7f4', 783.00, 'PAID', 'order_TGTuFzE6WWPJL5', NULL, NULL, '2026-07-22 08:24:33.841', '2026-07-22 08:24:55.718', '2026-07-23', NULL, 'DELIVERY'),
('734a942c-436d-4e92-8ad5-ec0aadfc3040', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2100.00, 'PENDING', 'order_TPXrgV1xZuDDm3', NULL, NULL, '2026-08-14 06:07:55.145', '2026-08-14 06:07:55.145', '2026-08-14', NULL, 'PICKUP'),
('75377f83-ebde-4efb-91c9-0b233f6b54ba', '5a287fa7-4c50-4cce-b431-8bb96499623e', 978.00, 'PENDING', 'order_TKEazNJKEnpema', NULL, NULL, '2026-07-31 20:01:55.630', '2026-07-31 20:01:55.630', '2026-08-01', NULL, 'DELIVERY'),
('7642f1a4-2d5b-404b-b44a-ac40de5d08e5', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1.01, 'PAID', 'order_TFHWCvuKXrSKKw', 'pay_TFHWX1dWuJMPLc', 'cc642ef09fee96453fef377aca7b7295ed31256943587ac6bb3ffbf75cd6fb85', '2026-07-19 07:38:28.358', '2026-07-19 07:39:01.909', '2026-07-19', 'hg', 'DELIVERY'),
('76a1b5f3-a024-41e7-8cd7-b0fcc4654a78', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 280.00, 'CANCELLED', 'order_TYUr592FGkBcXc', NULL, NULL, '2026-09-05 21:02:17.028', '2026-09-05 21:02:23.258', '2026-09-06', NULL, 'PICKUP'),
('77180e77-9ce0-4614-bc87-add3d6219cd6', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1073.00, 'PENDING', 'order_TIeMFpSadZViQd', NULL, NULL, '2026-07-27 19:56:00.455', '2026-07-27 19:56:00.455', '2026-07-28', NULL, 'DELIVERY'),
('778c444c-ce40-43d6-8a0c-ec0cf7c38fb8', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 795.00, 'CANCELLED', 'order_TitPacLwUgUi5n', NULL, NULL, '2026-10-02 03:33:36.867', '2026-10-02 03:34:14.976', '2026-10-02', ',hmhfhmg', 'DELIVERY'),
('78510faa-616c-4bf8-bb9a-a20fd73dfc80', 'dc23128f-6967-439d-8f40-b96659dc44a7', 1029.00, 'CANCELLED', 'order_TKGEAf9h0i8b7w', NULL, NULL, '2026-07-31 21:37:42.776', '2026-07-31 21:37:56.128', '2026-08-01', NULL, 'DELIVERY'),
('78e6bbbd-f8e2-4afb-9459-f7ffebb4ed08', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 1.00, 'PAID', 'order_TKGn5QV9XvFWUD', 'pay_TKGnMvvR65Nv18', 'da56c33bd51c5efc4360dc009b1b98233f0db0e7ba100a6999d482cb8978a5c5', '2026-07-31 22:10:45.986', '2026-07-31 22:11:18.848', '2026-08-03', NULL, 'DELIVERY'),
('79e9221b-024e-403e-bd3b-1c26a3a93ec9', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1072.00, 'PENDING', 'order_TIcny46XAKMKtz', NULL, NULL, '2026-07-27 18:24:51.355', '2026-07-27 18:24:51.355', '2026-07-28', NULL, 'DELIVERY'),
('79eb820c-5c54-4aff-9ffa-6cd5c2f0ed55', '638bbd07-adb2-41b2-9eff-545f34d12cc8', 1385.00, 'PAID', 'order_TGlSrZQ3GP5CwY', NULL, NULL, '2026-07-23 01:35:06.920', '2026-07-23 01:35:28.678', '2026-07-24', 'Congratulations Saif.', 'DELIVERY'),
('7a4d5afb-86d4-4301-9816-7d023a667e3f', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 839.00, 'CANCELLED', 'order_TKdDujb16ly0hA', NULL, NULL, '2026-08-01 20:07:25.344', '2026-08-01 20:07:30.438', '2026-08-07', NULL, 'DELIVERY'),
('7acb27fc-cc2b-496b-93d7-1793f89a8e53', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'CANCELLED', 'order_TKG3rUi1Y8lxGj', NULL, NULL, '2026-07-31 21:27:57.213', '2026-07-31 21:28:06.312', '2026-08-01', 'fvb', 'DELIVERY'),
('7b906dc8-6896-44fd-b67c-6365ead27329', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1.08, 'PAID', 'order_TFNhdqIIgDosfa', NULL, NULL, '2026-07-19 13:41:27.492', '2026-07-19 13:41:48.955', '2026-07-19', NULL, 'DELIVERY'),
('7c03ec8d-2133-42df-bc6d-869498f47639', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 750.00, 'PENDING', 'order_TYVOWSZKE2rFwn', NULL, NULL, '2026-09-05 21:33:56.451', '2026-09-05 21:33:56.451', '2026-09-06', NULL, 'PICKUP'),
('7c12ebec-9a08-4b18-82df-57053eae946a', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 6215.00, 'CANCELLED', 'order_TIdxdLIirFt0tg', NULL, NULL, '2026-07-27 19:32:41.992', '2026-07-27 19:32:45.985', '2026-07-28', NULL, 'DELIVERY'),
('7c38a4ed-0a3e-484a-a411-98b6204bdaf6', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 8916.00, 'PENDING', 'order_TGr2KaTQMu1HVq', NULL, NULL, '2026-07-23 07:02:09.589', '2026-07-23 07:02:09.589', '2026-07-24', NULL, 'DELIVERY'),
('7c3ca9fa-c946-49da-82a1-03f7c37efe6c', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 916.00, 'CANCELLED', 'order_TLjrWUMug6yaDv', NULL, NULL, '2026-08-04 15:16:04.931', '2026-08-04 15:16:07.606', '2026-08-05', NULL, 'DELIVERY'),
('7cc61ecb-2c8a-4bf9-909d-e919ac587e45', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1565.00, 'PENDING', 'order_TGeHjpWSyXLoT1', NULL, NULL, '2026-07-22 18:33:43.722', '2026-07-22 18:33:43.722', '2026-07-23', NULL, 'DELIVERY'),
('7d403d4a-cd60-4607-9443-994cf2f56db5', '231c483c-8dd4-4bbc-9cca-8b909c492eda', 910.00, 'PENDING', 'order_TIZHHmZRxC07aZ', NULL, NULL, '2026-07-27 14:57:50.169', '2026-07-27 14:57:50.169', '2026-07-28', NULL, 'DELIVERY'),
('7d62b502-7c9c-45f0-ae84-e86a443b389c', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 916.00, 'PENDING', 'order_TGr5hTmojWSwa1', NULL, NULL, '2026-07-23 07:05:20.962', '2026-07-23 07:05:20.962', '2026-07-24', NULL, 'DELIVERY'),
('7d873be9-b1f9-4426-b83e-da86b86a2d99', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TKFgD9Op1ErA7r', NULL, NULL, '2026-07-31 21:05:33.848', '2026-07-31 21:05:33.848', '2026-08-01', 'g', 'DELIVERY'),
('7dc78fc6-320c-43fb-b208-f36ec7003eef', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 1125.00, 'PENDING', 'order_THceaFABjW5zp6', NULL, NULL, '2026-07-25 05:36:58.236', '2026-07-25 05:36:58.236', '2026-07-26', NULL, 'DELIVERY'),
('7ebd043b-ec2a-4726-aa63-a4064aafa517', '7c33afbe-c547-481c-883a-d38d6a36ee0d', 839.00, 'PAID', 'order_TGvOYluGzjepy3', NULL, NULL, '2026-07-23 11:17:58.650', '2026-07-23 11:18:24.914', '2026-07-24', NULL, 'DELIVERY'),
('7fedc15e-db85-4389-ab53-c92bc30804f3', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1073.00, 'FAILED', 'order_TGrEXIANE7eXCk', NULL, NULL, '2026-07-23 07:13:42.832', '2026-07-23 07:14:56.722', '2026-07-24', NULL, 'DELIVERY'),
('80183bce-cac9-4a37-84c1-9738d6f0f81e', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 917.00, 'CANCELLED', 'order_TLhq6alJTYrfwk', NULL, NULL, '2026-08-04 13:17:21.194', '2026-08-04 13:17:34.956', '2026-08-05', NULL, 'DELIVERY'),
('81cef5b8-adc6-4f6f-a779-ad3f1c7cb6df', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 550.00, 'PENDING', 'order_THF6uNatIOlJWm', NULL, NULL, '2026-07-24 06:35:08.355', '2026-07-24 06:35:08.355', '2026-07-25', NULL, 'DELIVERY'),
('81d8df0f-a98d-42ed-a3c1-8544f74dc76f', '7de1ef00-4f44-440f-bc3b-7db12beebdfe', 1201.00, 'PAID', 'order_THT6wrUilvdojd', NULL, NULL, '2026-07-24 20:16:53.216', '2026-07-24 20:17:12.783', '2026-07-25', NULL, 'DELIVERY'),
('82eab8c4-3abb-4d31-913a-da8009eca7a4', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1823.00, 'PENDING', 'order_TGefNOqeax9RRN', NULL, NULL, '2026-07-22 18:56:06.374', '2026-07-22 18:56:06.374', '2026-08-06', NULL, 'DELIVERY'),
('83092155-394c-4d57-ad23-1595f5ae5eed', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 835.00, 'CANCELLED', 'order_TYqGmWXclaxK9L', NULL, NULL, '2026-09-06 17:59:10.672', '2026-09-06 17:59:20.091', '2026-09-07', NULL, 'DELIVERY'),
('83b734e8-3039-445b-8626-170355295f69', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1073.00, 'PENDING', 'order_TGrDm70I8siRnY', NULL, NULL, '2026-07-23 07:12:59.603', '2026-07-23 07:12:59.603', '2026-07-24', NULL, 'DELIVERY'),
('83d667ec-c6a1-4838-8948-6eca7fb65bb7', '9290b9d6-f155-46fd-bfc3-aee836d86909', 253.00, 'PENDING', 'order_TFRENW0YDRvkh7', NULL, NULL, '2026-07-19 17:08:31.784', '2026-07-19 17:08:31.784', '2010-06-09', 'assd', 'DELIVERY'),
('842a4a9d-d249-4ddd-8bca-04613e8e2046', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 965.00, 'CANCELLED', 'order_TOxhrOeDBkDdjG', NULL, NULL, '2026-08-12 18:45:38.998', '2026-08-12 18:45:45.178', '2026-08-19', NULL, 'DELIVERY'),
('84886389-9895-48cf-840a-bec5347bca9e', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1073.00, 'FAILED', 'order_TGsaFMzZ9SSkS6', NULL, NULL, '2026-07-23 08:32:57.629', '2026-07-23 08:33:10.776', '2026-07-24', NULL, 'DELIVERY'),
('84c2a65d-81a2-4566-a784-e48bf7c48c66', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 871.27, 'PENDING', 'order_TFIf4hBolaBfqU', NULL, NULL, '2026-07-19 08:45:33.625', '2026-07-19 08:45:33.625', '2026-07-22', 'ADD NAME ON C ', 'DELIVERY'),
('873a1dc4-084a-4e87-b549-c0cfeedaec4c', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1200.00, 'FAILED', 'order_TPJgUJu6jmTW9o', 'pay_TPJgaAGU7dfgXa', NULL, '2026-08-13 16:15:36.589', '2026-08-13 16:15:47.968', '2026-08-14', 'mujahid testing', 'PICKUP'),
('8852275b-e38e-4c60-921c-aeef8e8fcc4b', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 98.00, 'PENDING', 'order_TG4E9CjzLCp2Wg', NULL, NULL, '2026-07-21 07:17:21.657', '2026-07-21 07:17:21.657', '2026-07-22', NULL, 'DELIVERY'),
('8852e1fd-3b35-4e64-aeda-7f0db33b0833', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 850.00, 'CANCELLED', 'order_TKtkNnHGHvUUH6', NULL, NULL, '2026-08-02 12:17:15.389', '2026-08-02 12:17:58.057', '2026-08-04', NULL, 'DELIVERY'),
('88f87778-e5b7-46d4-b4c2-2d0333403e5b', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1000.00, 'PENDING', 'order_TIcvEB6Nf56Ynj', NULL, NULL, '2026-07-27 18:31:43.719', '2026-07-27 18:31:43.719', '2026-07-30', 'dsgdgsggs gagagdadg', 'DELIVERY'),
('89640515-ee0b-4b9f-a09b-448a354d9418', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1074.00, 'PENDING', 'order_TIZbF9qeLCVQww', NULL, NULL, '2026-07-27 15:16:43.769', '2026-07-27 15:16:43.769', '2026-07-28', NULL, 'DELIVERY'),
('8ae1194b-d99a-4435-a5b9-51a82a3796c0', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1715.00, 'PENDING', 'order_TK3n05z3l3Zrk7', NULL, NULL, '2026-07-31 09:27:40.150', '2026-07-31 09:27:40.150', '2026-08-01', NULL, 'DELIVERY'),
('8bef0187-3ae2-41e7-93d4-ad2fc3487f77', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1.08, 'PENDING', 'order_TFNfQoe3OnWqUk', NULL, NULL, '2026-07-19 13:39:21.958', '2026-07-19 13:39:21.958', '2026-07-19', NULL, 'DELIVERY'),
('8c9382d5-40d9-48e2-80a4-dba6707cc423', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1.20, 'PAID', 'order_TKGqo3k8OeC7BL', 'pay_TKGr6rFYset0gB', 'd8facda5f8e032f934de70d43053f7508c73ec92b7ee558d6bf24d9b3ffb8803', '2026-07-31 22:14:17.276', '2026-07-31 22:14:48.794', '2026-08-03', NULL, 'DELIVERY'),
('8d418983-577d-40bf-b661-69901ef08585', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 965.00, 'CANCELLED', 'order_TYqHQQBUyqVygP', NULL, NULL, '2026-09-06 17:59:47.221', '2026-09-06 18:00:02.632', '2026-09-07', NULL, 'DELIVERY'),
('8e63fb94-3b51-478d-b952-da1545612910', '9290b9d6-f155-46fd-bfc3-aee836d86909', 253.00, 'PENDING', 'order_TFRAA6Xsqhnp8h', NULL, NULL, '2026-07-19 17:04:32.304', '2026-07-19 17:04:32.304', '2026-07-19', 'assd', 'DELIVERY'),
('8f4316c2-8645-42ef-b596-685580fe08af', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 750.20, 'CANCELLED', 'order_TKGq5P4OJM6t91', NULL, NULL, '2026-07-31 22:13:36.367', '2026-07-31 22:13:42.481', '2026-08-03', NULL, 'DELIVERY'),
('914dfa6f-9955-4b04-8144-8564f25254ee', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TIZivsTdjKvIDi', NULL, NULL, '2026-07-27 15:24:00.511', '2026-07-27 15:24:00.511', '2026-07-28', 'dfsgvsf', 'DELIVERY'),
('91fe264b-e341-43dc-82e1-4d6142e3c34d', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 1.00, 'PAID', 'order_TKGesXlKTJeSgJ', 'pay_TKGfJacyrqe9qO', '947914a5dd720cf894250a022966833f465843874eb1f2849c22916e8c60c178', '2026-07-31 22:02:59.785', '2026-07-31 22:03:39.778', '2026-08-01', NULL, 'DELIVERY'),
('925f4b9c-8efb-40fe-9723-42c0baa7ea3c', '0f509a41-a8ff-4bb2-98f1-1f7bedaa518d', 1847.00, 'PAID', 'order_TdSTf5nQw5SOwC', 'pay_TdSTpcwrPodjD1', NULL, '2026-09-18 09:57:44.054', '2026-09-18 09:58:06.856', '2026-09-19', NULL, 'DELIVERY'),
('92ed16ea-54d7-41c8-bfc9-56bc9a2defb2', '68d68b34-c98c-4f57-8f9d-7b190716baa5', 608.00, 'PENDING', 'order_TIe1CISTbOzguz', NULL, NULL, '2026-07-27 19:36:04.408', '2026-07-27 19:36:04.408', '2026-07-28', 'Ta', 'DELIVERY'),
('9579a6e7-e47f-429e-b598-0ab588fab3b7', '9290b9d6-f155-46fd-bfc3-aee836d86909', 253.00, 'PENDING', 'order_TFR9IY6t7taJPH', NULL, NULL, '2026-07-19 17:03:43.241', '2026-07-19 17:03:43.241', '2026-07-19', 'assd', 'DELIVERY'),
('957d759a-2f04-4bfb-b232-0ad66f52b2c3', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1.03, 'PAID', 'order_TF57FwBJSoQFpB', 'pay_TF57rPCXU35Qzm', 'b4fb368079df7f69e85143776f582b0115694990d179d549186009c1bb21e6fa', '2026-07-18 19:30:31.733', '2026-07-18 19:31:25.829', NULL, NULL, 'DELIVERY');
INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `status`, `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`, `created_at`, `updated_at`, `delivery_date`, `notes`, `delivery_type`) VALUES
('964ee164-8da1-45d3-8ccc-1dabd40df95a', '63ec6fb4-11d4-4277-bab5-1b0fcefbbe4b', 536.00, 'PENDING', 'order_TGdoKadyIFZDTS', NULL, NULL, '2026-07-22 18:05:53.427', '2026-07-22 18:05:53.427', '2026-07-23', NULL, 'DELIVERY'),
('98572e5a-4679-4588-b281-260a38ef665f', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TKFXmWA6xiX3iX', NULL, NULL, '2026-07-31 20:57:35.072', '2026-07-31 20:57:35.072', '2026-08-01', NULL, 'DELIVERY'),
('9941891a-eca5-4e3b-a965-7bf983482d41', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1715.00, 'PENDING', 'order_TJmGkAmQTnzsBK', NULL, NULL, '2026-07-30 16:19:20.474', '2026-07-30 16:19:20.474', '2026-07-31', NULL, 'DELIVERY'),
('99bc4acd-48eb-4fde-b7f1-b51336e51826', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 8525.00, 'CANCELLED', 'order_TJr1v13hHUOEWt', NULL, NULL, '2026-07-30 20:58:46.495', '2026-07-30 20:59:02.354', '2026-08-03', NULL, 'DELIVERY'),
('9b6ad4a7-f5b4-4c60-b395-48029fbdaebd', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TIZgvssBLr1v7w', NULL, NULL, '2026-07-27 15:22:06.908', '2026-07-27 15:22:06.908', '2026-07-28', 'dfsgvsf', 'DELIVERY'),
('9ccf39ae-0716-48fe-9b37-9cba314f0d37', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 1.00, 'CANCELLED', 'order_TKGeQYkdvjD2MW', NULL, NULL, '2026-07-31 22:02:34.148', '2026-07-31 22:02:55.668', '2026-08-01', NULL, 'DELIVERY'),
('9cf155f1-f195-4f23-b770-4b6e3a360d06', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1115.00, 'CANCELLED', 'order_TIo4fkLFwpHnCc', NULL, NULL, '2026-07-28 05:26:17.938', '2026-07-28 05:26:21.788', '2026-07-29', NULL, 'DELIVERY'),
('9d8ad705-8def-4e9f-b806-2e30939d19ef', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 235.00, 'CANCELLED', 'order_TFjSEGStjUwq46', NULL, NULL, '2026-07-20 10:58:07.581', '2026-07-20 10:58:12.465', '2026-07-23', NULL, 'DELIVERY'),
('9ecbba82-14f6-4fbd-8bd2-9d1302611b06', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 321.00, 'PENDING', 'order_TF1RtFsaAjRpzT', NULL, NULL, '2026-07-18 15:55:17.284', '2026-07-18 15:55:17.284', NULL, NULL, 'DELIVERY'),
('a0a88798-6d06-4539-a6e4-d0741af68e51', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 8916.00, 'PENDING', 'order_TGg6nUIm7ekXLI', NULL, NULL, '2026-07-22 20:20:45.501', '2026-07-22 20:20:45.501', '2026-07-23', NULL, 'DELIVERY'),
('a203d875-55d2-436f-aee9-ef26c0726142', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 750.00, 'CANCELLED', 'order_TQ9BkgiChy0AI9', NULL, NULL, '2026-08-15 18:38:34.737', '2026-08-15 18:38:42.727', '2026-08-19', NULL, 'PICKUP'),
('a211806a-7160-4a5e-94a7-ae7185b35736', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1.99, 'PAID', 'order_TF4IcPUR37IYVQ', 'pay_TF4Isalmwkf0Qu', '8b03874342f144e49d516d4719428de22479cbafdca3e3bb7b797a519c6626ad', '2026-07-18 18:42:35.499', '2026-07-18 18:43:05.514', NULL, NULL, 'DELIVERY'),
('a3e68f8f-a26d-42d6-a535-8909a4bb8195', '5a287fa7-4c50-4cce-b431-8bb96499623e', 978.00, 'PENDING', 'order_TKEb6y9C5V6It8', NULL, NULL, '2026-07-31 20:02:02.572', '2026-07-31 20:02:02.572', '2026-08-01', NULL, 'DELIVERY'),
('a4760d30-c777-4ef8-a177-352777d80ec1', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 835.00, 'CANCELLED', 'order_TYqH0iUiMNjVfa', NULL, NULL, '2026-09-06 17:59:23.670', '2026-09-06 17:59:27.240', '2026-09-07', NULL, 'DELIVERY'),
('a5e71477-40d3-434b-a599-b4924e448cf9', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 1073.00, 'PENDING', 'order_TIdC5wxmuks9LP', NULL, NULL, '2026-07-27 18:47:41.783', '2026-07-27 18:47:41.783', '2026-07-28', NULL, 'DELIVERY'),
('a80b1ff2-2e9f-41e3-a4e9-791e18531fea', 'ff7591d5-f14f-4b4c-a8b7-70f218ece33e', 738.00, 'FAILED', 'order_TGeRbrYvJNY0UY', NULL, NULL, '2026-07-22 18:43:04.426', '2026-07-22 18:43:57.750', '2026-07-23', NULL, 'DELIVERY'),
('aa0ed1db-45ca-45d7-9ea5-73e9afb15bbf', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1.01, 'PAID', 'order_TFHpGfXz9ONPUr', 'pay_TFHpTW99tHSsvl', 'c2cc1b421f281690be15fafc690d34fcedac56290142ec90fc29c19a30e7d939', '2026-07-19 07:56:30.976', '2026-07-19 07:56:57.672', '2026-07-19', 'bf', 'DELIVERY'),
('abbafec6-2354-43c7-9f37-88022c052cfe', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIaP7S6YYTIhhR', NULL, NULL, '2026-07-27 16:03:56.721', '2026-07-27 16:03:56.721', '2026-07-28', 'sfafsaf', 'DELIVERY'),
('ac19a394-c4a3-448f-be65-511ef3fc171b', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 6066.00, 'PENDING', 'order_TGeesoa6lAgnyy', NULL, NULL, '2026-07-22 18:55:38.360', '2026-07-22 18:55:38.360', '2026-07-23', 'fasa', 'DELIVERY'),
('ad5dab3f-8f44-406e-bb01-5d63d7bb62a7', 'd136ca9c-d5ef-44d9-b46f-ee12c627c285', 1063.00, 'PAID', 'order_TksnCJq0ARfcbF', 'pay_TksnKunPwfkWaE', NULL, '2026-10-07 04:15:16.430', '2026-10-07 04:15:36.987', '2026-10-07', NULL, 'DELIVERY'),
('add856a5-79bb-4fac-9970-16233e76fc30', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 97.00, 'CANCELLED', 'order_TGIWBRUtZca0Kq', NULL, NULL, '2026-07-21 21:16:08.943', '2026-07-21 21:16:17.113', '2026-07-22', NULL, 'DELIVERY'),
('ae2f1473-04ee-40f4-b28d-f0107660556f', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 795.00, 'PENDING', 'order_TiDQafOqA97Prt', NULL, NULL, '2026-09-30 10:29:25.904', '2026-09-30 10:29:25.904', '2026-10-01', NULL, 'DELIVERY'),
('aec44448-0f7a-4ad9-a5f8-4d8d2251a057', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 8916.00, 'PENDING', 'order_TGg5i951as5ukJ', NULL, NULL, '2026-07-22 20:19:43.801', '2026-07-22 20:19:43.801', '2026-07-23', NULL, 'DELIVERY'),
('aff54ee4-e058-40a9-86fa-de859dc3ea3b', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 839.00, 'CANCELLED', 'order_TKqr8p26quzJH2', NULL, NULL, '2026-08-02 09:27:34.434', '2026-08-02 09:27:37.377', '2026-08-04', NULL, 'DELIVERY'),
('b02a5b74-81bb-4f62-8d56-12ee796d4237', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 965.00, 'CANCELLED', 'order_TInwbkPvqoyLm7', NULL, NULL, '2026-07-28 05:18:39.876', '2026-07-28 05:18:44.533', '2026-07-29', NULL, 'DELIVERY'),
('b2acfbd7-b89a-456d-8d34-576368718df0', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1823.00, 'PENDING', 'order_TGefMmqVVKqEyA', NULL, NULL, '2026-07-22 18:56:05.816', '2026-07-22 18:56:05.816', '2026-08-01', NULL, 'DELIVERY'),
('b3077438-f177-45c7-879e-666b64f208ca', 'e1064137-0eee-44e2-9230-75b6550acf5a', 2365.00, 'PAID', 'order_TU0LovXWtw1E0a', 'pay_TU0b5iykchMg5G', NULL, '2026-08-25 12:35:52.498', '2026-08-25 12:50:34.426', '2026-08-28', NULL, 'DELIVERY'),
('b31f6b22-c724-40d1-b868-4a2ab66726f0', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2465.00, 'CANCELLED', 'order_TJlu8THdzf85hH', NULL, NULL, '2026-07-30 15:57:56.340', '2026-07-30 15:57:59.261', '2026-07-31', NULL, 'DELIVERY'),
('b344d4e1-7a76-4c59-a95c-abda5b00e7df', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2465.00, 'PENDING', 'order_TJmF1kIP03O0BD', NULL, NULL, '2026-07-30 16:17:42.975', '2026-07-30 16:17:42.975', '2026-07-31', NULL, 'DELIVERY'),
('b4417c75-7db4-4c7b-a131-875e281a811f', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 774.00, 'CANCELLED', 'order_TIdVkC3mJOBb2n', NULL, NULL, '2026-07-27 19:06:17.873', '2026-07-27 19:06:20.788', '2026-07-28', NULL, 'DELIVERY'),
('b565456e-ab2d-4970-a020-f8f4ed64eaeb', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 6215.00, 'CANCELLED', 'order_TIdVteWsjyt0vF', NULL, NULL, '2026-07-27 19:06:26.521', '2026-07-27 19:06:29.651', '2026-07-28', NULL, 'DELIVERY'),
('b64453f0-d710-47e6-b8d4-e7774a92a244', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 1086.00, 'CANCELLED', 'order_TIe3yTrLDcKzp0', NULL, NULL, '2026-07-27 19:38:42.155', '2026-07-27 19:39:07.702', '2026-07-28', NULL, 'DELIVERY'),
('b7cbb110-90c6-40eb-94b8-2e6bbb2a304f', '16c1589e-c59d-4faa-ac3a-140e08751aa9', 789.00, 'FAILED', 'order_TGg26FthTzsYPj', NULL, NULL, '2026-07-22 20:16:18.700', '2026-07-22 20:27:50.657', '2026-07-23', NULL, 'DELIVERY'),
('b96f4111-51e1-4340-92b7-b00554b05f82', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIZcsbZy52iMCQ', NULL, NULL, '2026-07-27 15:18:16.703', '2026-07-27 15:18:16.703', '2026-07-28', 'BIRTHDAY CAKE', 'DELIVERY'),
('b975f8f5-8455-42a3-ab4f-0649fab503f4', 'fbf8f6d4-85f5-4a68-ace5-6094c1c21c1d', 750.00, 'CANCELLED', 'order_TKGYKTMhLJ04ga', NULL, NULL, '2026-07-31 21:56:47.772', '2026-07-31 21:56:57.197', '2026-08-02', NULL, 'DELIVERY'),
('ba02dac3-d435-47ca-bcb8-d271e69082dd', '16c1589e-c59d-4faa-ac3a-140e08751aa9', 665.00, 'PENDING', 'order_TJNVPaVCjRchzo', NULL, NULL, '2026-07-29 16:05:53.270', '2026-07-29 16:05:53.270', '2026-07-30', NULL, 'DELIVERY'),
('bc44645f-6b71-44ba-b8f6-adac96df0957', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 2.00, 'PENDING', 'order_TFiBt6VmjXgPfl', NULL, NULL, '2026-07-20 09:43:57.771', '2026-07-20 09:43:57.771', '2026-07-21', NULL, 'DELIVERY'),
('bd5c6a26-51b7-4c36-b3bd-fabfd97f15a9', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 914.00, 'CANCELLED', 'order_TOvseZGbvupHOd', NULL, NULL, '2026-08-12 16:58:28.828', '2026-08-12 16:58:33.173', '2026-08-13', NULL, 'DELIVERY'),
('be15f71d-686f-4e53-bfd4-c034873985b1', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 166.02, 'PENDING', 'order_TFP2BmgMmYpRqx', NULL, NULL, '2026-07-19 14:59:44.410', '2026-07-19 14:59:44.410', '2026-07-19', NULL, 'DELIVERY'),
('be838915-4f94-434a-a946-8115abcd61ad', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1072.00, 'PENDING', 'order_TIbd77CTirzdrl', NULL, NULL, '2026-07-27 17:15:53.234', '2026-07-27 17:15:53.234', '2026-07-28', NULL, 'DELIVERY'),
('bed79d5f-40c4-4ef9-b0a0-9c9368b98259', '324d2df4-2ff4-4ffd-a6f6-f739812804aa', 912.00, 'PAID', 'order_TXSpm90y7q4OYn', 'pay_TXSpwsGxFX3aas', NULL, '2026-09-03 06:24:39.481', '2026-09-03 06:24:59.156', '2026-09-03', NULL, 'DELIVERY'),
('bf217ec9-5a55-41a5-ad72-539010413580', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2465.00, 'CANCELLED', 'order_TJm9qERvI9d63W', NULL, NULL, '2026-07-30 16:12:48.429', '2026-07-30 16:12:51.267', '2026-07-31', NULL, 'DELIVERY'),
('bf35fc1f-7512-487a-8d8a-58cfd826117c', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1.20, 'PAID', 'order_TKGruBvXZBPpzy', 'pay_TKGs8Ta9Rh91Wz', '365d481b622c4878c0f6ac28b5389dfada409f90634db6eeb88ec0f3a9096f2a', '2026-07-31 22:15:19.696', '2026-07-31 22:15:51.381', '2026-08-03', NULL, 'DELIVERY'),
('c267db55-f795-4314-8cd0-1fbc59389138', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2465.00, 'CANCELLED', 'order_TJmBXxO2GIo7gU', NULL, NULL, '2026-07-30 16:14:25.286', '2026-07-30 16:14:27.798', '2026-07-31', NULL, 'DELIVERY'),
('c2b5ce0c-13b1-4c07-be7d-de7ac27ba51a', '71b12a41-66d2-41ea-ac79-cf8bdbb2d169', 507.00, 'PENDING', 'order_TGwCUvCyBJfM3W', NULL, NULL, '2026-07-23 12:05:15.153', '2026-07-23 12:05:15.153', '2026-07-24', NULL, 'DELIVERY'),
('c2f67e72-0a98-4195-99b8-6a65dce17f25', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1480.00, 'PENDING', 'order_TGrgrgSWg45QIT', NULL, NULL, '2026-07-23 07:40:31.924', '2026-07-23 07:40:31.924', '2026-07-24', NULL, 'DELIVERY'),
('c39e5af9-cf76-43fd-b880-514c5ded50f7', '31b722d1-9f78-4de5-8341-4c415d4a52c4', 34814.00, 'CANCELLED', 'order_TIvrLtHjfj7PCP', NULL, NULL, '2026-07-28 13:03:14.267', '2026-07-28 13:03:31.241', '2026-07-29', NULL, 'DELIVERY'),
('c3af5036-9690-48fc-86dd-ce83df868bd4', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 1.00, 'CANCELLED', 'order_TKGl0fxmRGpLIT', NULL, NULL, '2026-07-31 22:08:48.033', '2026-07-31 22:08:53.675', '2026-08-03', NULL, 'DELIVERY'),
('c420a554-e5ce-4c3f-8c24-deb595147d08', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1235.00, 'PENDING', 'order_TF3ecJ5VU2qQMb', NULL, NULL, '2026-07-18 18:04:43.395', '2026-07-18 18:04:43.395', NULL, NULL, 'DELIVERY'),
('c6960881-2802-4221-a72c-f0b523f530c3', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 3216.00, 'FAILED', 'order_TGsZRUdMOCy49y', NULL, NULL, '2026-07-23 08:32:11.931', '2026-07-23 08:32:30.551', '2026-07-24', 'add happy birthday maaz on it', 'DELIVERY'),
('c75a7d42-2441-4eac-846a-31898e6369dd', '5a287fa7-4c50-4cce-b431-8bb96499623e', 844.00, 'CANCELLED', 'order_TYqHdtGMH9Dcnw', NULL, NULL, '2026-09-06 17:59:59.556', '2026-09-06 18:00:04.462', '2026-09-07', 'iuy', 'DELIVERY'),
('cd473906-e798-44de-9120-a2c802857573', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 9018.00, 'PENDING', 'order_TGfyzNKAtF80O2', NULL, NULL, '2026-07-22 20:13:21.995', '2026-07-22 20:13:21.995', '2026-07-23', NULL, 'DELIVERY'),
('cd4f376a-769b-4f60-9667-7d53bc02d886', '76dd07aa-5f94-4c1f-874d-1ce0342df8d8', 553.00, 'CANCELLED', 'order_TIqasJG5aLHnPa', NULL, NULL, '2026-07-28 07:54:10.307', '2026-07-28 07:54:16.012', '2026-07-29', NULL, 'DELIVERY'),
('cdee8c17-59f6-4a08-9e94-b9afd892d5c2', '638bbd07-adb2-41b2-9eff-545f34d12cc8', 2350.00, 'PAID', 'order_TGlEYfnDqx2qdk', NULL, NULL, '2026-07-23 01:21:34.407', '2026-07-23 01:22:17.306', '2026-07-25', NULL, 'DELIVERY'),
('ce18a752-a3e2-47d2-9baa-2138010bce21', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TIaGH39vTu98Ex', NULL, NULL, '2026-07-27 15:55:34.307', '2026-07-27 15:55:34.307', '2026-07-28', 'fd', 'DELIVERY'),
('cf95f662-7bd9-4a71-9c70-7d16a6d2d8ca', '5a287fa7-4c50-4cce-b431-8bb96499623e', 832.00, 'CANCELLED', 'order_TKvO4iKKfl7ApQ', NULL, NULL, '2026-08-02 13:53:31.549', '2026-08-02 13:53:53.371', '2026-08-03', 'gfd', 'DELIVERY'),
('d08f631f-792a-410b-82d0-61614ea77fc9', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1823.00, 'PENDING', 'order_TGefQAbIRgD72D', NULL, NULL, '2026-07-22 18:56:08.915', '2026-07-22 18:56:08.915', '2026-07-23', NULL, 'DELIVERY'),
('d1097b1d-b3c9-4480-8892-9c1571c45d10', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 53.00, 'PAID', 'order_TGFDZQJE6xjjrG', NULL, NULL, '2026-07-21 18:02:26.625', '2026-07-21 18:02:50.220', '2026-07-22', NULL, 'DELIVERY'),
('d19eb252-dd5a-4268-8927-848cc3bc526d', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 217.00, 'CANCELLED', 'order_TFirAdqpRJmi01', NULL, NULL, '2026-07-20 10:23:02.663', '2026-07-20 10:23:07.556', '2026-07-21', NULL, 'DELIVERY'),
('d1a16b84-9b2d-42be-b0be-4702b11fa103', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 1000.00, 'PENDING', 'order_TIcjmwm8q9RlTr', NULL, NULL, '2026-07-27 18:20:53.977', '2026-07-27 18:20:53.977', '2026-07-28', NULL, 'DELIVERY'),
('d1a80b42-1f2f-417d-b183-7442352f309d', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 850.00, 'CANCELLED', 'order_TKu27h2iJ3KIPN', NULL, NULL, '2026-08-02 12:34:03.040', '2026-08-02 12:44:50.595', '2026-08-04', NULL, 'DELIVERY'),
('d210938b-6a4b-470e-99a4-9dc2ce3845e9', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 5100.00, 'CANCELLED', 'order_TQ6wXh5vluf7T8', NULL, NULL, '2026-08-15 16:26:47.581', '2026-08-15 16:26:54.844', '2026-08-19', NULL, 'PICKUP'),
('d252412d-e4a1-4bc9-9ed7-49488adaebeb', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 539.00, 'PENDING', 'order_TYVyOs7ARPUtY4', NULL, NULL, '2026-09-05 22:07:54.305', '2026-09-05 22:07:54.305', '2026-09-06', NULL, 'DELIVERY'),
('d748509d-419d-4c66-910c-ebf49d21bd63', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIaH17nV6IXQ0p', NULL, NULL, '2026-07-27 15:56:16.522', '2026-07-27 15:56:16.522', '2026-07-28', 'gsdhsh', 'DELIVERY'),
('d776f4f6-1d82-42b6-877c-526c033ac726', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 6100.00, 'PENDING', 'order_TIdTJ5cu6Zr5DV', NULL, NULL, '2026-07-27 19:03:59.425', '2026-07-27 19:03:59.425', '2026-07-28', NULL, 'DELIVERY'),
('d876be34-0e9c-4710-ae29-bc14a8e61e99', 'af90a053-8692-4f22-9ae1-42e1101b4589', 1406.00, 'PAID', 'order_THcyv7mAk9ak9N', NULL, NULL, '2026-07-25 05:56:13.354', '2026-07-25 05:56:43.112', '2026-07-26', NULL, 'DELIVERY'),
('da3adff5-8382-49ae-b1fa-15b377058cb1', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TKFY75CLrCDIsU', NULL, NULL, '2026-07-31 20:57:53.888', '2026-07-31 20:57:53.888', '2026-08-01', NULL, 'DELIVERY'),
('da644e6b-792c-48f1-96da-20872361cd1f', '68d68b34-c98c-4f57-8f9d-7b190716baa5', 608.00, 'PENDING', 'order_TIe13ex7eUXBrp', NULL, NULL, '2026-07-27 19:35:56.495', '2026-07-27 19:35:56.495', '2026-07-28', 'Ta', 'DELIVERY'),
('db589cbb-322f-4a72-ad16-869fba292171', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 965.00, 'CANCELLED', 'order_TQ1rgfB4VZ8q5a', NULL, NULL, '2026-08-15 11:28:43.741', '2026-08-15 11:28:49.145', '2026-08-19', NULL, 'DELIVERY'),
('dcdaa49a-02d3-46b7-b5cb-093c21e51091', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 1.00, 'PAID', 'order_TKGlCw2t1EpFoP', 'pay_TKGlxImf07GmPf', '90a219973ddfd37d6360c9dc9f3e1d04aeefa1a6341a3e6653564f08c66ccc7e', '2026-07-31 22:08:59.265', '2026-07-31 22:09:57.428', '2026-08-03', NULL, 'DELIVERY'),
('dd1108ab-be2d-468f-a004-46aeacdd1a36', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 1086.00, 'PENDING', 'order_TIcgZ5Tt33Nc8f', NULL, NULL, '2026-07-27 18:17:50.879', '2026-07-27 18:17:50.879', '2026-07-28', 'test', 'DELIVERY'),
('decfe035-ff4d-455c-b61b-567ce9f39b5e', 'ff7591d5-f14f-4b4c-a8b7-70f218ece33e', 740.00, 'PENDING', 'order_TGeP4Ajlvx3MIn', NULL, NULL, '2026-07-22 18:40:39.966', '2026-07-22 18:40:39.966', '2026-07-23', NULL, 'DELIVERY'),
('e0219ae2-094a-4cc5-a2cb-a729da473b47', '3e5c4366-396c-4224-b521-47382107f5ba', 1.90, 'PENDING', 'order_TF5YxypxC0cLNQ', NULL, NULL, '2026-07-18 19:56:45.691', '2026-07-18 19:56:45.691', NULL, NULL, 'DELIVERY'),
('e27e29a3-2c92-483d-9bce-d8fed0b10444', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 6516.00, 'PENDING', 'order_TGeHAfebnv2rQN', NULL, NULL, '2026-07-22 18:33:11.509', '2026-07-22 18:33:11.509', '2026-07-23', '123123', 'DELIVERY'),
('e3cd58e8-d7a8-4a39-9384-ef5bf138c5e3', '65169bef-2351-41af-b097-f0d3940e9615', 1247.00, 'PENDING', 'order_TGWFyJu3WIUkSw', NULL, NULL, '2026-07-22 10:42:30.486', '2026-07-22 10:42:30.486', '2026-07-23', 'So happy to see your page Asha !! Can\'t wait to taste the cheesecake & Tiramisu', 'DELIVERY'),
('e4ce2c9b-9193-448e-a4c6-32e67ba2be4a', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'CANCELLED', 'order_TKG5kKYujWYjLK', NULL, NULL, '2026-07-31 21:29:44.256', '2026-07-31 21:29:52.554', '2026-08-01', 'fvb', 'DELIVERY'),
('e507ba5a-7c32-4e56-9159-bbd5b7681468', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TKFeihvOV0bw0E', NULL, NULL, '2026-07-31 21:04:09.164', '2026-07-31 21:04:09.164', '2026-08-01', 'f', 'DELIVERY'),
('e5f6ba5d-db25-4876-8838-2a942d8da40e', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 1823.00, 'CANCELLED', 'order_TIeK7DkrcsEz6t', NULL, NULL, '2026-07-27 19:53:58.973', '2026-07-27 19:54:02.472', '2026-07-28', NULL, 'DELIVERY'),
('e7001346-a2c1-4c66-9b57-f98285979c98', '47a93573-02ee-409d-91d1-243d462b23f7', 1670.00, 'PAID', 'order_TNBtDIq86PGgek', 'pay_TNBtKXQFHvS5R8', NULL, '2026-08-08 07:20:06.291', '2026-08-08 07:20:28.803', '2026-08-09', NULL, 'DELIVERY'),
('e73064b0-de9c-4b4b-acca-fc5c739bb2e5', '64b7933f-dc60-4527-832b-7d8abbfc3fa2', 490.00, 'PAID', 'order_TL95d8JSDSioup', 'pay_TL95mr6y1Rxp5I', NULL, '2026-08-03 03:17:46.490', '2026-08-03 03:18:10.324', '2026-08-03', 'Please deliver the order after 4 PM today so that somebody can be present to collect the delivery', 'DELIVERY'),
('e87592f2-6cd1-43ce-9380-bd79185b2414', 'c54c6d9d-aad9-4b72-8948-85387b46674b', 794.00, 'PAID', 'order_TdmAQgrcPvmmel', 'pay_TdmAXSX3H5Z9vu', NULL, '2026-09-19 05:13:23.936', '2026-09-19 05:13:42.831', '2026-09-19', NULL, 'DELIVERY'),
('e99eabfc-8016-4977-b3e2-83a93bf9c970', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 222.00, 'PENDING', 'order_TG9K3K38JK9lru', NULL, NULL, '2026-07-21 12:16:25.180', '2026-07-21 12:16:25.180', '2026-07-22', NULL, 'DELIVERY'),
('e9acd003-9369-4d59-b418-e98c1bbc0d86', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1.01, 'PAID', 'order_TFHMKWCT4t4iCo', 'pay_TFHMiuLfsE0SZx', '2d1b7f08e37301d4a694c2cf5ef1ac28f33c42769eae26f8523eeb532660f150', '2026-07-19 07:29:07.302', '2026-07-19 07:29:45.238', '2026-07-19', 'ge', 'DELIVERY'),
('ec327056-9ff2-43f2-921f-738404d9d386', '5a287fa7-4c50-4cce-b431-8bb96499623e', 319.00, 'PENDING', 'order_TFr9cg86Ha75v4', NULL, NULL, '2026-07-20 18:30:03.674', '2026-07-20 18:30:03.674', '2026-07-21', 'fr', 'DELIVERY'),
('ec37e27c-e8df-4766-8609-d4dc1ef088a6', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TKFfTHfghdn2zH', NULL, NULL, '2026-07-31 21:04:51.859', '2026-07-31 21:04:51.859', '2026-08-01', 'f', 'DELIVERY'),
('ed63452b-fbea-4699-8c70-caaa2c8d3dc5', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1066.00, 'PENDING', 'order_TIZuCkC7Sb33jr', NULL, NULL, '2026-07-27 15:34:40.757', '2026-07-27 15:34:40.757', '2026-07-28', 'dg', 'DELIVERY'),
('ed65c8cf-f1af-430c-9677-b0d41a585eb0', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 7115.00, 'PENDING', 'order_TIdF7Pdat9Jl42', NULL, NULL, '2026-07-27 18:50:33.528', '2026-07-27 18:50:33.528', '2026-07-28', NULL, 'DELIVERY'),
('ee475940-d572-4f67-92e5-e228fbab6d8c', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 845.00, 'CANCELLED', 'order_TTanDcYFAfSSFX', NULL, NULL, '2026-08-24 11:35:46.749', '2026-08-24 11:35:55.970', '2026-08-25', NULL, 'DELIVERY'),
('ee521991-3303-4b75-a040-fec120cf8101', '151447cf-f65e-472d-b483-6f7c7d3dc6a4', 1304.00, 'FAILED', 'order_TGqMOuVo2Q2sw5', NULL, NULL, '2026-07-23 06:22:27.960', '2026-07-23 06:24:05.816', '2026-07-24', NULL, 'DELIVERY'),
('ef7383c9-6775-4274-bea7-f7f29a24a6f8', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 53.00, 'PENDING', 'order_TGEzKOlda3wUBY', NULL, NULL, '2026-07-21 17:48:57.667', '2026-07-21 17:48:57.667', '2026-07-22', NULL, 'DELIVERY'),
('f054c458-62bf-4100-b4dd-4e5861174ab7', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 106.98, 'CANCELLED', 'order_TFRxPknHDEUOAu', NULL, NULL, '2026-07-19 17:51:09.845', '2026-07-19 17:58:36.508', '2026-07-19', NULL, 'DELIVERY'),
('f0d559e7-82f0-43ec-8ab8-4bb425f1ac0a', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 2100.00, 'CANCELLED', 'order_TPMvB1wPmHVTUe', NULL, NULL, '2026-08-13 19:25:35.747', '2026-08-13 19:25:38.623', '2026-08-14', NULL, 'PICKUP'),
('f0e489cc-c0c5-4bbc-872b-ee7dfe233a6c', 'e8a36223-f134-4588-b219-03d575bd1d09', 681.00, 'CANCELLED', 'order_TNBDTIR11BqSOD', NULL, NULL, '2026-08-08 06:40:35.326', '2026-08-08 06:41:02.574', '2026-08-09', NULL, 'DELIVERY'),
('f19e98d0-8603-468e-80b8-5c7d23bb0c02', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 57.00, 'PAID', 'order_TFktZogE9GUzTY', NULL, NULL, '2026-07-20 12:22:42.541', '2026-07-20 12:23:28.240', '2026-07-21', NULL, 'DELIVERY'),
('f8af7a09-abd1-439f-83d2-ce5188446257', '1a5837eb-8f51-4140-a238-cacc04b2cb97', 774.00, 'PENDING', 'order_THi1wijLyy1imt', NULL, NULL, '2026-07-25 10:52:33.306', '2026-07-25 10:52:33.306', '2026-07-30', NULL, 'DELIVERY'),
('f995b4eb-9ed3-4157-a1f4-901a24bc1756', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 666.00, 'PENDING', 'order_TIZc2lohxqpFAm', NULL, NULL, '2026-07-27 15:17:29.218', '2026-07-27 15:17:29.218', '2026-07-28', NULL, 'DELIVERY'),
('fa72295c-df3d-4a9a-b76d-bea6d65c3d30', '5a287fa7-4c50-4cce-b431-8bb96499623e', 1154.00, 'CANCELLED', 'order_TQ6jn1M5Hxt6Dl', NULL, NULL, '2026-08-15 16:14:43.220', '2026-08-15 16:14:49.563', '2026-08-19', 'ghjk', 'DELIVERY'),
('fb6785a7-7fd0-4d21-be75-81ee66fc7951', '75853ee3-b8a9-4a74-812f-668e7e40f8aa', 789.00, 'CANCELLED', 'order_TKw7Od8n9boVN9', NULL, NULL, '2026-08-02 14:36:25.791', '2026-08-02 14:36:28.997', '2026-08-03', NULL, 'DELIVERY'),
('fb91eb80-682c-4461-9310-3c4803f59764', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 800.00, 'CANCELLED', 'order_TInWtchBelJkkG', NULL, NULL, '2026-07-28 04:54:19.450', '2026-07-28 04:54:50.443', '2026-07-29', NULL, 'DELIVERY'),
('fbbc22d1-8387-4395-87c1-7ff4684c1923', '71b12a41-66d2-41ea-ac79-cf8bdbb2d169', 60.00, 'PAID', 'order_TFkiFef7NinHU3', NULL, NULL, '2026-07-20 12:11:59.263', '2026-07-20 12:12:23.312', '2026-07-21', NULL, 'DELIVERY'),
('fc0b2a6d-4a0a-4657-bc3a-8faf3282ac27', 'e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 839.00, 'PENDING', 'order_TYVRBd9QAhXPrg', NULL, NULL, '2026-09-05 21:36:27.770', '2026-09-05 21:36:27.770', '2026-09-06', NULL, 'DELIVERY'),
('fd7b30a5-81cf-4a3e-9753-19f02225b6a8', '47a93573-02ee-409d-91d1-243d462b23f7', 1109.00, 'PAID', 'order_TOMP7rNScLmB8Q', 'pay_TOMPHDzh5RUIvy', NULL, '2026-08-11 06:16:15.179', '2026-08-11 06:16:46.495', '2026-08-11', NULL, 'DELIVERY');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` varchar(191) NOT NULL,
  `order_id` varchar(191) NOT NULL,
  `product_id` varchar(191) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `size` varchar(100) DEFAULT NULL,
  `addons` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `size`, `addons`) VALUES
('0112e51b-bdc2-4b34-bc4f-fc719d276f38', '31af772a-47bb-49bd-bd93-5e2dbb15ccd8', NULL, 5, 700.00, NULL, NULL),
('011d4359-5e82-4fe0-ba51-b7a53dbd1aca', 'a203d875-55d2-436f-aee9-ef26c0726142', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Eggless'),
('01c34e8c-6b53-4f1a-b470-3383f79c8203', '1ee8939e-3680-4ced-b676-b046799f4f31', NULL, 2, 450.00, NULL, NULL),
('01fe2405-1f4e-4591-b019-17c42a3a948e', '4873d229-c462-4337-bcba-c9ca073844f9', NULL, 1, 750.00, NULL, NULL),
('0221f620-6787-4a33-8ba4-9e644d08e68e', '724b0987-9fe2-4640-a849-d9b5b5e739c5', NULL, 5, 0.20, NULL, 'Egg'),
('022767f9-2f19-4e05-9bf2-e2fc47f1cc8a', '8852275b-e38e-4c60-921c-aeef8e8fcc4b', NULL, 2, 2.00, 'medium', NULL),
('02ec716e-9eac-4236-8149-a9844813ff23', '8c9382d5-40d9-48e2-80a4-dba6707cc423', NULL, 6, 0.20, NULL, NULL),
('02f1497f-3322-480c-a645-611a6f3fd5b1', '60451250-906d-472c-b2c9-69adcc502835', NULL, 1, 2.00, 'medium', NULL),
('0324add8-e57f-4bc5-adbe-47638736f239', '3703ef57-bc39-4d57-a091-e4d078e33ad6', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 5, 750.00, NULL, NULL),
('03dedcd3-1195-47a4-a5fe-8d1ea17a9047', '82eab8c4-3abb-4d31-913a-da8009eca7a4', NULL, 1, 750.00, NULL, NULL),
('03f942ae-e032-4cbd-93b6-ffb2c89054a7', '6e02937a-8483-418b-a95b-1d5c3b0c2075', NULL, 1, 750.00, NULL, NULL),
('04336225-c0e0-428b-b6eb-d78254471db8', '778c444c-ce40-43d6-8a0c-ec0cf7c38fb8', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, 'Egg'),
('04517b7c-5848-4054-b242-5f93998ba307', 'd876be34-0e9c-4710-ae29-bc14a8e61e99', '1dae4603-9f2d-440e-a8eb-a520a295bb5c', 1, 450.00, NULL, NULL),
('05356243-b258-4bff-bcca-9d663df68bc8', 'ec327056-9ff2-43f2-921f-738404d9d386', NULL, 1, 3.00, 'medium', 'toppings'),
('06d6478c-3284-4bd6-a62b-88bf347a0ba0', '497a2f73-e695-4d03-918a-9a9a3b95b803', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 1270.00, 'Serves 4-5', 'Make it Boozy'),
('094ec60b-27f7-479f-b600-fca9eb1f14d3', '88f87778-e5b7-46d4-b4c2-2d0333403e5b', NULL, 2, 450.00, NULL, NULL),
('0994ff4f-8dab-46f3-82ec-186d8a144903', 'ed65c8cf-f1af-430c-9677-b0d41a585eb0', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 6, 750.00, NULL, NULL),
('0a10fede-508b-4b58-a7ff-03c6a2eba118', '6759faf1-5072-4bb2-8a9b-3ac1df2c67c9', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 2, 450.00, NULL, 'Eggless'),
('0a6ad1b1-1fe8-41e3-99cd-f08484a3fc4a', 'f19e98d0-8603-468e-80b8-5c7d23bb0c02', NULL, 1, 2.00, 'medium', NULL),
('0ade430e-921e-4429-975c-5bc11be81522', '0adbef6c-21f8-462a-8a9b-db0966b76907', NULL, 1, 122.98, NULL, NULL),
('0ba4a093-5fe8-433d-96e2-6e0245856a21', '8ae1194b-d99a-4435-a5b9-51a82a3796c0', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('0c77dad9-3eb0-43bf-927f-e48c31d042b7', 'd19eb252-dd5a-4268-8927-848cc3bc526d', NULL, 1, 1.00, NULL, NULL),
('0ccd0474-aa40-4a86-a92e-6336d6a9efa6', 'c39e5af9-cf76-43fd-b880-514c5ded50f7', NULL, 1, 2370.00, '1 Kg', 'Anniversary Topper, Birthday Topper, Congratulations Topper, Twisted Candles'),
('0da9355d-3970-4e1e-9479-3c1d92c3b415', 'd876be34-0e9c-4710-ae29-bc14a8e61e99', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, NULL),
('0dda3152-1eca-4a41-8b51-089e79e4f237', 'd1a80b42-1f2f-417d-b183-7442352f309d', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Eggless'),
('0df24a4d-7227-4846-98eb-32d7846bdf35', '6094208f-9bd9-48a9-ae85-16098445ebb1', NULL, 1, 450.00, NULL, NULL),
('0e14793a-4847-4914-ac6f-3ef5615e790e', '2816d65a-3dec-4635-b126-f2f72d9251c1', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('0fa5984e-1697-4bcf-b738-3a4ced64adda', '0cb90876-ef94-427a-8138-aac658449434', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 450.00, 'Serves 1-2', 'Make it Boozy'),
('0faea196-5526-4711-9da7-0cfc60328787', 'e27e29a3-2c92-483d-9bce-d8fed0b10444', NULL, 4, 450.00, NULL, NULL),
('100b358f-d0c7-4291-946a-13870b15ff40', '7d873be9-b1f9-4426-b83e-da86b86a2d99', NULL, 1, 750.00, NULL, NULL),
('10807887-f83f-4199-84b7-a0622207039d', 'fc0b2a6d-4a0a-4657-bc3a-8faf3282ac27', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('113c4d28-c9fa-490e-a076-e680059e2d79', 'e3cd58e8-d7a8-4a39-9384-ef5bf138c5e3', '1dae4603-9f2d-440e-a8eb-a520a295bb5c', 1, 450.00, NULL, NULL),
('121b09f3-9d0b-4c72-8b5b-d9a8ad812cd5', 'd08f631f-792a-410b-82d0-61614ea77fc9', NULL, 1, 750.00, NULL, NULL),
('1233d2dd-5518-4628-92d1-cc7a3af5810b', '6c6aa033-355a-487d-80b5-d29e7b0ae1d8', NULL, 5, 750.00, NULL, NULL),
('14367fb1-af07-49a6-9b0f-09b96be7c147', '64f6d6a3-52c6-41ab-9597-45d36d1dcf8e', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 2, 450.00, NULL, NULL),
('149be7c0-cdec-4aa4-ab77-e8d13df8701b', '99bc4acd-48eb-4fde-b7f1-b51336e51826', NULL, 2, 750.00, NULL, NULL),
('14fe4a89-64ec-475b-b9db-09f0b696a812', 'b565456e-ab2d-4970-a020-f8f4ed64eaeb', NULL, 1, 750.00, NULL, NULL),
('151e427b-5997-4c9b-99a3-5a67454c130e', 'f054c458-62bf-4100-b4dd-4e5861174ab7', NULL, 1, 10.98, 'Large', NULL),
('161930d7-ced3-4660-8b44-f6deeb6795a0', '2a60333b-d861-496c-a40d-612aeada07d3', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, 'Eggless'),
('17548e8a-bdfb-45f0-a6aa-7e94c136dacb', 'b7cbb110-90c6-40eb-94b8-2e6bbb2a304f', 'c5b7604e-39e1-4c40-a604-c3a40698faa6', 1, 450.00, NULL, NULL),
('1773d2b4-6b67-4ff3-8cc3-047145c724da', '017248f5-ca11-463e-99df-bdbc1930ccbe', NULL, 1, 750.00, NULL, NULL),
('17eb92e3-3195-4c79-b6b7-144b7bcb3737', '9941891a-eca5-4e3b-a965-7bf983482d41', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 2, 750.00, NULL, NULL),
('1a74ff39-f3de-4f5d-9b37-b0ae80f4e797', '44178518-77dc-45c0-946e-7414dc931180', 'af944681-190e-4154-969d-1ad8fd4acb7d', 1, 750.00, NULL, NULL),
('1abe42e9-0cec-4abf-a5b5-4352ba75682a', 'e5f6ba5d-db25-4876-8838-2a942d8da40e', NULL, 1, 750.00, NULL, NULL),
('1b60dd08-efb7-4a32-b87e-6006fa9dd730', '3db29713-0310-4a27-a3b1-cf71c540d186', NULL, 1, 450.00, NULL, NULL),
('1b7a02c4-a6bd-4172-b1e5-03ec1689af6b', '2092602a-ade4-40da-a805-e9d29b555b52', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 3, 750.00, NULL, NULL),
('1bb4fecc-b599-406f-ab09-936d92c46026', '78e6bbbd-f8e2-4afb-9459-f7ffebb4ed08', NULL, 5, 0.20, NULL, 'Eggless'),
('1c06168d-2415-458c-b5c9-ab0d0f78970a', '41f0ddc2-077b-4707-8c0a-d31e8e9d101e', NULL, 1, 750.00, NULL, NULL),
('1c9755f1-2ffd-4da5-aa05-4ddd82568e6d', 'c75a7d42-2441-4eac-846a-31898e6369dd', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, 'Egg'),
('1cbe26df-15ab-4167-b1f6-76ba23af7934', '44178518-77dc-45c0-946e-7414dc931180', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 2, 750.00, NULL, NULL),
('1d708d2e-4947-4c6e-8a30-49d1e37a47c3', '84c2a65d-81a2-4566-a784-e48bf7c48c66', NULL, 3, 67.09, '56', NULL),
('1dcff940-a56d-4a43-bcae-71db0cbcc0be', 'd210938b-6a4b-470e-99a4-9dc2ce3845e9', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 1, 2100.00, '1 Kg', 'Eggless'),
('1ddc3330-e78a-4cf9-81cd-51003da6e298', 'c3af5036-9690-48fc-86dd-ce83df868bd4', NULL, 5, 0.20, NULL, 'Eggless'),
('1e6d704f-f31d-456d-bcde-52568112fc68', '6abf26af-5d95-45f8-9be8-7ddb43448f56', NULL, 3, 750.00, NULL, NULL),
('20008d15-93e3-4eae-97e5-69f8fea8fdee', '9579a6e7-e47f-429e-b598-0ab588fab3b7', NULL, 1, 2.00, NULL, NULL),
('20978e29-3e88-428f-8d65-b02b63decc7f', '64d7b8e2-9bcb-46a2-831e-db55d1b6b783', NULL, 1, 450.00, NULL, NULL),
('20b10161-b814-4452-a49a-dfa446b837a2', 'fd7b30a5-81cf-4a3e-9753-19f02225b6a8', 'c5b7604e-39e1-4c40-a604-c3a40698faa6', 1, 450.00, NULL, 'Eggless'),
('20b88700-1a53-41bf-94fa-c654a6826094', '32e4723e-9625-4031-acca-88eb7adcc8d9', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Eggless'),
('20e98710-5707-4d93-9253-854b3cd40799', 'a0a88798-6d06-4539-a6e4-d0741af68e51', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 5, 750.00, NULL, NULL),
('21491a32-c104-458d-8971-19a636a5ceb4', 'c39e5af9-cf76-43fd-b880-514c5ded50f7', NULL, 1, 2170.00, '1 Kg', 'Anniversary Topper'),
('21c5c8a3-58c4-4a15-a2c5-ddeeb5e603a1', '598c5089-44d5-4172-a5dd-119cbc1bfd68', NULL, 1, 0.02, 'medium', NULL),
('223426d7-9518-4e98-91e5-e99cc1dcd98c', '99bc4acd-48eb-4fde-b7f1-b51336e51826', 'af944681-190e-4154-969d-1ad8fd4acb7d', 1, 750.00, NULL, NULL),
('22729dbe-dc9b-486c-9262-ba4f7d974574', '734a942c-436d-4e92-8ad5-ec0aadfc3040', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 1, 2100.00, '1 Kg', 'Egg'),
('236a56d2-6f04-4c9d-b8f7-e29eb84784db', 'cd4f376a-769b-4f60-9667-7d53bc02d886', NULL, 1, 450.00, NULL, NULL),
('24b4ed14-bdcf-49b5-863c-eb375c9857cf', 'f8af7a09-abd1-439f-83d2-ce5188446257', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, NULL),
('2509f572-4089-4ccc-8177-f6d1e1bef4b1', 'a0a88798-6d06-4539-a6e4-d0741af68e51', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('25337539-2cb2-4476-a7dc-6bddd9b4fe01', 'dcdaa49a-02d3-46b7-b5cb-093c21e51091', NULL, 5, 0.20, NULL, 'Eggless'),
('25fb5bc7-c9e8-4823-b04e-24e9fa0e79c4', '13ae04c6-29d6-43fd-b411-2ba1dc52865e', NULL, 1, 750.00, NULL, NULL),
('269c8007-f655-4c10-b333-d82d889150e9', 'b2acfbd7-b89a-456d-8d34-576368718df0', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('26ef5998-775f-42a0-a043-1536a0ad8731', 'aa0ed1db-45ca-45d7-9ea5-73e9afb15bbf', NULL, 1, 0.21, 'xxxl', 'cheese'),
('274dc1ea-7477-43dc-8919-d54db09c6818', '285f235c-c1cc-4ed6-af90-5af33834d2e8', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('28806683-f780-43a2-866f-6309f07cf804', '7ebd043b-ec2a-4726-aa63-a4064aafa517', NULL, 1, 700.00, NULL, NULL),
('28dfdc1c-9321-4edd-aad3-9f17ab20d986', 'd1a16b84-9b2d-42be-b0be-4702b11fa103', NULL, 2, 450.00, NULL, NULL),
('2ab6dbe3-f435-4a03-abc4-8b7fa7c3b695', '442e01f0-c08c-4964-8a50-17ea8fe11aaa', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Egg'),
('2bddf977-314d-4a67-b5a9-f41fd7d24f12', 'e7001346-a2c1-4c66-9b57-f98285979c98', 'c5b7604e-39e1-4c40-a604-c3a40698faa6', 1, 450.00, NULL, 'Eggless'),
('2ce6e333-dd1e-48f3-9757-a25eb0d6c9cc', 'aec44448-0f7a-4ad9-a5f8-4d8d2251a057', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 5, 750.00, NULL, NULL),
('2cf52e2e-2eb3-4cf3-b9ac-561336b365bb', '2092602a-ade4-40da-a805-e9d29b555b52', NULL, 4, 750.00, NULL, NULL),
('2d758b4f-e679-4cbd-9ea7-7e3afec1c152', 'ac19a394-c4a3-448f-be65-511ef3fc171b', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('2d888239-59b4-40a1-b358-c3049fd09a8c', 'a4760d30-c777-4ef8-a177-352777d80ec1', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('2dd26bf7-4dda-4654-a43c-1df2137bd42e', '84886389-9895-48cf-840a-bec5347bca9e', NULL, 1, 750.00, NULL, NULL),
('2df41106-b00a-4656-ac42-c164bb6657b6', 'e7001346-a2c1-4c66-9b57-f98285979c98', '1dae4603-9f2d-440e-a8eb-a520a295bb5c', 1, 450.00, NULL, 'Eggless'),
('2e02b524-7e44-4d62-ae1d-8402beccfcf6', '91fe264b-e341-43dc-82e1-4d6142e3c34d', NULL, 5, 0.20, NULL, 'Eggless'),
('2e934dc3-b736-42fd-b103-ed864e1ed8ef', 'e7001346-a2c1-4c66-9b57-f98285979c98', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 380.00, 'Serves 1-2', 'Eggless'),
('2ebdb093-e50a-4b99-b874-5e635b4c38fc', '1cc33210-bc69-4a4d-ac34-7ff083a6d5d6', NULL, 1, 450.00, NULL, NULL),
('2f29f9e9-9d4e-4b62-b9c3-0de9c2279db7', '450be582-8c0d-4c9f-b4af-6d7d01fa5335', NULL, 1, 1.00, NULL, NULL),
('2f90c867-2240-4083-8a8a-d852cba4c95b', 'b3077438-f177-45c7-879e-666b64f208ca', 'e9ce3284-af07-4274-ab53-64538acf3455', 3, 450.00, NULL, 'Eggless'),
('3135b5f6-ffc3-447b-afc9-14748afe4e04', 'a0a88798-6d06-4539-a6e4-d0741af68e51', NULL, 5, 700.00, NULL, NULL),
('3254955e-af20-4584-b5be-b0b594e524f6', 'b344d4e1-7a76-4c59-a95c-abda5b00e7df', NULL, 3, 750.00, NULL, NULL),
('326500be-6863-4ecb-a8fb-7fcce81c9a79', 'ae2f1473-04ee-40f4-b28d-f0107660556f', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, 'Egg'),
('32d63e7e-01bb-4bfb-8952-d9efc151f256', '4b522bf4-dda9-4969-b362-1f0d646eee7c', NULL, 1, 1.00, NULL, NULL),
('3351c7ad-3560-44ab-ae22-622a24776edf', '71f4ffcf-2689-460e-8f98-e74f3cf236d7', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 5, 750.00, NULL, NULL),
('33b8cc9a-8b98-4dd9-8517-b6cacabce605', 'd08f631f-792a-410b-82d0-61614ea77fc9', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('343916b2-79b6-47c2-b8c7-5238e08f9a3c', 'ef7383c9-6775-4274-bea7-f7f29a24a6f8', NULL, 1, 1.00, NULL, NULL),
('373e6959-25b1-4073-950a-98249e510899', '44178518-77dc-45c0-946e-7414dc931180', NULL, 1, 700.00, NULL, NULL),
('3775d430-ef57-4d9d-b24a-a3be0186b6b1', '186e00c5-f9fd-4294-aedb-089aa4982e7f', NULL, 5, 700.00, NULL, NULL),
('384d183c-0e23-4586-b536-8456ad9b5bd5', '60451250-906d-472c-b2c9-69adcc502835', NULL, 2, 2.00, 'Large', NULL),
('38fad8fb-d7a1-495c-a196-a8ae49ae8886', 'cd473906-e798-44de-9120-a2c802857573', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 5, 750.00, NULL, NULL),
('396282e1-baa9-4890-88cd-fb816e752332', '285f235c-c1cc-4ed6-af90-5af33834d2e8', NULL, 1, 750.00, NULL, NULL),
('39bc0405-cf33-4cee-9c6f-8253ed30d11f', '60f4b59c-c40f-446f-9aa2-f02d70a8a444', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 3, 750.00, NULL, NULL),
('3a0e0891-4480-4977-8292-59ef000ea007', '524d53aa-0571-42f4-b464-884323678b58', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 1, 1220.00, '500 Grams', 'Birthday Topper'),
('3a4f3eea-6e02-4b6e-8461-e9432bf230c2', '24cd26b2-13bc-4894-9cd3-3f22d825a229', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('3b3b7394-87d8-4d52-bd05-5045a576cea3', '5b4fd883-d388-45ac-aa87-e7265c3d736b', NULL, 4, 750.00, NULL, NULL),
('3b79f8b2-279b-440d-8521-7862ba7b57c4', '7b906dc8-6896-44fd-b67c-6365ead27329', NULL, 49, 0.02, 'medium', NULL),
('3ba8b38f-179a-4014-87d1-3ea9eeb18091', '2de884e7-d89a-4bf9-a1ae-47a78c84c6f0', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('3be694cb-70db-486d-996b-d90ecc3e7aad', '317d980f-bf81-43e9-a064-b601c7fb3c5e', NULL, 1, 70.71, 'Large', NULL),
('3d375b26-7a1b-4ecb-b1e0-938ce03e62ec', 'bed79d5f-40c4-4ef9-b0a0-9c9368b98259', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 380.00, 'Serves 1-2', 'Eggless'),
('3d7ea80c-f066-4a48-95d1-3778e8c14f8d', 'da644e6b-792c-48f1-96da-20872361cd1f', NULL, 1, 450.00, NULL, NULL),
('3da43240-0822-4e8e-b957-0c10d53cc727', 'e73064b0-de9c-4b4b-acca-fc5c739bb2e5', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 380.00, 'Serves 1-2', 'Eggless'),
('3dcff736-31ec-415f-9e6a-043ec5790f57', '30a32aba-d9e5-4bb1-8778-af8f8d664d65', NULL, 1, 750.00, NULL, NULL),
('3e23c57c-894c-4dfb-91f4-99a0e2afc958', '2092602a-ade4-40da-a805-e9d29b555b52', NULL, 3, 700.00, NULL, NULL),
('3fab9d07-df9f-4e4f-b562-fea0f18b06e6', '44178518-77dc-45c0-946e-7414dc931180', NULL, 2, 750.00, NULL, NULL),
('3fae597f-86c2-40ac-aaab-ce89ed927786', '3703ef57-bc39-4d57-a091-e4d078e33ad6', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('4244bbc3-1917-4e94-a2cc-ffc64b54dc06', '99bc4acd-48eb-4fde-b7f1-b51336e51826', NULL, 1, 700.00, NULL, NULL),
('425262ec-9162-4ab8-9ad5-ca5f421383ed', '76a1b5f3-a024-41e7-8cd7-b0fcc4654a78', '734c2316-6504-420f-9c4b-1f3c14bc1977', 1, 280.00, NULL, 'Egg'),
('425f798c-b425-449b-a885-31c0059a6a5e', 'ed65c8cf-f1af-430c-9677-b0d41a585eb0', NULL, 2, 450.00, NULL, NULL),
('430704ac-5485-42ae-bcc5-ca1e5f00f533', 'cd473906-e798-44de-9120-a2c802857573', NULL, 5, 700.00, NULL, NULL),
('4345e610-12f0-4b7d-925d-cd2dc0c01522', '0bfa8883-89bc-41bb-a3eb-c9e2de12fc18', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('43972e0a-2819-438e-a8c8-3bf18bbfa45d', 'e4ce2c9b-9193-448e-a4c6-32e67ba2be4a', NULL, 1, 750.00, NULL, NULL),
('44ebe86a-9516-4590-99ae-331b3999fc04', '4873d229-c462-4337-bcba-c9ca073844f9', NULL, 1, 750.00, NULL, NULL),
('45132767-f626-4b16-af35-af1009461e4e', '5b4fd883-d388-45ac-aa87-e7265c3d736b', NULL, 3, 700.00, NULL, NULL),
('4564dc68-ae91-49e3-ab14-79f387348c3d', '82eab8c4-3abb-4d31-913a-da8009eca7a4', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('4596b096-6881-4715-ada5-2afc106ea62f', '2f807156-ed77-41a6-ba7a-68c6c20d3981', NULL, 6, 0.20, NULL, 'Eggless'),
('45c20519-b59e-45a5-a2ea-cbac9b7b280d', '28cffe4f-2792-4e53-9963-9f2c2e4c2f34', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, 'Egg'),
('461b5e5b-681b-4bd9-a363-3f8d6cc309ef', '07de1e94-d6a9-4069-a6e4-cb8887d7754f', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 3, 750.00, NULL, NULL),
('47424889-e74a-449f-b4b0-55f4db446295', 'b31f6b22-c724-40d1-b868-4a2ab66726f0', NULL, 3, 750.00, NULL, NULL),
('4810c750-a492-45f5-957b-8eafd15282f7', 'a5e71477-40d3-434b-a599-b4924e448cf9', NULL, 1, 750.00, NULL, NULL),
('485271ca-26e1-40e9-9706-48da30cb4992', '58c15566-0122-4069-a319-620cf80d8e2f', NULL, 1, 450.00, NULL, NULL),
('48f00a87-3dcf-41f3-8c94-e786fc568fdb', '186e00c5-f9fd-4294-aedb-089aa4982e7f', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('49b8160a-2d76-447a-b72b-d7a0ba685a95', '6b5d48bd-e72a-4aa2-9ecc-e79c8fbfe931', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('49fdbdcf-d3a6-44f6-94c7-627dcaa805a5', 'e3cd58e8-d7a8-4a39-9384-ef5bf138c5e3', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 450.00, NULL, NULL),
('4a2b6de8-b251-4eca-bd9a-1b171c800f4f', '524d53aa-0571-42f4-b464-884323678b58', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 21, 750.00, NULL, 'Egg'),
('4a93fa59-0d01-4794-b2ec-ca093a561528', '7642f1a4-2d5b-404b-b44a-ac40de5d08e5', NULL, 1, 0.21, 'xxxl', 'cheese'),
('4b790243-1bba-4e4f-a9b9-c8e0919efd3b', '7c12ebec-9a08-4b18-82df-57053eae946a', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 6, 750.00, NULL, NULL),
('4ba4b4a0-1439-4ad1-8e36-fa31e2fadaa4', '544f9b5e-3700-48ed-a3d4-c6e949ef858f', '734c2316-6504-420f-9c4b-1f3c14bc1977', 1, 280.00, NULL, NULL),
('4cf4be4e-10cc-4701-9551-83e356039325', '5aa9de5a-9981-49ee-89da-ffc82a4d44c2', NULL, 1, 750.00, NULL, NULL),
('4d2b9000-84c9-4c2e-868a-391438b8d82d', '71cb18b8-8690-42ec-97a5-a10f5ba0a978', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('4d3271dd-753a-47c7-85c2-7bb2e0a76d83', '1f9f0c2c-e0d6-4402-aa90-8f33d39af133', 'adbfe629-f624-4411-8d5e-0ca26d37a5a2', 1, 750.00, NULL, 'Eggless'),
('4f06c604-9f03-4210-b6ba-eaffa43a8daa', 'ed65c8cf-f1af-430c-9677-b0d41a585eb0', NULL, 1, 750.00, NULL, NULL),
('4fb3b937-c9c9-4480-b365-b5a39d03608d', '3e33391c-40df-4b90-8587-01fb3b18afd3', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('50b053b1-cb01-43f3-b1c4-740f17e74dd2', '186e00c5-f9fd-4294-aedb-089aa4982e7f', NULL, 1, 750.00, NULL, NULL),
('511e8b7a-a7ba-41d1-9ee5-7143d29a3571', '0ae5b932-5c35-49f7-ad92-03fd9dba97d6', NULL, 1, 450.00, NULL, NULL),
('529869f2-b9d2-4a27-8af3-dc0e9d05374e', '35ee6e1d-82da-43a2-bb3f-80797512d4a9', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Eggless'),
('52db23f0-e290-41b9-9a03-7e6145016e85', '6a5af8cc-15c0-4170-9d67-5f9303c9f58b', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, 'Eggless'),
('531bccfb-6af2-4816-9194-bab522866f08', '7d403d4a-cd60-4607-9443-994cf2f56db5', NULL, 1, 380.00, 'Serves 1-2', NULL),
('5375a1ef-5a55-4805-9966-68ff2ff6187c', '8e63fb94-3b51-478d-b952-da1545612910', NULL, 1, 2.00, NULL, NULL),
('545bc125-974a-4b6d-ac2f-f6008e66a2f5', '55f4dbd4-7f21-4e50-9d5f-67880a090177', NULL, 1, 0.21, 'xxxl', 'cheese'),
('54cfc740-fa50-4101-97cb-cc4141844e21', '65431398-bad5-4e81-8566-d914f3d16daa', 'c5b7604e-39e1-4c40-a604-c3a40698faa6', 1, 450.00, NULL, 'Egg'),
('55e85f62-6605-4b17-b1c6-7952bdb04122', '914dfa6f-9955-4b04-8144-8564f25254ee', NULL, 1, 750.00, NULL, NULL),
('55f97dd0-a11d-4fec-8d05-3d6e73827b77', 'cd473906-e798-44de-9120-a2c802857573', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('56345433-3475-457d-912b-c5009f6b2e5b', 'b2acfbd7-b89a-456d-8d34-576368718df0', NULL, 1, 750.00, NULL, NULL),
('565a9875-4484-4f57-8749-13ed76d599fd', 'f0d559e7-82f0-43ec-8ab8-4bb425f1ac0a', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 1, 2100.00, '1 Kg', 'Egg'),
('5735a41e-acdd-4482-90aa-ea09b22062d5', 'fb91eb80-682c-4461-9310-3c4803f59764', NULL, 1, 750.00, NULL, NULL),
('57cd5700-caa6-4a57-a9ee-eb4037e74291', '3ede6636-0490-4a55-b1ca-cd13c100e038', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 3, 750.00, NULL, NULL),
('58870a4d-b381-4815-a69c-d6414514389f', 'bed79d5f-40c4-4ef9-b0a0-9c9368b98259', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, 'Eggless'),
('58ab71b9-50d3-43cd-9fd9-b67133f872c1', '732f7125-0a47-4993-8286-49ac345b3acf', NULL, 1, 450.00, NULL, NULL),
('58f38895-1fd6-4b7a-828d-64cf73b291db', 'e87592f2-6cd1-43ce-9380-bd79185b2414', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 300.00, NULL, NULL),
('58fd9f19-74f6-4302-9f88-8487cdfae3f5', 'ee521991-3303-4b75-a040-fec120cf8101', NULL, 1, 1220.00, '500 Grams', 'Birthday Topper'),
('599d5e52-197f-4144-885d-46f7afdd965c', '6b5d48bd-e72a-4aa2-9ecc-e79c8fbfe931', NULL, 1, 750.00, NULL, NULL),
('5a663abb-d8f3-405f-a18e-a457ccb89778', '2cd61fdf-51fe-40c5-8ccb-4e2fd1fba977', '1dae4603-9f2d-440e-a8eb-a520a295bb5c', 1, 450.00, NULL, 'Eggless'),
('5aaa25c2-61d5-48f5-854e-cc4df8a5a909', 'a0a88798-6d06-4539-a6e4-d0741af68e51', NULL, 1, 750.00, NULL, NULL),
('5ab25fe6-2b78-4417-8f46-324b88f3a073', '4a2bb6da-7060-4d7b-bea1-dfa6da48c42d', NULL, 44, 0.02, 'medium', NULL),
('5b5573b7-0001-4387-90e3-f3b2d9230b0e', '1ee8939e-3680-4ced-b676-b046799f4f31', NULL, 1, 750.00, NULL, NULL),
('5ce2b3ca-fd85-4fed-b112-05207b469cc2', 'ed65c8cf-f1af-430c-9677-b0d41a585eb0', NULL, 1, 750.00, NULL, NULL),
('5cfd2e1f-ddff-4b7d-be8b-aaf4e4267ae8', '6a57dfb2-9d31-4da9-a796-50b4d87322f4', NULL, 1, 2.00, 'medium', NULL),
('5d8cb10a-b76d-4ad7-9d4b-1eeb2417dbd4', 'cf95f662-7bd9-4a71-9c70-7d16a6d2d8ca', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('5dd911ac-4d3f-4a0a-a077-9abab7056fe2', 'fd7b30a5-81cf-4a3e-9753-19f02225b6a8', '1dae4603-9f2d-440e-a8eb-a520a295bb5c', 1, 450.00, NULL, 'Eggless'),
('5e3cd24b-359b-4001-bc42-b4112b40eab5', '6b5d48bd-e72a-4aa2-9ecc-e79c8fbfe931', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 5, 750.00, NULL, NULL),
('5ea56a2f-495f-4918-8fbd-dedc43007e1a', '3703ef57-bc39-4d57-a091-e4d078e33ad6', NULL, 1, 750.00, NULL, NULL),
('5ec5d0fe-c6a0-48c9-a995-4ef6aa877d7a', 'c39e5af9-cf76-43fd-b880-514c5ded50f7', NULL, 9, 750.00, NULL, NULL),
('5fca8410-76fe-45c7-9acf-14ad9ce97fae', '71f4ffcf-2689-460e-8f98-e74f3cf236d7', NULL, 5, 700.00, NULL, NULL),
('5fcc5581-11bc-4dcf-8edf-9db2b0d0d4df', '31af772a-47bb-49bd-bd93-5e2dbb15ccd8', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 5, 750.00, NULL, NULL),
('60129a4d-2477-4940-9ae0-99de09679968', '1d4a58a6-d068-48e4-a681-b4166a62fae8', NULL, 1, 450.00, NULL, NULL),
('607f7812-db3d-4a2b-bbba-e1c904773741', 'db589cbb-322f-4a72-ad16-869fba292171', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('60a4de75-c7ca-4a5c-97ab-0d1b3c728f3e', '7642f1a4-2d5b-404b-b44a-ac40de5d08e5', NULL, 1, 0.30, 'thr', '2r'),
('6136aad8-a64e-4d33-8263-1a46c4f63e4c', 'fbbc22d1-8387-4395-87c1-7ff4684c1923', NULL, 1, 3.00, 'Large', 'ribbon'),
('618d5f40-f019-4cea-ac41-5689b02c692f', '9ccf39ae-0716-48fe-9b37-9cba314f0d37', NULL, 5, 0.20, NULL, 'Eggless'),
('619a2ec0-f4e1-4680-9caa-8d091d04b82f', 'd1097b1d-b3c9-4480-8892-9c1571c45d10', NULL, 1, 1.00, NULL, NULL),
('61efefdb-d9b6-4848-930c-212305c1ad0d', '71f4ffcf-2689-460e-8f98-e74f3cf236d7', NULL, 1, 750.00, NULL, NULL),
('63770c4e-dcbb-472e-a019-0086477c86eb', 'add856a5-79bb-4fac-9970-16233e76fc30', NULL, 1, 2.00, 'Large', NULL),
('63a54f73-5615-4b57-a26a-099c07c676cd', '4873d229-c462-4337-bcba-c9ca073844f9', NULL, 3, 750.00, NULL, NULL),
('66395eef-f856-42d3-b4ec-265e3d32153a', '65431398-bad5-4e81-8566-d914f3d16daa', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, 'Eggless'),
('670296a3-1a07-4fa3-a1dd-a742c94d8105', '54571634-8911-4489-93c7-495f622185f8', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('69055fad-a962-412d-98f5-6bd1260bc4a6', '7c38a4ed-0a3e-484a-a411-98b6204bdaf6', NULL, 1, 750.00, NULL, NULL),
('6923e309-0410-4dd0-ae4d-5470c3dacd4b', '6a64e7a9-2820-489d-8c4c-c6bc56abcdf9', NULL, 4, 450.00, NULL, NULL),
('69500fd1-5093-44c5-a1c0-7a1b03093326', '49c782d8-90f3-46d4-8f30-ff259be5c745', NULL, 2, 450.00, NULL, NULL),
('6a82f193-d4ee-46a2-a9e7-a84fa213f7fe', '7acb27fc-cc2b-496b-93d7-1793f89a8e53', NULL, 1, 750.00, NULL, NULL),
('6aed93df-8de6-4b99-9182-46da54c4594a', 'e5f6ba5d-db25-4876-8838-2a942d8da40e', NULL, 1, 750.00, NULL, NULL),
('6b1c0789-bf11-4b3d-8cfd-44afd1434213', '23ee4bdd-43db-4255-af86-6ccae5609377', NULL, 1, 0.02, 'medium', NULL),
('6c4256da-f286-4bd4-afc1-05e642a4dd39', '5b4fd883-d388-45ac-aa87-e7265c3d736b', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('6c8985ff-3a9d-44a5-9517-071e516557cb', '24d6a6a7-3fd1-4592-bc76-e8b6070323c6', NULL, 1, 750.00, NULL, NULL),
('6e40e53d-606f-461c-8afb-cf90a0423329', '50d84184-8921-4009-ab2b-e7f49ef3204e', NULL, 1, 450.00, NULL, NULL),
('6eb975ed-f475-4402-a305-6ccfacb8fb71', '270074bc-ad2f-4ab6-8d58-2c51941f30de', NULL, 1, 750.00, NULL, NULL),
('6ecddada-067e-4236-a6a3-0d17acdc2a8b', '6c14b01b-0fd2-4d51-8fe1-36faa6506690', NULL, 1, 450.00, NULL, NULL),
('70a5c8ee-dc1f-474d-8889-cc7140152e2e', '524d53aa-0571-42f4-b464-884323678b58', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 3, 750.00, NULL, 'Eggless'),
('714b76fa-2dc9-4e7b-884f-56242ea6538f', '6a64e7a9-2820-489d-8c4c-c6bc56abcdf9', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 4, 450.00, NULL, NULL),
('72294fd5-353f-43ad-951d-577da6b99797', '1ee8939e-3680-4ced-b676-b046799f4f31', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 6, 750.00, NULL, NULL),
('733eb284-45e1-4672-99cc-d2525078fb7a', '186e00c5-f9fd-4294-aedb-089aa4982e7f', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 5, 750.00, NULL, NULL),
('7454e544-ec36-4264-8031-9246ec44f6c0', 'be838915-4f94-434a-a946-8115abcd61ad', NULL, 1, 750.00, NULL, NULL),
('749b3e6c-3e70-4381-a2be-b1695b4a894a', '482495a8-ac90-4afc-9fbb-894705d8b647', NULL, 1, 20.00, 'Small', NULL),
('7550283a-1d28-430b-81c6-b445ff12445c', 'e99eabfc-8016-4977-b3e2-83a93bf9c970', NULL, 1, 2.00, 'medium', NULL),
('755859c2-54c4-4cb4-8ab2-e0ce340c2d47', 'c267db55-f795-4314-8cd0-1fbc59389138', NULL, 3, 750.00, NULL, NULL),
('76a1219e-00c4-45fd-9a2d-e3ff9dd449b5', '095d1fac-be06-4892-850e-816bd757a1f7', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 450.00, NULL, NULL),
('76b91c05-ee2d-4f72-af39-b5662c374d80', '83092155-394c-4d57-ad23-1595f5ae5eed', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('771629a8-b839-48da-b9cd-3b1c92ac4133', 'abbafec6-2354-43c7-9f37-88022c052cfe', NULL, 1, 450.00, NULL, NULL),
('771d4596-15eb-4cfe-b6a2-042010f0ab5c', 'bc44645f-6b71-44ba-b8f6-adac96df0957', NULL, 1, 1.00, NULL, NULL),
('7795b561-e000-43a8-a575-bcebbeed8cc0', '2cd61fdf-51fe-40c5-8ccb-4e2fd1fba977', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, 'Eggless'),
('78100af2-aefb-4033-aceb-08e8b311181b', '64d4db8f-0591-4ac2-b129-5117bb990ef9', NULL, 2, 450.00, NULL, NULL),
('792f4499-07b5-4fe0-bf0e-ecb39fb22605', 'b975f8f5-8455-42a3-ab4f-0649fab503f4', NULL, 1, 750.00, NULL, NULL),
('794127af-9919-4d02-96fa-5e8490b83767', 'a80b1ff2-2e9f-41e3-a4e9-791e18531fea', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 450.00, NULL, NULL),
('7b1a5149-030a-4e98-8891-37709fba7ca1', '71f4ffcf-2689-460e-8f98-e74f3cf236d7', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('7b265b9e-cc85-46a6-8ebe-5b9bcaa4f4f5', '7dc78fc6-320c-43fb-b208-f36ec7003eef', NULL, 1, 750.00, NULL, NULL),
('7b857177-4755-497d-9e81-344d6f6dd19f', 'ec37e27c-e8df-4766-8609-d4dc1ef088a6', NULL, 1, 750.00, NULL, NULL),
('7bcd35e3-d0e7-4afc-a062-31443e5c167c', '964ee164-8da1-45d3-8ccc-1dabd40df95a', NULL, 1, 450.00, NULL, NULL),
('7e098683-85fe-4a36-8cd0-fdb4c2172d85', 'b96f4111-51e1-4340-92b7-b00554b05f82', NULL, 1, 450.00, NULL, NULL),
('7e35e593-726c-4449-ac6f-fce07f5f8d19', '2cd61fdf-51fe-40c5-8ccb-4e2fd1fba977', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 380.00, 'Serves 1-2', 'Eggless'),
('7e6cc020-2d48-4add-8baf-56cabb1822e9', '925f4b9c-8efb-40fe-9723-42c0baa7ea3c', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 380.00, 'Serves 1-2', 'Eggless'),
('7f090f01-e096-4d42-bc7d-b64328b8ce46', '095d1fac-be06-4892-850e-816bd757a1f7', '1dae4603-9f2d-440e-a8eb-a520a295bb5c', 1, 450.00, NULL, NULL),
('7f2bb5af-01d1-45f3-947f-ce5adbd2a15b', 'c6960881-2802-4221-a72c-f0b523f530c3', NULL, 3, 750.00, NULL, NULL),
('7f37f531-4209-4658-8e0b-036f45e02a6b', 'ce18a752-a3e2-47d2-9baa-2138010bce21', NULL, 1, 750.00, NULL, NULL),
('7f4a4ca8-855b-4aa2-9247-75ca86f7f25b', 'b02a5b74-81bb-4f62-8d56-12ee796d4237', NULL, 1, 750.00, NULL, NULL),
('804f1090-cf20-41d8-b2ea-7af6f84b6473', '9d8ad705-8def-4e9f-b806-2e30939d19ef', NULL, 19, 1.00, NULL, NULL),
('81b6d2fd-3e06-4058-b974-7ddbba1ba36e', '64f6d6a3-52c6-41ab-9597-45d36d1dcf8e', NULL, 1, 450.00, NULL, NULL),
('81b9b816-6a9c-4af1-913e-a0edc4be1d10', '3ede6636-0490-4a55-b1ca-cd13c100e038', NULL, 1, 750.00, NULL, NULL),
('81fe41ef-4d73-4127-ad3b-47bb807d09a3', '8d418983-577d-40bf-b661-69901ef08585', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('82129a64-9bc8-4312-8e98-42b2336434b3', 'ee475940-d572-4f67-92e5-e228fbab6d8c', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Eggless'),
('83c9cc15-1d77-40a1-b92c-b79b92e8f391', '8e63fb94-3b51-478d-b952-da1545612910', NULL, 1, 20.00, 'Small', NULL),
('84c4c7d9-2c95-4c37-b83b-eb0e49c2cf4e', 'f19e98d0-8603-468e-80b8-5c7d23bb0c02', NULL, 1, 3.00, 'medium', 'ribbon'),
('852f59a2-a260-456a-9296-820a083d100f', 'cd473906-e798-44de-9120-a2c802857573', NULL, 1, 750.00, NULL, NULL),
('855a2206-d385-4345-a64a-0f4a3840c414', 'bf217ec9-5a55-41a5-ad72-539010413580', NULL, 3, 750.00, NULL, NULL),
('856616f1-afca-4d68-a606-3cf3da6853af', 'd748509d-419d-4c66-910c-ebf49d21bd63', NULL, 1, 450.00, NULL, NULL),
('85bbe624-6320-426f-b9b6-28cdef64f4b9', '31af772a-47bb-49bd-bd93-5e2dbb15ccd8', NULL, 1, 750.00, NULL, NULL),
('85d073c6-10f8-4e61-bbf9-81bdf8179a76', '99bc4acd-48eb-4fde-b7f1-b51336e51826', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('86b83e4b-a10a-468f-b47c-a56df3a44a22', '7c12ebec-9a08-4b18-82df-57053eae946a', NULL, 1, 750.00, NULL, NULL),
('86f03e7b-4118-4dd0-81d4-b9c8137d22b6', '7155ff15-eced-41d1-82a3-717d969b3735', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('877fa30c-a16b-446a-918c-837131a9ac36', 'aff54ee4-e058-40a9-86fa-de859dc3ea3b', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Eggless'),
('87a12b21-97f7-4610-9ff3-826e89ec79d6', '8bef0187-3ae2-41e7-93d4-ad2fc3487f77', NULL, 49, 0.02, 'medium', NULL),
('8851e281-91bf-42a4-81ac-c639e0744d0c', '67bf50d2-5d5d-442a-a22b-a4234c7aad69', NULL, 1, 750.00, NULL, 'Egg'),
('891e3a4d-7022-46b2-bc36-c7b17daa72ee', 'ba02dac3-d435-47ca-bcb8-d271e69082dd', NULL, 1, 450.00, NULL, NULL),
('893bdca2-5901-4481-9d90-9b7fb6aff8ab', '873a1dc4-084a-4e87-b549-c0cfeedaec4c', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 1200.00, 'Serves 4-5', 'Eggless'),
('8990ea3f-e24f-469e-ab4a-ba316bd005d4', '7c38a4ed-0a3e-484a-a411-98b6204bdaf6', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 5, 750.00, NULL, NULL),
('8b02cb40-d919-432a-8423-945927788af1', '3703ef57-bc39-4d57-a091-e4d078e33ad6', NULL, 5, 700.00, NULL, NULL),
('8be1bd4e-4d36-4d19-b8ba-43df836c2c39', '7c03ec8d-2133-42df-bc6d-869498f47639', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('8c0bce42-f024-476c-921d-f39d94b061f4', '99bc4acd-48eb-4fde-b7f1-b51336e51826', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 4, 750.00, NULL, NULL),
('8ca8968d-275d-4e94-a832-01753b48d2dc', 'be15f71d-686f-4e53-bfd4-c034873985b1', NULL, 1, 0.02, 'medium', NULL),
('8d5e7b6c-16a3-4019-ae46-9d183f336279', 'd210938b-6a4b-470e-99a4-9dc2ce3845e9', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 1200.00, 'Serves 4-5', 'Egg'),
('8dd5d881-3234-44d7-93bb-121ba8b17596', 'd876be34-0e9c-4710-ae29-bc14a8e61e99', NULL, 1, 450.00, NULL, NULL),
('8df655fc-2a75-4458-a88d-50bc6dacdd57', '234e7b41-e7ce-4278-856e-588eed6cbb27', NULL, 1, 750.00, NULL, NULL),
('905605e1-77bd-4425-9702-dc1f18c189a6', '68bfaad3-53b9-4b67-8820-d48ebe990ac1', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 1, 2100.00, '1 Kg', 'Egg'),
('907a3d82-3647-4382-93b0-7656e7f8e19a', 'e9acd003-9369-4d59-b418-e98c1bbc0d86', NULL, 1, 0.30, 'thr', '2r'),
('90a39434-c32d-4f3c-90b6-5fe3dcd289b0', 'f0e489cc-c0c5-4bbc-872b-ee7dfe233a6c', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 380.00, 'Serves 1-2', 'Egg'),
('90dc1ce6-d45e-4562-bd46-008e19844e13', 'd252412d-e4a1-4bc9-9ed7-49488adaebeb', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, NULL),
('91a51173-d9de-4cf8-9fb3-285c76a9ba3e', '79e9221b-024e-403e-bd3b-1c26a3a93ec9', NULL, 1, 750.00, NULL, NULL),
('91fc024a-2523-4bc6-832a-08f8f3558a7b', '709b1eb8-5e13-4efb-87b0-77784524b60d', NULL, 5, 0.20, NULL, 'Egg'),
('93757b0e-7345-475e-bbe0-7117cb9025ef', 'c2f67e72-0a98-4195-99b8-6a65dce17f25', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 1270.00, 'Serves 4-5', 'Make it Boozy'),
('93d67bb3-41fd-4f24-9c66-11d6ec26dc63', '6b5d48bd-e72a-4aa2-9ecc-e79c8fbfe931', NULL, 5, 700.00, NULL, NULL),
('946eb443-1655-4209-82ea-19211f3e5999', '7c12ebec-9a08-4b18-82df-57053eae946a', NULL, 1, 750.00, NULL, NULL),
('9482e951-debc-47c1-b3eb-74e90f52a868', '7c38a4ed-0a3e-484a-a411-98b6204bdaf6', NULL, 5, 700.00, NULL, NULL),
('96635636-0281-4db3-a154-f5f2d9e117fa', '05f0b70a-6921-4eb9-b8fd-27dd544141b0', '734c2316-6504-420f-9c4b-1f3c14bc1977', 1, 280.00, NULL, NULL),
('9682aa9e-6bae-4f24-b125-33901ef8e0ab', '6a64e7a9-2820-489d-8c4c-c6bc56abcdf9', NULL, 1, 450.00, NULL, NULL),
('96b14aa3-51e3-4cdd-83b0-c93934283c86', 'decfe035-ff4d-455c-b61b-567ce9f39b5e', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 450.00, NULL, NULL),
('971c680d-01a4-4cf8-ad7f-1c8c23ab88e6', '55f4dbd4-7f21-4e50-9d5f-67880a090177', NULL, 20, 0.02, 'large', NULL),
('973ac549-2e5d-4d45-a465-bbe16624892c', '7c3ca9fa-c946-49da-82a1-03f7c37efe6c', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, 'Egg'),
('98341f67-442f-4eaa-9246-21f25ba4ab18', 'd776f4f6-1d82-42b6-877c-526c033ac726', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 6, 750.00, NULL, NULL),
('990e15f7-30be-4da8-8c4b-f87d41551831', '27a2d59d-d801-4457-82f3-c558550e6749', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('99b69b94-d68b-435d-bbb0-93cbb14d71ee', '8852e1fd-3b35-4e64-aeda-7f0db33b0833', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Eggless'),
('9a457dd1-fcd3-4d6c-a6ec-b70cd0f9b715', 'cdee8c17-59f6-4a08-9e94-b9afd892d5c2', '7dddc092-990f-4a51-8895-e6fcb89689fa', 1, 2100.00, '1 kg', NULL),
('9a7b939a-e10c-4fbd-9e15-fe637d6a6006', '58c15566-0122-4069-a319-620cf80d8e2f', NULL, 1, 450.00, NULL, NULL),
('9a88a4e5-f947-4035-b37a-73fe6dc5030b', 'aec44448-0f7a-4ad9-a5f8-4d8d2251a057', NULL, 1, 750.00, NULL, NULL),
('9a8bee3b-9334-40ee-af55-3e826c5aa7ca', '670c0dd2-d6d8-4e0c-af9c-257ac7dc4774', NULL, 1, 450.00, NULL, NULL),
('9c6f0d79-ae39-4345-a91e-a14a713ff02e', '6c6aa033-355a-487d-80b5-d29e7b0ae1d8', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 3, 750.00, NULL, NULL),
('9cd72e12-66a0-4aca-9b4d-a13c2e526f61', '60f4b59c-c40f-446f-9aa2-f02d70a8a444', NULL, 5, 750.00, NULL, NULL),
('9d2e952b-6815-4d93-94cd-d3bab8a501ed', '0b896d8b-06db-4e67-a115-793d1406cc8a', NULL, 1, 750.00, NULL, 'Egg'),
('9f182d2e-761e-4e76-aba8-cc2203623c54', 'e9acd003-9369-4d59-b418-e98c1bbc0d86', NULL, 1, 0.21, 'xxxl', 'cheese'),
('9f8652b3-6148-4d37-96e5-270d14b1eb14', '092ce4c1-99f6-46c8-a3c4-7dccaf41936a', NULL, 1, 750.00, NULL, NULL),
('a0ad2c12-d854-4598-b48e-b7418ccf73ef', '9cf155f1-f195-4f23-b770-4b6e3a360d06', NULL, 2, 450.00, NULL, NULL),
('a204a7c8-6767-437a-bff3-7e3e38fdd39d', 'd210938b-6a4b-470e-99a4-9dc2ce3845e9', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 2, 450.00, NULL, 'Eggless'),
('a282d8bc-9509-4bc7-9906-31b0c7eb7a8d', '163ded93-6c22-41dc-b48a-757d509bff9b', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, NULL),
('a28769ba-3d61-41d6-8009-3bc0d9268247', '7fedc15e-db85-4389-ab53-c92bc30804f3', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('a2d9dabe-4451-4197-9ed2-6f1c96c19f01', '7cc61ecb-2c8a-4bf9-909d-e919ac587e45', NULL, 3, 450.00, NULL, NULL),
('a2fd5b5e-5771-4292-9593-d5656b20b80f', '6ece8475-fb58-4c85-9579-5a301be4d663', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Eggless'),
('a3698d9e-96da-4012-807d-4bdd8ed4513c', '01f437be-1897-4d64-8a03-2c725b0d738d', NULL, 1, 750.00, NULL, NULL),
('a42c38d4-86ea-4dd5-89b0-39283a679df9', '4873d229-c462-4337-bcba-c9ca073844f9', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 2, 750.00, NULL, NULL),
('a45ec398-1ea9-4df3-a29b-1a4e20b4f9ff', '1ee8939e-3680-4ced-b676-b046799f4f31', NULL, 1, 750.00, NULL, NULL),
('a4bd55d3-5b4a-41f1-88fb-a1e969b5d6ee', '6759faf1-5072-4bb2-8a9b-3ac1df2c67c9', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 2, 450.00, NULL, 'Egg'),
('a89aedc5-7429-40a1-8841-dd7d72203dcb', 'b565456e-ab2d-4970-a020-f8f4ed64eaeb', NULL, 1, 750.00, NULL, NULL),
('a8ccee42-f56c-4334-9016-c7c434f657f9', '2d4495f8-faab-4df9-80cd-8a064cefe3b8', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Eggless'),
('a8dc0759-6da6-4a3f-b540-b6e0cd838745', '122fef44-3870-4b46-a29c-ce5289a45cc7', NULL, 1, 0.04, 'medium', 'cheeze, topping'),
('a8e74010-607e-44ec-b02d-3c54f4660828', '255f4c3f-c63c-4073-aab8-7602d630646e', NULL, 1, 450.00, NULL, NULL),
('a973a6c5-59aa-478a-b45e-be9470ef8cac', '79eb820c-5c54-4aff-9ffa-6cd5c2f0ed55', '998238da-3301-466c-b1d7-7b18e548028e', 1, 1150.00, '500 grams', NULL),
('a9cc367b-871d-4ffb-8cc8-71c9f020de42', '75377f83-ebde-4efb-91c9-0b233f6b54ba', NULL, 1, 750.00, NULL, NULL),
('aa9a2c15-f198-46ae-9560-b4efd1a95967', 'd210938b-6a4b-470e-99a4-9dc2ce3845e9', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 2, 450.00, NULL, 'Egg'),
('ace64d6f-695c-4076-98ad-cf502335faea', 'b64453f0-d710-47e6-b8d4-e7774a92a244', NULL, 1, 750.00, NULL, NULL),
('adeb20ee-4b8e-4065-a2b8-4631b23b5594', 'fa72295c-df3d-4a9a-b76d-bea6d65c3d30', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('b131b67c-103f-4a8a-8e29-75ae1d41e714', '31af772a-47bb-49bd-bd93-5e2dbb15ccd8', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('b1701092-04be-44ef-8fac-7129b6b49f2a', '337f3090-14be-4b7c-bd53-c91feef6817a', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Eggless'),
('b1aa0aaf-d59f-464d-b343-aaa21b790cf1', '6b256389-fd0d-40c7-8ce8-4d7bb96f5652', NULL, 1, 450.00, NULL, NULL),
('b1dfe9dd-2eb3-4be2-b235-e88564e902e3', '7a4d5afb-86d4-4301-9816-7d023a667e3f', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Eggless'),
('b394f7e8-39a5-4c52-a2eb-276b6992ad5c', '05c1e108-8cf6-4ad4-9144-f10af864f08f', NULL, 1, 3.00, 'Large', 'ribbon'),
('b54c9ef1-b302-4f12-8e1e-3ffe25d3b817', 'e507ba5a-7c32-4e56-9159-bbd5b7681468', NULL, 1, 750.00, NULL, NULL),
('b5a6c8c8-bb81-49c2-88bc-c03d9d2135cb', 'b7cbb110-90c6-40eb-94b8-2e6bbb2a304f', NULL, 1, 123.00, NULL, NULL),
('b6f73769-69a0-450f-8643-b339fa717842', '7c38a4ed-0a3e-484a-a411-98b6204bdaf6', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('b77a8dff-b177-4f8c-b526-84d7b1056c08', 'ad5dab3f-8f44-406e-bb01-5d63d7bb62a7', 'd83aa740-48fd-4372-9f4b-79309bc83485', 1, 950.00, '500 grams ', 'Egg'),
('b785e38f-921d-4ee9-a0d7-46d9a5e4404f', 'e27e29a3-2c92-483d-9bce-d8fed0b10444', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 4, 450.00, NULL, NULL),
('b8561dd2-c161-4aad-9640-3537ac08a8bd', 'c39e5af9-cf76-43fd-b880-514c5ded50f7', NULL, 33, 700.00, NULL, NULL),
('ba007df8-b425-467f-ac09-d4eead5fa5d7', 'bf35fc1f-7512-487a-8d8a-58cfd826117c', NULL, 6, 0.20, NULL, 'Eggless'),
('ba05b40c-aa5c-4dd5-9011-0ee7539ca0d7', '172f0363-58a7-4e8f-a53a-b2ff4526650f', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('bb811f71-863c-4436-bd8a-6c342b211e7e', '07580a51-7bbc-4c51-a779-0d669b407727', NULL, 1, 450.00, NULL, NULL),
('bbda696f-674d-4464-bda5-3206b114a1ce', '89640515-ee0b-4b9f-a09b-448a354d9418', NULL, 1, 750.00, NULL, NULL),
('bbfc16f1-9ffd-4966-a078-e408f103a52f', '7d62b502-7c9c-45f0-ae84-e86a443b389c', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('bc01c5f4-bb23-4999-b382-21bda808ae69', '479bbfcb-b50f-4ec7-81a6-31889f7aebb8', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 3, 750.00, NULL, NULL),
('bcc6496c-68b6-4927-9fd8-43b0ed5b691c', '0faf5334-7461-4f06-b153-62ac223bdcae', NULL, 1, 750.00, NULL, NULL),
('bdb70262-906e-4c77-aaf6-f341b1ffbd11', '447b99f5-30ba-47a7-9bd3-611930da9cdb', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Egg'),
('bdf63d25-010d-4e38-a618-9642e2e1da64', '83d667ec-c6a1-4838-8948-6eca7fb65bb7', NULL, 1, 2.00, NULL, NULL),
('bdfbc8fe-b82b-43a8-abb3-b8d1bda06673', '48d0f2df-aef2-49b9-8c26-88d51e05f106', NULL, 1, 750.00, NULL, NULL),
('bf52c94f-18c2-4874-8190-296dfc4e07f8', '6759faf1-5072-4bb2-8a9b-3ac1df2c67c9', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 1, 2100.00, '1 Kg', 'Eggless'),
('bf6c7ff8-d4f9-4261-8846-bd51686e2cdd', 'f995b4eb-9ed3-4157-a1f4-901a24bc1756', NULL, 1, 450.00, NULL, NULL),
('bfcc4313-60d0-4f83-a16e-53deaa027961', '13626ca8-3790-4887-8d4c-2429519f595d', NULL, 1, 750.00, NULL, NULL),
('bffa6486-83b0-4f5e-b92a-51065abb472a', '4b048a1a-a59b-4cf5-b34b-90950cb33e2b', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, 'Egg'),
('c0c859d9-c7a7-4222-afd3-a14977c3e0b6', 'e27e29a3-2c92-483d-9bce-d8fed0b10444', NULL, 5, 450.00, NULL, NULL),
('c0d036e4-9f12-4893-967e-f1f537ee08cc', '83b734e8-3039-445b-8626-170355295f69', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('c0fefc74-0e4d-4d0c-8765-8205fad66b88', '8ae1194b-d99a-4435-a5b9-51a82a3796c0', NULL, 1, 750.00, NULL, NULL),
('c2524f07-d8af-4ccf-964b-817bde7a34aa', '270074bc-ad2f-4ab6-8d58-2c51941f30de', NULL, 1, 750.00, NULL, NULL),
('c3630aa4-2776-4d92-a6e8-68503a95bf18', '925f4b9c-8efb-40fe-9723-42c0baa7ea3c', '1dae4603-9f2d-440e-a8eb-a520a295bb5c', 1, 450.00, NULL, 'Eggless'),
('c409c4bf-44fa-4a93-bbc5-023509119e08', '55f4dbd4-7f21-4e50-9d5f-67880a090177', NULL, 1, 0.30, 'thr', '2r'),
('c545af4c-aa14-468a-8e96-e59dd7f3013d', '84c2a65d-81a2-4566-a784-e48bf7c48c66', NULL, 10, 66.99, NULL, NULL),
('c7958081-38de-4624-a57a-6509da32ae18', '81d8df0f-a98d-42ed-a3c1-8544f74dc76f', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 1, 1150.00, '500 Grams', NULL),
('c8f7bf20-4c9b-4802-ab47-851f5c9d7031', '400aafd9-1e54-49a6-b4a8-a8eb7c60b978', NULL, 3, 450.00, NULL, NULL),
('cb326d6e-b0b0-4719-85fd-9d8887c5aa80', 'e99eabfc-8016-4977-b3e2-83a93bf9c970', NULL, 2, 2.00, 'Large', NULL),
('cb6c8328-cbc2-4f8d-a8f7-6aa9267f2a7e', 'b4417c75-7db4-4c7b-a131-875e281a811f', NULL, 1, 450.00, NULL, NULL),
('cc17bf6a-05dd-4b6f-9964-86c30d9fce84', '6b34f159-b3cb-4ee1-ad5f-230e7930c166', NULL, 1, 10.98, 'Large', NULL),
('ccd13133-b52f-44f2-ae63-0da2f81bc7fe', '78510faa-616c-4bf8-bb9a-a20fd73dfc80', NULL, 1, 750.00, NULL, NULL),
('cd8a1e7c-923d-49e4-b5e8-2a46292eea60', '80183bce-cac9-4a37-84c1-9738d6f0f81e', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, 'Egg'),
('cebd1fc1-1ba2-4a69-96bb-9784048a0dd3', '172f0363-58a7-4e8f-a53a-b2ff4526650f', NULL, 1, 700.00, NULL, NULL),
('cfddeb89-88ad-42ae-ab9a-e0e9f8fe771f', '6a64e7a9-2820-489d-8c4c-c6bc56abcdf9', NULL, 5, 450.00, NULL, NULL),
('cfe49ec0-4e80-4596-8b15-e4000576f238', '4fa646bd-45e6-4fa4-a3cf-ed2fe8fc869b', NULL, 1, 30.00, 'Big', NULL),
('d018b5cf-45f9-4afd-a77b-8b492a9dd92a', '98572e5a-4679-4588-b281-260a38ef665f', NULL, 1, 750.00, NULL, NULL),
('d20a62ef-8982-4d21-9b12-2a1d08a68aa8', 'ed63452b-fbea-4699-8c70-caaa2c8d3dc5', NULL, 1, 750.00, NULL, NULL),
('d2156f48-df8f-408a-9520-84a27258c56a', 'c2b5ce0c-13b1-4c07-be7d-de7ac27ba51a', NULL, 1, 450.00, NULL, NULL),
('d2f1f0ed-c1fb-442b-9bed-019c76caf5d0', '92ed16ea-54d7-41c8-bfc9-56bc9a2defb2', NULL, 1, 450.00, NULL, NULL),
('d40c7d84-31c5-4c36-a229-2a39b10e28e6', '2cd61fdf-51fe-40c5-8ccb-4e2fd1fba977', '734c2316-6504-420f-9c4b-1f3c14bc1977', 1, 280.00, NULL, 'Eggless'),
('d43f4679-6215-4349-992c-9e99bfe9e2bd', '270074bc-ad2f-4ab6-8d58-2c51941f30de', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 6, 750.00, NULL, NULL),
('d460847d-0437-4d4a-8146-12d3b3c8d4e4', '7d403d4a-cd60-4607-9443-994cf2f56db5', NULL, 1, 450.00, NULL, NULL),
('d50908f4-cf97-4c40-88a3-fdf84a9129ad', '4e5c1388-fff4-47ef-b3fe-e08fbe6499bc', NULL, 1, 450.00, NULL, NULL),
('d50c2419-d30c-4d68-9963-aac1c92fdc70', 'bd5c6a26-51b7-4c36-b3bd-fabfd97f15a9', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, 'Egg'),
('d5a8b142-ad49-4ab8-b0b0-a1a182364e96', '700f46d4-dd2e-49b1-99eb-c406e394413f', NULL, 1, 80.00, NULL, NULL),
('d70499fe-42b6-4d53-9b1c-b63fb6b33ae9', 'e9acd003-9369-4d59-b418-e98c1bbc0d86', NULL, 20, 0.02, 'large', NULL),
('d7daaf9b-270f-4b44-a638-e2ceddd01e93', '8f4316c2-8645-42ef-b596-685580fe08af', NULL, 1, 0.20, NULL, NULL),
('d7eb8e58-2970-4134-a9bb-a7ce88f11d6f', '214a3081-1fd9-4160-9740-1733a662caf8', NULL, 3, 450.00, NULL, NULL),
('d859f3a1-04ea-4079-9a0f-c8476ab49608', 'aa0ed1db-45ca-45d7-9ea5-73e9afb15bbf', NULL, 1, 0.30, 'thr', '2r'),
('d87b3034-593d-4e16-8e56-80f248ce509c', '9b6ad4a7-f5b4-4c60-b395-48029fbdaebd', NULL, 1, 750.00, NULL, NULL),
('d8eb9b83-82c8-4c42-b550-17362d31b0bc', 'dd1108ab-be2d-468f-a004-46aeacdd1a36', NULL, 1, 750.00, NULL, NULL),
('d92b5235-d8ec-4e1f-a0c1-301d0bce9a46', '9579a6e7-e47f-429e-b598-0ab588fab3b7', NULL, 1, 20.00, 'Small', NULL),
('ded1a440-42bc-4897-9865-2c7e173d6cc9', '77180e77-9ce0-4614-bc87-add3d6219cd6', NULL, 1, 750.00, NULL, NULL),
('dfc25102-1844-42a2-b7d4-96741a2b179b', '34e8432f-5f10-4878-9ec9-743f5a18bccf', NULL, 1, 450.00, NULL, NULL),
('dfe62cbd-7cc2-46c6-8036-bd783e03cdca', '925f4b9c-8efb-40fe-9723-42c0baa7ea3c', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 300.00, NULL, 'Eggless'),
('e2a8eec4-32df-4148-8992-77a4476718ae', 'e87592f2-6cd1-43ce-9380-bd79185b2414', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 380.00, 'Serves 1-2', 'Egg'),
('e363397d-6255-4c40-8862-7c729d692060', 'aa0ed1db-45ca-45d7-9ea5-73e9afb15bbf', NULL, 20, 0.02, 'large', NULL),
('e3b3ca95-fca9-4a0c-bf13-395f1eece54c', 'ac19a394-c4a3-448f-be65-511ef3fc171b', NULL, 4, 750.00, NULL, NULL),
('e40e7591-d5ae-4d6e-8b11-3a5da45daf57', 'bc44645f-6b71-44ba-b8f6-adac96df0957', NULL, 1, 1.00, NULL, NULL),
('e4df0ae9-fa26-4d66-ae30-ef5833f3df03', '016c8242-683a-464e-9abe-b4efe2b89633', NULL, 3, 750.00, NULL, NULL),
('e5abe215-d6ce-43c5-8941-8be0163266b6', '29dee220-a17f-4e75-8ff9-6380cdd092a6', NULL, 1, 450.00, NULL, NULL),
('e75faaa5-d079-45e3-9fdf-1634f9beb929', '163ded93-6c22-41dc-b48a-757d509bff9b', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 1, 380.00, 'Serves 1-2', NULL),
('e7d51ed0-37a3-406b-9ff3-a10c1db8868a', 'aec44448-0f7a-4ad9-a5f8-4d8d2251a057', NULL, 5, 700.00, NULL, NULL),
('e849fea6-58d5-4ca6-9b14-acecf25c49a6', 'b565456e-ab2d-4970-a020-f8f4ed64eaeb', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 6, 750.00, NULL, NULL),
('eb139008-008b-4724-a602-12a221bd3fb9', '925f4b9c-8efb-40fe-9723-42c0baa7ea3c', 'cfbca8a8-1a15-40ca-b9b7-de63c38b2bf7', 1, 450.00, NULL, 'Eggless'),
('ee6859c9-08b0-46da-b32c-6465621fb18f', '8f4316c2-8645-42ef-b596-685580fe08af', NULL, 1, 750.00, NULL, 'Egg'),
('ef5d9207-1dbe-494b-bb7c-b1a58a557984', '5b9a5392-7d8b-4c60-bdd5-eb74152c9234', NULL, 5, 0.20, NULL, 'Eggless'),
('efefe075-85ec-4be8-8dfb-d06431afafa9', '842a4a9d-d249-4ddd-8bca-04613e8e2046', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Egg'),
('effa0774-5237-41b8-8b0a-2265e457ba75', 'c6960881-2802-4221-a72c-f0b523f530c3', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 1, 750.00, NULL, NULL),
('f00824af-965a-4817-863d-8e86e855c0f7', 'fb6785a7-7fd0-4d21-be75-81ee66fc7951', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, 'Egg'),
('f02a696b-9445-43ba-9664-005210bf9bdf', '3b1b4a56-54d0-49f7-a815-b4a33b1e41ec', '085e1d68-45ca-459b-b4a8-5e4117663bdd', 2, 750.00, NULL, NULL),
('f1f37900-257c-458f-b42a-b5d0b77ace70', '41e0cd22-f42d-4921-affa-6cd6ebeb3de8', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, NULL),
('f218b4ca-9807-4c07-8d0a-fdc18e8f28b2', 'ac19a394-c4a3-448f-be65-511ef3fc171b', NULL, 3, 700.00, NULL, NULL),
('f282214e-e89f-4bfa-83fc-3615e5b03eea', 'a3e68f8f-a26d-42d6-a535-8909a4bb8195', NULL, 1, 750.00, NULL, NULL),
('f3fbc2de-0c92-40e4-bdb5-323e5851f1e8', '2e3b9373-0ff5-4add-8412-c80579d9920d', NULL, 1, 450.00, NULL, NULL),
('f4379aff-89f3-4c06-95e8-2ac1632859af', '81cef5b8-adc6-4f6f-a779-ad3f1c7cb6df', '68671e33-8e30-4502-89fa-7f30d59dbb7a', 1, 450.00, NULL, NULL),
('f4f1f3d8-c6c1-445a-ad0c-e7b7ce45f5a5', '599e1af1-6ee3-499d-8895-7b26d00725fd', NULL, 1, 450.00, NULL, NULL),
('f51c9f1f-1d8c-4830-bc7c-1400b1bcd47b', '83d667ec-c6a1-4838-8948-6eca7fb65bb7', NULL, 1, 20.00, 'Small', NULL),
('f5a3d80c-82da-43a5-8cfc-dd2cab555f67', 'aec44448-0f7a-4ad9-a5f8-4d8d2251a057', 'aea467e4-df93-4d86-94fa-7866acb99c1f', 1, 700.00, NULL, NULL),
('f5b1f1c9-96c3-4471-b710-7554afe02c70', 'da3adff5-8382-49ae-b1fa-15b377058cb1', NULL, 1, 750.00, NULL, NULL),
('f768cbe5-1ea2-4074-8870-7a545245afa3', '99bc4acd-48eb-4fde-b7f1-b51336e51826', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 2, 750.00, NULL, NULL),
('f76f6043-b8bd-41d9-8d62-bf940bd52f90', '68ce227f-16fa-46b3-867d-03eceaab8fae', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 1, 2100.00, '1 Kg', 'Egg'),
('f7e63e18-9fd1-4e56-b5a6-59435f3c6f1d', 'd776f4f6-1d82-42b6-877c-526c033ac726', NULL, 1, 750.00, NULL, NULL),
('f85349e5-0e4d-427b-9e62-f032d229b46e', 'b3077438-f177-45c7-879e-666b64f208ca', 'af944681-190e-4154-969d-1ad8fd4acb7d', 1, 750.00, NULL, 'Eggless'),
('f858c8ec-c701-4c33-878c-de068d06dd2c', '1db230fc-4386-4117-bcb4-c24fc860d77b', '6c7bca9c-7038-477a-87ff-955bb78b36ef', 1, 750.00, NULL, 'Eggless'),
('f8c6c602-1403-45c1-9bcb-c63263266a76', '482495a8-ac90-4afc-9fbb-894705d8b647', NULL, 1, 0.02, 'medium', NULL),
('fd14ba40-5814-48eb-bf53-7e0ccba09f53', 'd776f4f6-1d82-42b6-877c-526c033ac726', NULL, 1, 750.00, NULL, NULL),
('fd817ccf-3e7c-44a0-a666-dfffd52e68f3', 'e27e29a3-2c92-483d-9bce-d8fed0b10444', NULL, 1, 450.00, NULL, NULL),
('fe4afa80-66f7-4a79-a598-4a00ceb9ee2a', '4dab77e7-cce6-42c4-9614-c819b1ac3cc5', NULL, 3, 750.00, NULL, NULL),
('ffd88cd9-cc48-45bd-b7e3-74a24e18515c', '7642f1a4-2d5b-404b-b44a-ac40de5d08e5', NULL, 20, 0.02, 'large', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(191) NOT NULL,
  `category_id` varchar(191) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_best_seller` tinyint(1) NOT NULL DEFAULT 0,
  `is_sold_out` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `has_egg` tinyint(1) NOT NULL DEFAULT 0,
  `has_eggless` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `price`, `image_url`, `is_featured`, `is_best_seller`, `is_sold_out`, `sort_order`, `created_at`, `updated_at`, `has_egg`, `has_eggless`) VALUES
('085e1d68-45ca-459b-b4a8-5e4117663bdd', '448cddf5-657b-46f3-8701-cdd708bc9aa5', 'Biscoff Bento Cheesecake', '', 750.00, '/uploads/76f15f2e-2dc8-4ccd-95bb-010e6acd7ad6.webp', 0, 0, 0, 0, '2026-07-22 07:32:22.496', '2026-08-02 12:06:12.114', 1, 1),
('1dae4603-9f2d-440e-a8eb-a520a295bb5c', '7a2f07bc-fb52-4a2d-b269-1f528d6edd8b', 'Nutella Tiramisu', 'For those who believe chocolate makes everything better.\nSilky mascarpone layered with espresso-soaked savoiardi, luscious Nutella, and finished with a generous dusting of cocoa.', 450.00, '/uploads/6c49cb7c-7727-46a1-84a7-4a09a0d78af2.webp', 0, 0, 0, 3, '2026-07-22 03:31:02.316', '2026-08-02 12:08:32.121', 1, 1),
('4880a8dd-ce90-49e4-80bd-302e9d6904f5', '7a2f07bc-fb52-4a2d-b269-1f528d6edd8b', 'Classic Tiramisu', 'The original heart-stealer.\nCloud-like mascarpone, espresso-soaked savoiardi, and a generous dusting of cocoa. Timeless for a reason, irresistible by design.', 380.00, '/uploads/09923e8b-ced6-422e-bd43-f72026416174.webp', 1, 1, 0, 0, '2026-07-22 02:42:33.182', '2026-08-02 12:12:46.012', 1, 1),
('68671e33-8e30-4502-89fa-7f30d59dbb7a', '911ed0a0-0c0b-4d73-b52c-63f11d531e79', 'Cheesecake Cups', 'Four signature cheesecake cups in one indulgent box—Nutella, Lotus Biscoff, Pistachio, and OG New York Cheesecake. Creamy, velvety, and crafted to let you savour every flavour, one spoonful at a time.', 450.00, '/uploads/12283cbc-dc1b-4326-9627-da38dd3bb1cc.webp', 0, 0, 0, 0, '2026-07-22 06:17:04.689', '2026-09-19 23:28:41.081', 1, 1),
('6c7bca9c-7038-477a-87ff-955bb78b36ef', '448cddf5-657b-46f3-8701-cdd708bc9aa5', 'Pistachio Bento Cheesecake', '', 750.00, '/uploads/e41af765-f686-4593-87f8-fa420320b538.webp', 0, 0, 0, 0, '2026-07-22 07:30:59.119', '2026-08-02 12:06:25.173', 1, 1),
('734c2316-6504-420f-9c4b-1f3c14bc1977', '911ed0a0-0c0b-4d73-b52c-63f11d531e79', 'Tiramisu Balls', 'Tiny bites. Massive obsession.\nEverything you love about classic tiramisu-espresso, silky mascarpone, and cocoa-rolled into irresistibly indulgent bite-sized treats.', 280.00, '/uploads/dd6a78b2-7f9c-4524-91c5-40001512298a.webp', 0, 0, 0, 0, '2026-07-22 04:19:08.188', '2026-08-02 12:05:21.796', 1, 1),
('7dddc092-990f-4a51-8895-e6fcb89689fa', '433268e8-9ba5-4174-a0a9-e1cb5a5c2283', 'Biscoff Cheesecake', 'Creamy cheesecake, buttery Biscoff spread, and a crisp Lotus crumble - because ordinary was never the plan.', 1150.00, '/uploads/1faeff72-cf01-41a1-afec-b709e43f7257.webp', 0, 1, 0, 0, '2026-07-22 04:30:23.966', '2026-08-02 12:07:45.337', 1, 1),
('7fedf44d-b02e-40be-8c61-fbf391215793', '433268e8-9ba5-4174-a0a9-e1cb5a5c2283', 'Triple Chocolate Cheesecake', 'Crafted with premium Callebaut Belgian chocolate, this indulgent baked cheesecake is layered with rich chocolate flavour in every bite. Finished with silky chocolate ganache and chocolate callets, it\'s a dream for true chocolate lovers.', 1150.00, '/uploads/5d05a1b5-179b-4c8a-83b6-f98e5a842d22.webp', 0, 0, 0, 0, '2026-07-22 06:03:16.296', '2026-08-02 12:07:11.167', 1, 1),
('998238da-3301-466c-b1d7-7b18e548028e', '433268e8-9ba5-4174-a0a9-e1cb5a5c2283', 'Pistachio Cheesecake', 'A silky baked cheesecake layered with rich pistachio spread and finished with a generous crown of roasted crushed pistachios. Creamy, nutty, and perfectly balanced - crafted for those who believe indulgence should be unforgettable.', 1150.00, '/uploads/ad864cbb-7be9-477d-bab7-338172db0d77.webp', 0, 0, 0, 0, '2026-07-22 05:43:30.185', '2026-08-02 12:07:38.186', 1, 1),
('adbfe629-f624-4411-8d5e-0ca26d37a5a2', '448cddf5-657b-46f3-8701-cdd708bc9aa5', 'Nutella Bento Cheesecake', '', 750.00, '/uploads/15d2fb32-85f9-4581-92a8-4b780c236f63.webp', 0, 0, 0, 0, '2026-07-22 06:29:09.117', '2026-08-02 12:06:43.629', 1, 1),
('aea467e4-df93-4d86-94fa-7866acb99c1f', '448cddf5-657b-46f3-8701-cdd708bc9aa5', 'NY Bento Cheesecake', '', 700.00, '/uploads/4367672c-4542-4547-a429-cd9aca049bc2.webp', 0, 0, 0, 0, '2026-07-22 06:32:42.800', '2026-08-02 12:06:31.139', 1, 1),
('af944681-190e-4154-969d-1ad8fd4acb7d', '448cddf5-657b-46f3-8701-cdd708bc9aa5', 'Triple Chocolate Bento Cheesecake', '', 750.00, '/uploads/fe19e273-f721-4e2b-87e1-a36ac3bd0eed.webp', 0, 0, 0, 0, '2026-07-22 06:30:40.414', '2026-08-02 12:06:38.482', 1, 1),
('c5b7604e-39e1-4c40-a604-c3a40698faa6', '7a2f07bc-fb52-4a2d-b269-1f528d6edd8b', 'Filter Coffee Tiramisu', 'A South Indian classic, dressed in Italian luxury.\nOur signature tiramisu infused with bold, aromatic filter coffee, layered with silky mascarpone, and finished with a generous dusting of cocoa.', 450.00, '/uploads/b8087268-3fb5-4737-bc9d-c251a3a1fb79.webp', 1, 1, 0, 2, '2026-07-22 03:15:13.662', '2026-08-02 12:08:20.849', 1, 1),
('cfbca8a8-1a15-40ca-b9b7-de63c38b2bf7', '7a2f07bc-fb52-4a2d-b269-1f528d6edd8b', 'Biscoff Tiramisu', 'Caramelised. Creamy. Completely irresistible.\nSilky mascarpone layered with coffee-soaked savoiardi, luscious Biscoff spread, and finished with a generous shower of Lotus biscuit crumbs.', 450.00, '/uploads/e8aa37d3-f80b-4fb2-a61c-717a1b778ea9.webp', 0, 0, 0, 1, '2026-07-22 03:22:49.111', '2026-08-02 12:08:06.531', 1, 1),
('d83aa740-48fd-4372-9f4b-79309bc83485', '433268e8-9ba5-4174-a0a9-e1cb5a5c2283', 'NY Cheesecake', 'Our signature baked cheesecake is impossibly creamy, delicately rich, and finished with a buttery biscuit base. Simple, timeless, and made to let every silky bite shine.', 950.00, '/uploads/5d0852dc-f5c4-4f53-84e9-e3e69e192ffc.webp', 0, 0, 0, 0, '2026-07-22 05:53:27.788', '2026-09-18 07:45:53.616', 1, 1),
('e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', '433268e8-9ba5-4174-a0a9-e1cb5a5c2283', 'Nutella Cheesecake', 'A perfectly baked cheesecake topped with smooth Nutella, combining velvety creaminess with rich cocoa-hazelnut flavour for an irresistibly indulgent finish.', 1150.00, '/uploads/0f8e67d6-fea4-449d-9aeb-5ad6be8d3d0a.webp', 0, 0, 0, 0, '2026-07-22 06:14:44.247', '2026-08-02 12:13:54.458', 1, 1),
('e9ce3284-af07-4274-ab53-64538acf3455', '7a2f07bc-fb52-4a2d-b269-1f528d6edd8b', 'Pistachio Tiramisu', 'The green flag of desserts.\nEspresso-soaked savoiardi layered with silky mascarpone, luxurious pistachio cream, and finished with a generous sprinkle of roasted pistachios.', 450.00, '/uploads/87fe760d-fb2a-4c53-ae09-baa0c79c50af.webp', 0, 0, 0, 4, '2026-07-22 03:53:55.718', '2026-08-02 12:08:39.248', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_options`
--

CREATE TABLE `product_options` (
  `id` varchar(191) NOT NULL,
  `product_id` varchar(191) NOT NULL,
  `name` varchar(255) NOT NULL,
  `extra_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `image_url` varchar(1024) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_options`
--

INSERT INTO `product_options` (`id`, `product_id`, `name`, `extra_price`, `image_url`, `created_at`, `updated_at`) VALUES
('00aa371b-04a6-464d-8da3-348254e85ab4', '998238da-3301-466c-b1d7-7b18e548028e', 'SIZE:::500 grams', 0.00, NULL, '2026-08-02 12:07:38.186', '2026-08-02 12:07:38.186'),
('149f7fce-8cc2-457d-99bb-aa4c193cb70b', '7fedf44d-b02e-40be-8c61-fbf391215793', 'ADDON:::Twisted Candles', 60.00, NULL, '2026-08-02 12:07:11.167', '2026-08-02 12:07:11.167'),
('1510dc0a-d750-47cb-ab81-fc9c45accaef', '7fedf44d-b02e-40be-8c61-fbf391215793', 'SIZE:::500 grams', 0.00, NULL, '2026-08-02 12:07:11.167', '2026-08-02 12:07:11.167'),
('1b0f759d-352a-4300-ba96-d7ceda4a01f3', 'd83aa740-48fd-4372-9f4b-79309bc83485', 'ADDON:::Anniversary Topper', 70.00, NULL, '2026-09-18 07:45:53.616', '2026-09-18 07:45:53.616'),
('23585d1e-f0b6-4e58-8efa-a9cee7e4ce9d', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 'SIZE:::Serves 4-5', 820.00, NULL, '2026-08-02 12:12:46.012', '2026-08-02 12:12:46.012'),
('2af4ef8b-3eb7-41d6-8f18-2abdedc54b98', '998238da-3301-466c-b1d7-7b18e548028e', 'ADDON:::Anniversary Topper', 70.00, NULL, '2026-08-02 12:07:38.186', '2026-08-02 12:07:38.186'),
('2b0d775a-25f3-4015-a888-07d5856b302d', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 'SIZE:::500 Grams', 0.00, NULL, '2026-08-02 12:13:54.458', '2026-08-02 12:13:54.458'),
('2ff4a580-c4cc-4ccb-8f66-fb0bb3eece16', '7fedf44d-b02e-40be-8c61-fbf391215793', 'ADDON:::Birthday Topper', 70.00, NULL, '2026-08-02 12:07:11.167', '2026-08-02 12:07:11.167'),
('39c5ae2e-f899-41c0-9410-667eff92d536', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 'ADDON:::Make it Boozy', 70.00, NULL, '2026-08-02 12:12:46.012', '2026-08-02 12:12:46.012'),
('3fb26ca1-4044-4cb3-ad6a-a52050653821', '998238da-3301-466c-b1d7-7b18e548028e', 'SIZE:::1 Kg', 950.00, NULL, '2026-08-02 12:07:38.186', '2026-08-02 12:07:38.186'),
('4b92e55c-e387-4df5-be8b-1a238fca4966', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 'ADDON:::Anniversary Topper', 70.00, NULL, '2026-08-02 12:13:54.458', '2026-08-02 12:13:54.458'),
('5bea8bf5-0ba9-40b6-9553-4efb80a45389', '7fedf44d-b02e-40be-8c61-fbf391215793', 'SIZE:::1 Kg', 950.00, NULL, '2026-08-02 12:07:11.167', '2026-08-02 12:07:11.167'),
('5d22b609-36ca-4140-8559-d39246e65833', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 'ADDON:::Congratulations Topper', 70.00, NULL, '2026-08-02 12:13:54.458', '2026-08-02 12:13:54.458'),
('66118985-5f48-4b29-bbb1-fcd991db3214', '998238da-3301-466c-b1d7-7b18e548028e', 'ADDON:::Twisted Candles', 60.00, NULL, '2026-08-02 12:07:38.186', '2026-08-02 12:07:38.186'),
('70a508b2-5808-4dea-97a1-26fdde2f3213', '7fedf44d-b02e-40be-8c61-fbf391215793', 'ADDON:::Anniversary Topper', 70.00, NULL, '2026-08-02 12:07:11.167', '2026-08-02 12:07:11.167'),
('7885c28c-ab29-4aef-a0e3-7dba5aca24c4', '7dddc092-990f-4a51-8895-e6fcb89689fa', 'ADDON:::Birthday Topper', 70.00, NULL, '2026-08-02 12:07:45.337', '2026-08-02 12:07:45.337'),
('7e86d1c7-8560-4d0c-b0b5-d06da2597fed', 'd83aa740-48fd-4372-9f4b-79309bc83485', 'ADDON:::Twisted Candles', 60.00, NULL, '2026-09-18 07:45:53.616', '2026-09-18 07:45:53.616'),
('819c397f-b20e-4512-a131-5e800c195f6b', '998238da-3301-466c-b1d7-7b18e548028e', 'ADDON:::Birthday Topper', 70.00, NULL, '2026-08-02 12:07:38.186', '2026-08-02 12:07:38.186'),
('99f665c5-90fd-4cc2-9dba-c35ecb615345', 'd83aa740-48fd-4372-9f4b-79309bc83485', 'SIZE:::500 grams ', 0.00, NULL, '2026-09-18 07:45:53.616', '2026-09-18 07:45:53.616'),
('9b146d71-33f6-4aa0-bee9-086a01ef5fac', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 'SIZE:::1 Kg', 950.00, NULL, '2026-08-02 12:13:54.458', '2026-08-02 12:13:54.458'),
('9d4da43c-d0f2-4e00-a0c3-234aaf593d83', '4880a8dd-ce90-49e4-80bd-302e9d6904f5', 'SIZE:::Serves 1-2', 0.00, NULL, '2026-08-02 12:12:46.012', '2026-08-02 12:12:46.012'),
('9fecf553-4620-43d0-86b8-1e189a79dcfa', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 'ADDON:::Birthday Topper', 70.00, NULL, '2026-08-02 12:13:54.458', '2026-08-02 12:13:54.458'),
('a07e412b-4e6b-4554-af18-2e7f75cbe67d', 'e0ccbcfb-632f-4d3a-89a6-ab64318f0a61', 'ADDON:::Twisted Candles', 60.00, NULL, '2026-08-02 12:13:54.458', '2026-08-02 12:13:54.458'),
('b637954a-d4a6-49a5-91b6-0400b2163a08', '998238da-3301-466c-b1d7-7b18e548028e', 'ADDON:::Congratulations Topper', 70.00, NULL, '2026-08-02 12:07:38.186', '2026-08-02 12:07:38.186'),
('be3003c6-bc1e-4406-9b2d-26be22bd699d', '7dddc092-990f-4a51-8895-e6fcb89689fa', 'SIZE:::500 grams', 0.00, NULL, '2026-08-02 12:07:45.337', '2026-08-02 12:07:45.337'),
('c0d014f0-d06b-4699-baeb-2967d5560366', '7dddc092-990f-4a51-8895-e6fcb89689fa', 'SIZE:::1 kg', 950.00, NULL, '2026-08-02 12:07:45.337', '2026-08-02 12:07:45.337'),
('d4fc5c22-4c51-480e-a843-a28dd333510b', 'd83aa740-48fd-4372-9f4b-79309bc83485', 'ADDON:::Congratulations Topper', 70.00, NULL, '2026-09-18 07:45:53.616', '2026-09-18 07:45:53.616'),
('d5b40272-4c3e-4df9-863c-9277d92e06c7', '7dddc092-990f-4a51-8895-e6fcb89689fa', 'ADDON:::Congratulations Topper', 70.00, NULL, '2026-08-02 12:07:45.337', '2026-08-02 12:07:45.337'),
('d9b792a9-14bd-48f9-83b7-e5a8b59f04dd', 'd83aa740-48fd-4372-9f4b-79309bc83485', 'ADDON:::Birthday Topper', 70.00, NULL, '2026-09-18 07:45:53.616', '2026-09-18 07:45:53.616'),
('e358c1df-56f7-40ae-89ef-7e3b36bd5b8c', '7fedf44d-b02e-40be-8c61-fbf391215793', 'ADDON:::Congratulations Topper', 70.00, NULL, '2026-08-02 12:07:11.167', '2026-08-02 12:07:11.167'),
('ed28bba1-eda5-4dcd-bcc4-f6f1d75d29a8', '7dddc092-990f-4a51-8895-e6fcb89689fa', 'ADDON:::Anniversary Topper', 70.00, NULL, '2026-08-02 12:07:45.337', '2026-08-02 12:07:45.337'),
('f9b03197-dea8-42cc-aa9d-71a4158850c9', 'd83aa740-48fd-4372-9f4b-79309bc83485', 'SIZE:::1 Kg', 950.00, NULL, '2026-09-18 07:45:53.616', '2026-09-18 07:45:53.616'),
('fa3ab275-6e3e-4a04-aebd-2178e61300d5', '7dddc092-990f-4a51-8895-e6fcb89689fa', 'ADDON:::Twisted Candles', 60.00, NULL, '2026-08-02 12:07:45.337', '2026-08-02 12:07:45.337');

-- --------------------------------------------------------

--
-- Table structure for table `rate_limits`
--

CREATE TABLE `rate_limits` (
  `id` varchar(191) NOT NULL,
  `ip` varchar(191) NOT NULL,
  `action` varchar(191) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `firstAttempt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rate_limits`
--

INSERT INTO `rate_limits` (`id`, `ip`, `action`, `count`, `firstAttempt`, `updatedAt`) VALUES
('2642cd1c-a418-4489-a9c6-ca8997538a66', '106.222.211.113', 'admin_login', 0, '2026-07-29 16:01:23.740', '2026-07-29 16:01:23.741'),
('37a272e7-d408-466d-a5c9-9ab3f32e5520', '103.169.246.252', 'admin_login', 0, '2026-08-24 12:15:04.135', '2026-08-24 12:15:04.136'),
('38e38ab5-886d-498d-9ce8-61534e3c2a4c', '2405:201:4031:c0b7:444b:6941:7fbf:74e4', 'contact', 1, '2026-10-28 21:29:38.721', '2026-10-28 21:29:38.729'),
('51e04bdf-440f-41fb-91a1-9b29b9d9b184', '106.222.210.133', 'admin_login', 0, '2026-07-30 15:32:19.849', '2026-07-30 15:32:19.850'),
('543fc3c6-bc38-48a1-aff6-0bc1ce231865', '103.240.10.203', 'admin_login', 1, '2026-09-05 21:35:43.141', '2026-09-05 21:35:43.148'),
('57acb820-1015-42a4-8c49-d564a79e6c9d', '157.119.44.196', 'admin_login', 0, '2026-07-31 20:28:34.643', '2026-07-31 20:28:34.644'),
('5e9956e1-7ce1-461d-8d5e-d54ebab3efed', '103.38.68.90', 'admin_login', 0, '2026-07-30 16:09:17.212', '2026-07-30 16:09:17.213'),
('8f8765be-5a2c-4790-890e-63909ffabab5', '115.242.5.150', 'admin_login', 0, '2026-10-31 13:42:36.745', '2026-10-31 13:42:36.746'),
('9385a9e7-ce7a-46db-bcd1-770736dcaa55', '2401:4900:8553:7b22:85c2:94d3:1ebd:d7c9', 'contact', 1, '2026-08-14 16:20:37.877', '2026-08-14 16:20:37.890'),
('b155dcc0-a00e-419a-9ae7-02eadd3a7b4c', '150.242.24.34', 'admin_login', 0, '2026-09-19 23:27:25.507', '2026-09-19 23:27:25.507'),
('b2039f89-bfe8-46da-8c02-67e772570357', '103.230.149.152', 'admin_login', 0, '2026-08-02 12:05:29.010', '2026-08-02 12:05:29.011'),
('b5ca8893-6cd8-497d-8abd-5c9d9034015a', '202.179.79.181', 'admin_login', 0, '2026-07-31 21:09:24.455', '2026-07-31 21:09:24.456'),
('ba473721-3f84-4964-bed6-143fb257d838', '103.169.246.199', 'admin_login', 0, '2026-08-26 20:13:08.922', '2026-08-26 20:13:08.923'),
('f3bde8ce-70e3-40a0-974c-838e55e2f914', '14.139.125.231', 'admin_login', 0, '2026-10-31 13:00:10.998', '2026-10-31 13:00:10.999'),
('f5176310-bdb9-487a-8371-310e5baecf4d', '103.38.68.86', 'admin_login', 0, '2026-08-06 09:53:58.977', '2026-08-06 09:53:58.979');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone`, `created_at`, `updated_at`) VALUES
('005b1db4-a816-46fc-959d-5f6c6a402708', 'Ndj', 'Gj', 'h@gmail.com', '9664882222', '2026-10-30 07:20:26.544', '2026-10-30 07:20:26.544'),
('0bc963e8-0d41-4acb-971b-5c3eb941ed00', 'Maulik', 'Thakkar', 'thehiithouseindia@gmail.com', '9833737755', '2026-07-22 09:37:53.546', '2026-07-22 09:37:53.546'),
('0f509a41-a8ff-4bb2-98f1-1f7bedaa518d', 'Vrushali', 'Patil', 'vrushalipatil095@gmail.com', '9082676996', '2026-09-18 09:57:44.048', '2026-09-18 09:57:44.048'),
('151447cf-f65e-472d-b483-6f7c7d3dc6a4', 'Rhea', 'Dsouza', 'rheadsouza.07@gmail.com', '8291219767', '2026-07-23 06:22:27.957', '2026-07-23 06:22:27.957'),
('16c1589e-c59d-4faa-ac3a-140e08751aa9', 'Maaz', '.gmail.com', 'pingpong12d@gmail.com', '7039774380', '2026-07-22 20:16:18.698', '2026-07-29 16:05:53.256'),
('178af738-296d-4e3d-bf65-666c858ddb48', 'Akshaya', 'Bhanushali', 'akshayapurswani23@gmail.com', '9819096587', '2026-07-22 09:25:43.556', '2026-07-22 09:25:43.556'),
('1a5837eb-8f51-4140-a238-cacc04b2cb97', 'Chaudhary', 'Mujahid', 'mujahidchoudhry37@gmail.com', '8097077235', '2026-07-18 15:55:17.282', '2026-10-02 03:33:36.862'),
('231c483c-8dd4-4bbc-9cca-8b909c492eda', 'Raahi', 'Jain', 'raahi.giggles@gmail.com', '9833907171', '2026-07-27 14:57:50.166', '2026-07-27 14:57:50.166'),
('31b722d1-9f78-4de5-8341-4c415d4a52c4', 'Aryan', 'Yadav', 'aryanyadav2206@gmail.com', '9702119487', '2026-07-25 05:36:58.233', '2026-09-05 21:34:16.543'),
('324d2df4-2ff4-4ffd-a6f6-f739812804aa', 'Vibha', 'Alat', 'vibharalat@gmail.com', '9820773965', '2026-09-03 06:24:39.476', '2026-09-03 06:24:39.476'),
('325b6453-e61a-4789-afe6-cc9c2eaee7f7', 'At', 'At', 'ashathakkar1705@gmail.com', '9167900331', '2026-07-27 14:31:21.809', '2026-07-27 14:31:21.809'),
('3e5c4366-396c-4224-b521-47382107f5ba', 'IRSHAD', 'SHAIKH', 'irshad.diplomatic@gmail.com', '8779228196', '2026-07-18 19:56:45.689', '2026-07-18 19:56:45.689'),
('47a93573-02ee-409d-91d1-243d462b23f7', 'Priyanka', 'Patel', 'devarshmin@gmail.com', '9920158015', '2026-08-08 07:20:06.273', '2026-08-11 06:16:15.162'),
('5a287fa7-4c50-4cce-b431-8bb96499623e', 'bhh', 'iuui', 'abc@gmail.com', '9876543456', '2026-07-18 19:30:31.731', '2026-09-06 17:59:59.553'),
('638bbd07-adb2-41b2-9eff-545f34d12cc8', 'Saif', 'Shaikh', 'zaydm16@gmail.com', '9664637796', '2026-07-23 01:21:34.405', '2026-07-23 01:35:06.917'),
('63ec6fb4-11d4-4277-bab5-1b0fcefbbe4b', 'Sahil', 'shaikh', 'sahilshaikhofficial35@gmail.com', '9321468157', '2026-07-22 18:05:53.425', '2026-07-22 18:05:53.425'),
('64b7933f-dc60-4527-832b-7d8abbfc3fa2', 'Anirudh', 'Wattamwar', 'anirudhtpamail@gmail.com', '8498021172', '2026-08-03 03:17:46.477', '2026-08-03 03:17:46.477'),
('65169bef-2351-41af-b097-f0d3940e9615', 'Nimisha', 'Salvi', 'chavannimisha1696@gmail.com', '9619763236', '2026-07-22 10:42:30.483', '2026-07-22 10:42:56.972'),
('68d68b34-c98c-4f57-8f9d-7b190716baa5', 'Ye', 'Ye', 'bhaumiksamala@gmail.com', '9870190753', '2026-07-27 15:18:09.010', '2026-07-31 21:59:26.847'),
('6d29aaf6-d689-4320-96fd-4edb7f7fc0b2', 'Mini', 'Jain', 'mini_jain1@yahoo.com', '9773410409', '2026-07-27 15:06:57.616', '2026-07-27 15:06:57.616'),
('71b12a41-66d2-41ea-ac79-cf8bdbb2d169', 'Asha', 'Thakkar', 'asha.socialbay@gmail.com', '9167900331', '2026-07-19 18:45:30.996', '2026-07-27 14:51:22.590'),
('75853ee3-b8a9-4a74-812f-668e7e40f8aa', 'maaz', 'q', 'maazqureshi006@gmail.com', '7039774350', '2026-07-18 18:04:43.392', '2026-09-06 17:59:47.216'),
('76dd07aa-5f94-4c1f-874d-1ce0342df8d8', 'Sachin', 'Chand', 'sachinthakur18177@gmail.com', '9892756355', '2026-07-28 07:54:10.291', '2026-07-28 07:55:13.114'),
('7c33afbe-c547-481c-883a-d38d6a36ee0d', 'Jeet', 'makwana', 'jeetmakwana100@gmail.com', '9326163068', '2026-07-23 11:17:58.647', '2026-07-23 11:17:58.647'),
('7de1ef00-4f44-440f-bc3b-7db12beebdfe', 'Kunal', 'Kundal', 'kunalkundal1995@gmail.com', '9820333990', '2026-07-24 20:16:53.211', '2026-07-24 20:16:53.211'),
('80dd667b-9ff3-4941-a450-c3ba9e616c6d', 'Saquib', 'd', 'ryumashimotsuki86@gmail.com', '0909090909', '2026-07-22 18:31:36.044', '2026-07-22 18:31:36.044'),
('901f8aed-5382-4cad-8f1b-22c1d3977559', 'Khushboo', 'Agarwal', 'goradiakhushboo@gmail.com', '9699571715', '2026-09-11 19:51:16.817', '2026-09-11 19:51:16.817'),
('9290b9d6-f155-46fd-bfc3-aee836d86909', 'assd', 'assd', 'cipiwob844@crsay.com', '7672972972', '2026-07-19 17:03:43.238', '2026-07-19 17:08:31.781'),
('af90a053-8692-4f22-9ae1-42e1101b4589', 'Vijayalaxmi', 'Dharap', 'vijudharap@gmail.com', '9820040695', '2026-07-25 05:56:13.351', '2026-08-11 07:22:16.513'),
('bb832641-8b2a-4027-9d1e-a8496c51c7f4', 'Naseer', 'Hakeem', 'hakim.nasser4@gmail.com', '7738288589', '2026-07-22 08:24:33.837', '2026-07-22 08:24:33.837'),
('c54c6d9d-aad9-4b72-8948-85387b46674b', 'Jay', 'Daniel', 'thirutupayajay@gmail.com', '9773929251', '2026-09-19 05:13:23.932', '2026-09-19 05:13:23.932'),
('d136ca9c-d5ef-44d9-b46f-ee12c627c285', 'Jay', 'Daniel', 'jay_dany@yahoo.co.uk', '9773929251', '2026-10-07 04:15:16.420', '2026-10-07 04:15:16.420'),
('d9131106-8d8c-434c-baed-a465f5a180e7', 'Krish', 'Katariya', 'katariyakrish97@gmail.com', '7208764386', '2026-08-04 13:45:54.863', '2026-08-04 13:45:54.863'),
('dc23128f-6967-439d-8f40-b96659dc44a7', 'Ryuma', 'S', 'abc@xyz.com', '0909090909', '2026-07-19 17:49:20.507', '2026-07-31 21:37:42.772'),
('e1064137-0eee-44e2-9230-75b6550acf5a', 'YESHA', 'SANGHAVI', 'yesha999@gmail.com', '9820600112', '2026-08-25 12:35:52.493', '2026-08-25 12:35:52.493'),
('e2742fe3-bbd1-44b4-aba2-39930c1b20b4', 'Aetee\'s', 'Bakehouse', 'aeteesbakehouse@gmail.com', '8097077235', '2026-07-18 15:47:36.347', '2026-09-05 21:36:27.765'),
('e8a36223-f134-4588-b219-03d575bd1d09', 'Lokeshh', 'Vyas', 'lokeshcreative@gmail.com', '9920264009', '2026-08-08 06:40:35.305', '2026-08-08 06:40:35.305'),
('e8d67682-c2af-486d-bbab-5c1614e2107c', 'Ye', 'Ye', 'abc@gmail.con', '9870190753', '2026-07-26 21:06:30.911', '2026-07-28 03:08:40.747'),
('fbf8f6d4-85f5-4a68-ace5-6094c1c21c1d', 'aoaickasic', 'xsocasoicj', 'saoxisj@gmail.com', '0987654322', '2026-07-31 21:56:47.767', '2026-07-31 21:56:47.767'),
('ff7591d5-f14f-4b4c-a8b7-70f218ece33e', 'Sakshi', 'Doshi', 'sakhid21@gmail.com', '8080404055', '2026-07-22 18:40:39.963', '2026-07-22 18:43:04.423');

-- --------------------------------------------------------

--
-- Table structure for table `_FilterTagToProduct`
--

CREATE TABLE `_FilterTagToProduct` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_user_id_fkey` (`user_id`);

--
-- Indexes for table `blocked_dates`
--
ALTER TABLE `blocked_dates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blocked_dates_date_key` (`date`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `filter_tags`
--
ALTER TABLE `filter_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `filter_tags_name_key` (`name`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_razorpay_order_id_key` (`razorpay_order_id`),
  ADD UNIQUE KEY `orders_razorpay_payment_id_key` (`razorpay_payment_id`),
  ADD KEY `orders_status_idx` (`status`),
  ADD KEY `orders_created_at_idx` (`created_at`),
  ADD KEY `orders_user_id_status_created_at_idx` (`user_id`,`status`,`created_at`),
  ADD KEY `orders_delivery_date_status_created_at_idx` (`delivery_date`,`status`,`created_at`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_fkey` (`order_id`),
  ADD KEY `order_items_product_id_fkey` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_is_featured_idx` (`is_featured`),
  ADD KEY `products_is_best_seller_idx` (`is_best_seller`),
  ADD KEY `products_is_sold_out_idx` (`is_sold_out`),
  ADD KEY `products_sort_order_idx` (`sort_order`),
  ADD KEY `products_category_id_fkey` (`category_id`);

--
-- Indexes for table `product_options`
--
ALTER TABLE `product_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_options_product_id_fkey` (`product_id`);

--
-- Indexes for table `rate_limits`
--
ALTER TABLE `rate_limits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rate_limits_ip_action_key` (`ip`,`action`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indexes for table `_FilterTagToProduct`
--
ALTER TABLE `_FilterTagToProduct`
  ADD UNIQUE KEY `_FilterTagToProduct_AB_unique` (`A`,`B`),
  ADD KEY `_FilterTagToProduct_B_index` (`B`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product_options`
--
ALTER TABLE `product_options`
  ADD CONSTRAINT `product_options_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_FilterTagToProduct`
--
ALTER TABLE `_FilterTagToProduct`
  ADD CONSTRAINT `_FilterTagToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `filter_tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_FilterTagToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
