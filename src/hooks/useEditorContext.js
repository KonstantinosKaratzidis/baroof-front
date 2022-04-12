import {createContext, useContext} from 'react';

const EditorContext = createContext();

export function EditorProvider({dispatch, children}){
	return (
		<EditorContext.Provider value={{dispatch}}>
			{children}
		</EditorContext.Provider>
	)
}

export function useEditorContext(){
	return useContext(EditorContext);
}
