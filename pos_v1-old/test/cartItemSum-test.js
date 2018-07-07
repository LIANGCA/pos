'use strict';

describe('calculateCartItemSubTotalSum', () => {
  it('should print number', () => {

    const cartItemList = [{name:'可口可乐',count:2,price:3.00,summary:6.00,unit:'瓶'},{name:'雪碧',count:1,price:3.00,summary:3.00,unit:'瓶'}];

    let sum = JSON.stringify(calculateCartItemSubTotalSum(cartItemList))


    const expectText = JSON.stringify(
      9.00
    );

    expect(sum).toBe(expectText);
  });

});

//
// [{"name":"可口可乐","price":3,"unit":"瓶","count":3,"summary":6},{"name":"雪碧","price":3,"unit":"瓶","count":2,"summary":6}]
//   [{"name":"可口可乐","count":3,"price":3,"summary":6,"unit":"瓶"},{"name":"雪碧","count":2,"price":3,"summary":6,"unit":"瓶"}]
//

