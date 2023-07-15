<?php
namespace src\controllers;

use \core\Controller;
use \src\models\Categories;
use \src\services\AuthService;

class CategoryController extends Controller {

    public function __construct(){
        parent::__construct();
    }

    public function index() {
        
        $categories = Categories::select()->get();                
        
        if(count($categories) > 0){
            foreach($categories as $item) {
                $this->array['result'][] = [
                    'id' => $item['id'],
                    'name' => $item['name'],
                    'icon_name' => $item['icon_name']
                ];
            }
        }
        
             
        echo json_encode($this->array);       
        
        exit;
        
    }

    public function get($id){
        $category = Categories::select()->where($id)->get();

        if($id) {
            
            if(count($category) > 0){                
    
                $this->array['result'] = [
                    'id' => $category[0]['id'],
                    'name' => $category[0]['name']
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

    public function getCategoryByName($name){
        $category = Categories::select()->where('name', $name)->get();

        if($name) {
            
            if(count($category) > 0){                
    
                $this->array['result'] = [
                    'id' => $category[0]['id'],
                    'name' => $category[0]['name']
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
    

    public function delete($id){  
        $hash = filter_input(INPUT_POST, 'hash');  
        
        if(!(AuthService::checkHash($hash))){
            $this->array['error'] = "Acesso negado. Contate o Administrador";            
            
            echo json_encode($this->array);
            exit;
        }

        if($id) {            
            Categories::delete()->where('id',$id['id'])->execute(); 
            $this->array['error'] = '';               

        } else {
            $this->array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }

    public function update(){  
        
        $hash = filter_input(INPUT_POST, 'hash');        
        if(!(AuthService::checkHash($hash))){
            $this->array['error'] = 'Acesso negado. Contate o Administrador';
            
            echo json_encode($this->array);
            exit;
        }
        
        $id = filter_input(INPUT_POST, 'id'); 
        $name = filter_input(INPUT_POST, 'name');                               
        
        $dados = [
            'id' => $id,
            'name' => $name
        ];

        if($dados['id'] && $dados['name']) {   
            $category = Categories::select()->where('id', $dados['id'])->execute();            

            if(count($category) > 0){

                Categories::update()->set('name',$dados['name'])->where('id', $dados['id'])->execute();
                
                $this->array['result'] = [
                    'id' => $dados['id'],
                    'name' => $dados['name']
                ];

            }else{
                $this->array['error'] = 'ID inexistente';
            }                 
            

        } else {
            $this->array['error'] = 'Dados obrigatórios não enviados';
        } 


        echo json_encode($this->array);
        exit;
        
    }

    
    public function insert(){   
        
        $hash = filter_input(INPUT_POST, 'hash');        
        if(!(AuthService::checkHash($hash))){
            $this->array['error'] = 'Acesso negado. Contate o Administrador';
            
            echo json_encode($this->array);
            exit;
        }

        $name = filter_input(INPUT_POST, 'name');        

        if($name) {   
            Categories::insert(
                [
                    ['name'=>$name]
                ]
            )->execute();            

        } else {
            $this->array['error'] = 'Dados obrigatórios não enviados';
        } 
        
        
        echo json_encode($this->array);
        exit;
 
    }

}