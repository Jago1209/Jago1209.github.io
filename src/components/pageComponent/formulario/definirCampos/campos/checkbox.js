//campos con check box
export function createCheckBox(campo_nombre,titulo,campo_ayuda,campo_parametros,lista,val_default,campo_obligatorio,keys){
    let values=`<option label=' '>${campo_ayuda}</option>	`;
    let checkValue = val_default.split(',');
    let s = 0;
    let slip;
    for(var i=0;i<keys.length;i++){
        if(keys[i].group_domain == lista){
            let def="";
            for (var j=0;j<checkValue.length;j++){
                if(checkValue[j] == keys[i].value_domain){
                    def=" checked ";
                }
            }
            slip="*SERIE="+s;
            let name_s=campo_nombre+slip;
            values+=`<input type='checkbox' class='check' id='${name_s}' name='${name_s}' ${def} value='${keys[i].value_domain}'><label for='${name_s}'>${keys[i].key_domain}</label>`;
            s++;
        }
    }

    return `<div class='col-md-6'>
    <h5>${titulo}</h5>
    <span id='E${campo_nombre}'></span>
    <div class='checkboxes in-row margin-bottom-20'>
    ${values}
    </div>
    <input type='hidden' class='${campo_obligatorio}' id='${campo_nombre}' name='${campo_nombre}' value='${val_default}'>
    </div>`
}