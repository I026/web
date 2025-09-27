const d = document;
const topContentButton = d.querySelector(".content.top .button");
const topTitleContent  = d.querySelector(".content.topTitle");

const mainContent  = d.querySelector(".main.content");

let HTMLFileName = window.location.pathname.split("/").pop().split(".")[0];
if (HTMLFileName == "") HTMLFileName = "index";

async function getHashSHA256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // 16進数に変換
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function queryParameter ({
    type: type = "set",
    key: key,
    value: value,
    url: url = new URL(window.location.href),
}) {
    let returnValue = null;
    const updateUrl = () => window.history.pushState({}, "", url);
    switch (type) {
        case "set":
            url.searchParams.set(key, value);
            updateUrl();
            break;
        case "append":
            (value instanceof Array ? value : [value]).forEach(item => {
                url.searchParams.append(key, item);
            });
            updateUrl();
            break;
        case "delete":
            url.searchParams.delete(key);
            updateUrl();
            break;
        case "get":
            returnValue = url.searchParams.getAll(key);
            break;
        case "entries":
            returnValue = Object.fromEntries(
            Array.from(url.searchParams.entries())
                .filter(([key, value]) => value !== undefined && value !== "undefined")
            )
            updateUrl();
            break;
    }
    return returnValue;
}

const titleMap = {
    index: "デジタルパンフレット",
    exhibits: "企画一覧",
    lyrics: "歌詞",
};

(() => { // title
    const title = d.createElement("title");
    title.textContent = `学園祭${titleMap[HTMLFileName] ? ` : ${titleMap[HTMLFileName]}` : ""}`;
    d.head.appendChild(title);
    console.log("title");
})();

(() => { // lang､viewport､noindex
    console.log("lang");
    d.querySelector("html").lang = "ja";

    const meta_charset = d.createElement("meta");
    const meta_viewport = d.createElement("meta");
    const meta_noindex = d.createElement("meta");
    
    meta_charset.setAttribute("charset", "UTF-8")

    meta_viewport.name = "viewport";
    meta_viewport.content = "width=device-width, initial-scale=1.0";

    meta_noindex.name = "robots";
    meta_noindex.content = "noindex, nofollow";
    
    d.head.appendChild(meta_charset);
    d.head.appendChild(meta_viewport);
    d.head.appendChild(meta_noindex);
})();

(() => { // fonts
    const link_font1 = d.createElement("link");
    link_font1.rel  = "preconnect";
    link_font1.href = "https://fonts.googleapis.com";

    const link_font2 = d.createElement("link");
    link_font2.rel  = "preconnect";
    link_font2.href = "https://fonts.gstatic.com";
    link_font2.setAttribute("crossorigin", "");

    const link_font3 = d.createElement("link");
    link_font3.rel  = "stylesheet";
    link_font3.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Outfit:wght@100..900&display=swap";

    /* 
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    */

    d.head.appendChild(link_font1);
    d.head.appendChild(link_font2);
    d.head.appendChild(link_font3);
})();

function addGoogleTag () { // Google tag
    const script1 = d.createElement("script");
    script1.setAttribute("async", "");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-T9TS0VR3ED";
    
    const script2 = d.createElement("script");
    script2.innerHTML = "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-T9TS0VR3ED');";

    d.head.appendChild(script1);
    d.head.appendChild(script2);
};

(async () => { // isDevMode?
    try {
        const isDevMode = await getHashSHA256(localStorage.getItem("devMode") || null) === "729e344a01e52c822bdfdec61e28d6eda02658d2e7d2b80a9b9029f41e212dde";
        if (isDevMode) {
            console.log("isDevMode");
            // titleMap.devMode = "(HelloWorld!)";
            const title = d.head.querySelector("title");
            title.textContent = `D_ ${title.textContent}`;
        } else {
            addGoogleTag();
        }
    } catch (e) {
        console.log(e);
    }
    updateFooterContents();
})();

(() => { // favicon
    const link_favicon = d.createElement("link");
    
    link_favicon.rel = "icon";
    link_favicon.href = "./medias/images/favicon.ico";
    
    d.head.appendChild(link_favicon);
    console.log("favicon");
})();

(() => { // style + loading screen
    const link_style = d.createElement("link");
    const link_customStyle = d.createElement("link");

    link_style.rel = "stylesheet";
    link_style.href = "./css/style.css";

    link_customStyle.rel = "stylesheet";
    link_customStyle.href = `./css/${HTMLFileName}.css`;

    d.head.appendChild(link_style);
    d.head.appendChild(link_customStyle);

    // loading screen
    const loadingScreen = d.createElement("div");
    loadingScreen.style.position = "fixed";
    loadingScreen.style.top = 0;
    loadingScreen.style.left = 0;
    loadingScreen.style.width = "100vw";
    loadingScreen.style.height = "100vh";
    loadingScreen.style.backgroundColor = "white";
    loadingScreen.style.display = "flex";
    loadingScreen.style.justifyContent = "center";
    loadingScreen.style.alignItems = "center";
    loadingScreen.style.zIndex = 9999;
    loadingScreen.style.opacity = 1;
    loadingScreen.style.transition = "opacity .1s ease-in-out"

    // ロード中アイコン
    const loader = d.createElement("div");
    loader.style.width = "50px";
    loader.style.height = "50px";
    loader.style.border = "5px solid lightgray";
    loader.style.borderTop = "5px solid gray";
    loader.style.borderRadius = "50%";
    loader.style.animation = "spin 1s linear infinite, show 1s ease-in-out both";
    loader.style.animationDelay = ".2s";

    // CSSアニメーションを追加
    const styleSheet = d.createElement("style");
    styleSheet.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes show {
            from {
                width: 0;
                height: 0;
                opacity: 0;
            }
            50% {
                width: 55px;
                height: 55px;
                opacity: .75;
            }
            to {
                width: 50px;
                height: 50px;
                opacity: 1;
            }
        }
    `;
    d.head.appendChild(styleSheet);

    loadingScreen.appendChild(loader);
    d.body.appendChild(loadingScreen);
    d.body.style.opacity = 1;

    Promise.all([
        new Promise(resolve => {
            link_style.addEventListener("load", resolve);
            link_style.addEventListener("error", resolve); // 存在しない場合でもresolve
        }),
        new Promise(resolve => {
            link_customStyle.addEventListener("load", resolve);
            link_customStyle.addEventListener("error", resolve); // 存在しない場合でもresolve
        })
    ]).then(() => {
        loadingScreen.style.opacity = 0;
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    });
})();

(() => { // js
    const script_customJS = d.createElement("script");
    
    script_customJS.type = "module";
    script_customJS.src = `./js/${HTMLFileName}.js`;

    d.head.appendChild(script_customJS);
    console.log("js");
})();

function setPathViewBox() {
    const svgs = d.querySelectorAll("svg");

    svgs.forEach(svg => {
        svg.querySelectorAll("path").forEach(originalPath => {
            const dAttr = originalPath.getAttribute("d");
            const subPaths = dAttr.match(/M[^M]+/g); // Mで始まるサブパスを分割
            if (subPaths && subPaths.length > 1) {
                subPaths.forEach(subD => {
                    const newPath = originalPath.cloneNode(false);
                    newPath.setAttribute("d", subD.trim());
                    originalPath.parentNode.insertBefore(newPath, originalPath);
                });
                originalPath.remove();
            }
        });

        const paths = svg.querySelectorAll("path");
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        // path の長さや stroke-dasharray 初期化
        paths.forEach((path, index) => {
            let length;
            try {
                length = path.getTotalLength();
            } catch (e) {
                return;
            }

            path.style.opacity = 1;

            // CSS変数に長さをセット
            path.style.setProperty("--pathLength", length);
            path.style.setProperty("--pathLength_minus", length * -1);
            
            // アニメーションを設定（indexを使って遅延）
            path.style.animationDelay = `${index * (1 / paths.length)}s`;
            if (path.parentElement.parentElement.classList.contains("checkBox")) {
                setTimeout(() => {
                    path.style.transition = "stroke-dashoffset .5s ease-in-out";
                });
            }

            // 各pathの境界を計算
            const bbox = path.getBBox();
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x + bbox.width);
            maxY = Math.max(maxY, bbox.y + bbox.height);
        });

        // 余白を追加
        const margin = 200;
        const x = minX - margin;
        const y = minY - margin;
        const width = (maxX - minX) + margin * 2;
        const height = (maxY - minY) + margin * 2;

        // SVG全体が収まるように設定
        svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    });
}

(() => { // スムーズスクロール (停止中)
    const scriptTag = d.createElement("script");
    scriptTag.src = "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js";
    d.head.appendChild(scriptTag);

    scriptTag.onload = () => {
        const lenis = new Lenis({
            smoothTouch: false,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    };
});

const isLocalFile = window.location.protocol !== "https:";

const getHref = (item) => `${isLocalFile ? `${item}.html` : `${item === "index" ? "./" : item}`}`;

// topBars
const topBars = d.createElement("div");
const topBar = d.createElement("div");
const topBar_menus = d.createElement("div");
const topBar_filter = d.createElement("div");

topBar.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" class="menuOpen_button">
    <g class="open">
        <g transform="matrix(1.19666,0,0,0.837145,-80.4631,-110.329)">
            <path style="transition-delay: 0s !important;"  d="M969.748,406.536L969.748,406.536L67.24,406.536Z"/>
        </g>
        <g transform="matrix(1.19666,0,0,0.837145,-80.4631,199.671)">
            <path style="transition-delay: .1s !important;" d="M969.748,406.536L969.748,406.536L67.24,406.536Z"/>
        </g>
        <g transform="matrix(1.19666,0,0,0.837145,-80.4631,509.671)">
            <path style="transition-delay: .2s !important;" d="M969.748,406.536L969.748,406.536L67.24,406.536Z"/>
        </g>
    </g>
    <g class="close">
        <g transform="matrix(0.84617,0.84617,-0.591951,0.591951,341.915,-139.383)">
            <path style="opacity: 0; transition-delay: .1s !important;" d="M969.748,406.536 L67.24,406.536 L969.748,406.536 Z"/>
        </g>
        <g transform="matrix(0.84617,-0.84617,0.591951,0.591951,-139.383,738.085)">
            <path style="opacity: 0; transition-delay: 0s !important;" d="M969.748,406.536 L67.24,406.536 L969.748,406.536 Z"/>
        </g>
    </g>
</svg>`;

topBar.querySelector(".menuOpen_button").addEventListener("click", () => {
    topBars.classList.toggle("opened");
});

[
    ["", "パンフレット", "index"],
    ["", "企画一覧", "exhibits"],
    ["", "歌詞", "lyrics"],
].forEach(item => {
    const content = d.createElement("a");
    content.className = `content ${item[0]}`;
    content.innerHTML = item[1];
    topBar.appendChild(topBar_menus);
    topBar_menus.appendChild(content);

    if (item[2]) {
        const underLine = d.createElement("div");
        underLine.className = "underLine";
        const href = getHref(item[2]);
        content.href = href;
        const fileName = window.location.href.split("/").pop();
        console.log("fileName : " + fileName, " href : " + href);
        if ((fileName == "" ? "./" : fileName) == href) {
            content.style.pointerEvents = "none";
            content.style.opacity = .5;
        }

        content.appendChild(underLine);
    }
});


topBars.className = "topBars";
topBar_filter.addEventListener("click", (e) => {
    topBars.classList.remove("opened");
});
topBar.className = "topBar button hidden";
topBar.style.opacity = 0;

topBar_menus.className = "topBar_menus";

topBar_filter.className = "topBar_filter";

d.body.appendChild(topBars);
topBars.appendChild(topBar_filter);
topBars.appendChild(topBar);

let animationNoneTimeout;
let last_isShowTopBar = false;
function showTopBarAnim(show) {
    /* topBar.style.animation = "none"; // アニメーションをリセット
    void topBar.offsetWidth; // 再描画強制（リセットを反映させるトリック） */
    
    if (show) {
        topBar.style.animation = "topBarShow 1s ease-out both";
        topBar.classList.remove("hidden");
    } else {
        /* topBar.style.animation = "topBarHidden 1s ease-out reverse both";
        topBars.classList.remove("opened");
        topBar.classList.add("hidden"); */
    }
}

// footers
const footers = d.createElement("div");
const footer = d.createElement("div");
function footer_partition () {
    const element = d.createElement("div");
    element.className = "footer_partition";
    return element;
}

footers.className = "footers";
footer.className = "footer button";

function addFooterContent (item) {
    const footer_contents = d.createElement("div");
    footer_contents.className = `content${item[1] ? ` ${item[1]}` : ""}`;

    let newItem = item;
    if (!Array.isArray(item)) newItem = [item];

    if (typeof newItem[0] === "string") {
        footer_contents.innerHTML = newItem[0];
    } else {
        footer_contents.appendChild(newItem[0]);
    }
    
    footer.appendChild(footer_contents);
}

function updateFooterContents () {
    const pageList = d.createElement("div");
    pageList.classList = "pageList";

    Object.keys(titleMap).forEach(key => {
        const a = d.createElement("a");
        const underLine = d.createElement("div");

        a.className = "content";
        a.innerHTML = titleMap[key];
        a.href = key.includes("devMode") ? "https://github.com/I026/web/tree/main/schoolFes_202510" : getHref(key);
        
        underLine.className = "underLine";

        pageList.appendChild(a);
        a.appendChild(underLine);
        // pageList.appendChild(d.createElement("br"));
    });

    const contentsArray = [
        ["広報係&nbsp;<span class='subText'>&nbsp;2025年度 学園祭</span>", "title"],
        footer_partition(),
        [pageList],
        ["<span class='name'>制作 : 中学2年1組 小暮千秋</span>", "title"],
    ];
    contentsArray.forEach(item => {
        addFooterContent(item);
    });
};

d.body.appendChild(footers);
footers.appendChild(footer);


function scrollProcess() {
    const scrollRatio = window.scrollY / window.innerHeight;

    d.documentElement.style.setProperty("--scrollPx", `${window.scrollY}px`);

    const get_isShowTopBar = () => HTMLFileName === "index" ? window.scrollY !== 0 : true;
    if (last_isShowTopBar !== get_isShowTopBar()) {
        if (HTMLFileName === "index") {
            showTopBarAnim(get_isShowTopBar());
        } else {
            topBar.style.opacity = 1;
        }
    }
    last_isShowTopBar = get_isShowTopBar();
}
scrollProcess();
window.addEventListener("scroll", scrollProcess);
window.addEventListener("DOMContentLoaded", () => {
    setPathViewBox();

    // DOM変更を監視
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            // SVG追加時または style/class 変更時に setPathViewBox
            if (
                [...mutation.addedNodes].some(node => node.nodeName === "SVG" || node.querySelector?.("svg")) ||
                mutation.target.nodeName === "SVG" ||
                (mutation.type === "attributes" && (mutation.attributeName === "style" || mutation.attributeName === "class"))
            ) {
                setPathViewBox();
                break;
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
    });
});