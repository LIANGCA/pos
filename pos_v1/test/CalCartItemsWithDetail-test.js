'use strict';

describe('calCartItemsWithDetail', () => {
  it('should print array', () => {

    const cartItemsMap = {ITEM000000:3,ITEM000001:2};
    const allItems = loadAllItems();

    let buyItemWithDetail = JSON.stringify( calCartItemsWithDetail(cartItemsMap,allItems))


    const expectText = JSON.stringify(
      [{name:'可口可乐',count:3,price:3.00,summary:6.00,unit:'瓶'},{name:'雪碧',count:2,price:3.00,summary:6.00,unit:'瓶'}]
    );

    expect(buyItemWithDetail).toBe(expectText);
  });

});



