/* Задача:
Министерство Спорта одного государства учредило новый вид спорта - охоту на куниц с бумерангом. Не вдаваясь в подробности правил этого вида спорта, 
необходимо написать систему подсчета очков. Охоту судят семь судей, которые оценивают спортсменов по пяти разным показателям. За каждый показатель 
спортсмены получают оценку от -5 до 5, но не могут получить нуль. Затем находится среднее по каждому судье и отбрасывается одна наименьшая и одна 
наибольшая оценка. Берется средняя оценка оставшихся пяти судей и выставляется в качестве финальной оценки.
Пусть вводятся имена и оценки спортсменов. Задача - получить победителя соревнований.
*/

"use strict";

function avg(nums) {
    console.log(nums);
    let res = 0;
    for (let num of nums)
        res += +num;
    return res / nums.length;

}

function deleteMaxMin(arr) {
    let min;
    let max = min = arr[0];
    let min_ind = 0,
        max_ind = 0;
    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] > max) {
            max = arr[i];
            max_ind = i;
        } else {
            if (arr[i] < min) {
                min = arr[i];
                min_ind = i;
            }
        }
    }
    let res = [];
    for (let i = 1; i < arr.length; ++i) {
        if ((i != min_ind) && (i != max_ind)) {
            res.push(arr[i]);
        }
    }
    return res;
}

function getWinner(map) {
    let max = -5;
    let winner = '';
    map.forEach((value, key, map) => {
        if (value >= max) {
            max = value;
            winner = key;
        }
    });
    return winner;
}

//main task
function findWinner(players) {
    for (let key of players.keys()) {
        console.log(players.get(key));
        let new_value = [];
        let from = 0;
        for (let judge = 0; judge < 7; ++judge) {
            new_value.push(avg(players.get(key).slice(from, from + 5)));
            from += 5;
        }
        console.log(new_value);
        players.set(key, avg(deleteMaxMin(new_value))); //получаем среднюю оценку 5 судей
        console.log(players.get(key));
    };
    return getWinner(players);
}

//start
let players = new Map();
let name;
let points;
do {
    [name, ...points] = prompt('Введите участника в формате "ИМЯ, <оценки (от -5 до 5 не включая 0) 7 судей по 5 критериям (5 оценок 1-го судьи, 5 оценок 2-го судьи и т.д.) через запятую>"').split(",");
    players.set(name, points);
} while (confirm("Ввести ещё одного участника?"));
alert(`Победитель: ${findWinner(players)}`);