
/**
 * Design System Compliance Protocol
 * 
 * This file defines the approved design system tokens and compliance rules
 * to ensure all code strictly adheres to our VybeUI design system.
 */

// Approved Design System Color Tokens
export const APPROVED_COLOR_TOKENS = {
  // Base tokens
  background: 'bg-background',
  foreground: 'bg-foreground', 
  card: 'bg-card',
  cardForeground: 'bg-card-foreground',
  popover: 'bg-popover',
  popoverForeground: 'bg-popover-foreground',
  
  // Semantic tokens
  primary: 'bg-primary',
  primaryForeground: 'bg-primary-foreground',
  secondary: 'bg-secondary',
  secondaryForeground: 'bg-secondary-foreground',
  muted: 'bg-muted',
  mutedForeground: 'bg-muted-foreground',
  accent: 'bg-accent',
  accentForeground: 'bg-accent-foreground',
  
  // Status tokens
  destructive: 'bg-destructive',
  destructiveForeground: 'bg-destructive-foreground',
  success: 'bg-success',
  successForeground: 'bg-success-foreground',
  warning: 'bg-warning',
  warningForeground: 'bg-warning-foreground',
  
  // Border tokens
  border: 'border-border',
  input: 'border-input',
  ring: 'ring-ring',
} as const;

export const APPROVED_TEXT_TOKENS = {
  foreground: 'text-foreground',
  mutedForeground: 'text-muted-foreground',
  primary: 'text-primary',
  primaryForeground: 'text-primary-foreground',
  secondary: 'text-secondary',
  secondaryForeground: 'text-secondary-foreground',
  accent: 'text-accent',
  accentForeground: 'text-accent-foreground',
  destructive: 'text-destructive',
  destructiveForeground: 'text-destructive-foreground',
  success: 'text-success',
  warning: 'text-warning',
} as const;

// Prohibited patterns (hardcoded colors)
export const PROHIBITED_PATTERNS = [
  /bg-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone)-\d+/,
  /text-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone)-\d+/,
  /border-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone)-\d+/,
  /ring-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone)-\d+/,
] as const;

/**
 * Validates if a className string contains only approved design system tokens
 */
export function validateDesignSystemCompliance(className: string): {
  isCompliant: boolean;
  violations: string[];
} {
  const violations: string[] = [];
  
  // Check for prohibited hardcoded color patterns
  PROHIBITED_PATTERNS.forEach(pattern => {
    const matches = className.match(pattern);
    if (matches) {
      violations.push(`Hardcoded color detected: ${matches[0]}`);
    }
  });
  
  return {
    isCompliant: violations.length === 0,
    violations
  };
}

/**
 * Compliance check utility for development
 */
export function assertDesignSystemCompliance(className: string, context?: string) {
  const { isCompliant, violations } = validateDesignSystemCompliance(className);
  
  if (!isCompliant) {
    const message = `⚠️ DESIGN SYSTEM COMPLIANCE VIOLATION ${context ? `in ${context}` : ''}:
${violations.join('\n')}

Use approved design system tokens instead. Refer to APPROVED_COLOR_TOKENS and APPROVED_TEXT_TOKENS.`;
    
    console.error(message);
    throw new Error(message);
  }
}

/**
 * Recommended replacements for common hardcoded colors
 */
export const COMPLIANCE_REPLACEMENTS = {
  // Orange replacements (use primary/accent for VybeUI orange)
  'bg-orange-100': 'bg-accent/10',
  'bg-orange-50': 'bg-accent/5',
  'text-orange-600': 'text-accent',
  'text-orange-500': 'text-accent',
  'border-orange-500': 'border-accent',
  
  // Blue replacements (use primary for VybeUI)
  'bg-blue-100': 'bg-primary/10',
  'bg-blue-50': 'bg-primary/5',
  'text-blue-600': 'text-primary',
  'text-blue-500': 'text-primary',
  'border-blue-500': 'border-primary',
  
  // Red replacements
  'bg-red-100': 'bg-destructive/10',
  'text-red-600': 'text-destructive',
  'border-red-500': 'border-destructive',
  
  // Green replacements
  'bg-green-100': 'bg-success/10',
  'text-green-600': 'text-success',
  'border-green-500': 'border-success',
  
  // Yellow replacements
  'bg-yellow-100': 'bg-warning/10',
  'text-yellow-600': 'text-warning',
  'border-yellow-500': 'border-warning',
} as const;
