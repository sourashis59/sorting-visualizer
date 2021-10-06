"use strict";

const insertionSort = function () {
    console.log("insertion sort function called");

    barCorrectPositionVisualize(listBarDiv[0], listVal[0]);

    for (let i = 1; i < listSize; i++) {
        barCheckingVisualize(listBarDiv[i], listVal[i]);

        let j = i - 1;
        let x = listVal[i];

        //*shifting
        while (j >= 0 && listVal[j] > x) {
            barCheckingVisualize(listBarDiv[j + 1], listVal[j + 1]);
            barMisplacedVisualize(listBarDiv[j + 1], listVal[j + 1]);

            listVal[j + 1] = listVal[j];

            barHideVisualize(listBarDiv[j], listVal[j]);
            barCorrectPositionVisualize(
                listBarDiv[j + 1],
                listVal[j + 1],
                false
            );

            j--;
        }

        listVal[j + 1] = x;

        barCorrectPositionVisualize(listBarDiv[j + 1], listVal[j + 1]);
    }
};
