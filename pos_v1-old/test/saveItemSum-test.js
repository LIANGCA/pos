'use strict';

describe('saveItemMoneySum', () => {
  it('should print number', () => {

    const itemList = [{name:'苹果',count:2.5,price:5.50,summary:13.75,unit:'斤'},{name:'方便面',count:3,price:4.50,summary:9.00,unit:'袋'}];
    const sum = 22.75;

    let saveMoney = JSON.stringify(saveItemMoneySum(itemList,sum))


    const expectText = JSON.stringify(
      4.50
    );

    expect(saveMoney).toBe(expectText);
  });

});
