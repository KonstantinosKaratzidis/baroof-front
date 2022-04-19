import {fetchPost, fetchGet} from './tools.js';

export async function hostBaroof(baroofId){
	return await fetchPost(`/host/${baroofId}`);
}

export async function checkGamePin(pin){
	console.log("check", pin);
	return await fetchGet(`/host/${pin}`);
}
