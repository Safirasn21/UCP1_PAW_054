CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `nama` varchar(50) DEFAULT NULL,
    `email` varchar(50) DEFAULT NULL,
    `password` text DEFAULT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `hewan` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) DEFAULT NULL,
    `umur` varchar(50) DEFAULT NULL,
    `pupuk` VARCHAR(50) DEFAULT NULL,
    PRIMARY KEY (`id`)
);
name,
umur,
spesies
INSERT INTO `users` (`nama`, `email`, `password`)
VALUES ('rara', 'rara@mail.com', 'rara123');
DROP TABLE IF EXISTS users;