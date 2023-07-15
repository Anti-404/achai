import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

const elementsListInteraction =  [                         
    {selector: "#img-picture"},   
    {selector: "#labelCategories"},   
    {selector: "#code"},   
    {selector: "#list-categories"},   
    {selector: "label[for='local']"},   
    {selector: "#local"},   
    {selector: "label[for='description']"},   
    {selector: "#description"},   
    {selector: "#return-button"},         
    {selector: "#update-button"},         
]

const tabOrderInteraction = [...tabOrderHeader, ...elementsListInteraction, ...tabOrderFooter];

const tabOrderRegisterModalTakePicture =  [      
    {selector: "#exit-modal-button"},
    {selector: "#open-picture-modal"},
    {selector: "label[for='image-address']"}
];

const tabOrderRegisterModalCamera =  [      
    {selector: "#take-picture-button"},         
         
];

export default tabOrderInteraction;
export {tabOrderRegisterModalTakePicture, tabOrderRegisterModalCamera};