# Mini Banking App

Mini Banking Dashboard for retail customers.

---

## Prerequisites

You need to have **Docker** installed on your computer.

---

## Getting Started

1. Clone the repository and navigate to the backend:

```bash
cd banking-api
```

2. Build and start the containers:

```bash
docker-compose up --build
```

3. Update the backend environment variables according to your frontend URL. Create or update the `.env` file in `banking-api`:

```env
PORT=4000
JWT_SECRET=supersecretkey
DATABASE_URL="mysql://root:root@mysql:3306/banking_db"
FRONTEND_URL="http://localhost:5173"
NODE_ENV="dev"
```

---

## Database Access

You can view the database at: [http://localhost:8080](http://localhost:8080)

**Login Credentials:**

* **Server:** mysql
* **Username:** root
* **Password:** root
* **Database:** banking\_db

**Frontend Login Credentials:**

* **username:** user1
* **password:** password123

Usernames you can try in combination like user1, user4, user7 etc...
---

## Features / Completed Modules

* **User Login:**
  Login using username and password.

* **Authentication:**
  JWT authentication with `HttpOnly` token stored in cookie. Frontend cannot access the token.

* **Dashboard:**

  * View client account number and balance.
  * Transfer money to other bank accounts (beneficiary is not in our database). The amount is deducted from the user's account balance.
  * View a list of past money transfers.

---

## Notes

* Ensure the frontend is running on the URL specified in `FRONTEND_URL`.
* All backend APIs will run on port `4000`.
