# Lab 4: Secure Data Storage
<img width="1173" height="890" alt="{EC7E0F37-2860-4FB8-88E1-2792F7687000}" src="https://github.com/user-attachments/assets/5ae37e31-5f4c-41eb-b357-909b86a0e22f" />

## Overview
This lab demonstrates secure data storage practices including password hashing, session management, and data encryption. It provides a hands-on interface to test various security implementations.

## Features

### 🔐 Secure Password Hashing
- **Algorithm**: SHA-256 with salt
- **Implementation**: Uses Web Crypto API for cryptographic operations
- **Salt**: Hardcoded salt for demonstration (in production, use unique salts per user)
- **Purpose**: Demonstrates how passwords should be stored securely

### 👤 Secure Session Management
- **Token Generation**: Cryptographically secure random tokens using `crypto.getRandomValues()`
- **Session Data**: Includes user ID, timestamp, and secure token
- **Storage**: Simulates httpOnly cookie storage for session data
- **Security**: Tokens are 64-character hexadecimal strings

### 💾 Data Encryption Simulation
- **Encryption**: SHA-256 hashing simulation for data encryption
- **Storage**: Secure key-value storage with encrypted data
- **Purpose**: Demonstrates how sensitive data should be encrypted before storage

## File Structure
```
Lab 4 Secure Data Storage/
├── index.html          # Main HTML interface
├── styles.css          # Modern, responsive styling
├── script.js           # Secure data storage implementation
└── README.md           # This documentation
```

## How to Use

### 1. Password Hashing Test
1. Enter a password in the "รหัสผ่านที่ต้องการ hash" field
2. Click "🔐 Hash Password"
3. View the hashed result and algorithm information

### 2. Session Management Test
1. Enter a user ID in the "User ID" field
2. Click "📋 Create Session"
3. View the generated session data including token and timestamp
4. Monitor session status in the "Current Session Status" section

### 3. Data Storage Simulation
1. Enter JSON data in the "User Data (JSON)" field
2. Click "💾 Store Data Securely"
3. View the encrypted hash and storage information

### 4. Session Management
- **Logout**: Click "🚪 Logout" to clear the current session
- **Status**: Monitor active session information in real-time

## Security Features Demonstrated

### Password Security
- ✅ SHA-256 hashing algorithm
- ✅ Salt implementation (simplified)
- ✅ Secure password storage practices

### Session Security
- ✅ Cryptographically secure token generation
- ✅ Session timestamp tracking
- ✅ Secure cookie simulation (httpOnly)
- ✅ Session state management

### Data Security
- ✅ Data encryption simulation
- ✅ Secure storage key generation
- ✅ Input validation and sanitization
- ✅ Error handling and user feedback

## Technical Implementation

### Password Hashing
```javascript
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'salt123');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

### Session Management
```javascript
function createSecureSession(userId) {
    const sessionData = {
        userId: userId,
        timestamp: Date.now(),
        token: generateSecureToken()
    };
    return sessionData;
}
```

### Token Generation
```javascript
function generateSecureToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
```

## Browser Compatibility
- Modern browsers with Web Crypto API support
- Chrome 37+, Firefox 34+, Safari 11+, Edge 12+
- Requires HTTPS for Web Crypto API in production

## Security Notes
⚠️ **Important**: This is a demonstration lab. In production environments:
- Use unique salts per user
- Implement proper key management
- Use established encryption libraries
- Follow security best practices
- Implement proper session timeout
- Use HTTPS in production

## Learning Objectives
1. Understand password hashing principles
2. Learn session management best practices
3. Explore data encryption concepts
4. Practice secure data storage techniques
5. Implement input validation and error handling

## Next Steps
- Implement proper salt generation
- Add session timeout functionality
- Integrate with backend storage
- Add user authentication flow

- Implement proper error logging 
