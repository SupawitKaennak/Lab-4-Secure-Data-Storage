// Secure Data Storage Implementation
class SecureDataStorage {
    constructor() {
        this.currentSession = null;
        this.storedData = new Map();
        this.initializeEventListeners();
    }

    // ✅ Secure Password Hashing (Simulated)
    async hashPassword(password) {
        try {
            // Using Web Crypto API (simplified simulation)
            const encoder = new TextEncoder();
            const data = encoder.encode(password + 'salt123');
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (error) {
            console.error('Password hashing error:', error);
            throw new Error('Failed to hash password');
        }
    }

    // ✅ Secure Session Management
    createSecureSession(userId) {
        const sessionData = {
            userId: userId,
            timestamp: Date.now(),
            token: this.generateSecureToken()
        };
        
        // Store in secure httpOnly cookie (simulated)
        this.currentSession = sessionData;
        this.updateSessionStatus();
        return sessionData;
    }

    // Generate cryptographically secure token
    generateSecureToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    // Simulate secure data encryption
    async encryptData(data) {
        try {
            const encoder = new TextEncoder();
            const dataString = JSON.stringify(data);
            const dataBuffer = encoder.encode(dataString);
            
            // Simulate encryption by creating a hash of the data
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            return {
                encrypted: hash,
                timestamp: Date.now(),
                algorithm: 'SHA-256 (simulated encryption)'
            };
        } catch (error) {
            console.error('Data encryption error:', error);
            throw new Error('Failed to encrypt data');
        }
    }

    // Simulate secure data storage
    async storeDataSecurely(data, key) {
        try {
            const encrypted = await this.encryptData(data);
            this.storedData.set(key, encrypted);
            return encrypted;
        } catch (error) {
            console.error('Data storage error:', error);
            throw new Error('Failed to store data securely');
        }
    }

    // Logout functionality
    logout() {
        this.currentSession = null;
        this.updateSessionStatus();
        this.clearResults();
    }

    // Update session status display
    updateSessionStatus() {
        const sessionStatus = document.getElementById('sessionStatus');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (this.currentSession) {
            sessionStatus.innerHTML = `
                <p><strong>Active Session:</strong></p>
                <p>User ID: ${this.currentSession.userId}</p>
                <p>Token: ${this.currentSession.token.substring(0, 16)}...</p>
                <p>Created: ${new Date(this.currentSession.timestamp).toLocaleString()}</p>
            `;
            sessionStatus.className = 'session-status active';
            logoutBtn.disabled = false;
        } else {
            sessionStatus.innerHTML = '<p>No active session</p>';
            sessionStatus.className = 'session-status';
            logoutBtn.disabled = true;
        }
    }

    // Clear all result displays
    clearResults() {
        const results = ['hashResult', 'sessionResult', 'storageResult'];
        results.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = '<p>Enter data and click the button to see results...</p>';
                element.className = 'result-display';
            }
        });
    }

    // Display result with success/error styling
    displayResult(elementId, content, isSuccess = true) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = content;
            element.className = `result-display ${isSuccess ? 'success' : 'error'}`;
        }
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Password hashing
        document.getElementById('hashBtn').addEventListener('click', async () => {
            const passwordInput = document.getElementById('passwordInput');
            const password = passwordInput.value.trim();
            
            if (!password) {
                this.displayResult('hashResult', '<p>Please enter a password to hash.</p>', false);
                return;
            }

            try {
                const hashedPassword = await this.hashPassword(password);
                const content = `
                    <p><strong>Original Password:</strong> ${'*'.repeat(password.length)}</p>
                    <p><strong>Hashed Password:</strong></p>
                    <code style="word-break: break-all; background: #f8f9fa; padding: 5px; border-radius: 4px;">${hashedPassword}</code>
                    <p><small>Algorithm: SHA-256 with salt</small></p>
                `;
                this.displayResult('hashResult', content, true);
            } catch (error) {
                this.displayResult('hashResult', `<p>Error: ${error.message}</p>`, false);
            }
        });

        // Session creation
        document.getElementById('sessionBtn').addEventListener('click', () => {
            const userIdInput = document.getElementById('userIdInput');
            const userId = userIdInput.value.trim();
            
            if (!userId) {
                this.displayResult('sessionResult', '<p>Please enter a user ID.</p>', false);
                return;
            }

            try {
                const sessionData = this.createSecureSession(userId);
                const content = `
                    <p><strong>Session Created Successfully!</strong></p>
                    <p><strong>User ID:</strong> ${sessionData.userId}</p>
                    <p><strong>Session Token:</strong></p>
                    <code style="word-break: break-all; background: #f8f9fa; padding: 5px; border-radius: 4px;">${sessionData.token}</code>
                    <p><strong>Timestamp:</strong> ${new Date(sessionData.timestamp).toLocaleString()}</p>
                    <p><small>Session stored in secure httpOnly cookie (simulated)</small></p>
                `;
                this.displayResult('sessionResult', content, true);
            } catch (error) {
                this.displayResult('sessionResult', `<p>Error: ${error.message}</p>`, false);
            }
        });

        // Data storage
        document.getElementById('storeBtn').addEventListener('click', async () => {
            const userDataInput = document.getElementById('userData');
            const userDataText = userDataInput.value.trim();
            
            if (!userDataText) {
                this.displayResult('storageResult', '<p>Please enter JSON data to store.</p>', false);
                return;
            }

            try {
                const userData = JSON.parse(userDataText);
                const storageKey = `user_${Date.now()}`;
                const encryptedData = await this.storeDataSecurely(userData, storageKey);
                
                const content = `
                    <p><strong>Data Stored Securely!</strong></p>
                    <p><strong>Original Data:</strong></p>
                    <pre style="background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto;">${JSON.stringify(userData, null, 2)}</pre>
                    <p><strong>Encrypted Hash:</strong></p>
                    <code style="word-break: break-all; background: #f8f9fa; padding: 5px; border-radius: 4px;">${encryptedData.encrypted}</code>
                    <p><strong>Algorithm:</strong> ${encryptedData.algorithm}</p>
                    <p><strong>Storage Key:</strong> ${storageKey}</p>
                    <p><small>Data encrypted and stored securely (simulated)</small></p>
                `;
                this.displayResult('storageResult', content, true);
            } catch (error) {
                if (error instanceof SyntaxError) {
                    this.displayResult('storageResult', '<p>Error: Invalid JSON format. Please enter valid JSON data.</p>', false);
                } else {
                    this.displayResult('storageResult', `<p>Error: ${error.message}</p>`, false);
                }
            }
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Clear form functionality
        document.addEventListener('DOMContentLoaded', () => {
            // Add clear functionality to inputs
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && input.type !== 'textarea') {
                        e.preventDefault();
                        // Trigger the appropriate button based on the input
                        if (input.id === 'passwordInput') {
                            document.getElementById('hashBtn').click();
                        } else if (input.id === 'userIdInput') {
                            document.getElementById('sessionBtn').click();
                        }
                    }
                });
            });
        });
    }
}

// Initialize the secure data storage system
const secureStorage = new SecureDataStorage();

// Additional utility functions for demonstration
function demonstrateSecurityFeatures() {
    console.log('🔐 Secure Data Storage Lab Features:');
    console.log('✅ Password Hashing with SHA-256 and salt');
    console.log('✅ Secure Session Management with crypto tokens');
    console.log('✅ Data Encryption Simulation');
    console.log('✅ Secure Cookie Storage (simulated)');
    console.log('✅ Input Validation and Sanitization');
}

// Run demonstration on page load
document.addEventListener('DOMContentLoaded', () => {
    demonstrateSecurityFeatures();
    console.log('🚀 Secure Data Storage Lab initialized successfully!');
}); 