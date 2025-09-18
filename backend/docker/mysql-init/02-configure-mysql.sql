-- Configure MySQL for Laravel Sanctum and modern Laravel features
-- Set default charset and collation
ALTER DATABASE mmt_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER DATABASE mmt_admin_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER DATABASE mmt_admin_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Set SQL mode for Laravel compatibility
SET GLOBAL sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO';

-- Configure timezone
SET GLOBAL time_zone = '+00:00';