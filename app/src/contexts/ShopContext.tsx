import {
  createContext,
  useContext,
  useState,
  useEffect,
  type FC,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";

interface ShopContextProps {
  cartItems: any;
  cartTotal: any;
  addToCart: any;
  removeFromCart: any;
  updateQuantity: any;
  clearCart: any;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  offset: number;
}

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export function useShop() {
  return useContext(ShopContext);
}

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });
  const [cartTotal, setCartTotal] = useState<number>(0);

  //backend-filtering
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(0);
  const offset = page * 40;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));

    const total = cartItems.reduce((sum, item) => {
      const itemPrice = item.discount ? item.final_price : item.price;
      return sum + itemPrice * item.quantity;
    }, 0);

    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (product: any, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => {
        // Basic ID check
        if (item.id !== product.id) return false;

        // For products without attributes
        if (!product.attribute && !item.attribute) return true;

        // For products with attributes, check if they match exactly
        if (product.attribute && item.attribute) {
          return item.attribute === product.attribute;
        }

        // For poster products, check poster customization
        if (product.posterCustomization && item.posterCustomization) {
          const productCustom = product.posterCustomization;
          const itemCustom = item.posterCustomization;
          return (
            productCustom.size === itemCustom.size &&
            productCustom.material === itemCustom.material &&
            productCustom.frameColor === itemCustom.frameColor
          );
        }

        return false;
      });

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: any, productAttribute?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        if (item.id !== productId) return true;
        if (!productAttribute && !item.attribute) return false;
        if (productAttribute && item.attribute) {
          return item.attribute !== productAttribute;
        }
        return false;
      })
    );
  };

  const updateQuantity = (
    productId: any,
    quantity: number,
    productAttribute?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, productAttribute);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== productId) return item;
        if (!productAttribute && !item.attribute) {
          return { ...item, quantity };
        }
        if (productAttribute && item.attribute === productAttribute) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        offset,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
