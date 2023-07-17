-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14-Jul-2023 às 17:01
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.0.25

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
-- Estrutura da tabela `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(320) DEFAULT NULL,
  `hash` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `admins`
--

INSERT INTO `admins` (`id`, `user`, `password`, `email`, `hash`) VALUES
(7, 'douglas2570@gmail.com', '5649b74a2b26ee6b41a5a9c2effacd44', 'douglas2570@gmail.com', 'A0E812B01BFC8E2417C254A074DF599D');

-- --------------------------------------------------------

--
-- Estrutura da tabela `categories`
--

CREATE TABLE `categories` (
  `id` int(10) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `icon_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `categories`
--

INSERT INTO `categories` (`id`, `name`, `icon_name`) VALUES
(87, 'Ver todos', 'none'),
(88, 'Eletrônicos', 'headphones_FILL0_wght300_GRAD0_opsz40.svg'),
(89, 'Garrafas', 'water_bottle_FILL0_wght300_GRAD0_opsz40.svg'),
(90, 'Guarda-chuvas', 'umbrella_FILL0_wght300_GRAD0_opsz40.svg'),
(91, 'Todas', 'list_FILL0_wght300_GRAD0_opsz40.svg'),
(102, 'Papelaria', 'none'),
(103, 'Vestíveis', 'none'),
(104, 'Outros', 'none');

-- --------------------------------------------------------

--
-- Estrutura da tabela `reserved`
--

CREATE TABLE `reserved` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `thing_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `returned`
--

CREATE TABLE `returned` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `thing_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `things`
--

CREATE TABLE `things` (
  `id` int(10) NOT NULL,
  `description` text DEFAULT NULL,
  `local` varchar(100) NOT NULL,
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
-- Estrutura da tabela `zips`
--

CREATE TABLE `zips` (
  `id` int(11) NOT NULL,
  `file_address` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `zips`
--

INSERT INTO `zips` (`id`, `file_address`) VALUES
(12, 'api/assets/imgs/compress/imagens_compactada_02.07.2023.09.10.zip');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `reserved`
--
ALTER TABLE `reserved`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `returned`
--
ALTER TABLE `returned`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `things`
--
ALTER TABLE `things`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `zips`
--
ALTER TABLE `zips`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT de tabela `reserved`
--
ALTER TABLE `reserved`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT de tabela `returned`
--
ALTER TABLE `returned`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de tabela `things`
--
ALTER TABLE `things`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245;

--
-- AUTO_INCREMENT de tabela `zips`
--
ALTER TABLE `zips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
