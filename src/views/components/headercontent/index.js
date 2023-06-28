import config from '../../../../config.js';

class LayoutHeaderContent{

    constructor(){}

    async create(container, hrefLink=config.urlBase, flagSearchButton = true, flagSandwichMenu = false, flagBreadcrumb=false){  
            
        let divHeaderTop = document.createElement("div");
        divHeaderTop.setAttribute('class','header-top');

        let divHeaderTopbody = document.createElement("div");
        divHeaderTopbody.setAttribute('class','header-top-body');
        
        let divHeaderBody = document.createElement("div");
        divHeaderBody.setAttribute('class','header-body');
        
        let divBreadcrump = document.createElement("div");
        divBreadcrump.textContent = 'Breadscrump';        

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
        searchButton.textContent = 'search';

        let sandwichMenu = document.createElement("span");
        sandwichMenu.setAttribute('class','material-symbols-rounded sandwich-menu-button');
        sandwichMenu.textContent = 'menu';          
       
        linkLogo.appendChild(imgLogo);
        
        flagSearchButton && divHeaderTopbody.appendChild(searchButton);            
        flagSandwichMenu && divHeaderTopbody.appendChild(sandwichMenu);            

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