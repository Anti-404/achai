import ModelThing from '../../../../models/things/index.js';
import ModelZip from '../../../../models/zips/index.js';
import Controller from '../../../../core/controller/index.js';
import config from '../../../../../config.js';


class Discard extends Controller{
    constructor(){              
        super();       
        this.modelThing = new ModelThing(); 
        this.modelZip = new ModelZip(); 
        this.currentPage = this.retrieveURLCurrentPage(); 
                            
    }

       
    async allThingsDiscard(){

        const allThingsDiscard = await this.modelThing.getThingsDiscard();            
        let  thingsDiscardContainer = document.querySelector(".things-descard-list");

        if(!allThingsDiscard.error){ 
            
            for (let i = 0; i < allThingsDiscard.result.length; ++i) {
                let a = document.createElement("a");
                let figure = document.createElement("figure");
                let img = document.createElement("img");
                let figCaption = document.createElement("figcaption");             
                                                              
                a.setAttribute("id",allThingsDiscard.result[i].id);                        
                img.setAttribute("alt",allThingsDiscard.result[i].description);                                                        
                
                if(!(allThingsDiscard.result[i].image_address).includes('deletado:')){                                                        
                    img.setAttribute("src",`${config.urlBase}/${allThingsDiscard.result[i].image_address}`);
                }
                

                figCaption.appendChild(document.createTextNode(allThingsDiscard.result[i].description));                
                 
                figure.appendChild(img);
                figure.appendChild(figCaption);
                a.appendChild(figure);
                thingsDiscardContainer.appendChild(a);
                
            }

            
        } 

    }
 
    handlerFilesZip(){                
        document.querySelector("#files-zip-button").addEventListener('click', ()=>{
            let imagesElements = document.querySelectorAll('figure img');
            let imgsSrc = [];
            let formData = new FormData();

            imagesElements.forEach((img)=>{
                if(img.src){
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
    let  filesZipList = document.querySelector("#files-zip-list");
    
    if(!allFilesZip.error){ 
        for (let i = 0; i < allFilesZip.result.length; ++i) {
            
            let div = document.createElement("div");
            let a = document.createElement("a");
            let button = document.createElement("button");
                                                                      
            button.setAttribute("data-id",allFilesZip.result[i].id);                        
            a.setAttribute("href", `${config.urlBase}/${allFilesZip.result[i].file_address}` ); 
            button.setAttribute("id", 'delete-button'); 

            let fileName = (allFilesZip.result[i].file_address).split('/');            
            fileName = fileName[fileName.length-1];
            
            a.appendChild(document.createTextNode(fileName));
            button.appendChild(document.createTextNode('Excluir'));
            
            div.appendChild(a);
            div.appendChild(button);   
            filesZipList.appendChild(div);             
            
        }
    }
   }

   delete(){        
    let deleteButton = document.querySelector("#delete-button");
    if(deleteButton == null) return    

    document.querySelector("#delete-button").addEventListener("click",(e)=>{  
        e.preventDefault();  
        let formData = new FormData();
        formData.append('id',e.target.getAttribute('data-id'));

        if(localStorage.getItem("hash")){
            formData.append('hash',localStorage.getItem("hash"));            
        }   

        let id = e.target.getAttribute('data-id');
        
        this.modelZip.delete(this.currentPage,id, formData); 
    });
}

}   

const discard = new Discard();
discard.allThingsDiscard();
discard.handlerFilesZip();
await discard.handlerShowAllFilesZip();
discard.delete();