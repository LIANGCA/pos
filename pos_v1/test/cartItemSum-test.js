'use strict';

describe('cartItemSum', () => {
  it('should print number', () => {

    const cartItemList = [{name:'可口可乐',count:2,price:3.00,summary:6.00,unit:'瓶'},{name:'雪碧',count:1,price:3.00,summary:3.00,unit:'瓶'}];

    let sum = JSON.stringify(cartItemSum(cartItemList))


    const expectText = JSON.stringify(
      9.00
    );

    expect(sum).toBe(expectText);
  });

});



