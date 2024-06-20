export interface UserObj {
	name: string;
	email: string;
	role: string;
	createdAt: Date;
}

export interface UserState {
	userData: UserObj | null;
}