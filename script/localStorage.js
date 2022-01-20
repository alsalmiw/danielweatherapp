// let personData = {
//     name: 'Walaa',
//     email: 'alsalmiw@gmail.com'
// }
//console.log(personData);
//localStorage.setItem('peopleData', JSON.stringify(personData))
localStorage.clear('peopleData')

let personDataInfo = JSON.parse(localStorage.getItem('peopleData'));

export {personDataInfo};