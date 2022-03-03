import { PYTHON_URL } from "../../serverComponent/urls"

export function consulta(ruta,id,token){
    return fetch(PYTHON_URL+'api/formulario/'+ruta+id, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          //Authorization: 'Bearer ' + token
        }  
    })
}

export function guardar(formdata){
  return fetch(PYTHON_URL+'api/formulario/guardar', {
    method: 'POST',
    // headers: {
    //   Authorization: 'Bearer ' + token
    // },  
    body: formdata
  })
}

export function borrar(id_data){
  return fetch(PYTHON_URL+'api/formulario/borrar/'+id_data, {
    method: 'DELETE',
    // headers: {
    //   Authorization: 'Bearer ' + token
    // },  
  })
}

export function actualizar(id_data,formdata){
  return fetch(PYTHON_URL+'api/formulario/actualizar/'+id_data, {
    method: 'PATCH',
    // headers: {
    //   Authorization: 'Bearer ' + token
    // }, 
    body: formdata 
  })
}

export function guardarImagen(formdata,ruta){
  return fetch(PYTHON_URL+'api/formulario/imagenes/guardar/'+ruta, {
    method: 'POST',
    // headers: {
    //   Authorization: 'Bearer ' + token
    // },  
    body: formdata
  })
}

export function borrarImagen(id_data,id_file){
  return fetch(PYTHON_URL+'api/formulario/imagenes/borrar/'+id_data+'/'+id_file, {
    method: 'GET',
    // headers: {
    //   Authorization: 'Bearer ' + token
    // },  
  })
}

export function cargarImagen(id_data){
  return fetch(PYTHON_URL+'api/formulario/imagenes/cargar/'+id_data, {
    method: 'GET',
    // headers: {
    //   Authorization: 'Bearer ' + token
    // },  
  })
}