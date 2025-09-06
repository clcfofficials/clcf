# Crop Life Care Fertilizers Project Structure

This document provides a non-technical overview of the project structure. Its goal is to help team members, including those in non-technical roles, understand how the different parts of the application fit together.

## `src` - The Heart of the Application

This is where all the code that makes the website work lives. It's organized into several subfolders.

### `src/app` - The Website Pages

This is the most important folder. Each folder inside `src/app` represents a different page or section of the website.

-   **/ (page.tsx)**: The homepage of the website. This is the first thing visitors see.
-   **/about**: The "About Us" page.
-   **/products**: The page that lists all the fertilizer products.
-   **/contact**: The "Contact Us" page with a form and contact details.
-   **/admin**: The section for website administrators.
    -   **/admin/dashboard**: The main admin screen where products can be managed.
    -   **/admin/login**: The login page for administrators.
-   **/api**: This folder contains the code for the application's backend API. It's how the website's frontend communicates with the server and the database to manage products.

### `src/components` - Reusable Building Blocks

This folder contains all the reusable UI components that are used to build the pages. Think of them like LEGO bricks.

-   **`layout`**: Contains the main structure of the website, like the `Header` and `Footer`, which appear on every page.
-   **`ui`**: Holds all the small, general-purpose UI elements like buttons, cards, input fields, and dialog boxes. These are styled and used consistently across the site.
-   **Component Files (e.g., `product-card.tsx`, `contact-form.tsx`)**: These are more specific components built from the smaller `ui` elements. For example, a `product-card` uses a `Card`, `Image`, and `Button` to display a single product.

### `src/lib` - The Toolbox

This folder contains utility files and helper functions.

-   `dbConnect.ts`: Handles the connection to the MongoDB database.
-   `utils.ts`: A small helper for managing component styles.

### `src/models` - Data Blueprints

This folder defines the structure of the data we use in the application.

-   `Product.ts`: This file acts as a blueprint for what a "product" looks like in our database (e.g., it must have a title, description, price, etc.).

## Configuration Files (In the Root Folder)

These files are in the main project directory and control how the application is built and runs.

-   `next.config.ts`: The main configuration file for the Next.js framework.
-   `tailwind.config.ts`: Configures the styling (colors, fonts, etc.) for the entire website using Tailwind CSS.
-   `package.json`: Lists all the third-party libraries and dependencies the project needs to run.
-   `PROJECT_STRUCTURE.md`: This file!

## Summary Flow

1.  A visitor goes to a URL (e.g., `/products`).
2.  Next.js finds the corresponding page in `src/app/products/page.tsx`.
3.  The page component fetches product data by calling the API in `src/app/api/products`.
4.  The API uses the `dbConnect.ts` utility and the `Product.ts` model to get the data from the MongoDB database.
5.  The page then uses components from `src/components` (like `Header`, `Footer`, and `ProductCard`) to render the final HTML that is sent to the user's browser.
