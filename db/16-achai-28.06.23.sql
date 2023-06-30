-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 28/06/2023 às 22:25
-- Versão do servidor: 10.5.20-MariaDB
-- Versão do PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `id20948450_achai`
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
  `icon_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `categories`
--

INSERT INTO `categories` (`id`, `name`, `icon_name`) VALUES
(88, 'Eletrônicos', 'headphones_FILL0_wght300_GRAD0_opsz40.svg'),
(89, 'Garrafas', 'water_bottle_FILL0_wght300_GRAD0_opsz40.svg'),
(90, 'Guarda-chuvas', 'umbrella_FILL0_wght300_GRAD0_opsz40.svg'),
(91, 'Todas', 'list_FILL0_wght300_GRAD0_opsz40.svg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `reserved`
--

CREATE TABLE `reserved` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `thing_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `reserved`
--

INSERT INTO `reserved` (`id`, `date`, `thing_id`) VALUES
(64, '2023-06-18 07:23:27', 190),
(65, '2023-06-18 07:23:31', 185),
(66, '2023-06-18 07:23:34', 187),
(67, '2023-06-18 07:23:37', 195),
(68, '2023-06-18 07:23:39', 184),
(69, '2023-06-18 07:23:42', 198),
(70, '2023-06-18 07:23:45', 199),
(71, '2023-06-18 07:23:53', 192),
(72, '2023-06-18 07:23:56', 189),
(73, '2023-06-18 19:48:32', 200),
(74, '2023-06-18 19:55:33', 200),
(75, '2023-06-18 19:56:55', 200),
(76, '2023-06-18 20:00:12', 200),
(77, '2023-06-18 21:01:57', 200),
(78, '2023-06-18 21:08:27', 201),
(79, '2023-06-18 21:16:44', 201),
(80, '2023-06-18 21:45:00', 200),
(81, '2023-06-18 22:16:41', 201),
(82, '2023-06-18 22:19:33', 201),
(83, '2023-06-18 22:20:33', 201),
(84, '2023-06-18 22:22:26', 200),
(85, '2023-06-18 22:25:51', 201),
(86, '2023-06-18 22:31:11', 200),
(87, '2023-06-18 22:48:27', 207),
(88, '2023-06-18 22:50:04', 206),
(89, '2023-06-18 22:53:54', 200),
(90, '2023-06-18 22:56:47', 205),
(91, '2023-06-18 23:03:40', 204),
(92, '2023-06-25 16:57:54', 208),
(93, '2023-06-25 16:57:57', 211),
(94, '2023-06-28 00:44:22', 212);

-- --------------------------------------------------------

--
-- Estrutura para tabela `returned`
--

CREATE TABLE `returned` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `thing_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `returned`
--

INSERT INTO `returned` (`id`, `date`, `thing_id`) VALUES
(32, '2023-06-18 07:36:42', 199),
(33, '2023-06-18 07:36:47', 189),
(34, '2023-06-18 07:36:51', 190),
(35, '2023-06-18 21:44:48', 201);

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
-- Despejando dados para a tabela `things`
--

INSERT INTO `things` (`id`, `description`, `local`, `date`, `returned_status`, `reserved_status`, `category_id`, `image_address`) VALUES
(212, 'notebook preto', 'Sala 00', '2023-06-27 23:28:15', 0, 1, 88, 'api/assets/imgs/29ae32c1f5eede2892a6350d5f4da707.jpeg'),
(213, 'notebook preto', 'Sala 00', '2023-06-27 23:28:15', 0, 0, 88, 'api/assets/imgs/cd0ee5753a035a2024d17c5b0850fd15.jpeg'),
(214, 'Monitor distorcido ', 'quarto', '2023-06-28 01:18:54', 0, 0, 88, 'api/assets/imgs/1bee379a1ceeb2d3849972ae224df19b.png'),
(215, 'Teclado', 'Casa Douglas', '2023-06-28 12:29:44', 0, 0, 88, 'api/assets/imgs/a631659dfd707b66cbc3abb66b6072e7.png'),
(216, 'Óculos de grau', 'Aerolândia', '2023-06-28 12:56:50', 0, 0, 88, 'api/assets/imgs/976832f6e5ddb7adaf92b7bcf7864716.png');

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT de tabela `reserved`
--
ALTER TABLE `reserved`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT de tabela `returned`
--
ALTER TABLE `returned`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de tabela `things`
--
ALTER TABLE `things`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT de tabela `zips`
--
ALTER TABLE `zips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
