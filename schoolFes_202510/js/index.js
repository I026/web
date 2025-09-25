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
            const windowHeight = window.visualViewport?.height || window.innerHeight;
            pagesAreaWidth = pagesArea.scrollWidth - pagesArea.clientWidth;
            topBarHeight = parseFloat(getComputedStyle(d.body).getPropertyValue("--topBarHeight"));
            pageSlideThreshold = windowHeight - (topBarHeight || 100) * .15;
            pageSlideRatio = 1;
            mainContent.style.setProperty("--pageSlideRatio", pageSlideRatio);

            const totalHeight = pagesAreaWidth / pageSlideRatio + windowHeight;
            mainContent.style.setProperty("--totalHeight", totalHeight + "px");
        }
        let lastTimeWindowHeight;
        window.addEventListener("resize", () => {
            if (Math.abs(lastTimeWindowHeight - window.innerHeight) > 100) windowResize();
            lastTimeWindowHeight = window.innerHeight;
        });
        windowResize();

        (() => {
            let touchStartScrollY;
            let touchStartPos = [];
            let lastMoveTime = 0;
            let lastMoveX = 0;
            let velocityX = 0;

            pagesArea.addEventListener("touchstart", e => {
                const client = [e.touches[0].clientX, e.touches[0].clientY];
                touchStartPos = [client[0], client[1]];
                touchStartScrollY = window.scrollY;
                lastMoveX = client[0];
                lastMoveTime = Date.now();
                velocityX = 0; // 初期化
            });

            let isSlideValid = false;

            pagesArea.addEventListener("touchmove", e => {
                const client = [e.touches[0].clientX, e.touches[0].clientY];
                const now = Date.now();

                // 前回との距離と時間差で速度を計算
                const deltaX = lastMoveX - client[0];
                const deltaTime = now - lastMoveTime;

                if (deltaTime > 0) {
                    velocityX = deltaX / deltaTime; // px/ms
                }

                const difference = [
                    touchStartPos[0] - client[0],
                    touchStartPos[1] - client[1]
                ];
                if (!touchStartScrollY) touchStartScrollY = window.scrollY;
                if (
                    Math.abs(difference[0]) > 5 &&
                    Math.abs(difference[1]) < 30
                ) {
                    isSlideValid = true;
                    window.scrollTo({
                        top: touchStartScrollY + difference[0] + (difference[0] > 0 ? -5 : 5)
                    });
                }
            });

            pagesArea.addEventListener("touchend", () => {
                if (!isSlideValid) return;
                touchStartScrollY = null;
                isSlideValid = false;
                const deceleration = 0.0035; // 減速率(px/ms²) 小さいほど長く続く
                let lastTime = Date.now();
                let currentVelocity = velocityX; // touchmoveで計算している速度(px/ms)

                function inertiaScroll() {
                    const now = Date.now();
                    const deltaTime = now - lastTime;
                    lastTime = now;

                    // 距離 = 速度 × 時間
                    const distance = currentVelocity * deltaTime;

                    // 現在のスクロール位置を加算
                    window.scrollTo({
                        top: window.scrollY + distance
                    });

                    // 摩擦で徐々に減速
                    if (currentVelocity > 0) {
                        currentVelocity = Math.max(0, currentVelocity - deceleration * deltaTime);
                    } else {
                        currentVelocity = Math.min(0, currentVelocity + deceleration * deltaTime);
                    }

                    // 速度が小さくなったら終了
                    if (Math.abs(currentVelocity) > 0.07) {
                        requestAnimationFrame(inertiaScroll);
                    }
                }

                if (Math.abs(currentVelocity) > .7) { // 一定速度以上なら惰性開始
                    requestAnimationFrame(inertiaScroll);
                }
            });
        })();

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
    const filePaths = [
        "./medias/pages/0.png",
        "./medias/pages/0.png",
        "./medias/pages/0.png",
    ];

    // SVGファイルを読み込む
    let i = 0;
    function next () {
        if (filePaths.length <= i + 1) {
            loadComp();
        } else {
            loadFile(filePaths[i + 1]);
            i += 1;
        }
    }

    function loadFile (filePath) {
        if (filePath.includes(".svg")) {
            fetch(filePath).then(response => response.text()).then(svgText => {
                // DOMParserで文字列をパースしてSVG要素にする
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

                const svg = genPageSvg();

                // <path>要素と<image>要素をまとめて取得
                const elements = svgDoc.querySelectorAll("path, image");

                // 取得した要素を追加
                elements.forEach(el => {
                    svg.appendChild(el.cloneNode(true));
                });

                pageContents.push(svg);
                next();
            }).catch(err => console.error(err));
        } else {
            setTimeout(() => {
                const img = d.createElement("img");
                img.src = filePath;
                pageContents.push(img);
                next();
            });
        }
    }
    loadFile(filePaths[0]);
})();