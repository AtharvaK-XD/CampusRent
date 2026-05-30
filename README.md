# CampusRent 🏕️

> **A peer-to-peer rental marketplace built for college students.**  
> Borrow what you need. Lend what you have. Stay on campus.

---

## Demo

[![CampusRent Demo](https://img.youtube.com/vi/88sbSNVR8k8/maxresdefault.jpg)](https://www.youtube.com/watch?v=88sbSNVR8k8)

---

## What is CampusRent?

CampusRent is a student-first platform that makes it easy to rent items within your campus community — no sketchy strangers, no overpriced stores, no hassle. Whether you need a projector for a presentation, a drill for your hostel wall, or a camera for a weekend trip, CampusRent connects you with a fellow student who has it.

Built around trust, convenience, and simplicity — because college students shouldn't have to buy everything they only need once.

---

## Features

- 🔄 **Peer-to-Peer Rentals** — list items as a lender or browse as a borrower
- 🏷️ **Reverse Auction Pricing** — borrowers can bid; lenders choose the best offer
- ⏱️ **Short-term Rental Windows** — designed for quick, campus-length durations
- 🔔 **Real-time Notifications** — instant updates via Socket.io
- 🧾 **Separate Dashboards** — tailored views for lenders and borrowers
- ✅ **Trust-based Verification** — campus-only interactions for safety
- 📱 **Fully Responsive** — works across mobile, tablet, and desktop

---

## Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React + Vite | UI framework & build tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router | Client-side routing |
| Zustand | State management |
| React Hook Form + Zod | Forms & validation |
| Recharts | Data visualization |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| Socket.io | Real-time notifications |

---

## Project Structure

```
CampusRent/
├── frontend/        # React app (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/        # Zustand state
│   │   └── utils/
│   └── package.json
│
└── backend/         # Express + Socket.io server
    ├── routes/
    ├── controllers/
    ├── models/
    └── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/AtharvaK-XD/CampusRent.git
cd CampusRent
```

**Start the backend:**
```bash
cd backend
npm install
npm run dev
```

**Start the frontend:**
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` · Backend runs on `http://localhost:3000`

---

## Who is this for?

- **Borrowers** — students who need something temporarily and don't want to spend full price
- **Lenders** — students who have items sitting unused and want to earn from them
- **Campus communities** — any college looking for a smarter internal resource-sharing system

---


## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## License

[MIT](LICENSE)

---

> Built by [@AtharvaK-XD](https://github.com/AtharvaK-XD)
