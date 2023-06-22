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
            //$qrcodeBlob = $_FILES['qrcodeBlob'];     
            $qrcodeBlobScreeshot = $_FILES['qrcodeBlobScreeshot'];     
            //$qrcode = filter_input(INPUT_POST, 'qrcode');     
    
            
            if($to && $id && $local && $description && isset($qrcodeBlobScreeshot) && !empty($qrcodeBlobScreeshot)){        
                              
    
                try {
                    
                    $mail = new PHPMailer(true);
                    $mail->SMTPSecure = 'plain';
                    $mail->isSMTP();
                    $mail->Host = 'sandbox.smtp.mailtrap.io';
                    $mail->Port = 2525;
                    $mail->SMTPAuth = true;
                    $mail->Username = 'ab0b12cc3e68c8'; 
                    $mail->Password = '58857076896845'; 
                
                    $mail->setFrom('douglas2570@gmail.com'); 
                
                    $mail->addAddress('equipeanti404@gmail.com'); 
                    //$mail->addAttachment($qrcodeBlob['tmp_name'],'qrcode.jpeg');                      
                    $mail->addAttachment($qrcodeBlobScreeshot['tmp_name'],'qrcodeBlobScreeshot.jpeg');                      

                    $mail->isHTML(true);
                    $mail->CharSet = 'utf-8';
                    $mail->FromName = 'Quests';
                    $mail->Body = "<p>
                                        Código:". $id." <br>
                                        Local:".$local." <br>
                                        Descrição:".$description."<br>
                                </p>
                                ";
                    $mail->Subject = 'Objeto reservado | Achaí - SMD';
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
