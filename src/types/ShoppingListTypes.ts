//  src/types/ShoppingListTypes.tsx
export interface ShoppingItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    completed: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

export interface ShoppingListState {
    items: ShoppingItem[];
    isLoading: boolean;
    error: string | null;
}

export type ShoppingListAction =  
| { type: 'ADD_ITEM'; payload: ShoppingItem }
| { type: 'EDIT_ITEM'; payload: ShoppingItem }
| { type: 'REMOVE_ITEM'; payload: string }
| { type: 'TOGGLE_ITEM_COMPLETE'; payload: string }
| { type: 'SET_LOADING'; payload: boolean }
| { type: 'SET_ERROR'; payload: string | null }
| { type: 'LOAD_ITEMS'; payload: ShoppingItem[] };