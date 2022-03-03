import $ from "jquery";
import { createTextBox } from "./campos/texto";
import { createSelect } from "./campos/select";
import { createCheckBox } from "./campos/checkbox";
import { createFileBox } from "./campos/file";
import { getParamValue,putFieldGrouping,activarJquerys,clickSelect,dropZone } from "./tools";
import { saveData } from "../acciones/guardar";
import { deleteData } from "../acciones/eliminar";
import { getFile,deleteFile } from "../acciones/imagenes";

export var array_id_select = [];
export var array_group = [];
export var array_gruped = [];
export var array_gruped_atrb = [];
var all_fields = [];
var select_total = 0;
var msg_array = [];
var update = false;
var select_con_datos = []

export function definirCampos(keys,campos,formdata,params,data,id_data,field_data,id_geovisor){
    var msg = '';
    var campo_definido = '';
    var id_data_update = '';
    var files = false;

    //consulto si hay información relacionada con el id enviado
    if( formdata.length > 0){
        var titulo = formdata[0].name_form;
        var is_exist = true;

            if(data == ""){
                update = false;
                msg="           <input type='hidden' id='key' name='key' value='key_qr'>";
            
            }else{
                update = true;
                id_data_update = data[0].id_data;
            }
    }

    var name_form = "DinamicForm_"+formdata[0].id_form;
    var agrupo = "N";

    //recorro todo el json de los campos que retorno para este formulario
    for(var i=0;i<campos.length;i++){
        let campo_atributo = JSON.parse(campos[i].field_attributes)
        let campo_tipo = campo_atributo.field_type 
        let campo_obligatorio = campo_atributo.field_mandatory
        let campo_grupo = campo_atributo.field_gruped == undefined ? '' : campo_atributo.field_gruped
        let campo_ayuda = campo_atributo.field_help
        let campo_parametros = campo_atributo.field_options
        let campo_valor_default = campo_atributo.field_default_value == undefined ? '' : campo_atributo.field_default_value
        let campo_tab = campo_atributo.field_tab
        let campo_grupo_2 = campo_atributo.field_group == undefined ? '' : campo_atributo.field_group
        //reemplazo caracteres especiales para hacer coincidir el id del campo con las columnas de las tablas
        let campo_nombre = campos[i].field_name
        campo_nombre = campo_nombre.toLowerCase() 
        campo_nombre = campo_nombre.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
        campo_nombre = campo_nombre.substr(0,3);
        campo_nombre += '_'+campos[i].id_form_fld_def
        let val_default = ''

        msg_array[campo_tab] = msg_array[campo_tab] == undefined ? '' :msg_array[campo_tab]
        array_gruped[campo_grupo] = array_gruped[campo_grupo] == undefined ? '' : array_gruped[campo_grupo]

        if(campo_valor_default!==""){
            //no hace nada
        }
        if(update){
            for (var item in data[0]){
                if(campo_nombre == item){
                    if (data[0][item] != null){
                        val_default = data[0][item]
                    }
                }
            }
        }

        //mira si el campo es obligatorio u opcional
        let titulo = campos[i].field_name;
        if (campo_obligatorio == "Y"){
            titulo+=" <span><b>(requerido)</b></span>";
        }else{
            titulo+=" <span class=opc>(opcional)</span>";
        }
        
        //creamos campos de tipo texto, numerico o hidden
        if((campo_tipo=='text') || (campo_tipo=="number")|| (campo_tipo=="hidden")){
            val_default=val_default == ''? getParamValue(params,campo_nombre) : val_default
            campo_definido =createTextBox(campo_nombre,titulo,campo_ayuda,campo_parametros,campo_tipo,val_default,campo_obligatorio);
            if (campo_grupo!="")
            {
                array_gruped[campo_grupo]+=campo_definido;
                agrupo="S";
            }else{
                if (campo_tab=="")
                   {
                    msg+=campo_definido;
                   } 
            }
        }

        if((campo_tipo=="images") || (campo_tipo=="files")) //For a images or Files
        {
            campo_parametros="key=$key_qr&filter=" + campo_atributo.field_filter + "&max_files="+ campo_atributo.field_max_files+ "&name=$name" ;

            campo_definido=createFileBox(campo_nombre,titulo,campo_parametros,name_form,id_data);
            if (campo_grupo!="")
            {
                array_gruped[campo_grupo]+=campo_definido;
                agrupo="S";
            }else{
                if (campo_tab=="")
                {
                    msg+=campo_definido;
                } 
            }
            files = true;
        }

        //campos con menu desplegable
        if(campo_tipo=="select"){
            let lista = campo_atributo.field_list == undefined ? '': campo_atributo.field_list;
            val_default=val_default == ''? getParamValue(params,campo_nombre) : val_default
            campo_definido = createSelect(campo_nombre,titulo,campo_ayuda,campo_parametros,lista,val_default,campo_obligatorio,keys);
            array_id_select.push(campo_nombre);
            if (campo_grupo!="")
            {
                array_gruped[campo_grupo]+=campo_definido;
                agrupo="S";
            }else{
                if (campo_tab=="")
                   {
                    msg+=campo_definido;
                   } 
            }
            if(val_default != ""){
                select_total++;
                select_con_datos.push(campo_nombre)
            }
        }


        //campos con check box
        if(campo_tipo=="check"){
            let lista = campo_atributo.field_list == undefined ? '': campo_atributo.field_list;
            val_default=val_default == ''? getParamValue(params,campo_nombre) : val_default
            campo_definido = createCheckBox(campo_nombre,titulo,campo_ayuda,campo_parametros,lista,val_default,campo_obligatorio,keys);
            if (campo_grupo!="")
            {
                array_gruped[campo_grupo]+=campo_definido;
                agrupo="S";
            }else{
                if (campo_tab=="")
                   {
                    msg+=campo_definido;
                   } 
            }
        }

        
        if(campo_tab!=""){
            msg_array[campo_tab]+=campo_definido
        }

        //si el campo select trae mas opciones al realizar la seleccion,
        //crea otro div para agregar los datos correspondientes
        if(campo_grupo_2!=""){
            let gt = campo_atributo.field_group_title == undefined ? '' : campo_atributo.field_group_title;
            array_gruped_atrb[campo_grupo_2] = gt;
            array_group[campo_nombre] = campo_grupo_2
            if(campo_grupo != ""){
                array_gruped[campo_grupo]+=`<div class='col-md-12' id='${campo_grupo_2}'></div>`;
            }else{
                if(campo_tab==""){
                    msg+=`<div class='col-md-12' id='${campo_grupo_2}'></div>`
                }else{
                    msg_array[campo_tab]+=`<div class='col-md-12' id='${campo_grupo_2}'></div>`
                }
            }
        }

        //agrego todos los campos a un arreglo
        //para luego recorrer y enviar los campos que no se usaron
        //como vacios '' y no como null
        all_fields.push(campo_nombre)
    }

    all_fields.push('key')


    //nombre de la tabla a guardar
    var table_db = formdata[0].id_form_table;
    //total de registros en la tabla
    var count_db = formdata[0].num_reg;
    //nombre del id para guardar los datos
    var id_data_db = table_db + (count_db+1)

    msg+=`           <input type='hidden' id='select_total' name='select_total' value='${select_total}'>`;
    
    //traigo el dato para saber si se peude mostrar el o los botones
    var show_button = params.get('response_query');
    if(show_button == "true"){
        //Adiciona el Boton de Grabar Y Eliminar
        let button_action=`<div align='right' class='col-md-12'>
        <a  href='#' id='guardar' class='button preview disabled'>Guardar <i class="fas fa-cloud-upload-alt"></i></a>`;
        msg+=button_action;
        //onclick='javascript:executeAction(${formdata[0].id_form},${name_form}); javascript:saveAllImg(${name_form},${formdata[0].id_form});'

        if(update){
            let button_delete=`
            <a  href='#' id='eliminar' class='button preview delete'>Eliminar <i class='fa fa-trash'></i></a>
            </div>`;
            msg+=button_delete+"</form>";
            //$_SESSION["$id_form.id_data_table"]= $data['id_data'];
            //onclick='javascript:deleteAction(\"${formdata[0].id_form}\",\"${table_db}\",\"${field_data}\"); javascript:removeAllImg(${name_form},${formdata[0].id_form}); '

        }else {
            msg+=`</div></form>`;
        }
    }

    //agrego el titulo del formulario
    $("#response_titulo").html(titulo);

    //recorro los campos y los agrego al tab que corresponde cada uno
    for(i=0;i<msg_array.length;i++){
        let tab_name = "#tab"+i+"b";
        $(tab_name).html(msg_array[i]);
    }

    //agrego los campos que van por fuera de tabs y agrego los botones
    $("#response_query").html(msg);

    //activamos los jquery para que detecten los eventos
    activarJquerys(formdata[0].id_form,0);

    //escuchar click en el boton guardar
    $('#guardar').on('click',function(){
        let name_f = '#'+name_form
        name_f = $(name_f).serializeArray()
        saveData(name_f,id_data_db,id_data,field_data,id_geovisor,all_fields,update,id_data_update)
    })

    //escuchar click en el boton de eliminar
    $('#eliminar').on('click',function(){
        var resp = confirm('¿Desea borrar el registro actual?')
        if(resp){
            deleteData(data[0].id_data);
            if(files){
                deleteFile('','',id_data,true)
            }
        }
    })

    //simulo el click para los campos select que retornan con datos
    clickSelect(select_con_datos)

    //si hay algun campo de archvivos, activo la librería
    if(files){
        dropZone(id_data);
        getFile(id_data);
    }
}