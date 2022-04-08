import {Routes, Route} from 'react-router-dom';
import HomePage from './routes/HomePage';
import User from './routes/User';
import Guest from './routes/Guest';
import HomePageLayout from './components/HomePageLayout'
import AuthProvider from './components/AuthProvider';

function App() {
  return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<HomePageLayout />}>
					<Route index element={<HomePage />} />
				</Route>
				<Route path="/user/*" element={<User />} />
				<Route path="/guest/*" element={<Guest />} />
			</Routes>
		</AuthProvider>
  );
}

export default App;
