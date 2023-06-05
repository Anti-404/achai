<?php
namespace src\services;
use \src\models\Admins;

class AuthService{ 
    public function __construct(){}

    public static function checkHash($hash){

        if($hash) {            
            $data = Admins::select()->where('hash', $hash)->get();
            
            if(count($data[0]) > 0){ 
                return true;
            }

            return false;

        }   
    }     
}
