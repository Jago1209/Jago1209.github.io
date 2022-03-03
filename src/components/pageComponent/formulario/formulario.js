import $ from "jquery";
import {consulta} from './api'
import { getTabs } from "./tabs";

//ejecuto la api para traer la información del form
export function getFormulario(id,token,params){
    const Api_Formulario = consulta('form/',id,token);
    Api_Formulario.then(function (response) {
        if (response.statusText == "OK"){
            Api_Formulario.then((response) => response.json())
            .then((res) => {
                var formdata = res;
                //si el formulario no existe, se da la advertencia
                if(formdata.length == 0){
                alert(' No Hay informacion para crear el formulario con id '+id +', por favor verifique la configuracion')
                }else{
                    //reemplazo el nombre del formulario
                    $("#DinamicForm_").attr("name","DinamicForm_"+id);
                    $("#DinamicForm_").attr("id","DinamicForm_"+id);
                    $(document).prop('title', formdata[0].name_form);
    
                    //el formulario existe, se consultan los tabs correspondientes
                    getTabs(id,token,params,formdata);
                }
            })
        }else{
            // <div class='notification notice closeable'>
			// 	<p><span>Informacion!</span> No Hay informacion para crear el formulario con id[$id_form], por favor verifique la configuracion.</p>
			// 	<a class='close' href='#'></a>
			// </div>
            alert('No Hay informacion para crear el formulario con id '+id +', por favor verifique la configuracion')
        }
    });
}
