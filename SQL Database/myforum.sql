-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2023 at 03:57 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myforum`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `Timestamp` varchar(255) DEFAULT NULL,
  `Comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes_per_comment`
--

CREATE TABLE `likes_per_comment` (
  `ID` int(11) NOT NULL,
  `CommentID` int(11) NOT NULL,
  `UsersWhoLiked` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(1000) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Salt` varchar(255) NOT NULL,
  `Level` tinyint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userId` (`UserID`),
  ADD KEY `categoryId` (`CategoryID`);

--
-- Indexes for table `likes_per_comment`
--
ALTER TABLE `likes_per_comment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `commentId` (`CommentID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes_per_comment`
--
ALTER TABLE `likes_per_comment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
