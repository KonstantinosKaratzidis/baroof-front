import {fetchGet} from './tools.js';

export async function getBaroofs(){
	return await fetchGet("/baroofs");
}
