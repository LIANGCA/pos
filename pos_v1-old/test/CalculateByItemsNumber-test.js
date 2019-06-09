'use strict';

describe('calculateByItemsNumber', () => {
  it('should print map', () => {

    const tags = [
      'ITEM000000',
      'ITEM000001',
      'ITEM000000',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    let cartItemsMap = JSON.stringify(calculateByItemsNumber(tags));

    const expectText = JSON.stringify({ITEM000000:2,ITEM000001:3,ITEM000003:2.5,ITEM000005:3});

    expect(cartItemsMap).toBe(expectText);
  });

});



