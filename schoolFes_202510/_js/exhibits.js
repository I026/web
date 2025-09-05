(() => {
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
    const tagOrder = {
        resetButton: {
            displayName: "すべて解除",
            themeColor: "gray",
            isButton: true
        },
        byClass: {
            displayName: "クラス企画",
            themeColor: "orange"
        },
        byVolunteers: {
            displayName: "有志企画",
            themeColor: "tan"
        },
        foods: {
            displayName: "飲食",
            themeColor: "crimson"
        },
        merchandise: {
            displayName: "グッズ",
            themeColor: "lightcoral"
        },
        attractions: {
            displayName: "体験",
            themeColor: "skyblue"
        },
        display: {
            displayName: "展示",
            themeColor: "lightseagreen"
        },
        J1: {
            displayName: "中学1年",
            themeColor: "gray"
        },
        J2: {
            displayName: "中学2年",
            themeColor: "gray"
        },
        J3: {
            displayName: "中学3年",
            themeColor: "gray"
        },
        H1: {
            displayName: "高校1年",
            themeColor: "slategray"
        },
        H2: {
            displayName: "高校2年",
            themeColor: "slategray"
        },
        H3: {
            displayName: "高校3年",
            themeColor: "slategray"
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

            const targetTagElements = exhibitsArea.querySelectorAll(selector);
            targetTagElements.forEach(element => {
                element.style.opacity = 1;
                element.style.display = "flex";
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
        if (tagOrder[tag].isButton) newTag.setAttribute("isButton", "");

        function generateCheckBox () {
            const checkBox = d.createElement("div");
            checkBox.className = "checkBox";
            newTag.appendChild(checkBox);   
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

            console.log(tag_isCheckeds);
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
            }
            updateResetButton();
            sortUpdate();
        }
        newTag.addEventListener("click", tagClicked);
    });
})();

window.addEventListener("scroll", () => { // sortListAreaHeight
    const scrollRatio = window.scrollY / window.innerHeight;
    sortListArea.style.transition = "height .5s ease-in-out, margin .5s ease-in-out";
    if (scrollRatio > .25 && exhibitsArea.querySelector(".tile")?.style.display !== "none") {
        sortListArea.classList.add("topBarReduced");
        // sortListArea.style.height = "100px";
    } else {
        sortListArea.classList.remove("topBarReduced");
        // sortListArea.style.height = "var(--sortListArea_heightBase)";
    }
});

(() => {
    const element = sortListArea.querySelector(".tags.listView");
    function process () {
        sortListArea.classList.remove("topBarReduced");
    }
    element.addEventListener("click", process);
})();