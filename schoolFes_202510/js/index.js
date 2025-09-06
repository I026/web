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