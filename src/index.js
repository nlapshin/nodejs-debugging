// import { performance } from 'perf_hooks';

// const start = performance.now(); // new Date().getTime()

// let sum = 0;

// for (let i = 0; i < 1000000000; i++) {
//   sum += i;
// }

// console.log(sum);

// const end = performance.now(); // new Date().getTime()
// const latency = end - start;

// console.log(latency);

// Нету доступа до числа - выводит в stdout

const tracingObj = {};

a()

function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Подключить к нему свойство stack
  // Error.captureStackTrace(tracingObj);

  // console.log(tracingObj.stack);

  console.log(Error.stackTraceLimit);

  // console.trace(); // trace в консоле. А мы хотим его получить.
}


// class UserError extends Error {};

// throw new UserError();

// const [err, data] = goWayFunction();
