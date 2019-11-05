// let data = require('../src/Data.js');
import * as data from "../lib/DataBaseRepo.js";

test('test add todo', () => {
    var sut = data.AddTodo("test");
    sut.then(result => {
        expect(result).toBe(true);
    });
    // expect( data.AddTodo("test")).toBe(true);
    // data.ShowTodos()
    //expect(data.addTodo("test")).toBe(3);
});


// The assertion for a promise must be returned.
// it('works with promises', () => {
// //   expect.assertions(1);
//   return dat.AddTodo("test").then(data => expect(data).toEqual(true));
// });

test("show the todo's", () =>{
    data.AddTodo("test");
    data.ShowTodos();
})

test('test the tests ', () => {
    expect(data.Test()).toBe(1);
})