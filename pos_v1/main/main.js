'use strict';

function printReceipt(tags){
  let cartItemsMap =  CalculateByItemsNumber(tags);
  let cartItemWithDetailArray = CalCartItemsWithDetail(cartItemsMap,loadAllItems())
  let sum = cartItemSum(cartItemWithDetailArray);
  let saveSum = saveItemSum(cartItemWithDetailArray, sum);
  let receipt = generateReceipt(cartItemWithDetailArray,sum,saveSum);
  console.log(receipt)
}
function CalculateByItemsNumber(tags){
  //let buyItems = new Array();
  let cartItemsMap = {}
  let buyItemSet = new Set()
  for(let i = 0;i < tags.length;i++){
    let key,value;
    if(tags[i].indexOf('-')>-1){
      key = tags[i].split('-')[0];
      value = parseFloat(tags[i].split('-')[1]);
    }else{
      key = tags[i];
      value = 1;
    }
    if(buyItemSet.has(key)){
      cartItemsMap[key] = cartItemsMap[key]+value;
    }else{
      cartItemsMap[key] = value;
      buyItemSet.add(key);
    }
  }
  console.info(cartItemsMap)
  return cartItemsMap;
}

function CalCartItemsWithDetail(cartItemsMap, allItems){
  let buyItemWithDetail = new Array();
     for(let i= 0;i<allItems.length;i++){
       let item = allItems[i];
       if(cartItemsMap.hasOwnProperty(item.barcode)){
         let buyItem = {};
         buyItem['name'] = item.name;
         let count = cartItemsMap[item.barcode];
         buyItem['count'] = count;
         buyItem['price'] = item.price;
         if(loadPromotions()[0].barcodes.includes(item.barcode))
         buyItem['summary'] = item.price*(parseInt(count/3)*2+(count%3));
         else{
           buyItem['summary'] = item.price*parseFloat(count);
         }
         buyItem['unit'] = item.unit;
         buyItemWithDetail.push(buyItem);
       }
     }
     return buyItemWithDetail;
}

function cartItemSum(cartItemWithDetailArray){
  let sum = 0;
  for(let i = 0; i<cartItemWithDetailArray.length; i++){
    sum += cartItemWithDetailArray[i].summary;
  }
  return sum;
}
function saveItemSum(cartItemWithDetailArray, sum){
  let savePrice = parseInt(0);
  for(let i = 0; i<cartItemWithDetailArray.length; i++){
    savePrice += cartItemWithDetailArray[i].count*cartItemWithDetailArray[i].price;
  }
  savePrice  = savePrice - sum;
  return savePrice;
}

function generateReceipt(buyItemWithDetail, sum, saveSum){
  let receipt = `***<没钱赚商店>收据***`
  for(let i= 0;i<buyItemWithDetail.length;i++) {
    receipt +=`\n名称：${buyItemWithDetail[i].name}，数量：${buyItemWithDetail[i].count}${buyItemWithDetail[i].unit}，单价：${buyItemWithDetail[i].price.toFixed(2)}(元)，小计：${buyItemWithDetail[i].summary.toFixed(2)}(元)`
  }
 receipt+=`\n----------------------
总计：${sum.toFixed(2)}(元)
节省：${saveSum.toFixed(2)}(元)
**********************`
    return receipt;
  }

