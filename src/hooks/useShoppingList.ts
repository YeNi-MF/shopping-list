// src/hooks/useShoppingList.ts
'use client'

import { useState, useReducer, useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ShoppingListState, ShoppingItem } from '@/types/ShoppingListTypes'
import { shoppingListReducer, initialState } from '@/reducers/shoppingListReducer'

const API_URL = '/api/items';

export function useShoppingList() {
    const [state, dispatch] = useReducer(shoppingListReducer, initialState);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            fetchItems();
            setIsInitialized(true);
        }
    }, [isInitialized]);

    const fetchItems = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch items');
            const data = await response.json();
            dispatch({ type: 'LOAD_ITEMS', payload: data });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
            }
        }
    };

    const addItem = useCallback(async (name: string, description: string, price: number = 0, quantity: number = 1) => {
        const tempId = uuidv4();
        const newItem = {
            id: tempId,
            name,
            description,
            price,
            quantity,
            completed: false,
            createdAt: new Date(),
        };

        dispatch({ type: 'ADD_ITEM', payload: newItem });
       
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) throw new Error('Failed to add item');
            const createdItem = await response.json();
            if (createdItem.id !== tempId) {
                dispatch({ type: 'EDIT_ITEM', payload: { ...createdItem, id: createdItem.id } });
                dispatch({ type: 'REMOVE_ITEM', payload: tempId });
            }

        } catch (error) {
            dispatch({ type: 'REMOVE_ITEM', payload: tempId });
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
            }
        }
    }, []);

    const editItem = useCallback(async (item: Partial<ShoppingItem> & { id: string }) => {
        const currentItem = state.items.find(i => i.id === item.id);
        if (!currentItem) return;
       
        dispatch({
            type: 'EDIT_ITEM',
            payload: { ...currentItem, ...item, updatedAt: new Date() }
        });
       
        try {
            const response = await fetch(`${API_URL}/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) throw new Error('Failed to update item');
            const updatedItem = await response.json();

        } catch (error) {
            dispatch({ type: 'EDIT_ITEM', payload: currentItem });
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
            }
        }
    }, [state.items]);

    const removeItem = useCallback(async (id: string) => {
        const itemToRemove = state.items.find(i => i.id === id);
        if (!itemToRemove) return;
        dispatch({ type: 'REMOVE_ITEM', payload: id });
       
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete item');

        } catch (error) {
            dispatch({ type: 'ADD_ITEM', payload: itemToRemove });
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
            }
        }
    }, [state.items]);

    const toggleItemComplete = useCallback(async (id: string) => {
        const currentItem = state.items.find(i => i.id === id);
        if (!currentItem) return;
       
        const updatedItem = {
            ...currentItem,
            completed: !currentItem.completed,
            updatedAt: new Date()
        };
        dispatch({ type: 'EDIT_ITEM', payload: updatedItem });
       
        try {
            const response = await fetch(`${API_URL}/${id}/toggle`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: updatedItem.completed }),
            });
            if (!response.ok) throw new Error('Failed to toggle item');

        } catch (error) {
            dispatch({ type: 'EDIT_ITEM', payload: currentItem });
           
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
            }
        }
    }, [state.items]);

    return {
        state,
        addItem,
        editItem,
        removeItem,
        toggleItemComplete,
        refreshItems: fetchItems
    };
}
