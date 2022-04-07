import {fetchPost} from './tools.js';

export default function signup({nickname, email, password}) {
	return fetchPost("/signup", {nickname, email, password});
}
