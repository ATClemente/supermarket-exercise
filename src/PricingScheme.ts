import { Product } from "./Product";
import { Pricing } from "./Pricing";
import { PRICE_CATEGORY } from "./Pricing";

export class PricingScheme {

    codesMap: Record<string, Product> = {};
    productPricing: Map<string, Pricing> = new Map<string, Pricing>;

    constructor(productPricing: {product: Product, pricing: Pricing}[]){
        productPricing.forEach((v, i) => {
            this.codesMap[v.product.code] = v.product;
            this.productPricing.set(v.product.code, v.pricing);
        });
    }

    public getProductPrice (product: Product, amount: number, bundleProduct?: Product, bundledItemAmount?: number): number{

        const pricing = this.productPricing.get(product.code);

        if (amount === 0){
            return 0;
        }

        switch (pricing.category) {
            case PRICE_CATEGORY.SIMPLE: 
                return this.getSimplePricing(pricing.basePrice, amount);
            case PRICE_CATEGORY.BUYXGETY:
                return this.getBuyGetPricing(amount, pricing.options.buyX, pricing.options.getY, pricing.basePrice);
            case PRICE_CATEGORY.ADDTAXES:
                return this.getAddTaxPricing(amount, pricing.basePrice, pricing.options.addTaxes);
            case PRICE_CATEGORY.BUNDLED:
                return this.getBundledPricing(
                    pricing.basePrice, 
                    amount, 
                    bundledItemAmount, 
                    this.productPricing.get(bundleProduct.code).basePrice, 
                    pricing.options.bundleCost);
        }

    }

    private getSimplePricing(basePrice: number, amount: number): number {
        return basePrice * amount;
    }

    private getBuyGetPricing(amount: number, buy: number, get: number, basePrice: number): number {

        let buySets = 0;

        if(amount >= buy){
            do {
                amount -= buy;
                buySets++;
                amount -= get;
                amount = Math.max(amount, 0);
            } while(amount > 0 && amount >= buy)
        }

        return (buySets * buy * basePrice) + (amount * basePrice);
    }

    private getAddTaxPricing(amount: number, basePrice: number, addTax: number): number{
        return +(amount * basePrice * addTax).toFixed(0);
    }

    private getBundledPricing(basePrice: number, amount: number,  bundleItemAmount: number, bundleItemBasePrice: number, bundleCost: number): number{
        let sorted = [ {amount, basePrice}, {amount: bundleItemAmount, basePrice: bundleItemBasePrice}].sort((a, b)=>{
            return a.amount - b.amount;
        });

        let bundles = sorted[0].amount;
        sorted[1].amount -= bundles;

        return (bundles * bundleCost) + (sorted[1].amount * sorted[1].basePrice);
    }

}