import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';

import {environment} from '../../../environments/environment';
import {User} from './user';

@Injectable()
export class UserService {

	private serverUrl = '/api/user';
	private serviceName = 'UserService';
	loggedInChange: Subject<boolean> = new Subject<boolean>();
	loggedInUser: User;

	urlLinks = {
		dashboard: () => {
			return '/dashboard';
		},
		login: () => {
			return '/login';
		},
		register: () => {
			return '/signup';
		},
		forgot: () => {
			return '/forgot';
		}
	};

	constructor(private http: Http) {
		this.serverUrl = environment.host + this.serverUrl;
	}

	login(loginUser: User) {
		if (loginUser) {
			return this.http.post(`${this.serverUrl}/login`, loginUser)
				.toPromise()
				.then(
					response => {
						const objectReceived = response.json();
						console.log(this.serviceName, 'postMessage::success', objectReceived);
						const user = new User(objectReceived.data.user);
						this.loggedInUser = user;
						localStorage.setItem('user', JSON.stringify(user));
						localStorage.setItem('token', objectReceived.data.token);
						this.loggedInChange.next(true);
						return user;
					},
					error => {
						console.error(this.serviceName, 'postMessage::errorCallback', error);
						throw error.json();
					}
				);
		} else {
			console.warn(this.serviceName, 'postMessage', 'loginUser was null');
		}
	};

	register(registerUser: User) {
		if (registerUser) {
			return this.http.post(`${this.serverUrl}/create`, registerUser)
				.toPromise()
				.then(
					response => {
						const objectReceived = response.json();
						console.log(this.serviceName, 'postMessage::success', objectReceived);
						const user = new User(objectReceived.data.user);
						this.loggedInUser = user;
						localStorage.setItem('user', JSON.stringify(user));
						localStorage.setItem('token', objectReceived.data.token);
						this.loggedInChange.next(true);
						return user;
					},
					error => {
						console.error(this.serviceName, 'postMessage::errorCallback', error);
						throw error.json();
					}
				);
		} else {
			console.warn(this.serviceName, 'postMessage', 'registerUser was null');
		}
	};

	loggedIn() {
		const tokenValid = tokenNotExpired();
		if (tokenValid) {
			this.loggedInUser = new User(JSON.parse(localStorage.getItem('user')));
			this.loggedInChange.next(true);
		} else {
			this.loggedInChange.next(false);
			this.loggedInUser = null;
			localStorage.removeItem('user');
		}
		return tokenValid;
	}

	logout() {
		this.loggedInChange.next(false);
		this.loggedInUser = null;
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}

	update(updateUser: User) {
		if (updateUser && updateUser._id) {
			return this.http.put(this.serverUrl, updateUser)
				.toPromise()
				.then(
					response => {
						const objectReceived = response.json();
						console.log(this.serviceName, 'postMessage::success', objectReceived);
						const user = new User(objectReceived.data.user);
						this.loggedInUser = user;
						localStorage.setItem('updateUser', JSON.stringify(user));
						localStorage.setItem('token', objectReceived.data.token);
						this.loggedInChange.next(true);
						return user;
					},
					error => {
						console.error(this.serviceName, 'update::errorCallback', error);
					}
				);
		} else {
			console.warn(this.serviceName, 'update', 'updateUser was null or _id was not defined');
		}
	};
}

