'use client';
import { useEffect } from 'react';
import { handleError } from './components/handleError';
import { errorNotice } from './components/Toast';
import { setUser } from './store/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { useRouter } from 'next/navigation';

export default function Home() {
	const isUser = useSelector((state: RootState) => state.user.userData);
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch('/api/auth/user');
				const user = await response.json();
				dispatch(setUser(user));
				router.refresh();
			} catch (error) {
				const errorMsg = handleError(error);
				errorNotice(errorMsg);
				dispatch(setUser(null));
			}
		};
		fetchUser();
	}, []);

	if (!isUser) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<div>
				Hello {isUser && <h2>{isUser?.name}</h2>} {!isUser && <h2>There</h2>}
			</div>
		</div>
	);
}
