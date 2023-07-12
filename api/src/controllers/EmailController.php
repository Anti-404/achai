<?php
namespace src\controllers;
use \core\Controller;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

class EmailController extends Controller{ 

    public function __construct(){
        parent::__construct();
        
    }
        
      public function sendemail(){
        
        $to = 'allangeorge@virtual.ufc.br';
        $id = filter_input(INPUT_POST, 'id');
        $local = filter_input(INPUT_POST, 'local');
        $description = filter_input(INPUT_POST, 'description');                
        $qrcodeBlobScreeshot = $_FILES['qrcodeBlobScreeshot'];     
        
        if($to && $id && $local && $description && isset($qrcodeBlobScreeshot) && !empty($qrcodeBlobScreeshot)){        
                          

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
            
                $mail->addAddress('equipeanti404@gmail.com');                                      
                $mail->addAttachment($qrcodeBlobScreeshot['tmp_name'],'qrcodeBlobScreeshot.jpeg');                      

                $mail->isHTML(true);
                $mail->CharSet = 'utf-8';
                $mail->FromName = 'Achaí';
                $mail->Body = "<p>
                                    Código:". $id." <br>
                                    Local:".$local." <br>
                                    Descrição:".$description."<br>
                            </p>
                            ";
                $mail->Subject = 'Objeto reservado';
                $mail->AltBody = 'O objeto de código '.$id.' foi encontrado no(a) '.$local.'. Descrição: '.$description;
    
                
                $mail->send();
                
                $this->array['result'] = 'E-mail enviado com sucesso';

            } catch (Exception $e) {
                $this->array['error'] = "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
            }
            

        }else{
            $this->array['error'] = 'Dados não enviados';
        }
        

        echo json_encode($this->array);       
        exit;
    }

   
    
}
