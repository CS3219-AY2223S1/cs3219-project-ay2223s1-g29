import Queue from 'queue-fifo';

const easyQueue = new Queue();
const mediumQueue = new Queue();
const hardQueue = new Queue();

const addQueue = (user:string, difficulty:string) => {
    switch (difficulty) {
        case "easy":
            console.log(easyQueue);
            easyQueue.enqueue(user);
            break;
        case "medium":
            console.log(mediumQueue);
            mediumQueue.enqueue(user);
            break;
        case "hard":
            console.log(hardQueue);
            hardQueue.enqueue(user);
            break;
        default:
            console.log("random");
            break;
    }
}

const popQueue = (difficulty:string):any => {
    switch (difficulty) {
        case "easy":
            console.log(easyQueue);
            return easyQueue.dequeue();
        case "medium":
            console.log(mediumQueue);
            return mediumQueue.dequeue();
        case "hard":
            console.log(hardQueue);
            return hardQueue.dequeue();
        default:
            console.log("random");
            break;
    }
}

const peekQueue = (difficulty:string):any => {
    switch (difficulty) {
        case "easy":
            return easyQueue.peek();
        case "medium":
            return mediumQueue.peek();
        case "hard":
            return hardQueue.peek();
        default:
            console.log("random");
            break;
    }
}

const isEmpty = (difficulty:string) => {
    switch (difficulty) {
        case "easy":
            console.log("easyQueue");
            return easyQueue.isEmpty();
        case "medium":
            console.log("mediumQueue");
            return mediumQueue.isEmpty();
        case "hard":
            console.log("hardQueue");
            return hardQueue.isEmpty();
        default:
            console.log("random");
            return false;
            break;
    }
}

const MatchingService = {
    addQueue,
    popQueue,
    peekQueue,
    isEmpty,
};

export {MatchingService as default};
