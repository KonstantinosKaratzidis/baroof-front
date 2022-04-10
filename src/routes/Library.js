import BaroofList from '../components/BaroofList';
import LibraryProvider from '../hooks/useLibraryContent.js';

export default function Library(){

	return (
		<LibraryProvider>
			<BaroofList />
		</LibraryProvider>
	)
}
