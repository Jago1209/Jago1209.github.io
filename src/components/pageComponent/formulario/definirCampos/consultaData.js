import { consulta } from "../api";
import { definirCampos } from "./definirCampos";

export function consultaInfo(keys,campos,formdata,params){
    var field_data = '';
    var id_data= params.get('id_data');
    var caracter=id_data.indexOf(',')
    if(caracter>=0){
        field_data = 'coordenada';
    }else{
        field_data = 'cod_cat';
    }

    var id_geovisor= params.get('id_geovisor');

    const Api_Data = consulta('consulta/',field_data+'/'+id_data+'/'+id_geovisor,'')
    Api_Data.then(function (response) {
        if (response.statusText == "OK"){
            Api_Data.then((response) => response.json())
            .then((res) => {
                var data = res;
                definirCampos(keys,campos,formdata,params,data,id_data,field_data,id_geovisor)
            })
        }
    });
}
