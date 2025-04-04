//  src/app/api/items/[id]/route.ts

import { NextResponse } from "next/server";
import { db } from "../../data-store"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
   
    const item = db.items.find(item => item.id === id);
   
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
   
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error GET item:', error);
    return NextResponse.json({ error: "Error fetching item" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const updatedData = await request.json();
   
    const itemIndex = db.items.findIndex(item => item.id === id);
   
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
   
    db.items[itemIndex] = {
      ...db.items[itemIndex],
      ...updatedData,
      updatedAt: new Date()
    };
   
    console.log('Item updated:', db.items[itemIndex]);
   
    return NextResponse.json(db.items[itemIndex], { status: 200 });
  } catch (error) {
    console.error('Error PUT:', error);
    return NextResponse.json({ error: "Error updating item" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
   
    const itemIndex = db.items.findIndex(item => item.id === id);
   
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
   
    const deletedItem = db.items[itemIndex];
    db.items = db.items.filter(item => item.id !== id);
   
    console.log('Item deleted:', deletedItem);
   
    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error DELETE:', error);
    return NextResponse.json({ error: "Error deleting item" }, { status: 500 });
  }
}

