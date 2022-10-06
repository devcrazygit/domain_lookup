-- CreateTable
CREATE TABLE `Lookup` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `clientIp` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `domain` VARCHAR(191) NOT NULL,
    `addresses` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
