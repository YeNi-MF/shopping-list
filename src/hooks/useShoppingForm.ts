		//src/hooks/useShoppingForm.ts
        import { useRef, useEffect, useCallback } from "react";
        import { useShoppingList } from "./useShoppingList";
        import { ShoppingItem } from "@/types/ShoppingListTypes";
        import { useRouter } from "next/navigation";
        
        export function useShoppingForm({ product }: { product?: ShoppingItem }) {
          const formRef = useRef<HTMLFormElement>(null);
          const { addItem, editItem } = useShoppingList();
          const router = useRouter();
        
          useEffect(() => {
            if (product?.id && formRef.current) {
              const form = formRef.current;
              (form.elements.namedItem("id") as HTMLInputElement)!.value = product.id;
              (form.elements.namedItem("name") as HTMLInputElement)!.value = product.name;
              (form.elements.namedItem("description") as HTMLInputElement)!.value = product.description;
              (form.elements.namedItem("price") as HTMLInputElement)!.value = String(product.price);
              (form.elements.namedItem("quantity") as HTMLInputElement)!.value = String(product.quantity);
            }
          }, [product]);
        
          const handleSubmit = useCallback((e: React.FormEvent) => {
            e.preventDefault();
        
            if (!formRef.current) return;
        
            const formData = new FormData(formRef.current);
            const id = formData.get("id") as string;
            const name = formData.get("name") as string;
            const description = formData.get("description") as string;
            const price = parseFloat(formData.get("price") as string);
            const quantity = parseInt(formData.get("quantity") as string);
        
            if (!name.trim()) return;
        
            if (id) {
              editItem({ id, name, description, price, quantity });
              console.log("Product updated:", { id, name, description, price, quantity });
            } else {
              addItem(name, description, price, quantity);
              console.log("Item added:", { name, description, price, quantity });
            }
        
            router.push('/');
           
            formRef.current.reset();
          }, [addItem, editItem, router]);
        
          const handleCancel = useCallback(() => {
            router.push('/');
          }, [router]);
        
          return { formRef, handleSubmit, handleCancel };
        }
        