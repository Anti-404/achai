import Controller from '../../../../core/controller/index.js';
import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../../components/breadcrumbs/index.js';
import LayoutFooter from '../../../components/footer/index.js';


import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';
import HelperTabOrder from '../../../helpers/taborder/index.js';
import config from '../../../../../config.js';

import tabOrderQrcodeReader from './taborder/index.js'

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
            /*
            if(cameras.length > 1){
                scanner.start(cameras[1]);
                
            } else if(cameras.length > 0){
                scanner.start(cameras[0]);
                
            }else {
                console.error("Não existe câmera no dispositivo!");
            }*/

            if(cameras.length > 0){                
                scanner.start(cameras[cameras.length-1]);
                
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
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, false, true, true, false);
    } 

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:`${config.urlBase}/src/views/admin/panel/`}  );
        values.push( {name:'Confirmar retirada', href:this.retrieveURLCurrentPage()}  );
        
        layoutBreadcrumbs.create(ul, values);        

    }

    arrowBack(){
        let arrowButton = document.querySelector('.arrow-button');
        arrowButton.addEventListener('click',()=>{
            
            window.location.href = `${config.urlBase}/src/views/admin/panel/`;                
            
        });
    }

    appendFooter(){
        let containerFooter = document.querySelector("footer .container");
        const layoutFooter  = new LayoutFooter();
        layoutFooter.create(containerFooter, config, true);        
        
    } 

    setTabOrder(){                 
        HelperTabOrder.setTabOrder(tabOrderQrcodeReader);
    }


}   

const qrCodeReader = new QRCodeReader();
qrCodeReader.scanner();
qrCodeReader.createHeaderContent();
qrCodeReader.createBreadcrumbs();
qrCodeReader.arrowBack();
qrCodeReader.appendFooter();
qrCodeReader.setTabOrder();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu('qrcodereader');
// HelperSandwichMenu.goToReturnedThings();
