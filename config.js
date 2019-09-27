const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3

const GENSIS_DATA = {
    timestamp: 1,
    lastHash: '--genesis-lastHash--',
    hash: '--genesis-hash--',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
}

module.exports = {
    GENSIS_DATA,
    INITIAL_DIFFICULTY,
    MINE_RATE
}