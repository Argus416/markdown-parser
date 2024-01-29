import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Button } from 'flowbite-react';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<Button>Click me</Button>
		</div>
	);
}

export default App;
