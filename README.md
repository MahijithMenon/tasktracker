📝 TaskTracker

A simple command-line-based task manager powered by Node.js and Express, with a built-in REST API and CLI tool for quick task operations.

⸻

🚀 Features
	•	Add, delete, update tasks via terminal
	•	Mark tasks as done or in-progress
	•	View task list with filtering
	•	CLI tool (task-cli) mapped to terminal commands
	•	REST API built with Express
	•	Server monitoring and persistence using PM2

⸻

📦 Requirements
	•	Node.js v14+
	•	npm
	•	PM2 for process management

⸻

📂 Project Structure

tasktracker/
├── index.js         # Express server
├── cli.js           # CLI logic (linked as task-cli)
├── tasks.json       # File storage for tasks
├── package.json
└── README.md



⸻

🛠 Installation
	1.	Clone the repo:

git clone https://github.com/your-username/tasktracker.git
cd tasktracker

	2.	Install dependencies:

npm install

	3.	Make the CLI executable:

chmod +x cli.js

	4.	Link the CLI globally:

npm link

This allows you to run task-cli from anywhere.

⸻

🧪 Usage

Start the Server

npm run start

Or use PM2 for auto-restart:

npm run dev



⸻

CLI Commands

task-cli add "Buy groceries"
task-cli delete 2
task-cli update 1 "New task name" "Optional description"
task-cli mark-in-progress 1
task-cli mark-done 1
task-cli list
task-cli list done
task-cli list todo
task-cli list in-progress



⸻

⚙️ PM2 Management

Start server with PM2:

pm2 start cli.js --name task-tracker --watch

Check running processes:

pm2 list

Stop:

pm2 stop task-tracker

Restart:

pm2 restart task-tracker

Save for system boot:

pm2 save
pm2 startup


.env.example
URL=http://localhost:3000


Project URL:
https://roadmap.sh/projects/task-tracker


