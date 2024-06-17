import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

// propswithchildren is an interface representing {children: ReactNode}
const ErrorHandler = ({ children}: PropsWithChildren) => {
	if(!children) return null;

	return (
		<Text color='red' as='p'>{children}</Text>
	)
}

export default ErrorHandler