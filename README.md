# Florium OS Project

A pseudo-operating system that runs in the browser. This project is still in its early stages of development.

## 📁 File Structure

```
/pseudo-os
├── index.html              # Main HTML
├── README.md              # This file
├── screens/               # Screen HTML files
│   ├── setup.html         # Setup screen
│   ├── lock.html          # Lock screen
│   └── desktop.html       # Desktop screen
├── css/                   # Stylesheets
│   ├── base.css           # Base styles
│   ├── screens.css        # Screen-specific styles
│   ├── windows.css        # Window system
│   └── components.css     # Components
├── js/                    # JavaScript files
│   ├── main.js            # Entry point
│   ├── os.js              # OS core class
│   ├── windowManager.js   # Window management
│   ├── appManager.js      # Application management
│   ├── globalFunctions.js # Global functions
│   └── apps/
│       └── appConfigs.js  # App configurations
└── apps/                  # Application HTML files
    ├── calculator/
    │   └── index.html      # Calculator app
    ├── notepad/
    │   └── index.html      # Notepad app
    ├── filemanager/
    │   └── index.html      # File Manager
    └── systeminfo/
        └── index.html      # System Information
```

## 🚀 Features

### Screen Transitions
- **Setup Screen**: Initial user registration
- **Lock Screen**: Password authentication (real-time clock display)
- **Desktop**: Main workspace

### Desktop Features
- Launch apps with double-click
- Draggable windows
- Start menu
- Taskbar (time display, system tray)

### Built-in Applications
- 🧮 **Calculator**: Basic arithmetic operations (beautiful UI)
- 📝 **Notepad**: Text editing, saving, character count
- 📁 **File Manager**: File listing, folder navigation
- ℹ️ **System Info**: System information, process list, diagnostic features

## 🔧 For Developers

### Adding a New App

1. Create the `apps/newapp/` folder

2. Create `apps/newapp/index.html`:

```html
<div class="newapp-app">
  <h2>New App</h2>
  <p>Write your app content here</p>
  <button onclick="doSomething()">Button</button>
</div>

<style>
.newapp-app {
  /* App-specific styles */
}
</style>

<script>
function doSomething() {
  alert('Something happened');
}
</script>
```

3. Add configuration to `js/apps/appConfigs.js`:

```javascript
newapp: {
  title: 'New App',
  width: 400,
  height: 300,
  htmlFile: 'apps/newapp/index.html'
}
```

4. Add a desktop icon (`screens/desktop.html`):

```html
<div class="desktop-icon" ondblclick="launchApp('newapp')">
  <div class="desktop-icon-image">🆕</div>
  <span class="desktop-icon-label">New App</span>
</div>
```

### File Assignments

| Role | Files | Content |
|------|-------|---------|
| System Lead | `js/os.js`, `js/windowManager.js` | Core System |
| UI Lead | `css/`, `screens/` | Design & Screens |
| App Developer | `js/apps/appConfigs.js` | New Applications |

## 🎯 Roadmap

- [ ] App sandboxing (iframing)
- [ ] Right-click context menu
- [ ] File system (virtual)
- [ ] Theme system
- [ ] Task Manager
- [ ] System settings
- [ ] User switching
- [ ] Window minimize/maximize functionality

## 🚀 How to Run

1. Place the files on a web server
2. Access `index.html`
3. Complete the setup and enjoy!

## 🤝 How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-app`)
3. Commit your changes (`git commit -am 'Add new app'`)
4. Push to the branch (`git push origin feature/new-app`)
5. Create a Pull Request

## 📄 License

MIT License