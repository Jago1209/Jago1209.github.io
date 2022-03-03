import $ from "jquery";
import { array_gruped,array_gruped_atrb,array_id_select,array_group } from "./definirCampos";
import Dropzone from "dropzone";
import { saveFile } from "../acciones/imagenes";

var requeridos_actual = 0;
var files = []

//busca si hay un valor que llegue por la url de ese campo
export function getParamValue(paramUrl,parametro)
{
    var res = "";

    for(var pair of paramUrl.entries()) {
        if(pair[0] == parametro){
            res= paramUrl.get(parametro);
            return res;
        }
     }
     
    if(res == "" ){
        return "";
    }
}

//al seleccionar una opción en los menu desplegable, se busca si tiene asociados mas campos
export function putFieldGrouping(id_form,value,total,target,name_field){

    let sal_fld='';
    let sal_gr ='';
    let counter=1;
    //Extraer Indice de agrupamiento
    let pos_ini = name_field.indexOf("*");
    let pos_fin = name_field.indexOf("_");
    let len=pos_fin-pos_ini;
    let id_fields=name_field.substr(pos_ini+1,len-1);
    let is_flag=false;

    if (pos_ini !== false) {
        counter=id_fields;
        is_flag=true;
    }

    for (var i=0;i<total; i++)
    {
        if(array_gruped_atrb[target]=="")
        {
            let target = array_gruped[value] == undefined? '':array_gruped[value]
            sal_fld+=sal_gr + target + "<br>";
            //sal_fld+=sal_gr + changePatternGrouping(array_gruped[value],counter) + "<br>";         
        }
        else{
            if (total==1){
                sal_gr=`
                <div class='add-listing-section'>
    
                                    <!-- Headline -->
                                    <div class='add-listing-headline'>
                                        <h3><i class='sl sl-icon-doc'></i> ${array_gruped_atrb[target]}</h3>
                                    </div>
                                    <div class='row with-forms'>
                `;
            }else{
                sal_gr=`
                <div class='add-listing-section'>
    
                                    <!-- Headline -->
                                    <div class='add-listing-headline'>
                                        <h3><i class='sl sl-icon-doc'></i> ${array_gruped_atrb[target]+counter}</h3>
                                    </div>
                                    <div class='row with-forms'>
                `;
            }
            
                sal_fld+=sal_gr + array_gruped[value] + "</div></div><br>";
                //sal_fld+=sal_gr + changePatternGrouping(array_gruped[value],counter) + "</div></div><br>"
        }   
        if ( !is_flag)
        {
            counter++;
        }
        
    }
    //agrego el string html a la pagina
    let div_name = "#"+target;
    $(div_name).html(sal_fld);

    //si esta la palabra requerido se vuelve a leer los campos requeridos
    let require = sal_fld.indexOf('(requerido)');
    activarJquerys(id_form,require);

}

export function activarJquerys(id_form,require){

    //jquery para los checkbox
    $('.check').on('click',function(e){
        let value = e.target.value;
        let id = e.target.id;
        id = id.split("*", 1)
        let target = "#"+id[0]
        let checked = e.target.checked
        let target_value = $(target).attr('value')

        if (checked){
            $(target).val(target_value+value+',') 
        }else{
            target_value = target_value.replace(value+',','')
            $(target).val(target_value) 
        }
    })

    //activo los jquery para los campos de select
    for (var j=0; j< array_id_select.length;j++){
        let id = "#"+array_id_select[j]
        $(id).on('click',function(e){
            putFieldGrouping(id_form,e.currentTarget.value,'1',array_group[e.currentTarget.name],e.currentTarget.name)
        })
    }

    //si el valor es mayor a 0, se vuelve a leer el jquery para los nuevos elementos agregados
    if(require >= 0){
        $('.Y').on('click',function(){
            validate()
        })
    }

}

//valido si los campos requeridos ya tienen datos
function validate(){
    var requeridos = $('.Y')
    var full = 0;

    //recorremos todos los elementos con Clase Y
    for (var i=0; i< requeridos.length; i++){
        if(requeridos[i].value == '' || requeridos[i].value == undefined || requeridos[i].value == 'undefined'){
        }else{
            full++;
        }
    }

    //si la cantidad de campos con datos 
    //es igual a la cantidad de campos requeridos
    //se activa el boton para guardar
    if (full == requeridos.length){
        $('#guardar').removeClass('disabled')
    }else{
        $('#guardar').addClass('disabled');
    }
}

//acciono el click a los select para mostrar los campos asociados
export function clickSelect(select_con_datos){
    var falta_click = [];

    //recorro los select con informacion
    for(var i=0;i<select_con_datos.length;i++){
        let target = '#'+select_con_datos[i]
        let select = $(target)
        if(select.length < 1){
            falta_click.push(target)
        }else{
            select.click();
        }
    }

    //algunos select se ocultan debajo de otros 
    //y en ocaciones no se les da click por el orden en que se definen
    //entonces se recorren nuevamente
    for(var j=0;j<falta_click.length;j++){
        let select = $(falta_click[j])
        select.click();
    }
}

function changePatternGrouping(field,pattern){
    if (field == '' || field == undefined){
        return ''
    }
    let output = field.replace(/F_/gi,"F*"+pattern+"_")
    output = output.replace(/GR_/gi,"GR_"+pattern+"_")
    return output;
}

//activo la librería
export function dropZone(id_data){

    //declaro el div como tipo Dropzone
    let myDropzone = new Dropzone("div#myAwesomeDropzone", { 
        url: "../files",
        dictDefaultMessage: "Arrastra los archivos aquí para subirlos",
        dictCancelUpload: "Cancelar Carga",
        dictRemoveFile: "Remover Archivo",
        addRemoveLinks: true,
        uploadMultiple: true,
        maxFilezise: 10,
        acceptedFiles: 'image/*',
    });

    //cuando se recibe la imagen correctamente, se agrega a un arreglo
    myDropzone.on('complete',function(file){
        files.push(file)
    })

    //si elimino la imagen antes de cargarla, a quito del arreglo
    myDropzone.on('removedfile', function(file){
        let index = files.indexOf(file);
        if (index > -1) {
            files.splice(index, 1);
        }
    })

    //al escuchar el click, guardo todas las imagenes
    $('#guardar').on('click',function(){
        saveFile(files,id_data)
    })
      
}


