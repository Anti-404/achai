class LayoutFooter{

    constructor(){}

    async create(container, config, panel=false){  

        let ufcLink = document.createElement('a');
        ufcLink.href = 'https://www.ufc.br/';
        let ufcImg = document.createElement('img');
        ufcImg.src = `${config.urlBase}/assets/imgs/logo-ufc.png`;
        ufcImg.alt = `Link para o site da UFC`;

        if(panel){
            let aboutUs = document.createElement('a');
            aboutUs.href = '#';
            aboutUs.textContent = 'Sobre nós';

            let allRightsReserved = document.createElement('div');
            allRightsReserved.textContent = 'Todos os direitos reservados';

            container.appendChild(allRightsReserved);
            container.appendChild(aboutUs);
            
        }else{
            
            let anti404Link = document.createElement('a');
            anti404Link.href = 'https://github.com/Anti-404/achai';
            anti404Link.innerHTML = "Desenvolvido por <span>Anti-404</span>";        

            container.appendChild(anti404Link);
            
        }
        
        ufcLink.appendChild(ufcImg);
        container.appendChild(ufcLink);
    }


}

export default LayoutFooter;