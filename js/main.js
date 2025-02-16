// Function to launch WebRcade
function launchWebrcade() {
    // Open WebRcade with our local feed URL
    const feedUrl = 'http://192.168.1.250:8080/feed.json';
    window.open(`https://play.webrcade.com/?feed=${encodeURIComponent(feedUrl)}`, '_blank');
}

// Initialize gamepad detection
window.addEventListener('load', () => {

    const statusElement = document.getElementById('gamepad-status');
    
    // Function to update gamepad status with more detailed information
    const updateGamepadStatus = () => {
        const gamepads = navigator.getGamepads();
        let connected = false;
        let statusText = 'Gamepad Status: ';
        
        for (const gamepad of gamepads) {
            if (gamepad) {
                connected = true;
                statusText = `Gamepad Detected: ${gamepad.id}`;
                
                // Add connection status
                statusText += `<br>Connection: ${gamepad.connected ? 'Connected' : 'Disconnected'}`;
                
                // Add button count
                statusText += `<br>Buttons: ${gamepad.buttons.length}`;
                
                // Add axes count
                statusText += `<br>Axes: ${gamepad.axes.length}`;
                
                break;
            }
        }
        
        if (!connected) {
            statusText = 'No gamepad detected. Please connect a USB or Bluetooth gamepad.';
        }
        
        statusElement.innerHTML = statusText;
    };

    // Initial check
    updateGamepadStatus();

    // Listen for gamepad connections
    window.addEventListener('gamepadconnected', (e) => {
        console.log('Gamepad connected:', e.gamepad);
        updateGamepadStatus();
    });

    // Listen for gamepad disconnections
    window.addEventListener('gamepaddisconnected', (e) => {
        console.log('Gamepad disconnected:', e.gamepad);
        updateGamepadStatus();
    });

    // Update status periodically to catch any changes
    setInterval(updateGamepadStatus, 1000);
});
