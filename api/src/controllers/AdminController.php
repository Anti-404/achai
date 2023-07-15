<?php
namespace src\controllers;

use \core\Controller;
use \src\models\Admins;


class AdminController extends Controller {

    public function __construct(){
        parent::__construct();
    }
    public function get($id){    
        
        if($id) {
            
            $data = Admins::select()->where($id)->get();
            
            if(count($data[0]) > 0){                
                
                $this->array['result'] = [
                    'id' => $data[0]['id'],   
                    'user' => $data[0]['user'],
                    'email' => $data[0]['email'],
                    'hash' => $data[0]['hash']    
                ];
    
            } else {
                $this->array['error'] = 'ID inexistente';
            }

        } else {
            $this->array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }
    
    public function getByHash(){    
        $hash = filter_input(INPUT_POST, 'hash');
        
        if($hash) {
            
            $data  = Admins::select()->where('hash',$hash)->get();
            
            if(count($data[0]) > 0){                
                
                $this->array['result'] = [
                    'id' => $data[0]['id'],   
                    'user' => $data[0]['user'],
                    'email' => $data[0]['email']  
                ];
    
            } else {
                $this->array['error'] = 'ID inexistente';
            }

        } else {
            $this->array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }
    
    public function login(){ 
        
        $user = filter_input(INPUT_POST, 'user');
        $password = md5(filter_input(INPUT_POST, 'password'));
                
        if($user && $password) {
            
            $data = Admins::select()->where('user', $user)->where('password', $password)->get();
                       
            if(isset($data[0]) > 0){                
                
                $this->array['result'] = [
                    'hash' => $data[0]['hash'],                
                    'user' => $user, 
                    
                ];
    
            } else {
                $this->array['error'] = 'Usuario ou Senha Invalido';
            }

        } else {
            $this->array['error'] = 'Usuario ou Senha não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }

    public function update(){  
        
        $id = filter_input(INPUT_POST, 'id');
        $user = filter_input(INPUT_POST, 'user');        
        $email = filter_input(INPUT_POST, 'email');
        $password = filter_input(INPUT_POST, 'password');
                
                
        $data = [
            'id' => $id,
            'user' => $user,
            'email' => $email            
        ];
       

        if($data['id'] && $data['user'] && $data['email']) {   
            $admin = Admins::select()->where('id', $data['id'])->execute();            
            

            if(count($admin) > 0){

                if($password) {
                    $data['password'] = md5($password);

                    admins::update()->set(
                        [
                            'user' => $data['user'],
                            'email' => $data['email'],
                            'password' => $data['password']
                        ]
                        )->where('id', $data['id'])->execute();

                }else{
                    admins::update()->set(
                        [
                            'user' => $data['user'],
                            'email' => $data['email']
                        ]
                        )->where('id', $data['id'])->execute();

                }
                
                
                $this->array['result'] = [
                    'id' => $data['id'],   
                    'user' => $data['user'],
                    'email' => $data['email']                  
                ];

            }else{
                $this->array['error'] = 'ID inexistente';
            }                 
            

        } else {
            $this->array['error'] = 'data não enviados';
        } 


        echo json_encode($this->array);
        exit;
 
    }

}