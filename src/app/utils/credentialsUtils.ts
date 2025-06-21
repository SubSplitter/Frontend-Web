// utils/credentialUtils.ts

export interface PoolCredentials {
  email?: string;
  password?: string;
  username?: string;
  [key: string]: string | undefined;
}

/**
 * Safely parse credentials from encrypted credentials string
 */
export function parseCredentials(encryptedCredentials: string): PoolCredentials | null {
  try {
    // Assuming credentials are stored as JSON string
    const parsed = JSON.parse(encryptedCredentials);
    
    // Validate that it's an object
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as PoolCredentials;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to parse credentials:', error);
    return null;
  }
}

/**
 * Format credential key for display (capitalize first letter, handle camelCase)
 */
export function formatCredentialKey(key: string): string {
  // Convert camelCase to space-separated words
  const formatted = key.replace(/([A-Z])/g, ' $1').trim();
  
  // Capitalize first letter
  return formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
}

/**
 * Check if a credential key represents a password field
 */
export function isPasswordField(key: string): boolean {
  const passwordKeys = ['password', 'pass', 'pwd', 'secret', 'key'];
  return passwordKeys.some(passwordKey => 
    key.toLowerCase().includes(passwordKey)
  );
}

/**
 * Sanitize credentials for logging (replace sensitive values with asterisks)
 */
export function sanitizeCredentialsForLogging(credentials: PoolCredentials): Record<string, string> {
  const sanitized: Record<string, string> = {};
  
  Object.entries(credentials).forEach(([key, value]) => {
    if (value) {
      sanitized[key] = isPasswordField(key) ? '***' : value;
    }
  });
  
  return sanitized;
}