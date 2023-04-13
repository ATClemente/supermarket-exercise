import { PRICE_CATEGORY } from "./Pricing";
import { PricingScheme } from "./PricingScheme";
import { Product } from "./Product";

export class Checkout {

    basketMap: Map<Product, {amount: number}> = new Map<Product, {amount: number}>
    todaysScheme: PricingScheme;

    constructor (todaysScheme: PricingScheme){
        this.todaysScheme = todaysScheme;
    }

    public scan (code: string): boolean{
        
        let prod = this.todaysScheme.codesMap[code];
        if(!prod){
            return false;
        }
        this.basketMap.has(prod) ? this.basketMap.get(prod).amount++ : this.basketMap.set(prod, {amount: 1});
        return true;
    }

    public void(code: string, amount: number = -1){
        if(amount < 0){
            this.basketMap.delete(this.todaysScheme.codesMap[code]);
        }
        else {
            this.basketMap.get(this.todaysScheme.codesMap[code]).amount -= amount;
        }
    }

    public voidAll(){
        this.basketMap.clear();
    }

    public getTotal(): number {

        let total = 0;
        let ignore: string[] = [];

        Array.from(this.basketMap.keys()).forEach((val, i) => {
            if(ignore.indexOf(val.code) === -1){
                if(this.todaysScheme.productPricing.get(val.code).category === PRICE_CATEGORY.BUNDLED){
                    let bundleItemCode = this.todaysScheme.productPricing.get(val.code).options.bundleItem;

                    let bundleProduct = this.todaysScheme.codesMap[bundleItemCode];

                    let bundleProductAmount = this.basketMap.get(bundleProduct)?.amount || 0;

                    total += this.todaysScheme.getProductPrice(val, this.basketMap.get(val).amount, bundleProduct, bundleProductAmount);

                    ignore.push(bundleItemCode);
                }
                else{
                    total += this.todaysScheme.getProductPrice(val, this.basketMap.get(val).amount);
                }
            }
        });

        return total;
    }

    public getItemCount(){
        return Array.from(this.basketMap.keys()).reduce( (acc, current) => acc + this.basketMap.get(current).amount, 0);
    }

    public getItemList(){
        let obj = {};
        Array.from(this.basketMap.keys()).forEach((val, i) => {
            obj[val.name] = this.basketMap.get(val).amount;
        });

        return obj;
    }

    public printCart(){
        Array.from(this.basketMap.keys()).forEach((val, i) => {
            console.log(`Product: ${val.name}  Amount: ${this.basketMap.get(val).amount}`);
        });
    }
}