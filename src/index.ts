import { Checkout } from "./Checkout";
import { initializeScheme } from "./Util";
import { PricingScheme } from "./PricingScheme";
import scheme from '../assets/products.json'

const todaysScheme = new PricingScheme(initializeScheme(scheme));

const c = new Checkout(todaysScheme);

// 1 milk, 1 salsa, 1 wine, 1 chips, 4 toothbrush 
c.scan('1983'); // toothbrush
c.scan('4900'); // salsa
c.scan('8873'); // milk
c.scan('6732'); // chips
c.scan('0923'); // wine
c.scan('1983'); // toothbrush
c.scan('1983'); // toothbrush
c.scan('1983'); // toothbrush

c.printCart();

console.log(c.getItemCount()); // 8

console.log(c.getTotal()); //3037