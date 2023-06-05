import Controller from '../../../../core/controller/index.js';

class QRCodeReader extends Controller{

    constructor(){  
        super();        
    }   

    scanner(){        

        let scanner = new Instascan.Scanner(
            {
                video: document.getElementById('preview')
            }
        );

        scanner.addListener('scan', function(content) {            
            window.location.href = content;
        });

        Instascan.Camera.getCameras().then(cameras => 
        {
            if(cameras.length > 0){
                scanner.start(cameras[0]);
                //scanner.start(cameras[1]);
            } else {
                console.error("Não existe câmera no dispositivo!");
            }
        });

    }

    handlePageBack(){                
        document.querySelector("#back").addEventListener('click', ()=>{
            window.history.back();
        });
    }

}   

const qrCodeReader = new QRCodeReader();
qrCodeReader.scanner();
qrCodeReader.handlePageBack();
