import { consulta } from './api'
import { consultaInfo } from './definirCampos/consultaData';
//ejecuto la api para traer la información de los campos
export function getFields(id,token,formdata,params,keys){
    const Api_Fields = consulta('campos/',id,token)
    Api_Fields.then(function (response) {
        if (response.statusText == "OK"){
            Api_Fields.then((response) => response.json())
            .then((res) => {
                var campos = res;
                //con los campos correspondientes y los keys
                //se definen todos los campos
                consultaInfo(keys,campos,formdata,params)
            })
        }
    });
}
