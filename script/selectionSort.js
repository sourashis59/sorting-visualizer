"use strict";

const selectionSort = function () {
    console.log("selection sort function called");

    for (let i = 0; i < listSize; i++) {
        let indMin = i;

        barCheckingVisualize(listBarDiv[i], listVal[i]);

        for (let j = i + 1; j < listSize; j++) {
            barCheckingVisualize(listBarDiv[j], listVal[j]);

            if (listVal[j] < listVal[indMin]) {
                indMin = j;
            }

            //swap

            barNormalVisualize(listBarDiv[j], listVal[j]);
        }

        if (indMin != i) barMisplacedVisualize(listBarDiv[i], listVal[i]);

        [listVal[i], listVal[indMin]] = [listVal[indMin], listVal[i]];

        barCorrectPositionVisualize(listBarDiv[i], listVal[i]);
    }
};
