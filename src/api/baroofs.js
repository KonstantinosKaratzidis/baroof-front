import {fetchGet, fetchDelete} from './tools.js';

export async function getBaroofs(){
	return await fetchGet("/baroofs");
}

export async function deleteBaroof(baroofId){
	return await fetchDelete(`/baroofs/${baroofId}`);
}
