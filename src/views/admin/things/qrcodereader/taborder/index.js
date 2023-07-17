import tabOrderHeader from "../../../../components/headercontent/taborder/index.js";
import tabOrderFooter from "../../../../components/footer/taborder/index.js";

const elementsListQrCodeReader=  [                         
    {selector: "#preview"}, 
];

const elementsList = [...tabOrderHeader, ...elementsListQrCodeReader, ...tabOrderFooter] ;

export default elementsList;