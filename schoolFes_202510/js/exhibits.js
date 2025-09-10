import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const exhibitsBottomBar = d.querySelector(".exhibits .sortList");
const exhibitsArea = d.querySelector(".exhibits .list");

const getClassName = (school, input_grade, input_class) => (
    `${school == "H" || input_class > 3 ? "高校" : "中学"} ${input_grade}年${input_class}組`
)
const exhibits = {
    J1_1: {
        name: "(テスト文)",
        location: getClassName("J", 1, 1),
        description: "(テスト文)",
        tag: [
            "byClass",
            "J1",
        ],
    },
    J1_2: {
        name: "(テスト文)",
        location: getClassName("J", 1, 2),
        description: "(テスト文)",
        tag: [
            "byClass",
            "J1",
        ],
    },
    J1_3: {
        name: "(テスト文)",
        location: getClassName("J", 1, 3),
        description: "(テスト文)",
        tag: [
            "byClass",
            "J1",
        ],
    },
    J2_1: {
        name: "お化け屋敷",
        location: getClassName("J", 2, 1),
        description: "怖いお化けが出る屋敷",
        tag: [
            "byClass",
            "J2",
            "attractions",
        ],
    },
    J2_2: {
        name: "サービスエリア",
        location: getClassName("J", 2, 2),
        description: "(テスト文)",
        tag: [
            "byClass",
            "J2",
            "foods",
            "merchandise",
            "attractions",
        ],
    },
    J2_3: {
        name: "SASUKE",
        location: getClassName("J", 2, 3),
        description: "(テスト文)",
        tag: [
            "byClass",
            "J2",
            "attractions",
        ],
    },
}
const getExhibits = (n) => ([ Object.keys(exhibits)[n], Object.values(exhibits)[n] ])
const exhibitsLength = Object.keys(exhibits).length;
const tagGroups = {
    project: {
        isMultSel: false
    },
    genre: {
        isMultSel: true
    },
    grade: {
        isMultSel: false
    }
};
const tagOrder = {
    resetButton: {
        displayName: "すべて解除",
        themeColor: "gray",
        isButton: true
    },
    byClass: {
        displayName: "クラス企画",
        themeColor: "orange",
        group: tagGroups.project
    },
    byVolunteers: {
        displayName: "有志企画",
        themeColor: "tan",
        group: tagGroups.project
    },
    announcement: {
        displayName: "発表",
        themeColor: "orchid",
        group: tagGroups.genre
    },
    foods: {
        displayName: "飲食",
        themeColor: "crimson",
        group: tagGroups.genre
    },
    merchandise: {
        displayName: "物販",
        themeColor: "lightcoral",
        group: tagGroups.genre
    },
    attractions: {
        displayName: "アトラクション",
        themeColor: "skyblue",
        group: tagGroups.genre
    },
    display: {
        displayName: "展示",
        themeColor: "lightseagreen",
        group: tagGroups.genre
    },
    J1: {
        displayName: "中学1年",
        themeColor: "gray",
        group: tagGroups.grade
    },
    J2: {
        displayName: "中学2年",
        themeColor: "gray",
        group: tagGroups.grade
    },
    J3: {
        displayName: "中学3年",
        themeColor: "gray",
        group: tagGroups.grade
    },
    H1: {
        displayName: "高校1年",
        themeColor: "slategray",
        group: tagGroups.grade
    },
    H2: {
        displayName: "高校2年",
        themeColor: "slategray",
        group: tagGroups.grade
    },
    H3: {
        displayName: "高校3年",
        themeColor: "slategray",
        group: tagGroups.grade
    },
};
for (let i = 0; i < exhibitsLength; i += 1) {
    const tile = d.createElement("div");
    const names = d.createElement("div");
    const description = d.createElement("div");
    const locationMap = d.createElement("div");
    const tags = d.createElement("div");

    tile.style.animation = "tag_show .5s both";
    tile.style.animationDelay = `${i * 0.1}s`;
    tile.className = "tile";

    names.innerHTML = `${getExhibits(i)[1].name}<span class="subText">場所 : ${getExhibits(i)[1].location}</span>`;
    names.classList.add("names");
    
    description.innerHTML = `<span>${getExhibits(i)[1].description}</span>`;
    description.classList.add("description");

    locationMap.className = "locationMap";

    let displayTagNames = [];
    const usedTags = new Set();

    Object.keys(tagOrder).forEach((tag) => {
        if (!getExhibits(i)[1].tag.includes(tag) || usedTags.has(tag)) return;
        usedTags.add(tag);
        displayTagNames.push([tag, tagOrder[tag].displayName, tagOrder[tag].themeColor]);
    });
    displayTagNames.forEach(item => {
        const tag = d.createElement("span");
        tag.innerHTML = item[1];
        tag.style.backgroundColor = item[2];
        tag.className = "tag";
        tag.setAttribute(`tag_${item[0]}`, "");
        tags.appendChild(tag);
    });
    displayTagNames.map(subArr => subArr[0]).forEach(item => {
        tile.setAttribute(`tag_${item}`, "");
    });
    tags.classList.add("tags");

    
    tile.addEventListener("click", () => {
        const allTiles = exhibitsArea.querySelectorAll(".tile");
        allTiles.forEach(element => {
            if (element !== tile) element.classList.remove("opened");
        });
        tile.classList.toggle("opened");
    });

    tile.appendChild(names);
    tile.appendChild(description);
    tile.appendChild(locationMap);
    tile.appendChild(tags);
    exhibitsArea.appendChild(tile);
}

function sortUpdate () {
    let conditions = [];
    (() => {
        const checkedTags = exhibitsBottomBar.querySelectorAll(".tag.checkedBox:not([isButton])");
        checkedTags.forEach(element => {
            conditions.push(element.getAttribute("tag"));
        });
    })();

    (() => {
        let selector = `[tag_${conditions[0]}]`;

        conditions.forEach(condition => {
            selector += `[tag_${condition}]`;
        });

        const allTiles = exhibitsArea.querySelectorAll(".tile");
        allTiles.forEach(element => {
            element.style.display = `${conditions[0] ? "none" : "flex"}`;
            element.classList.remove("topTileStyle");
            element.classList.remove("lowestTileStyle");
        });

        const targetElements = exhibitsArea.querySelectorAll(selector);
        targetElements.forEach(element => {
            element.style.opacity = 1;
            element.style.display = "flex";
        });

        conditions.forEach(condition => {
            exhibitsArea.querySelectorAll(`.tags [tag_${condition}]`).forEach(element => {
                element.style.opacity = 1;
            });
        });

        // 角丸系
        const activeAllTiles = Array.from(allTiles).filter(tile => 
            tile.style.display != "none"
        );

        console.log(activeAllTiles);
        if (activeAllTiles[0]) {
            activeAllTiles[0].classList.add("topTileStyle");
        }
        if (activeAllTiles[activeAllTiles.length - 1]) {
            activeAllTiles[activeAllTiles.length - 1].classList.add("lowestTileStyle");
        }
    })();
}

sortUpdate();

function getBarOptionsHeight () {
    let barOptionsHeight = 0;
    exhibitsBottomBar.querySelectorAll(':scope > *:not(.content)').forEach(element => {
        barOptionsHeight += element.offsetHeight
    });
    return barOptionsHeight;
}

function marginBottomUpdate (isToOpen = exhibitsBottomBar.classList.contains("opened")) {
    if (isToOpen) {
        const areaHeight = getBarOptionsHeight() + exhibitsBottomBar.querySelector(".content > div.nowShow").offsetHeight;

        exhibitsBottomBar.style.setProperty("--bottomBarHeight", `${areaHeight}px`);
        exhibitsBottomBar.classList.add("opened");
    } else {
        exhibitsBottomBar.style.setProperty("--bottomBarHeight", `${getBarOptionsHeight()}px`);
        exhibitsBottomBar.classList.remove("opened");
    }
}

const bottomBar_contents = d.createElement("div");
const sortList_topBar = d.createElement("div");
const sortList_tabs = d.createElement("div");

(() => {
    bottomBar_contents.className = "content";
    sortList_topBar.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M228.451,230.092L228.451,850.906L849.265,850.906"/>
                    </g>
                    <g class="close">
                        <path d="M228.451,230.092L228.451,850.906L849.265,850.906"/>
                    </g>
                </svg>`;
    sortList_topBar.className = "topBar";

    sortList_tabs.className = "tabs";

    function tabSelectedUpdate (tab) {
        sortList_tabs.querySelectorAll(".tab").forEach(tab => {
            tab.classList.remove("selected");
        });

        tab.classList.add("selected");
    }

    [
        "絞り込み",
        "地図",
    ].forEach((item, index) => {
        const tab = d.createElement("div");

        tab.className = "tab";
        tab.innerHTML = item;

        function tabClicked () {
            tabSelectedUpdate(tab);
            const contents = exhibitsBottomBar.querySelectorAll(".content > div");
            contents.forEach(content => {
                content.classList.remove("nowShow");
            });
            contents[index].classList.add("nowShow");
            bottomBar_contents.scrollTo({
                top: 0,
                left: index * bottomBar_contents.scrollWidth,
                behavior: "smooth"
            });
            marginBottomUpdate(true);
        }

        tab.addEventListener("click", tabClicked);

        sortList_tabs.appendChild(tab);

        setTimeout(() => {
            if (index === 0) tabClicked();
        });
    });

    bottomBar_contents.addEventListener("scroll", () => {
        const tab = sortList_tabs.querySelectorAll(".tab");
        if (Math.round(bottomBar_contents.scrollLeft) % sortList_tabs.scrollWidth === 0) {
            tabSelectedUpdate(tab[Math.round(bottomBar_contents.scrollLeft / sortList_tabs.scrollWidth)]);
        }
    });

    exhibitsBottomBar.appendChild(sortList_topBar);
    exhibitsBottomBar.appendChild(sortList_tabs);

    exhibitsBottomBar.appendChild(bottomBar_contents);
})();

(() => { // exhibitsBottomBar contents
    // listView
    const listView = d.createElement("div");
    listView.className = "tags listView";
    bottomBar_contents.appendChild(listView);

    Object.keys(tagOrder).forEach(tag => {
        const newTag = d.createElement("span");
        newTag.className = "tag";
        // newTag.className = "tag checkedBox";
        newTag.style.backgroundColor = tagOrder[tag].themeColor;
        newTag.textContent = tagOrder[tag].displayName;
        newTag.setAttribute("tag", tag);
        if (tagOrder[tag].group) {
            const groupKey = Object.keys(tagGroups).find(key => tagGroups[key] === tagOrder[tag].group);
            newTag.setAttribute("group", groupKey);
        }
        if (tagOrder[tag].group) newTag.setAttribute("isMultSel", tagOrder[tag].group.isMultSel);
        if (tagOrder[tag].isButton) newTag.setAttribute("isButton", "");

        function generateCheckBox () {
            const checkBox = d.createElement("div");
            checkBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><path d="M239.48,469.289 L416.256,646.066 L840.52,221.802"/></svg>`;
            checkBox.className = "checkBox";
            newTag.appendChild(checkBox);
            setPathViewBox();
        }
        listView.appendChild(newTag);

        if (tagOrder[tag].isButton) {
            newTag.classList.add("checkedBox");
        } else {
            generateCheckBox();
        }

        const get_isButton = () => tagOrder[tag].isButton;

        function updateResetButton (pushed = false) {
            const resetButton = exhibitsBottomBar.querySelector(".tags.listView .tag[tag='resetButton']");
            const tagElements = exhibitsBottomBar.querySelectorAll(".tags.listView .tag:not([isButton=''])");
            const tag_isCheckeds = [];
            tagElements.forEach(tag => {
                tag_isCheckeds.push(tag.classList.contains("checkedBox"));
            });

            // console.log(tag_isCheckeds);
            const isAllSelected = tag_isCheckeds.every(item => item === false);
            if (isAllSelected) { // すべてのタグが選ばれていない
                resetButton.classList.remove("checkedBox");
            } else {
                if (pushed) {
                    tagElements.forEach(tag => {
                        tag.classList.remove("checkedBox");
                    });
                }
                resetButton.classList.add("checkedBox");
            }
        }
        updateResetButton();

        function tagClicked () {
            if (get_isButton()) {
                updateResetButton(true);
            } else {
                newTag.classList.toggle("checkedBox");
                if (newTag.getAttribute("isMultSel")) {
                    listView.querySelectorAll(`.tag[group='${newTag.getAttribute("group")}'][isMultSel='false']`).forEach(tag => {
                        if (tag !== newTag) {
                            tag.classList.remove("checkedBox");
                        }
                    });
                }
            }
            updateResetButton();
            sortUpdate();
        }
        newTag.addEventListener("click", (e) => {
            tagClicked();
        });
    });

    // mapsView
    const mapsView = d.createElement("div");
    mapsView.className = "mapsView";
    bottomBar_contents.appendChild(mapsView);

    (() => {
        const scene = new THREE.Scene();
        scene.background = null; // 背景色

        const camera = new THREE.PerspectiveCamera(
            65, 
            window.innerWidth / window.innerHeight, 
            0.1,
            1000
        );
        camera.position.set(0, 1.5, 3);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth * .5, window.innerHeight * 0.5);

        // 描画領域を mapsView に追加
        mapsView.appendChild(renderer.domElement);

        // 照明
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        scene.add(light);

        // 環境光
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        // 3Dモデル読み込み
        const loader = new GLTFLoader();
        let model; // モデルを外で保持
        loader.load(
            'medias/3ds/sc.glb',
            (gltf) => {
                model = gltf.scene;
                model.position.set(0, 0, 0);
                scene.add(model);

                // モデルが読み込まれたら OrbitControls の注視点をモデル中心に設定
                controls.target.set(model.position.x, model.position.y, model.position.z);
                controls.update();
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('モデル読み込みエラー', error);
            }
        );

        // OrbitControls 初期化
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // 慣性スクロール
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 2; // カメラが地面の下に回り込まないよう制限

        // 描画ループ
        function animate() {
            requestAnimationFrame(animate);
            controls.update(); // enableDamping を使う場合は毎フレーム更新
            renderer.render(scene, camera);
        }
        animate();

        // ウィンドウリサイズ対応
        function onWindowResize() {
            const width = mapsView.clientWidth;
            const height = mapsView.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
        }

        window.addEventListener('resize', onWindowResize);
        onWindowResize(); // 初期表示時にも呼ぶ
    })();
})();

(() => {
    let touchStartPos = [0, 0];
    let currentPos = [];
    let difference = [0, 0];

    exhibitsBottomBar.style.transition = "opacity .5s ease-in-out";

    let sortListTransition = exhibitsBottomBar.style.transition;
    const getMarginBottomPx = () => (
        window.getComputedStyle(exhibitsBottomBar).height.replace("px", "") * 1
    );
    let touchStart_height = getMarginBottomPx();
    
    sortList_topBar.querySelector("svg path").style.strokeDashoffset = "var(--pathLength)";
    setTimeout(() => {
        sortList_topBar.querySelector("svg path").style.strokeDashoffset = "";
    }, 50);

    let isHolded = false;

    exhibitsBottomBar.addEventListener("touchstart", (e) => {
        exhibitsBottomBar.classList.add("nowBeingHeld");
        exhibitsBottomBar.style.transition = "none";
        difference = [0, 0];
        const touch = e.touches[0];
        touchStartPos = [touch.clientX, touch.clientY];
        touchStart_height = getMarginBottomPx();
        exhibitsBottomBar.classList.remove("reduced");
    });

    exhibitsBottomBar.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        currentPos = [touch.clientX, touch.clientY];
        const holdStartThreshold = 50;
        if (
            Math.abs(touchStartPos[1] - currentPos[1]) > holdStartThreshold &&
            Math.abs(touchStartPos[0] - currentPos[0]) < holdStartThreshold &&
            ([sortList_topBar, ...sortList_tabs.querySelectorAll(".tab")].includes(e.target) || !!exhibitsBottomBar.querySelector(".content > div.nowShow:not(.mapsView)"))
        ) isHolded = true;

        difference = [touchStartPos[0] - currentPos[0], touchStartPos[1] - currentPos[1]];
        if (isHolded) {
            exhibitsBottomBar.style.setProperty("--bottomBarHeight", `${touchStart_height + difference[1] + (difference[1] < 0 ? holdStartThreshold : -holdStartThreshold)}px`);
        }
    });

    marginBottomUpdate(false);

    let lastTouchendTime = Date.now();

    function touchend (e) {
        exhibitsBottomBar.classList.remove("nowBeingHeld");
        if (Date.now() - lastTouchendTime < 50) return;
        exhibitsBottomBar.style.transition = `${sortListTransition === "" || sortListTransition === "none" ? "" : `${sortListTransition}, `}height .4s ease-out`;
        const isNowOpen = exhibitsBottomBar.classList.contains("opened");
        console.log("isNowOpen : ", isNowOpen);
        if (Math.abs(difference[1]) !== 0 || e?.target === sortList_topBar) {
            if (e?.target === sortList_topBar && Math.abs(difference[1]) === 0) { // topBarTap
                marginBottomUpdate( !isNowOpen );
            } else if (isHolded) { // swipe
                console.log("Math.abs(difference[1])", Math.abs(difference[1]));
                const threshold = 100;
                marginBottomUpdate( isNowOpen ? difference[1] * -1 < threshold : difference[1] > threshold );
            }
        }
        isHolded = false;
        lastTouchendTime = Date.now();
    }
    exhibitsBottomBar.addEventListener("mouseup",  e => {
        difference = [0, 0];
        touchStart_height = getMarginBottomPx();
        touchend(e);
    });
    exhibitsBottomBar.addEventListener("touchend", e => touchend(e));
})();


let lastScrollTime = Date.now();
let lastScrollPx;

window.addEventListener("scroll", () => { // sortListAreaHeight
    const scrollRatio = window.scrollY / window.innerHeight;

    if (d.documentElement.scrollHeight < window.innerHeight + window.scrollY + 100) {
        exhibitsBottomBar.style.opacity = 0;
        exhibitsBottomBar.style.pointerEvents = "none";
    } else {
        exhibitsBottomBar.style.opacity = 1;
        exhibitsBottomBar.style.pointerEvents = "auto";
    }

    // if (Math.abs(lastScrollPx - window.scrollY) > 200) marginBottomUpdate(false);

    console.log(Date.now() - lastScrollTime + " ms差")
    if (Date.now() - lastScrollTime > 20) lastScrollPx = window.scrollY;
    lastScrollTime = Date.now();
});

(() => {
    const element = exhibitsBottomBar.querySelector(".tags.listView");
    function process () {
        exhibitsBottomBar.classList.remove("reduced");
    }
    element.addEventListener("click", process);
})();