-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 30 Jan 2021 pada 04.53
-- Versi Server: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `telegram_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `friends`
--

CREATE TABLE `friends` (
  `userId` varchar(150) DEFAULT NULL,
  `friendId` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `friends`
--

INSERT INTO `friends` (`userId`, `friendId`) VALUES
('afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32'),
('df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3'),
('afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587'),
('b7014f84-2d4b-4928-986d-087f14629587', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3'),
('d731e093-ec5c-4344-ac61-70f8ec5ead23', 'b2c2dd70-c3aa-47eb-b2a6-dfc9f66409d1'),
('b2c2dd70-c3aa-47eb-b2a6-dfc9f66409d1', 'd731e093-ec5c-4344-ac61-70f8ec5ead23'),
('d731e093-ec5c-4344-ac61-70f8ec5ead23', '8bfdabd2-ffc6-41a6-81fd-e79499a2dee0');

-- --------------------------------------------------------

--
-- Struktur dari tabel `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `userSenderId` varchar(150) DEFAULT NULL,
  `userReceiverId` varchar(150) DEFAULT NULL,
  `message` text,
  `photo` varchar(150) DEFAULT NULL,
  `messageStatus` int(2) DEFAULT NULL,
  `time` varchar(50) NOT NULL,
  `visibleTo` varchar(150) DEFAULT 'BOTH',
  `createdAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `messages`
--

INSERT INTO `messages` (`id`, `userSenderId`, `userReceiverId`, `message`, `photo`, `messageStatus`, `time`, `visibleTo`, `createdAt`) VALUES
(267, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'halo messi', NULL, 1, '2:56 PM', 'BOTH', '2021-01-25 07:56:39'),
(268, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'halo', NULL, 1, '2:57 PM', 'BOTH', '2021-01-25 07:57:56'),
(269, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'iya mes', NULL, 1, '2:58 PM', 'BOTH', '2021-01-25 07:58:02'),
(270, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', NULL, 'http://localhost:3000/photo/photo-1611561494479.png', 1, '2:58 PM', 'BOTH', '2021-01-25 07:58:14'),
(271, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'dahar moal ?', NULL, 1, '2:58 PM', 'BOTH', '2021-01-25 07:58:17'),
(272, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'dimana ? ', NULL, 1, '2:58 PM', 'BOTH', '2021-01-25 07:58:24'),
(273, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'erek atuh skuy padangkeun', NULL, 1, '2:58 PM', 'BOTH', '2021-01-25 07:58:32'),
(274, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'otw ??', NULL, 1, '2:59 PM', 'BOTH', '2021-01-25 07:59:16'),
(275, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'sipss', NULL, 1, '2:59 PM', 'BOTH', '2021-01-25 07:59:22'),
(276, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'hayu diman akeneh?', NULL, 1, '2:59 PM', 'BOTH', '2021-01-25 07:59:38'),
(277, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'kalem kalem', NULL, 1, '2:59 PM', 'BOTH', '2021-01-25 07:59:46'),
(278, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awdawd', NULL, 1, '2:59 PM', 'BOTH', '2021-01-25 07:59:56'),
(279, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awd', NULL, 1, '2:59 PM', 'BOTH', '2021-01-25 07:59:56'),
(280, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:00 PM', 'BOTH', '2021-01-25 08:00:10'),
(281, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awda', NULL, 1, '3:00 PM', 'BOTH', '2021-01-25 08:00:10'),
(282, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'wd', NULL, 1, '3:00 PM', 'BOTH', '2021-01-25 08:00:10'),
(283, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awd', NULL, 1, '3:00 PM', 'BOTH', '2021-01-25 08:00:31'),
(284, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awd', NULL, 1, '3:00 PM', 'BOTH', '2021-01-25 08:00:37'),
(285, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awd', NULL, 1, '3:00 PM', 'BOTH', '2021-01-25 08:00:37'),
(286, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awd', NULL, 1, '3:00 PM', 'BOTH', '2021-01-25 08:00:38'),
(287, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awda', NULL, 1, '3:00 PM', 'BOTH', '2021-01-25 08:00:39'),
(288, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'dw', NULL, 1, '3:00 PM', 'BOTH', '2021-01-25 08:00:40'),
(289, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awd', NULL, 1, '3:00 PM', 'BOTH', '2021-01-25 08:00:42'),
(290, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'kalem', NULL, 1, '3:01 PM', 'BOTH', '2021-01-25 08:01:31'),
(291, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'heeh', NULL, 1, '3:01 PM', 'BOTH', '2021-01-25 08:01:34'),
(292, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', NULL, 'http://localhost:3000/photo/photo-1611561719985.jpg', 1, '3:01 PM', 'BOTH', '2021-01-25 08:02:00'),
(293, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awda', NULL, 1, '3:06 PM', 'BOTH', '2021-01-25 08:06:43'),
(294, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'wd', NULL, 1, '3:06 PM', 'BOTH', '2021-01-25 08:06:44'),
(295, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'aw', NULL, 1, '3:06 PM', 'BOTH', '2021-01-25 08:06:44'),
(296, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awdaw\\', NULL, 1, '3:07 PM', 'BOTH', '2021-01-25 08:07:06'),
(297, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'aw', NULL, 1, '3:07 PM', 'BOTH', '2021-01-25 08:07:07'),
(298, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awdaw', NULL, 1, '3:07 PM', 'BOTH', '2021-01-25 08:07:28'),
(299, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'daw', NULL, 1, '3:07 PM', 'BOTH', '2021-01-25 08:07:28'),
(300, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awd', NULL, 1, '3:07 PM', 'BOTH', '2021-01-25 08:07:31'),
(301, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'aw', NULL, 1, '3:08 PM', 'BOTH', '2021-01-25 08:08:52'),
(302, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'awd', NULL, 1, '3:09 PM', 'BOTH', '2021-01-25 08:09:05'),
(303, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:09 PM', 'BOTH', '2021-01-25 08:09:32'),
(304, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awd', NULL, 1, '3:12 PM', 'BOTH', '2021-01-25 08:12:42'),
(305, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'woy gef', NULL, 1, '3:12 PM', 'BOTH', '2021-01-25 08:12:47'),
(306, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:13 PM', 'BOTH', '2021-01-25 08:13:03'),
(307, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awd', NULL, 1, '3:14 PM', 'BOTH', '2021-01-25 08:14:12'),
(308, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:14 PM', 'BOTH', '2021-01-25 08:14:17'),
(309, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'kumaha damang?', NULL, 1, '3:14 PM', 'BOTH', '2021-01-25 08:14:25'),
(310, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:14 PM', 'BOTH', '2021-01-25 08:14:51'),
(311, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'adw', NULL, 1, '3:15 PM', 'BOTH', '2021-01-25 08:15:12'),
(312, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:15 PM', 'BOTH', '2021-01-25 08:15:19'),
(313, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'halo', NULL, 1, '3:16 PM', 'BOTH', '2021-01-25 08:16:25'),
(314, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'woy', NULL, 1, '3:17 PM', 'BOTH', '2021-01-25 08:17:32'),
(315, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'enya?', NULL, 1, '3:17 PM', 'BOTH', '2021-01-25 08:17:37'),
(316, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'aw', NULL, 1, '3:17 PM', 'BOTH', '2021-01-25 08:17:42'),
(317, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'jang', NULL, 1, '3:17 PM', 'BOTH', '2021-01-25 08:17:52'),
(318, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'jang', NULL, 1, '3:18 PM', 'BOTH', '2021-01-25 08:18:00'),
(319, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awd', NULL, 0, '3:19 PM', 'BOTH', '2021-01-25 08:19:15'),
(320, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'qweqwe', NULL, 1, '3:19 PM', 'BOTH', '2021-01-25 08:19:20'),
(321, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:19 PM', 'BOTH', '2021-01-25 08:19:50'),
(322, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awdawd', NULL, 1, '3:20 PM', 'BOTH', '2021-01-25 08:20:52'),
(323, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awdaw', NULL, 1, '3:21 PM', 'BOTH', '2021-01-25 08:21:01'),
(324, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:21 PM', 'BOTH', '2021-01-25 08:21:16'),
(325, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awdaw', NULL, 1, '3:22 PM', 'BOTH', '2021-01-25 08:22:56'),
(326, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:23 PM', 'BOTH', '2021-01-25 08:23:38'),
(327, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awda', NULL, 1, '3:23 PM', 'BOTH', '2021-01-25 08:23:48'),
(328, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'adwawd', NULL, 1, '3:24 PM', 'BOTH', '2021-01-25 08:24:12'),
(329, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:24 PM', 'BOTH', '2021-01-25 08:24:18'),
(330, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'ulin moal euy?', NULL, 1, '3:24 PM', 'BOTH', '2021-01-25 08:24:31'),
(331, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'kumaha jang daek moal?', NULL, 1, '3:25 PM', 'BOTH', '2021-01-25 08:25:50'),
(332, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:26 PM', 'BOTH', '2021-01-25 08:26:10'),
(333, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'kumaha', NULL, 1, '3:27 PM', 'BOTH', '2021-01-25 08:27:04'),
(334, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'kumahaaa', NULL, 1, '3:27 PM', 'BOTH', '2021-01-25 08:27:10'),
(335, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:28 PM', 'BOTH', '2021-01-25 08:28:21'),
(336, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'b7014f84-2d4b-4928-986d-087f14629587', 'awdawd', NULL, 0, '3:28 PM', 'BOTH', '2021-01-25 08:28:31'),
(337, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:28 PM', 'BOTH', '2021-01-25 08:28:35'),
(338, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awdawd', NULL, 1, '3:28 PM', 'BOTH', '2021-01-25 08:28:55'),
(339, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awdawd', NULL, 1, '3:29 PM', 'BOTH', '2021-01-25 08:29:01'),
(340, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awd', NULL, 1, '3:30 PM', 'BOTH', '2021-01-25 08:30:40'),
(341, 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'awdawd', NULL, 1, '3:31 PM', 'BOTH', '2021-01-25 08:31:21'),
(342, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'awdaw', NULL, 0, '6:30 PM', 'BOTH', '2021-01-25 11:30:43'),
(343, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'awd', NULL, 0, '6:30 PM', 'BOTH', '2021-01-25 11:30:43'),
(344, 'afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'df91291d-e25e-49af-97a9-2ba21c8d4b32', 'aw', NULL, 0, '6:30 PM', 'BOTH', '2021-01-25 11:30:43'),
(345, 'd731e093-ec5c-4344-ac61-70f8ec5ead23', 'b2c2dd70-c3aa-47eb-b2a6-dfc9f66409d1', 'Hello neymar, how are you ?', NULL, 1, '10:24 PM', 'BOTH', '2021-01-29 15:24:04'),
(347, 'b2c2dd70-c3aa-47eb-b2a6-dfc9f66409d1', 'd731e093-ec5c-4344-ac61-70f8ec5ead23', 'I\'m fine my friend, how about you? ?', NULL, 1, '10:25 PM', 'BOTH', '2021-01-29 15:25:36'),
(348, 'd731e093-ec5c-4344-ac61-70f8ec5ead23', 'b2c2dd70-c3aa-47eb-b2a6-dfc9f66409d1', ' I\'m fine too, by the way, how was your match with psg? I see you still continue to be a football star ?', NULL, 1, '10:29 PM', 'BOTH', '2021-01-29 15:29:52'),
(349, 'b2c2dd70-c3aa-47eb-b2a6-dfc9f66409d1', 'd731e093-ec5c-4344-ac61-70f8ec5ead23', 'oh yes, I always give the best for my club ?', NULL, 1, '10:31 PM', 'BOTH', '2021-01-29 15:31:22'),
(350, 'd731e093-ec5c-4344-ac61-70f8ec5ead23', 'b2c2dd70-c3aa-47eb-b2a6-dfc9f66409d1', 'wow I can\'t wait to compete with you again my friend, wait for me in the champions league ?', NULL, 1, '10:32 PM', 'BOTH', '2021-01-29 15:32:22'),
(351, 'd731e093-ec5c-4344-ac61-70f8ec5ead23', 'b2c2dd70-c3aa-47eb-b2a6-dfc9f66409d1', NULL, 'http://localhost:3000/photo/photo-1611936573020.gif', 1, '11:09 PM', 'BOTH', '2021-01-29 16:09:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` varchar(150) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  `photoProfile` varchar(150) DEFAULT NULL,
  `emailVerification` int(1) DEFAULT '0',
  `status` varchar(10) DEFAULT 'offline',
  `idMessage` varchar(50) DEFAULT NULL,
  `currentLocation` varchar(200) DEFAULT NULL,
  `bio` text,
  `roleId` int(1) DEFAULT '0',
  `createdAt` varchar(50) NOT NULL,
  `updatedAt` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `phoneNumber`, `password`, `photoProfile`, `emailVerification`, `status`, `idMessage`, `currentLocation`, `bio`, `roleId`, `createdAt`, `updatedAt`) VALUES
('8bfdabd2-ffc6-41a6-81fd-e79499a2dee0', NULL, 'dedededeee', 'dede@gmail.com', 'qweqw', '$2b$10$AdGAk4qPcJKqMsiSnJf3IO7ESFfw3j7lRvBjuuDV/f4zVWRMRPQ3O', NULL, 0, 'offline', NULL, '{\"lat\":-6.9174638999999996,\"lng\":107.61912280000001,\"altitude\":null,\"altitudeAccuracy\":null,\"accuracy\":62955}', 'Hey there! I am using Lon-Chat', 0, '2021-01-29 19:24:40.398', '2021-01-29 19:35:23.783'),
('afefa8b9-abbd-4dbb-8a5f-1e53286665f3', 'gefy aqiilah', 'jhon Doeye', 'gefyaqiilah26@gmail.com', '08124567823', '$2b$10$vqgfeHBIhTd3glDAT2YUsupFMbZo7Z03BQhbkecOXibMoKiwimkGa', 'http://localhost:3000/photo/photoProfile-1611400430627.jpg', 0, 'online', NULL, '{\"lat\":-6.9174638999999996,\"lng\":107.61912280000001,\"altitude\":null,\"altitudeAccuracy\":null,\"accuracy\":67547}', 'sang pembantai', 0, '2021-01-23 10:05:14.787', '2021-01-25 15:16:18.982'),
('b2c2dd70-c3aa-47eb-b2a6-dfc9f66409d1', 'neymar junior', 'neymar', 'neymar@gmail.com', '082746789876', '$2b$10$m02ROJBQZW3ikWOMlae5Pe.FpNQUY2wMwpda5ZVEQPrmBD0teS7gq', 'http://localhost:3000/photo/photoProfile-1611933764497.jpg', 0, 'offline', NULL, '{\"lat\":-7.061409,\"lng\":107.497876,\"altitude\":null,\"altitudeAccuracy\":null,\"accuracy\":500}', 'PSG Player', 0, '2021-01-29 22:20:00.844', '2021-01-29 22:23:05.036'),
('b7014f84-2d4b-4928-986d-087f14629587', 'alexander', 'Alexander', 'gefybullnerd@gmail.com', '03216548', '$2b$10$nyELtNnpgJO0ggeeAoouhuCzQ12kUSJaBOGV8odlgWktbcydLQoxS', 'http://localhost:3000/photo/photoProfile-1611371882129.jpg', 0, 'offline', NULL, '{\"lat\":-7.066825199999999,\"lng\":107.4913605,\"altitude\":null,\"altitudeAccuracy\":null,\"accuracy\":1497}', 'sang pemalu', 0, '2021-01-23 10:14:23.889', '2021-01-25 08:47:49.519'),
('d731e093-ec5c-4344-ac61-70f8ec5ead23', 'suarez9', 'suarez', 'suarez@gmail.com', '08212382912', '$2b$10$JlS6jvulqWywu/Mdb9d1GeKdccfwEFEILEomIOQgtnXjefSyMk9yy', 'http://localhost:3000/photo/photoProfile-1611933716753.jpg', 0, 'online', NULL, '{\"lat\":-7.061409,\"lng\":107.497876,\"altitude\":null,\"altitudeAccuracy\":null,\"accuracy\":500}', 'Barcelona Player', 0, '2021-01-29 22:19:43.359', '2021-01-30 06:55:54.672'),
('df91291d-e25e-49af-97a9-2ba21c8d4b32', 'messi10', 'Lionel Andres Messi', 'messi@gmail.com', '08215467', '$2b$10$6Pt.WXAuBrIxQzEZiEnq4OX5isfaFk25gg8bCXw.EchCGbcIsWkta', 'http://localhost:3000/photo/photoProfile-1611390015766.jpg', 0, 'offline', NULL, '{\"lat\":-6.9174638999999996,\"lng\":107.61912280000001,\"altitude\":null,\"altitudeAccuracy\":null,\"accuracy\":62955}', 'Barcelona Player', 0, '2021-01-23 11:31:41.174', '2021-01-29 19:25:03.829');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD KEY `friendId` (`friendId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receiver` (`userReceiverId`),
  ADD KEY `sender` (`userSenderId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=352;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friendId` FOREIGN KEY (`friendId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `receiver` FOREIGN KEY (`userReceiverId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sender` FOREIGN KEY (`userSenderId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
