# slype
A framework for building in-browser data-based presentations.

## Motivation
The web browser is a dedicated communication tool. With the rise of powerful data-driven Javascript libraries, the web browser is also a tool for data visualization.

## Current functionality
- Slide navigation using arrow keys or space-bar
- Hide slides by pressing B on the keyboard
- Smooth transitions
- Title slide layout
- Single-column text-only layout

## To come
- A multitude of layouts
- Within-slide transitions
- "Sticky" elements that remain between slide transitions
- Data-aware chart embedding and animation
- Slide navigation by keying number
- Export to PDF

## Classes
`section.slide` Identify a section as a slide
`section.current-slide` Identify the starting slide
`section.next-slide` Identify the second slide
`section.title-slide` Title slide layout
`section.text-slide` Text-only single-column layout