function add(a, b) {
    return a + b;
}

describe('<App />', () => {
    it('should give number of 5 when 2 and 3 were passed.', () => {
        const result = add(2, 3);
    
        expect(result).toBe(5);
    });

    it.only('should give number of 2undefined when 2 was passed.', () => {
        const result = add(2);

        expect(result).toBeNaN();
    });
});
