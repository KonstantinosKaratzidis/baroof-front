import {fetchPost} from './tools.js';

export async function hostBaroof(baroofId){
	return await fetchPost(`host/${baroofId}`);
}
