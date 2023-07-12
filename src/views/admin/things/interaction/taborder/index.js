import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

const elementsListCurrent =  [                         
    {selector: "#img-picture"},   
    {selector: "label[for='list-categories']"},   
    {selector: "#code"},   
    {selector: "#list-categories"},   
    {selector: "label[for='local']"},   
    {selector: "#local"},   
    {selector: "label[for='description']"},   
    {selector: "#description"},   
    {selector: "#return-button"},         
    {selector: "#update-button"},         
]

const elementsList = [...tabOrderHeader, ...elementsListCurrent, ...tabOrderFooter] ;

export default elementsList;