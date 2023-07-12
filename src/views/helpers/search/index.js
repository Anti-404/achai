import LayoutModalSearch from '../../components/modalsearch/index.js';



class HelperSearch{
    constructor(){}

    static searchItem(){       
        let searchItem = document.querySelector('.search-item');

        if(searchItem == null){
            return;
        }

        searchItem.addEventListener('keyup',()=>{
            let input = document.querySelector('.search-item').value
            input=input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            
            let x = document.querySelectorAll('.things-list a');            
            
            for (let i = 0; i < x.length; i++) {             
                 if (!x[i].outerText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(input)) {
                    x[i].style.display="none";
                }
                else {
                    x[i].style.display="block";                 
                }
            }
            
        });
    }

    static createModalSearch(){
        const layoutModalSearch = new LayoutModalSearch();
        layoutModalSearch.create(document.querySelector('.background-modal .container'));
    }

    static openSearchModal(){          
        

        document.querySelector('header .container div .search-button').addEventListener('click',()=>{
            document.querySelector('body .background-modal').style.display = 'block';
            document.querySelector("#search-modal").style.display = 'block';
            let sandwichMenuBody = document.querySelector(".sandwich-menu-body");
            (sandwichMenuBody !== null) && (document.querySelector(".sandwich-menu-body").style.display = 'none');            
            document.querySelector('.search-bar-modal .search-item').focus();            
        });
    }

    static closeSearchModal(){
        if(document.querySelector('header .container div .search-button') === null) return;
        document.querySelector('#search-modal .search-bar-modal .search-item').addEventListener('blur',(event)=>{           
           document.querySelector('#search-modal .search-bar-modal .search-item').value = '';
           document.querySelector('body .background-modal').style.display = 'none';
            
        });        
    }

}

export default HelperSearch;