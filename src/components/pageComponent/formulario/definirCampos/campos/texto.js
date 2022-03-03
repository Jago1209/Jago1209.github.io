//creamos campos de tipo texto, numerico o hidden
export function createTextBox(campo_nombre,titulo,campo_ayuda,campo_parametros,campo_tipo,val_default,campo_obligatorio){
    if (campo_tipo=="hidden")
    {
        return `<div class='col-md-6'>
        <span id='E${campo_nombre}'></span>
        <input type='${campo_tipo}' id='${campo_nombre}' name='${campo_nombre}' ${campo_parametros} placeholder='${campo_ayuda}' value='${val_default}'>
        </div>`;

    }else{
        return `<div class='col-md-6'>
        <h5>${titulo}</h5> 
        <span id='E${campo_nombre}'></span>
        <input type='${campo_tipo}' class='${campo_obligatorio}' id='${campo_nombre}' name='${campo_nombre}' ${campo_parametros} placeholder='${campo_ayuda}' value='${val_default}'> 
        </div>`; 
    }
}
