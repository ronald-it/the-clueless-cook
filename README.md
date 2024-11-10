# The Clueless Cook

[Live Demo](https://ronald-it.github.io/the-clueless-cook/)

**The Clueless Cook** - A responsive web app that allows users to explore recipes and manage their nutritional intake through a calorie calculator. Both the recipe search and calorie calculator are exclusively accessible to logged-in users, making it a personalized experience.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Known Limitations](#known-limitations)
- [License](#license)

## Description

This project started as the final assignment for my frontend development bootcamp, initially created with a desktop-only design. Later, I enhanced the app for professional use as a portfolio project, commissioning mobile and tablet designs, and rebuilding it with Next.js and Tailwind CSS to ensure responsiveness on all screen sizes.

**The Clueless Cook** provides a seamless and engaging experience for users interested in recipes and tracking their nutritional intake. The app has three main sections:

1. **Homepage**: Shows a carousel of three featured recipes (displayed as a slider on mobile/tablet) and a recipe search section with filters. After performing a search, users see up to 18 recipe cards displayed based on their input. Clicking on a recipe card takes the user to a detailed recipe page.
2. **Recipe Details**: Displays information about the selected recipe, including the title, image, placeholder text for a description (as descriptions are not available in the API), nutrition details, ingredients list, and health labels.
3. **Calorie Calculator**: Users can search for food products, specify serving sizes, and add items to a cumulative table showing total calories, fat, and carbs. This feature, like the recipe search, is only accessible to logged-in users.

## Features

- **User Authentication**: Users can create an account, log in, and access exclusive features like recipe search and the calorie calculator.
- **Recipe Search & Details**: Logged-in users can search for recipes by keyword or filter options and view detailed information on the recipe page, including:
  - Recipe title
  - Placeholder description (as the API does not provide descriptions)
  - Recipe image
  - Nutrition details
  - Ingredients list
  - Health labels
- **Calorie Calculator**: Logged-in users can search for food products, specify serving sizes, and add items to a cumulative table showing total calories, fat, and carbs.
- **Responsive Design**: Primarily built with Tailwind CSS (with limited use of SCSS and inline styling where necessary) to ensure a smooth user experience across mobile, tablet, and desktop.
- **Custom Components**: Reusable components like `RecipeCard` to improve modularity and maintainability of the code.

## Technologies Used

- **Next.js**: Framework for building the frontend
- **Tailwind CSS**: For responsive styling
- **Axios**: For handling API calls
- **Edamam API**: Provides food product and recipe data

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ronald-it/the-clueless-cook.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**: While the repository includes an Edamam API key for convenience in the live demo on GitHub Pages, you should register for your own API key if deploying elsewhere. Set `API_ID` and `API_KEY` as environment variables in a `.env` file.

4. **Run the development server**:
   ```bash
   npx next dev
   ```

The app should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- **Homepage**: The homepage provides a hero section with a CTA, a recipe carousel (or slider on mobile), and a recipe search section with filtering options.
  - Log in to access the recipe search.
  - Perform a recipe search using the input field and select filters.
  - View up to 18 recipe cards in the search results. Click on any card to access the detailed recipe page.

- **Recipe Page**: After selecting a recipe from the search results on the homepage, view detailed information for that specific recipe, including:
  - Recipe title
  - Placeholder text for a description
  - Recipe image
  - Ingredients
  - Nutrition information
  - Health labels

- **Calorie Calculator**:
  - Accessible only for logged-in users on a dedicated page.
  - Search for a food product by name or barcode.
  - Specify serving size, add it to the list, and view cumulative nutritional totals, including calories, fat, and carbs.

- **Login & Registration**:
  - Use the registration page to create an account.
  - Log in on the login page to access exclusive features, such as the recipe search and calorie calculator.

## Known Limitations

- **API Rate Limit**: The Edamam API has a rate limit, which may cause the search feature to become temporarily unavailable if too many requests are made in a short time.

## License

This project is licensed under the MIT License.