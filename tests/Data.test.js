let data = require('../src/Data.js');

test('test add todo', () => {
    return data.AddTodo("test").then(result => {
        expect(result).toBe(true);
    });
    // expect( data.AddTodo("test")).toBe(true);
    // data.ShowTodos()
    //expect(data.addTodo("test")).toBe(3);
});