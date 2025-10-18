const io = require('socket.io-client');

console.log('🔌 Testing Socket.IO Connection and Game Creation');

const socket = io('http://localhost:8001', {
    transports: ['websocket', 'polling']
});

let testsPassed = 0;
let testsTotal = 0;

function runTest(testName, testFn) {
    testsTotal++;
    try {
        const result = testFn();
        if (result) {
            console.log(`✅ ${testName}: PASS`);
            testsPassed++;
        } else {
            console.log(`❌ ${testName}: FAIL`);
        }
    } catch (error) {
        console.log(`❌ ${testName}: ERROR - ${error.message}`);
    }
}

socket.on('connect', () => {
    console.log('✅ Connected to server, socket ID:', socket.id);
    
    // Test 1: Game Creation
    socket.emit('create-game', {
        questionSetId: 'test-question-set',
        gameMode: 'classic',
        hostUserId: 'teacher123',
        hostUsername: 'teachertest',
        hostSlime: 'mint',
        settings: {}
    });
});

socket.on('game-created', (data) => {
    console.log('✅ Game created event received');
    console.log('   Game Code:', data.gameCode);
    console.log('   Host ID:', data.game.hostId);
    
    runTest('Game Creation', () => {
        return data.gameCode && data.game && data.game.hostId === socket.id;
    });
    
    runTest('Host Info Stored', () => {
        return data.game.hostUserId === 'teacher123' && data.game.hostUsername === 'teachertest';
    });
    
    // Test game state
    socket.emit('get-game-state', { gameCode: data.gameCode });
    
    setTimeout(() => {
        // Test starting game
        console.log('🚀 Testing game start...');
        socket.emit('start-game', { gameCode: data.gameCode });
    }, 500);
});

socket.on('game-state', (data) => {
    console.log('✅ Game state received');
    
    runTest('Game State Retrieval', () => {
        return data.game && data.game.status === 'waiting';
    });
});

socket.on('game-started', (data) => {
    console.log('✅ Game started event received');
    
    runTest('Host Can Start Game', () => {
        return data.game && data.questionNumber === 1;
    });
    
    // Summary and exit
    setTimeout(() => {
        console.log('\n📊 Test Summary:');
        console.log(`Passed: ${testsPassed}/${testsTotal}`);
        console.log(`Success Rate: ${((testsPassed/testsTotal)*100).toFixed(1)}%`);
        
        socket.disconnect();
        process.exit(testsPassed === testsTotal ? 0 : 1);
    }, 500);
});

socket.on('connect_error', (error) => {
    console.log('❌ Connection error:', error.message);
    process.exit(1);
});

// Timeout
setTimeout(() => {
    console.log('⏰ Test timeout');
    console.log(`\n📊 Test Summary (Timeout):`);
    console.log(`Passed: ${testsPassed}/${testsTotal}`);
    socket.disconnect();
    process.exit(1);
}, 5000);