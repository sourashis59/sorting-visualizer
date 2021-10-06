"use strict";

const bubbleSort = function () {
    console.log("bubble sort function called");

    for (let i = 0; i < listSize; i++) {
        for (let j = 0; j < listSize - 1 - i; j++) {
            barCheckingVisualize(listBarDiv[j], listVal[j]);
            barCheckingVisualize(listBarDiv[j + 1], listVal[j + 1], false);

            if (listVal[j] > listVal[j + 1]) {
                barMisplacedVisualize(listBarDiv[j], listVal[j]);
                barMisplacedVisualize(listBarDiv[j + 1], listVal[j + 1], false);

                //swap
                [listVal[j], listVal[j + 1]] = [listVal[j + 1], listVal[j]];
            }

            barNormalVisualize(listBarDiv[j], listVal[j]);
            barNormalVisualize(listBarDiv[j + 1], listVal[j + 1], false);
        }

        barCorrectPositionVisualize(
            listBarDiv[listSize - 1 - i],
            listVal[listSize - 1 - i]
        );
    }
};
