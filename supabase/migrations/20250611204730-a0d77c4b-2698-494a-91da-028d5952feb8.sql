-- First, move existing experimental components to appropriate categories
UPDATE public.components 
SET category_id = (SELECT id FROM public.categories WHERE slug = 'navigation'), is_experimental = true, sort_order = 100
WHERE name = 'AI Command Palette' AND category_id = (SELECT id FROM public.categories WHERE slug = 'experimental');

UPDATE public.components 
SET category_id = (SELECT id FROM public.categories WHERE slug = 'content-layout'), is_experimental = true, sort_order = 101
WHERE name = 'Collaborative Cursor' AND category_id = (SELECT id FROM public.categories WHERE slug = 'experimental');

UPDATE public.components 
SET category_id = (SELECT id FROM public.categories WHERE slug = 'forms'), is_experimental = true, sort_order = 102
WHERE name = 'Smart Form Autosave' AND category_id = (SELECT id FROM public.categories WHERE slug = 'experimental');

-- Now remove the experimental category
DELETE FROM public.categories WHERE slug = 'experimental';

-- Add more experimental components to each category
INSERT INTO public.components (name, slug, description, category_id, status, is_experimental, sort_order) VALUES

-- Foundations experimental components
('Dynamic Color Themes', 'dynamic-color-themes', 'AI-powered color palette generation based on content', (SELECT id FROM public.categories WHERE slug = 'foundations'), 'draft', true, 200),
('Adaptive Typography', 'adaptive-typography', 'Typography that adjusts based on reading context and user preferences', (SELECT id FROM public.categories WHERE slug = 'foundations'), 'draft', true, 201),
('Contextual Spacing', 'contextual-spacing', 'Smart spacing that adapts to content density and viewport', (SELECT id FROM public.categories WHERE slug = 'foundations'), 'draft', true, 202),

-- Core UI experimental components  
('AI Smart Button', 'ai-smart-button', 'Button that adapts its text and style based on user context', (SELECT id FROM public.categories WHERE slug = 'core-ui'), 'draft', true, 200),
('Predictive Input', 'predictive-input', 'Input field with ML-powered autocompletion and validation', (SELECT id FROM public.categories WHERE slug = 'core-ui'), 'draft', true, 201),
('Emotion-Responsive Badge', 'emotion-responsive-badge', 'Badge that changes color based on sentiment analysis', (SELECT id FROM public.categories WHERE slug = 'core-ui'), 'draft', true, 202),
('Voice-Activated Toggle', 'voice-activated-toggle', 'Toggle component that responds to voice commands', (SELECT id FROM public.categories WHERE slug = 'core-ui'), 'draft', true, 203),

-- Navigation experimental components
('Predictive Navigation', 'predictive-navigation', 'Navigation that suggests routes based on user behavior', (SELECT id FROM public.categories WHERE slug = 'navigation'), 'draft', true, 103),
('Gesture-Based Menu', 'gesture-based-menu', 'Menu system controlled by touch gestures and swipes', (SELECT id FROM public.categories WHERE slug = 'navigation'), 'draft', true, 104),

-- Content & Layout experimental components
('Smart Content Cards', 'smart-content-cards', 'Cards that reorganize content based on user engagement', (SELECT id FROM public.categories WHERE slug = 'content-layout'), 'draft', true, 200),
('Adaptive Modals', 'adaptive-modals', 'Modals that resize and reposition based on content and context', (SELECT id FROM public.categories WHERE slug = 'content-layout'), 'draft', true, 202),

-- Forms experimental components
('AI Form Validation', 'ai-form-validation', 'Machine learning powered form validation and suggestions', (SELECT id FROM public.categories WHERE slug = 'forms'), 'draft', true, 200),
('Voice Form Input', 'voice-form-input', 'Form fields that accept voice input with real-time transcription', (SELECT id FROM public.categories WHERE slug = 'forms'), 'draft', true, 201),

-- Feedback experimental components
('Sentiment Alerts', 'sentiment-alerts', 'Alerts that adapt tone and urgency based on sentiment analysis', (SELECT id FROM public.categories WHERE slug = 'feedback'), 'draft', true, 200),
('Predictive Status', 'predictive-status', 'Status indicators that predict and show likely future states', (SELECT id FROM public.categories WHERE slug = 'feedback'), 'draft', true, 201),
('Emotional Loading States', 'emotional-loading-states', 'Loading animations that adapt to user stress levels', (SELECT id FROM public.categories WHERE slug = 'feedback'), 'draft', true, 202);