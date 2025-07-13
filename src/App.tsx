import './App.css'

function App() {
  return (
    <div className="desktop">
      <div className="desktop-area">
        {/* デスクトップのメインエリア */}
        <h1>florium OS</h1>
      </div>

      <div className="taskbar">
        {/* タスクバー */}
        <div className="start-menu">スタート</div>
        <div className="taskbar-time">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export default App