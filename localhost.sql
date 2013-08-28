-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 08 月 17 日 16:31
-- 服务器版本: 5.5.8
-- PHP 版本: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `liuyan`
--
CREATE DATABASE `liuyan` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `liuyan`;

-- --------------------------------------------------------

--
-- 表的结构 `yan`
--

CREATE TABLE IF NOT EXISTS `yan` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- 转存表中的数据 `yan`
--

INSERT INTO `yan` (`id`, `name`, `title`, `content`) VALUES
(1, '蓝翔', '天气', '今天天气真热啊！'),
(2, '小明', '地理', '中国真大！'),
(3, '王磊', '扬州', '扬州是一个城市！'),
(5, '蓝翔', '学习', '好好学习，天天向上！'),
(11, '访客22302', '成功', '成功debug！'),
(12, '访客27647', '蓝翔', '蓝翔在吃饭。'),
(13, '访客24012', '洗洗', '洗澡！'),
(14, '访客18453', '哈哈', '湖水水水水！'),
(15, '蓝翔', '互相', '安慰顽疾的胡水利局'),
(16, '王磊', '我是王磊', '蓝翔想你囔囔'),
(17, '蓝翔', '呼呼', '好人！');
--
-- 数据库: `shili`
--
CREATE DATABASE `shili` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `shili`;

-- --------------------------------------------------------

--
-- 表的结构 `chatjir`
--

CREATE TABLE IF NOT EXISTS `chatjir` (
  `chat_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(10) NOT NULL,
  `chat_name` varchar(30) NOT NULL,
  `chat_content` tinytext NOT NULL,
  `chat_date` datetime NOT NULL,
  PRIMARY KEY (`chat_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=38 ;

--
-- 转存表中的数据 `chatjir`
--

INSERT INTO `chatjir` (`chat_id`, `user_id`, `chat_name`, `chat_content`, `chat_date`) VALUES
(1, '1', '流浪', 'Hello！', '2013-08-16 20:41:33'),
(11, '1', '流浪', '你好哇！', '2013-08-16 16:32:24'),
(12, '18', '天堂', '我是。。。。', '2013-08-16 16:35:03'),
(13, '18', '天堂', '我知道。。。', '2013-08-16 16:35:37'),
(14, '18', '天堂', '我蓝翔！！！', '2013-08-16 16:36:48'),
(15, '18', '天堂', '蓝想！！！', '2013-08-16 16:38:31'),
(16, '18', '天堂', '兰兰', '2013-08-16 16:38:44'),
(17, '18', '天堂', '我知道了！！', '2013-08-16 16:39:19'),
(18, '18', '天堂', '我蓝翔！！！~', '2013-08-16 16:39:50'),
(19, '18', '天堂', '我蓝翔！！！', '2013-08-16 16:40:06'),
(20, '18', '天堂', '你好！', '2013-08-16 16:41:03'),
(21, '18', '天堂', '我缆线！！', '2013-08-16 16:41:47'),
(22, '18', '天堂', '妮妮妮妮', '2013-08-16 16:42:33'),
(23, '18', '天堂', '我拉那里拿那里呢', '2013-08-16 16:46:14'),
(24, '18', '天堂', '你好哇！', '2013-08-16 16:47:45'),
(25, '18', '天堂', '你你你', '2013-08-16 16:47:59'),
(26, '18', '天堂', '你你您您', '2013-08-16 16:48:15'),
(27, '18', '天堂', '我拉你你', '2013-08-16 16:48:45'),
(28, '18', '天堂', '？？？？', '2013-08-16 16:49:33'),
(29, '18', '天堂', '？？', '2013-08-16 16:49:38'),
(30, '18', '天堂', '我蓝', '2013-08-16 16:51:07'),
(31, '18', '天堂', '我蓝', '2013-08-16 16:51:19'),
(32, '18', '天堂', '我蓝翔', '2013-08-16 16:53:00'),
(33, '18', '天堂', '我蓝翔', '2013-08-16 16:53:28'),
(34, '1', '流浪', '？？？', '2013-08-16 16:59:18'),
(35, '18', '天堂', '我蓝翔', '2013-08-16 16:59:27'),
(36, '3', '乌龟', '我是乌龟', '2013-08-16 17:02:11'),
(37, '1', '流浪', '我不是乌龟', '2013-08-16 17:02:29');

-- --------------------------------------------------------

--
-- 表的结构 `chatuser`
--

CREATE TABLE IF NOT EXISTS `chatuser` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `psd` varchar(30) NOT NULL,
  `zname` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- 转存表中的数据 `chatuser`
--

INSERT INTO `chatuser` (`id`, `name`, `psd`, `zname`, `email`) VALUES
(1, '流浪', '931118', '蓝翔', 'lan-xiang@qq.com'),
(3, '乌龟', '931118', '兰溪', 'xlan@seu.edu.cn'),
(18, '天堂', '931118', 'lan', 'xlan@seu.edu.cn'),
(19, 'lx', 'lxlxlx', 'lkjkl', 'lanxiang@qq.com'),
(20, 'lx', 'lxlxlx', 'lkjkl', 'lanxiang@qq.com');
