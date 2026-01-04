# Focus Island Design

## Overview

This design system is built around **calmness, accuracy, and clarity of interaction**.
The main content is presented as a **white card that feels gently lifted**, while
surrounding areas (header, footer, sidebar) blend into a **cool stone-gray background**
to avoid competing for attention. Information hierarchy is expressed through **color,
spacing, and typography**, rather than borders or visual effects.

### Design Keywords

- Calm
- Minimal
- Clear
- Neutral
- Error-resistant
- Focused
- Floating

---

## Design Principles

### 1. Make Information Hierarchy Visually Clear

- Differences in importance are expressed through **size, color, and placement**
- Borders and decorative separators are not used

---

### 2. Use Color to Indicate State

- Accent colors are used **only** for selected, active, or focused states
- Decorative or redundant color usage is not allowed

---

### 3. Reduce Visual Noise

- No borders or shadows by default
- Whitespace is treated as a functional design element

---

## Color System

### Base Colors

| Token               | Hex       | Usage                     |
| ------------------- | --------- | ------------------------- |
| `color-bg-primary`  | `#E1E3E4` | App background            |
| `color-bg-surface`  | `#FFFFFF` | Primary display card only |
| `color-bg-selected` | `#6B6B6B` | Selected state background |
| `color-bg-disabled` | `#E6E7E6` | Disabled state            |

---

### Accent Colors

| Token                    | Hex       | Usage                     |
| ------------------------ | --------- | ------------------------- |
| `color-accent-primary`   | `#B6522A` | Active value / state      |
| `color-accent-muted`     | `#E3A08A` | Secondary emphasis        |
| `color-accent-indicator` | `#B6522A` | Scroll position indicator |

> Accent colors exist **only** to indicate focus, state, or the current interaction target.

---

### Text Colors

| Token                  | Hex       | Usage                     |
| ---------------------- | --------- | ------------------------- |
| `color-text-primary`   | `#2E2E2E` | Primary text              |
| `color-text-secondary` | `#707070` | Labels and secondary text |
| `color-text-disabled`  | `#BDBDBD` | Disabled text             |
| `color-text-inverse`   | `#FFFFFF` | Text on dark backgrounds  |

---

## Typography

### Font Characteristics

- Sans-serif
- Neutral and highly readable
- Consistent glyph balance across numbers and letters

---

### Type Scale

| Token      | Size    | Usage                            |
| ---------- | ------- | -------------------------------- |
| `font-xxl` | 56-64px | Primary display                  |
| `font-xl`  | 32px    | Selectable values                |
| `font-l`   | 20px    | Units and supporting information |
| `font-m`   | 16px    | Labels                           |
| `font-s`   | 14px    | Secondary labels                 |

---

### Typography Rules

- More important information appears larger
- Labels must remain visually subdued
- Bold weight is used sparingly and intentionally

---

## Layout & Grid

### Layout Philosophy

- Asymmetrical layout
- Left: discrete selection elements
- Right: continuous control elements

---

### Spacing Scale

| Token      | Value |
| ---------- | ----- |
| `space-xs` | 4px   |
| `space-s`  | 8px   |
| `space-m`  | 16px  |
| `space-l`  | 32px  |
| `space-xl` | 48px  |

- Vertical rhythm is prioritized
- Avoid visual crowding

---

## Primary Display Card

### Overview

The area that presents the **most important information on the screen**.
In this design system, **white background cards are used exclusively for this area**.

---

### Visual Rules

- Background: `color-bg-surface` (white)
- Large corner radius (16px or more)
- No borders or shadows
- Generous surrounding whitespace

---

### Design Intent

- Establish a clear visual focal point
- Differentiate this area through space and scale, not color variety
- Prevent overuse of white surfaces

---

## Components

### Selection Card

**Description**
A component used to select from discrete options.

**States**

- Default: no background (blends with app background)
- Selected: `color-bg-selected`
- Disabled: `color-bg-disabled`

**Rules**

- No borders
- Corner radius: 12-16px
- State is communicated via background fill

---

### Scroll Selector

**Description**
A control for adjusting continuous values.

**Visual Rules**

- Thin, neutral track
- Single accent marker
- Minimal numeric display

---

### Status Label (Pill)

**Description**
Displays the current mode or system state.

**Style**

- Background: `color-accent-primary`
- Text: `color-text-inverse`
- Fully rounded pill shape

**Rule**

- Only one status label may be visible at a time

---

## Interaction Guidelines

### Feedback Priority

1. Color change
2. Position change
3. Animation (minimal)

### Motion

- Easing: ease-in-out
- Duration: 120-180ms
- No exaggerated or playful motion

---

## Localization

- Layout must remain stable across languages
- No dependency on label length
- Element sizing must not shift based on text

---

## Accessibility

- WCAG AA compliant
- Do not rely on color alone to convey meaning
- All states must remain distinguishable in grayscale

---

## Summary

This design system aims to clearly communicate state and interaction targets
within a calm, restrained visual language.

- Minimal decoration
- Intentional color usage
- White surfaces limited to the primary display area
