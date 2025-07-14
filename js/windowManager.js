export class WindowManager {
    constructor() {
        this.windowCounter = 0;
        this.windows = new Map();
    }

    createWindow(config) {
        const windowId = ++this.windowCounter;
        const windowElement = document.createElement('div');
        windowElement.className = 'window';
        windowElement.id = `window-${windowId}`;
        windowElement.style.left = `${50 + (windowId * 30)}px`;
        windowElement.style.top = `${50 + (windowId * 30)}px`;
        windowElement.style.width = `${config.width || 400}px`;
        windowElement.style.height = `${config.height || 300}px`;
        windowElement.style.zIndex = 1000 + windowId;

        windowElement.innerHTML = `
      <div class="window-header">
        <span class="window-title">${config.title || 'ウィンドウ'}</span>
        <div class="window-controls">
          <div class="window-control minimize"><span class="material-symbols-rounded">remove</span></div>
          <div class="window-control maximize"><span class="material-symbols-rounded">stop</span></div>
          <div class="window-control close" onclick="window.os.closeWindow(${windowId})"><span class="material-symbols-rounded">close</span></div>
        </div>
      </div>
      <div class="window-content" id="content-${windowId}">
        ${config.content || ''}
      </div>
      <div class="window-resize-handle resize-se"></div>
      <div class="window-resize-handle resize-e"></div>
      <div class="window-resize-handle resize-s"></div>
      <div class="window-resize-handle resize-w"></div>
      <div class="window-resize-handle resize-n"></div>
      <div class="window-resize-handle resize-nw"></div>
      <div class="window-resize-handle resize-ne"></div>
      <div class="window-resize-handle resize-sw"></div>
    `;

        document.getElementById('desktop').appendChild(windowElement);
        this.makeDraggable(windowElement);
        this.makeResizable(windowElement);

        // ウィンドウクリックでフォーカス
        windowElement.addEventListener('mousedown', () => {
            this.bringToFront(windowElement);
        });

        const windowObj = {
            id: windowId,
            element: windowElement,
            setContent: (content) => {
                const contentEl = document.getElementById(`content-${windowId}`);
                if (contentEl) {
                    contentEl.innerHTML = content;
                }
            }
        };

        this.windows.set(windowId, windowObj);
        return windowObj;
    }

    closeWindow(windowId) {
        const windowObj = this.windows.get(windowId);
        if (windowObj && windowObj.element) {
            windowObj.element.remove();
            this.windows.delete(windowId);
        }
    }

    makeDraggable(windowElement) {
        const header = windowElement.querySelector('.window-header');
        if (!header) return;

        let isDragging = false;
        let startX, startY, startLeft, startTop;

        header.addEventListener('mousedown', (e) => {
            // ウィンドウコントロールボタンやリサイズハンドルをクリックした場合はドラッグしない
            if (e.target.classList.contains('window-control') ||
                e.target.classList.contains('window-resize-handle')) {
                return;
            }

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(windowElement.style.left) || 0;
            startTop = parseInt(windowElement.style.top) || 0;
            windowElement.style.zIndex = 999;

            // 選択を無効化
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            let newLeft = startLeft + deltaX;
            let newTop = startTop + deltaY;

            // 画面外に出ないように制限（タスクバーの下も許可）
            const minLeft = -windowElement.offsetWidth + 50; // 50px残す
            const maxLeft = window.innerWidth - 50; // 50px残す
            const minTop = -windowElement.offsetHeight + 50; // 上も50px残す
            const maxTop = window.innerHeight - 50; // タスクバーの下も可能

            newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
            newTop = Math.max(minTop, Math.min(newTop, maxTop));

            windowElement.style.left = `${newLeft}px`;
            windowElement.style.top = `${newTop}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    makeResizable(windowElement) {
        const resizeHandles = windowElement.querySelectorAll('.window-resize-handle');

        resizeHandles.forEach(handle => {
            let isResizing = false;
            let startX, startY, startWidth, startHeight, startLeft, startTop;

            handle.addEventListener('mousedown', (e) => {
                isResizing = true;
                startX = e.clientX;
                startY = e.clientY;
                startWidth = windowElement.offsetWidth;
                startHeight = windowElement.offsetHeight;
                startLeft = parseInt(windowElement.style.left) || 0;
                startTop = parseInt(windowElement.style.top) || 0;

                e.preventDefault();
                e.stopPropagation();
            });

            document.addEventListener('mousemove', (e) => {
                if (!isResizing) return;

                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;

                if (handle.classList.contains('resize-se')) {
                    // 右下角
                    const newWidth = Math.max(200, startWidth + deltaX);
                    const newHeight = Math.max(150, startHeight + deltaY);
                    windowElement.style.width = `${newWidth}px`;
                    windowElement.style.height = `${newHeight}px`;
                } else if (handle.classList.contains('resize-e')) {
                    // 右辺
                    const newWidth = Math.max(200, startWidth + deltaX);
                    windowElement.style.width = `${newWidth}px`;
                } else if (handle.classList.contains('resize-s')) {
                    // 下辺
                    const newHeight = Math.max(150, startHeight + deltaY);
                    windowElement.style.height = `${newHeight}px`;
                } else if (handle.classList.contains('resize-w')) {
                    // 左辺
                    const newWidth = Math.max(200, startWidth - deltaX);
                    const newLeft = startLeft + deltaX;
                    if (newWidth > 200) {
                        windowElement.style.width = `${newWidth}px`;
                        windowElement.style.left = `${newLeft}px`;
                    }
                } else if (handle.classList.contains('resize-n')) {
                    // 上辺
                    const newHeight = Math.max(150, startHeight - deltaY);
                    const newTop = startTop + deltaY;
                    if (newHeight > 150) {
                        windowElement.style.height = `${newHeight}px`;
                        windowElement.style.top = `${newTop}px`;
                    }
                } else if (handle.classList.contains('resize-nw')) {
                    // 左上角
                    const newWidth = Math.max(200, startWidth - deltaX);
                    const newHeight = Math.max(150, startHeight - deltaY);
                    const newLeft = startLeft + deltaX;
                    const newTop = startTop + deltaY;
                    if (newWidth > 200 && newHeight > 150) {
                        windowElement.style.width = `${newWidth}px`;
                        windowElement.style.height = `${newHeight}px`;
                        windowElement.style.left = `${newLeft}px`;
                        windowElement.style.top = `${newTop}px`;
                    }
                } else if (handle.classList.contains('resize-ne')) {
                    // 右上角
                    const newWidth = Math.max(200, startWidth + deltaX);
                    const newHeight = Math.max(150, startHeight - deltaY);
                    const newTop = startTop + deltaY;
                    if (newHeight > 150) {
                        windowElement.style.width = `${newWidth}px`;
                        windowElement.style.height = `${newHeight}px`;
                        windowElement.style.top = `${newTop}px`;
                    }
                } else if (handle.classList.contains('resize-sw')) {
                    // 左下角
                    const newWidth = Math.max(200, startWidth - deltaX);
                    const newHeight = Math.max(150, startHeight + deltaY);
                    const newLeft = startLeft + deltaX;
                    if (newWidth > 200) {
                        windowElement.style.width = `${newWidth}px`;
                        windowElement.style.height = `${newHeight}px`;
                        windowElement.style.left = `${newLeft}px`;
                    }
                }
            });

            document.addEventListener('mouseup', () => {
                isResizing = false;
            });
        });
    }

    bringToFront(windowElement) {
        try {
            const allWindows = Array.from(this.windows.values());
            const currentMaxZ = Math.max(...allWindows.map(w =>
                parseInt(w.element.style.zIndex) || 1000
            ));
            windowElement.style.zIndex = currentMaxZ + 1;
        } catch (error) {
            // フォールバック
            windowElement.style.zIndex = 9999;
        }
    }
}