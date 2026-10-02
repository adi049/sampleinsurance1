# SAMPLE WEBSITE

A complete responsive frontend prototype for a modern insurance comparison and service platform.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Routes

- `/` Home
- `/insurance` Insurance catalogue
- `/motor-insurance` Motor quote journey and illustrative comparison
- `/health-insurance` Health quote journey
- `/claims` Claims and renewals
- `/about` About and how it works
- `/contact` Contact journey
- `/privacy` Privacy Policy placeholder
- `/terms` Terms & Conditions placeholder

## Project structure

```text
public/
  favicon.svg
src/
  components/
    Brand.jsx
    FAQ.jsx
    FloatingContact.jsx
    Footer.jsx
    InsuranceCard.jsx
    LegalPage.jsx
    LoginModal.jsx
    Navbar.jsx
    PageHero.jsx
    QuoteBox.jsx
    ScrollToTop.jsx
    SectionHeading.jsx
  data/
    insuranceData.js
  pages/
    About.jsx
    Claims.jsx
    Contact.jsx
    HealthInsurance.jsx
    Home.jsx
    Insurance.jsx
    MotorInsurance.jsx
    NotFound.jsx
    Privacy.jsx
    Terms.jsx
  App.jsx
  main.jsx
  styles.css
  redesign.css
index.html
package.json
vite.config.js
```

## Image assets

The motor, health and insurance guidance photographs are locally stored, optimized Pexels assets selected for relevant product context. Their source photo IDs are 29217852, 5407237 and 7734574.

## Prototype scope

All quote, OTP, claim, renewal and enquiry states are frontend demonstrations. The project does not call insurer APIs, send OTPs, process payments, issue policies, submit claims or store customer information.
