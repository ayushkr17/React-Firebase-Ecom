MyFirebaseApp

Overview

MyFirebaseApp is a React Native application integrated with Firebase Authentication (using the Firebase Web SDK), Redux for state management, and the Realtime Database for product data storage. The app features login, signup, Google and Facebook social login, as well as a basic e-commerce-like home page that lists products and shows product details.

This project demonstrates an architecture that combines React Native, Redux, and Firebase to create a scalable and maintainable mobile application.


Architecture Choice

The app follows a modular architecture with the following key technologies:

	•	React Native: Used for building the user interface of the app.
	•	Firebase Web SDK: Integrated for authentication (including Google and Facebook login) and using the Realtime Database for data storage.
	•	Redux: Provides a centralized state management solution, making the app more scalable and easier to maintain.
	•	Thunk Middleware: For handling asynchronous Redux actions, particularly for API requests to Firebase (e.g., login/signup and product fetch).

Implementation Details

Firebase Integration

	•	Authentication: Firebase Authentication is implemented using the Firebase Web SDK. This includes both email/password-based authentication as well as Google and Facebook social login.
	•	Realtime Database: Product data is stored in Firebase Realtime Database. The app fetches the products and renders them on the HomeScreen.

Redux Store

Redux is used to manage user authentication state and product data. The app has a Redux store configured with slices for auth and products.

	•	authSlice: Manages user authentication state, including login, signup, and logout.
	•	productSlice: Manages the product list fetched from the Firebase Realtime Database.

Authentication

	•	Login & Signup: Users can sign up and log in using their email and password. The login/signup actions are handled using Firebase Web SDK and Redux Thunk middleware to dispatch authentication actions.
	•	Google and Facebook Login: Social login is implemented using Firebase Web SDK for Google and Facebook login.

Product Listing and Details

	•	Product Fetching: Products are fetched from Firebase Realtime Database and displayed in the HomeScreen.
	•	Product Detail: When a product is clicked, the user is navigated to the ProductDetail screen, where more information about the product is shown.

Dependencies

Here is a list of the core dependencies used in the app:

	•	React Native: Framework for building native apps.
	•	Firebase Web SDK: For integrating Firebase Authentication and Realtime Database.
	•	Redux: State management library.
	•	React-Redux: Official Redux bindings for React.
	•	Redux Toolkit: Simplified Redux setup with built-in middleware for non-serializable data handling.
	•	React Navigation: Used for screen navigation within the app.
	•	Google Sign-In: For Google authentication.
	•	Facebook SDK: For Facebook authentication.
	•	FastImage: For optimized image loading in the HomeScreen.



