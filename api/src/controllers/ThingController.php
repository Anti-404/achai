<?php
namespace src\controllers;

use \core\Controller;
use \src\models\Things;
use \src\models\Zips;
use \src\services\AuthService;
use Exception;
use DateTime;
use DateTimeZone;
use ZipArchive;


class ThingController extends Controller {    
    private $numberDays;
    private DateTimeZone $timezone;
    public function __construct(){        
        parent::__construct();                       
        $this->numberDays = 15768000; // 6 meses
        $this->timezone =  new DateTimeZone('America/Fortaleza');
    }

    public function index() {
        
       $things = Things::select()
       ->where('reserved_status','0')
       ->where('returned_status','0')
       ->orderBy('id','desc')->get();      
       
       if(count($things) > 0){
            
            foreach($things as $item) {                
                $diffDates = $this->checkDateDifference($item['date'], $this->numberDays); 
                
                if(!$diffDates){ 
                $this->array['result'][] = [
                        'id' => $item['id'],                
                            'image_address' => $item['image_address'],
                            'description' => $item['description'],
                            'local' => $item['local'],
                            'date' => $item['date'],
                            'reserved_status' => $item['reserved_status'],                                           
                            'returned_status' => $item['returned_status'],                                           
                            'category_id' => $item['category_id']                            
                    ];
                }
                
            }
        }
             
        echo json_encode($this->array);
        exit;
        
    }

    public function get($id){    
        
        if($id) {            
            
            $things = Things::select()
            ->where('reserved_status','0')
            ->where('returned_status','0')
            ->where('id', $id)
            ->orderBy('id','desc')
            ->execute();

            if(count($things) > 0){
            
                foreach($things as $item) {                
                    $diffDates = $this->checkDateDifference($item['date'], $this->numberDays); 
                    
                     if(!$diffDates){ 
                       $this->array['result'][] = [
                            'id' => $item['id'],                
                                'image_address' => $item['image_address'],
                                'description' => $item['description'],
                                'local' => $item['local'],
                                'date' => $item['date'],
                                'reserved_status' => $item['reserved_status'],                                           
                                'returned_status' => $item['returned_status'],                                           
                                'category_id' => $item['category_id'],                            
                                'date' => $item['date'],                            
                        ];
                     }
                    
                }
            
            } else {
                $this->array['error'] = 'ID não enviado';
            } 
        
        }

        echo json_encode($this->array);
        exit;
    
    }

    public function getAllByCategory($categoryId){
              
        if($categoryId) {
           
            $things = Things::select()
            ->where('reserved_status','0')
            ->where('returned_status','0')
            ->where('category_id', $categoryId)
            ->orderBy('id','desc')
            ->execute();
            
            if(count($things) > 0){
            
                foreach($things as $item) {                
                    $diffDates = $this->checkDateDifference($item['date'], $this->numberDays); 
                    
                     if(!$diffDates){ 
                       $this->array['result'][] = [
                            'id' => $item['id'],                
                                'image_address' => $item['image_address'],
                                'description' => $item['description'],
                                'local' => $item['local'],
                                'date' => $item['date'],
                                'reserved_status' => $item['reserved_status'],                                           
                                'returned_status' => $item['returned_status'],                                           
                                'category_id' => $item['category_id']                            
                        ];
                     }
                    }    
            }

        } else {
            $this->array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }


    public function getAllByDescription($description=[]){
        $things = [];
        
        if(sizeof($description) <= 0) {echo json_encode($this->array);}            

        for ($i=0; $i < sizeof($description) ; $i++) { 
            $query = Things::select()
            ->where('reserved_status','0')
            ->where('returned_status','0')
            ->where('description', 'like','%'.$description[$i].'%')
            ->orWhere('description', 'like','%'.$description[$i+1].'%')
            ->orderBy('id','desc')
            ->execute();
            
            
            array_push($things, $query);
        }
           
        if(count($things) > 0){

        }            
        
        
        echo json_encode($this->array);
        exit;
    
    }

    public function getAllByCategoryAndReserved($categoryId){
              
        if($categoryId) {
           
            $things = Things::select()
            ->where('reserved_status','1')
            ->where('returned_status','0')
            ->where('category_id', $categoryId)
            ->orderBy('id','desc')
            ->execute();
            
            if(count($things) > 0){
            
                foreach($things as $item) {                
                    $diffDates = $this->checkDateDifference($item['date'], $this->numberDays); 
                    
                     if(!$diffDates){ 
                       $this->array['result'][] = [
                            'id' => $item['id'],                
                                'image_address' => $item['image_address'],
                                'description' => $item['description'],
                                'local' => $item['local'],
                                'date' => $item['date'],
                                'reserved_status' => $item['reserved_status'],                                           
                                'returned_status' => $item['returned_status'],                                           
                                'category_id' => $item['category_id']                            
                        ];
                     }
                }    
            }
            

        } else {
            $this->array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }

    public function getAllReserved() {
        
        $things = Things::select()->where('reserved_status','1')->where('returned_status','0')->orderBy('id','desc')->get();                        
        
        if(count($things) > 0){
            
            foreach($things as $item) {                
                $diffDates = $this->checkDateDifference($item['date'], $this->numberDays); 
                
                 if(!$diffDates){ 
                   $this->array['result'][] = [
                        'id' => $item['id'],                
                            'image_address' => $item['image_address'],
                            'description' => $item['description'],
                            'local' => $item['local'],
                            'date' => $item['date'],
                            'reserved_status' => $item['reserved_status'],                                           
                            'returned_status' => $item['returned_status'],                                           
                            'category_id' => $item['category_id']                            
                    ];
                 }
            }   
        }
        
             
        echo json_encode($this->array);
        exit;
        
    }

    public function getReservedById($id){    
        
        if($id) {            
            
            $things = Things::select()
            ->where('reserved_status','1')
            ->where('returned_status','0')
            ->where('id', $id)
            ->orderBy('id','desc')
            ->execute();

            if(count($things) > 0){
            
                foreach($things as $item) {                
                    $diffDates = $this->checkDateDifference($item['date'], $this->numberDays); 
                    
                     if(!$diffDates){ 
                       $this->array['result'][] = [
                            'id' => $item['id'],                
                                'image_address' => $item['image_address'],
                                'description' => $item['description'],
                                'local' => $item['local'],
                                'date' => $item['date'],
                                'reserved_status' => $item['reserved_status'],                                           
                                'returned_status' => $item['returned_status'],                                           
                                'category_id' => $item['category_id']                            
                        ];
                     }
                    
                }
            
            } else {
                $this->array['error'] = 'ID não enviado';
            } 
        
        }

        echo json_encode($this->array);
        exit;
    
    }

    public function getAllReturned() {
        
        $things = Things::select()->where('returned_status','1')->orderBy('id','desc')->get();                
        
        if(count($things) > 0){
            
            foreach($things as $item) {                
                $diffDates = $this->checkDateDifference($item['date'], $this->numberDays); 
                
                 if(!$diffDates){ 
                   $this->array['result'][] = [
                        'id' => $item['id'],                
                            'image_address' => $item['image_address'],
                            'description' => $item['description'],
                            'local' => $item['local'],
                            'date' => $item['date'],
                            'reserved_status' => $item['reserved_status'],                                           
                            'returned_status' => $item['returned_status'],                                           
                            'category_id' => $item['category_id']                            
                    ];
                 }
            }    
        }       
        
             
        echo json_encode($this->array);
        exit;
        
    }

    public function getAllDiscard() {
        
        $things = Things::select()->orderBy('id','desc')->get();  
        
        if(count($things) > 0){
            
            foreach($things as $item) {                
                $diffDates = $this->checkDateDifference($item['date'], $this->numberDays); 
                
                 if($diffDates){ 
                   $this->array['result'][] = [
                        'id' => $item['id'],                
                            'image_address' => $item['image_address'],
                            'description' => $item['description'],
                            'local' => $item['local'],
                            'date' => $item['date'],
                            'reserved_status' => $item['reserved_status'],                                           
                            'returned_status' => $item['returned_status'],                                           
                            'category_id' => $item['category_id']                            
                    ];
                 }
            }    
        }
             
        echo json_encode($this->array);
        exit;
        
    }
   
    public function delete($id){
        $input = json_decode(file_get_contents('php://input'));
        $hash = $input->hash ?? null;
        

        if(!(AuthService::checkHash($hash))){
            $this->array['error'] = "Acesso negado. Contate o Administrador";            
            
            echo json_encode($this->array);
            exit;
        }

        if($id) {            
            Things::delete()->where('id',$id['id'])->execute(); 
            $this->array['error'] = '';               

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
        
        $imageAddres = filter_input(INPUT_POST, 'image_address_can');
        
        $file = $_FILES['image_address'];        
        $extensionUploadedImage = explode('/',$_FILES['image_address']['type'])[1];
        
        $description = filter_input(INPUT_POST, 'description')??null;
        $local = filter_input(INPUT_POST, 'local')??null;    
        $categoryId = filter_input(INPUT_POST, 'category_id');


       if(isset($_FILES['image_address']) && !empty($_FILES['image_address'])){            
                  
            if(isset($file['tmp_name']) && !empty($file['tmp_name'])){
                $nameImg = md5(time().rand(0,99));
                $imageAddres = 'api/assets/imgs/'.$nameImg.'.'.$extensionUploadedImage;      
                $localPathImageAddres = '../assets/imgs/'.$nameImg.'.'.$extensionUploadedImage;  
                
                move_uploaded_file($file['tmp_name'], $localPathImageAddres);                   

                $this->compressImage($localPathImageAddres, 300,-1, $localPathImageAddres, 50);               

                                
            }       
                
                
        }


        if($categoryId)  {   
            Things::insert(
                [   
                    'image_address' => $imageAddres,
                    'description'=>$description,
                    'local'=>$local,
                    'category_id'=>$categoryId
                ]
            )->execute();            
                    

        } else {
            $this->array['error'] = 'data não enviados';
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
        $pathImageAddressDB = filter_input(INPUT_POST, 'image_address');
        $description = filter_input(INPUT_POST, 'description')??null;
        $local = filter_input(INPUT_POST, 'local')??null;
        $returnedStatus = filter_input(INPUT_POST, 'returned_status');        
        $reservedStatus = filter_input(INPUT_POST, 'reserved_status');        
        $categoryId = filter_input(INPUT_POST, 'category_id');        
        
       if(isset($_FILES['image_address_update']) && !empty($_FILES['image_address_update'])){

        if($_FILES['image_address_update']['size']){
                $file = $_FILES['image_address_update'];        
                $extensionUploadedImage = explode('/',$_FILES['image_address_update']['type'])[1];            
                    
                if(isset($file['tmp_name']) && !empty($file['tmp_name'])){
                    $nameImg = md5(time().rand(0,99));
                    $pathImageAddressDB = 'api/assets/imgs/'.$nameImg.'.'.$extensionUploadedImage;        
                    $localPathImageAddres = '../assets/imgs/'.$nameImg.'.'.$extensionUploadedImage;        
                    move_uploaded_file($file['tmp_name'], $localPathImageAddres);   

                    $this->compressImage($localPathImageAddres, 300,-1, $localPathImageAddres, 50);
                }   
                    
            }
        }       

        $data = [
            'id' => $id,
            'image_address' => $pathImageAddressDB,
            'description' => $description,
            'local' => $local,
            'returned_status' => $returnedStatus,
            'reserved_status' => $reservedStatus,
            'category_id' => $categoryId            
        ];

        
        if($data['id'] && $data['image_address'] && $data['category_id']) {   
            $things = Things::select()->where('id', $data['id'])->execute();            

            if(count($things) > 0){

                Things::update()->set(
                    [
                        'image_address' => $data['image_address'],
                        'description' => $data['description'], 
                        'local'=>$data['local'],
                        'returned_status'=>$data['returned_status'],
                        'reserved_status'=>$data['reserved_status'],
                        'category_id'=>$data['category_id'],
                    ]
                    )->where('id', $data['id'])->execute();
                
                $this->array['result'] = [
                        'image_address' => $data['image_address'],
                        'description' => $data['description'], 
                        'local'=>$data['local'],
                        'returned_status'=>$data['returned_status'],
                        'reserved_status'=>$data['reserved_status'],
                        'category_id'=>$data['category_id'],
                ];

            }else{
                $this->array['error'] = 'ID inexistente';
            }                 
            

        } else {
            $this->array['error'] = 'Dados não enviados';
        } 
     
       echo json_encode($this->array);
       exit;




    }    

    public function sendEmail(){        
        $toMail = filter_input(INPUT_POST, 'to');        
        $subject = filter_input(INPUT_POST, 'subject');  
        $fromMail =    filter_input(INPUT_POST, 'from'); 
        $body = filter_input(INPUT_POST, 'body');

        $fromName = explode('@', $fromMail)[0];        

        $headers = "MIME-Version: 1.0"."\r\n". 
                   "Content-type: text/html; charset=iso-8859-1". "\r\n".
                   'From: '.$fromName.' Reminder <'.$fromMail.'>'."\r\n".
                   'X-Mailer: PHP/'. phpversion();       
        

        wordwrap($body, 70, "\r\n");
        /*
            tem que ser o email atrelado a hospedagem que voce esta usando para enviar esse arquivo. 
            Esse "Reply-To: ".$mail que dizer que quando responder esse email a resposta sera enviada para
             o cara que fez a pergunta e nao para do suporte
        */    
        try{
            //print_r(array($toMail, $subject, $body, implode('\r\n',$headers))); exit;
            //mail($toMail, $subject, $body, $headers);
            $this->array['result'] = 'Email enviado com sucesso';               
        }catch(Exception $e){
            $this->array['error'] = $e->getMessage(); 
        }


        /*
        
        to - I am sending an email to the secretariat
        subject - about it
        body - message content
        headers- message send headers
        

        */   

		echo json_encode($this->array);
        exit; 

    }

    public function compressDescarded(){
        $hash = filter_input(INPUT_POST, 'hash');
        
        if(!(AuthService::checkHash($hash))){
            $this->array['error'] = 'Acesso negado. Contate o Administrador';
            
            echo json_encode($this->array);
            exit;
        }
        try {
            
            $images = filter_input(INPUT_POST, 'images');        
            $pathZip = '../assets/imgs/compress/';                
            $images = explode(',',$images);
            
            if (count($images) > 0) {
                $this->compressDescardedImages($pathZip, $images, true);
                $this->array['result'] = 'Imagens zipadas com sucesso.';
            }
            

        } catch (Exception $e) {
            $this->array['erro'] = $e->getMessage();
        }



    }

    private function checkDateDifference($date, $daysLimit){        
        $dateThing = new DateTime($date);
        $now = new DateTime('now', $this->timezone);                               
        $diffDates =  $now->format('U') - $dateThing->format('U');        
        return ($diffDates >= $daysLimit);
    }
    
    private function compressImage($fileImage, $newWidth=300, $newHeight=-1, $destinationPath=null, $quality = 100){
        $image = imagecreatefromstring(file_get_contents($fileImage));
        $info = pathinfo($fileImage);
        
        $type = $info['extension'] == 'jpg' ? 'jpeg': $info['extension'];
        
        $image = imagescale($image, $newWidth, $newHeight);
        
        switch ($type) {
            case 'jpeg':                
                imagejpeg($image, $destinationPath, $quality); 
                break;

            case 'png':
                imagepng($image, $destinationPath); 
                break;            

            case 'bmp':
                imagewbmp($image, $destinationPath, $quality); 
                break;            

            case 'gif':
                imagegif($image, $destinationPath, $quality); 
                break;            

            case 'webp':
                imagewebp($image, $destinationPath, $quality); 
                break;            
            
        }

    }
    

    private function compressDescardedImages($pathZip ='', $fileImages=array(), $deleleOriginal = false ){
        $dateNow = new DateTime('now', $this->timezone);                               
        $dateNow =  $dateNow->format('d.m.Y.h.i');

        $zip = new ZipArchive();
        $pathZip = $pathZip.'imagens_compactada'.'_'.$dateNow.'.zip';
        $zip->open( $pathZip, ZipArchive::CREATE);
         
        if ( !empty( $fileImages) ) {
            
            foreach ( $fileImages as $file ) {               
                
                $zip->addFile( $file, basename( $file ) );
                 
                
            }            
            
        }      

                
        $zip->close();

        $this->insertZip('api/assets/imgs/compress/'.(basename($pathZip)));

        if (file_exists($pathZip) && $deleleOriginal ) {
            foreach ( $fileImages as $file ) {                  
                unlink("$file");               
                
                $things = Things::select()->where('image_address', 'like', '%'.basename($file).'%')->execute(); 
                                
                if(count($things) > 0){
                    Things::update()->set(
                        [
                            'image_address' => "deletado:{".$things[0]['image_address']."}"
                        ]
                        )->where('image_address', $things[0]['image_address'])->execute();
                    }
                
            }

            $this->array['result'] =  'Zipado com Sucesso';
        }

        echo json_encode($this->array);
        exit;

        
    }

    private function insertZip($file_address=''){
        
        if($file_address) {   
            Zips::insert(
                [
                    ['file_address'=>$file_address ]
                ]
            )->execute();            

        } else {
            $this->array['error'] = 'Dados não enviados';
        } 
    }
    

}
