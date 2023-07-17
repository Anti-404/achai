import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

 let elementsListRegister =  [      
    {selector: "#img-picture"},   
    {selector: "#labelCategories"},   
    
    {selector: "#category-id"},   
    {selector: "label[for='description']"},   
    {selector: "#description"},   
    {selector: "label[for='local']"},   
    {selector: "#local"},   
    {selector: "#save-button"},   
];

const tabOrderRegister = [...tabOrderHeader, ...elementsListRegister, ...tabOrderFooter];

const tabOrderRegisterModalTakePicture =  [      
    {selector: "#exit-modal-button"},
    {selector: "#open-picture-modal"},
    {selector: "label[for='image-address']"}
];

const tabOrderRegisterModalCamera =  [      
    {selector: "#take-picture-button"},         
         
];

export default tabOrderRegister;
export {tabOrderRegisterModalTakePicture, tabOrderRegisterModalCamera};