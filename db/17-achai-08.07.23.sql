-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 09/07/2023 às 01:50
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
(7, 'douglas2570@gmail.com', '5649b74a2b26ee6b41a5a9c2effacd44', 'douglas2570@gmail.com', 'A0E812B01BFC8E2417C254A074DF599D');

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
(91, 'Todas', 'list_FILL0_wght300_GRAD0_opsz40.svg'),
(102, 'Papelaria', 'none'),
(103, 'Vestíveis', 'none'),
(104, 'Outros', 'none'),
(105, 'Ver todos', 'none'),
(106, 'Bijuterias', NULL);

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
(94, '2023-06-28 00:44:22', 212),
(95, '2023-07-02 20:48:17', 215),
(96, '2023-07-02 21:03:17', 217),
(97, '2023-07-08 08:29:40', 216),
(98, '2023-07-08 14:06:36', 218),
(99, '2023-07-08 17:02:26', 222),
(100, '2023-07-08 17:02:29', 223),
(101, '2023-07-08 17:02:31', 224),
(102, '2023-07-08 17:02:34', 225),
(103, '2023-07-08 17:02:37', 226),
(104, '2023-07-08 17:02:40', 227),
(105, '2023-07-08 17:24:15', 222),
(106, '2023-07-08 17:24:19', 223);

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
(35, '2023-06-18 21:44:48', 201),
(36, '2023-07-02 21:03:41', 217);

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
(222, 'sadsd', 'asdsdas', '2023-07-08 19:56:16', 0, 1, 104, 'api/assets/imgs/6864162a0a62923dffa1cf672701b293.png'),
(223, 'sadsd', 'asdsdas', '2023-07-08 19:56:16', 0, 1, 103, 'api/assets/imgs/6864162a0a62923dffa1cf672701b293.png'),
(224, 'sadsd', 'asdsdas', '2023-07-08 19:56:16', 0, 0, 102, 'api/assets/imgs/6864162a0a62923dffa1cf672701b293.png'),
(225, 'sadsd', 'asdsdas', '2023-07-08 19:56:16', 0, 0, 90, 'api/assets/imgs/6864162a0a62923dffa1cf672701b293.png'),
(226, 'sadsd', 'asdsdas', '2023-07-08 19:56:16', 0, 0, 88, 'api/assets/imgs/6864162a0a62923dffa1cf672701b293.png'),
(227, 'sadsd', 'asdsdas', '2023-07-08 19:56:16', 0, 0, 89, 'api/assets/imgs/6864162a0a62923dffa1cf672701b293.png'),
(228, 'sdf', 'sdf', '2023-07-08 23:14:25', 0, 0, 88, 'api/assets/imgs/4808583941beeeb74cdf71ca67ec21f2.png');

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
-- Despejando dados para a tabela `zips`
--

INSERT INTO `zips` (`id`, `file_address`) VALUES
(12, 'api/assets/imgs/compress/imagens_compactada_02.07.2023.09.10.zip');

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT de tabela `reserved`
--
ALTER TABLE `reserved`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT de tabela `returned`
--
ALTER TABLE `returned`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de tabela `things`
--
ALTER TABLE `things`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT de tabela `zips`
--
ALTER TABLE `zips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
