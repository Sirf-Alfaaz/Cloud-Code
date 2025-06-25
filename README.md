# CloudCode – Replit-Inspired Collaborative Online IDE

CloudCode is a real-time, browser-based collaborative code editor inspired by Replit. It allows users to write, run, and debug code collaboratively without needing any local setup. Designed for teams, educators, and individual developers, CloudCode brings cloud-powered development directly into your browser.

---

## Features

- 👥 **Real-Time Collaboration**: Multiple users can edit code live with synced cursors using Socket.IO.
- 🖥️ **Integrated Terminal**: Built-in pseudo-terminal (PTY) for real-time shell access and code execution.
- 📁 **Project and File Management**: Create, manage, and organize multiple files with instant sync.
- 🔐 **Authentication & Role-Based Access**: Secure login with OAuth 2.0, JWT, and user/admin roles.
- 🐳 **Sandboxed Execution**: Docker containers for safe, isolated code execution (multi-language support).
- 📊 **Admin Dashboard**: View user sessions, system load, and manage runtime configurations.
- 🌍 **No Installation Required**: Use from any browser, anywhere—no setup needed.

---

## 🏗️ Tech Stack

### 🔧 Backend
- **Node.js** + **Express.js** – API and server logic
- **Socket.IO** – Real-time communication
- **MongoDB** – Database for users, projects, and sessions
- **Docker** – Code execution in isolated environments
- **Pty** + **fs** – Simulated terminal and file system operations

### 🎨 Frontend
- **React.js** – Component-based UI
- **Tailwind CSS** – Responsive and modern design
- **CodeMirror** – In-browser code editor

---

## 🧪 How It Works

1. Users log in via secure JWT/OAuth authentication.
2. Create or join coding sessions in the browser.
3. Write code collaboratively with real-time sync.
4. Use the integrated terminal to run and debug code.
5. Save and manage projects in the cloud.

---

## 💡 Use Cases

- 👨‍🏫 Online coding classes and bootcamps
- 🧑‍💻 Pair programming and team collaboration
- 🐞 Real-time debugging and interviews
- ⚡ Hackathons and quick prototyping

---
![image](https://github.com/user-attachments/assets/728b3028-c7e9-418a-83a2-540e3cfa5085)


![image](https://github.com/user-attachments/assets/a960fdb9-14d8-4e6a-b125-0ccee4b9ee54)

![image](https://github.com/user-attachments/assets/77e5b9be-4a74-41fe-95a1-a2e3098350dc)





## 🛠️ Setup & Installation (For Developers)

> 📝 Requirements: Node.js, MongoDB, Docker

```bash
# Clone the repo
git clone https://github.com/your-username/cloudcode.git
cd cloudcode

# Install server dependencies
cd backend
npm install

# Install client dependencies
cd ../frontend
npm install


# Start the backend
cd backend
npm run dev

# Start the frontend
cd frontend
npm start
