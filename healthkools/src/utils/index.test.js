import {shuffle} from "utils/index";
describe('Shuffle function', () => {
    test('Test shuffle', () => {
        var array = [1, 2, 3, 4, 5, 6];
        var are_the_same = true;
        var are_the_same2 = true;
        var shuffled_array = shuffle(array);
        var new_shuffled_array = shuffle(array, true);
        array.map((item, index) => {
            if(are_the_same && item !== shuffled_array[index]){
                are_the_same = false;
            }
        });
        array.map((item, index) => {
            if(are_the_same2 && item !== new_shuffled_array[index]){
                are_the_same2 = false;
            }
        });
        expect(shuffled_array.length).toBe(array.length);
        expect(are_the_same).toBe(true);
        expect(are_the_same2).toBe(false);
    });
});