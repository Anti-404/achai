<?php
namespace src\controllers;
use \core\Controller;
use Exception;


class EmailController extends Controller{ 
    public function __construct(){
        parent::__construct();
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

    
}
