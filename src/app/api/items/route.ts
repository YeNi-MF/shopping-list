//  src/api/items/route.ts

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "../data-store"

export async function GET() {
  try {
    return NextResponse.json(db.items);
  } catch (error) {
    console.error('Error GET:', error);
    return NextResponse.json({ error: "Error fetching items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
   
    const newItem = {
      id: item.id || uuidv4(),
      name: item.name,
      description: item.description,
      price: parseFloat(item.price) || 0,
      quantity: parseInt(item.quantity) || 1,
      completed: item.completed || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
   
    db.items.push(newItem);
    console.log('Item created:', newItem);
   
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error POST:', error);
    return NextResponse.json({ error: "Error creating item" }, { status: 400 });
  }
}
