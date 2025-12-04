//기존 callback 함수
const getTest = (data, cllback) => {
    console.log("서버로 값 전달 : ", data);
    setTimeout(() => {
        console.log("서버에서 응답도착")
        cllback("성공");
    },3000)
}

// console.log("시작")
// getTest({id: 30}, (result) => {
//     console.log(result)
// })
// console.log("끝")

const getTest2 = new Promise((resolve, reject)=> {
    console.log("서버로 값 전달 : ", data);
    setTimeout(() => {
        console.log("서버에서 응답도착")
        resolve("성공");
    }, 3000)
})