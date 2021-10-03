"use strict";

const merge = function (low, mid, high) {
    if (low >= high) return;

    let n = high - low + 1;

    let auxArr = [];
    for (let i = 0; i < n; i++) auxArr[i] = 0;

    let i = low;
    let j = mid + 1;
    let k = 0;
    while (i <= mid && j <= high) {
        barCheckingVisualize(listBarDiv[i], listVal[i]);
        barCheckingVisualize(listBarDiv[j], listVal[j], false);

        if (listVal[i] < listVal[j]) {
            barMisplacedVisualize(listBarDiv[i], listVal[i]);
            auxArr[k++] = listVal[i++];
        } else {
            barMisplacedVisualize(listBarDiv[j], listVal[j], false);
            auxArr[k++] = listVal[j++];
        }
    }

    while (i <= mid) {
        barCheckingVisualize(listBarDiv[i], listVal[i]);
        barMisplacedVisualize(listBarDiv[i], listVal[i], false);
        auxArr[k++] = listVal[i++];
    }

    while (j <= high) {
        barCheckingVisualize(listBarDiv[j], listVal[j]);
        barMisplacedVisualize(listBarDiv[j], listVal[j]);
        auxArr[k++] = listVal[j++];
    }

    for (let i = 0; i < n; i++) {
        listVal[low + i] = auxArr[i];
        barCorrectPositionVisualize(listBarDiv[low + i], listVal[low + i]);
    }

    for (let i = 0; i < n; i++) {
        barNormalVisualize(listBarDiv[low + i], listVal[low + i], false);
    }
};
const mergeSort_helper = function (low, high) {
    if (low >= high) return;

    let mid = Math.floor((low + high) / 2);

    mergeSort_helper(low, mid);
    mergeSort_helper(mid + 1, high);

    merge(low, mid, high);
};
const mergeSort = function () {
    console.log("merge sort function called");

    mergeSort_helper(0, listVal.length - 1);

    for (let i = 0; i < listVal.length; i++)
        barCorrectPositionVisualize(listBarDiv[i], listVal[i]);
};
