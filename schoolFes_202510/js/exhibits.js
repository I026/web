const sortListArea = d.querySelector(".exhibits .sortList");
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
    const tags = d.createElement("div");

    tile.style.animation = "tag_show .5s both";
    tile.style.animationDelay = `${i * 0.1}s`;
    tile.className = "tile";

    names.innerHTML = `${getExhibits(i)[1].name}<span class="subText">場所 : ${getExhibits(i)[1].location}</span>`;
    names.classList.add("names");
    
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
        tag.setAttribute(`tag_${item[0]}`, "");
        tags.appendChild(tag);
    });
    displayTagNames.map(subArr => subArr[0]).forEach(item => {
        tile.setAttribute(`tag_${item}`, "");
    });

    tags.classList.add("tags");

    tile.appendChild(names);
    tile.appendChild(description);
    tile.appendChild(tags);
    exhibitsArea.appendChild(tile);
}

function sortUpdate () {
    let conditions = [];
    (() => {
        const checkedTags = sortListArea.querySelectorAll(".tag.checkedBox:not([isButton])");
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

const sortList_topBar = d.createElement("div");
sortList_topBar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg">
                <path d="M228.451,230.092L228.451,850.906L849.265,850.906"/>
                <path class="close" d="M228.451,230.092L228.451,850.906L849.265,850.906"/>
            </svg>`;
sortList_topBar.className = "topBar";


function marginBottomUpdate (isToClose) {
    if (isToClose) {
        sortListArea.style.setProperty("--marginBottom", 0);
        sortListArea.classList.add("opened");
    } else {
        sortListArea.style.setProperty("--marginBottom", "min(calc(-60vh + 130px), 0px)");
        sortListArea.classList.remove("opened");
    }
}

(() => {
    let touchStartPos = [0, 0];
    let currentPos = [];
    let difference = [0, 0];

    sortListArea.style.transition = "opacity .5s ease-in-out";

    let sortListTransition = sortListArea.style.transition;
    const getMarginBottomPx = () => (
        window.getComputedStyle(sortListArea).marginBottom.replace("px", "") * 1
    );
    let touchStart_marginBottom = getMarginBottomPx();
    
    sortListArea.addEventListener("touchstart", (e) => {
        sortListArea.classList.add("nowBeingHeld");
        sortListArea.style.transition = "none";
        difference = [0, 0];
        const touch = e.touches[0];
        touchStartPos = [touch.clientX, touch.clientY];
        touchStart_marginBottom = getMarginBottomPx();
        sortListArea.classList.remove("reduced");
    });

    sortListArea.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        currentPos = [touch.clientX, touch.clientY];
        difference = [touchStartPos[0] - currentPos[0], touchStartPos[1] - currentPos[1]];

        sortListArea.style.setProperty("--marginBottom", `${Math.min( touchStart_marginBottom + difference[1], 0 )}px`);

        console.log(
            Math.min(touchStart_marginBottom + difference[1], 0) * -.15
        );
    });

    marginBottomUpdate(false);

    let lastTouchendTime = Date.now();

    function touchend (e) {
        sortListArea.classList.remove("nowBeingHeld");
        if (Date.now() - lastTouchendTime < 50) return;
        sortListArea.style.transition = `${sortListTransition === "" || sortListTransition === "none" ? "" : `${sortListTransition}, `}margin-bottom .4s ease-out`;
        const isNowOpen = touchStart_marginBottom === 0;
        console.log("isNowOpen : ", isNowOpen);
        if (Math.abs(difference[1]) !== 0 || e?.target === sortList_topBar) {
            if (e?.target === sortList_topBar && Math.abs(difference[1]) === 0) { // topBarTap
                marginBottomUpdate( !isNowOpen );
            } else { // swipe
                console.log("Math.abs(difference[1])", Math.abs(difference[1]));
                const threshold = 100;
                marginBottomUpdate( isNowOpen ? difference[1] * -1 < threshold : difference[1] > threshold );
            }
        }
        lastTouchendTime = Date.now();
    }
    sortListArea.addEventListener("mouseup",  e => {
        difference = [0, 0];
        touchStart_marginBottom = getMarginBottomPx();
        touchend(e);
    });
    sortListArea.addEventListener("touchend", e => touchend(e));
})();

sortListArea.appendChild(sortList_topBar);

const tags = d.createElement("div");
tags.className = "tags listView";
sortListArea.appendChild(tags);
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
    tags.appendChild(newTag);

    if (tagOrder[tag].isButton) {
        newTag.classList.add("checkedBox");
    } else {
        generateCheckBox();
    }

    const get_isButton = () => tagOrder[tag].isButton;

    function updateResetButton (pushed = false) {
        const resetButton = sortListArea.querySelector(".tags.listView .tag[tag='resetButton']");
        const tagElements = sortListArea.querySelectorAll(".tags.listView .tag:not([isButton=''])");
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
                tags.querySelectorAll(`.tag[group='${newTag.getAttribute("group")}'][isMultSel='false']`).forEach(tag => {
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

let lastScrollTime = Date.now();
let lastScrollPx;

window.addEventListener("scroll", () => { // sortListAreaHeight
    const scrollRatio = window.scrollY / window.innerHeight;

    if (d.documentElement.scrollHeight < window.innerHeight + window.scrollY + 100) {
        sortListArea.style.opacity = 0;
        sortListArea.style.pointerEvents = "none";
    } else {
        sortListArea.style.opacity = 1;
        sortListArea.style.pointerEvents = "auto";
    }

    // if (Math.abs(lastScrollPx - window.scrollY) > 200) marginBottomUpdate(false);

    console.log(Date.now() - lastScrollTime + " ms差")
    if (Date.now() - lastScrollTime > 20) lastScrollPx = window.scrollY;
    lastScrollTime = Date.now();
});

(() => {
    const element = sortListArea.querySelector(".tags.listView");
    function process () {
        sortListArea.classList.remove("reduced");
    }
    element.addEventListener("click", process);
})();