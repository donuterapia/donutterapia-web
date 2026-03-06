# Donutterapia

A delicious donut shop website built with Jekyll and Tailwind CSS.

## About

Donutterapia is a modern, responsive website for a donut shop featuring menus, store locations, franchise opportunities, and more. The site showcases products, allows subscriptions, and provides comprehensive business information.

## Features

- 🍩 Product showcase and menu
- 📍 Store locations with details
- 🤝 Franchise information and inquiry
- 📧 Contact and newsletter subscription
- 🎁 Special promotions (e.g., San Valentín collection)
- 📱 Fully responsive design
- 🚀 Fast, static site generation with Jekyll
- 🎨 Modern styling with Tailwind CSS

## Tech Stack

- **Static Site Generator:** Jekyll
- **CSS Framework:** Tailwind CSS
- **CSS Preprocessing:** Sass/SCSS
- **Build Tools:** PostCSS
- **Package Manager:** npm/Bundler

## Getting Started

### Prerequisites

- Ruby 3.0+
- Node.js (for Tailwind CSS)
- Bundler

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd donutterapia-web
```

2. Install Ruby dependencies:
```bash
bundle install
```

3. Install Node dependencies:
```bash
npm install
```

### Development

Start the Jekyll development server:
```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`

To watch and rebuild Tailwind CSS:
```bash
npm run watch
```

## Project Structure

```
├── _includes/          # Reusable HTML partials
│   ├── header.html
│   ├── footer.html
│   └── head.html
├── _layouts/           # Page templates
│   ├── default.html
│   ├── page.html
│   └── post.html
├── _pages/             # Main pages
│   ├── about.html
│   ├── products.html
│   ├── stores.html
│   └── ...
├── _posts/             # Blog posts
├── _sass/              # SCSS styles
├── assets/             # Images, CSS, JS
├── _config.yml         # Jekyll configuration
└── tailwind.config.js  # Tailwind configuration
```

## Building for Production

Build the static site:
```bash
bundle exec jekyll build
```

Output will be in the `_site/` directory.

## Pages

- **Home** - Main landing page
- **About** - Company information
- **Menu/Products** - Product showcase
- **Stores** - Location finder
- **Franchise** - Franchise opportunities
- **Contact** - Get in touch
- **Suscripción** - Newsletter subscription
- **Special Collections** - Seasonal offers

## Configuration

Key configuration files:
- `_config.yml` - Jekyll settings
- `tailwind.config.js` - Tailwind customization
- `postcss.config.js` - PostCSS plugins
- `package.json` - npm dependencies

## License

[Add your license here]

## Contact

For inquiries about Donutterapia, visit the website or use the contact form.
