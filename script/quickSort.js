"use strict";

const partition = function (low, high) {
    // Your code here

    if (low > high) return low;

    if (low === high) {
        barCorrectPositionVisualize(listBarDiv[low], listVal[low]);
        return low;
    }

    let pivotIndex = high;
    let pivot = listVal[pivotIndex];

    //swap
    [listVal[pivotIndex], listVal[high]] = [listVal[high], listVal[pivotIndex]];

    barCheckingVisualize(listBarDiv[pivotIndex], listVal[pivotIndex]);

    let i = low,
        j = high - 1;

    while (i < j) {
        while (j >= low) {
            barCheckingVisualize(listBarDiv[j], listVal[j]);

            if (listVal[j] > pivot) {
                barNormalVisualize(listBarDiv[j], listVal[j]);
                j--;
            } else {
                barMisplacedVisualize(listBarDiv[j], listVal[j]);
                break;
            }
        }

        while (i <= high - 1) {
            barCheckingVisualize(listBarDiv[i], listVal[i]);

            if (listVal[i] <= pivot) {
                barNormalVisualize(listBarDiv[i], listVal[i]);
                i++;
            } else {
                barMisplacedVisualize(listBarDiv[i], listVal[i]);
                break;
            }
        }

        if (i < j && i <= high - 1 && j >= low) {
            // swap(listVal[i], listVal[j]);
            [listVal[i], listVal[j]] = [listVal[j], listVal[i]];

            barCorrectPositionVisualize(listBarDiv[i], listVal[i]);
            barCorrectPositionVisualize(listBarDiv[j], listVal[j]);

            barNormalVisualize(listBarDiv[i], listVal[i], false);
            barNormalVisualize(listBarDiv[j], listVal[j], false);
        }
    }

    // this condition checking is for the corner case : [1,4]
    if (i <= high - 1 && listVal[i] > listVal[pivotIndex]) {
        barMisplacedVisualize(listBarDiv[i], listVal[i]);
        barMisplacedVisualize(
            listBarDiv[pivotIndex],
            listVal[pivotIndex],
            false
        );

        // swap(listVal[i], listVal[pivotIndex]);
        [listVal[i], listVal[pivotIndex]] = [listVal[pivotIndex], listVal[i]];
    }

    barNormalVisualize(listBarDiv[pivotIndex], listVal[pivotIndex], false);
    barCorrectPositionVisualize(listBarDiv[i], listVal[i]);

    return i;
};

const quickSort_helper = function (low, high) {
    if (low > high) return;

    if (low === high) {
        barCorrectPositionVisualize(listBarDiv[low], listVal[low]);
        return;
    }

    let partitionIndex = partition(low, high);
    quickSort_helper(low, partitionIndex - 1);
    quickSort_helper(partitionIndex + 1, high);
};

const quickSort = function () {
    console.log("qucikSort function called");
    quickSort_helper(0, listVal.length - 1);
};
