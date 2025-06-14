import { z } from 'zod';

/**
 * Email validation schema with security constraints
 */
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(1, 'Email is required')
  .max(254, 'Email is too long') // RFC 5321 limit
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format');

/**
 * Brand name validation schema
 */
export const brandNameSchema = z
  .string()
  .min(1, 'Brand name is required')
  .max(100, 'Brand name is too long')
  .regex(/^[a-zA-Z0-9\s\-_&.]+$/, 'Brand name contains invalid characters');

/**
 * URL validation schema for logo URLs
 */
export const logoUrlSchema = z
  .string()
  .url('Invalid URL format')
  .refine((url) => {
    try {
      const parsedUrl = new URL(url);
      // Only allow https URLs for security
      return parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  }, 'Only HTTPS URLs are allowed')
  .refine((url) => {
    // Check for common image file extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];
    return imageExtensions.some(ext => url.toLowerCase().includes(ext));
  }, 'URL must point to an image file');

/**
 * Version name validation schema
 */
export const versionNameSchema = z
  .string()
  .min(1, 'Version name is required')
  .max(50, 'Version name is too long')
  .regex(/^[a-zA-Z0-9\s\-_.]+$/, 'Version name contains invalid characters');

/**
 * Font name validation schema
 */
export const fontNameSchema = z
  .string()
  .min(1, 'Font name is required')
  .max(100, 'Font name is too long')
  .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Font name contains invalid characters');

/**
 * Component name validation schema
 */
export const componentNameSchema = z
  .string()
  .min(1, 'Component name is required')
  .max(100, 'Component name is too long')
  .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Component name contains invalid characters');

/**
 * Sanitized HTML content validation
 */
export const htmlContentSchema = z
  .string()
  .max(10000, 'Content is too long')
  .refine((content) => {
    // Basic check for potentially dangerous content
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i, // onclick, onload, etc.
      /<iframe/i,
      /<object/i,
      /<embed/i,
    ];
    
    return !dangerousPatterns.some(pattern => pattern.test(content));
  }, 'Content contains potentially dangerous elements');

/**
 * File upload validation schemas
 */
export const fileUploadSchema = z.object({
  size: z.number().max(5 * 1024 * 1024, 'File size must be less than 5MB'),
  type: z.string().refine((type) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/gif',
      'image/svg+xml',
      'image/webp'
    ];
    return allowedTypes.includes(type);
  }, 'Invalid file type. Only images are allowed'),
});

/**
 * Validate email for invitations
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  try {
    emailSchema.parse(email);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: 'Invalid email' };
  }
}

/**
 * Validate brand name
 */
export function validateBrandName(brandName: string): { isValid: boolean; error?: string } {
  try {
    brandNameSchema.parse(brandName);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: 'Invalid brand name' };
  }
}

/**
 * Validate logo URL
 */
export function validateLogoUrl(url: string): { isValid: boolean; error?: string } {
  try {
    logoUrlSchema.parse(url);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: 'Invalid logo URL' };
  }
}