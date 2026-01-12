/**
 * 文档列表配置 - 在此添加你的md文件
 */
const docs = [
    { name: 'Linux 生存手册', file: 'src/linux生存手册.md', icon: 'fa-linux' }
    // 添加更多文档: { name: '文档名', file: 'src/xxx.md', icon: 'fa-file' }
];

let currentDoc = docs[0].file;

/**
 * 配置 marked
 */
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true,
    gfm: true
});

/**
 * 生成唯一ID
 */
function generateId(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * 初始化文件列表
 */
function initFileList() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = docs.map((doc, index) => `
        <div class="file-item ${index === 0 ? 'active' : ''}" data-file="${doc.file}">
            <i class="fab ${doc.icon}"></i>
            <span>${doc.name}</span>
        </div>
    `).join('');

    // 文件点击事件
    fileList.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', () => {
            const file = item.dataset.file;
            loadMarkdown(file);
            fileList.querySelectorAll('.file-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            closeFilePanel();
        });
    });
}

/**
 * 文件搜索
 */
function initFileSearch() {
    document.getElementById('fileSearch').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.file-item').forEach(item => {
            const name = item.textContent.toLowerCase();
            item.style.display = name.includes(query) ? 'flex' : 'none';
        });
    });
}

/**
 * 文件面板控制
 */
function openFilePanel() {
    document.getElementById('filePanel').classList.add('open');
    document.getElementById('overlay').classList.add('show');
}

function closeFilePanel() {
    document.getElementById('filePanel').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
}

function initFilePanelEvents() {
    document.getElementById('fileToggle').addEventListener('click', openFilePanel);
    document.getElementById('filePanelClose').addEventListener('click', closeFilePanel);
    document.getElementById('overlay').addEventListener('click', closeFilePanel);
}

/**
 * 读取并渲染 Markdown
 */
async function loadMarkdown(file = currentDoc) {
    try {
        currentDoc = file;
        const response = await fetch(file);
        const markdown = await response.text();

        // 移除 [toc] 标记
        const cleanMarkdown = markdown.replace(/^\[toc\]\s*/im, '');

        // 渲染 Markdown
        const html = marked.parse(cleanMarkdown);
        document.getElementById('content').innerHTML = html;

        // 更新页面标题
        const firstH1 = document.querySelector('.markdown-body h1');
        if (firstH1) {
            document.title = firstH1.textContent + ' - yuzujr';
        }

        // 生成目录
        generateTOC();

        // 为标题添加锚点链接
        addHeaderAnchors();

        // 设置滚动监听
        setupScrollSpy();

        // 添加代码复制按钮
        addCopyButtons();

        // 设置图片灯箱
        setupLightbox();

        // 滚动到顶部
        window.scrollTo(0, 0);

    } catch (error) {
        document.getElementById('content').innerHTML =
            `<p style="color: #f85149;">加载失败: ${error.message}</p>`;
    }
}

/**
 * 生成目录
 */
function generateTOC() {
    const content = document.getElementById('content');
    const headings = content.querySelectorAll('h1, h2, h3, h4');
    const toc = document.getElementById('toc');

    toc.innerHTML = '';

    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName[1]);
        const text = heading.textContent.replace('#', '').trim();
        const id = generateId(text) + '-' + index;

        heading.id = id;

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = text;
        a.dataset.id = id;
        a.style.paddingLeft = `${(level - 1) * 15}px`;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, null, `#${id}`);
        });

        li.appendChild(a);
        toc.appendChild(li);
    });
}

/**
 * 目录搜索
 */
function initTocSearch() {
    document.getElementById('tocSearch').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#toc a').forEach(link => {
            const text = link.textContent.toLowerCase();
            link.parentElement.style.display = text.includes(query) ? 'block' : 'none';
        });
    });
}

/**
 * 为标题添加锚点链接
 */
function addHeaderAnchors() {
    const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4');
    headings.forEach(heading => {
        const anchor = document.createElement('a');
        anchor.className = 'header-anchor';
        anchor.href = `#${heading.id}`;
        anchor.textContent = '#';
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, `#${heading.id}`);
        });
        heading.appendChild(anchor);
    });
}

/**
 * 设置滚动监听高亮
 */
function setupScrollSpy() {
    const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4');
    const tocLinks = document.querySelectorAll('#toc a');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;
        let currentId = '';

        headings.forEach(heading => {
            if (heading.offsetTop <= scrollPos) {
                currentId = heading.id;
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
                link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        });
    }

    // 节流函数
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 初始化
    updateActiveLink();
}

/**
 * 阅读进度条
 */
function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

/**
 * 返回顶部功能
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateBackToTop);
}

/**
 * 添加代码复制按钮
 */
function addCopyButtons() {
    document.querySelectorAll('.markdown-body pre').forEach(pre => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = '复制';
        btn.addEventListener('click', async () => {
            const code = pre.querySelector('code').textContent;
            await navigator.clipboard.writeText(code);
            btn.textContent = '已复制!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = '复制';
                btn.classList.remove('copied');
            }, 2000);
        });
        wrapper.appendChild(btn);
    });
}

/**
 * 图片灯箱
 */
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');

    document.querySelectorAll('.markdown-body img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('show');
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });
}

/**
 * 工具栏功能
 */
function initToolbar() {
    // 打印功能
    document.getElementById('printBtn').addEventListener('click', () => {
        window.print();
    });

    // 全屏功能
    document.getElementById('fullscreenBtn').addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
}

/**
 * 滚动事件监听
 */
function initScrollEvents() {
    window.addEventListener('scroll', () => {
        updateProgressBar();
    });
}

/**
 * 键盘快捷键
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+F 搜索目录
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            document.getElementById('tocSearch').focus();
        }
        // ESC 关闭面板
        if (e.key === 'Escape') {
            closeFilePanel();
            document.getElementById('lightbox').classList.remove('show');
        }
    });
}

/**
 * 页面加载时执行
 */
document.addEventListener('DOMContentLoaded', () => {
    initFileList();
    initFileSearch();
    initFilePanelEvents();
    initTocSearch();
    initBackToTop();
    initToolbar();
    initScrollEvents();
    initKeyboardShortcuts();
    loadMarkdown();
});
