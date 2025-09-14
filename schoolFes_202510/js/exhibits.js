import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";

/* import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js"; */

const exhibitsBottomBar = d.querySelector(".exhibits .sortList");
const exhibitsArea = d.querySelector(".exhibits .list");

exhibitsBottomBar.addEventListener("wheel", e => {
    e.preventDefault();
    e.stopPropagation();
}, { passive: false });

const getClassName = (school, input_grade, input_class) => (
    `${school == "H" || input_class > 3 ? "高校" : "中学"} ${input_grade}年${input_class}組`
)
const exhibits = {
    J1_1: {
        name: "(テスト文)",
        description: "(テスト文)",
        location: {
            name: ""
        },
        tag: [
            "byClass",
            "J1",
        ],
    },
    J1_2: {
        name: "(テスト文)",
        description: "(テスト文)",
        location: {
            name: ""
        },
        tag: [
            "byClass",
            "J1",
        ],
    },
    J1_3: {
        name: "(テスト文)",
        description: "(テスト文)",
        location: {
            name: ""
        },
        tag: [
            "byClass",
            "J1",
        ],
    },
    J2_1: {
        name: "お化け屋敷",
        description: "怖いお化けが出る屋敷",
        location: {
            name: ""
        },
        tag: [
            "byClass",
            "J2",
            "attractions",
        ],
    },
    J2_2: {
        name: "サービスエリア",
        description: "(テスト文)",
        location: {
            name: ""
        },
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
        description: "(テスト文)",
        location: {
            name: ""
        },
        tag: [
            "byClass",
            "J2",
            "attractions",
        ],
    },
    J3_1: {
        name: "(テスト文)",
        description: "(テスト文)",
        location: {
            name: "",
            map: "J3_1"
        },
        tag: [
            "byClass",
            "J3",
        ],
    },
    J3_2: {
        name: "(テスト文)",
        description: "(テスト文)",
        location: {
            name: ""
        },
        tag: [
            "byClass",
            "J3",
        ],
    },
    J3_3: {
        name: "(テスト文)",
        description: "(テスト文)",
        location: {
            name: ""
        },
        tag: [
            "byClass",
            "J3",
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

function openTile (targetTile, isToOpen = !targetTile.classList.contains("opened")) {
    const allTiles = exhibitsArea.querySelectorAll(".tile");
    allTiles.forEach(element => {
        if (element !== targetTile) element.classList.remove("opened");
    });
    if (isToOpen) {
        targetTile.classList.add("opened");
    } else {
        targetTile.classList.remove("opened");
    }
}

for (let i = 0; i < exhibitsLength; i += 1) {
    const tile = d.createElement("div");
    const names = d.createElement("div");
    const description = d.createElement("div");
    const locationMap = d.createElement("div");
    const tags = d.createElement("div");

    tile.style.animation = "tag_show .5s both";
    tile.style.animationDelay = `${i * 0.1}s`;
    tile.setAttribute("exhibits", getExhibits(i)[0]);
    tile.className = "tile";

    if (!getExhibits(i)[1]?.location?.name || getExhibits(i)[1].location.name === "") {
        getExhibits(i)[1].location.name = getClassName(
            getExhibits(i)[0].split("_")[0].split("")[0],
            getExhibits(i)[0].split("_")[0].split("")[1],
            getExhibits(i)[0].split("_")[1]
        );
    }

    names.innerHTML = `${getExhibits(i)[1].name}<span class="subText">場所 : ${getExhibits(i)[1].location.name
    }</span>`;
    names.classList.add("names");
    
    description.innerHTML = `<span>${getExhibits(i)[1].description}</span>`;
    description.classList.add("description");

    locationMap.className = "locationMap";

    let displayTagNames = [];
    const usedTags = new Set();

    exhibitsArea.addEventListener("click", e => {
        const tile = e.target.closest(".tile");
        if (!tile) return;
        openTile(tile);
    });

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

function barHeightUpdate (isToOpen = exhibitsBottomBar.classList.contains("opened")) {
    if (isToOpen) {
        const nowShow = exhibitsBottomBar.querySelector(".content > div.nowShow");
        const areaHeight = getBarOptionsHeight() + nowShow?.offsetHeight;

        exhibitsBottomBar.style.setProperty("--bottomBarHeight", `${Math.min(areaHeight, window.innerHeight - 100)}px`);
        exhibitsBottomBar.classList.add("opened");
    } else {
        exhibitsBottomBar.style.setProperty("--bottomBarHeight", `${getBarOptionsHeight()}px`);
        exhibitsBottomBar.classList.remove("opened");
    }
}

const bottomBar_contents = d.createElement("div");
const sortList_topBar = d.createElement("div");
const sortList_tabs = d.createElement("div");

let loadModel;

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

    function tabClassUpdate (tabIndex) {
        const tabs = sortList_tabs.querySelectorAll(".tab");
        tabs.forEach(tab => {
            tab.classList.remove("selected");
        });
        tabs[tabIndex].classList.add("selected");

        const contents = exhibitsBottomBar.querySelectorAll(".content > div");
        contents.forEach(content => {
            content.classList.remove("nowShow");
        });
        contents[tabIndex].classList.add("nowShow");
    }

    function tabClicked (tabIndex) {
        bottomBar_contents.scrollTo({
            top: 0,
            left: tabIndex * bottomBar_contents.scrollWidth,
            behavior: "smooth"
        });
        tabClassUpdate(tabIndex);
        barHeightUpdate(true);

        if (loadModel && tabIndex === 1 && !window.modelLoaded) {
            window.modelLoaded = true;
            loadModel();
        }
    }

    [
        "絞り込み",
        "地図",
    ].forEach((item, index) => {
        const tab = d.createElement("div");

        tab.className = "tab";
        tab.innerHTML = item;

        tab.addEventListener("click", () => tabClicked(index));

        sortList_tabs.appendChild(tab);

        if (index === 0) setTimeout(() => {
            tabClicked(index);
        });
    });

    let isBarTouchNow = false

    function scroll () {
        const getScrollRatio = () => {
            const scrollRatio = bottomBar_contents.scrollLeft / sortList_tabs.scrollWidth;
            return Number.isNaN(scrollRatio) ? 0 : scrollRatio;
        }
        const tabIndex = Math.round(getScrollRatio());
        if (!isBarTouchNow && getScrollRatio() % 1 === 0) {
            tabClicked(tabIndex);
        }
        barHeightUpdate();
    }

    bottomBar_contents.addEventListener("scroll", scroll);

    bottomBar_contents.addEventListener("touchstart", () => {
        isBarTouchNow = true;
    });

    bottomBar_contents.addEventListener("touchend", () => {
        isBarTouchNow = false;
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

        newTag.addEventListener("click", tagClicked);
    });

    (() => { // mapsView
        const mapsView = d.createElement("div");
        const labelsArea = d.createElement("div");
        bottomBar_contents.appendChild(mapsView);
        const compassBar = d.createElement("div");
        const compass = d.createElement("div");
        
        const buttons = d.createElement("div");

        const buttons_floors = d.createElement("div");
        buttons_floors.className = "buttons_floors";
        
        mapsView.className = "mapsView";
        labelsArea.className = "labelsArea";
        compassBar.className = "compassBar";
        compass.className = "compass";
        
        compass.innerHTML = '<img src="medias/images/compass.svg"/>';

        const scene = new THREE.Scene();
        scene.background = null; // 背景色

        const aspect = window.innerWidth / window.innerHeight;
        const cameraSize = 1.2; // 表示範囲の大きさ（好みで調整）

        // カメラ
        const camera = new THREE.OrthographicCamera(
            -cameraSize * aspect,  // left
            cameraSize * aspect,   // right
            cameraSize,            // top
            -cameraSize,           // bottom
            0.1,                   // near
            1000                   // far
        );

        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio * .9);

        // 描画領域を mapsView に追加
        mapsView.appendChild(renderer.domElement);

        // 照明
        const latitude = 35.86059681776511;
        const longitude = 139.26886482318102;
        const now = new Date();
        
        // 太陽の位置を取得
        const light = new THREE.DirectionalLight(0xffffff, 1);
        function matchSun () {
            const sunPos = SunCalc.getPosition(now, latitude, longitude);
            const distance = 10; // 光源までの距離
            const altitude = sunPos.altitude; // 高度
            const azimuth = sunPos.azimuth;   // 方位角（北=0）

            // 球座標 → デカルト座標変換
            const x = Math.max(distance * Math.cos(altitude) * Math.sin(azimuth), 2);
            const y = Math.max(distance * Math.sin(altitude), 2);
            const z = Math.max(distance * Math.cos(altitude) * Math.cos(azimuth), 2);

            light.position.set(x, y, z);
            light.lookAt(0, 0, 0); // 原点を照らす

            const maxIntensity = 5;
            const minIntensity = 1;
            light.intensity = Math.max(minIntensity, Math.sin(sunPos.altitude) * maxIntensity);            
        }
        matchSun();
        setInterval(matchSun, 1000 * 60);
        scene.add(light);

        // 環境光
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        let cameraDistance = 10; // モデル中心からの距離
        let cameraHeight = 10;    // 高さ（Y座標）
        let cameraDeg = 0;     // 左右角度（度単位）

        camera.position.set(0, cameraHeight, cameraDistance);
        camera.lookAt(0, 0, 0);

        let modelParts;

        // 3Dモデル読み込み
        const loader = new GLTFLoader();
        let model; // モデルを外で保持
        
        const getFloor = (name) => name.split("F")[1]?.split("_")[0] * 1;
        const getFmtedObjName = (name) => name.replace("F" + getFloor(name) + "_", "");

        loadModel = () => {
            loader.load(
                "medias/3ds/sc.glb",
                (gltf) => {
                    model = gltf.scene;
                    model.position.set(0, 0, 0);
                    model.rotation.y = THREE.MathUtils.degToRad(180 - 45);
                    scene.add(model);

                    // モデルが読み込まれたら OrbitControls の注視点をモデル中心に設定
                    controls.target.set(model.position.x, model.position.y, model.position.z);
                    controls.update();

                    // パーツを一括で取得
                    modelParts = {};
                    model.traverse((child) => {
                        if (child.isMesh) {
                            modelParts[child.name] = child;
                        }
                    });
                    console.log("パーツ一覧:", modelParts);

                    // エッジ線を追加（親レベルのメッシュのみ、子メッシュの内部構造は無視）
                    Object.values(modelParts).forEach((mesh) => {
                        if (mesh.isMesh && mesh.parent && mesh.parent.type === "Group") {
                            const edges = new THREE.EdgesGeometry(mesh.geometry, 15); // 境界角度閾値
                            const line = new THREE.LineSegments(
                                edges,
                                new THREE.LineBasicMaterial({
                                    color: "lightgray",
                                    linewidth: 1,
                                    transparent: true,
                                    opacity: 1
                                })
                            );

                            mesh.add(line);

                            // ★ エッジラインを userData に保存
                            mesh.userData.edgeLine = line;

                            // 必要に応じて面のオフセットも
                            mesh.material.polygonOffset = true;
                            mesh.material.polygonOffsetFactor = 1;
                            mesh.material.polygonOffsetUnits = 1;
                        }
                    });

                    function truncateText(text, length = 9) {
                        if (typeof text !== "string") return "";
                        return text.length > length ? text.slice(0, 4) + ".." : text;
                    }

                    function scrollToTile(targetTile) {
                        function scrollToAndThen(targetY, callback) {
                            const executionTime = Date.now();
                            const tolerance = 2; // 少し余裕を持たせる
                            const checkScroll = () => {
                                const currentY = window.scrollY;
                                const maxY = d.body.scrollHeight - window.innerHeight;
                                if (
                                    Math.abs(currentY - Math.min(targetY, maxY)) <= tolerance ||
                                    Date.now() - executionTime > 1000
                                ) {
                                    callback();
                                } else {
                                    requestAnimationFrame(checkScroll);
                                }
                            };

                            window.scrollTo({ top: targetY, behavior: "smooth" });
                            checkScroll();
                        }

                        if (!targetTile) return;
                        const existingTransition = targetTile.style.transition;
                        exhibitsArea.querySelectorAll(".tile").forEach(tileItem => {
                            tileItem.style.transition = "none";
                        });
                        const rect = targetTile.getBoundingClientRect();
                        const scrollTop = window.scrollY || document.documentElement.scrollTop;
                        const targetY = rect.top + scrollTop - 120;
                        scrollToAndThen(targetY, () => {
                            exhibitsArea.querySelectorAll(".tile").forEach(tileItem => {
                                tileItem.style.transition = existingTransition;
                            });
                        });
                    }

                    const mapPointIcon = '<img src="medias/images/mapPoint.svg"/>';

                    const locations = {
                        F1_J1_1: exhibits.J1_1,
                        F1_J1_2: exhibits.J1_2,
                        F1_J1_3: exhibits.J1_3,
                        F2_J2_1: exhibits.J2_1,
                        F2_J2_2: exhibits.J2_2,
                        F2_J2_3: exhibits.J2_3,
                        F3_J3_1: exhibits.J3_1,
                        F3_J3_2: exhibits.J3_2,
                        F3_J3_3: exhibits.J3_3,
                        F1_Entrance_Arch: {
                            name: "入口"
                        },
                        F1_Gym_Entrance: {
                            name: mapPointIcon,
                            description: "体育館"
                        },
                        F1_Art: {
                            name: mapPointIcon,
                            description: "美術棟"
                        },
                    };

                    const labels = {};
                    Object.keys(modelParts).forEach((partName) => {
                        const part = modelParts[partName];
                        const label = document.createElement("div");

                        // part.material.color.set("lightgreen");

                        if (partName.includes("WC")) {
                            locations[partName] = {
                                name: '<img src="medias/images/wc.svg"/>',
                                description: `トイレ ${getFloor(partName)}階`
                            }
                        }
                        
                        getExhibits();

                        // if (exhibits[partName]?.name) {
                        console.log(partName, locations[partName]);
                        if (locations[partName]) {
                            label.className = "mapsLabel";
                            label.setAttribute("exhibits", partName);

                            const isHTMLTag = locations[partName].name.includes("<");

                            const titleText = isHTMLTag ? locations[partName].name : truncateText(locations[partName].name);
                            const descriptionText = locations[partName]?.description;
                            const locationText = locations[partName]?.location?.name;
                            const detailTile = exhibitsArea.querySelector(`.tile[exhibits=${getFmtedObjName(partName)}]`);

                            if (titleText) {
                                console.log("titleText : ", titleText);
                                const title = d.createElement("span");
                                title.innerHTML = titleText;
                                title.className = "title";
                                label.appendChild(title);
                                if (isHTMLTag) {
                                    label.style.padding = 0;
                                    label.style.fontSize = "calc(var(--fontSize) * 1.3)";
                                }
                            }

                            if (descriptionText) {
                                const description = d.createElement("span");
                                description.textContent = descriptionText;
                                description.className = "description";
                                label.appendChild(description);
                            }
                            
                            if (locationText) {
                                const location = d.createElement("span");
                                location.textContent = locationText;
                                location.className = "location";
                                label.appendChild(location);
                            }
                            
                            if (detailTile) {
                                const detail = d.createElement("div");
                                detail.textContent = "詳細";
                                detail.className = "detail button";
                                detail.addEventListener("click", e => {
                                    e.preventDefault();
                                    label.classList.remove("opened");
                                    barHeightUpdate(false);
                                    openTile(detailTile, true);
                                    scrollToTile(detailTile);
                                });
                                label.appendChild(detail);
                            }

                            labelsArea.appendChild(label);
                        }

                        labels[partName] = { element: label, part: part };
                    });

                    (() => {
                        function isOverlap(el, x, y) {
                            const rect = el.getBoundingClientRect();
                            return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
                        }

                        // document 全体でタッチやマウスの開始・終了イベントを監視
                        let touchStart = [];
                        let lastHandleEventAt;
                        function handleEvent(x, y) {
                            if (Date.now() - lastHandleEventAt < 100) return;
                            
                            const candidateLabels = [];

                            function addLabelTransition (label, transitionDuration = .5) {
                                label.style.setProperty("--duration", `${transitionDuration}s`)
                                label.classList.add("addTransition");
                                setTimeout(() => {
                                    label.classList.remove("addTransition");
                                }, (transitionDuration + .3) * 1000);
                            }

                            Object.values(labels).forEach(labelObj => {
                                const labelElement = labelObj.element;
                                if (
                                    isOverlap(labelElement, touchStart[0], touchStart[1]) &&
                                    Math.abs(x - touchStart[0]) < 5 &&
                                    Math.abs(y - touchStart[1]) < 5 &&
                                    labelElement.getAttribute("isPressable") === "true"
                                ) {
                                    candidateLabels.push(labelElement);
                                }
                            });

                            const topLabel = candidateLabels
                                .sort((a, b) => 
                                    (parseFloat(getComputedStyle(b).getPropertyValue("--zIndex")) || 0) -
                                    (parseFloat(getComputedStyle(a).getPropertyValue("--zIndex")) || 0)
                                )[0] || null;

                            Object.values(labels).forEach(labelObj => {
                                const labelElement = labelObj.element;

                                if (labelElement.classList.contains("opened") && labelElement !== topLabel) {
                                    addLabelTransition(labelElement);
                                    labelElement.classList.remove("opened");
                                }
                            });

                            if (topLabel) {
                                addLabelTransition(topLabel);
                                topLabel.classList.toggle("opened");
                            }
                            lastHandleEventAt = Date.now();
                        }

                        document.addEventListener("mousedown", (e) => touchStart = [e.clientX, e.clientY]);
                        document.addEventListener("mouseup", (e) => handleEvent(e.clientX, e.clientY));

                        document.addEventListener("touchstart", (e) => {
                            const touch = e.touches[0];
                            touchStart = [touch.clientX, touch.clientY];
                        });
                        document.addEventListener("touchend", (e) => {
                            const touch = e.changedTouches[0];
                            handleEvent(touch.clientX, touch.clientY);
                        });
                    })();

                    const truncate = (num, digit = 3) => Math.floor(num * digit) / digit;

                    function updateLabelsPosition() {
                        const rect = renderer.domElement.getBoundingClientRect();

                        Object.values(labels).forEach(({ element, part }) => {
                            const vector = new THREE.Vector3();
                            if (part.geometry) {
                                part.geometry.computeBoundingBox();
                                part.geometry.boundingBox.getCenter(vector);
                                part.localToWorld(vector);
                            }
                            vector.project(camera);

                            const widthHalf = rect.width / 2;
                            const heightHalf = rect.height / 2;

                            const opacity = (
                                gsap.getProperty(part.material, "opacity") === 1
                            ) ? 1 : 0;
                            element.setAttribute("isPressable", opacity === 1 && Array.from(element.children).length !== 1);
                            element.style.opacity = opacity;

                            if (element.getAttribute("isPressable") === "true" || element.style.opacity !== 0) {
                                const leftPx = truncate(vector.x * widthHalf + widthHalf - element.offsetWidth / 2) + "px";
                                const topPx  = truncate(-vector.y * heightHalf + heightHalf - element.offsetHeight / 2) + "px";
                                if (element.style.left !== leftPx) element.style.left = leftPx;
                                if (element.style.top !== topPx) element.style.top = topPx;

                                const distance = camera.position.distanceTo(part.getWorldPosition(new THREE.Vector3()));

                                element.style.setProperty("--zIndex",  Math.floor(10000 - distance * 10));
                                element.style.setProperty("--fontSize",  truncate(
                                    Math.min(
                                        Math.max(
                                            camera.zoom * (distance * .9) * (Math.min(window.innerWidth, 500) * .002),
                                        1)
                                    , 15)
                                ) + "px");

                                const childWidths  = [];
                                let wholeHeight = 0;
                                Array.from(element.children).forEach(child => {
                                    childWidths.push(child.getBoundingClientRect().width);
                                    wholeHeight = Math.max(child.offsetTop + child.offsetHeight, wholeHeight);
                                });
                                const wholeWidth  = Math.max(...childWidths) + 4;
                                element.style.setProperty("--wholeWidth",  wholeWidth + "px");
                                element.style.setProperty("--wholeHeight",  wholeHeight + "px");

                                const title = element.querySelector("span.title");
                                if (title) {
                                    const titleWidth = title.offsetWidth;
                                    const titleHeight = title.getBoundingClientRect().height;
                                    element.style.setProperty("--titleWidth",  titleWidth + "px");
                                    element.style.setProperty("--titleHeight", titleHeight + "px");
                                }
                            }
                        });
                    }

                    // 描画ループ
                    function animate() {
                        requestAnimationFrame(animate);
                        controls.update();
                        renderer.render(scene, camera);
                    }
                    animate();

                    let deviceorientationHandler;

                    function directionMatch () {
                        let deviceHeading;
                        deviceorientationHandler = (event) => {
                            if (event.webkitCompassHeading !== undefined) {
                                deviceHeading = event.webkitCompassHeading; // iOS Safari
                            } else {
                                // センサーが存在しない場合は処理しない
                                return;
                            }

                            console.log("deviceHeading : ", deviceHeading);
                            updateCameraAngle(-deviceHeading);
                        };

                        if (typeof DeviceOrientationEvent.requestPermission === "function") {
                            DeviceOrientationEvent.requestPermission()
                            .then(response => {
                                if (response === "granted") {
                                    window.addEventListener("deviceorientation", deviceorientationHandler);
                                }
                            })
                            .catch(console.error);
                        } else {
                            // Androidや古いiOS
                            window.addEventListener("deviceorientation", deviceorientationHandler);
                        }
                    };
                    directionMatch();

                    compass.addEventListener("click", directionMatch);

                    function removeDirectionMatch () {
                        window.removeEventListener("deviceorientation", deviceorientationHandler);
                    }
                    mapsView.addEventListener("touchstart", removeDirectionMatch);
                    mapsView.addEventListener("mousedown", removeDirectionMatch);

                    (() => { // 無効化済み
                        const generateTouches = (e) => e ? [e?.clientX || e.touches[0]?.clientX, e?.clientY || e.touches[0]?.clientY] : [null, null];

                        let isNowBarTouch = false;
                        let firstCameraDeg = cameraDeg;
                        let firstTouches = [];

                        function barTouchStart (e) {
                            const touches = generateTouches(e);
                            isNowBarTouch = true;
                            firstCameraDeg = cameraDeg;
                            firstTouches = touches;
                            window.removeEventListener("deviceorientation", deviceorientationHandler);
                        }

                        function barTouchMove (e) {
                            const touches = generateTouches(e);
                            const differences = [
                                touches[0] - firstTouches[0],
                                touches[1] - firstTouches[1]
                            ];

                            if (isNowBarTouch) {
                                updateCameraAngle(
                                    firstCameraDeg + differences[0] * -.1
                                );
                            }
                        }

                        function barTouchEnd (e) {
                            const touches = generateTouches(e);
                            isNowBarTouch = false;
                            // directionSynchronization();
                        }

                        barTouchStart();
                        barTouchMove();
                        barTouchEnd();

                        compassBar.addEventListener("touchstart", barTouchStart);
                        compassBar.addEventListener("mousedown", barTouchStart);
                        window.addEventListener("touchmove", barTouchMove);
                        window.addEventListener("mousemove", barTouchMove);
                        window.addEventListener("touchend", barTouchEnd);
                        window.addEventListener("mouseup", barTouchEnd);
                    });

                    let lastLabelUpdate = 0;

                    // パン操作時にモデルから離れすぎないように制限
                    controls.addEventListener("change", () => {
                        const now = Date.now();

                        const maxDistance = 1; // モデル中心からの最大距離

                        // 注視点を範囲内に制限
                        controls.target.clamp(
                            new THREE.Vector3(-maxDistance, -Infinity, -maxDistance),
                            new THREE.Vector3(maxDistance, Infinity, maxDistance)
                        );

                        // カメラも注視点に合わせて補正
                        const offset = new THREE.Vector3().subVectors(camera.position, controls.target);
                        offset.clampLength(controls.minDistance, controls.maxDistance);
                        camera.position.copy(controls.target).add(offset);

                        // カメラの前方向ベクトルを取得
                        const cameraDirection = new THREE.Vector3();
                        camera.getWorldDirection(cameraDirection);

                        // 方角を度で取得したい場合（北=+Z, 東=+X と仮定）
                        const radToDeg = 180 / Math.PI;
                        const cD = Math.atan2(cameraDirection.x, cameraDirection.z) * radToDeg + 180;
                        cameraDeg = cD;

                        compass.style.transform = `rotate(${cameraDeg}deg)`;

                        if (now - lastLabelUpdate > 5) {
                            updateLabelsPosition();
                            lastLabelUpdate = now;
                        }
                    });
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                (error) => {
                    console.error('モデル読み込みエラー', error);
                }
            );
        };

        function windowResize () {
            const aspect = mapsView.clientWidth / mapsView.clientHeight;
            camera.left = -cameraSize * aspect;
            camera.right = cameraSize * aspect;
            camera.top = cameraSize;
            camera.bottom = -cameraSize;
            camera.updateProjectionMatrix();
            renderer.setSize(mapsView.clientWidth, mapsView.clientHeight);
            barHeightUpdate();
        }

        windowResize();
        window.addEventListener("resize", windowResize);

        function setEdgeStyle(mesh, {
            color = "lightgray",
            opacity = 1,
        } = {}) {
            if (mesh.userData.edgeLine) {
                const edgeMat = mesh.userData.edgeLine.material;
                edgeMat.color.set(color);
                edgeMat.opacity = opacity;
            }
        }

        // OrbitControls 初期化
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // 慣性スクロール
        controls.enableRotate = true;
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = true;
        controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        };
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.PAN,
            RIGHT: THREE.MOUSE.NONE
        };

        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 2; // カメラが地面の下に回り込まないよう制限

        function updateCameraAngle(angleDeg) {
            cameraDeg = angleDeg;
            const angleRad = THREE.MathUtils.degToRad(cameraDeg);

            // モデル中心を注視
            const target = model.position;

            // 現在の高さ（上下方向）は維持
            const currentY = camera.position.y;

            // 現在の距離を維持
            const distance = camera.position.distanceTo(new THREE.Vector3(target.x, currentY, target.z));

            // 左右方向だけを変更
            camera.position.x = target.x + distance * Math.sin(angleRad);
            camera.position.z = target.z + distance * Math.cos(angleRad);
            camera.position.y = currentY; // 上下位置は触らない

            // 注視点は変更しない（controlsが管理）
            controls.update();
        }

        const floors = {
            f1: {
                name: "1階"
            },
            f2: {
                name: "2階"
            },
            f3: {
                name: "3階"
            },
        };

        Object.values(floors).slice().reverse().forEach((floor, index) => {
            const button = d.createElement("div");
            
            button.textContent = floor.name;
            button.setAttribute("floor", Object.keys(floors)[Object.keys(floors).length - index - 1]);
            button.className = "button";

            button.addEventListener("click", () => {
                const allButtons = buttons_floors.querySelectorAll(".button");

                const isOnlyValid = !button.classList.contains("invalid") &&
                    [...allButtons].every(b => b === button || b.classList.contains("invalid"));

                if (isOnlyValid) {
                    allButtons.forEach(el => el.classList.remove("invalid"));
                } else {
                    allButtons.forEach(el => {
                        el.classList.remove("invalid");
                        if (el !== button) el.classList.add("invalid");
                    });
                }

                // アクティブフロアを配列で取得
                const activeFloors = [...buttons_floors.querySelectorAll(".button")]
                    .filter(btn => !btn.classList.contains("invalid"))
                    .map(btn => btn.getAttribute("floor").replaceAll("f", "") * 1);

                Object.values(modelParts).forEach(part => {
                    const isPartActive = (
                        // locations[part.name]?.floor ? activeFloors.includes(locations[part.name].floor) : true
                        getFloor(part.name) ? activeFloors.includes(getFloor(part.name)) : true &&
                        !(!isOnlyValid && (
                            part.name.includes("Roof") ||
                            part.name.includes("Curve") ||
                            part.name.includes("Roof")
                        ))
                    );

                    if (Array.isArray(part.material)) {
                        part.material = part.material.map(mat => mat.clone());
                        part.material.forEach(mat => {
                            mat.transparent = true;
                            mat.depthWrite = isPartActive;
                        });
                    } else {
                        part.material = part.material.clone();
                        part.material.transparent = true;
                        part.material.depthWrite = isPartActive;
                    }

                    // パーツがどのフロアに属するかを判定
                    // const isPartActive = exhibits[part.name] ? activeFloors.includes(exhibits[part.name]?.location.floor) : true;

                    // part.visible = isPartActive;
                    gsap.to(part.material, {
                        duration: 0.5,
                        opacity: isPartActive ? 1 : .05,
                        ease: "power2.inOut"
                    });
                    setEdgeStyle(part, {
                        opacity: isPartActive ? 1 : .05
                    });
                });
            });
            
            buttons_floors.appendChild(button);
        });

        mapsView.appendChild(compassBar);
        mapsView.appendChild(labelsArea);
        mapsView.appendChild(buttons_floors);
        compassBar.appendChild(compass);

        mapsView.appendChild(buttons);
    })();
})();

(() => {
    let touchStartPos = [0, 0];
    let currentPos = [];
    let difference = [0, 0];

    exhibitsBottomBar.style.transition = "opacity .4s ease-in-out";
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

    barHeightUpdate(false);

    let lastTouchendTime = Date.now();

    function touchend (e) {
        exhibitsBottomBar.classList.remove("nowBeingHeld");
        if (Date.now() - lastTouchendTime < 50) return;
        exhibitsBottomBar.style.transition = `${sortListTransition === "" || sortListTransition === "none" ? "" : `${sortListTransition}, `}height .4s ease-out, width .4s ease-out`;
        const isNowOpen = exhibitsBottomBar.classList.contains("opened");
        console.log("isNowOpen : ", isNowOpen);
        if (Math.abs(difference[1]) !== 0 || e?.target === sortList_topBar) {
            if (e?.target === sortList_topBar && Math.abs(difference[1]) === 0) { // topBarTap
                barHeightUpdate( !isNowOpen);
            } else if (isHolded) { // swipe
                console.log("Math.abs(difference[1])", Math.abs(difference[1]));
                const threshold = 100;
                barHeightUpdate( isNowOpen ? difference[1] * -1 < threshold : difference[1] > threshold );
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
