'use client'
import React from "react";
import Card from '@/components/ShoppingCard'
import { useParams } from "next/navigation";
import { useShoppingList } from "@/hooks/useShoppingList";

const ItemManagerPage = () => {
    const { state } = useShoppingList();
    const params = useParams();
    const id = params?.id as string | undefined;
   
    const product = id ? state.items.find(item => item.id === id) : undefined;

    return (
        <div>
            <Card product={product}/>
        </div>
    )
}

export default ItemManagerPage