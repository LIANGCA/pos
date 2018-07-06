'use strict';

function printReceipt(tags) {
  let cartItemsMap = calculateByItemsNumber(tags);
  let cartItemWithDetailArray = calCartItemsWithDetail(cartItemsMap, loadAllItems());
  let sum = calculateCartItemSubTotalSum(cartItemWithDetailArray);
  let saveSum = saveItemMoneySum(cartItemWithDetailArray, sum);
  let receipt = generateReceipt(cartItemWithDetailArray, sum, saveSum);
  console.log(receipt);
}

function buildBuyItem(barcode, cartItemsMap) {
  let key,value;
  if (barcode.indexOf('-') > -1) {
    key = barcode.split('-')[0];
    value = parseFloat(barcode.split('-')[1]);
  } else {
    key = barcode;
    value = 1;
  }
  if (cartItemsMap.hasOwnProperty(key)) {
    cartItemsMap[key] += value;
  } else {
    cartItemsMap[key] = value;
  }
}

function calculateByItemsNumber(tags) {
  let cartItemsMap = {};
  for (let barcode of tags) {
    buildBuyItem(barcode, cartItemsMap);
  }
    return cartItemsMap;
}

function calculateSummary(item, count) {
  if (loadPromotions()[0].barcodes.includes(item.barcode)) {
    return item.price * (parseInt(count / 3) * 2 + (count % 3));
  }
  else {
    return item.price * parseFloat(count);
  }
}

function calCartItemsWithDetail(cartItemsMap, allItems) {
  let buyItemWithDetail = [];
  for (let item of allItems) {
    if (cartItemsMap.hasOwnProperty(item.barcode)) {
      const {name, price, unit} = item;
      buyItemWithDetail.push({
        name,
        count: cartItemsMap[item.barcode],
        price,
        summary: calculateSummary(item, cartItemsMap[item.barcode]),
        unit
      });
    }
  }
  console.info(buyItemWithDetail);
  return buyItemWithDetail;
}

function calculateCartItemSubTotalSum(cartItemWithDetailArray) {
  let sum = 0;
  for (let item of cartItemWithDetailArray) {
    sum += item.summary;
  }
  return sum;
}

function saveItemMoneySum(cartItemWithDetailArray, sum) {
  let savePrice = parseInt(0);
  for (let item of cartItemWithDetailArray) {
    savePrice += item.count * item.price;
  }
  savePrice = savePrice - sum;
  return savePrice;
}

function generateReceipt(buyItemWithDetail, sum, saveSum) {
  let receipt = `***<没钱赚商店>收据***`;
  for (let buyItem of buyItemWithDetail) {
    receipt += `\n名称：${buyItem.name}，数量：${buyItem.count}${buyItem.unit}，单价：${buyItem.price.toFixed(2)}(元)，小计：${buyItem.summary.toFixed(2)}(元)`
  }
  receipt += `\n----------------------
总计：${sum.toFixed(2)}(元)
节省：${saveSum.toFixed(2)}(元)
**********************`;
  return receipt;
}

