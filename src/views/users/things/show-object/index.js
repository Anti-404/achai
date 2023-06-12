import ModelCategories from '../../../../models/categories/index.js';
import ModelThings from '../../../../models/things/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';

class ShowThing extends Controller{   

    constructor(){  
        super()      ;
        this.modelCategories = new  ModelCategories();
        this.modelThings = new  ModelThings();
        this.identifier = this.retrieveURLId();                     

    }   

    async getThing(){            
        const thing = await this.modelThings.get(this.identifier);                           
        const category = await this.modelCategories.get(thing.result[0].category_id);         
        
        if(!thing.erro && !category.erro){            
            document.querySelector("#data-id").value = this.identifier;            
            document.querySelector("#code").appendChild(document.createTextNode(this.identifier));            
            
            document.querySelector("form img").setAttribute('src', `${config.urlBase}/${thing.result[0].image_address}`);            

            document.querySelector("#image-address").value = thing.result[0].image_address;                        

            document.querySelector("#category").innerHTML = category.result.name;

            document.querySelector("#category-id").value = thing.result[0].category_id;                        
            
            document.querySelector("#local").value = thing.result[0].local;

            document.querySelector("#description").value = thing.result[0].description;
            
            document.querySelector("#returned-status").value = thing.result[0].returned_status;
            
            document.querySelector("#date").value = thing.result[0].date;
            
            let message = `Codigo: ${this.identifier} Local: ${thing.result[0].local} Descrição: ${thing.result[0].description}  
            `;
            document.querySelector("#send-email-modal #message-body").value = message;
            
            

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

    sendEmail(){        
        document.querySelector("#send-email-button").addEventListener("click",async (e)=>{    
            e.preventDefault();                 
                      
           let formData = new FormData(document.querySelector('#first-form'));
           formData.set('reserved_status',1);            
           
           let formEmail = document.querySelector("#send-email-modal form");                      
           if(!formEmail.to.value){
             alert('Insira o email');            
             formEmail.to.focus();
             return; 
            }
           
            document.querySelector('#send-email-modal').style.display = 'none'; 
            let response = await this.modelThings.sendEmail(formData);

           if(!response.erro){
               this.modelThings.reserve('', formData, 'Reservado'); 
               document.querySelector('#qrcode-modal').style.display = 'block';                                         
                                       
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
showThing.confirmScreenQrcodeButton(); 