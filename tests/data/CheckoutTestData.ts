import { initializeScheme } from "../../src/Util";
import scheme from '../../assets/products.json'

export const itemScheme = initializeScheme(scheme);

export const CheckoutTestData = {
    GetTotalTests: [
        {
            scheme: itemScheme,
            items: ['1983', '4900', '8873', '6732', '0923', '1983', '1983', '1983'],
            expectedResult: 3037
        },
        {
            scheme: itemScheme,
            items: ['1983', '4900', '8873', '6732', '0923', '1983', '1983', '1983', '4900'],
            expectedResult: 3386
        },
        {
            scheme: itemScheme,
            items: ['1983'],
            expectedResult: 199
        },
        {
            scheme: itemScheme,
            items: ['1983', '1983'],
            expectedResult: 398
        },
        {
            scheme: itemScheme,
            items: ['1983', '1983', '1983'],
            expectedResult: 398
        },
        {
            scheme: itemScheme,
            items: ['6732', '4900', '6732', '4900'],
            expectedResult: 998
        },
        {
            scheme: itemScheme,
            items: ['6732', '4900', '6732', '4900', '6732', '6732'],
            expectedResult: 1496
        },
        {
            scheme: itemScheme,
            items: [],
            expectedResult: 0
        },
        {
            scheme: itemScheme,
            items: ['7777','7777','7777'],
            expectedResult: 300
        },
        {
            scheme: itemScheme,
            items: ['7777','7777','7777','7777','7777','7777','7777','7777'],
            expectedResult: 300
        },
        {
            scheme: itemScheme,
            items: ['7777','7777','7777','7777','7777','7777','7777','7777', '7777'],
            expectedResult: 400
        },
        {
            scheme: itemScheme,
            items: ['7777','7777','7777','7777','7777'],
            expectedResult: 300
        },
    ]
}