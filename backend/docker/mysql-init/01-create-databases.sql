-- Create production database
CREATE DATABASE IF NOT EXISTS mmt_admin;

-- Create development database
CREATE DATABASE IF NOT EXISTS mmt_admin_dev;

-- Create test database
CREATE DATABASE IF NOT EXISTS mmt_admin_test;

-- Grant privileges to the user for all databases
GRANT ALL PRIVILEGES ON mmt_admin.* TO 'mmt_user'@'%';
GRANT ALL PRIVILEGES ON mmt_admin_dev.* TO 'mmt_user'@'%';
GRANT ALL PRIVILEGES ON mmt_admin_test.* TO 'mmt_user'@'%';

-- Flush privileges
FLUSH PRIVILEGES;

-- Set MySQL configurations for better performance
SET GLOBAL innodb_buffer_pool_size = 134217728; -- 128MB
SET GLOBAL max_connections = 151;