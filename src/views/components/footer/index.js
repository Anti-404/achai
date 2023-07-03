class LayoutFooter{

    constructor(){}

    async create(container, config){      

        let ufcLink = document.createElement('a');
        ufcLink.href = 'https://www.ufc.br/';
        let ufcImg = document.createElement('img');
        ufcImg.src = `${config.urlBase}/assets/imgs/logo-ufc.png`;

        let anti404Link = document.createElement('a');
        anti404Link.href = 'https://github.com/Anti-404/achai';
        anti404Link.innerHTML = "Desenvolvido por <span>Anti-404</span>";
      

        ufcLink.appendChild(ufcImg);
        container.appendChild(ufcLink);
        container.appendChild(anti404Link);
    
    }


}

export default LayoutFooter;