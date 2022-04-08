import {Routes, Route} from 'react-router-dom';
import HomePage from './routes/HomePage';
import Login from './routes/Login';
import Signup from './routes/Signup';
import User from './routes/User';
import HomePageLayout from './components/HomePageLayout'

function App() {
  return (
		<Routes>
			<Route path="/" element={<HomePageLayout />}>
				<Route index element={<HomePage />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
			</Route>
			<Route path="/user" element={<User />}>
			</Route>
		</Routes>
  );
}

export default App;
