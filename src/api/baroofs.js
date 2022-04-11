import {fetchGet, fetchDelete, fetchPut} from './tools.js';

export async function getBaroofs(){
	return await fetchGet("/baroofs");
}

export async function deleteBaroof(baroofId){
	return await fetchDelete(`/baroofs/${baroofId}`);
}

export async function updateBaroof(baroofId, baroof){
	return await fetchPut(`/baroofs/${baroofId}`, baroof);
}

export async function renameBaroof(baroofId, newTitle){
	return await updateBaroof(baroofId, {title: newTitle})
}
