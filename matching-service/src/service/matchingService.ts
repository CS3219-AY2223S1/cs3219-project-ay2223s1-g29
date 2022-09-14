import Queue from 'queue-fifo';

const queue = new Queue();

const addQueue = (user:string, difficulty:string) => {
    console.log(queue);
    queue.enqueue(user);
}

const popQueue = (difficulty:string) => {
    console.log(queue);
    return queue.dequeue();
}

const isEmpty = (difficulty:string) => {
    return queue.isEmpty();
}

const MatchingService = {
    addQueue,
    popQueue,
    isEmpty,
};

export {MatchingService as default};
