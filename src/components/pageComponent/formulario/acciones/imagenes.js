import $ from "jquery";
import { guardarImagen,borrarImagen,cargarImagen } from "../api";
import { SERVER_URL } from "../../../serverComponent/urls";


export function saveFile(files,ruta){
    var formdata = new FormData();

    //si el arrgleo viene con imagenes, lo recorro para enviarlas todas
    if(files.length > 0){
        for(var i = 0; i<files.length;i++){
            formdata.append("file",files[i]);
        }
    
        const Api_Guardar = guardarImagen(formdata,ruta);
        Api_Guardar.then(function (response) {
            if (response.statusText == "Created"){
                    console.log('Imagen Guardada');
            }else{
                alert('Ocurrió un error al guardar la imagen')
                console.log('Fallo Al Guardar el resgistro');
            }
        });
    }
}

//recibo los parametros para borrar las imagenes
export function deleteFile(name,id,id_data,all){
    var id_delete = '';
    var opcion = false;
    //en caso de que se vaya a borrar todo el registro, se asigna como __all__
    if(all){
        opcion=true;
        id_delete = '__all__'
    }else{
        //si es una imagen en especifico, se asigna el nombre
        var id_file = '';
        if(name ==undefined){
            id_file =id
        }else{
            id_file = name
        }
    
        var datos = id_file.split(';')
        id_delete = datos[0]
    
        opcion = confirm("¿Esta seguro de borrar el archivo?");
    }

    if(opcion){
        const Api_Borrar  = borrarImagen(id_data,id_delete);
            Api_Borrar.then(function (response) {
                if (response.statusText == "OK"){
                    if(!all){
                        let card = '#'+datos[1]
                        $(card).fadeOut(500)
                    }
                }
            });
    }
}

//se obtienen los nombres de las imagenes que puedan contener el registro
export function getFile(id_data){
    const Api_Cargar = cargarImagen(id_data);
    Api_Cargar.then(function (response) {
        if (response.statusText == "OK"){
            Api_Cargar.then((response) => response.json())
            .then((res) => {
                //si se obtiene imagenes, se agregan a unas card para mostrarlas y permitir eliminarlas
                if(res.length>0){
                    var div = '#divImg'
                    for(var i=0;i<res.length;i++){
                        let ruta = SERVER_URL+'assets_aqualia/fotos_formulario/'+id_data+'/'+res[i].nombre
                        let html = `<div class="card" style="width: 18rem;" id='card${i}'>

                                    <img src="${ruta}" class="card-img-top" alt="...">
                                    
                                    <div class="card-body">
                                    <a class='button delete' id='img${i}' name='${res[i].nombre};card${i}'>Eliminar <i class='fa fa-trash' id='${res[i].nombre};card${i}'></i></a>
                                    </div>
                                </div>`

                        $(div).append(html)

                        var idImg = '#img'+i
                        $(idImg).on('click', function(e){
                            deleteFile(e.target.name,e.target.id,id_data,false)
                        })
                    } 
                }
            })
        }else{
            console.log('Fallo Al Cargar las Imagenes');
        }
    });
}