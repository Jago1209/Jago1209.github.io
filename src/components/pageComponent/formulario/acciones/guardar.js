import $ from "jquery";
import { guardar } from "../api";
import { update_form } from "./actualizar";

export function saveData(data,id_data_db,id_data,field_data,id_geovisor,all_fields,update,data_update){
    var formdata = new FormData();

    for(var field in all_fields){
        let exist = false;
        //recorro todos los campos que traigo del formulario con datos
        //y todos los campos que fueron definidos en la bd
        for(var item in data){
            if (data[item].name == all_fields[field]){
                formdata.append(data[item].name, data[item].value);
                exist = true
            }
        }
        //los campos que no se utilizaron se llenan como vacíos
        if(!exist){
            formdata.append(all_fields[field], '');
        }
    }

    //agrego datos extras a la petición de guardar
    formdata.append('id_geovisor',id_geovisor);
    formdata.append(field_data,id_data);

    //en caso tal de que esté actualizando en lugar de crear un registro
    //lo envío a otra función
    if(update){
        update_form(data_update,formdata)
    }else{
        formdata.append('id_data',id_data_db);
        const Api_Guardar = guardar(formdata);
        Api_Guardar.then(function (response) {
            if (response.statusText == "Created"){
                    var html=`
                    <div class='add-listing-section margin-top-45'>

                    <!-- Headline -->
                    <div class='add-listing-headline'>
                        <h2><i class="fas fa-cloud-download-alt"></i> Información Guardada</h2>
                    </div>
                    <div class='row with-forms'>
                    <div class='col-md-6'>
                    <h5><h3>Resultado</h3>
                    La informacion del formulario fue guardada con éxito.
                    </h5>
                    </div>

                    <div align='right' class='col-md-12'></div>
                    
                    </div></div><br>
                    `;
                    $('#response_query_out').html(html)
            }else{
                alert('Ocurrió un error al guardar la información')
                console.log('Fallo Al Guardar el resgistro');
            }
        });
    }

    
}