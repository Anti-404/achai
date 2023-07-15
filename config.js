let host = 'localhost'
let ssl = false;

host = 'achai2.000webhostapp.com';
ssl = true;

host = 'achaiachadoseperdidos.azurewebsites.net';
ssl = true;

const config =  {
    urlBase:(ssl)?`https://${host}`:`http://${host}`,        
    
}

export default config; 