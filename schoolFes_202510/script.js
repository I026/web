const d = document;
const topBar = d.querySelector(".topBar");
const topContentButton = d.querySelector(".content.top .button");
const topTitleContent  = d.querySelector(".content.topTitle");
const paths = d.querySelectorAll(".content.topTitle path");

(() => {
    window.addEventListener("DOMContentLoaded", () => {
        paths.forEach(path => {
            const length = path.getTotalLength();

            // CSS変数にパス長を代入
            path.style.setProperty("--path-length", length);

            // stroke-dasharray と stroke-dashoffset を初期化
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

            path.style.opacity = 1;
            path.style.animation = "draw 3s ease-in-out forwards";
        });
    });

    // すべてのパスのバウンディングボックスを統合して viewBox を調整
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    paths.forEach(path => {
        const bbox = path.getBBox();
        if (bbox.x < minX) minX = bbox.x;
        if (bbox.y < minY) minY = bbox.y;
        if (bbox.x + bbox.width > maxX) maxX = bbox.x + bbox.width;
        if (bbox.y + bbox.height > maxY) maxY = bbox.y + bbox.height;
    });

    function windowResizeHandler() {
        topTitleContent.style.setProperty("--titleImageWidth", topTitleContent.clientWidth + "px");
    }
    windowResizeHandler();
    window.addEventListener("resize", windowResizeHandler);

    const svgs = d.querySelectorAll("svg");
    const margin = 0; // 余白
    svgs.forEach(svg => {
        svg.setAttribute(
            "viewBox",
            `${minX - margin} ${minY - margin} ${maxX - minX + margin*2} ${maxY - minY + margin*2}`
        );
    });
})();

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

let animationNoneTimeout;
let last_isShowTopBar = false;
function scrollProcess() {
    const get_isShowTopBar = () => window.scrollY > window.innerHeight * .25;
    if (last_isShowTopBar !== get_isShowTopBar()) {
        if (get_isShowTopBar()) {
            clearTimeout(animationNoneTimeout);
            topBar.style.opacity = 1;
            topBar.style.animation = "topBarShow 1s ease-in-out";
        } else {
            if (topBar.style.opacity === 0) return;
            clearTimeout(animationNoneTimeout);
            topBar.style.opacity = 0;
        }
    }
    last_isShowTopBar = get_isShowTopBar();
}
scrollProcess();
window.addEventListener("scroll", scrollProcess);

(() => {
    const sortListArea = d.querySelector(".exhibits .sortList");
    const exhibitsArea = d.querySelector(".exhibits .list");
    const exhibits = {
        J2_1: {
            name: "お化け屋敷",
            location: "J2-1",
            tag: [
                "byClass",
                "J2",
                "attractions",
            ],
            description: "怖いお化けが出る屋敷",
        },
        J2_2: {
            name: "メルカリ屋さん",
            location: "J2-2",
            tag: [
                "byClass",
                "J2",
                "foods",
                "merchandise",
            ],
        },
        J2_3: {
            name: "爪切り屋さん",
            location: "J2-3",
            tag: [
                "byClass",
                "J2",
                "foods",
                "merchandise",
                "display",
            ],
        },
    }
    const getExhibits = (n) => ([ Object.keys(exhibits)[n], Object.values(exhibits)[n] ])
    const exhibitsLength = Object.keys(exhibits).length;
    const tagOrder = {
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
        const tags = d.createElement("div");

        tile.style.animation = "tag_show .5s both";
        tile.style.animationDelay = `${i * 0.1}s`;
        tile.className = "tile";

        names.innerHTML = `${getExhibits(i)[1].name}<br><span class="subText">場所 : ${getExhibits(i)[1].location}</span>`;
        names.classList.add("names");

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
        tile.appendChild(tags);
        exhibitsArea.appendChild(tile);
    }

    function sortUpdate () {
        let conditions = [];
        sortListArea.querySelectorAll(".checkedBox").forEach(element => {
            conditions.push(element.getAttribute("tag"));
        });
        exhibitsArea.querySelectorAll(".tile").forEach(element => {
            element.style.opacity = .2;
            element.style.display = "none";
        });
        let lastElement;
        targetTagElements = exhibitsArea.querySelectorAll(`[tag_${conditions[0]}]`);
        targetTagElements.forEach(element => {
            element.style.opacity = 1;
            element.style.display = "flex";
            lastElement = element;
        });
        if (targetTagElements[0]) {
            targetTagElements[0].style.borderTopLeftRadius = "20px";
            targetTagElements[0].style.borderTopRightRadius = "20px";
        }
        if (lastElement) {
            lastElement.style.borderBottomLeftRadius = "20px";
            lastElement.style.borderBottomRightRadius = "20px";
        }
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
        newTag.innerHTML = `<span>${tagOrder[tag].displayName}</span>`;
        newTag.setAttribute("tag", tag);

        const checkBox = d.createElement("div");
        checkBox.className = "checkBox";
        newTag.appendChild(checkBox);
        
        tags.appendChild(newTag);

        newTag.addEventListener("click", () => {
            newTag.classList.toggle("checkedBox");
            sortUpdate();
        });
    });
})();