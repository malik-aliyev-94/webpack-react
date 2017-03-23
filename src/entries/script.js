// @flow
function foo(x) {
  return x * 10;
}
foo('Hello, world!');

function bar(x): string {
  return x.length;
}
bar('Hello, world!');

var str: number = 'hello world!';
console.log(str);