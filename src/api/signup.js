import {fetchPost} from './tools.js';

export function signup({nickname, email, password}) {
	return fetchPost("/signup", {nickname, email, password});
}
