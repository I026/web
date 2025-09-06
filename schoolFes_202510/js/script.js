const d = document;
const topContentButton = d.querySelector(".content.top .button");
const topTitleContent  = d.querySelector(".content.topTitle");

const sortListArea = d.querySelector(".exhibits .sortList");
const exhibitsArea = d.querySelector(".exhibits .list");

let HTMLFileName = window.location.pathname.split("/").pop().split(".")[0];
if (HTMLFileName == "") HTMLFileName = "index";

(() => { // title
    const titleMap = {
        index: "デジタルパンフレット",
        exhibits: "企画一覧",
    };
    
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

(() => { // style
    const link_style = d.createElement("link");
    const link_customStyle = d.createElement("link");

    link_style.rel = "stylesheet";
    link_style.href = "./css/style.css";

    link_customStyle.rel = "stylesheet";
    link_customStyle.href = `./css/${HTMLFileName}.css`;

    d.head.appendChild(link_style);
    d.head.appendChild(link_customStyle);
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
            let path_idx = 0;
            paths.forEach(path => {
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                path.style.opacity = 1;

                setTimeout(() => {
                    path.style.strokeDashoffset = 0;
                }, 10);

                path_idx += 1;
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