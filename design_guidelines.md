# Arogya: Your Fitness Partner - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from leading health and fitness apps like MyFitnessPal, Fitbit, and Headspace, with a focus on wellness-oriented design that promotes motivation and engagement.

## Core Design Elements

### A. Color Palette
**Primary Colors (Health & Vitality Theme)**
- Primary: 142 69% 58% (vibrant green for health/growth)
- Secondary: 200 89% 70% (calming blue for trust/stability)
- Dark mode primary: 142 45% 65%
- Dark mode secondary: 200 70% 75%

**Supporting Colors**
- Success: 120 60% 50% (progress indicators)
- Warning: 45 90% 60% (attention/goals)
- Error: 0 70% 60% (alerts)
- Neutral grays: 220 15% range from 15% to 85%

### B. Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern readability
- **Accent Font**: Poppins (Google Fonts) - friendly, approachable headers
- **Scale**: text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px), text-2xl (24px), text-3xl (30px)

### C. Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, 8, 12, 16
- Micro spacing: p-2, m-2
- Standard spacing: p-4, m-4, gap-6
- Section spacing: p-8, m-8, gap-12
- Large spacing: p-16, m-16

### D. Component Library

**Authentication Pages (Login/Register)**
- Split-screen layout with health-themed gradient background
- Glass-morphism cards with subtle blur effects
- Animated health icons and progress indicators
- Social login options with health app integrations
- Smooth micro-interactions for form validation

**Navigation**
- Bottom tab navigation for mobile with health icons
- Sidebar navigation for desktop with collapsible sections
- Floating action button for quick habit logging

**Dashboard Components**
- Card-based layout with subtle shadows and rounded corners
- Progress circles and health metric visualizations
- Today's summary widgets with quick actions
- Achievement badges and streak counters

**Forms & Inputs**
- Rounded input fields with health-themed icons
- Slider components for tracking scales (1-10 wellness ratings)
- Multi-step forms with progress indicators
- Smart auto-suggestions for meals and activities

**Chat Interface**
- Bubble-style chat with AI assistant avatar
- Health tips cards within chat flow
- Quick action buttons for common health queries
- Typing indicators and smooth message animations

### E. Animations
**Minimal & Purposeful**
- Gentle fade-in transitions for page loads
- Subtle hover states on interactive elements
- Progress animations for goal completion
- Success celebration micro-animations for habit completion

## Images
**Hero Section**: Large wellness-themed illustration showing diverse people engaging in healthy activities (exercising, meditating, eating healthy meals) with soft gradients in brand colors

**Dashboard Icons**: Health-focused iconography using Heroicons - activity, heart, nutrition, sleep, meditation symbols

**Empty States**: Friendly illustrations encouraging users to start their health journey

**Background Elements**: Subtle geometric patterns in light opacity, organic shapes suggesting movement and vitality

## Key Design Principles
1. **Wellness-First**: Every design decision should promote positive health behaviors
2. **Accessible Motivation**: Clear progress indicators and achievement systems
3. **Calm Confidence**: Soothing colors and gentle interactions reduce health anxiety
4. **Data Clarity**: Health metrics presented clearly without overwhelming users
5. **Personal Journey**: Customizable interface reflecting individual health goals

## Special Considerations
- Consistent dark mode across all components including chat interface
- Large touch targets for mobile health logging
- High contrast ratios for accessibility in all lighting conditions
- Progressive disclosure for complex health data entry