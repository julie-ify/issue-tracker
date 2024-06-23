import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (
	password: string,
	hashedPassword: string
) => {
	return await bcrypt.compare(password, hashedPassword);
};

export async function generateToken(userId: string, expiresIn: string = '1h') {
	const alg = 'HS256';

	const token = await new SignJWT({ userId })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(expiresIn)
		.sign(SECRET_KEY);

	return token;
}

// decode token and check expiration
export const verifyToken = async (token: string) => {
	try {
		const { payload } = await jwtVerify(token, SECRET_KEY!);
		return payload;
	} catch (error) {
		throw new Error('Token verification failed');
	}
};
