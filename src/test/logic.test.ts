import {add, ExamResults, validateExamResults} from "../logic";


test('summing two positive numbers', () => {
    expect(add(1, 10)).toBe(11)
})

// YOUR TASK: write the following test cases and modify the add function so it fulfills the expected behavior.
//  You can decide how the code should behave in these scenarios. When something goes wrong, it could return 0, throw an Error or something else :)


test('summing two negative numbers', () => {
    expect(add(-2, -3)).toBe(-5)
})

test('summing a positive and a negative number', () => {
    expect(add(2, -3)).toBe(-1)
})

test('summing 0s', () => {
    expect(add(0, 0)).toBe(0)
})

test('inputting undefined', () => {
    expect(() => add(10, undefined)).toThrow()
})

test('inputting null', () => {
    expect(() => add(null, null)).toThrow()
})

test('inputting NaN', () => {
    expect(add(5, NaN)).toBeNaN()
})

test('inputting Infinity', () => {
    expect(add(Infinity, Infinity)).toBe(Infinity)
})


// This function showcases what mocking is by providing a function with 2 mock functions as input
// The idea behind this is that we only want to test the logic of validateExamResults and not of its dependencies
describe('validateExamResults' , () => {

    const examResults: ExamResults = {userId: 1, answers: [1,2,3]}
    // Examples or "real" functions to input here - but we don't want to test the other functions,
    // we only want to test the behavior of validateExamResults
    //
    // const validateResults = (a: ExamResults) => {
    //     return a.answers.length === 3
    // }
    // const failByThrowingError = (a: ExamResults): void => {
    //     throw new Error(`${a.userId} has failed the exam`)
    // }

    let mockValidationFunction: any
    let mockErrorFunction : any

    beforeAll(() => {
        // setup mocking functions for our code, so we can focus on validateExamResults
        mockValidationFunction = jest.fn()
        mockErrorFunction = jest.fn()
    })

    afterEach(() => {
        // Reset the mocks after each test, otherwise the counters will be wrong!
        jest.resetAllMocks()
    })


    it('should call the validation function', () => {
        // Fake a return value for the mock function
        mockValidationFunction.mockReturnValue(true)

        validateExamResults(examResults,
            mockValidationFunction,
            mockErrorFunction)

        // Assert that we call (or don't call) the mock functions
        expect(mockValidationFunction).toHaveBeenCalledTimes(1)
        expect(mockErrorFunction).not.toHaveBeenCalled()

    })

    it('should call the error function is the validation is false', () => {
        mockValidationFunction.mockReturnValue(false)

        validateExamResults(examResults,
            mockValidationFunction,
            mockErrorFunction)

        expect(mockValidationFunction).toHaveBeenCalledTimes(1)
        expect(mockErrorFunction).toHaveBeenCalledTimes(1)

    })

})

