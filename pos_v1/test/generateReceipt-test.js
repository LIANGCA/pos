'use strict';

describe('generateReceipt', () => {
  it('should print text', () => {

    const itemList = [{name:'苹果',count:2.5,price:5.50,summary:13.75,unit:'斤'},{name:'方便面',count:3,price:4.50,summary:9.00,unit:'袋'}];
    const sum =22.75;
    const saveSum =4.50;
    let text = generateReceipt(itemList,sum,saveSum);


    const expectText = `***<没钱赚商店>收据***
名称：苹果，数量：2.5斤，单价：5.50(元)，小计：13.75(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：22.75(元)
节省：4.50(元)
**********************`;

    expect(text).toBe(expectText);
  });

});
