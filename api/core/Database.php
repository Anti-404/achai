<?php

namespace core;

use \src\Config;

class Database {
    private static $_pdo;
    public static function getInstance() {
        if(!isset(self::$_pdo)) {
            self::$_pdo = new \PDO(Config::DB_DRIVER.":dbname=".Config::DB_DATABASE.";host=".Config::DB_HOST, Config::DB_USER, Config::DB_PASS);
        }
        return self::$_pdo;
    }

    private function __construct() { }
    private function __clone() { }
    public function __wakeup() { }
}

/*
namespace core;

use \src\Config;

class Database {
    private static $_pdo;
    public static function getInstance() {
        $options = array(
            \PDO::MYSQL_ATTR_SSL_CA => '../assets/sll/DigiCertGlobalRootCA.crt.pem'
        );

        if(!isset(self::$_pdo)) {
            self::$_pdo = new \PDO(Config::DB_DRIVER.":dbname=".Config::DB_DATABASE.";host=".Config::DB_HOST, Config::DB_USER, Config::DB_PASS, $options);
        }
        return self::$_pdo;
    }

    private function __construct() { }
    private function __clone() { }
    public function __wakeup() { }
}
*/