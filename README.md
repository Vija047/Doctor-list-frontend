#  Online Doctor Consultation Frontend (TypeScript + React)

A responsive and user-friendly frontend application developed using **React (TypeScript)**. This app allows users to consult with general physicians online, featuring filters, sorting, and booking options for virtual consultations.

##  Features

-  Browse general physicians
-  Filter by consultation type, experience, fees, and language
-  Sort by relevance or consultation fees
-  Online consultation availability with wait time
-  Cashback display on consultation fees
-  Call support for booking instantly

##  Tech Stack

- **React + TypeScript** – Typed React components for scalable development
- **Tailwind CSS / ShadCN UI / Bootstrap** – Modern UI styling
- **React Router** – Routing and navigation
- **Axios** – For API requests (optional if backend connected)

##  Folder Structure

```plaintext
/frontend
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable UI components
│   │   ├── DoctorCard.tsx
│   │   ├── Filters.tsx
│   │   └── SortMenu.tsx
│   │
│   ├── pages/
│   │   └── DoctorList.tsx
│   │
│   ├── types/              # TypeScript types and interfaces
│   │   └── doctor.ts
│   │
│   ├── App.tsx
│   ├── index.tsx
│   └── main.css (or Tailwind config)
│
└── package.json
```

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/online-doctor-consult-frontend.git
cd online-doctor-consult-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm run dev
```

Visit: [http://localhost:5173](https://doctor-list-frontend.vercel.app/)

![image](https://github.com/user-attachments/assets/fc0fcd24-be36-4206-9619-6263589060a1)
![image](https://github.com/user-attachments/assets/fdf0f98f-42e3-46e3-800b-4e22dd6dd524)

##  Sample Type

```ts
// src/types/doctor.ts
export interface Doctor {
  id: string;
  name: string;
  experience: number;
  specialty: string;
  location: string;
  rating: number;
  fee: number;
  availableInMinutes: number;
  languages: string[];
}
```



Include a UI screenshot in your repo as `screenshot.png` and link it:

```md
![UI Screenshot](./screenshot.png)
```

##  Future Improvements

- Authentication (user login/bookings)
- Real-time doctor availability
- Feedback and ratings system
- Pagination and search bar
- Mobile-first design improvements

-
