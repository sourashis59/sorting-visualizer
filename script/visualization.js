"use strict";

// function sleep(milliseconds) {
//     return new Promise((resolve) => setTimeout(resolve, milliseconds));
// }

// const changeBarStyle = async function (listBarDiv, newHeight, newColor) {
//     //sleep
//     // await sleep(delayTime);

//     listBarDiv.style.backgroundColor = newColor;
//     listBarDiv.style.height = `${newHeight}%`;
// };

const changeBarStyle = function (listBarDiv, newHeight, newColor) {
    setTimeout(function () {
        listBarDiv.style.backgroundColor = newColor;
        listBarDiv.style.height = `${newHeight}%`;
    }, netDelay);

    netDelay += delayTime;
};

const barCheckingVisualize = function (listBarDiv, listVal) {
    const barCheckingColor = style.getPropertyValue("--barCheckingColor");

    changeBarStyle(listBarDiv, listVal, barCheckingColor);
};

const barMisplacedVisualize = function (listBarDiv, listVal) {
    const barMisplacedColor = style.getPropertyValue("--barMisplacedColor");
    changeBarStyle(listBarDiv, listVal, barMisplacedColor);
};

const barNormalVisualize = function (listBarDiv, listVal) {
    const barNormalColor = style.getPropertyValue("--barColor");
    changeBarStyle(listBarDiv, listVal, barNormalColor);
};

const barCorrectPositionVisualize = function (listBarDiv, listVal) {
    const barCorrectPositionColor = style.getPropertyValue(
        "--barCorrectPositionColor"
    );
    changeBarStyle(listBarDiv, listVal, barCorrectPositionColor);
};
