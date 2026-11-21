# Mobile Registration Screen

A responsive, mobile-first registration screen built with HTML5, CSS3, and vanilla JavaScript as part of the VINIX Mobile App Development tasks.

## Features
- **Responsive Mobile Layout:** Mobile-first card layout (`max-width: 414px`) with touch-friendly inputs and modern styling.
- **Form Validation:** Validates full name, email format, minimum password length, password confirmation match, and terms agreement with inline error messages.
- **Password Visibility Toggles:** Show or hide both the password and confirm password fields.
- **Local Storage Persistence:** Saves registered user details and the active user session in browser `localStorage`.

## Project Structure
- `index.html` — Registration form markup, toggles, and status banner
- `style.css` — Mobile-first layout, spacing, and input/button styling
- `app.js` — Field validation, visibility toggles, and `localStorage` logic
