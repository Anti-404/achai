
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
5. No servidor Apache click no botão 'config' -> PHP (php.in). Nesse arquivo habilite as extensões gd (extension=gd) e zip (extension=zip) | IMPORTANTE: reinicie o servidor apache apos essas alteração. 
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

## Equisitos Funcionais

### Utilizador Administrador

| Funcionalidade  | Local | Situação |
| :---         |     :---       |       :---  |
| Logar  | admin/login/index.js   |   Feito    |
| Visualizar objetos já reservados  |  admin/panel/index.js   |   Feito    |
| Cadastrar objeto  |  admin/things/register/index.js   |   Feito    |
| Ler QR code  |  admin/things/qrcodereader/index.js   |   Feito    |
| Visualizar tela de gerenciar objetos   |  admin/things/index.js  |   Feito    |
| Visualizar tela de informações do objeto  | admin/things/interaction/index.js   |   Feito    |
| Editar informações do objeto  |  admin/things/interaction/index.js  |   Feito    |
| Retirar objeto do sistema  |  admin/things/interaction/index.js  |   Feito    |
| Retirar objeto do sistema  |  admin/things/thingreserved/index.js  |   Feito    |
| Cadastrar categoria  |  admin/categories/register/index.js  |   Feito    |
| Retirar categoria do sistema  |  admin/categories/index.js  |   Feito    |
| Alterar nome de usuário da conta do administrador  |  index.js  |   Feito    |
| Alterar e-mail da conta do administrador  |  admin/profile/index.js  |   Feito    |
| Alterar senha da conta do administrador  |  admin/profile/index.js  |   Feito    |
| Listar objetos que ultrapassaram o prazo máximo de 6 meses  |  admin/things/discard/index.js  |   Feito    |
| Filtrar os objetos por categorias   |  admin/things/index.js| Feito    |
| Pesquisar por meio de caixa de pesquisa | admin/panel/index.js |   Feito    |
| Pesquisar por meio de caixa de pesquisa | admin/things/manager/index.js |   Feito    |

### Utilizador Comum

| Funcionalidade  | Local | Situação |
| :---         |     :---       |       :---  |
| Visualizar a tela inicial  |  /index.js  |   Feito    |
| Filtrar objetos já reservados  |  /index.js  |   Feito    |
| Visualizar informações do objeto  |  users/things/show-object/index.js  |   Feito    |
| Reservar o objeto  |   users/things/show-object/index.js  |   Feito    |
| Enviar e-mail de reserva |   users/things/show-object/index.js |   Feito    |
| Filtrar os objetos por categorias   |  /index.js| Feito    |
| Pesquisar por meio de caixa de pesquisa | /index.js |   Feito    |


## Desenvolvedores

Esse projeto está sendo desenvolvido por alunos da UFC do curso SMD, a nossa equipe é a ANT-404. Participantes:

- Angelo Vinicius 
- Arthur Lourenço
- Carlos Douglas
- Ednara Miranda
- Guilherme Ferreira
- Hebert Klei
