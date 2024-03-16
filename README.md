**Project Report: Restaurant Listing Web Application**

**1. Introduction:**

The goal of this project is to design and implement a web application for a restaurant listing platform. The application allows users to discover various restaurants, view details such as menus, images, addresses, and reviews, and interact with businesses by booking tables or placing orders. The project involves user authentication, CRUD operations for business listings, and review management.

**2. Database Design:**

**Entities:**
- **User**: Represents users of the platform. Stores information such as username, email, password, and role.
- **Business**: Represents individual restaurants or businesses listed on the platform. Contains details like name, phone, address, and images.
- **Review**: Represents user reviews for businesses. Contains fields for rating, comment, and references to the user and business it relates to.

**Database Schema:**

Database diagram for the restaurant listing web application:

```
  +------------+        +------------+        +------------+
  |   User     |        |  Business  |        |   Review   |
  +------------+        +------------+        +------------+
  | _id        |        | _id        |        | _id        |
  | username   |1    n  | name       |1    n  | rating     |
  | email      |--------| phone      |--------| comment    |
  | password   |        | address    |        | user       |
  | role       |        | images     |        | business   |
  | businessId |---n 1  | owner      |---n 1  | createdAt  |
  +------------+        +------------+        | updatedAt  |
                                               | ownerResponse |
                                               +------------+
```


 How you can represent the tables for each schema in the MongoDB database:

1. **User Schema:**
   
   ```
   +---------------------------------+
   |           User                  |
   +---------------------------------+
   | _id         | ObjectId          |
   | username    | String            |
   | email       | String            |
   | password    | String (hashed)   |
   | role        | String            |
   | businessId  | ObjectId (ref: Business) |
   +---------------------------------+
   ```
   
2. **Business Schema:**
   
   ```
   +---------------------------------+
   |           Business              |
   +---------------------------------+
   | _id         | ObjectId          |
   | name        | String            |
   | phone       | String            |
   | address     | Object            |
   | images      | Array of Strings  |
   | owner       | ObjectId (ref: User) |
   +---------------------------------+
   ```

3. **Review Schema:**
   
   ```
   +---------------------------------+
   |           Review                |
   +---------------------------------+
   | _id         | ObjectId          |
   | rating      | Number            |
   | comment     | String            |
   | user        | ObjectId (ref: User) |
   | business    | ObjectId (ref: Business) |
   | createdAt   | Date              |
   | updatedAt   | Date              |
   | ownerResponse | String          |
   +---------------------------------+
   ```


**Explanation:**

- **User Table:** Stores information about users who interact with the platform. Each user can be associated with zero or one business (if they are a business owner).
- **Business Table:** Contains details about individual businesses listed on the platform, such as name, phone number, address, and images. Each business is associated with one owner (user).
- **Review Table:** Stores user reviews for businesses. Each review contains a rating, comment, and references to the user who created it and the business it relates to.

In the diagram:

- `1` indicates a one-to-many relationship.
- `n` indicates a many-to-one relationship.

This database schema allows for efficient storage and retrieval of data and establishes relationships between entities to maintain data integrity.

**Data Flow Diagram:**
A data flow diagram (DFD) illustrates the flow of data within a system, showing how information moves between processes, external entities, and data stores. For the restaurant listing web application, here's a simplified data flow diagram:

```
                  +-----------------+
                  |    User Input   |
                  +--------+--------+
                           |
                           v
          +--------------------------+
          |    Authentication &     |
          |     Authorization       |
          +--------------------------+
                           |
                           v
                  +-----------------+
                  |    Business     |
                  |   Management    |
                  +--------+--------+
                           |
                           v
                  +-----------------+
                  |     Review      |
                  |   Management    |
                  +--------+--------+
                           |
                           v
                  +-----------------+
                  |    Presentation |
                  |      Layer      |
                  +-----------------+
```

**Explanation:**

1. **User Input:** External entities, such as users interacting with the application through the UI, provide input data.
2. **Authentication & Authorization:** Processes responsible for authenticating users and determining their access rights based on their role (user, business owner, admin).
3. **Business Management:** Processes for creating, updating, retrieving, and deleting business listings. This includes actions like adding new businesses, updating business details, and deleting listings.
4. **Review Management:** Processes for managing user reviews. This includes adding new reviews, viewing existing reviews, and responding to reviews for business owners.
5. **Presentation Layer:** The presentation layer where data is presented to users through the user interface. This layer interacts with the backend processes to fetch data and display it to users.


**3. Database Relationships:**

- **User-Business Relationship:** Business owners are users with the role of "businessOwner". Each business owner is associated with one or more businesses they own through the `businessId` field in the User schema.
- **User-Review Relationship:** Each review is associated with a user who created it. This relationship is established through the `user` field in the Review schema, which references the User schema.
- **Business-Review Relationship:** Each review is associated with the business it relates to. This relationship is established through the `business` field in the Review schema, which references the Business schema.

**4. Architecture Diagram:**

The architecture of the web application follows a typical client-server model. The client-side consists of the user interface (UI) components implemented using HTML, CSS, and JavaScript. The server-side is implemented using Node.js and Express.js framework. MongoDB is used as the database to store application data.

```
                                 +-----------------------------------+
                                 |               Client              |
                                 +-----------------------------------+
                                           |           ^
                                           v           |
                                 +--------------------------+ 
                                 |      Frontend/UI Layer    |
                                 +--------------------------+
                                           |           ^
                                           v           |
                                 +--------------------------+ 
                                 |       API Gateway         |
                                 +--------------------------+
                                           |           ^
                                           v           |
                                 +--------------------------+ 
                                 |       Authentication      |
                                 +--------------------------+
                                           |           ^
                                           v           |
                                 +--------------------------+ 
                                 |         Business         |
                                 |         Services         |
                                 +--------------------------+
                                           |           ^
                                           v           |
                                 +--------------------------+ 
                                 |        Data Access       |
                                 |         Layer            |
                                 +--------------------------+
                                           |           ^
                                           v           |
                                 +--------------------------+ 
                                 |       Database (MongoDB)  |
                                 +--------------------------+
```

**5. Components:**

- **Client-side:** Responsible for rendering the UI and handling user interactions.
- **Server-side:** Handles incoming requests from clients, performs necessary operations (authentication, CRUD operations), and interacts with the database.
- **Database:** Stores application data using MongoDB, a NoSQL database.

**6. Implementation:**

- **User Authentication:** Implemented using JWT (JSON Web Tokens) for token-based authentication. Three user roles are defined: admin, businessOwner, and user.
- **Business Listing Management:** CRUD operations for managing business listings. Business owners can create, read, and update their listings.
- **Review Management:** Users can create reviews for businesses. Business owners can respond to reviews.


### Prerequisites:
1. **Node.js and npm:** Make sure you have Node.js and npm installed on your machine. You can download and install them from the official Node.js website: [Download Node.js](https://nodejs.org/).

2. **MongoDB:** Install MongoDB Community Edition on your machine. You can download it from the official MongoDB website: [Download MongoDB](https://www.mongodb.com/try/download/community).

### Step 1: Clone the Project
Open your terminal or command prompt and navigate to the directory where you want to clone the project. Then run the following command:
```
git clone <repository_url>
```
Replace `<repository_url>` with the URL of the Git repository where the project is hosted.

### Step 2: Install Dependencies
Navigate into the project directory using the terminal and run the following command to install all the required dependencies specified in the `package.json` file:
```
cd restaurant-listing-app
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the root directory of the project and define the following environment variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/restaurant_db
JWT_SECRET=your_secret_key_here
```
Replace `your_secret_key_here` with a secret key for JWT token encryption.

### Step 4: Start MongoDB
Start the MongoDB server. You can do this by running the `mongod` command in your terminal.

### Step 5: Start the Application
In the terminal, run the following command to start the server:
```
npm start
```
If everything is set up correctly, you should see a message indicating that the server is running on the specified port (e.g., `Server is running on port 3000`).

### Step 6: Testing with Postman
1. **Open Postman:** If you haven't already, download and install [Postman](https://www.postman.com/downloads/) on your machine.

2. **Testing Endpoints:** Use Postman to send HTTP requests to the API endpoints for user authentication, business listing management, and review management. Refer to the API endpoints and request examples provided earlier in this conversation.

### Step 7: Verify Functionality
Test various endpoints using Postman to verify that the application functions as expected. Ensure that you can sign up, sign in, create business listings, and post reviews successfully.



### User Authentication:
1. **User Signup:**
   - **URL:** `POST http://localhost:3000/api/auth/signup`
   - **Sample Data:**
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "testpassword",
       "role": "user"
     }
     ```

2. **User Signin:**
   - **URL:** `POST http://localhost:3000/api/auth/signin`
   - **Sample Data:**
     ```json
     {
       "email": "test@example.com",
       "password": "testpassword"
     }
     ```

### Business Listing Management:
1. **Create a New Business Listing:**
   - **URL:** `POST http://localhost:3000/api/businesses`
   - **Sample Data:**
     ```json
     {
       "name": "Sample Restaurant",
       "phone": "1234567890",
       "address": {
         "street": "123 Test St",
         "city": "Test City",
         "state": "Test State",
         "zipcode": "12345"
       },
       "images": ["image1.jpg", "image2.jpg"]
     }
     ```

2. **Get All Business Listings:**
   - **URL:** `GET http://localhost:3000/api/businesses`

### Review Management:
1. **Create a New Review:**
   - **URL:** `POST http://localhost:3000/api/reviews`
   - **Sample Data:**
     ```json
     {
       "rating": 4,
       "comment": "Great experience!",
       "user": "<user_id>",  // Replace <user_id> with the ID of the user leaving the review
       "business": "<business_id>"  // Replace <business_id> with the ID of the business being reviewed
     }
     ```

2. **Get All Reviews for a Business:**
   - **URL:** `GET http://localhost:3000/api/businesses/:businessId/reviews`
   - Replace `:businessId` with the ID of the business whose reviews you want to fetch.

3. **Get All Reviews by a User:**
   - **URL:** `GET http://localhost:3000/api/users/:userId/reviews`
   - Replace `:userId` with the ID of the user whose reviews you want to fetch.

### Postman Testing:
1. Open Postman and create a new request.
2. Set the request method (POST, GET, etc.) and URL based on the endpoints provided above.
3. Add the sample data for the request in the request body (if required).
4. Send the request and check the response to verify the functionality of the API.

## Unit Test
To run the unit test 
 ```
 npx jest
 
 ```

**7. Conclusion:**

The web application provides a platform for users to discover and interact with various restaurants. It features user authentication, business listing management, and review management functionalities. The database schema ensures proper organization of data and establishes relationships between entities. The architecture diagram illustrates the flow of data and interactions between components.

Overall, the project successfully meets the requirements and provides a robust solution for a restaurant listing platform. Further enhancements could include additional features such as advanced search, rating aggregation, and more interactive user interfaces.