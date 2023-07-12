import config from '../../../../config.js';

class LayoutHeaderContent{

    constructor(){}

    async create(container, hrefLink=config.urlBase, 
        flagSearchButton = true, flagSandwichMenu = false, flagBreadcrumb=false, flagInfo=true, flagArrow=true){  
            
        let divHeaderTop = document.createElement("div");
        divHeaderTop.setAttribute('class','header-top');

        let divHeaderTopHeader = document.createElement("div");
        divHeaderTopHeader.setAttribute('class','header-top-header');

        let divHeaderTopBody = document.createElement("div");
        divHeaderTopBody.setAttribute('class','header-top-body');
        
        let divHeaderBody = document.createElement("div");
        divHeaderBody.setAttribute('class','header-body');
        
        let ulBreadcrump = document.createElement('ul');
        ulBreadcrump.setAttribute('class', 'breadcrumb')      
        ulBreadcrump.setAttribute('role', 'breadcrumb')      

        let divHeaderFooter = document.createElement("div");
        divHeaderFooter.setAttribute('class','header-footer');

        let divCategories = document.createElement("div");
        divCategories.setAttribute('class','categories');

        let linkLogo  = document.createElement("a");
        linkLogo.setAttribute('class','logo');
        linkLogo.setAttribute('href', hrefLink);

        let imgLogo  = document.createElement("img");        
        imgLogo.setAttribute('src',`${config.urlBase}/assets/imgs/logo.png`);
        imgLogo.setAttribute('alt','logo Achaí - link painel de controle');

        let searchButton = document.createElement("img");
        searchButton.setAttribute('class','material-symbols-rounded search-button');        
        searchButton.src = `${config.urlBase}/assets/imgs/icons/search_FILL0_wght300_GRAD0_opsz24.svg`;        
        searchButton.alt = `Botão pesquisar`;        

        let sandwichMenu = document.createElement("img");
        sandwichMenu.setAttribute('class','material-symbols-rounded sandwich-menu-button');
        sandwichMenu.src= `${config.urlBase}/assets/imgs/icons/menu_FILL0_wght300_GRAD0_opsz24.svg`;        
        sandwichMenu.style.width = "35px";
        sandwichMenu.style.height = "35px";
        sandwichMenu.alt = "Menu botão";

        let infoButton = document.createElement("img");
        infoButton.setAttribute('class','material-symbols-rounded info-button');        
        infoButton.src = `${config.urlBase}/assets/imgs/icons/info_FILL0_wght300_GRAD0_opsz24.svg`; 
        infoButton.alt = `botão informação`; 
        
        let arrowButton = document.createElement("img");
        arrowButton.setAttribute('class','material-symbols-rounded arrow-button');        
        arrowButton.setAttribute('alt','Botão voltar');        
        arrowButton.src = `${config.urlBase}/assets/imgs/icons/arrow_back_FILL0_wght300_GRAD0_opsz24.svg`;       
       
        
        flagSearchButton && divHeaderTopBody.appendChild(searchButton);            
        flagSandwichMenu && divHeaderTopBody.appendChild(sandwichMenu);  
        flagInfo && divHeaderTopBody.appendChild(infoButton);  
        flagArrow && divHeaderTopHeader.appendChild(arrowButton);  
        
        linkLogo.appendChild(imgLogo);
        
        divHeaderTopHeader.appendChild(linkLogo);
        divHeaderTop.appendChild(divHeaderTopHeader);
        divHeaderTop.appendChild(divHeaderTopBody);

        flagBreadcrumb && divHeaderBody.appendChild(ulBreadcrump);

        divHeaderFooter.appendChild(divCategories);

        container.appendChild(divHeaderTop);
        container.appendChild(divHeaderBody);
        container.appendChild(divHeaderFooter);        
    
    }

}

export default LayoutHeaderContent;