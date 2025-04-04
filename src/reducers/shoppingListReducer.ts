//  src/reducers/shoppingListReducer.tsx
import { ShoppingListState, ShoppingListAction } from "@/types/ShoppingListTypes";

export const initialState: ShoppingListState = {
    items: [],
    isLoading: false,
    error: null
}

export function shoppingListReducer(state: ShoppingListState, action: ShoppingListAction): ShoppingListState {
    switch(action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload],
                isLoading: false
            };

        case 'EDIT_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
                isLoading: false
            };

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
                isLoading: false
            };

        case 'TOGGLE_ITEM_COMPLETE':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload ? { ...item, completed: !item.completed, updatedAt: new Date() } : item
                ),
                isLoading: false
            }

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
       
        case 'LOAD_ITEMS':
            return {
                ...state,
                items: action.payload,
                isLoading: false
            };

        default:
            return state;
    }
}

