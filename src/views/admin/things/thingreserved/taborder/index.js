import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

const elementsListThingReserved =  [                         
    {selector: "form #img"},   
    {selector: "#labelCategory"},   
    {selector: "#code"},   
    {selector: ".category"},            
    {selector: "#labelDescription"},   
    {selector: ".description"},   
    {selector: "#labelLocal"},   
    {selector: ".local"},   
    {selector: "#labelDate"},       
    {selector: ".date"},   
    {selector: "#return-button"},                      
];

const elementsList = [...tabOrderHeader, ...elementsListThingReserved, ...tabOrderFooter] ;

export default elementsList;