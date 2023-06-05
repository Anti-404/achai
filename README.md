
# Achaí
  
## O Projeto 
 
Este projeto tem por objetivo digitalizar o serviço de Achados e perdidos do Bloco UFC Virtual,trazendo mais praticidade tanto para o utilizador final quanto para a secretaria do bloco que administra o serviço  
  
## Instalação e Manutenção    

Para rodar o projeto é necessário ter em sua maquina um servidor web (o php instalado nele) e o banco de dados MySQL, tudo isso pode ser usado através do software [XAMPP] (https://www.apachefriends.org/), bastando instalá-lo e configurá-lo em sua maquina. Alem disso, se faz necessário a instalação do software [Composer] (https://getcomposer.org) para a instalação de dependências no projeto. 

### Instalação
1. Instale o executável do xampp e do composer (Só nexts padrão)
2. Clonar o projeto do Github (pode ser feito através do Github Desktop ou do comando `git clone [url]`) ou baixando o zip
3. Recorte a pasta 'achai' e cole dentro do diretório htdocs do xammp (C:\xampp\htdocs)
4. Inicie o xampp e ative o servidor Apache e o banco MySQL.
5. No servidor Apache click no botão 'config' -> PHP (php.in). Nesse arquivo habilite as extensões gd (extension=gd) e zip (extension=zip)
6. Com um terminal na pasta 'achai/api/' do projeto que foi clonado, instalar as dependências através do comando:
```  
composer install  
``` 
7. Por fim, através do phpmyadmin crie um banco de dados chamado 'achai' e importe o arquivo sql que se encontra na pasta 'db'
   
## Estrutura do Projeto

No diretório raiz do projeto, podemos encontrar as seguintes pastas:

### `/api`

A pasta `/api` é onde se encontra o back-end do sistema.

### `/assets`

A pasta `/assets` é onde se encontra as imagens, folhas de estilos e scripts que serão usado em todo sistema.

### `/assets`

A pasta `/assets` é onde se encontra as imagens, folhas de estilos e scripts que serão usado em todo sistema.

### `/db`

A pasta `/db` é onde se encontra o arquivo sql com a estrutura do banco

### `/src`

A pasta `/src` é onde se encontra o front-end

## Desenvolvedores

Esse projeto está sendo desenvolvido por alunos da UFC do curso SMD, a nossa equipe é a ANT-404. Participantes:

- ANGELO VINICIUS 
- ARTHUR OLIVEIRA
- CARLOS DOUGLAS
- EDNARA MIRANDA
- GUILHERME FERREIRA
- HEBERT KLEI
