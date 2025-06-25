
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
  /bg-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange)-\d+/,
  /text-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange)-\d+/,
  /border-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange)-\d+/,
  /ring-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange)-\d+/,
  /hover:bg-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange)-\d+/,
  /hover:text-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange)-\d+/,
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
 * Comprehensive replacement mappings for hardcoded colors
 */
export const COMPLIANCE_REPLACEMENTS = {
  // Orange replacements (use primary/accent for VybeUI orange)
  'bg-orange-100': 'bg-accent/10',
  'bg-orange-50': 'bg-accent/5',
  'bg-orange-500': 'bg-accent',
  'text-orange-600': 'text-accent',
  'text-orange-500': 'text-accent',
  'text-orange-400': 'text-accent',
  'border-orange-500': 'border-accent',
  'hover:bg-orange-600': 'hover:bg-accent/90',
  
  // Blue replacements (use primary for VybeUI)
  'bg-blue-100': 'bg-primary/10',
  'bg-blue-50': 'bg-primary/5',
  'bg-blue-500': 'bg-primary',
  'bg-blue-600': 'bg-primary',
  'text-blue-600': 'text-primary',
  'text-blue-500': 'text-primary',
  'text-blue-900': 'text-primary',
  'border-blue-500': 'border-primary',
  'border-blue-200': 'border-primary/20',
  'hover:bg-blue-600': 'hover:bg-primary/90',
  
  // Red replacements
  'bg-red-100': 'bg-destructive/10',
  'bg-red-50': 'bg-destructive/5',
  'bg-red-500': 'bg-destructive',
  'text-red-600': 'text-destructive',
  'text-red-500': 'text-destructive',
  'border-red-500': 'border-destructive',
  'hover:bg-red-600': 'hover:bg-destructive/90',
  
  // Green replacements
  'bg-green-100': 'bg-success/10',
  'bg-green-50': 'bg-success/5',
  'bg-green-500': 'bg-success',
  'text-green-600': 'text-success',
  'text-green-500': 'text-success',
  'text-green-900': 'text-success',
  'text-green-800': 'text-success',
  'border-green-500': 'border-success',
  'border-green-200': 'border-success/20',
  'hover:bg-green-600': 'hover:bg-success/90',
  
  // Yellow replacements
  'bg-yellow-100': 'bg-warning/10',
  'bg-yellow-50': 'bg-warning/5',
  'bg-yellow-500': 'bg-warning',
  'text-yellow-600': 'text-warning',
  'text-yellow-500': 'text-warning',
  'text-yellow-400': 'text-warning',
  'border-yellow-500': 'border-warning',
  'hover:bg-yellow-600': 'hover:bg-warning/90',
  
  // Purple replacements
  'bg-purple-100': 'bg-accent/10',
  'bg-purple-50': 'bg-accent/5',
  'bg-purple-500': 'bg-accent',
  'text-purple-600': 'text-accent',
  'text-purple-500': 'text-accent',
  'text-purple-900': 'text-accent',
  'border-purple-500': 'border-accent',
  'border-purple-200': 'border-accent/20',
  'hover:bg-purple-600': 'hover:bg-accent/90',
  
  // Indigo replacements
  'bg-indigo-100': 'bg-primary/10',
  'bg-indigo-50': 'bg-primary/5',
  'bg-indigo-500': 'bg-primary',
  'text-indigo-600': 'text-primary',
  'text-indigo-500': 'text-primary',
  'text-indigo-900': 'text-primary',
  'border-indigo-500': 'border-primary',
  'border-indigo-200': 'border-primary/20',
  'hover:bg-indigo-600': 'hover:bg-primary/90',
  
  // Gray/Slate replacements
  'bg-gray-100': 'bg-muted',
  'bg-gray-50': 'bg-muted/50',
  'bg-gray-500': 'bg-muted',
  'bg-slate-100': 'bg-muted',
  'bg-slate-50': 'bg-muted/50',
  'text-gray-600': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground',
  'text-slate-600': 'text-muted-foreground',
  'border-gray-300': 'border-border',
  'border-slate-300': 'border-border',
  'hover:bg-gray-600': 'hover:bg-muted',
} as const;

/**
 * Auto-replace hardcoded colors with compliant tokens
 */
export function replaceHardcodedColors(classNames: string): string {
  let result = classNames;
  
  Object.entries(COMPLIANCE_REPLACEMENTS).forEach(([hardcoded, compliant]) => {
    result = result.replace(new RegExp(hardcoded, 'g'), compliant);
  });
  
  return result;
}
