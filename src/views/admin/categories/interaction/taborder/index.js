import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

const elementsListCategoriesRegister = [                         
    {selector: "label[for='name']"},          
    {selector: "#name"},          
    {selector: "#save-button"},          
];

const elementsList = [...tabOrderHeader, ...elementsListCategoriesRegister, ...tabOrderFooter] ;

export default elementsList;