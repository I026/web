const exhibitsBottomBar = d.querySelector(".exhibits .sortList");
const exhibitsArea = d.querySelector(".exhibits .list");

exhibitsBottomBar.addEventListener("wheel", e => {
    e.preventDefault();
    e.stopPropagation();
}, { passive: false });

const getClassName = (school, input_grade, input_class) => (
    `${school == "H" || input_class > 3 ? "高校" : "中学"} ${input_grade}年${input_class}組`
);

const exhibits = {
    J1_1: {
        name: "テスト文",
        description: "テスト文",
        tag: [
            "byClass",
            "J1",
        ],
        image: "medias/exhibits/J1_1.png",
    },
    J1_2: {
        name: "テスト文",
        description: "テスト文",
        tag: [
            "byClass",
            "J1",
        ],
    },
    J1_3: {
        name: "テスト文",
        description: "テスト文",
        tag: [
            "byClass",
            "J1",
        ],
    },
    J2_1: {
        name: "お化け屋敷",
        description: "怖いお化けってなんでしょう? 意味合いを辞書的に考えるようなあたまのかたいひととは違って､私はちゃんとClaudeにききます",
        tag: [
            "byClass",
            "J2",
            "attractions",
        ],
    },
    J2_2: {
        name: "サービスエリア",
        description: "テスト文",
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
        description: "テスト文",
        tag: [
            "byClass",
            "J2",
            "attractions",
        ],
    },
    J3_1: {
        name: "テスト文",
        description: "テスト文",
        tag: [
            "byClass",
            "J3",
        ],
    },
    J3_2: {
        name: "テスト文",
        description: "テスト文",
        tag: [
            "byClass",
            "J3",
        ],
    },
    J3_3: {
        name: "テスト文",
        description: "テスト文",
        tag: [
            "byClass",
            "J3",
        ],
    },
    H3_6: {
        name: "お化け屋敷(らしい)",
        description: "(らしいよ!! そうらしい!!!!!!!)",
        tag: [
            "byClass",
            "H3",
        ],
    },
}

const maps_pointIcon = '<img src="medias/images/mapPoint.svg"/>';

const maps_words = {
    Subjects: {
        Japanese: "日本語",
        Math: "数学",
        English: "英語",
        Science: "理科",
        SocialStudies: "社会",
        Music: "音楽",
        Life: "人間生活",
        Art: "美術",
        PhysicalEdu: "体育",
        Information: "情報",
        Woodworking: "木工",
    },
    Subject: "科",
    Room: "室",
    Laboratory: "研究",
    Preparation: "準備",
    NextTo: "の隣",
    Inside: "の中",
    Infront: "の前",
};

const maps_locationNames = {
    Bus: "バス",
    Entrance: "入口",
    Woodworking: `${maps_words.Subjects.Woodworking}${maps_words.Room}`,
    Dining: "食堂",
    Gym: `${maps_words.Subjects.PhysicalEdu}館`,
    Art: `${maps_words.Subjects.Art}棟`,
    Multipurpose: "多目的ホール",
    Science_A: `${maps_words.Subjects.Science}${maps_words.Room}A`,
    Science_B: `${maps_words.Subjects.Science}${maps_words.Room}B`,
    Science_C: `${maps_words.Subjects.Science}${maps_words.Room}C`,
    Science_D: `${maps_words.Subjects.Science}${maps_words.Room}D`,
    Science_Preparation: `${maps_words.Subjects.Science}${maps_words.Preparation}${maps_words.Room}`,
    Science_Laboratory: `${maps_words.Subjects.Science}${maps_words.Laboratory}${maps_words.Room}`,
    SocialStudies_Laboratory: `${maps_words.Subjects.SocialStudies}${maps_words.Subject}${maps_words.Laboratory}${maps_words.Room}`,
    English_Laboratory: `${maps_words.Subjects.English}${maps_words.Subject}${maps_words.Laboratory}${maps_words.Room}`,
    Music_Small: `小${maps_words.Subjects.Music}${maps_words.Room}`,
    Music_Large: `大${maps_words.Subjects.Music}${maps_words.Room}`,
    Life_Laboratory: `${maps_words.Subjects.Life}${maps_words.Subject}${maps_words.Laboratory}${maps_words.Room}`,
    Cooking: `調理${maps_words.Room}`,
    Music_2: `第2${maps_words.Subjects.Music}${maps_words.Room}`,
    Music_3: `第3${maps_words.Subjects.Music}${maps_words.Room}`,
    Computers: `${maps_words.Subjects.Information}教${maps_words.Room}`,
    Math_Laboratory: `${maps_words.Subjects.Math}${maps_words.Subject}${maps_words.Laboratory}${maps_words.Room}`,
    Music_Laboratory: `${maps_words.Subjects.Music}${maps_words.Subject}${maps_words.Laboratory}${maps_words.Room}`,
};

const maps_locations = {
    currentLocationPoint: {
        name: "現在地",
        description: "おおよその現在地",
        isEdgeShow: true,
        offset: {
            y: .1,
        },
    },

    F1_Entrance_Arch: {
        name: maps_locationNames.Entrance,
        emphasis: true,
        location: {
            name: "正面玄関"
        },
        isAlwaysShow: true,
        isEdgeShow: true,
    },
    Dining_Roof: {
        name: maps_locationNames.Dining,
        offset: {
            y: .2,
        },
        description: `${maps_locationNames.Dining}のメニュー`,
        onClick: () => {
            window.location.href = "./?page=5";
        },
        image: "./medias/pages/0.png",
        isAlwaysShow: true,
        isEdgeShow: true,
    },

    F1_Art_WC: {
        location: {
            name: `${maps_locationNames.Art}${maps_words.Inside}`,
        }
    },
    F1_Dining_WC: {
        location: {
            name: `${maps_locationNames.Dining}${maps_words.Inside}`,
        }
    },
    F1_J_WC: {
        location: {
            name: `${getClassName("J", 1, 3)}${maps_words.NextTo}`,
        }
    },
    F2_J_WC: {
        location: {
            name: `${getClassName("J", 2, 3)}${maps_words.NextTo}`,
        }
    },
    F3_J_WC: {
        location: {
            name: `${getClassName("J", 3, 3)}${maps_words.NextTo}`,
        }
    },
    F1_H_WC: {
        location: {
            name: `${getClassName("H", 1, 4)}${maps_words.Infront}`,
        }
    },
    F2_H_WC: {
        location: {
            name: `${getClassName("H", 2, 4)}${maps_words.Infront}`,
        }
    },
    F3_H_WC: {
        location: {
            name: `${getClassName("H", 3, 4)}${maps_words.Infront}`,
        }
    },
    F1_WC: {
        location: {
            name: `${maps_locationNames.Science_Preparation}${maps_words.NextTo}`,
        }
    },
    F2_WC: {
        location: {
            name: `${maps_locationNames.Cooking}${maps_words.NextTo}`,
        }
    },
    F3_WC: {
        location: {
            name: `${maps_locationNames.Computers}${maps_words.NextTo}`,
        }
    },
    F1_Gym_WC: {
        location: {
            name: `${maps_locationNames.Gym}${maps_words.Inside}`,
        }
    },
    F1_Gym_WC001: {
        location: {
            name: `${maps_locationNames.Gym}${maps_words.Inside}`,
        }
    },

    F1_Certificate_Table: {
        name: maps_pointIcon,
        description: "金券",
        offset: {
            y: 0,
        },
    },
    F1_Gym_Entrance: {
        name: maps_locationNames.Gym,
    },
    F1_F2_Art: {
        name: maps_locationNames.Art,
        offset: {
            y: .5,
        },
    },
    F1_Multipurpose: {
        location: {
            name: maps_locationNames.Multipurpose,
        },
    },
    F1_Woodworking: {
        location: {
            name: maps_locationNames.Woodworking,
        },
    },
    F1_Science_A: {
        location: {
            name: maps_locationNames.Science_A,
        },
    },
    F1_Science_B: {
        location: {
            name: maps_locationNames.Science_B,
        },
    },
    F1_Science_C: {
        location: {
            name: maps_locationNames.Science_C,
        },
    },
    F1_Science_D: {
        location: {
            name: maps_locationNames.Science_D,
        },
    },
    F1_Science_Preparation: {
        location: {
            name: maps_locationNames.Science_Preparation,
        },
    },
    F1_Science_Laboratory: {
        location: {
            name: maps_locationNames.Science_Laboratory,
        },
    },
    F2_SocialStudies_Laboratory: {
        location: {
            name: maps_locationNames.SocialStudies_Laboratory,
        },
    },
    F2_English_Laboratory: {
        location: {
            name: maps_locationNames.English_Laboratory,
        },
    },
    F2_Music_Small: {
        location: {
            name: maps_locationNames.Music_Small,
        },
    },
    F2_Music_Large: {
        location: {
            name: maps_locationNames.Music_Large,
        },
    },
    F2_Life_Laboratory: {
        location: {
            name: maps_locationNames.Life_Laboratory,
        },
    },
    F2_Cooking: {
        location: {
            name: maps_locationNames.Cooking,
        },
    },

    F3_Music_2: {
        location: {
            name: maps_locationNames.Music_2,
        },
    },
    F3_Music_3: {
        location: {
            name: maps_locationNames.Music_3,
        },
    },
    F3_Computers: {
        location: {
            name: maps_locationNames.Computers,
        },
    },
    F3_Math_Laboratory: {
        location: {
            name: maps_locationNames.Math_Laboratory,
        },
    },
    F3_Music_Laboratory: {
        location: {
            name: maps_locationNames.Music_Laboratory,
        },
    },
    BusStation_Base: {
        name: `${maps_locationNames.Bus}停`,
        description: `${maps_locationNames.Bus}ダイヤを見る`,
        image: "./medias/pages/0.png",
        onClick: () => {
            window.location.href = "./?page=5";
        },
        offset: {
            y: .1,
        },
        isAlwaysShow: true,
        isEdgeShow: true,
    },

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
    F3_H3_6: exhibits.H3_6,
    F3_H3_7: {
        name: "テスト文"
    },
};

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

    targetTile.style.setProperty("--tileOpenHeight", (() => {
        let height = 0;
        Array.from(targetTile.children).forEach(child => {
            height += (
                child.scrollHeight
            );
        });
        return height;
    })() + "px");

    allTiles.forEach(element => {
        if (element !== targetTile) element.classList.remove("opened");
    });
    if (isToOpen) {
        targetTile.classList.add("opened");
    } else {
        targetTile.classList.remove("opened");
    }
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

barHeightUpdate();

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

function barTabClick (tabIndex) {
    bottomBar_contents.scrollTo({
        top: 0,
        left: tabIndex * bottomBar_contents.scrollWidth,
        behavior: "smooth"
    });
    tabClassUpdate(tabIndex);
    barHeightUpdate(true);
}

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
/**
 * @param {THREE.Object3D} target
 * @param {THREE.OrthographicCamera} camera
 * @param {THREE.OrbitControls} controls
 * @param {number} margin
 */

// カメラ
const maps_renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true
});
const maps_aspect = window.innerWidth / window.innerHeight;
const maps_cameraSize = 1.2; // 表示範囲の大きさ（好みで調整）
const maps_camera = new THREE.OrthographicCamera(
    -maps_cameraSize * maps_aspect,  // left
    maps_cameraSize * maps_aspect,   // right
    maps_cameraSize,            // top
    -maps_cameraSize,           // bottom
    1,
    200
);

const maps_labelRenderer = new CSS2DRenderer();
const maps_labelsArea = maps_labelRenderer.domElement;
maps_labelsArea.style.position = "absolute";
maps_labelsArea.style.pointerEvents = "none";
maps_labelsArea.className = "labelsArea";

// OrbitControls 初期化
const maps_controls = new OrbitControls(maps_camera, maps_renderer.domElement);

function cameraPan({
    x: targetX = targetOffset.x,
    z: targetZ = targetOffset.z,
    duration: duration = 1
}) {
    // 現在のカメラとターゲットの差分ベクトル
    const offset = new THREE.Vector3().subVectors(maps_camera.position, maps_controls.target);

    function instantMove () {
        maps_controls.target.set(targetX, maps_controls.target.y, targetZ);
        maps_camera.position.copy(maps_controls.target).add(offset);
        maps_controls.update();
    }

    if (duration === 0) {
        instantMove();
    } else {
        const startTarget = maps_controls.target.clone();
        const startCamera = maps_camera.position.clone();

        gsap.to(startTarget, {
            x: targetX,
            z: targetZ,
            duration: duration,
            ease: "power2.inOut",
            onUpdate: () => {
                maps_controls.target.set(startTarget.x, maps_controls.target.y, startTarget.z);
                maps_camera.position.copy(maps_controls.target).add(offset);
                maps_controls.update();
            },
            onComplete: instantMove
        });
    }
}

const maps_labels = {};

function maps_frameObject({
    target: target,
    camera: camera = maps_camera,
    controls: controls = maps_controls,
    duration: duration = 1,
    isToCenter: isToCenter = true,
    zoom: zoom = Math.max(2.1, maps_camera.zoom),
    offsetZ: offsetZ = -.15,
}) {
    if (maps_labels[target?.name]?.element) console.log(
        getComputedStyle(maps_labels[target?.name]?.element).height.replace("px", "") * 1
    );
    if (!target?.geometry) return;

    // バウンディングボックスの取得
    target.geometry.computeBoundingBox();
    const bbox = target.geometry.boundingBox.clone();

    // ワールド座標系に変換
    bbox.applyMatrix4(target.matrixWorld);

    const center = new THREE.Vector3();
    bbox.getSize(center);
    bbox.getCenter(center);

    // ズームもスムーズに変更する場合
    gsap.to(camera, {
        zoom: zoom, // 目標ズーム値
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix()
    });

    // OrbitControls の注視点もトランジション付きで更新
    if (controls) {
        // 既存の中心へのズーム・注視点移動処理
        if (controls.enableRotate) {
            gsap.to(controls.target, {
                x: center.x,
                y: center.y + offsetZ,
                z: center.z,
                duration: duration,
                ease: "power2.inOut",
                onUpdate: () => controls.update()
            });
        } else {
            const currentTarget = controls.target;
            const newTarget = new THREE.Vector3(center.x, currentTarget.y, center.z);
            cameraPan({
                x: newTarget.x,
                y: newTarget.y,
                z: newTarget.z,
                duration: duration
            });
        }
    }
}

let maps_modelParts = {};

const mapsView = d.createElement("div");

function maps_addLabelTransition (label, transitionDuration = .5) {
    label.style.setProperty("--duration", `${transitionDuration}s`)
    label.classList.add("addTransition");
    const onTransitionEnd = (e) => {
        if (e.target === label) { // この要素自身のトランジションのみ対象
            setTimeout(() => {
                label.classList.remove("addTransition");
            }, transitionDuration * 1000 + 500);
        }
    };
    label.addEventListener("transitionend", onTransitionEnd, { once: true });
}

const maps_buttons_right = d.createElement("div");
const maps_buttons_left = d.createElement("div");

function maps_changeFloor (floor) {
    const floorButtons = maps_buttons_left.querySelectorAll("div.button");
    floorButtons[0].click();
}

function get_isEveryFloorValid () {
    const floorButtons = maps_buttons_left.querySelectorAll("div.button");
    return Array.from(floorButtons)
        .every(btn => !btn.classList.contains("invalid"));
};

function maps_getFloor (name) {
    const regex = /F(\d+)_/g; // gフラグで全マッチ取得
    const matches = [...name.matchAll(regex)];
    return matches.map(match => Number(match[1]));
}

d.addEventListener("click", e => {
    if (exhibitsArea.contains(e.target)) {
        const tile = e.target.closest(".tile");
        if (tile) openTile(tile);
    }
    if (!searchBarsEl.contains(e.target) && !exhibitsBottomBar.contains(e.target)) {
        searchAreaEl.classList.remove("opened");
        updateSort("");
    }
});

function startObserve({ target, callback, once = true, threshold = 0 }) {
  if (!target) return;

  // 複数要素の場合も配列にする
  const elements = NodeList.prototype.isPrototypeOf(target) || Array.isArray(target)
    ? target
    : [target];

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        if (once) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, { threshold });

  elements.forEach(el => observer.observe(el));
}

for (let i = 0; i < exhibitsLength; i += 1) {
    const tile = d.createElement("div");
    const names = d.createElement("div");
    const location = d.createElement("div");
    const description = d.createElement("div");
    const tagsContent = d.createElement("div");
    const images = d.createElement("div");
    const tags = d.createElement("div");

    tile.setAttribute("exhibits", getExhibits(i)[0]);
    tile.className = "tile inVisible";

    startObserve({
        target: tile,
        callback: () => {
            // 上の要素をすべて削除
            const tiles = Array.from(exhibitsArea.children);
            for (let i = 0; i < tiles.indexOf(tile) + 1; i += 1) {
                if (tiles[i].classList.contains("inVisible")) {
                    tiles[i]?.classList.remove("inVisible");
                    tiles[i].style.animationDelay = `${i * .05}s`;
                }
            }
        },
        once: true,
    });

    if (!getExhibits(i)[1].location) {
        getExhibits(i)[1].location = {};
    }
    if (!getExhibits(i)[1].location.name) {
        getExhibits(i)[1].location.name = getClassName(
            getExhibits(i)[0].split("_")[0].split("")[0],
            getExhibits(i)[0].split("_")[0].split("")[1],
            getExhibits(i)[0].split("_")[1]
        );
    }

    names.textContent = getExhibits(i)[1].name;
    names.classList.add("names");
    
    images.className = "images";
    const image = d.createElement("img");
    images.appendChild(image);
    if (getExhibits(i)[1].image) {
        image.src = getExhibits(i)[1].image;
        images.appendChild(image);
    }

    const locationText = d.createElement("span");
    locationText.className = "locationText";
    locationText.textContent = getExhibits(i)[1].location.name;
    location.className = "location button";
    location.appendChild(locationText);
    (() => {
        const arrow = d.createElementNS("http://www.w3.org/2000/svg", "svg");
        arrow.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        const path = d.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M228.451,230.092L228.451,850.906L849.265,850.906");

        const text = d.createElement("span");
        text.className = "text";
        text.textContent = "地図で見る";

        arrow.appendChild(path);
        location.appendChild(arrow);
        location.appendChild(text);
    })();
    location.addEventListener("click", e => {
        e.stopPropagation();
        barTabClick(1);
        Object.values(maps_locations).forEach((item, index) => {
            if (getExhibits(i)[1] === item) {
                const targetObj = maps_modelParts[Object.keys(maps_locations)[index]];
                maps_frameObject({
                    target: targetObj,
                });
                const targetLabel = maps_labelsArea.querySelector(`.mapsLabel[exhibits="${Object.keys(maps_locations)[index]}"]`);
                targetLabel.classList.add("opened");
                maps_addLabelTransition(targetLabel);
                if (!get_isEveryFloorValid()) maps_changeFloor(maps_getFloor(targetObj.name));
            }
        });
    });
    
    description.innerHTML = `<span>${getExhibits(i)[1].description}</span>`;
    description.classList.add("description");

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
    tile.appendChild(location);
    tile.appendChild(description);
    tile.appendChild(images);
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
}

const getEscapeReg = (string) => string[0] ? string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : null;

function getSortConditions () {
    let conditions = [];
    const checkedTags = exhibitsBottomBar.querySelectorAll(".tag.checkedBox:not([isButton])");
    checkedTags.forEach(element => {
        conditions.push(element.getAttribute("tag"));
    });
    return conditions;
}

const existingSearchValue = queryParameter({
    type: "get",
    key: "search",
}) || "";

function toKatakana(input, {normalizeHalfwidth = true} = {}) {
    let s = String(input);
    if (normalizeHalfwidth) s = s.normalize('NFKC'); // 半角カナを全角にする（必要なら false に）
    const H_START = 0x3041, H_END = 0x3096;
    const OFFSET = 0x60; // 96

    return Array.from(s).map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= H_START && cp <= H_END) {
            return String.fromCodePoint(cp + OFFSET);
        }
        // そのほかはそのまま（長音記号や記号、漢字、英数字など）
        return ch;
    }).join('');
}

function toHiragana(input, {normalizeHalfwidth = true} = {}) {
    let s = String(input);
    if (normalizeHalfwidth) s = s.normalize('NFKC'); // 半角カナを全角にする
    const K_START = 0x30A1, K_END = 0x30F6;
    const OFFSET = 0x60; // 96

    return Array.from(s).map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= K_START && cp <= K_END) {
        return String.fromCodePoint(cp - OFFSET);
        }
        return ch;
    }).join('');
}

// 検索
function getExhibitsSearch (exhibit, searchWord = getSearchValue()) {
    let searchHits = [];
    const exhibitItem = exhibit;
    const targets = [
        exhibitItem?.name,
        exhibitItem?.description,
        exhibitItem?.location?.name,
    ];
    exhibitItem?.tag?.forEach(tag => {
        targets.push(tagOrder[tag].displayName);
    });
    let isHit = false;
    searchHits = [];
    const spliteds = [];
    targets?.forEach((target, i) => {
        const splited = target?.split(
            new RegExp(
                `(${getEscapeReg(searchWord)}|${getEscapeReg(toHiragana(searchWord))}|${getEscapeReg(toKatakana(searchWord))})`
            )
        );
        spliteds.push(splited);
        if (
            !searchWord ||
            searchWord === "" ||
            splited?.length > 1
        ) {
            isHit = true;
            searchHits.push([target, i]);
        }
    });
    return {
        isHit: isHit,
        hits: searchHits,
        spliteds: spliteds
    };
}

const searchAreaEl = d.querySelector(".main.content .searchArea")
const searchBarsEl = d.querySelector(".main.content .searchBars")
const searchInputsEl = d.querySelector(".main.content .searchInputs")
const newSearchBarEl = d.createElement("input");

function getIsSortConforming (exhibit, conditions = getSortConditions(), searchWord = getSearchValue()) {
    let isConforming = true;
    const searchHits = [];
    const searchRes = getExhibitsSearch(exhibit, searchWord);
    if (searchRes.isHit) {
        searchHits.push(searchRes.hits);
        for (const condition of conditions) {
            if (
                !exhibit?.tag?.includes(condition)
            ) {
                isConforming = false;
                break;
            }
        };
    } else {
        isConforming = false;
    }
    return {
        isConforming: isConforming,
        searchHits: searchHits,
        spliteds: searchRes.spliteds,
    };
}

function updateButtonText (targetEl, textValue) {
    if (!targetEl) return;
    const newText = textValue;
    const newTextArea = d.createElement("span");
    const existingSpan = targetEl.querySelector("span");
    if (
        existingSpan?.textContent !== newText ||
        existingSpan?.innerHTML !== newText
    ) {
        const animDuration = 300;
        targetEl.querySelectorAll("span").forEach(span => {
            span.style.animation = "none";
            span.offsetHeight;
            span.style.animation = `showText ${animDuration}ms ease-in-out both reverse`;
            setTimeout(() => {
                span.remove();
            }, animDuration * 2);
        });
        newTextArea.innerHTML = newText.replaceAll("\n", "<br>");
        newTextArea.style.animation = `showText ${animDuration}ms ease-in-out both`;
        newTextArea.style.animationDelay = `${animDuration}ms`;
        newTextArea.style.position = "absolute";
        newTextArea.style.whiteSpace = "nowrap";
        targetEl.appendChild(newTextArea);
        targetEl.style.transition = `width ${animDuration * 2}ms ease-in-out, height ${animDuration * 2}ms ease-in-out,`;
        targetEl.style.position = "relative";
        targetEl.style.display = "flex";
        targetEl.style.justifyContent = "center";
        targetEl.style.alignItems = "center";
        requestAnimationFrame(() => {
            const width  = newTextArea.offsetWidth + 10;
            const height = newTextArea.offsetHeight;
            targetEl.style.setProperty("--openedWidth",  width  + "px");
            targetEl.style.setProperty("--openedHeight", height + "px");
            targetEl.style.width  = width + "px";
            targetEl.style.height = height + "px";
        });
    }
}

function updateSort (searchWord = getSearchValue()) {
    const conditions = getSortConditions();

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
        if (conditions[0] || searchWord) {
            setTileVisible(element, false);
        } else {
            setTileVisible(element, true);
        }
        element.classList.remove("topTileStyle");
        element.classList.remove("lowestTileStyle");
    });

    const activeAllTiles = [];

    const targetElements = [];
    const targetExhibits = [];
    const spliteds = [];
    const searchHits = [];
    exhibitsArea.querySelectorAll(":scope > div.tile").forEach(tileItem => {
        const exhibit = exhibits[tileItem.getAttribute("exhibits")];
        const conforming = getIsSortConforming(exhibit, conditions, searchWord);
        if (conforming.isConforming) {
            searchHits.push(conforming.searchHits);
            targetElements.push(tileItem);
            targetExhibits.push(exhibit);
            spliteds.push(conforming.spliteds);
        }
    });

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

    (() => {
        const sortDisplay = mainContent.querySelector(".sortDisplay");
        sortDisplay.innerHTML = "";
        [getSearchValue(), ...conditions].forEach((condition, i, arr) => {
            const newDisplayEl = d.createElement("div");
            newDisplayEl.className = "display";
            newDisplayEl.textContent = tagOrder[condition] ? tagOrder[condition]?.displayName : (() => {
                newDisplayEl.style.color = "black";
                if (condition) {
                    return `"${condition}" を含む`;
                } else {
                    return "";
                }
            })();
            newDisplayEl.style.backgroundColor = tagOrder[condition]?.themeColor;
            sortDisplay.appendChild(newDisplayEl);
            
            const newAndEl = d.createElement("div");
            newAndEl.className = "and";
            newAndEl.textContent = (arr.length >= 1) && (i !== arr.length - 1) && (newDisplayEl.textContent !== "") ? "かつ" : "";
            sortDisplay.appendChild(newAndEl);

        });
    })();

    return {
        elements: targetElements,
        exhibits: targetExhibits,
        searchHits: searchHits,
        spliteds: spliteds
    };
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

    [
        "絞り込み",
        "地図",
    ].forEach((item, index) => {
        const tab = d.createElement("div");

        tab.className = "tab";
        tab.innerHTML = item;

        tab.addEventListener("click", () => barTabClick(index));

        sortList_tabs.appendChild(tab);

        if (index === 0) setTimeout(() => {
            barTabClick(index);
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
            barTabClick(tabIndex);
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

function scrollToTile(value, offsetY = 0) {
    const targetTile = value instanceof Element ? (
        value
    ) : (
        exhibitsArea.querySelector(`.tile[exhibits="${value}"]`)
    );

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
                if (callback) callback();
            } else {
                requestAnimationFrame(checkScroll);
            }
        };

        window.scrollTo({ top: targetY, behavior: "smooth" });
        checkScroll();
    }

    if (!targetTile) return;

    const tileOpenDatas = [];
    const allTiles = exhibitsArea.querySelectorAll(":scope > .tile");

    allTiles.forEach(tileItem => {
        tileOpenDatas.push(tileItem.classList.contains("opened"));
        tileItem.style.transition = "none";
        requestAnimationFrame(() => {
            openTile(tileItem, false);
        });
    });

    requestAnimationFrame(() => {
        const rect = targetTile.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - 170 + offsetY;

        allTiles.forEach((tileItem, i) => {
            if (tileOpenDatas[i]) tileItem.classList.add("opened");
            requestAnimationFrame(() => {
                tileItem.style.transition = "";
            });
        });
        // openTile(targetTile, false);

        requestAnimationFrame(() => {
            scrollToAndThen(targetY);
            openTile(targetTile, true);
        });
    });
}
const truncateText = ({
    text: text,
    length: length = 10,
    left: left = false,
    str: str = ".."
}) => (
    typeof text === "string" ? (
        text.length > length ? text.slice(left ? length : 0, left ? 0 : length) + str : text
    ) : ""
);
const getSearchValue = () => searchAreaEl.classList.contains("opened") ? newSearchBarEl.value : "";

(() => { // exhibitsBottomBar contents
    // listView
    const listView = d.createElement("div");
    listView.className = "tags listView";
    bottomBar_contents.appendChild(listView);

    const newSearchBarDisplayEl = d.createElement("div");
    newSearchBarDisplayEl.className = "searchBarDisplay";

    const sagests = searchAreaEl.querySelector(".sagests");

    newSearchBarEl.className = "searchBar";
    newSearchBarEl.type = "text";
    newSearchBarEl.value = existingSearchValue;

    const getSearchWord = () => newSearchBarEl.value;
    const getFmtedHTML = (str) => str.replaceAll(" ", "&nbsp;");
    const getIsOpened = () => searchAreaEl.classList.contains("opened") ? true : false;
    const getIsFocus = () =>  searchAreaEl.classList.contains("focus") ? true : false;
    const getScrollWidth = (el) => el?.scrollWidth || 0;

    function setBarShift (custom) {
        const spans = newSearchBarDisplayEl.querySelectorAll(":scope > span");
        const barSelectionIndex = newSearchBarEl.selectionEnd - spans[1]?.textContent?.length || 0;
        const value = custom || 
        (getScrollWidth(spans[0]) + getScrollWidth(spans[1])) * -1 + ((
            Math.min(window.innerWidth, 700)
        ) * .5) + (
            spans[1] ? (Math.abs(barSelectionIndex) / spans[1].textContent.length) * spans[1].scrollWidth : 0
        );
        searchBarsEl.style.setProperty("--barShift", value + "px");
    }

    function searchBarScroll () {
        if (
            (newSearchBarEl.scrollWidth - newSearchBarEl.offsetWidth) <= 0
        ) {
            newSearchBarEl.scrollLeft = 0;
        }

        const offsetPx = newSearchBarEl.scrollLeft;
        newSearchBarDisplayEl.style.setProperty("--barScrollPx", (
            offsetPx * -1
        ) + "px");
        searchBarsEl.style.setProperty("--scrollLeft", searchBarsEl.scrollLeft + "px");
    }

    let queryParamTimeout;
    function searchInput () {
        const searchWord = getSearchWord();
        const sortResult = updateSort();
        
        if (queryParamTimeout) {
            clearTimeout(queryParamTimeout);
        }
        queryParamTimeout = setTimeout(() => {
            function deleteParam () {
                queryParameter({
                    type: "delete",
                    key: "search"
                });
            }
            if (
                newSearchBarEl.value === ""
            ) {
                deleteParam();
            } else {
                deleteParam();
                queryParameter({
                    type: "append",
                    key: "search",
                    value: newSearchBarEl.value
                });
            }
        }, 150);

        sagests.innerHTML = "";
        const isSagestVaild = searchWord && searchWord !== "" && searchWord.length !== 0;
        const sagestResults = [];
        let sagestsHeight = 0;
        sortResult.searchHits.forEach((hitItem, i) => {
            if (isSagestVaild) {
                const sagestSplit = sortResult.spliteds[i][hitItem?.[0]?.[0][1]];
                const sagestTexts = [
                    sagestSplit?.[0] || "",
                    sagestSplit?.[1] || "",
                    sagestSplit?.slice(2).join("") || ""
                ];
                sagestResults.push(sagestTexts);
                const newSet = d.createElement("div");
                newSet.addEventListener("click", e => {
                    if (
                        e.target === newSagest ||
                        e.target === newExhibitName
                    ) {
                        searchBarsEl.classList.remove("opened");
                        const targetEl = sortResult.elements[i];
                        scrollToTile(targetEl);
                    }
                });

                const newSagest = d.createElement("div");
                newSagest.innerHTML = `<span>${
                    truncateText({
                        text: getFmtedHTML(sagestTexts[0]),
                        length: 15,
                        left: true,
                    })
                }</span>${
                    getFmtedHTML(sagestTexts[1])
                }<span>${
                    getFmtedHTML(sagestTexts[2])
                }</span>`;

                const newExhibitName = d.createElement("div");
                newExhibitName.textContent = sortResult.exhibits[i].name;
                newExhibitName.className = "exhibitName";
                
                sagests.appendChild(newSet);
                newSet.appendChild(newSagest);
                newSet.appendChild(newExhibitName);
            }
        });
        sagestsHeight = sagests.clientHeight;
        mainContent.style.setProperty("--sagestsHeight", getIsOpened() && getIsFocus() ? sagestsHeight + "px" : 0);
        searchBarsEl.style.setProperty("--barShift", "0px");
        searchBarsEl.style.setProperty("--span0Width", "0px");
        if (isSagestVaild) {
            newSearchBarDisplayEl.innerHTML = "";
            if (searchWord && sagestResults.length !== 0 && getIsOpened()) {
                newSearchBarDisplayEl.innerHTML = `<span>${
                    getFmtedHTML(sagestResults?.[0]?.[0])
                }</span>${
                    getFmtedHTML(searchWord)
                }<span>${
                    getFmtedHTML(sagestResults?.[0]?.[2])
                }</span>`;
            }
            const spans = newSearchBarDisplayEl.querySelectorAll(":scope > span");
            searchBarsEl.style.setProperty("--span0Width", getScrollWidth(spans[0]) + "px");
            searchAreaEl.style.setProperty("--searchBarDisplayWidth", getScrollWidth(newSearchBarDisplayEl) + "px");
        } else {
            newSearchBarDisplayEl.innerHTML = "検索できます";
        }
        newSearchBarEl.focus();
        searchBarScroll();
    }

    newSearchBarEl.addEventListener("focus", () => {
        searchAreaEl.classList.add("focus");
        searchInput();
    });
    newSearchBarEl.addEventListener("scroll", searchBarScroll);

    searchInput();
    newSearchBarEl.addEventListener("input", () => {
        searchInput();
    });
    ["keydown", "keyup", "click", "select"].forEach(eventType => {
        newSearchBarEl.addEventListener(eventType, () => {
            searchBarScroll();
        });
    });

    searchBarsEl.querySelector("svg").addEventListener("click", () => {
        searchAreaEl.classList.toggle("opened");
        updateSort(getSearchValue());
        searchInput();
        searchInputsEl.scrollLeft = 0;
    });
    searchInputsEl.appendChild(newSearchBarEl);
    searchInputsEl.appendChild(newSearchBarDisplayEl);

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
            checkBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="anim"><path d="M239.48,469.289 L416.256,646.066 L840.52,221.802"/></svg>`;
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
            queryParameter({
                type: "delete",
                key: "sort"
            });
            queryParameter({
                type: "append",
                key: "sort",
                value: getSortConditions()
            });
            updateResetButton();
            updateSort();
        }

        newTag.addEventListener("click", tagClicked);
    });
    updateSort();

    (() => { // mapsView
        bottomBar_contents.appendChild(mapsView);
        const compassBar = d.createElement("div");
        const compass = d.createElement("div");
        const maps_buttons_top = d.createElement("div");

        maps_buttons_right.className = "buttons right";
        maps_buttons_left.className = "buttons left";
        maps_buttons_top.className = "buttons top";

        const top_button = d.createElement("div");
        top_button.className = "button";
        maps_buttons_top.appendChild(top_button);

        mapsView.className = "mapsView";
        compassBar.className = "compassBar";
        compass.className = "compass button";
        
        const compassImg = d.createElement("img");
        compassImg.src = "medias/images/compass.svg";
        compass.appendChild(compassImg);

        const scene = new THREE.Scene();
        scene.background = null; // 背景色

        maps_renderer.setPixelRatio(Math.min(
            window.devicePixelRatio, 150
        ));
        maps_renderer.shadowMap.enabled = false;

        // 描画領域を mapsView に追加
        mapsView.appendChild(maps_renderer.domElement);

        // 照明
        const latitude = 35.86059681776511;
        const longitude = 139.26886482318102;
        const now = new Date();
        
        // 太陽の位置を取得
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.castShadow = false;
        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;
        light.shadow.bias = -0.0001;
        function matchSun () {
            const sunPos = SunCalc.getPosition(now, latitude, longitude);
            const distance = 1000; // 光源までの距離
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
        /* 
        AeroStar:
        横 : 1
        縦 : 4.3172690763
        高 : 1.2329317269
        地 : 0.06626506024
        */
        matchSun();
        setInterval(matchSun, 1000 * 60);
        scene.add(light);

        // 環境光
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        let cameraDistance = 10; // モデル中心からの距離
        let cameraHeight = 10;    // 高さ（Y座標）
        let camHorizontal = 0;     // 左右角度（度単位）
        let camVertical = 0;   // 垂直角度（度単位）

        maps_camera.position.set(
            cameraDistance,
            cameraHeight,
            cameraDistance
        );
        maps_camera.lookAt(0, 0, 0);

        // 3Dモデル読み込み
        const loader = new GLTFLoader();
        let model; // モデルを外で保持
        const currentLocationPointMesh = new THREE.Mesh(
            new THREE.BoxGeometry(
                .01,
                .01,
                .01,
            )
        );

        const getFmtedObjName = (name) => name.replace("F" + maps_getFloor(name) + "_", "");

        loadModel = () => {
            loader.load(
                "medias/3ds/sc.glb",
                (gltf) => {
                    model = gltf.scene;

                    model.position.set(0, 0, 0);
                    model.rotation.y = THREE.MathUtils.degToRad(135);
                    scene.add(model);

                    model.add(currentLocationPointMesh);
                    currentLocationPointMesh.position.set(
                        0, 0, 0
                    );
                    currentLocationPointMesh.name = "currentLocationPoint";
                    currentLocationPointMesh.visible = false;
                    currentLocationPointMesh.material.opacity = 0;

                    // モデルが読み込まれたら OrbitControls の注視点をモデル中心に設定
                    function setCamFocus(x = 0, y = 0, z = 0) {
                        maps_controls.target.set(x, y, z);
                        maps_controls.update();
                    }

                    setCamFocus(0, 0, 0);

                    maps_controls.enableDamping = true; // 慣性スクロール
                    maps_controls.enableRotate = true;
                    maps_controls.enableZoom = true;
                    maps_controls.enablePan = true;
                    maps_controls.dampingFactor = 0.05;
                    maps_controls.screenSpacePanning = false;

                    const mergeObjs = [];
                    model.traverse(child => {
                        // Skip adding objects with fully transparent materials or named "Transparent"
                        if (child.isMesh) {
                            // Check for "Transparent" material name or full opacity 0
                            let skip = false;
                            let materials = Array.isArray(child.material) ? child.material : [child.material];
                            for (const mat of materials) {
                                if (
                                    (mat && mat.name === "Transparent") ||
                                    (mat && mat.transparent && mat.opacity === 0)
                                ) {
                                    skip = true;
                                    break;
                                }
                            }
                            if (skip) return; // Do not add to scene or maps_modelParts
                            maps_modelParts[child.name] = child;
                            child.castShadow = false;
                            child.receiveShadow = false;
                            child.frustumCulled = true; // Explicitly enable frustum culling
                        }
                        if (child.type === "Object3D") {
                            const meshes = [];
                            child.traverse((sub) => {
                                // Only add meshes that are not fully transparent and not with "Transparent" material name
                                if (sub.isMesh) {
                                    let skipMesh = false;
                                    let mats = Array.isArray(sub.material) ? sub.material : [sub.material];
                                    for (const mat of mats) {
                                        if (
                                            (mat && mat.name === "Transparent") ||
                                            (mat && mat.transparent && mat.opacity === 0)
                                        ) {
                                            skipMesh = true;
                                            break;
                                        }
                                    }
                                    if (!skipMesh) {
                                        sub.frustumCulled = true; // Enable frustum culling for each mesh
                                        meshes.push(sub);
                                    }
                                }
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
                            const transformedGeometries = meshes
                                .filter(mesh => {
                                    // Exclude meshes with "Transparent" material or fully transparent
                                    const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
                                    if (
                                        material?.name === "Transparent" ||
                                        (material?.transparent && material?.opacity === 0)
                                    ) {
                                        return false;
                                    }
                                    return true;
                                })
                                .map(mesh => {
                                    let geom = mesh.geometry.clone();

                                    // 1. 重複頂点の削除
                                    const tolerance = 0.0005; // 適宜調整
                                    geom = BufferGeometryUtils.mergeVertices(geom, tolerance);

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
                                    lod.addLevel(new THREE.Mesh(lodGeom, mesh.material.clone()), 0);

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
                            const rotationMatrix = new THREE.Matrix4().makeRotationY(model.rotation.y);
                            const originalPos = child.userData.originalTransform.position.clone();
                            const rotatedPos = originalPos.applyMatrix4(rotationMatrix);

                            mergedMesh.userData.originalTransform = {
                                ...child.userData.originalTransform,
                                position: rotatedPos
                            };

                            mergeObjs.push({ parent: child.parent, original: child, merged: mergedMesh });
                        }
                    });

                    // マージ後に置き換え
                    mergeObjs.forEach(item => {
                        item.parent.add(item.merged);
                        item.parent.remove(item.original);
                        maps_modelParts[item.original.name] = item.merged;
                    });

                    console.log("maps_modelParts : \n", maps_modelParts);

                    (() => {
                        function blinkBrinkerLight(objectName, blinkInterval = 500, targetMaterialName = "Bus_BrinkerLight") {
                            const targetObj = maps_modelParts[objectName];
                            if (!targetObj) {
                                console.warn("指定されたオブジェクトが存在しません:", objectName);
                                return;
                            }

                            let isVisible = true;

                            setInterval(() => {
                                targetObj.traverse((child) => {
                                    if (child.isMesh) {
                                        // 配列マテリアル対応
                                        const materials = Array.isArray(child.material) ? child.material : [child.material];
                                        materials.forEach((mat) => {
                                            if (mat.name === targetMaterialName) {
                                                mat.emissive = new THREE.Color(isVisible ? 0x000000 : 0xffa500); // 点灯時はオレンジ
                                                mat.emissiveIntensity = isVisible ? 0 : 1;
                                                mat.needsUpdate = true;
                                            }
                                        });
                                    }
                                });
                                isVisible = !isVisible;
                            }, blinkInterval);
                        }
                        blinkBrinkerLight("Bus_Body_6");
                    })();

                    // エッジ線を追加（親レベルのメッシュのみ、子メッシュの内部構造は無視）
                    Object.values(maps_modelParts).forEach((mesh) => {
                        if (mesh.isMesh && mesh.parent && mesh.parent.type === "Group") {
                            const edges = new THREE.EdgesGeometry(mesh.geometry, 85); // 境界角度閾値
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

                    mapsView.appendChild(maps_labelRenderer.domElement);

                    function setTagAttributes (tags, element) {
                        if (!Array.isArray(tags)) return;
                        const tagAttributes = [];
                        tags.forEach(tag => {
                            tagAttributes.push(tag);
                        });
                        element.setAttribute("tag", tagAttributes.join(","));
                    }

                    Object.keys(maps_modelParts).forEach((partName) => {
                        const part = maps_modelParts[partName];                        

                        if (
                            partName.includes("_WC") &&
                            !maps_locations[partName]?.name
                        ) {
                            const locationName = maps_locations[partName]?.location.name;
                            maps_locations[partName] = {
                                name: '<img src="medias/images/wc.svg"/>',
                                location: {
                                    name: locationName
                                },
                                description: `トイレ ${maps_getFloor(partName)[0]}階`,
                            };
                        }

                        if (!maps_locations[partName]) return;

                        const label = document.createElement("div");
                        label.className = `mapsLabel${maps_locations[partName].isAlwaysShow ? " alwaysShow" : ""}${maps_locations[partName].isEdgeShow ? " edgeShow" : ""}`;
                        label.setAttribute("exhibits", partName);

                        if (maps_locations[partName]) {
                            label.className = `mapsLabel${maps_locations[partName].isAlwaysShow ? " alwaysShow" : ""}${maps_locations[partName].isEdgeShow ? " edgeShow" : ""}`;
                            label.setAttribute("exhibits", partName);

                            setTagAttributes(maps_locations[partName].tag, label);

                            if (!maps_locations[partName]?.name) maps_locations[partName].name = maps_pointIcon;

                            const getIsHTMLTag = (value) => value?.includes("<") ? true : false;

                            const titleText = getIsHTMLTag(maps_locations[partName]?.name) ? maps_locations[partName].name : truncateText({text: maps_locations[partName].name, length: 10});
                            const descriptionText = maps_locations[partName]?.description;
                            const locationText = maps_locations[partName]?.location?.name;
                            const imgLink = maps_locations[partName]?.image;
                            const detailTile = exhibitsArea.querySelector(`.tile[exhibits=${getFmtedObjName(partName)}]`);

                            if (titleText) {
                                const title = d.createElement("div");
                                const text = d.createElement("span");
                                text.innerHTML = titleText;
                                title.className = `title${maps_locations[partName].emphasis ? " emphasis" : ""}`;
                                title.appendChild(text);
                                label.appendChild(title);
                            }
                            
                            const informations = d.createElement("div");
                            informations.className = "informations";
                            label.appendChild(informations);

                            if (locationText) {
                                const location = d.createElement("span");
                                location.innerHTML = locationText;
                                location.className = "location";
                                informations.appendChild(location);
                            }
                            
                            if (descriptionText) {
                                const detail = d.createElement("div");
                                detail.innerHTML = descriptionText;
                                detail.className = "detail button";
                                if (detailTile || maps_locations[partName]?.onClick) {
                                    detail.classList.add("pressable");
                                    detail.addEventListener("click", e => {
                                        e.preventDefault();
                                        label.classList.remove("opened");
                                        if (maps_locations[partName]?.onClick) {
                                            maps_locations[partName].onClick();
                                        } else if (detailTile) {
                                            barHeightUpdate(false);
                                            // openTile(detailTile, true);
                                            scrollToTile(detailTile);
                                        }
                                    });
                                }
                                informations.appendChild(detail);
                            }

                            if (imgLink) {
                                const img = d.createElement("img");
                                img.src = imgLink;
                                informations.appendChild(img);
                            }
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

                        (() => {
                            const arrowBox = d.createElement("div");
                            arrowBox.classList = "arrow";

                            const arrow = d.createElementNS("http://www.w3.org/2000/svg", "svg");
                            arrow.setAttribute("xmlns", "http://www.w3.org/2000/svg");

                            const path = d.createElementNS("http://www.w3.org/2000/svg", "path");
                            path.setAttribute("d", "M228.451,230.092L228.451,850.906L849.265,850.906");

                            arrowBox.appendChild(arrow);
                            arrow.appendChild(path);
                            label.appendChild(arrowBox);
                        })();

                        const labelObject = new CSS2DObject(label);
                        
                        const vector = new THREE.Vector3();
                        if (part.geometry) {
                            part.geometry.computeBoundingBox();
                            part.geometry.boundingBox.getCenter(vector);

                            const offset = maps_locations[part.name]?.offset;
                            vector.x += offset?.x || 0;
                            vector.y += offset?.y || 0;
                            vector.z += offset?.z || 0;

                            if (part.userData?.originalTransform?.position) {
                                // モデル回転を考慮
                                const rotationMatrix = new THREE.Matrix4().makeRotationY(model.rotation.y * -1);
                                vector.applyMatrix4(rotationMatrix);   
                                part.localToWorld(vector);
                            }
                        }
                        labelObject.position.copy(vector);
                        part.add(labelObject);

                        maps_labels[partName] = { object: labelObject, element: label, part: part };
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
                            if (
                                (Date.now() - lastHandleEventAt) < 500 ||
                                y >= window.innerHeight - Math.max(maps_buttons_left.clientHeight, maps_buttons_right.clientHeight)
                            ) return;
                            lastHandleEventAt = Date.now();
                            
                            const candidateLabels = [];

                            Object.values(maps_labels).forEach(labelObj => {
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

                            maps_frameObject({
                                target: maps_modelParts[candidateLabels[0]?.getAttribute("exhibits")]
                            });

                            const topLabel = candidateLabels[0];

                            function labelOpenCtrl (el, isToOpen = !el.classList.contains("opened")) {
                                maps_addLabelTransition(el);
                                if (isToOpen) {
                                    el.classList.add("opened");
                                } else {
                                    el.classList.remove("opened");
                                }
                                updateLabelScale(el);
                            }

                            if (
                                Math.abs(x - touchStart[0]) < 5 &&
                                Math.abs(y - touchStart[1]) < 5
                            ) {
                                Object.values(maps_labels).forEach(labelObj => {
                                    const labelElement = labelObj.element;
                                    if (
                                        labelElement.classList.contains("opened") &&
                                        labelElement !== topLabel
                                    ) {
                                        labelOpenCtrl(labelElement, false);
                                    }
                                });
                            }
                            if (topLabel) {
                                labelOpenCtrl(topLabel);
                            }
                        }

                        d.addEventListener("mousedown", (e) => touchStart = [e.clientX, e.clientY]);
                        d.addEventListener("mouseup", (e) => handleEvent(e.clientX, e.clientY));

                        d.addEventListener("touchstart", (e) => {
                            const touch = e.touches[0];
                            touchStart = [touch.clientX, touch.clientY];
                        });
                        d.addEventListener("touchend", (e) => {
                            const touch = e.changedTouches[0];
                            handleEvent(touch.clientX, touch.clientY);
                        });
                    })();

                    const truncate = (num, digit = 3) => Math.floor(num * digit) / digit;

                    const areaTopMargin = getComputedStyle(exhibitsBottomBar).marginTop.replace("px", "") * 1;

                    const getFmtedPx = (px) => px.replace("px", "");

                    function updateLabelScale (el) {
                        const element = el;
                            const labelChildWidths = [];
                            let labelHeight = 0;
                            let labelWidth  = 0;
                            const title = element.querySelector(".title");
                            if (element.classList.contains("opened")) {
                                const childrens = Array.from(element.children).filter(child => !child.classList.contains("arrow"));
                                childrens.forEach(child => {
                                    labelChildWidths.push(child.offsetWidth);
                                    const style = window.getComputedStyle(element);
                                    labelHeight = Math.max(
                                        child.offsetTop +
                                        child.getBoundingClientRect().height +
                                        parseFloat(style.marginBottom),
                                        parseFloat(style.marginTop),
                                        labelHeight
                                    );
                                });
                                labelWidth = Math.max(...labelChildWidths);
                            } else {
                                if (title) {
                                    labelWidth  = title.getBoundingClientRect().width;
                                    labelHeight = title.getBoundingClientRect().height;
                                }
                            }

                            const labelWidthProperty = "--width";
                            const labelHeightProperty = "--height";

                            function setLabelScale () {
                                if (getComputedStyle(element).getPropertyValue(labelWidthProperty) !== labelWidth + "px") {
                                    element.style.setProperty(labelWidthProperty,  labelWidth + "px");
                                }
                                if (getComputedStyle(element).getPropertyValue(labelHeightProperty) !== labelHeight + "px") {
                                    element.style.setProperty(labelHeightProperty, labelHeight + "px");
                                }
                                
                                if (element?.getBoundingClientRect().width < title?.getBoundingClientRect().width) {
                                    element.classList.add("over");
                                } else {
                                    element.classList.remove("over");
                                }
                            }
                            setLabelScale();
                            return [labelWidth, labelHeight];
                    }

                    function updateLabelsPosition() {
                        Object.values(maps_labels).forEach(({ element, part }, index) => {
                            // const objPos = part.userData?.originalTransform?.position.clone() || part.getWorldPosition(new THREE.Vector3());
                            // const camDistance = camPos.distanceTo(objPos);

                            const isAlwaysShow = maps_locations[part.name]?.isAlwaysShow || false;

                            if (
                                (gsap.getProperty(Array.isArray(part.material) ? part.material[0] : part.material, "opacity") === 1 || isAlwaysShow)
                            ) {
                                if (getIsSortConforming(maps_locations[part.name], getSortConditions(), getSearchValue()).isConforming) {
                                    if (element.classList.contains("invalid")) element.classList.remove("invalid");
                                    element.style.setProperty("--labelOpacity", 1);
                                } else {
                                    // if (!element.classList.contains("invalid")) element.classList.add("invalid");
                                    element.style.setProperty("--labelOpacity", .5);
                                }
                            } else {
                                if (!element.classList.contains("invalid")) element.classList.add("invalid");
                                element.style.setProperty("--labelOpacity", 0);
                            }

                            element.setAttribute("isPressable", (
                                !element.classList.contains("invalid") && element.querySelector(".informations")?.innerHTML.length !== 0
                            ));

                            if (element.getAttribute("isPressable") === "true" || (element.style.opacity !== 0 && element.visible)) {
                                const updateRes = updateLabelScale(element);
                                const labelWidth  = updateRes[0];
                                const labelHeight = updateRes[1];

                                const match = element.style.transform.match(/translate\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px\)/);
                                const labelXPx = parseFloat(match[1]);
                                const labelYPx = parseFloat(match[2]);
                                const labelXRatio = labelXPx / mapsView.scrollWidth;
                                const labelYRatio = labelYPx / mapsView.scrollHeight;
                                const labelEdgeMargin = 5;

                                const isXOver = labelXRatio > 1 || labelXRatio < 0;
                                const isYOver = labelYRatio > 1 || labelYRatio < 0;

                                if (isXOver || isYOver) {
                                    element.classList.add("edge");
                                    element.style.setProperty("--labelXPx", Math.min(
                                        Math.max(labelXPx, labelEdgeMargin),
                                        mapsView.scrollWidth - labelWidth - 8 - labelEdgeMargin
                                    ) + "px");
                                    element.style.setProperty("--labelYPx", Math.min(
                                        Math.max(labelYPx, barTopMargin + 50 + labelEdgeMargin),
                                        mapsView.scrollHeight - labelHeight - 4 - labelEdgeMargin
                                    ) + "px");
                                    if (labelXRatio > .5) {
                                        element.classList.add("right");
                                        element.classList.remove("left");
                                    } else {
                                        element.classList.add("left");
                                        element.classList.remove("right");
                                    }
                                    const difference = [
                                        .5 - labelXRatio,
                                        .5 - labelYRatio,
                                    ];
                                    element.style.setProperty("--differenceDeg",`${Math.atan2(
                                        difference[1],
                                        difference[0],
                                    ) * (180 / Math.PI)}deg`);
                                } else {
                                    if (element.classList.contains("edge")) {
                                        element.classList.remove("edge");
                                    }
                                }
                                // element.style.setProperty("--camDistance", camDistance);
                            }
                        });
                    }

                    // 描画ループ
                    let lastAnimUpdateAt;
                    const labelPosUpdateThreshold = 2;
                    function animate() {
                        requestAnimationFrame(animate);
                        if ((Date.now() - lastAnimUpdateAt > labelAnimUpdateThresholdMs * .6) || !lastAnimUpdateAt) {
                            maps_renderer.render(scene, maps_camera);
                            maps_labelRenderer.render(scene, maps_camera);
                            maps_controls.update();
                            lastAnimUpdateAt = Date.now();
                        }
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

                    const panLimit = 5;

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

                    let lastIsShow2DMap;
                    // パン操作時にモデルから離れすぎないように制限
                    maps_controls.addEventListener("change", () => {
                        if (
                            Array.from(sortList_tabs.children).findIndex(child => child.classList.contains("selected")) !== 1 ||
                            !exhibitsBottomBar.classList.contains("opened")
                        ) return;
                        const now = Date.now();

                        maps_camera.zoom = THREE.MathUtils.clamp(maps_camera.zoom, .2, 5);
                        maps_camera.updateProjectionMatrix();

                        (() => {
                            const targetOffset = maps_controls.target.clone();
                            const distance = targetOffset.length();
                            maps_controls.panSpeed = Math.max(
                                Math.min(panLimit - distance, 1),
                                0.25
                            );

                            // 円形の制限: 距離が panLimit を超えた場合のみスケーリング
                            if (distance > panLimit) {
                                const scale = panLimit / distance;
                                cameraPan({
                                    x: targetOffset.x * scale,
                                    z: targetOffset.z * scale,
                                    duration: 0
                                });
                            }
                        })();

                        // カメラの前方向ベクトルを取得
                        const cameraDirection = new THREE.Vector3();
                        maps_camera.getWorldDirection(cameraDirection);

                        const radToDeg = 180 / Math.PI;

                        // 横方向の角度（北=+Z, 東=+X と仮定）
                        camHorizontal = Math.atan2(cameraDirection.x, cameraDirection.z) * radToDeg + 180;

                        // 縦方向の角度（水平=0, 上=+90, 下=-90）
                        camVertical = Math.asin(cameraDirection.y) * -radToDeg;

                        // コンパスを回転
                        compassImg.style.transform = `rotate(${camHorizontal}deg)`;

                        const camPos = maps_camera.position;
                        mapsView.style.setProperty("--camPosX", camPos.x);
                        mapsView.style.setProperty("--camPosZ", camPos.z);
                        mapsView.style.setProperty("--camZoom", maps_camera.zoom);

                        if (now - lastLabelUpdate > labelAnimUpdateThresholdMs * 8) {
                            lastLabelUpdate = now;
                            updateLabelsPosition();

                            const button_dimension_text = isShow2DMap ? "3D" : "2D";
                            if (lastIsShow2DMap !== isShow2DMap) updateButtonText(button_dimension, button_dimension_text);

                            lastIsShow2DMap = isShow2DMap;
                        }
                    });
                },
                (xhr) => {
                    const loadPercentage = xhr.loaded / xhr.total * 100
                    if (loadPercentage === 100) console.log("3DModel", loadPercentage + "% loaded");
                },
                (error) => {
                    console.error("モデル読み込みエラー", error);
                }
            );
        };
        loadModel();

        let labelAnimUpdateThresholdMs;

        let barTopMargin;

        function windowResize() {
            barTopMargin = (
                parseFloat(getComputedStyle(mapsView).getPropertyValue("--topBarHeight")) +
                parseFloat(getComputedStyle(mapsView).getPropertyValue("--tabsHeight"))
            );

            const aspect = mapsView.clientWidth / mapsView.clientHeight;

            maps_camera.left   = -maps_cameraSize * aspect;
            maps_camera.right  = maps_cameraSize * aspect;
            maps_camera.top    = maps_cameraSize + barTopMargin / mapsView.clientHeight * maps_cameraSize * 2; // topMarginをカメラの高さに換算
            maps_camera.bottom = -maps_cameraSize;
            maps_camera.updateProjectionMatrix();

            maps_renderer.domElement.style.top = `${barTopMargin * -1}px`;
            maps_renderer.setSize(mapsView.clientWidth, mapsView.clientHeight + barTopMargin);
            maps_labelRenderer.setSize(mapsView.clientWidth, mapsView.clientHeight + barTopMargin);
            maps_labelsArea.style.top = 0;

            labelAnimUpdateThresholdMs = Math.max(
                Math.min(
                    (4 - maps_camera.zoom) * 10, 80
                ),
                10
            );

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
                mesh.userData.edgeLine.visible = opacity !== 0;
                gsap.to(edgeMat.color, {
                    r: new THREE.Color(color).r,
                    g: new THREE.Color(color).g,
                    b: new THREE.Color(color).b,
                    duration: duration,
                    ease: "power2.inOut",
                });
                gsap.to(edgeMat, {
                    opacity: opacity,
                    duration: duration,
                    ease: "power2.inOut",
                });
            }
        }

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

            maps_controls.touches = touches;
            maps_controls.mouseButtons = mouseButtons;
        }

        controlMethodUpdate();

        let isShow2DMap = false;

        maps_controls.minDistance = 2;
        maps_controls.maxDistance = 10;
        function setCamAngleLimit(min = 0, max = 85) {
            maps_controls.minPolarAngle = THREE.MathUtils.degToRad(min);
            maps_controls.maxPolarAngle = THREE.MathUtils.degToRad(max);
            if (isShow2DMap) {
                maps_controls.minAzimuthAngle = 0;
            } else {
                maps_controls.minAzimuthAngle = -Infinity;
                maps_controls.maxAzimuthAngle = Infinity;
            }
        }
        setCamAngleLimit();

        function updateCameraAngle({
            horizontal = 0,
            vertical = 45,
            duration = 1,
            onComplete: finish
        } = {}) {
            // 回転禁止＆慣性無効化
            let prevDamping;
            setTimeout(() => {
                maps_controls.enableRotate = false;
                prevDamping = maps_controls.enableDamping;
                maps_controls.enableDamping = false;
            }, duration);

            const start = { h: camHorizontal, v: camVertical };
            const target = {
                h: horizontal !== undefined ? horizontal : camHorizontal,
                v: vertical !== undefined ? vertical : camVertical
            };

            function updateAngle() {
                camHorizontal = start.h;
                camVertical = start.v;

                const distance = maps_camera.position.distanceTo(maps_controls.target);
                const spherical = new THREE.Spherical(
                    distance,
                    THREE.MathUtils.degToRad(90 - camVertical),
                    THREE.MathUtils.degToRad(camHorizontal)
                );
                const offset = new THREE.Vector3().setFromSpherical(spherical);

                maps_camera.position.copy(maps_controls.target.clone().add(offset));
                maps_controls.update();
            }

            function onComplete() {
                // 回転と慣性を元に戻す
                maps_controls.enableRotate = !isShow2DMap;
                maps_controls.enableDamping = prevDamping;
                if (finish) finish();
                maps_controls.update();
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
        button_dimension.className = "dimension button";

        const button_currentPos = d.createElement("div");
        button_currentPos.className = "button";

        const floors = {
            f3: {
                name: "3"
            },
            f2: {
                name: "2"
            },
            f1: {
                name: "1"
            },
        };

        Object.values(floors).slice().reverse().forEach((floor, index) => {
            const button = d.createElement("div");
            
            button.innerHTML = `<span>F</span>${floor.name}`;
            button.setAttribute("floor", Object.keys(floors)[Object.keys(floors).length - index - 1]);
            button.className = "button";

            const bottomStereotypedText = "階を表示中";

            button.addEventListener("click", () => {
                const allButtons = maps_buttons_left.querySelectorAll(".button");

                const isOnlyValid = !button.classList.contains("invalid") &&
                    [...allButtons].every(b => b === button || b.classList.contains("invalid"));

                if (isOnlyValid && !isShow2DMap) { // 2Dマップ表示中は全解除しない
                    allButtons.forEach(el => {
                        el.classList.remove("invalid");
                    });
                } else {
                    allButtons.forEach(el => {
                        el.classList.remove("invalid");
                        if (el !== button) {
                            el.classList.add("invalid");
                        }
                    });
                }

                // アクティブフロアを配列で取得
                const activeFloors = [...maps_buttons_left.querySelectorAll(".button")]
                    .filter(btn => !btn.classList.contains("invalid"))
                    .map(btn => btn.getAttribute("floor").replaceAll("f", "") * 1);

                Object.values(maps_modelParts).forEach(part => {
                    const isPartActive = (
                        maps_getFloor(part.name)[0] ?
                        maps_getFloor(part.name).some(floorNum => activeFloors.includes(floorNum)) :
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

                    if (part.visible) {
                        gsap.to(part.material, {
                            duration: 0.5,
                            opacity: isPartActive ? 1 : .05,
                            ease: "power2.inOut"
                        });
                        setEdgeStyle(part, {
                            opacity: isPartActive ? 1 : 0
                        });
                    }
                });

                // updateBottomText(activeFloors.length === 1 ? activeFloors[0] : null);
                updateButtonText(top_button, activeFloors.length === 1 ? `${activeFloors[0]}${bottomStereotypedText}` : `すべての${bottomStereotypedText}`);
            });
            updateButtonText(top_button, `すべての${bottomStereotypedText}`);

            maps_buttons_left.appendChild(button);
        });

        const getCamHorizontalSnap = (horizontal) => Math.round(Math.round(horizontal / 45) * 45);

        (() => {
            button_dimension.addEventListener("click", () => {
                isShow2DMap = !isShow2DMap;
                if (isShow2DMap) {
                    button_dimension.classList.add("pushed");
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
                    button_dimension.classList.remove("pushed");
                    setCamAngleLimit()
                    updateCameraAngle({
                        horizontal: camHorizontal,
                        onComplete: () => {
                            setCamAngleLimit();
                        }
                    });
                    controlMethodUpdate();
                }
                if (get_isEveryFloorValid()) maps_changeFloor(1);
            });

            updateButtonText(button_currentPos, "現在地");
            let geoWatchId;
            const isGeolocationVaild = "geolocation" in navigator;
            function defaulText () {
                button_currentPos.classList.remove("opened");
                updateButtonText(button_currentPos, "現在地");
            }
            function alertText () {
                button_currentPos.classList.add("opened");
                updateButtonText(button_currentPos, "学園内にいて､位置情報が\n許可された場合に利用可能");
                setTimeout(() => {
                    if (button_currentPos.classList.contains("opened")) defaulText();
                }, 3000);
            }
            function cansel () {
                button_currentPos.classList.remove("pushed");
                currentLocationPointMesh.material.opacity = 0;
                navigator.geolocation.clearWatch(geoWatchId);
            }
            if (isGeolocationVaild) {
                button_currentPos.addEventListener("click", () => {
                    button_currentPos.classList.toggle("pushed");
                    if (button_currentPos.classList.contains("pushed")) {
                        const baseLocation = [ // 0, 0, 0に対応する場所
                            35.860550,
                            139.269142
                        ];

                        function isPointInArea(point, quad = [
                            [35.862096, 139.269525],
                            [35.859773, 139.266558],
                            [35.858807, 139.269504],
                            [35.860690, 139.271212]
                        ]) {
                        // 三角形内判定（バリセンター法）
                            function pointInTriangle(p, a, b, c) {
                                const det = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
                                const l1 = ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / det;
                                const l2 = ((c[0] - a[0]) * (p[1] - a[1]) - (c[1] - a[1]) * (p[0] - a[0])) / -det;
                                const l3 = 1 - l1 - l2;
                                return l1 >= 0 && l2 >= 0 && l3 >= 0;
                            }
                            // 四角形を2つの三角形に分けて判定
                            return pointInTriangle(point, quad[0], quad[1], quad[2]) || pointInTriangle(point, quad[0], quad[2], quad[3]);
                        }
                        
                        function latlonToXYZ(baseLat, baseLon){
                            const lat = baseLat - baseLocation[0];
                            const lon = baseLon - baseLocation[1];
                            const M = [
                                [866.69667299, 1236.85206018], // row for x
                                [0.0, 0.0],                    // row for y
                                [-2161.60126554, 20.85725703], // row for z
                            ];
                            const x = M[0][0]*lat + M[0][1]*lon;
                            const y = M[1][0]*lat + M[1][1]*lon;
                            const z = M[2][0]*lat + M[2][1]*lon;
                            return { x, y, z };
                        }

                        geoWatchId = navigator.geolocation.watchPosition(
                            (position) => {
                                const latitude  = position.coords.latitude;
                                const longitude = position.coords.longitude;

                                console.log("Updated location:", latitude, longitude);

                                if (latitude && longitude && isPointInArea([
                                    latitude, longitude
                                ])) {
                                    const pos = latlonToXYZ(latitude, longitude);
                                    currentLocationPointMesh.position.set(
                                        pos.x,
                                        0,
                                        pos.z,
                                    );
                                    currentLocationPointMesh.material.opacity = 1;
                                    defaulText();
                                } else {
                                    cansel();
                                    alertText();
                                }
                            }, (error) => {
                                cansel();
                                alertText();
                                console.log("Error getting location:", error);
                            }, {
                                enableHighAccuracy: true,
                                timeout: 5000,
                                maximumAge: 0
                            }
                        );
                    } else {
                        cansel();
                    }

                    /* 
                    
                        0, 0,  0 : 35.860550, 139.269142
                        1, 0,  0 : 35.860467, 139.269696
                    -1, 0,  0 : 35.860490, 139.268412

                        0, 0,  1 : 35.860096, 139.269190
                        0, 0, -1 : 35.860991, 139.269053

                        ___

                        0, 0,  0 :  0,         0
                        1, 0,  0 : -0.000083,  0.000554
                    -1, 0,  0 : -0.00006,  -0.00073

                        0, 0,  1 : -0.000454,  0.000048
                        0, 0, -1 :  0.000441, -0.000641

                    敷地内 :
                        35.862096, 139.269525
                        35.859773, 139.266558
                        35.858807, 139.269504
                        35.860690, 139.271212
                    */
                });
            } else {
                button_currentPos.classList.add("invalid");
            }

            maps_buttons_right.appendChild(button_currentPos);
            maps_buttons_right.appendChild(button_dimension);
            maps_buttons_top.appendChild(compass);
        })();

        // mapsView.appendChild(compassBar);
        mapsView.appendChild(maps_buttons_left);
        mapsView.appendChild(maps_buttons_right);
        mapsView.appendChild(maps_buttons_top);
    })();

    maps_renderer.domElement.addEventListener('webglcontextlost', e => {
        console.warn('Context Lost');
        e.preventDefault();
    });

    maps_renderer.domElement.addEventListener('webglcontextrestored', () => {
        console.info('Context Restored');
        initScene(); // シーンを再構築
    });

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
        const bottomBarHeight = touchStart_height + difference[1] + (difference[1] < 0 ? holdStartThreshold : -holdStartThreshold);
        if (isHolded) {
            exhibitsBottomBar.style.setProperty("--bottomBarHeight", `${bottomBarHeight}px`);
        }
    });

    barHeightUpdate(false);

    let lastTouchendTime = Date.now();

    function barTransitionUpdate () {
        exhibitsBottomBar.style.transition = `${sortListTransition === "" || sortListTransition === "none" ? "" : `${sortListTransition}, `}height .4s ease-out, width .4s ease-out, padding .5s ease-in-out`;
    }
    barTransitionUpdate();

    function touchend (e) {
        exhibitsBottomBar.classList.remove("nowBeingHeld");
        if (Date.now() - lastTouchendTime < (
            Math.min( Math.max(50, Math.max(1000 - window.innerWidth, 0) * .1), 200 )
        )) return;
        barTransitionUpdate();
        const isNowOpen = exhibitsBottomBar.classList.contains("opened");
        if (Math.abs(difference[1]) !== 0 || e?.target === sortList_topBar) {
            if (e?.target === sortList_topBar && Math.abs(difference[1]) === 0) { // topBarTap
                e.preventDefault();
                e.stopPropagation();
                barHeightUpdate(!isNowOpen);
            } else if (isHolded) { // swipe
                const threshold = 100;
                barHeightUpdate(isNowOpen ? difference[1] * -1 < threshold : difference[1] > threshold);
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
