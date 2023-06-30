import config from '../../../../config.js';

class LayoutHeaderContent{

    constructor(){}

    async create(container, hrefLink=config.urlBase, 
        flagSearchButton = true, flagSandwichMenu = false, flagBreadcrumb=false, flagInfo=true){  
            
        let divHeaderTop = document.createElement("div");
        divHeaderTop.setAttribute('class','header-top');

        let divHeaderTopbody = document.createElement("div");
        divHeaderTopbody.setAttribute('class','header-top-body');
        
        let divHeaderBody = document.createElement("div");
        divHeaderBody.setAttribute('class','header-body');
        
        let divBreadcrump = document.createElement("div");
        divBreadcrump.textContent = 'breadcrumb';        

        let divHeaderFooter = document.createElement("div");
        divHeaderFooter.setAttribute('class','header-footer');

        let divCategories = document.createElement("div");
        divCategories.setAttribute('class','categories');

        let linkLogo  = document.createElement("a");
        linkLogo.setAttribute('class','logo');
        linkLogo.setAttribute('href',hrefLink);

        let imgLogo  = document.createElement("img");        
        imgLogo.setAttribute('src',`${config.urlBase}/assets/imgs/logo.png`);
        imgLogo.setAttribute('alt','Achaí');

        let searchButton = document.createElement("span");
        searchButton.setAttribute('class','material-symbols-rounded search-button');        
        searchButton.style.backgroundImage = `url(${config.urlBase}/assets/imgs/icons/search_FILL0_wght300_GRAD0_opsz24.svg)`;
        searchButton.style.backgroundRepeat = `no-repeat`;
        searchButton.style.backgroundPosition = `center`;

        let sandwichMenu = document.createElement("span");
        sandwichMenu.setAttribute('class','material-symbols-rounded sandwich-menu-button');
        sandwichMenu.style.backgroundImage = `url(${config.urlBase}/assets/imgs/icons/menu_FILL0_wght300_GRAD0_opsz24.svg)`;
        sandwichMenu.style.backgroundRepeat = `no-repeat`;
        sandwichMenu.style.backgroundPosition = `center`;

        let infoButton = document.createElement("span");
        infoButton.setAttribute('class','material-symbols-rounded info-button');        
        infoButton.style.backgroundImage = `url(${config.urlBase}/assets/imgs/icons/info_FILL0_wght300_GRAD0_opsz24.svg)`;
        infoButton.style.backgroundRepeat = `no-repeat`;
        infoButton.style.backgroundPosition = `center`;
                  
       
        linkLogo.appendChild(imgLogo);
        
        flagSearchButton && divHeaderTopbody.appendChild(searchButton);            
        flagSandwichMenu && divHeaderTopbody.appendChild(sandwichMenu);  
        flagInfo && divHeaderTopbody.appendChild(infoButton);  
                  

        divHeaderTop.appendChild(linkLogo);
        divHeaderTop.appendChild(divHeaderTopbody);

        flagBreadcrumb && divHeaderBody.appendChild(divBreadcrump);

        divHeaderFooter.appendChild(divCategories);

        container.appendChild(divHeaderTop);
        container.appendChild(divHeaderBody);
        container.appendChild(divHeaderFooter);        
    
    }

}

export default LayoutHeaderContent;