export default class Controller{

    retrieveURLId(){
        let identifier = '';
        let url = this.retrieveURLCurrentPage();
        let urlFirstBreak = url.split("?id=");
        
        if(url.indexOf('&&') == -1){
            identifier = urlFirstBreak[1];  
        }else{
            let urlSecondBreak = urlFirstBreak[1].split("&&");                    
            identifier = urlSecondBreak[0];
        } 
        
        return identifier;    
    }     

    retrieveURLCurrentPage(){                     
        
        return window.location.href;    
    }

    getPrevPageURL(){
        let url = this.retrieveURLCurrentPage();
        let prevPage = '';
 
        if(url.indexOf('prevPage=') != '-1'){
             prevPage = url.split('prevPage=')[1];
        }
        
        
        return prevPage;
     }
     
     
}