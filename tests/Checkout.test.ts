import { Checkout } from '../src/Checkout';
import { PricingScheme } from '../src/PricingScheme';

import { CheckoutTestData, itemScheme }  from './data/CheckoutTestData';

describe('CheckoutTestSuite', () => {
    CheckoutTestData.GetTotalTests.forEach((test, i) => {
        it(`GetTotalTest ${i+1}`, () => {
            const c = new Checkout(new PricingScheme(test.scheme));
            for (let item of test.items){
                c.scan(item);
            }
            expect(c.getTotal()).toEqual(test.expectedResult);
        });
    });

    it('Can void an item by specified amount', () => {
        const c = new Checkout(new PricingScheme(itemScheme));

        const prod0 = itemScheme[0].product;
        const prod1 = itemScheme[1].product

        c.scan(prod0.code);
        c.scan(prod0.code);
        c.scan(prod0.code);
        c.scan(prod0.code);
        c.scan(prod1.code);

        let itemList = c.getItemList();

        expect(itemList[prod0.name]).toEqual(4);
        expect(itemList[prod1.name]).toEqual(1);
        expect(c.getItemCount()).toEqual(5);

        c.void(prod0.code, 2);

        itemList = c.getItemList();

        expect(itemList[prod0.name]).toEqual(2);
        expect(itemList[prod1.name]).toEqual(1);
        expect(c.getItemCount()).toEqual(3);

    });

    it('can void all of one item', () => {
        const c = new Checkout(new PricingScheme(itemScheme));

        const prod0 = itemScheme[0].product;

        c.scan(prod0.code);
        c.scan(prod0.code);
        c.scan(prod0.code);
        c.scan(prod0.code);

        let itemList = c.getItemList();

        expect(itemList[prod0.name]).toEqual(4);

        c.void(prod0.code);

        itemList = c.getItemList();
        expect(itemList[prod0.name]).toBeFalsy();
        expect(c.getItemCount()).toEqual(0);
    });

    it('can void all items', () => {
        const c = new Checkout(new PricingScheme(itemScheme));

        let rand = Math.trunc((Math.random() * 10) + 1);

        for(let i = 0; i < rand; i++){
            c.scan(itemScheme[Math.trunc((Math.random() * itemScheme.length))].product.code);
        }

        expect(c.getItemCount()).toEqual(rand);
        c.voidAll();
        expect(c.getItemCount()).toEqual(0);
    });

    it('rejects bad product', () => {
        const c = new Checkout(new PricingScheme(itemScheme));

        const validItems = itemScheme.map((p)=>{return p.product.code}).sort();
        const lastItem = validItems[validItems.length-1]

        expect(c.scan(lastItem)).toEqual(true);

        expect(c.scan(lastItem + '1')).toEqual(false);

    });
});