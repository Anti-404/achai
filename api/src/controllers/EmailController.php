<?php
namespace src\controllers;
use \core\Controller;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use chillerlan\QRCode\{QRCode, QROptions};

require '../vendor/autoload.php';


class EmailController extends Controller{ 

    public function __construct(){
        parent::__construct();
        
    }
        
      public function sendemail(){
        
        $id = filter_input(INPUT_POST, 'id');        
        $adminEmail = 'equipeanti404@gmail.com';
        $local = filter_input(INPUT_POST, 'local');
        $description = filter_input(INPUT_POST, 'description');
        $userName = filter_input(INPUT_POST, 'username');
        $userEmail = filter_input(INPUT_POST, 'useremail', FILTER_VALIDATE_EMAIL);
        $subject = filter_input(INPUT_POST, 'subject');        
        $path = filter_input(INPUT_POST, 'path');;        
               
        $options = new QROptions([
            'version'      => 10,
            'outputType'   => QRCode::OUTPUT_IMAGE_JPG,
            'eccLevel'     => QRCode::ECC_H,
            'scale'        => 5,
            'imageBase64'  => false
        ]);
        
        if($adminEmail && $userEmail && $userName && $id && $local && $path){
             try {
                
                $mail = new PHPMailer(true);
                $mail->SMTPSecure = 'plain';
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->Port = 465;
                $mail->SMTPAuth = true;
                $mail->Username = 'tworeba'; 
                $mail->Password = 'ddfaajjaafnkfkwg'; 
                $mail->SMTPSecure = 'ssl';
            
                $mail->setFrom('tworeba@gmail.com');             
                                                     
                $mail->addAddress("{$adminEmail}");                                      
                $mail->addAddress("{$userEmail}");                                      
                $mail->isHTML(true);
                $mail->CharSet = 'utf-8';
                $mail->FromName = 'Achaí';                                  
                $nameImg = md5(time().rand(0,99));
                
                $qrcode = (new QRcode($options))->render($path,'../assets/imgs/'.$nameImg.'.jpg');   
                $mail->addAttachment('../assets/imgs/'.$nameImg.'.jpg','QRCodeObjetoPerdido.jpeg');                                                                                              

                $mail->Body = "<p>
                                    Código:". $id." <br>
                                    Local:".$local." <br>
                                    Descrição:".$description."<br>                                                                                                                                        
                            </p>";
                            
                $mail->Subject = $subject;
                $mail->AltBody = 'O objeto de código '.$id.' foi encontrado no(a) '.$local.'. Descrição: '.$description;
                
                
                $mail->send();                 
                $this->array['result'] = 'E-mail enviado com sucesso';
                unlink('../assets/imgs/'.$nameImg.'.jpg'); 

            } catch (Exception $e) {
                $this->array['error'] = "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
            }
            

        }else{
            $this->array['error'] = 'Dados obrigatórios não enviados';
        }
        

        echo json_encode($this->array);       
        exit;
    }

   
    
}
