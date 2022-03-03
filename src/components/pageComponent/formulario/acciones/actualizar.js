import $ from "jquery";
import { actualizar } from "../api";

export function update_form(id_data,formdata){

    const Api_Actualizar = actualizar(id_data,formdata);
    Api_Actualizar.then(function (response) {
        if (response.statusText == "OK"){
            Api_Actualizar.then((response) => response.json())
            .then((res) => {
                var html=`
                <div class='add-listing-section margin-top-45'>

                <!-- Headline -->
                <div class='add-listing-headline'>
                    <h2><i class="fas fa-edit"></i> Información Actualizada</h2>
                </div>
                <div class='row with-forms'>
                <div class='col-md-6'>
                <h5><h3>Resultado</h3>
                La informacion del formulario fue Actualizada con éxito.
                </h5>
                </div>

                <div align='right' class='col-md-12'></div>
                
                </div></div><br>
                `;
                $('#response_query_out').html(html)

            })
        }else{
            alert('Ocurrió un error al actualizar la información')
            console.log('Fallo Al Actualizar el resgistro');
        }
    });
}