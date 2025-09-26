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
    const arrow = d.querySelector(".top.content .bottomBar svg");
    arrow.addEventListener("click", () => {
        window.scrollTo({
            top: window.innerHeight - 50,
            behavior: "smooth",
        });
    });
})();

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
            const newPageSet = d.createElement("div");
            newPageSet.className = "pageSet";
            newPageSet.style.setProperty("--contentsIndex", i);
            pagesArea.appendChild(newPageSet);

            const newPage = d.createElement("div");
            newPage.className = "page";
            newPage.appendChild(newContentEl);
            newPageSet.appendChild(newPage);

            const newNoble = d.createElement("div");
            newNoble.className = "noble";
            newPageSet.appendChild(newNoble);

            const newNobleText = d.createElement("span");
            newNobleText.textContent = `P${i + 1}`;
            newNoble.appendChild(newNobleText);

            pageEls.push(newPageSet);
        });
        pagesArea.style.position = "sticky";

        let topBarHeight;
        const getPagesAreaWidth = () => pagesArea.scrollWidth - pagesArea.clientWidth;
        let windowHeight;
        const getWindowHeight = () => windowHeight;
        const getPageSlideThreshold = () => getWindowHeight() - (topBarHeight || 100) * .1;
        const pageSlideRatio = 1;

        let scrollLeftPx;
        let scrollLeftRatio;

        let isSlideNow = false;
        const getCurrentPageIdx = () => Math.round(scrollLeftRatio * pageContents.length);

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
                    e.preventDefault();
                    isSlideValid = true;
                    window.scrollTo({
                        top: touchStartScrollY + difference[0] + (difference[0] > 0 ? -5 : 5),
                        behavior: "smooth"
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

                    const scrollY = window.scrollY;

                    // 現在のスクロール位置を加算
                    window.scrollTo({
                        top: scrollY + distance,
                        behavior: "smooth"
                    });

                    // 摩擦で徐々に減速
                    if (currentVelocity > 0) {
                        currentVelocity = Math.max(0, currentVelocity - deceleration * deltaTime);
                    } else {
                        currentVelocity = Math.min(0, currentVelocity + deceleration * deltaTime);
                    }

                    // 速度が小さくなったら終了
                    if (Math.abs(currentVelocity) > 0.07 && (scrollY / window.innerHeight > 1)) {
                        // requestAnimationFrame(inertiaScroll);
                    }
                }

                if (Math.abs(currentVelocity) > .7) { // 一定速度以上なら惰性開始
                    requestAnimationFrame(inertiaScroll);
                }
            });
        });

        const getScrollLeftPx     = (scrollY) => (Math.max(scrollY, getPageSlideThreshold()) - getPageSlideThreshold()) * pageSlideRatio;
        const getScrollYFromRatio = (ratio)   => (ratio * (pagesArea.scrollWidth - pagesArea.clientWidth) / pageSlideRatio) + getPageSlideThreshold();

        const pageButtons = pagesArea.querySelectorAll(".buttons .button");

        let lastSlideAt = 0;
        function pageSlide (isToNext = true) {
            // 現在ページを基準に移動
            const currentIndex = getCurrentPageIdx();
            const nextIndex = Math.max(Math.min(currentIndex + (isToNext ? 1 : -1), pageContents.length - 1), 0);
            let targetIndex = currentIndex;
            targetIndex += isToNext ? 1 : -1;      // 次のページ

            // ページ範囲内に収める
            targetIndex = Math.max(0, Math.min(pageContents.length - 1, targetIndex));

            const getIsSlideValid = (index = currentIndex) => (
                (!isToNext && index !== 0) || (isToNext && index !== pageContents.length)
            );

            if (getIsSlideValid()) {
                if ((Date.now() - lastSlideAt) > 100) {
                    // スクロール位置をスナップ
                    window.scrollTo({
                        top: getScrollYFromRatio(targetIndex / pageContents.length),
                        behavior: "smooth"
                    });
                    lastSlideAt = Date.now();
                }
            }
        }

        (() => {
            let touchStartScrollY;
            let touchStartPos = [];
            let lastMoveX = 0;
            let velocityX = 0;
            let isSlideValid = false;
            let difference;

            pagesArea.addEventListener("touchstart", e => {
                const client = [e.touches[0].clientX, e.touches[0].clientY];
                difference = [0, 0];
                touchStartPos = [client[0], client[1]];
                touchStartScrollY = window.scrollY;
                lastMoveX = client[0];
                velocityX = 0; // 初期化
            });

            pagesArea.addEventListener("touchmove", e => {
                const client = [e.touches[0].clientX, e.touches[0].clientY];

                difference = [
                    touchStartPos[0] - client[0],
                    touchStartPos[1] - client[1]
                ];
                if (!touchStartScrollY) touchStartScrollY = window.scrollY;
            });

            pagesArea.addEventListener("touchend", () => {
                const difX = difference?.[0];
                const difY = difference?.[1];

                if (
                    Math.abs(difX) > 50 &&
                    difY < 50 &&
                    window.innerWidth < 800
                ) {
                    pageSlide(difX > 50)
                }
            });
        })();

        pageButtons.forEach((button, i) => {
            if (i === 0) {
                button.addEventListener("click", () => {
                    pageSlide(false);
                });
            }
            if (i === 1) {
                button.addEventListener("click", () => {
                    pageSlide(true);
                });
            }
        });

        function windowScroll () {
            const scrollY = window.scrollY;
            scrollLeftPx = getScrollLeftPx(scrollY);
            scrollLeftRatio = scrollLeftPx / getPagesAreaWidth() || 0;

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
            });

            pagesArea.scrollTo({
                left: scrollLeftPx
            });
            pagesArea.style.setProperty("--scrollLeftPx", scrollLeftPx + "px");
            pagesArea.style.setProperty("--scrollLeftRatio", scrollLeftRatio);

            pageButtons[0].classList.remove("invalid");
            pageButtons[1].classList.remove("invalid");
            if (getCurrentPageIdx() >= pageContents.length - 1) {
                pageButtons[1].classList.add("invalid");
            }
            if (getCurrentPageIdx() <= 0) {
                pageButtons[0].classList.add("invalid");
            }
        }
        window.addEventListener("scroll", windowScroll);
        windowScroll();

        function windowResize () {
            if (isSlideNow) return;
            // 横スクロール総距離
            windowHeight = window.visualViewport?.height || window.innerHeight;
            topBarHeight = parseFloat(getComputedStyle(d.body).getPropertyValue("--topBarHeight"));
            mainContent.style.setProperty("--pageSlideRatio", pageSlideRatio);
            const totalHeight = getPagesAreaWidth() / pageSlideRatio + getWindowHeight();
            mainContent.style.setProperty("--totalHeight", totalHeight + "px");
        }
        let lastTimeWindowHeight;
        window.addEventListener("resize", () => {
            if (Math.abs(lastTimeWindowHeight - window.innerHeight) > 100) windowResize();
            lastTimeWindowHeight = window.innerHeight;
        });
        windowResize();
    }

    // SVGファイルのパス
    const filePaths = [
        "./medias/pages/0.png",
        "./medias/pages/0.png",
        "./medias/pages/0.png",
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