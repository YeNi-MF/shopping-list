//  src/app/api/items/[id]/toggle/route.ts

import { NextResponse } from "next/server";
import { db } from "../../../data-store"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { completed } = await request.json();
   
    const itemIndex = db.items.findIndex(item => item.id === id);
   
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
   
    db.items[itemIndex] = {
      ...db.items[itemIndex],
      completed: completed,
      updatedAt: new Date()
    };
   
    console.log('Item completion toggled:', db.items[itemIndex]);
   
    return NextResponse.json(db.items[itemIndex], { status: 200 });
  } catch (error) {
    console.error('Error PATCH:', error);
    return NextResponse.json({ error: "Error toggling item completion" }, { status: 400 });
  }
}

