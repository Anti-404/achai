import ModelCategories from '../../../../models/categories/index.js';
import ModelThings from '../../../../models/things/index.js';
import ModelEmail from '../../../../models/email/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

class ShowThing extends Controller{   

    constructor(){  
        super()      ;
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
        this.modelEmail = new  ModelEmail();
        this.identifier = this.retrieveURLId();                     

    }   

    async getThing(){            
        const thing = await this.modelThings.get(this.identifier);                           
        const category = await this.modelCategories.get(thing.result[0].category_id);         
        
        if(!thing.erro && !category.erro){            
            document.querySelector("#data-id").value = this.identifier;            
            document.querySelector("#code").textContent = `N°:${this.identifier}`;            
            
            document.querySelector("form img").setAttribute('src', `${config.urlBase}/${thing.result[0].image_address}`);            

            document.querySelector("#image-address").value = thing.result[0].image_address;                        

            document.querySelector("#category").value = category.result.name;

            document.querySelector("#category-id").value = thing.result[0].category_id;                        
            
            document.querySelector("#local").value = thing.result[0].local;

            document.querySelector("#description").value = thing.result[0].description;
            
            document.querySelector("#returned-status").value = thing.result[0].returned_status;
            
            document.querySelector("#date").value = thing.result[0].date;   

        }else{
            alert(thing.erro);
        }        
        
    } 

    itsMy(){   
        
        document.querySelector("#its-my-button").addEventListener("click",(e)=>{    
            e.preventDefault();            
           
           document.querySelector('#send-email-modal').style.display = 'block';
           document.querySelector('#first-form').style.display = 'none';

        });
    } 
    unDisabled(){
        const disabledFields =  document.querySelectorAll('[disabled]');
        disabledFields.forEach((item)=>{
            item.removeAttribute('disabled');
        });
    }
    sendEmail(){                
        document.querySelector("#send-email-button").addEventListener("click",async (e)=>{    
            e.preventDefault();                 
            this.unDisabled();           

           let formData = new FormData(document.querySelector('#first-form'));
                     
           formData.set('reserved_status',1);            
           
           let formEmail = document.querySelector("#send-email-modal form");                      
           if(!formEmail.to.value){
             alert('Insira o email');            
             formEmail.to.focus();
             return; 
            }           
            let formDataEmail = new FormData(); 

            formDataEmail.append('local', formData.get('local'));
            formDataEmail.append('local', formData.get('local'));
            formDataEmail.append('id', formData.get('id'));
            formDataEmail.append('description', formData.get('description'));

            document.querySelector('#send-email-modal').style.display = 'none';             
            // let qrcode = document.querySelector('#canvas').toDataURL("image/jpeg", 1.0);
                        
            // try {            
            //     const response = await fetch(qrcode);                           
            //     let blob = await response.blob();                              
                
            //     formDataEmail.append('qrcodeBlob',blob); 
                            
            // } catch(e) {
            //     console.log(e);
            // }  
           
            
            try {            
                const screenshotTarget = document.querySelector('#canvas');     
                let canvas2 = await html2canvas(screenshotTarget);
                let base64image = canvas2.toDataURL("image/jpeg", 1.0); 

                const response = await fetch(base64image);                           
                let blob = await response.blob();                              
                
                formDataEmail.append('qrcodeBlobScreeshot',blob); 
                            
            } catch(e) {
                console.log(e);
            } 


                       
            let response = await this.modelEmail.sendEmail(formDataEmail);

           if(response.error === ''){            
              this.modelThings.reserve('', formData, 'Reservado'); 
              document.querySelector('#qrcode-modal').style.display = 'flex';                                                                                                                                                                            
              
           }else{
            alert("Algo de errado não está certo.\n "+response.error);
           }          
                      

        });

    }
    
    generateQrCode(){        
        
        const qrcode = new QRCode("qrcode");
        
        let url = `${config.urlBase}/src/views/admin/things/thingreserved/?id=${this.identifier}`        
        if (!this.identifier) {
          alert("Id não enviado");          
          return;
        }
        
        qrcode.makeCode(url);
    }
    async canvas(){        

        let canvas = document.querySelector('#canvas');            
        canvas.style.display = 'block';
        let context = canvas.getContext('2d');
                
        canvas.height = 320;            
        canvas.width = 320;
        
        let img = document.querySelector("#qrcode img");

        img.addEventListener('load', function(){
               context.drawImage(this,35,35);
               img.style.display = 'none';
        });
                
    }

    confirmScreenQrcodeButton(){
         document.querySelector('#confirm-screen-qrcode-button').addEventListener('click', ()=>{
            window.location.href = config.urlBase;  
         });        

    }
    

}

const showThing = new ShowThing();
await showThing.getThing();
showThing.itsMy(); 
showThing.sendEmail(); 
showThing.generateQrCode(); 
showThing.canvas(); 
showThing.confirmScreenQrcodeButton(); 