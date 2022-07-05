import { useContext, createContext } from 'react';

export const AppContext = createContext({
    sidebar: false,
    parentShow: '',
});

export function useAppContext() {
    return useContext(AppContext);
}
