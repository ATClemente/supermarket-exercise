import { Product } from "./Product";
import { Pricing } from "./Pricing";

export function initializeScheme(scheme): { product: Product, pricing: Pricing }[] {
    const todaysItems = [];

    scheme.forEach((i) => {
        todaysItems.push(
            {
                product: new Product(i.product.name, i.product.code),
                pricing: new Pricing(i.pricing.category, i.pricing.price, i.pricing.options || null)
            }
        );
    });

    return todaysItems;
}