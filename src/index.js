import 'bootstrap';

import { getFormulario } from './components/pageComponent/formulario/formulario';

export var token = '';
export var params = new URLSearchParams(location.search);
export var id_form = params.get('id_form');

getFormulario(id_form,token,params);
