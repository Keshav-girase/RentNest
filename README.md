# RentNest

**RentNest** is an online marketplace inspired by Airbnb, designed to connect travelers with hosts offering accommodations. The platform allows users to securely log in, register, and manage their accommodation listings. It features an integrated interactive map for easy navigation, as well as a review and rating system to help users make informed decisions.

![image](https://github.com/user-attachments/assets/c16eefd1-8383-4f51-ac48-21bebeb54773)

## Live Demo

Check out the live demo of RentNest [here](https://rentnest-1.onrender.com/listings).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication:** Secure registration and login using Passport.js.
- **Listing Management:** Users can create, view, edit, and delete their accommodation listings.
- **Interactive Map:** Integrated map using Leaflet for navigating accommodation locations.
- **Review and Rating System:** Users can leave reviews and rate their stays.
- **Image Uploads:** Images are stored in Cloudinary using Multer.
- **Address Autocomplete:** Autocomplete functionality for address input using the [autocomplete.js library](https://cdn.jsdelivr.net/gh/tomickigrzegorz/autocomplete@1.8.3/dist/js/autocomplete.min.js).
- **Responsive Design:** Ensures accessibility and usability across devices.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js, EJS
- **Database:** MongoDB
- **Authentication:** Passport.js
- **Map Integration:** Leaflet
- **Image Storage:** Cloudinary (via Multer)
- **Address Autocomplete:** [autocomplete.js](https://cdn.jsdelivr.net/gh/tomickigrzegorz/autocomplete@1.8.3/dist/js/autocomplete.min.js)
- **Hosting and Deployment:** Render

## Setup and Installation

To run RentNest locally, follow these steps:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/Keshav-girase/rentnest.git
    cd rentnest
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    SESSION_SECRET=your_session_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

4. **Run the Application:**

    ```bash
    node app.js
    ```

    The application should now be running at `http://localhost:8080`.

## Usage

- **Home Page:** Browse available accommodations.
- **User Authentication:** Register or log in to create and manage your listings.
- **Listing Management:** Add new listings, edit or delete existing ones.
- **Map Navigation:** Use the integrated Leaflet map to find listings by location.
- **Image Uploads:** Upload images for listings, which are stored in Cloudinary.
- **Address Autocomplete:** Use the autocomplete feature to simplify address entry when creating new listings.
- **Reviews and Ratings:** Leave feedback for hosts and view ratings of other users.

## Project Structure

```bash
rentnest/
│
├── controller/            # Route handlers
├── init/                  # Initialization scripts or files
├── models/                # Mongoose models
├── public/                # Static files (CSS, JavaScript, images)
├── routes/                # Express routes
├── utils/                 # Utility functions or modules
├── views/                 # EJS templates
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── app.js                 # Main application file
├── cloudConfig.js         # Cloudinary configuration
├── middleware.js          # Custom middleware functions
├── package-lock.json      # Dependency tree lock file
├── package.json           # Project metadata and dependencies
└── schema.js              # Database schema definitions

```
## Support and Contributions

If you find this project useful, please consider:

- **Starring the Repository:** ⭐ [Star RentNest](https://github.com/Keshav-girase/rentnest) on GitHub to show your support.
- **Contributing:** 🛠️ We welcome contributions! To contribute, please follow the guidelines in the [Contributing](#contributing) section.
- **Committing:** 📝 Submit your improvements and fixes by creating a pull request.

Your feedback and contributions are greatly appreciated!

## Contact Information

Feel free to connect with me through the following channels:

- **Email:** [keshavgirase007@gmail.com](mailto:keshavgirase007@gmail.com)
- **LinkedIn:** [Keshav Girase](https://www.linkedin.com/in/keshav890d)
- **GitHub:** [Keshav Girase](https://github.com/Keshav-girase)


