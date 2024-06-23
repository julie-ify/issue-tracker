import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserObj, UserState } from '@/app/utility/dataTypes';

const initialState: UserState = {
	userData: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserObj | null>) => {
			state.userData = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
