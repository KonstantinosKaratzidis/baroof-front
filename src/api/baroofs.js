import {fetchGet, fetchDelete, fetchPut, fetchPost} from './tools.js';

export async function getBaroofs(){
	return await fetchGet("/baroofs");
}

export async function getBaroof(baroofId){
	return await fetchGet(`/baroofs/${baroofId}`)
}

export async function deleteBaroof(baroofId){
	return await fetchDelete(`/baroofs/${baroofId}`);
}

export async function createBaroof(baroof){
	return await fetchPost(`/baroofs`, baroof);
}

export async function updateBaroof(baroofId, baroof){
	return await fetchPut(`/baroofs/${baroofId}`, baroof);
}

export async function renameBaroof(baroofId, newTitle){
	return await updateBaroof(baroofId, {title: newTitle})
}

export async function setFavorite(baroofId, isFavorite){
	return await updateBaroof(baroofId, {isFavorite})
}
