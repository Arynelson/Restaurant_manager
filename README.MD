# Restaurant Order Management System

![menu](https://github.com/Arynelson/Restaurant_manager/blob/main/frontend/src/assets/printmenu.jpeg)

This is a **Restaurant Order Management System** designed to streamline the process of managing orders within a restaurant. The application is tailored for use by waiters, cashiers, managers, and kitchen staff. It provides an intuitive interface for handling menu items, customer orders, and real-time updates.

## Features

- **Menu Management**: View and select menu items with detailed descriptions and prices.
- **Order Management**: Create, update, and track orders for each table.
- **Customer Management**: Add and manage customer details.
- **Dashboard**: Visualize order summaries, revenue, and popular items.
- **Real-Time Updates**: Seamless interaction between frontend and backend for real-time data updates.
- **Role-Based Usage**: Designed for waiters, cashiers, managers, and kitchen staff.

## Technologies Used

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: PostgreSQL (running via Docker)
- **ORM**: SQLAlchemy

### Frontend
- **Framework**: [React](https://reactjs.org/) (with Vite)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Charts**: Recharts for data visualization

### Database
- **PostgreSQL**: A robust relational database for storing customer, order, and menu data.

## Installation

### Prerequisites
- [Docker](https://www.docker.com/) installed for running PostgreSQL.
- [Node.js](https://nodejs.org/) installed for the frontend.
- Python 3.10+ installed for the backend.

### Backend Setup
1. Clone the repository:
2. Install dependencies:
3. Start the PostgreSQL database using Docker:
4. Populate the database:
5. Run the FastAPI server:

### Frontend Setup
1. Navigate to the frontend directory:
2. Install dependencies:
3. Start the development server:


## Access the Application ##

Frontend: Open http://localhost:5173 in your browser.

Backend API: Access the FastAPI docs at http://localhost:8000/docs.

###  Project Structure  ###
```bash 
.
├── app/                # Backend (FastAPI)
│   ├── routes/         # API routes
│   ├──        # Database models
│   ├──       # Pydantic schemas
│   ├──      # Database connection
│   └──          # Database seeding script
├── frontend/           # Frontend (React + Vite)
│   ├── src/            # React source code
│   ├── public/         # Static assets
│   └──  # TailwindCSS configuration
└── .env                # Environment variables
```bash 

G:\PORTFOLIO\Client Manager\frontend\src\assets\printmenu.jpeg


Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to reach out if you have any questions or suggestions!

Developer : Ary Hauffe Neto
Portfolio: https://arynelson.github.io/Site/

