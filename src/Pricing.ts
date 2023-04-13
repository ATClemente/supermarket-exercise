export const enum PRICE_CATEGORY {
    SIMPLE,
    BUYXGETY,
    ADDTAXES,
    BUNDLED,
}

export class Pricing {
    category: PRICE_CATEGORY
    basePrice: number
    options?: any = {}

    constructor (category: PRICE_CATEGORY, basePrice: number, options?: {} | null) {
        this.category = category;
        this.basePrice = basePrice;

        if(!!options){
            Object.assign(this.options, options);
        }
        
    }

}