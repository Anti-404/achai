<?php
namespace src\controllers;

use \core\Controller;
use \src\models\Zips;
use \src\services\AuthService;
use Exception;

class ZipController extends Controller {

    public function __construct(){
        parent::__construct();
    }

    public function index() {
        
        $zips = Zips::select()->orderBy('id','desc')->get();                
        
        if(count($zips) > 0){
            foreach($zips as $item) {
                $this->array['result'][] = [
                    'id' => $item['id'],
                    'file_address' => $item['file_address']
                ];
            }
        }
        
           
        echo json_encode($this->array);       
        
        exit;
        
    }
    
    public function delete($id){        

        // $input = json_decode(file_get_contents('php://input'));
        // $hash = $input->hash ?? null;  
        
        $hash = filter_input(INPUT_POST, 'hash'); 
        

        if(!(AuthService::checkHash($hash))){
            $this->array['error'] = "Acesso negado. Contate o Administrador";            
            
            echo json_encode($this->array);
            exit;
        }
                

        if($id) {            
            $zip = Zips::select()->where($id)->orderBy('id','desc')->get();
            
            if(count($zip)>0){
                
                try {
                    $fileAddress = $zip[0]['file_address'];
                    $fileAddress = str_replace('api','..',$fileAddress);
                    
                    if(file_exists($fileAddress)){
                        unlink($fileAddress); 
                        Zips::delete()->where('id',$id['id'])->execute();
                        $this->array['error'] = '';                         
                    }else{
                        die();  
                    }

                } catch (\Exception $e) {
                    $this->array['error'] = $e.getMessage();
                    
                    die();
                }                
                                
                             
            }

        } else {
            $this->array['error'] = 'ID não enviado';
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

        $file_address  = filter_input(INPUT_POST, 'file_address ');        

        if($file_address) {   
            Zips::insert(
                [
                    ['file_address '=>$file_address ]
                ]
            )->execute();            

        } else {
            $this->array['error'] = 'Dados obrigatórios não enviados';
        } 
        
        
        echo json_encode($this->array);
        exit;
 
    }

}