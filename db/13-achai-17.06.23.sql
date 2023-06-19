-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17/06/2023 às 23:45
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `achai`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(320) DEFAULT NULL,
  `hash` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `admins`
--

INSERT INTO `admins` (`id`, `user`, `password`, `email`, `hash`) VALUES
(7, 'carlos', '202cb962ac59075b964b07152d234b70', 'douglas2570@gmail.com', 'A0E812B01BFC8E2417C254A074DF599D');

-- --------------------------------------------------------

--
-- Estrutura para tabela `categories`
--

CREATE TABLE `categories` (
  `id` int(10) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `image_address` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `categories`
--

INSERT INTO `categories` (`id`, `name`, `image_address`) VALUES
(88, 'Eletrônicos', 'assets/imgs/simbolos.png'),
(89, 'Escritório', 'assets/imgs/simbolos.png'),
(90, 'Garrafas', 'assets/imgs/simbolos.png'),
(91, 'Outros', 'assets/imgs/simbolos.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `reserved`
--

CREATE TABLE `reserved` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `thing_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `returned`
--

CREATE TABLE `returned` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `thing_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `things`
--

CREATE TABLE `things` (
  `id` int(10) NOT NULL,
  `description` text DEFAULT NULL,
  `local` varchar(100) DEFAULT NULL,
  `date` timestamp NULL DEFAULT current_timestamp(),
  `returned_status` tinyint(1) DEFAULT 0,
  `reserved_status` tinyint(1) DEFAULT 0,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `image_address` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Acionadores `things`
--
DELIMITER $$
CREATE TRIGGER `after_trings_update_reserved_filed` AFTER UPDATE ON `things` FOR EACH ROW BEGIN
    IF OLD.reserved_status = 0 AND NEW.reserved_status = 1 THEN
        INSERT INTO reserved
		SET date =  NOW(), thing_id = OLD.id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_trings_update_returned_filed` AFTER UPDATE ON `things` FOR EACH ROW BEGIN
    IF NEW.returned_status = 1 AND OLD.returned_status = 0 THEN
        INSERT INTO returned
		SET date = NOW(), thing_id = OLD.id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `zips`
--

CREATE TABLE `zips` (
  `id` int(11) NOT NULL,
  `file_address` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `reserved`
--
ALTER TABLE `reserved`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `returned`
--
ALTER TABLE `returned`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `things`
--
ALTER TABLE `things`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `zips`
--
ALTER TABLE `zips`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de tabela `reserved`
--
ALTER TABLE `reserved`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de tabela `returned`
--
ALTER TABLE `returned`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `things`
--
ALTER TABLE `things`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT de tabela `zips`
--
ALTER TABLE `zips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
