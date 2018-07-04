'use strict';

function printReceipt(tags){
  let buyMap =  CalculateByItems(tags);
  let buyItemWithDetail = CalBuyItemWithDetail(buyMap,loadAllItems())
  let sum = buyItemSum(buyItemWithDetail);
  let savePrice = saveItemSum(buyItemWithDetail,sum);
  return print(buyItemWithDetail,sum,savePrice);
}
function CalculateByItems(tags){
  //let buyItems = new Array();
  let buyMap = {}
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
      buyMap[key] = buyMap[key]+value;
    }else{
      buyMap[key] = value;
      buyItemSet.add(key);
    }
  }

  // for(var key in buyMap) {
  //   var item = {branch: key, count: buyMap[key]}
  //   buyItems.push(item);
  // }

  return buyMap;
}

function CalBuyItemWithDetail(buyMap,allItems){
  let buyItemWithDetail = new Array();
     for(let i= 0;i<allItems.length;i++){
       let item = allItems[i];
       if(buyMap.hasOwnProperty(item.barcode)){
         let buyItem = {};
         buyItem['name'] = item.name;
         let count = buyMap[item.barcode];
         buyItem['count'] = count;
         buyItem['price'] = item.price;
         buyItem['summary'] = item.price*(parseInt(count/3)*2+(count%3));
         buyItem['unit'] = item.unit;
         buyItemWithDetail.push(buyItem);
       }
     }
     return buyItemWithDetail;
}

function buyItemSum(buyItemWithDetail){
  let sum = 0;
  for(let i = 0;i<buyItemWithDetail.length;i++){
    sum += buyItemWithDetail[i].summary;
  }
  return sum;
}
function saveItemSum(buyItemWithDetail,sum){
  let savePrice = parseInt(0);
  for(let i = 0;i<buyItemWithDetail.length;i++){
    savePrice += buyItemWithDetail[i].count*buyItemWithDetail[i].price;
  }
  savePrice  = savePrice - sum;
  return savePrice;
}

function print(buyItemWithDetail,sum,savePrice){
  let receipt = '***<没钱赚商店>收据***\n'
  for(let i= 0;i<buyItemWithDetail.length;i++) {
    let item = buyItemWithDetail[i];
    receipt += '名称：' + item.name + '，数量：' + item.count + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + item.summary.toFixed(2) + '(元)\n'
  }
  receipt+='----------------------\n总计：'+sum.toFixed(2)+'(元)\n节省：'+savePrice.toFixed(2)+'(元)\n**********************';
    return receipt;
  }

