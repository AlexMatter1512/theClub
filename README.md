
# 🪩 Club Event Management Platform

This is a **SvelteKit** based platform for managing and subscribing to club events. I've tried designing it to streamline event management for administrators while providing a smooth experience for club members to explore and register for events.

In its current state, the platform language is only in Italian.

- [🪩 Club Event Management Platform](#-club-event-management-platform)
  - [🌐 Sections Overview](#-sections-overview)
    - [🔐 Admin Section](#-admin-section)
      - [**Roles**:](#roles)
      - [**QR Code Scanning**:](#qr-code-scanning)
      - [**Event Management**:](#event-management)
      - [**List Management**:](#list-management)
  - [🎟️ Client Section](#️-client-section)
      - [Features](#features)
  - [⚙️ Technical Details](#️-technical-details)
    - [🛠 Tech Stack](#-tech-stack)
    - [🚀 Getting Started](#-getting-started)
      - [Prerequisites](#prerequisites)
      - [Installation](#installation)
      - [Running the Project (Development)](#running-the-project-development)
      - [Build for Production](#build-for-production)
    - [🌐 Deployment](#-deployment)
  - [... (Work in progress)](#-work-in-progress)



## 🌐 Sections Overview
The platform has two main sections:

**Admin:** For staff to manage events.

**Client:** For users to explore, view details, and subscribe to events.

---
Some of the key features include:

_**Mail/Phone Verification**_: [Owners](#roles) can decide if [Clients](#roles) must verify their phone number or email address before subscribing to events.

_**List based events**_: Each event can have multiple event_lists, clients can only subscribe to event_lists, not directly to events. The same list (name, description and PR) can be used in multiple events (of course with different clients: a list in an event is an "event_list").

_**QR Code Generation/Scanning**_: Upon subscribing to an event, clients receive a unique QR code that can be scanned by staff to let them enter the event.

### 🔐 Admin Section
Administrators have access to comprehensive tools to manage the event lifecycle, user roles, permissions, and more:

#### **Roles**:
The admin section currently supports three roles:
- **Owner**: Full access to all features, including events and user roles management, client qr code scanning, and more.
- **Staff**: Can only scan client qr codes to let them enter events.
- **Unverified Users (Waitlist)**: Users who registered using the registration form but have not been verified by an owner are placed in the waitlist, in the meantime they **can't** access the admin section.
  
#### **QR Code Scanning**: 
Staff can scan client QR codes to let them enter events. 

#### **Event Management**:
- **Create Events**: Administrators can add detailed event information, such as:
  - Event name, 
  - Description, 
  - Start/End datetimes,
  - Location,
  - Event poster.
- **Update Events**: Quick edits allow admins to keep event information up-to-date.
- **Delete Events**: Remove past or canceled events to keep the platform current.
- **View Events**: A dashboard displays all upcoming and past events for easy reference. For each list in an event, owners can:
    - see Subscribed users,
    - see Entered users,
    - download a list of subscribed/entered users in a CSV(excel) file.
- **Add/Remove Lists**: Quickly add or remove a list from an event.
- **Open/Close Lists**: Owners can open or close lists for an event, allowing clients to subscribe or not. To close a list, owners can set a closing date and time or close it manually.

#### **List Management**:
- **Create Lists**: Admins can create lists for events, each with:
  - List name,
  - List description,
  - List PR.
- **Update Lists**: Edit list details as needed.
- **Delete Lists**: Remove outdated or unused lists.
## 🎟️ Client Section
This is where club members can explore and register for events.

#### Features
- **Optional Verification**: Users could be required to verify their phone number or email address before subscribing to events.
- **Event Discovery**: Browse all upcoming events (even if not subscribed) to find interesting activities. users will see comprehensive event informations, including description, timing, and location.
- **Subscription Options**: Users can quickly subscribe to events by selecting an opened list from the event.
- **QR Code Generation**: Upon subscribing to an event, users receive a unique QR code that can be scanned by staff to let them enter the event.
- **User Event History**: Users can view their past and upcoming events in a dedicated section, where they can also see the status of their subscription (entered or not). If not entered, they can see the QR code to enter the event and a button to cancel the subscription.

---

## ⚙️ Technical Details

### 🛠 Tech Stack
- **Frontend**: Svelte
- **Backend**: SvelteKit
- **BaaS**: PocketBase
- **Database**: SQLite (PocketBase managed)
- **Authentication & Security**: JWT-based authentication (PocketBase managed)

### 🚀 Getting Started

To set up this project locally, follow these steps:

#### Prerequisites
- **Node.js**
- **npm/bun** (personally I prefer bun)
- **PocketBase** executable

#### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo-url/club-event-management.git
   cd club-event-management
   ```

2. **Install dependencies**:

    for both web and clienti folders:
   ```bash
   bun install
   ```

1. **Configure PocketBase**:
   - Create a "backend" directory in the root of the project.
   - Follow [PocketBase setup instructions](https://pocketbase.io/docs/) to set up the BaaS in the "backend" directory.

2. **Environment Variables**:
   - remove ".example" from `.env.web.example` and `.env.clienti.example` file and fill in the required values.

#### Running the Project (Development)
1. **Start PocketBase**
2. **Run both web and clienti Dev Servers**

#### Build for Production
To build and optimize the app for production, run:
```bash
npm run build
```

---

### 🌐 Deployment

This repo has actions to build and publish the web and clienti docker images to a docker registry. 

... (Work in progress)
---
