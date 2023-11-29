# Welcome to Saloodo Back-end

Hello there! 👋 Welcome to the back-end section of Saloodo. I am excited to show you my work

## Usage

You can simply access the postman collection that in the repo under the name ***Saloodo.postman_collection.json***

and try all the apis for your self and here is description of the APIs


# Saloodo Postman Collection

### Variables
- **host**: `localhost:3000`

---

## Auth

### Login
- **Method**: POST
- **URL**: `{{host}}/users/auth/login/`
- **Body**:
    ```json
    {
        "username": "sender1",
        "password": "123"
    }
    ```
- **Response**:
    ```json
    {
        "UserID": 1,
        "Username": "sender1",
        "Password": "123",
        "Type": "sender",
        "CreatedAt": "2023-11-29 09:08:24",
        "UpdatedAt": "2023-11-29 09:08:24"
    }
    ```

---

## Parcels

### Add new parcel
- **Method**: POST
- **URL**: `{{host}}/parcels/`
- **Body**:
    ```json
    {
        "ownerID": 2,
        "parcelInfo": "Gift",
        "parcelFrom": "line 1",
        "parcelTo": "line2"
    }
    ```
- **Response**:
    ```json
    {
        "added": true
    }
    ```

### Update parcel status
- **Method**: PUT
- **URL**: `{{host}}/parcels/status`
- **Body**:
    ```json
    {
        "parcelID": 1,
        "status": "PICKED"
    }
    ```
- **Response**:
    ```json
    {
        "parcel": true
    }
    ```

### Update rider
- **Method**: PUT
- **URL**: `{{host}}/parcels/rider`
- **Body**:
    ```json
    {
        "parcelID": 1,
        "riderID": 15
    }
    ```
- **Response**:
    ```json
    {
        "parcel": true
    }
    ```

### Get available parcels
- **Method**: GET
- **URL**: `{{host}}/parcels/`
- **Response**:
    ```json
    {
        "parcels": [
            {
                "ParcelID": 5,
                ...
            },
            ...
        ]
    }
    ```

### Get user parcels
- **Method**: GET
- **URL**: `{{host}}/parcels/user/:userID`
- **Variable**: `userID: 2`
- **Response**:
    ```json
    {
        "parcels": [
            {
                "ParcelID": 1,
                ...
            },
            ...
        ]
    }
    ```

### Get rider parcels
- **Method**: GET
- **URL**: `{{host}}/parcels/rider/:riderID`
- **Variable**: `riderID: 15`
- **Response**:
    ```json
    {
        "parcels": [
            {
                "ParcelID": 1,
                ...
            }
        ]
    }
    ```

Have fun testing the application