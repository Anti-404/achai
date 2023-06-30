<?php
use core\Router;

$router = new Router();

$router->get('/category', 'CategoryController@index'); 
$router->get('/category/get/{id}', 'CategoryController@get'); 
$router->get('/category/getcategorybyname/{name}', 'CategoryController@getCategoryByName'); 
//$router->delete('/category/delete/{id}', 'CategoryController@delete'); 
//$router->put('/category/update', 'CategoryController@update');
$router->post('/category/delete/{id}', 'CategoryController@delete'); 
$router->post('/category/update', 'CategoryController@update');
$router->post('/category/insert', 'CategoryController@insert');

$router->get('/thing', 'ThingController@index'); 
$router->get('/thing/get/{id}', 'ThingController@get'); 
$router->delete('/thing/delete/{id}', 'ThingController@delete'); 
$router->post('/thing/update', 'ThingController@update');
$router->post('/thing/reserve', 'ThingController@reserve');
$router->post('/thing/insert', 'ThingController@insert');
$router->post('/thing/compressdescarded', 'ThingController@compressDescarded');
$router->get('/thing/getallbycategory/{categoryid}', 'ThingController@getAllByCategory');
$router->get('/thing/getallreserved', 'ThingController@getAllReserved');
$router->get('/thing/getreservedbyid/{id}', 'ThingController@getReservedById'); 
$router->get('/thing/getalldiscard', 'ThingController@getAllDiscard');
$router->get('/thing/getallreturned', 'ThingController@getAllReturned');
$router->get('/thing/getallbycategoryandreserved/{categoryid}', 'ThingController@getAllByCategoryAndReserved');
$router->get('/thing/getallbydescription', 'ThingController@getAllByDescription');

$router->get('/admin/get/{id}', 'AdminController@get');
$router->post('/admin/getbyhash', 'AdminController@getByHash');
$router->post('/admin/login', 'AdminController@login'); 
$router->post('/admin/update', 'AdminController@update'); 

$router->get('/zip', 'ZipController@index'); 
$router->delete('/zip/delete/{id}', 'ZipController@delete');

$router->post('/email/sendemail', 'EmailController@sendemail');
