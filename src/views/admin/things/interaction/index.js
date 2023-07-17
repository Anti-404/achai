import ModelCategories from '../../../../models/categories/index.js';
import ModelThings from '../../../../models/things/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';
import LayoutBreadcrumbs from '../../../components/breadcrumbs/index.js';
import LayoutFooter from '../../../components/footer/index.js';

import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';
import HelperTabOrder from '../../../helpers/taborder/index.js';

import tabOrderInteraction, {tabOrderRegisterModalTakePicture, tabOrderRegisterModalCamera} from "../../../admin/things/register/taborder/index.js";

class ThingsInteraction extends Controller{    

    constructor(){  
        super();
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
        this.identifier = this.retrieveURLId();                
        this.currentPage = this.retrieveURLCurrentPage();  
        this.takePictureBlob = "empty";      

    }   

    async getThing(){  
        
        const thing = await this.modelThings.get(this.identifier);

        if(!thing.erro){            
            document.querySelector("#data-id").value = this.identifier;            
            document.querySelector("#code").textContent = `N°:${this.identifier}`; 
            document.querySelector("form img").setAttribute('src', `${config.urlBase}/${thing.result[0].image_address}`);            
            document.querySelector("form img").setAttribute('alt', `alterar imagem`);            

            document.querySelector("#image-address").value = thing.result[0].image_address;

            await this.selectCategories(thing.result[0].category_id);            
            
            document.querySelector("#local").value = thing.result[0].local;

            document.querySelector("#description").value = thing.result[0].description;
                        
            document.querySelector("#returned-status").value = thing.result[0].returned_status;           
            
            document.querySelector("#reserved-status").value = thing.result[0].reserved_status;
            
                       

        }else{
            alert(thing.erro);
        }        
    }

    async selectCategories(categoryId){   
        
        const listCategories = document.querySelector("#list-categories");
        const allCategories = await this.modelCategories.getAll();
        
        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) {  
                if(allCategories.result[i].name !== 'Todas' && allCategories.result[i].name !== 'Ver todos') {
                    let option = document.createElement("option"); 
                    option.setAttribute("value",allCategories.result[i].id);              
                    option.appendChild(document.createTextNode(allCategories.result[i].name));
                    listCategories.appendChild(option);           
                }      
            }           
            
       } 
        
               
        let category = await this.modelCategories.get(categoryId);   

        if(!category.erro){
            
            const options = document.querySelector("#list-categories").options;
            for (let i = 0; i < options.length; i++) {
                if(options[i].value == category.result.id){
                    options[i].selected = true;
                }                
            }
        }else{
            alert(category.erro);
        }        

        
    } 
    
    async update(){
        
        document.querySelector("#update-button").addEventListener("click", async (e)=>{  
            e.preventDefault();

            document.querySelector("#update-button").setAttribute('disabled','');
            document.querySelector("#update-button").textContent = 'Atualizando...';


            let formData = new FormData(document.querySelector('form'));  
            
            if ( !(typeof this.takePictureBlob === 'string')) {   
                formData.set('image_address_update', this.takePictureBlob);                
            } 

            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            }
            let prevPage = `${config.urlBase}/src/views/admin/things/manager/`;
                      
            await this.modelThings.update( prevPage, formData, 'Atualizado'); 
            document.querySelector("#update-button").textContent = 'Atualizar';
            
        });

    }

    async return(){

        document.querySelector("#return-button").addEventListener("click", async (e)=>{  
            e.preventDefault();

            let formData = new FormData(document.querySelector('form'));  
            formData.set('returned_status','1');
            
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            }
            let prevPage = `${config.urlBase}/src/views/admin/things/manager/`;
            document.querySelector("#return-button").setAttribute('disabled','');
            document.querySelector("#return-button").textContent = "Retirando";
            await this.modelThings.update( prevPage, formData, 'Retirado'); 
        });


    }
   
    enableButton(...fields){

        for (let i = 0; i < fields.length; i++) {
           
            document.querySelector(`#${fields[i]}`).addEventListener("keyup",()=>{
                document.querySelector("#update-button").removeAttribute("disabled");  
            });  

        }  
        
        document.querySelector('#list-categories').addEventListener('change',()=>{
            document.querySelector("#update-button").removeAttribute("disabled"); 
        });

    }    
    
    takePicture(){

        let video = document.querySelector('.cam-modal video');
        
        navigator.mediaDevices.getUserMedia({video:{            
            
            facingMode: {
                //exact: 'environment'
              }
            }
            
        })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(error => {
            console.log(error);
        })

            
        if(!(document.querySelector('#take-picture-button') == null)){
            document.querySelector('#take-picture-button').addEventListener('click', async () => { 
                HelperTabOrder.resetTabOrder(tabOrderRegisterModalCamera);
                HelperTabOrder.resetTabOrder(tabOrderRegisterModalTakePicture);
                HelperTabOrder.setTabOrder(tabOrderInteraction);

                document.querySelector('div.background-modal').style.display = 'none';                
                document.querySelector('body').style.overflow = 'auto';  

                let canvas = document.querySelector('canvas');            
                
                canvas.height = video.videoHeight;            
                canvas.width = video.videoWidth;
                
                let context = canvas.getContext('2d');
                context.drawImage(video, 0, 0);                        
                
                let img = document.querySelector('#img-picture');
                img.src = canvas.toDataURL('image/png');                

                try {            
                    const response = await fetch(img.src);                           
                    let blob = await response.blob();               
                    
                    this.takePictureBlob = blob;
                    document.querySelector('#update-button').removeAttribute('disabled')
                    alert('Foto tirada com sucesso');
                                
                } catch(e) {
                    console.log(e);
                }              
                
            });
        }       

    }  
    
    inputFileImageUploadPreview(globalThis = this){
            
        const inputFile = document.querySelector("#image-address-update");               

        inputFile.addEventListener("change", function (e) {
            const inputTarget = e.target;
            const file = inputTarget.files[0];            
            
            if (file) {
                const reader = new FileReader();
            
                reader.addEventListener("load", function (e) {
                const readerTarget = e.target;
            
                const img = document.querySelector("#img-picture"); 
                img.src = readerTarget.result;  
                                
                globalThis.takePictureBlob = "empty";
                document.querySelector('#update-button').removeAttribute('disabled')
                alert('Imagem carregada com sucesso.');
            
                });
            
                reader.readAsDataURL(file);
            }          
            
            document.querySelector('div.background-modal').style.display = 'none';
            let camera = document.querySelector('#camera');
            (camera !== null) && (document.querySelector('#camera').style.display = 'none');
            
            });

    }

    closeImageRegistrationModal(){
        document.querySelector('#exit-modal-button').addEventListener('click',()=>{
            document.querySelector('div.background-modal').style.display = 'none';

            HelperTabOrder.resetTabOrder(tabOrderRegisterModalTakePicture);
            HelperTabOrder.setTabOrder(tabOrderInteraction); 
        });
    
    }
    
    openImageRegistrationModal(){
        
        document.querySelector('#open-picture-modal').addEventListener('click',()=>{  
            document.querySelector('div.background-modal').style.display = 'block';          
            document.querySelector('.cam-modal').style.display = 'flex';
            document.querySelector('#img-register-modal').style.display = 'none';
            document.querySelector('body').style.overflow = 'hidden';

            HelperTabOrder.resetTabOrder(tabOrderRegisterModalTakePicture);            
            HelperTabOrder.setTabOrder(tabOrderRegisterModalCamera);
            
        });   

        document.querySelector('#img-picture').addEventListener('click',()=>{
            document.querySelector('div.background-modal').style.display = 'block';
            document.querySelector('#img-register-modal').style.display = 'block';
            document.querySelector('.cam-modal').style.display = 'none';

            HelperTabOrder.resetTabOrder(tabOrderInteraction);
            HelperTabOrder.setTabOrder(tabOrderRegisterModalTakePicture);
            
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
        values.push( {name:'Gerenciar Objetos', href: `${config.urlBase}/src/views/admin/things/`}  );
        values.push( {name:'Objetos filtrados', href:`${config.urlBase}/src/views/admin/things/manager/?id=0`}  );
        values.push( {name:'Editar objetos', href:this.retrieveURLCurrentPage()}  );       
        

        layoutBreadcrumbs.create(ul, values);
    }

    arrowBack(){
        let arrowButton = document.querySelector('.arrow-button');
        arrowButton.addEventListener('click',()=>{
            
            window.location.href = `${config.urlBase}/src/views/admin/things/manager/?id=0`;                
            
        });
    }

    appendFooter(){
        let containerFooter = document.querySelector("footer .container");
        const layoutFooter  = new LayoutFooter();
        layoutFooter.create(containerFooter, config, true);        
        
    } 

    sizeImgRegisterModal(){        
        let sizeImgRegisterModal = document.querySelector('#img-register-modal');
        
        sizeImgRegisterModal.style.width = `${(window.innerWidth -40)}px`;
        
    }    

    setTabOrder(){                       
        HelperTabOrder.setTabOrder(tabOrderInteraction);
    }

    setImgsRegisterModal(){
        document.querySelector('#exit-modal-button').setAttribute('src',`${config.urlBase}/assets/imgs/icons/close_FILL0_wght300_GRAD0_opsz24.svg`);
        document.querySelector('#open-picture-modal img').setAttribute('src',`${config.urlBase}/assets/imgs/icons/photo_camera_FILL0_wght300_GRAD0_opsz24.svg`);
        document.querySelector("label[for='image-address-update'] img").setAttribute('src',`${config.urlBase}/assets/imgs/icons/filter_FILL0_wght300_GRAD0_opsz24.svg`);
    }
    

}

const thingsInteraction = new ThingsInteraction();
thingsInteraction.createHeaderContent();
thingsInteraction.createBreadcrumbs();
await thingsInteraction.getThing();

await thingsInteraction.update();
await thingsInteraction.return();
thingsInteraction.enableButton("local", "description");
thingsInteraction.inputFileImageUploadPreview();
thingsInteraction.takePicture();
thingsInteraction.inputFileImageUploadPreview();
thingsInteraction.closeImageRegistrationModal();
thingsInteraction.openImageRegistrationModal();
thingsInteraction.arrowBack();
thingsInteraction.appendFooter();
thingsInteraction.sizeImgRegisterModal();
thingsInteraction.setTabOrder();
thingsInteraction.setImgsRegisterModal();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu('interaction');


