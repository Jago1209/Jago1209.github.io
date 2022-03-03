//campos con menu desplegable
export function createSelect(campo_nombre,titulo,campo_ayuda,campo_parametros,lista,val_default,campo_obligatorio,keys){
    let values=`<option label=' '>${campo_ayuda}</option>	`;

    for(var i=0;i<keys.length;i++){
        if(keys[i].group_domain == lista){
            let def="";
            if (val_default == keys[i].value_domain){
                def = " selected  ";
            }
            values+=`<option ${def} value='${keys[i].value_domain}'>${keys[i].key_domain}</option>`;
        }
    }


    return `<div class='col-md-6'>
    <h5>${titulo}</h5>
    <span id='E${campo_nombre}'></span>
    <select class='chosen-select ${campo_obligatorio}' id='${campo_nombre}' name='${campo_nombre}' ${campo_parametros}  placeholder='${campo_ayuda}' >
    ${values}
    </select>
    </div>`;
}