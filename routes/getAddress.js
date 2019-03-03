const app = require('express');
const data = require('./data/test.json'); //CHANGE THIS TO THE ACTUAL FILE NAME AT SOME POINT

function jsonSort(array)
{
    var minLow = 0;
    var minSecond = 0;
    var minThird = 0;
    var i;

    for(i = 1; i < array.length; i++)
    {
        //console.log(array[i].numStore);
        if (array[i].numStore < array[minLow].numStore )
            {
                minThird = minSecond;
                minSecond = minLow;
                minLow = i;
            }
        else if (array[i].numStore < array[minSecond].numStore )
            {
                minThird = minSecond;
                minSecond = i;
            }
        else if (array[i].numStore < array[minThird].numStore )
            minThird = i
    }

    var minimums = [minLow, minSecond, minThird];
    return minimums;
}

var indexes = jsonSort(data);

/*
var j;
for(j=0; j<indexes.length; j++)
    console.log("LOWEST INDEX: " + indexes[j]);
// 10, 4, 6, 1, 12, 15, 8, 9, 2, 6
//should print 3, 8, 1 
*/

var j = 0;
for (j; j<3; j++)
{
    var cursor = indexes[j];
    console.log(data[cursor].ip);
    //should print 1.1.4  1.2.4  1.1.2
}