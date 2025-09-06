const d = document;
const topContentButton = d.querySelector(".content.top .button");
const topTitleContent  = d.querySelector(".content.topTitle");

const sortListArea = d.querySelector(".exhibits .sortList");
const exhibitsArea = d.querySelector(".exhibits .list");

let HTMLFileName = window.location.pathname.split("/").pop().split(".")[0];
if (HTMLFileName == "") HTMLFileName = "index";

const titleMap = {
    index: "デジタルパンフレット",
    exhibits: "企画一覧",
};

(() => { // title
    
    const title = d.createElement("title");
    title.textContent = `学園祭${titleMap[HTMLFileName] ? ` : ${titleMap[HTMLFileName]}` : ""}`;
    d.head.appendChild(title);
    console.log("title");
})();

(() => { // lang
    console.log("lang");
    d.querySelector("html").lang = "ja";

    const meta_charset = d.createElement("meta");
    const meta_viewport = d.createElement("meta");
    
    meta_charset.setAttribute("charset", "UTF-8")

    meta_viewport.name = "viewport";
    meta_viewport.content = "width=device-width, initial-scale=1.0";
    
    d.head.appendChild(meta_charset);
    d.head.appendChild(meta_viewport);
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
    loader.style.animationDelay = ".25s";

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
        new Promise(resolve => link_style.addEventListener("load", resolve)),
        new Promise(resolve => link_customStyle.addEventListener("load", resolve)),
    ]).then(() => {
        loadingScreen.style.opacity = 0;
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    });
})();

(() => { // js
    const script_customJS = d.createElement("script");
    
    script_customJS.src = `./js/${HTMLFileName}.js`;
    
    d.head.appendChild(script_customJS);
    console.log("js");
})();

(() => { // pathsごとのviewBox設定
    window.addEventListener("DOMContentLoaded", () => {
        const svgs = d.querySelectorAll("svg");
        svgs.forEach(svg => {
            const paths = svg.querySelectorAll("path");

            // path の長さや stroke-dasharray 初期化
            paths.forEach((path, index) => {
                const length = path.getTotalLength();

                // strokeDasharray と offset を設定
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                path.style.opacity = 1;

                // CSS変数に長さをセット
                path.style.setProperty("--pathLength", length);

                // アニメーションを設定（indexを使って遅延）
                path.style.animation = `drawPath 2s ease forwards`;
                path.style.animationDelay = `${index * 0.1}s`; // パスごとに0.5秒ずつ遅らせる
            });

            // 各svgごとのバウンディングボックス計算
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            paths.forEach(path => {
                const bbox = path.getBBox();
                if (bbox.x < minX) minX = bbox.x;
                if (bbox.y < minY) minY = bbox.y;
                if (bbox.x + bbox.width > maxX) maxX = bbox.x + bbox.width;
                if (bbox.y + bbox.height > maxY) maxY = bbox.y + bbox.height;
            });

            const margin = 200; // 余白
            svg.setAttribute(
                "viewBox",
                `${minX - margin} ${minY - margin} ${maxX - minX + margin * 2} ${maxY - minY + margin * 2}`
            );
        });

        // トップタイトルの幅をCSS変数にセット
        const topTitleContent = d.querySelector(".content.topTitle");
        function windowResizeHandler() {
            topTitleContent?.style.setProperty("--titleImageWidth", topTitleContent.clientWidth + "px");
        }
        windowResizeHandler();
        window.addEventListener("resize", windowResizeHandler);
    });
})();

(() => { // スムーズスクロール
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
})();

// topBars
const topBars = d.createElement("div");
const topBar = d.createElement("div");
const topBar_menus = d.createElement("div");
const topBar_filter = d.createElement("div");

[
    ["menuOpen_button", "Menu"],
    ["exhibits_button", "企画一覧"],
].forEach(item => {
    const content = d.createElement("div");
    content.className = `content ${item[0]}`;
    content.innerHTML = item[1];
    topBar.appendChild(topBar_menus);
    topBar_menus.appendChild(content);

    switch (item[0]) {
        case "menuOpen_button":
            content.addEventListener("click", () => {
                topBars.classList.toggle("opened");
            });
            break;
    }
});

topBars.className = "topBars";
topBar_filter.addEventListener("click", (e) => {
    console.log(e.target);
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
    topBar.style.animation = "none"; // アニメーションをリセット
    void topBar.offsetWidth; // 再描画強制（リセットを反映させるトリック）
    
    if (show) {
        topBar.style.animation = "topBarShow 1s ease-out both";
        topBar.classList.remove("hidden");
    } else {
        topBar.style.animation = "topBarHidden 1s ease-out reverse both";
        topBars.classList.remove("opened");
        topBar.classList.add("hidden");
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

(() => {
    const pageList = d.createElement("div");
    pageList.classList = "pageList";

    Object.keys(titleMap).forEach(key => {
        const a = d.createElement("a");
        const underLine = d.createElement("div");

        a.className = "content";
        a.innerHTML = titleMap[key];
        a.href = `${window.location.protocol === "file:" ? `${key}.html` : `${key === "index" ? "./" : key}`}`;
        
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
    contentsArray.forEach((item, i) => {
        const footer_contents = d.createElement("div");
        footer_contents.className = `content${item[1] ? ` ${item[1]}` : ""}`;

        let newItem = item;
        if (!item[0]) newItem = [item];

        if (typeof newItem[0] === "string") {
            footer_contents.innerHTML = newItem[0];
        } else {
            footer_contents.appendChild(newItem[0]);
        }
        
        footer.appendChild(footer_contents);
    });
})();

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