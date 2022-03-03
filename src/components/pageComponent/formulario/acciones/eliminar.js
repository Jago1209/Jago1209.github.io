import $ from "jquery";
import { borrar } from "../api";

export function deleteData(data){
    const Api_Borrar = borrar(data);
    Api_Borrar.then(function (response) {
        if (response.statusText == "No Content"){
                var html=`
                <div class='add-listing-section margin-top-45'>

                <!-- Headline -->
                <div class='add-listing-headline'>
                    <h2><i class='fa fa-trash'></i> Información Eliminada</h2>
                </div>
                <div class='row with-forms'>
                <div class='col-md-6'>
                <h5><h3>Resultado</h3>
                La informacion del formulario fue eliminada con éxito.
                </h5>
                </div>

                <div align='right' class='col-md-12'></div>
                
                </div></div><br>
                `;
                $('#response_query_out').html(html)
        }else{
            alert('Ocurrió un error al eliminar la información')
            console.log('Fallo Al Eliminar el resgistro');
        }
    });
}