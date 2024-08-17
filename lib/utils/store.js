import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useReducer } from "react";
const initialState = {};
const store = createContext(initialState);
const { Provider } = store;
const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_USER':
                return {
                    ...state,
                    ...action.payload
                };
            case 'UPDATE_POINTS':
                const newPoints = state.points + state.level + state.weapon;
                const newStamina = state.stamina - 1;
                return {
                    ...state,
                    points: newPoints,
                    stamina: newStamina
                };
            default:
                throw new Error();
        }
    }, initialState);
    return _jsx(Provider, { value: { state, dispatch }, children: children });
};
export { store, StateProvider };
//# sourceMappingURL=store.js.map