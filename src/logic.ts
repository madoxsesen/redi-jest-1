export function add(a: any, b: any): number {
    if(a === null || b === null){
        throw new Error('Parameters are not allowed to be null')
    }
    if(a === undefined || b === undefined){
        throw new Error('Parameters are not allowed to be undefined')
    }

    return a + b;
}



export type ExamResults = {userId: number; answers: number[]}

export function validateExamResults(result: ExamResults,
                                    validationFunction: (a: ExamResults) => boolean,
                                    errorFunction: (b: ExamResults) => void): void{
    const resultsAreCorrect = validationFunction(result)

    if(!resultsAreCorrect){
        errorFunction(result)
    }
}