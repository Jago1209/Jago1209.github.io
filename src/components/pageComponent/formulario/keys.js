import {consulta} from './api'
import { getFields } from './campos';

//ejecuto la api para traer la información de los selects
export function getKeys(id,token,formdata,params){
    const Api_Keys = consulta('key','',token);
    Api_Keys.then(function (response) {
        if (response.statusText == "OK"){
            Api_Keys.then((response) => response.json())
            .then((res) => {
                var keys = res;
                //consulto todos los campos que corresponden a ese formulario
                getFields(id,token,formdata,params,keys)
            })
        }
    });
}