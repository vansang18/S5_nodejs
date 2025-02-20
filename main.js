let score1Key= "Toan";
let score2Key= "Tin"
let Student = function(name,age,score1,score2){
    this.name = name;
    this.age= age;
    this.score= {
        [score1Key]:score1,
        [score2Key]:score2
    }
    this.getInfo = function(){
        return `ten: ${this.name} tuoi: ${this.age} score1:${this.score[score1Key]} score2: ${this.score[score2Key]}`
    }
}

const student1 = new Student("Tung",16,2,2);
let student2 = new Student("Toan",17,7,9);
let student3 = new Student("Tien",20,3,4);
let student4 = new Student("Tuan",21,4,4);
let students = [student1,student2,student3,student4];
// viet cau lenh duyet tat ca phan tu
for (const student of students) {
    console.log(student.getInfo());
}
for (const key in students) {
    console.log(students[key]);
}
//
let result = students.map(function(student){
    if(student.age>=18){
        return "18 Roi";
    }else{
        return "Chua 18";
    }
});
//let result = []
// for (const student of students) {
//     if(student.age>=18){
//         result.push("18 Roi");
//     }else{
//         result.push("Chua 18");
//     }
// }

let sum1 = students.reduce(function(sum,student){
    return sum+=student.age;
},0);
//let sum
// for (const student of students) {
//     sum+=student.age
// }

let _18Tuoi = students.filter(function(student){
    return !(student.age>=18)
})
// let _18Tuoi = [];
// for (const student of students) {
//     if(student.age>=18){
//         _18Tuoi.push(student); 
//     }
// }

let checkGAE18 = students.every(function(student){
    return student.age >=18 
})
let checkExistL18 = students.some(function(student){
    return student.age >=18 
});



