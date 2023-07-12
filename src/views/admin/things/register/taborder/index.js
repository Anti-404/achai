import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

 let elementsListRegister =  [      
    {selector: "#img-picture"},   
    {selector: "label[for='category-id']"},   
    {selector: "#category-id"},   
    {selector: "label[for='description']"},   
    {selector: "#description"},   
    {selector: "label[for='local']"},   
    {selector: "#local"},   
    {selector: "#save-button"},   
];

const elementsList = [...tabOrderHeader, ...elementsListRegister, ...tabOrderFooter];
export default elementsList;