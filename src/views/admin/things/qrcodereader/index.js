import Controller from '../../../../core/controller/index.js';
import LayoutHeaderContent from '../../../components/headercontent/index.js';

import HelperSearch from '../../../helpers/search/index.js';
import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';
import config from '../../../../../config.js';

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
            if(cameras.length > 1){
                scanner.start(cameras[1]);
                
            } else if(cameras.length > 0){
                scanner.start(cameras[0]);
                
            }else {
                console.error("Não existe câmera no dispositivo!");
            }
        });

    }

    handlePageBack(){                
        document.querySelector("#back").addEventListener('click', ()=>{
            window.history.back();
        });
    }

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, false, true, true);
    } 

}   

const qrCodeReader = new QRCodeReader();
qrCodeReader.scanner();
qrCodeReader.createHeaderContent();
// qrCodeReader.handlePageBack();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu();
// HelperSandwichMenu.goToReturnedThings();
HelperSandwichMenu.exit();
