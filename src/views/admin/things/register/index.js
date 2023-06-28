import ModelCategories from '../../../../models/categories/index.js';
import ModelThings from '../../../../models/things/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

import LayoutHeaderContent from '../../../components/headercontent/index.js';

import HelperSandwichMenu from '../../../helpers/sandwichmenu/index.js';

class ThingRegistration extends Controller{

    constructor(){
    super(); 
    this.select = document.querySelector("#category-id");
    this.modelCategories = new  ModelCategories();
    this.modelThings = new  ModelThings();
    this.prevPage = this.getPrevPageURL();       
    this.currentPage = this.retrieveURLCurrentPage();
    this.takePictureBlob = "empty";

    }

    async selectCategories(){         

        const allCategories = await this.modelCategories.getAll();

        if(!allCategories.error){                        
            for (let i = 0; i < allCategories.result.length; ++i) { 
                if(allCategories.result[i].name !== 'Todas') {
                    let option = document.createElement("option"); 
                    option.setAttribute("value",allCategories.result[i].id);              
                    option.appendChild(document.createTextNode(allCategories.result[i].name));
                    this.select.appendChild(option);                 
                }
            }           
            
        }    

    }
    

    save(){        
        document.querySelector("#save-button").addEventListener("click", (e)=>{             
            e.preventDefault();                      

            let formData = new FormData(document.querySelector('form'));            

            if ( !(typeof this.takePictureBlob === 'string')) {   
                formData.set('image_address', this.takePictureBlob);                
            }                        
            if(localStorage.getItem("hash")){
                formData.append('hash',localStorage.getItem("hash"));
                
            }                              
                                    
            this.modelThings.insert(this.prevPage, formData);     
            

        });
    }
   

    takePicture(){

        let video = document.querySelector('.cam-modal video');
        // const exactValue = {
        //     frontalCamera: 'user',
        //     backBamera: 'environment',
        //     leftBamera: 'left',
        //     rightBamera: 'right'

        // }
        navigator.mediaDevices.getUserMedia({video:{            
            facingMode: {
                exact: 'environment'
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
                document.querySelector('div.background-modal').style.display = 'none';
                // document.querySelector("#camera").style.display = "none";

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
                                
                } catch(e) {
                    console.log(e);
                }              
                
            });
        }       

    }

    inputFileImageUploadPreview(globalThis = this){
            
    const inputFile = document.querySelector("#image-address");               

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
        
            });
        
            reader.readAsDataURL(file);
        }          
        
        document.querySelector('div.background-modal').style.display = 'none';
        // document.querySelector('#camera').style.display = 'none';
        
        });

    }


    closeImageRegistrationModal(){
    document.querySelector('#exit-modal-button').addEventListener('click',()=>{
        document.querySelector('div.background-modal').style.display = 'none';
    });

    }

    openImageRegistrationModal(){
        
        document.querySelector('#open-picture-modal').addEventListener('click',()=>{  
            document.querySelector('div.background-modal').style.display = 'block';          
            document.querySelector('.cam-modal').style.display = 'flex';
            document.querySelector('#img-register-modal').style.display = 'none';
            
        });   

        document.querySelector('#img-picture').addEventListener('click',()=>{
            document.querySelector('div.background-modal').style.display = 'block';
            document.querySelector('#img-register-modal').style.display = 'block';
            document.querySelector('.cam-modal').style.display = 'none';
            //document.querySelector('#img-picture').removeAttribute('src');
            //document.querySelector('#camera').style.display = 'block';
            
        });        

        


    }

    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, false, true);
    } 
}

const thingRegistration = new ThingRegistration();
thingRegistration.createHeaderContent();
thingRegistration.selectCategories();
thingRegistration.save();
thingRegistration.takePicture();
thingRegistration.inputFileImageUploadPreview();
thingRegistration.closeImageRegistrationModal();
thingRegistration.openImageRegistrationModal();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu();
// HelperSandwichMenu.goToReturnedThings();
HelperSandwichMenu.exit();

