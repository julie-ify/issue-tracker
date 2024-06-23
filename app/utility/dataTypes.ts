export interface UserObj {
	name: string;
	email: string;
	role: string;
}

export interface UserState {
	userData: UserObj | null;
}