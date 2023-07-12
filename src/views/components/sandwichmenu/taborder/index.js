import tabOrderHeader from "../../../components/headercontent/taborder/index.js";
 
 let elementsListMenu =  [
    {selector: "img[alt='Fechar menu']"},
    {selector: ".sandwich-menu-body .body-modal div h3"},
    {selector: ".profile-button"},
    {selector: ".discard-things-button"},
    {selector: ".category-manager-button"},       
]
const elementsList = [...tabOrderHeader, ...elementsListMenu];
export default elementsList;