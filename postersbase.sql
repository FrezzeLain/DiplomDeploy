-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 24 2021 г., 08:25
-- Версия сервера: 8.0.15
-- Версия PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `postersbase`
--

-- --------------------------------------------------------

--
-- Структура таблицы `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `collections`
--

INSERT INTO `collections` (`id`, `name`) VALUES
(1, 'Kyojuro Rengoku'),
(2, 'Hunter X Hunter'),
(3, 'Wild Nature');

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `Title` text NOT NULL,
  `Type` text NOT NULL,
  `Description` text NOT NULL,
  `Image` text NOT NULL,
  `Href` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `Title`, `Type`, `Description`, `Image`, `Href`) VALUES
(1, '-', 'Main', '-', '../assets/images/news/mainNew1.jpg', ''),
(2, 'Категория \"Hunter X Hunter\"', 'Secondary', 'Была добавлена коллекция \"Hunter X Hunter\"', '../assets/images/news/secNew1.jpg', '/New/Category/2'),
(3, 'Категория \"Kyojuro Rengoku\"', 'Secondary', 'Была добавлена коллекция \"Kyojuro Rengoku\"', '../assets/images/news/secNew2.jpg', '/New/Category/1'),
(4, 'Коллекция \"Wild Nature\"', 'Secondary', 'Была добавлена коллекция \"Wild Nature\"', '../assets/images/news/secNew3.jpg', '');

-- --------------------------------------------------------

--
-- Структура таблицы `posters`
--

CREATE TABLE `posters` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `collection` int(11) NOT NULL,
  `categories` text NOT NULL,
  `description` text NOT NULL,
  `likes` int(11) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `posters`
--

INSERT INTO `posters` (`id`, `name`, `collection`, `categories`, `description`, `likes`, `image`) VALUES
(1, 'Kyojuro Rengoku', 1, 'Аниме', '-', 0, '../assets/images/posters/kyojurorengokudemonslay.jpg'),
(2, 'Kyojuro Rengoku', 1, 'Аниме', '-', 0, '../assets/images/posters/kyojurorengokudemonslay2.jpg'),
(3, 'Kyojuro Rengoku', 1, 'Аниме', '-', 0, '../assets/images/posters/kyojurorengokudemonslay3.jpg'),
(4, 'Hunter X Hunter Eyes', 2, 'Hunter X Hunter, Аниме, Eyes', '-', 0, '../assets/images/posters/hunter1.jpg'),
(5, 'Hunter X Hunter', 2, 'Hunter X Hunter, Аниме', '-', 0, '../assets/images/posters/hunter2.jpg'),
(6, 'Hunter X Hunter', 2, 'Hunter X Hunter, Аниме', '-', 0, '../assets/images/posters/hunter3.jpg'),
(7, 'The Realm of Cats', 3, 'Cat, Wild, Nature', '-', 0, '../assets/images/posters/Nature1.jpg'),
(8, 'My nature surrealism', 3, 'Deer, Wild, Nature', '-', 0, '../assets/images/posters/Nature2.jpg'),
(9, 'Another in my surreal', 3, 'Panda, Wild, Nature', '-', 0, '../assets/images/posters/Nature3.jpg');

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `query1`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `query1` (
`id` int(11)
,`image` text
,`name` text
,`categories` text
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `querymy`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `querymy` (
`id` int(11)
,`image` text
,`name` text
,`categories` text
);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` text NOT NULL,
  `mail` text NOT NULL,
  `likelist` text NOT NULL,
  `cartlist` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `mail`, `likelist`, `cartlist`) VALUES
(1, 'test', 'test@mail.ru', '1,3,5', '2,4');

-- --------------------------------------------------------

--
-- Структура для представления `query1`
--
DROP TABLE IF EXISTS `query1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `query1`  AS  select distinct `posters`.`id` AS `id`,`posters`.`image` AS `image`,`posters`.`name` AS `name`,`posters`.`categories` AS `categories` from (`posters` join `collections`) where `posters`.`collection` in (select distinct `collections`.`id` from `collections` where (`collections`.`name` like '%')) ;

-- --------------------------------------------------------

--
-- Структура для представления `querymy`
--
DROP TABLE IF EXISTS `querymy`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `querymy`  AS  select distinct `posters`.`id` AS `id`,`posters`.`image` AS `image`,`posters`.`name` AS `name`,`posters`.`categories` AS `categories` from (`posters` join `collections`) where `posters`.`collection` in (select distinct `collections`.`id` from `collections` where (`collections`.`name` like '%')) ;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `posters`
--
ALTER TABLE `posters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collection` (`collection`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `posters`
--
ALTER TABLE `posters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `posters`
--
ALTER TABLE `posters`
  ADD CONSTRAINT `posters_ibfk_1` FOREIGN KEY (`collection`) REFERENCES `collections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
