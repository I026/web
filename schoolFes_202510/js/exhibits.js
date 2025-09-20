import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";

/* 
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
*/

const exhibitsBottomBar = d.querySelector(".exhibits .sortList");
const exhibitsArea = d.querySelector(".exhibits .list");

exhibitsBottomBar.addEventListener("wheel", e => {
    e.preventDefault();
    e.stopPropagation();
}, { passive: false });

const getClassName = (school, input_grade, input_class) => (
    `${school == "H" || input_class > 3 ? "高校" : "中学"} ${input_grade}年${input_class}組`
);

function queryParameter ({
    type: type = "set",
    key: key,
    value: value,
    url: url = new URL(window.location.href),
}) {
    let returnValue = null;
    console.log("type : ", type);
    switch (type) {
        case "set":
            url.searchParams.set(key, value);
            break;
        case "append":
            console.log("value : ", value);
            (value instanceof Array ? value : [value]).forEach(item => {
                url.searchParams.append(key, item);
            });
            break;
        case "delete":
            url.searchParams.delete(key);
            break;
        case "get":
            returnValue = url.searchParams.getAll(key);
            break;
        case "entries":
            returnValue = Object.fromEntries(
            Array.from(url.searchParams.entries())
                .filter(([key, value]) => value !== undefined && value !== "undefined")
            )
            break;
    }
    window.history.pushState({}, "", url);
    return returnValue;
}

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
        description: "怖いお化けが出る屋敷怖いお化けが出る屋敷怖いお化けが出る屋敷怖いお化けが出る屋敷怖いお化けが出る屋敷怖いお化けが出る屋敷怖いお化けが出る屋敷",
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
    const tagsContent = d.createElement("div");
    const tags = d.createElement("div");

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
        tag.setAttribute("tag", item);
        tagsContent.appendChild(tag);
    });
    const tagAttributes = [];
    displayTagNames.map(subArr => subArr[0]).forEach(item => {
        tagAttributes.push(item);
    });
    tile.setAttribute("tag", tagAttributes.join(","));
    tags.classList.add("tags");
    tagsContent.classList.add("tagsContent");

    tile.appendChild(names);
    tile.appendChild(description);
    tile.appendChild(tags);
    tags.appendChild(tagsContent);
    exhibitsArea.appendChild(tile);

    function scroll() {
        const maxScroll = tagsContent.scrollWidth - tagsContent.clientWidth;
        const scrollRatio = maxScroll === 0 ? 0 : tagsContent.scrollLeft / maxScroll;
        tags.style.setProperty("--scrollPx", maxScroll - tagsContent.scrollLeft + "px");
        tags.style.setProperty("--scrollRatio", scrollRatio);
    }
    scroll();
    tagsContent.addEventListener("scroll", scroll);

    tile.style.setProperty("--tileOpenHeight", (() => {
        let height = 20;
        Array.from(tile.children).forEach(child => {
            height += child.scrollHeight;
        });
        return height;
    })() + "px");
}

function getSortConditions () {
    let conditions = [];
    const checkedTags = exhibitsBottomBar.querySelectorAll(".tag.checkedBox:not([isButton])");
    checkedTags.forEach(element => {
        conditions.push(element.getAttribute("tag"));
    });
    return conditions;
}

function getIsSortConforming (element, conditions = getSortConditions()) {
    let isConforming = true;
    for (const condition of conditions) {
        if (!element.getAttribute("tag") || !element.getAttribute("tag").split(",").includes(condition)) {
            isConforming = false;
            break;
        }
    };
    return isConforming;
}

function updateSort () {
    const conditions = getSortConditions();

    (() => {
        const allTiles = exhibitsArea.querySelectorAll(".tile");

        function setTileVisible (element, isVisible) {
            if (isVisible) {
                element.classList.remove("hidden");
                element.style.setProperty("--tileOpacity", 1);
            } else {
                element.classList.add("hidden");
                element.classList.remove("opened");
                element.style.setProperty("--tileOpacity", "var(--baseOpacity)");
            }
        }

        allTiles.forEach(element => {
            if (conditions[0]) {
                setTileVisible(element, false);
            } else {
                setTileVisible(element, true);
            }
            element.classList.remove("topTileStyle");
            element.classList.remove("lowestTileStyle");
        });

        const activeAllTiles = [];

        const targetElements = [];
        exhibitsArea.querySelectorAll(":scope > div.tile").forEach(tileItem => {
            console.log(
                "tileItem : ", tileItem.getAttribute("tag"),
                "\nconditions : ", conditions
            );
            // if (tileItem.getAttribute("tag").includes(conditions.join(","))) {
            if (getIsSortConforming(tileItem, conditions)) {
                targetElements.push(tileItem);
            }
        });
        console.log("targetElements : ", targetElements);
        targetElements.forEach(element => {
            setTileVisible(element, true);
            activeAllTiles.push(element);
        });

        exhibitsArea.style.setProperty("--numOfTile", allTiles.length);
        exhibitsArea.style.setProperty("--numOfVisibleTile", activeAllTiles.length);

        conditions.forEach(condition => {
            exhibitsArea.querySelectorAll(`.tags [tag_${condition}]`).forEach(element => {
                element.style.opacity = 1;
            });
        });

        // 角丸系

        if (activeAllTiles[0]) {
            activeAllTiles[0].classList.add("topTileStyle");
        }
        if (activeAllTiles[activeAllTiles.length - 1]) {
            activeAllTiles[activeAllTiles.length - 1].classList.add("lowestTileStyle");
        }
    })();
}

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
const sortList_topContents = d.createElement("div");
const sortList_topBar = d.createElement("div");
const sortList_tabs = d.createElement("div");

sortList_topContents.className = "topContents";

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

    sortList_topContents.appendChild(sortList_topBar);
    sortList_topContents.appendChild(sortList_tabs);
    exhibitsBottomBar.appendChild(sortList_topContents);
    exhibitsBottomBar.appendChild(bottomBar_contents);
})();

(() => { // exhibitsBottomBar contents
    // listView
    const listView = d.createElement("div");
    listView.className = "tags listView";
    bottomBar_contents.appendChild(listView);

    Object.keys(tagOrder).forEach((tag, tagIndex) => {
        const newTag = d.createElement("span");
        newTag.className = `tag${
            queryParameter({
                type: "get",
                key: "sort"
            }).includes(tag) ? " checkedBox" : ""
        }`;
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
                queryParameter({
                    type: "delete",
                    key: "sort"
                });
                queryParameter({
                    type: "append",
                    key: "sort",
                    value: getSortConditions()
                });
            }
            updateResetButton();
            updateSort();
        }

        newTag.addEventListener("click", tagClicked);
    });
    updateSort();

    (() => { // mapsView
        const mapsView = d.createElement("div");
        const labelsArea = d.createElement("div");
        bottomBar_contents.appendChild(mapsView);
        const compassBar = d.createElement("div");
        const compass = d.createElement("div");
        
        const buttons_right = d.createElement("div");
        buttons_right.className = "buttons right";

        const buttons_left = d.createElement("div");
        buttons_left.className = "buttons left";
        
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
        renderer.shadowMap.enabled = false;
        renderer.setPixelRatio(window.devicePixelRatio * .9);

        // 描画領域を mapsView に追加
        mapsView.appendChild(renderer.domElement);

        // 照明
        const latitude = 35.86059681776511;
        const longitude = 139.26886482318102;
        const now = new Date();
        
        // 太陽の位置を取得
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        light.shadow.bias = -0.0001;
        function matchSun () {
            const sunPos = SunCalc.getPosition(now, latitude, longitude);
            const distance = 10; // 光源までの距離
            const altitude = sunPos.altitude; // 高度
            const azimuth = sunPos.azimuth;   // 方位角（北=0）

            // 球座標 → デカルト座標変換
            const x = distance * Math.cos(altitude) * Math.sin(azimuth);
            const y = Math.max(distance * Math.sin(altitude), 2);
            const z = distance * Math.cos(altitude) * Math.cos(azimuth);

            light.position.set(x, y, z);
            light.lookAt(0, 0, 0); // 原点を照らす

            const maxIntensity = 5;
            const minIntensity = 0;
            light.intensity = Math.max(minIntensity, Math.sin(sunPos.altitude) * maxIntensity);            
        }
        matchSun();
        setInterval(matchSun, 1000 * 60);
        scene.add(light);

        // 環境光
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        let cameraDistance = 10; // モデル中心からの距離
        let cameraHeight = 10;    // 高さ（Y座標）
        let camHorizontal = 0;     // 左右角度（度単位）
        let camVertical = 0;   // 垂直角度（度単位）

        camera.position.set(
            cameraDistance,
            cameraHeight,
            cameraDistance
        );
        camera.lookAt(0, 0, 0);

        let modelParts;

        // 3Dモデル読み込み
        const loader = new GLTFLoader();
        let model; // モデルを外で保持
        
        function getFloor (name) {
            const regex = /F(\d+)_/g; // gフラグで全マッチ取得
            const matches = [...name.matchAll(regex)];
            return matches.map(match => Number(match[1]));
        }
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
                    function setCamFocus(x = 0, y = 0, z = 0) {
                        controls.target.set(x, y, z);
                        controls.update();
                    }

                    setCamFocus(0, 0, 0);

                    // パーツを一括で取得
                    modelParts = {};

                    const mergeObjs = [];
                    model.traverse((child) => {
                        if (child.isMesh) {
                            modelParts[child.name] = child;
                            child.castShadow = false;
                            child.receiveShadow = false;
                        }
                        if (child.type === "Object3D") {
                            const meshes = [];
                            child.traverse((sub) => {
                                if (sub.isMesh) meshes.push(sub);
                            });
                            if (meshes.length === 0) return;

                            // マージ前のワールド座標を保存
                            child.userData.originalTransform = {
                                position: child.position.clone(),
                                rotation: child.rotation.clone(),
                                scale: child.scale.clone(),
                                matrixWorld: child.matrixWorld.clone()
                            };

                            // ジオメトリ統合
                            const transformedGeometries = meshes.map(mesh => {
                                let geom = mesh.geometry.clone();

                                // 1. 重複頂点の削除
                                geom = BufferGeometryUtils.mergeVertices(geom);

                                // 2. ワールド変換を適用
                                const matrix = new THREE.Matrix4();
                                matrix.multiplyMatrices(
                                    new THREE.Matrix4().compose(child.position, child.quaternion, child.scale),
                                    new THREE.Matrix4().compose(mesh.position, mesh.quaternion, mesh.scale)
                                );
                                geom.applyMatrix4(matrix);

                                // 3. LOD用の簡略化ジオメトリ作成（例: デシメーションは簡易版）
                                const lodGeom = geom.clone();
                                const lod = new THREE.LOD();
                                lod.addLevel(new THREE.Mesh(geom, mesh.material.clone()), 0); // 高精度
                                lod.addLevel(new THREE.Mesh(lodGeom, mesh.material.clone()), 50); // 簡易版
                                return geom;
                            });

                            const mergedGeometry = BufferGeometryUtils.mergeGeometries(transformedGeometries, true);
                            if (!mergedGeometry) return;

                            const mergedMaterial = meshes.map(mesh => {
                                const cloned = mesh.material.clone();
                                cloned.opacity = mesh.material.opacity ?? 1;
                                cloned.transparent = true;
                                if (mesh.material.envMap) cloned.envMap = mesh.material.envMap;
                                cloned.needsUpdate = true;
                                return cloned;
                            });

                            // 法線再計算
                            mergedGeometry.computeVertexNormals();

                            const mergedMesh = new THREE.Mesh(mergedGeometry, mergedMaterial);

                            // 描画上はマージ前のワールド変換を適用
                            mergedGeometry.applyMatrix4(child.matrixWorld);

                            mergedMesh.position.set(0, 0, 0);
                            mergedMesh.rotation.set(0, 0, 0);
                            mergedMesh.scale.set(1, 1, 1);

                            mergedMesh.name = child.name;

                            // 元の位置情報を mergedMesh にもコピーしておく
                            mergedMesh.userData.originalTransform = { ...child.userData.originalTransform };

                            mergeObjs.push({ parent: child.parent, original: child, merged: mergedMesh });
                        }
                    });

                    // マージ後に置き換え
                    mergeObjs.forEach(item => {
                        item.parent.add(item.merged);
                        item.parent.remove(item.original);
                        modelParts[item.original.name] = item.merged;
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

                    const truncateText = (text, length = 10) => (
                        typeof text === "string" ? (
                            text.length > length ? text.slice(0, length) + ".." : text
                        ) : ""
                    );

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

                        F1_H1_1: {
                            name: "テスト文"
                        },
                        F1_H1_2: {
                            name: "テスト文"
                        },
                        F1_H1_3: {
                            name: "テスト文"
                        },
                        F1_H1_4: {
                            name: "テスト文"
                        },
                        F1_H1_5: {
                            name: "テスト文"
                        },
                        F1_H1_6: {
                            name: "テスト文"
                        },
                        F1_H1_7: {
                            name: "テスト文"
                        },

                        F2_J2_1: exhibits.J2_1,
                        F2_J2_2: exhibits.J2_2,
                        F2_J2_3: exhibits.J2_3,

                        F2_H2_1: {
                            name: "テスト文"
                        },
                        F2_H2_2: {
                            name: "テスト文"
                        },
                        F2_H2_3: {
                            name: "テスト文"
                        },
                        F2_H2_4: {
                            name: "テスト文"
                        },
                        F2_H2_5: {
                            name: "テスト文"
                        },
                        F2_H2_6: {
                            name: "テスト文"
                        },
                        F2_H2_7: {
                            name: "テスト文"
                        },

                        F3_J3_1: exhibits.J3_1,
                        F3_J3_2: exhibits.J3_2,
                        F3_J3_3: exhibits.J3_3,

                        F3_H3_1: {
                            name: "テスト文"
                        },
                        F3_H3_2: {
                            name: "テスト文"
                        },
                        F3_H3_3: {
                            name: "テスト文"
                        },
                        F3_H3_4: {
                            name: "テスト文"
                        },
                        F3_H3_5: {
                            name: "テスト文"
                        },
                        F3_H3_6: {
                            name: "テスト文"
                        },
                        F3_H3_7: {
                            name: "テスト文"
                        },

                        F1_Entrance_Arch: {
                            name: "入口",
                            emphasis: true
                        },
                        F1_Gym_Entrance: {
                            name: "体育館",
                        },
                        F1_Art: {
                            name: "美術棟",
                        },
                    };

                    const labels = {};
                    Object.keys(modelParts).forEach((partName) => {
                        const part = modelParts[partName];
                        const label = document.createElement("div");

                        // part.material.color.set("lightgreen");

                        if (partName.includes("_WC")) {
                            locations[partName] = {
                                name: '<img src="medias/images/wc.svg"/>',
                                description: `トイレ ${getFloor(partName)[0]}階`
                            }
                        }
                        
                        getExhibits();

                        function setTagAttributes (tags, element) {
                            if (!Array.isArray(tags)) return;
                            const tagAttributes = [];
                            tags.forEach(tag => {
                                tagAttributes.push(tag);
                            });
                            element.setAttribute("tag", tagAttributes.join(","));
                        }

                        if (locations[partName]) {
                            label.className = "mapsLabel";
                            label.setAttribute("exhibits", partName);

                            setTagAttributes(locations[partName].tag, label);

                            const isHTMLTag = locations[partName].name.includes("<");

                            const titleText = isHTMLTag ? locations[partName].name : truncateText(locations[partName].name);
                            const descriptionText = locations[partName]?.description;
                            const locationText = locations[partName]?.location?.name;
                            const detailTile = exhibitsArea.querySelector(`.tile[exhibits=${getFmtedObjName(partName)}]`);

                            if (titleText) {
                                const title = d.createElement("div");
                                const text = d.createElement("span");
                                text.innerHTML = titleText;
                                title.className = `title${locations[partName].emphasis ? " emphasis" : ""}`;
                                title.appendChild(text);
                                label.appendChild(title);
                            }

                            /* if (descriptionText) {
                                const description = d.createElement("span");
                                description.textContent = descriptionText;
                                description.className = "description";
                                label.appendChild(description);
                            } */
                            
                            const informations = d.createElement("div");
                            informations.className = "informations";
                            label.appendChild(informations);

                            if (locationText) {
                                const location = d.createElement("span");
                                location.textContent = locationText;
                                location.className = "location";
                                informations.appendChild(location);
                            }
                            
                            if (descriptionText) {
                                const detail = d.createElement("div");
                                detail.textContent = truncateText(descriptionText, 20);
                                detail.className = "detail button";
                                if (!!detailTile) {
                                    detail.classList.add("pressable");
                                    detail.addEventListener("click", e => {
                                        e.preventDefault();
                                        label.classList.remove("opened");
                                        barHeightUpdate(false);
                                        openTile(detailTile, true);
                                        scrollToTile(detailTile);
                                    });
                                }
                                informations.appendChild(detail);
                            }

                            labelsArea.appendChild(label);
                        }

                        (() => {
                            const cancelBtn = d.createElement("div");
                            cancelBtn.classList = "cancelBtn";
                            for (let i = 0; i < 2; i += 1) {
                                const bar = d.createElement("div");
                                bar.className = "bar";
                                bar.style.transform = `rotate(${45 + i * 90}deg)`;
                                cancelBtn.appendChild(bar);
                            }
                            label.appendChild(cancelBtn);
                        });

                        labels[partName] = { element: label, part: part };
                    });

                    (() => {
                        function addLabelTransition (label, transitionDuration = .5) {
                            label.style.setProperty("--duration", `${transitionDuration}s`)
                            label.classList.add("addTransition");
                            const onTransitionEnd = (e) => {
                                if (e.target === label) { // この要素自身のトランジションのみ対象
                                    setTimeout(() => {
                                        label.classList.remove("addTransition");
                                    }, transitionDuration * 1000);
                                }
                            };
                            label.addEventListener("transitionend", onTransitionEnd, { once: true });
                        }

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
                                    labelElement.classList.remove("opened");
                                    addLabelTransition(labelElement);
                                }
                            });
                            if (topLabel) {
                                topLabel.classList.toggle("opened");
                                addLabelTransition(topLabel);
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

                    const getFmtedPx = (px) => px.replace("px", "");
                    function updateLabelsPosition() {
                        const rect = renderer.domElement.getBoundingClientRect();
                        Object.values(labels).forEach(({ element, part }, index) => {
                            const vector = new THREE.Vector3();
                            if (part.geometry) {
                                part.geometry.computeBoundingBox();
                                part.geometry.boundingBox.getCenter(vector);
                                part.localToWorld(vector);
                            }
                            vector.project(camera);

                            const widthHalf = rect.width / 2;
                            const heightHalf = rect.height / 2;

                            const camPos = camera.position;
                            const objPos = part.userData?.originalTransform?.position.clone() || part.getWorldPosition(new THREE.Vector3());
                            const camDistance = camPos.distanceTo(objPos);

                            if (gsap.getProperty(Array.isArray(part.material) ? part.material[0] : part.material, "opacity") === 1) {
                                if (getIsSortConforming(element, getSortConditions())) {
                                    element.classList.remove("invalid");
                                } else {
                                    element.classList.add("invalid");
                                    element.style.setProperty("--labelOpacity", .5);
                                }
                            } else {
                                element.classList.add("invalid");
                                element.style.setProperty("--labelOpacity", 0);
                            }

                            element.setAttribute("isPressable", (
                                !element.classList.contains("invalid") && element.querySelector(".informations")?.textContent.length !== 0
                            ));

                            if (element.getAttribute("isPressable") === "true" || element.style.opacity !== 0) {
                                const leftPx = truncate(vector.x * widthHalf + widthHalf - element.offsetWidth / 2);
                                const topPx  = truncate(-vector.y * heightHalf + heightHalf - element.offsetHeight / 2);
                                if (
                                    Math.abs(getFmtedPx(element.style.getPropertyValue("--leftPx")) - leftPx) > .6
                                ) {
                                    element.style.setProperty("--leftPx", leftPx + "px");
                                }
                                if (
                                    Math.abs(getFmtedPx(element.style.getPropertyValue("--topPx")) - topPx) > .6
                                ) {
                                    element.style.setProperty("--topPx", topPx + "px");
                                }
                                if (Math.abs(element.style.getPropertyValue("--camDistance") - camDistance) > .01) {
                                    element.style.setProperty("--camDistance", camDistance);
                                }

                                // const transformValue = `translate3d(${leftPx}px, ${topPx}px, 0)`;

                                /* if (element.style.transform !== transformValue) {
                                    element.style.transform = transformValue;
                                } */

                                // if (part.name.includes("J2_1")) console.log(camDistance);
                                
                                (() => {
                                    const childWidths = [];
                                    let height = 0;
                                    let width  = 0;

                                    if (element.classList.contains("opened")) {
                                        const childrens = Array.from(element.children);
                                        childrens.forEach(child => {
                                            childWidths.push(child.offsetWidth);
                                            const style = window.getComputedStyle(element);
                                            height = Math.max(
                                                child.offsetTop +
                                                child.getBoundingClientRect().height +
                                                parseFloat(style.marginBottom),
                                                parseFloat(style.marginTop),
                                                height
                                            );
                                        });
                                        width = Math.max(...childWidths);
                                    } else {
                                        const title = element.querySelector(".title");
                                        if (title) {
                                            width  = title.getBoundingClientRect().width;
                                            height = title.getBoundingClientRect().height;
                                        }
                                    }
                                    width  += "px";
                                    height += "px";

                                    const widthProperty = "--width";
                                    const heightProperty = "--height";

                                    if (getComputedStyle(element).getPropertyValue(widthProperty) !== width) {
                                        element.style.setProperty(widthProperty,  width);
                                    }
                                    if (getComputedStyle(element).getPropertyValue(heightProperty) !== height) {
                                        element.style.setProperty(heightProperty, height);
                                    }
                                })();

                                /* element.style.setProperty("--wholeWidth",  wholeWidth + "px");
                                element.style.setProperty("--wholeHeight",  wholeHeight + "px");

                                const title = element.querySelector("span.title");
                                if (title) {
                                    const titleWidth = title.getBoundingClientRect().width;
                                    const titleHeight = title.getBoundingClientRect().height;
                                    element.style.setProperty("--titleWidth",  titleWidth + "px");
                                    element.style.setProperty("--titleHeight", titleHeight + "px");
                                } */
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
                            updateCameraAngle({
                                horizontal: -deviceHeading,
                                duration: 0
                            });
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

                    function removeDirectionMatch () {
                        window.removeEventListener("deviceorientation", deviceorientationHandler);
                    }
                    mapsView.addEventListener("touchstart", removeDirectionMatch);
                    mapsView.addEventListener("mousedown", removeDirectionMatch);

                    (() => { // 無効化済み
                        const generateTouches = (e) => e ? [e?.clientX || e.touches[0]?.clientX, e?.clientY || e.touches[0]?.clientY] : [null, null];

                        let isNowBarTouch = false;
                        let firstCameraDeg = camHorizontal;
                        let firstTouches = [];

                        function barTouchStart (e) {
                            const touches = generateTouches(e);
                            isNowBarTouch = true;
                            firstCameraDeg = camHorizontal;
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
                                updateCameraAngle({
                                    horizontal: firstCameraDeg + differences[0] * -.1
                                });
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

                    const panLimit = 2.2;

                    (() => { // 無効化済み
                        // Y=0 の水平面にグリッドを作成
                        const squareSize = panLimit * 2;
                        const half = squareSize / 2;
                        const divisions = 64; // 内部の分割数（好みで変更

                        const gridMaterial = new THREE.LineBasicMaterial({
                            color: "lightgray",
                            opacity: 0.1
                        });

                        // 外周の正方形
                        const outerVertices = new Float32Array([
                            -half, 0.01, -half,
                            half, 0.01, -half,
                            half, 0.01,  half,
                            -half, 0.01,  half,
                            -half, 0.01, -half
                        ]);
                        const outerGeometry = new THREE.BufferGeometry();
                        outerGeometry.setAttribute("position", new THREE.BufferAttribute(outerVertices, 3));
                        scene.add(new THREE.Line(outerGeometry, gridMaterial));

                        // 内部グリッド線（水平・垂直）
                        const gridHeight = 0; // グリッド線の高さ（Y座標）

                        for (let i = 1; i < divisions; i++) {
                            const t = -half + (squareSize / divisions) * i;

                            // 水平線 (Z方向に平行)
                            const hVertices = new Float32Array([
                                -half, gridHeight, t,
                                half, gridHeight, t
                            ]);
                            const hGeometry = new THREE.BufferGeometry();
                            hGeometry.setAttribute("position", new THREE.BufferAttribute(hVertices, 3));
                            scene.add(new THREE.Line(hGeometry, gridMaterial));

                            // 垂直線 (X方向に平行)
                            const vVertices = new Float32Array([
                                t, gridHeight, -half,
                                t, gridHeight,  half
                            ]);
                            const vGeometry = new THREE.BufferGeometry();
                            vGeometry.setAttribute("position", new THREE.BufferAttribute(vVertices, 3));
                            scene.add(new THREE.Line(vGeometry, gridMaterial));
                        }
                    });

                    let lastLabelUpdate = 0;

                    // パン操作時にモデルから離れすぎないように制限
                    controls.addEventListener("change", () => {
                        const now = Date.now();

                        camera.zoom = THREE.MathUtils.clamp(camera.zoom, .6, 5);
                        camera.updateProjectionMatrix();

                        (() => {
                            function cameraPan({
                                x: targetX = targetOffset.x,
                                z: targetZ = targetOffset.z,
                                duration: duration = 1
                            }) {
                                // 現在のカメラとターゲットの差分ベクトル
                                const offset = new THREE.Vector3().subVectors(camera.position, controls.target);

                                // ターゲットを指定位置に移動
                                controls.target.set(targetX, controls.target.y, targetZ);

                                // カメラの位置もターゲットに対して同じオフセットで移動
                                camera.position.copy(controls.target).add(offset);

                                // controlsを更新
                                controls.update();
                            }

                            const targetOffset = controls.target.clone();
                            const distance = targetOffset.length();
                            controls.panSpeed = Math.max(
                                Math.min(panLimit - distance, 1),
                                0.25
                            );

                            // 円形の制限: 距離が panLimit を超えた場合のみスケーリング
                            if (distance > panLimit) {
                                const scale = panLimit / distance;
                                cameraPan({
                                    x: targetOffset.x * scale,
                                    z: targetOffset.z * scale
                                });
                            }
                        })();

                        // カメラの前方向ベクトルを取得
                        const cameraDirection = new THREE.Vector3();
                        camera.getWorldDirection(cameraDirection);

                        const radToDeg = 180 / Math.PI;

                        // 横方向の角度（北=+Z, 東=+X と仮定）
                        camHorizontal = Math.atan2(cameraDirection.x, cameraDirection.z) * radToDeg + 180;

                        // 縦方向の角度（水平=0, 上=+90, 下=-90）
                        camVertical = Math.asin(cameraDirection.y) * -radToDeg;

                        // コンパスを回転
                        compass.style.transform = `rotate(${camHorizontal}deg)`;

                        if (now - lastLabelUpdate > 0) {
                            updateLabelsPosition();
                            lastLabelUpdate = now;

                            const button_dimension_text = isShow2DMap ? "3D" : "2D";
                            if (button_dimension.textContent !== button_dimension_text) button_dimension.textContent = button_dimension_text;

                            return;
                            const is3D = (
                                Math.abs(getCamHorizontalSnap(camHorizontal) - camHorizontal) > 1 ||
                                (Math.round(Math.abs(camVertical)) < 85)
                            );

                            isShow2DMap = !is3D && button_dimensionMode_2D();

                            if (isShow2DMap) {
                                controlMethodUpdate({
                                    touches: {
                                        ONE: THREE.TOUCH.PAN,
                                        TWO: THREE.TOUCH.DOLLY_PAN
                                    },
                                    mouseButtons: {
                                        LEFT: THREE.MOUSE.PAN,
                                        MIDDLE: THREE.MOUSE.NONE,
                                        RIGHT: THREE.MOUSE.NONE
                                    }
                                });
                            } else {
                                controlMethodUpdate();
                            }
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

        function windowResize() {
            const topMargin = (
                parseFloat(getComputedStyle(mapsView).getPropertyValue("--topBarHeight")) +
                parseFloat(getComputedStyle(mapsView).getPropertyValue("--tabsHeight"))
            );

            const aspect = mapsView.clientWidth / mapsView.clientHeight;

            camera.left   = -cameraSize * aspect;
            camera.right  = cameraSize * aspect;
            camera.top    = cameraSize + topMargin / mapsView.clientHeight * cameraSize * 2; // topMarginをカメラの高さに換算
            camera.bottom = -cameraSize;
            camera.updateProjectionMatrix();

            renderer.setSize(mapsView.clientWidth, mapsView.clientHeight + topMargin);

            barHeightUpdate();
        }

        windowResize();
        window.addEventListener("resize", windowResize);

        function setEdgeStyle(mesh, {
            color = "lightgray",
            opacity = 1,
            duration = 0.5
        } = {}) {
            if (mesh.userData.edgeLine) {
                const edgeMat = mesh.userData.edgeLine.material;
                gsap.to(edgeMat.color, {
                    r: new THREE.Color(color).r,
                    g: new THREE.Color(color).g,
                    b: new THREE.Color(color).b,
                    duration: duration,
                    ease: "power2.inOut"
                });
                gsap.to(edgeMat, {
                    opacity: opacity,
                    duration: duration,
                    ease: "power2.inOut"
                });
            }
        }

        // OrbitControls 初期化
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // 慣性スクロール
        controls.enableRotate = true;
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;

        function controlMethodUpdate(options = {}) {
            const {
                touches = {
                    ONE: THREE.TOUCH.ROTATE,
                    TWO: THREE.TOUCH.DOLLY_PAN
                },
                mouseButtons = {
                    LEFT: THREE.MOUSE.ROTATE,
                    MIDDLE: THREE.MOUSE.PAN,
                    RIGHT: THREE.MOUSE.NONE
                }
            } = options;

            controls.touches = touches;
            controls.mouseButtons = mouseButtons;
        }

        controlMethodUpdate();

        let isShow2DMap = false;

        controls.minDistance = 2;
        controls.maxDistance = 10;
        function setCamAngleLimit(min = 0, max = 85) {
            controls.minPolarAngle = THREE.MathUtils.degToRad(min);
            controls.maxPolarAngle = THREE.MathUtils.degToRad(max);
            if (isShow2DMap) {
                controls.minAzimuthAngle = 0;
            } else {
                controls.minAzimuthAngle = -Infinity;
                controls.maxAzimuthAngle = Infinity;
            }
        }
        setCamAngleLimit();

        function updateCameraAngle({
            horizontal = 0,
            vertical = 45,
            duration = 1,
            onComplete: finish
        } = {}) {
            console.log("updateCameraAngle : ", horizontal, vertical);

            // 回転禁止＆慣性無効化
            let prevDamping;
            setTimeout(() => {
                controls.enableRotate = false;
                prevDamping = controls.enableDamping;
                controls.enableDamping = false;
            }, duration);

            const start = { h: camHorizontal, v: camVertical };
            const target = {
                h: horizontal !== undefined ? horizontal : camHorizontal,
                v: vertical !== undefined ? vertical : camVertical
            };

            function updateAngle() {
                camHorizontal = start.h;
                camVertical = start.v;

                const distance = camera.position.distanceTo(controls.target);
                const spherical = new THREE.Spherical(
                    distance,
                    THREE.MathUtils.degToRad(90 - camVertical),
                    THREE.MathUtils.degToRad(camHorizontal)
                );
                const offset = new THREE.Vector3().setFromSpherical(spherical);

                camera.position.copy(controls.target.clone().add(offset));
                controls.update();
            }

            function onComplete() {
                // 回転と慣性を元に戻す
                controls.enableRotate = !isShow2DMap;
                controls.enableDamping = prevDamping;
                if (finish) finish();
                controls.update();
            }

            if (duration === 0 || !gsap || typeof gsap === "undefined") {
                start.h = target.h;
                start.v = target.v;
                updateAngle();
                onComplete();
                return;
            }

            let deltaH = ((target.h - start.h + 180) % 360) - 180;
            gsap.to(start, {
                h: start.h + deltaH,
                v: target.v,
                duration: duration,
                ease: "power2.inOut",
                onUpdate: updateAngle,
                onComplete: onComplete
            });
        }

        const button_dimension = d.createElement("div");
        function button_dimensionMode_2D (isAdd) {
            if (isAdd === true) {
                button_dimension.classList.add("mode_2D");
            } else if (isAdd === false) {
                button_dimension.classList.remove("mode_2D");
            } else {
                return button_dimension.classList.contains("mode_2D");
            }
        }
        button_dimension.className = "dimension button";

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
                /* if (index === 0) {
                    updateCameraAngle({
                        horizontal: 45,
                        vertical: 85,
                        duration: 0
                    });
                    return;
                } */
                const allButtons = buttons_left.querySelectorAll(".button");

                const isOnlyValid = !button.classList.contains("invalid") &&
                    [...allButtons].every(b => b === button || b.classList.contains("invalid"));

                if (isOnlyValid && !isShow2DMap) { // 2Dマップ表示中は全解除しない
                    allButtons.forEach(el => {
                        el.classList.remove("invalid");
                    });
                } else {
                    allButtons.forEach((el, index, arr) => {
                        el.classList.remove("invalid");
                        if (el !== button) el.classList.add("invalid");
                    });
                }

                // アクティブフロアを配列で取得
                const activeFloors = [...buttons_left.querySelectorAll(".button")]
                    .filter(btn => !btn.classList.contains("invalid"))
                    .map(btn => btn.getAttribute("floor").replaceAll("f", "") * 1);

                Object.values(modelParts).forEach(part => {
                    const isPartActive = (
                        getFloor(part.name)[0] ?
                        getFloor(part.name).some(floorNum => activeFloors.includes(floorNum)) :
                        !( (!isOnlyValid || isShow2DMap) && (
                            part.name.includes("Roof") ||
                            part.name.includes("Curve")
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
            
            buttons_left.appendChild(button);
        });

        const getCamHorizontalSnap = (horizontal) => Math.round(Math.round(horizontal / 45) * 45);

        (() => {
            button_dimension.addEventListener("click", () => {
                isShow2DMap = !isShow2DMap;
                mapsView.style.pointerEvents = "none";
                if (isShow2DMap) {
                    updateCameraAngle({
                        horizontal: getCamHorizontalSnap(camHorizontal),
                        vertical: 89.5,
                        onComplete: () => {
                            setCamAngleLimit(0, 0);
                            mapsView.style.pointerEvents = "auto";
                        }
                    });
                    controlMethodUpdate({
                        touches: {
                            ONE: THREE.TOUCH.PAN,
                            TWO: THREE.TOUCH.DOLLY_PAN
                        },
                        mouseButtons: {
                            LEFT: THREE.MOUSE.PAN,
                            MIDDLE: THREE.MOUSE.NONE,
                            RIGHT: THREE.MOUSE.NONE
                        }
                    });
                } else {
                    setCamAngleLimit()
                    updateCameraAngle({
                        horizontal: camHorizontal,
                        onComplete: () => {
                            setCamAngleLimit();
                            mapsView.style.pointerEvents = "auto";
                        }
                    });
                    controlMethodUpdate();
                }
                const floorButtons = buttons_left.querySelectorAll("div.button");
                if (
                    Array.from(floorButtons)
                       .every(btn => !btn.classList.contains("invalid"))
                ) {
                    floorButtons.forEach((button, index, arr) => {
                        if (index === arr.length - 1) button.click();
                    });
                }
            });

            buttons_right.appendChild(compass);
            buttons_right.appendChild(button_dimension);
        })();

        // mapsView.appendChild(compassBar);
        mapsView.appendChild(labelsArea);
        mapsView.appendChild(buttons_left);
        mapsView.appendChild(buttons_right);
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
