const io = require('socket.io-client');

// Test Socket.IO game creation and host detection
async function testSocketIO() {
    console.log('🔌 Testing Socket.IO Game Creation and Host Detection');
    console.log('=' * 60);
    
    const socket = io('http://localhost:8001');
    
    return new Promise((resolve) => {
        let testResults = [];
        
        socket.on('connect', () => {
            console.log('✅ Connected to server with socket ID:', socket.id);
            
            // Test game creation
            const gameData = {
                questionSetId: 'test-set-id',
                gameMode: 'classic',
                hostUserId: 'teacher-test-id',
                hostUsername: 'teachertest',
                hostSlime: 'mint',
                settings: {}
            };
            
            console.log('🎮 Creating game with host info...');
            socket.emit('create-game', gameData);
        });
        
        socket.on('game-created', (data) => {
            console.log('✅ Game created successfully!');
            console.log('   Game Code:', data.gameCode);
            console.log('   Host ID:', data.game.hostId);
            console.log('   Host User ID:', data.game.hostUserId || 'Not set');
            console.log('   Host Username:', data.game.hostUsername || 'Not set');
            console.log('   Host Slime:', data.game.hostSlime || 'Not set');
            
            testResults.push({
                test: 'Game Creation',
                success: true,
                message: `Game ${data.gameCode} created with host ${data.game.hostId}`
            });
            
            // Test if host is automatically added to players
            const hasHostInPlayers = data.game.players && data.game.players.some(p => p.id === socket.id);
            if (hasHostInPlayers) {
                console.log('✅ Host automatically added to players array');
                testResults.push({
                    test: 'Host Auto-Join',
                    success: true,
                    message: 'Host automatically added to players'
                });
            } else {
                console.log('❌ Host NOT automatically added to players array');
                testResults.push({
                    test: 'Host Auto-Join',
                    success: false,
                    message: 'Host not automatically added to players'
                });
            }
            
            // Test game state retrieval
            socket.emit('get-game-state', { gameCode: data.gameCode });
        });
        
        socket.on('game-state', (data) => {
            console.log('✅ Game state retrieved');
            console.log('   Players count:', data.game.players.length);
            console.log('   Game status:', data.game.status);
            
            testResults.push({
                test: 'Game State Retrieval',
                success: true,
                message: `Game state retrieved with ${data.game.players.length} players`
            });
            
            // Test starting game as host
            console.log('🚀 Testing game start as host...');
            socket.emit('start-game', { gameCode: data.game.code });
        });
        
        socket.on('game-started', (data) => {
            console.log('✅ Game started successfully by host');
            console.log('   Game mode:', data.gameMode);
            console.log('   Question number:', data.questionNumber);
            
            testResults.push({
                test: 'Host Start Game',
                success: true,
                message: 'Host successfully started the game'
            });
            
            // Finish tests
            setTimeout(() => {
                socket.disconnect();
                
                console.log('\n' + '='.repeat(60));
                console.log('📊 SOCKET.IO TEST SUMMARY');
                console.log('='.repeat(60));
                
                const passed = testResults.filter(r => r.success).length;
                const total = testResults.length;
                
                console.log(`Total Tests: ${total}`);
                console.log(`Passed: ${passed}`);
                console.log(`Failed: ${total - passed}`);
                
                const failed = testResults.filter(r => !r.success);
                if (failed.length > 0) {
                    console.log('\n❌ FAILED TESTS:');
                    failed.forEach(test => {
                        console.log(`  - ${test.test}: ${test.message}`);
                    });
                }
                
                resolve(passed === total);
            }, 1000);
        });
        
        socket.on('connect_error', (error) => {
            console.log('❌ Connection error:', error.message);
            testResults.push({
                test: 'Socket Connection',
                success: false,
                message: `Connection failed: ${error.message}`
            });
            resolve(false);
        });
        
        // Timeout after 10 seconds
        setTimeout(() => {
            console.log('⏰ Test timeout - some events may not have fired');
            socket.disconnect();
            resolve(false);
        }, 10000);
    });
}

// Run the test
testSocketIO().then(success => {
    process.exit(success ? 0 : 1);
}).catch(error => {
    console.error('Test error:', error);
    process.exit(1);
});