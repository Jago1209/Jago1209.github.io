
import $ from "jquery";
import {consulta} from './api'
import { getFields } from "./campos"; 
import { getKeys } from "./keys";

//ejecuto la api para traer la información de los tabs
export function getTabs(id,token,params,formdata){
    const Api_Tabs = consulta('tabs/',id,token);
    Api_Tabs.then(function (response) {
        if (response.statusText == "OK"){
            Api_Tabs.then((response) => response.json())
            .then((res) => {
                //declaro los elementos del html donde va la info
                let nav=$('#tabs_nav_name')
                let tabContent = $('#id_container')

                //recorro todos los tabs que me devuelve la peticion
                //y los voy agregando al html
                for (var i = 0;i< res.length;i++){
                    //crea un elemento en la nav
                    let li = document.createElement('li');   
                    li.setAttribute('id','tab_name');
                    
                    //crea el div con ell mismo nombre del tab
                    let div = document.createElement('div');
                    div.setAttribute('id','tab'+res[i].tab_order+'b');
                    div.setAttribute('class','tab-pane fade');

                    //si es el primer elemento, lo declaro como activo y muestro el div de ese elemento
                    if(i == 0){  
                        li.innerHTML = `
                        <a data-toggle='tab' href='#tab${res[i].tab_order}b' class='active'>${res[i].tab_name}</a>`
                        div.setAttribute('class','tab-pane fade active show');
                    }else{
                        li.innerHTML = `
                        <a data-toggle='tab' href='#tab${res[i].tab_order}b'>${res[i].tab_name}</a>`
                    }

                    //agrego los elementos al html
                    nav.append(li); 
                    div.innerHTML =` `;
                    tabContent.append(div); 
                }
                //consulto todas las opciones disponibles de los select
                getKeys(id,token,formdata,params);
            })
        }
    });
}