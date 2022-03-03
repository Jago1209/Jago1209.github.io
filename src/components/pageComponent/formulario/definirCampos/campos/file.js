
export function createFileBox(campo_nombre,titulo,campo_parametros,name_form,id_data)
{
    return `<div class='col-md-6'>
                <h5>${titulo}</h5>
                <span id='E${campo_nombre}'></span>
                <div class="dropzone" id="myAwesomeDropzone"> 
            </div>
            <div class="col-md-12 divImg" id="divImg">
            </div>`;

}