# Fonoon Kindergarten (Bootstrap Landing Page)

Responsive one-page website for **Fonoon Kindergarten**, built with **Bootstrap 5**, custom CSS, and a **Contact Us** form powered by **EmailJS**.

## Preview / Sections

- **Navbar** (sticky) with anchor links
- **Landing (Hero)**
- **Why Fonoon?** cards
- **Gallery**
- **Our Goal + Fun Facts**
- **Contact form** (EmailJS)
- **Footer** with subscription input + social icons

## Tech Stack

- HTML5
- CSS3 + Bootstrap 5
- JavaScript (vanilla)
- Font Awesome
- Google Fonts
- EmailJS (for form submission)

## Project Structure

```text
Fonoon-Bootstrap/
├─ index.html
├─ css/
│  ├─ bootstrap.min.css
│  └─ fonoon.css
├─ js/
│  ├─ bootstrap.bundle.min.js
│  ├─ all.min.js
│  └─ script.js
└─ imgs/
   └─ (site images used by the landing + gallery)
```

## Run Locally

You can open `index.html` directly, but the best experience is using a local server.

### Option A: VS Code / Cursor Live Server

- Install **Live Server**
- Right-click `index.html` → **Open with Live Server**

### Option B: Python (quick local server)

From the project root:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

## Contact Form (EmailJS) Setup

This project uses EmailJS to send form messages.

- **HTML**: `index.html` includes the EmailJS browser SDK.
- **JS**: `js/script.js` initializes EmailJS and sends messages on form submit.

### 1) Create EmailJS credentials

In EmailJS, create:

- a **service**
- a **template**
- a **public key**

### 2) Configure keys in the project

Update the constants in `js/script.js`:

- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`

Also update (or remove) the inline init in `index.html`:

- `emailjs.init("YOUR_PUBLIC_KEY");`

> Tip: you only need to initialize EmailJS **once** (either in `index.html` or in `js/script.js`). Keeping it in `js/script.js` is usually cleaner.

### Important security note

EmailJS **public keys are meant to be used in the browser**, but you should still avoid publishing real keys in public repos when possible.

If you plan to make this repository public:

- Replace keys with placeholders before pushing
- Consider using EmailJS protections (domain restrictions, reCAPTCHA, etc.)

## Credits

- Design & implementation: **Hagar Habib** (see footer copyright)
- Icons: Font Awesome
- Fonts: Google Fonts

