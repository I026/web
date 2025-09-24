function dateUpdate () {
    const nowDate = new Date();
    if (nowDate <= new Date("2025-10-26")) {
        const daysLeft = Math.ceil((new Date("2025-10-25") - nowDate) / (1000 * 60 * 60 * 24));
        let HTML = "あと&nbsp;" + "<span class='emphasisText'>" + daysLeft + "</span>" + "&nbsp;日";
        if (daysLeft < 1) {
            HTML = "開催中";
        }
        topContentButton.innerHTML = HTML;
    } else {
        topContentButton.style.display = "none";
    }
}
dateUpdate();
setInterval(dateUpdate, 10000);

(() => {
    const entries = performance.getEntriesByType("resource");
    const currentScript = entries.find(entry => entry.name.includes("script.js"));

    function loadVideo () {topTitleContent.querySelector("video").src = "./medias/videos/IMG_1478.mp4"}

    if (currentScript) {
        console.log("load : ", currentScript.duration, "ms")
        if (currentScript.duration < 500) loadVideo();
    } else {
        loadVideo();
    }
})();

(() => {
    const pagesArea = mainContent.querySelector("div.pages");
    const pageContents = [];

    function genPageSvg () {
        const page = d.createElementNS("http://www.w3.org/2000/svg", "svg");
        page.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        return page;
    }

    function loadComp () {
        mainContent.style.setProperty("--numOfPageContents", pageContents.length);
        const pageEls = [];
        pageContents.forEach((newContentEl, i) => {
            const newPage = d.createElement("div");
            newPage.className = "page";
            newPage.appendChild(newContentEl);

            newPage.style.setProperty("--contentsIndex", i);
            pagesArea.appendChild(newPage);
            pageEls.push(newPage);
        });
        pagesArea.style.position = "sticky";

        let pagesAreaWidth;
        let topBarHeight;
        let pageSlideThreshold;
        let pageSlideRatio;

        function windowResize () {
            // 横スクロール総距離
            pagesAreaWidth = pagesArea.scrollWidth - pagesArea.clientWidth;
            topBarHeight = parseFloat(getComputedStyle(d.body).getPropertyValue("--topBarHeight"));
            pageSlideThreshold = window.innerHeight - (topBarHeight || 100) * .5;
            pageSlideRatio = 1;
            mainContent.style.setProperty("--pageSlideRatio", pageSlideRatio);

            const totalHeight = pagesAreaWidth / pageSlideRatio + window.innerHeight;
            mainContent.style.setProperty("--totalHeight", totalHeight + "px");
        }
        window.addEventListener("resize", windowResize);
        windowResize();

        // 横スクロール同期
        pagesArea.addEventListener("scroll", () => {
            window.scrollTo({
                top: pageSlideThreshold + pagesArea.scrollLeft / pageSlideRatio
            });
        });

        function windowScroll () {
            const scrollY = window.scrollY;
            const scrollLeft = (Math.max(scrollY, pageSlideThreshold) - pageSlideThreshold) * pageSlideRatio;
            const scrollLeftRatio = scrollLeft / pagesAreaWidth || 0;

            pageEls[Math.round(scrollLeftRatio * pageContents.length + .45)]?.classList.add("anim");

            (() => {
                const startIdx = Math.min(Math.max(Math.round(scrollLeftRatio * pageContents.length - 2.5), 0), pageContents.length - 2);
                const lastIdx  = startIdx + 3;
                pageEls.forEach((pageEl, idx) => {
                    if (
                        (
                            idx >= startIdx
                        ) && (
                            idx <= lastIdx
                        )
                    ) {
                        pageEl.classList.add("visible");
                    } else {
                        pageEl.classList.remove("visible");
                    }
                });
            })();

            pagesArea.scrollTo({
                left: scrollLeft
            });
            pagesArea.style.setProperty("--scrollLeftRatio", scrollLeftRatio);
        }
        window.addEventListener("scroll", windowScroll);
        windowScroll();
    }

    // SVGファイルのパス
    const svgFilePaths = [
        "medias/pages/0.svg",
        "medias/pages/1.svg",
        "medias/pages/1.svg",
        "medias/pages/1.svg",
    ];

    // SVGファイルを読み込む
    let i = 0;
    function loadFile (svgFilePath) {
        fetch(svgFilePath).then(response => response.text()).then(svgText => {
            // DOMParserで文字列をパースしてSVG要素にする
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
            
            // <path>要素を取得
            const paths = svgDoc.querySelectorAll("path");

            const svg = genPageSvg();

            // 例: ページ上の別のSVGに追加する
            paths.forEach(path => {
                svg.appendChild(path.cloneNode(true));
            });
            pageContents.push(svg);

            if (svgFilePaths.length <= i + 1) {
                loadComp();
            } else {
                loadFile(svgFilePaths[i + 1]);
                i += 1;
            }
        }).catch(err => console.error(err));
    }
    loadFile(svgFilePaths[0]);
})();