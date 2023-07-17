import ModelThing from '../../../../models/things/index.js';
import ModelZip from '../../../../models/zips/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';
import LayoutThing from '../../../components/thing/index.js';

import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';
import HelperTabOrder from '../../../helpers/taborder/index.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../../components/breadcrumbs/index.js';
import LayoutFooter from '../../../components/footer/index.js';

import tabOrderDiscard from './taborder/index.js';


class Discard extends Controller{
    constructor(){              
        super();       
        this.modelThing = new ModelThing(); 
        this.modelZip = new ModelZip(); 
        this.currentPage = this.retrieveURLCurrentPage(); 
        this.layoutThing = new LayoutThing(); 
                            
    }
       
    async allThingsDiscard(){

        const allThingsDiscard = await this.modelThing.getThingsDiscard();            
        let  thingsDiscardContainer = document.querySelector(".things-list");
        await this.layoutThing.create(thingsDiscardContainer, allThingsDiscard, false);

    }
 
    handlerFilesZip(){                
        document.querySelector(".files-zip-button").addEventListener('click', ()=>{
            let imagesElements = document.querySelectorAll('.figure img');
            let imgsSrc = [];
            let formData = new FormData();

            imagesElements.forEach((img)=>{
                if(!img.src.includes('deletado')){
                    let src = '../'+((img.src).split(`${config.urlBase}/api/`)[1]);
                    imgsSrc.push(src);
                }
            });            

            if(imgsSrc.length > 0){
                formData.append('images',imgsSrc);

                if(localStorage.getItem("hash")){
                    formData.append('hash',localStorage.getItem("hash"));                    
                } 
                
                this.modelThing.compressDescarded(this.currentPage,formData);

            }

        });
    }

   async handlerShowAllFilesZip(){
    const allFilesZip = await this.modelZip.getAll();
    let  filesZipList = document.querySelector(".files-zip-list");
    
    if(!allFilesZip.error){ 
        for (let i = 0; i < allFilesZip.result.length; ++i) {
            
            let div = document.createElement("div");
            let a = document.createElement("a");
            let buttonImg = document.createElement("img");
                                                                      
            buttonImg.setAttribute("data-id",allFilesZip.result[i].id);                        
            a.setAttribute("href", `${config.urlBase}/${allFilesZip.result[i].file_address}` ); 
            buttonImg.setAttribute("id", 'delete-button'); 
            buttonImg.src=`${config.urlBase}/assets/imgs/icons/delete_FILL0_wght300_GRAD0_opsz24.svg`; 
            buttonImg.alt=`botão deletar arquivo zip de imagens compactadas`; 

            let fileName = (allFilesZip.result[i].file_address).split('/');            
            fileName = fileName[fileName.length-1];
            
            a.appendChild(document.createTextNode(fileName));
            
            div.appendChild(a);
            div.appendChild(buttonImg);   
            filesZipList.appendChild(div);             
            
        }
    }
   }

   delete(){        
    let deleteButton = document.querySelector("#delete-button");
    if(deleteButton == null) return    

    document.querySelector("#delete-button").addEventListener("click",async (e)=>{  
        e.preventDefault();  
        let formData = new FormData();
        formData.append('id',e.target.getAttribute('data-id'));

        if(localStorage.getItem("hash")){
            formData.append('hash',localStorage.getItem("hash"));            
        }   

        let id = e.target.getAttribute('data-id');
        
        let msg = await this.modelZip.delete(this.currentPage,id, formData); 
        alert(msg);
        window.location.reload();
    });
}

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, false, true, true,false);
    } 

    createBreadcrumbs(){
        const layoutBreadcrumbs = new LayoutBreadcrumbs();
        let ul = document.querySelector('.container .header-body ul.breadcrumb');
        const values = [];
        
        values.push( {name:'Tela inicial', href:`${config.urlBase}/src/views/admin/panel/`}  );
        values.push( {name:'Descartes', href:this.retrieveURLCurrentPage()}  );
        
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
        HelperTabOrder.setTabOrder(tabOrderDiscard);
    }

}   

const discard = new Discard();
discard.createHeaderContent();
discard.createBreadcrumbs();
await discard.allThingsDiscard();
discard.handlerFilesZip();
await discard.handlerShowAllFilesZip();
discard.delete();
discard.arrowBack();
discard.appendFooter();
discard.setTabOrder();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu('discard');
// HelperSandwichMenu.goToReturnedThings();
