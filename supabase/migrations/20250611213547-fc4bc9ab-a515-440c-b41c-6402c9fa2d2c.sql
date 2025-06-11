-- Delete existing basic components and add comprehensive Zapier-inspired component library
DELETE FROM components;

-- Foundations (keeping existing foundational design tokens)
INSERT INTO components (name, slug, description, category_id, is_experimental, status, sort_order) VALUES
('Color Palette', 'color-palette', 'Complete color system with brand, semantic, and neutral colors', 'e8cefdb1-6802-4a69-a3c4-43a4c177a93f', false, 'stable', 1),
('Typography Scale', 'typography-scale', 'Font families, sizes, and typographic hierarchy', 'e8cefdb1-6802-4a69-a3c4-43a4c177a93f', false, 'stable', 2),
('Spacing System', 'spacing-system', 'Consistent spacing scale and layout primitives', 'e8cefdb1-6802-4a69-a3c4-43a4c177a93f', false, 'stable', 3),
('Elevation & Shadows', 'elevation-shadows', 'Box shadows and elevation system', 'e8cefdb1-6802-4a69-a3c4-43a4c177a93f', false, 'stable', 4),
('Icons', 'icons', 'Icon system with consistent styling and semantic meanings', 'e8cefdb1-6802-4a69-a3c4-43a4c177a93f', false, 'stable', 5),
('Border Radius', 'border-radius', 'Consistent corner radius scale for UI elements', 'e8cefdb1-6802-4a69-a3c4-43a4c177a93f', false, 'stable', 6);

-- Core UI Elements (comprehensive set based on Zapier)
INSERT INTO components (name, slug, description, category_id, is_experimental, status, sort_order) VALUES
('Button', 'button', 'Primary interaction component with multiple variants and states', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 1),
('Input Field', 'input-field', 'Text input with validation states, labels, and helper text', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 2),
('Select Dropdown', 'select-dropdown', 'Dropdown selection component with search and multi-select options', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 3),
('Checkbox', 'checkbox', 'Checkbox input with indeterminate state and custom styling', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 4),
('Radio Button', 'radio-button', 'Radio button group with horizontal and vertical layouts', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 5),
('Switch Toggle', 'switch-toggle', 'Toggle switch for binary state changes', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 6),
('Textarea', 'textarea', 'Multi-line text input with auto-resize capabilities', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 7),
('Badge', 'badge', 'Status indicators and labels with various colors and sizes', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 8),
('Avatar', 'avatar', 'User profile pictures with fallbacks and status indicators', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 9),
('Progress Bar', 'progress-bar', 'Progress indicators for loading states and completion', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 10),
('Slider', 'slider', 'Range input slider with single and dual handles', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 11),
('Loading Spinner', 'loading-spinner', 'Various loading animation styles and sizes', '107906b5-5937-420e-9c6a-258a1aaade91', false, 'stable', 12);

-- Navigation Components
INSERT INTO components (name, slug, description, category_id, is_experimental, status, sort_order) VALUES
('Navigation Menu', 'navigation-menu', 'Primary navigation with dropdowns and active states', '7b386771-21b7-4ad3-b3a1-982411562a94', false, 'stable', 1),
('Breadcrumb', 'breadcrumb', 'Hierarchical navigation trail with separators', '7b386771-21b7-4ad3-b3a1-982411562a94', false, 'stable', 2),
('Pagination', 'pagination', 'Page navigation with numbered pages and controls', '7b386771-21b7-4ad3-b3a1-982411562a94', false, 'stable', 3),
('Search Bar', 'search-bar', 'Search input with autocomplete and filtering', '7b386771-21b7-4ad3-b3a1-982411562a94', false, 'stable', 4),
('Sidebar', 'sidebar', 'Collapsible side navigation with nested menu items', '7b386771-21b7-4ad3-b3a1-982411562a94', false, 'stable', 5),
('Command Menu', 'command-menu', 'Keyboard-accessible command palette for quick actions', '7b386771-21b7-4ad3-b3a1-982411562a94', false, 'stable', 6),
('Tabs', 'tabs', 'Tab navigation with horizontal and vertical orientations', '7b386771-21b7-4ad3-b3a1-982411562a94', false, 'stable', 7),
('Steps/Stepper', 'steps-stepper', 'Multi-step process navigation with progress indication', '7b386771-21b7-4ad3-b3a1-982411562a94', false, 'stable', 8),
('AI Command Palette', 'ai-command-palette', 'Intelligent command interface with AI-powered suggestions', '7b386771-21b7-4ad3-b3a1-982411562a94', true, 'review', 50);

-- Content & Layout Components
INSERT INTO components (name, slug, description, category_id, is_experimental, status, sort_order) VALUES
('Card', 'card', 'Flexible content container with header, body, and footer sections', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 1),
('Data Table', 'data-table', 'Sortable, filterable table with pagination and row selection', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 2),
('Modal Dialog', 'modal-dialog', 'Overlay dialog with backdrop and focus management', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 3),
('Drawer', 'drawer', 'Slide-out panel from screen edges for additional content', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 4),
('Accordion', 'accordion', 'Collapsible content sections with smooth animations', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 5),
('Tooltip', 'tooltip', 'Contextual information overlay triggered by hover or focus', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 6),
('Popover', 'popover', 'Floating content container anchored to trigger elements', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 7),
('List', 'list', 'Structured list component with items, actions, and metadata', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 8),
('Divider', 'divider', 'Visual separator with text labels and various orientations', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 9),
('Container', 'container', 'Layout container with responsive width constraints', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 10),
('Grid System', 'grid-system', 'Responsive grid layout with flexible columns and gaps', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 11),
('Skeleton', 'skeleton', 'Loading placeholder that mimics content structure', '2f899c03-4e53-4e09-81d9-32aba8d602ae', false, 'stable', 12),
('Collaborative Cursor', 'collaborative-cursor', 'Real-time user presence indicators for collaborative editing', '2f899c03-4e53-4e09-81d9-32aba8d602ae', true, 'draft', 50);

-- Forms Components
INSERT INTO components (name, slug, description, category_id, is_experimental, status, sort_order) VALUES
('Form Wrapper', 'form-wrapper', 'Form container with validation state management and submission handling', '4b476680-f677-4963-801e-cb02db013a87', false, 'stable', 1),
('Form Field', 'form-field', 'Standardized form field with label, validation, and helper text', '4b476680-f677-4963-801e-cb02db013a87', false, 'stable', 2),
('Multi-Select', 'multi-select', 'Multi-option selection with tags and search functionality', '4b476680-f677-4963-801e-cb02db013a87', false, 'stable', 3),
('Date Picker', 'date-picker', 'Calendar-based date selection with range support', '4b476680-f677-4963-801e-cb02db013a87', false, 'stable', 4),
('File Upload', 'file-upload', 'Drag-and-drop file upload with progress and preview', '4b476680-f677-4963-801e-cb02db013a87', false, 'stable', 5),
('Checkbox Group', 'checkbox-group', 'Multiple checkbox selection with group validation', '4b476680-f677-4963-801e-cb02db013a87', false, 'stable', 6),
('Radio Group', 'radio-group', 'Single selection from multiple radio options', '4b476680-f677-4963-801e-cb02db013a87', false, 'stable', 7),
('Form Validation', 'form-validation', 'Real-time form validation with custom rules and messages', '4b476680-f677-4963-801e-cb02db013a87', false, 'stable', 8),
('Number Input', 'number-input', 'Numeric input with step controls and range validation', '4b476680-f677-4963-801e-cb02db013a87', false, 'stable', 9),
('Color Picker', 'color-picker', 'Color selection with swatches and RGB/HEX input', '4b476680-f677-4963-801e-cb02db013a87', false, 'stable', 10),
('Smart Form Autosave', 'smart-form-autosave', 'Intelligent form saving with conflict resolution', '4b476680-f677-4963-801e-cb02db013a87', true, 'review', 50);

-- Feedback & Messaging Components  
INSERT INTO components (name, slug, description, category_id, is_experimental, status, sort_order) VALUES
('Alert', 'alert', 'Contextual feedback messages with various severity levels', '834df4e5-0a65-493a-887b-96cab30ebafc', false, 'stable', 1),
('Toast Notification', 'toast-notification', 'Temporary notification that appears and auto-dismisses', '834df4e5-0a65-493a-887b-96cab30ebafc', false, 'stable', 2),
('Status Badge', 'status-badge', 'Real-time status indicators with color coding', '834df4e5-0a65-493a-887b-96cab30ebafc', false, 'stable', 3),
('Empty State', 'empty-state', 'Helpful content when no data is available', '834df4e5-0a65-493a-887b-96cab30ebafc', false, 'stable', 4),
('Error Boundary', 'error-boundary', 'Graceful error handling with recovery options', '834df4e5-0a65-493a-887b-96cab30ebafc', false, 'stable', 5),
('Confirmation Dialog', 'confirmation-dialog', 'User confirmation for destructive or important actions', '834df4e5-0a65-493a-887b-96cab30ebafc', false, 'stable', 6),
('Loading State', 'loading-state', 'Various loading indicators for different contexts', '834df4e5-0a65-493a-887b-96cab30ebafc', false, 'stable', 7),
('Progress Indicator', 'progress-indicator', 'Step-by-step progress for multi-stage processes', '834df4e5-0a65-493a-887b-96cab30ebafc', false, 'stable', 8),
('Banner', 'banner', 'Prominent messaging for important announcements', '834df4e5-0a65-493a-887b-96cab30ebafc', false, 'stable', 9),
('Callout', 'callout', 'Highlighted content blocks for tips and warnings', '834df4e5-0a65-493a-887b-96cab30ebafc', false, 'stable', 10),
('Sentiment Alerts', 'sentiment-alerts', 'AI-powered alerts that adapt based on user context', '834df4e5-0a65-493a-887b-96cab30ebafc', true, 'draft', 50);