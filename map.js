const DATA_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4pqUIjZlED4nTXpQmlz9yJkBBY80RuzOSE3GO2ti-8Q4xI96mltA8TNBUjO547ooPbtM2PcY794mM/pub?gid=0&single=true&output=csv';

const root = d3.select("#d3-root");
root.selectAll("*").remove();

const svg = root.append("svg").attr("width", "100%").attr("height", "100%");

// Invisible rect ensures the full SVG area captures scroll/drag events for zoom
svg.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "none").attr("pointer-events", "all");

const mapGroup = svg.append("g");

const zoom = d3.zoom()
    .scaleExtent([0.25, 12])
    .on("zoom", (event) => {
        mapGroup.attr("transform", event.transform);
    });

svg.call(zoom);

let cachedImg = null;
let cachedRows = null;

function layout() {
    if (!cachedImg || !cachedRows) return;

    const iw = cachedImg.naturalWidth;
    const ih = cachedImg.naturalHeight;
    const rect = root.node().getBoundingClientRect();
    const sw = rect.width;
    const sh = rect.height;

    const aspect = iw / ih;
    let renderWidth = sw;
    let renderHeight = renderWidth / aspect;
    if (renderHeight > sh) {
        renderHeight = sh;
        renderWidth = renderHeight * aspect;
    }

    const imgX = (sw - renderWidth) / 2;
    const imgY = (sh - renderHeight) / 2;
    mapGroup.selectAll("*").remove();

    mapGroup.append("image")
        .attr("href", cachedImg.src)
        .attr("x", imgX)
        .attr("y", imgY)
        .attr("width", renderWidth)
        .attr("height", renderHeight)
        .attr("preserveAspectRatio", "xMidYMid meet");

    cachedRows.forEach((r) => {
        const fx = parseFloat(r["X"]);
        const fy = parseFloat(r["Y"]);
        const name = (r["Family Name"] || "").trim();
        if (!isNaN(fx) && !isNaN(fy) && name) {
            mapGroup.append("text")
                .attr("x", imgX + (fx / 100) * renderWidth)
                .attr("y", imgY + (fy / 100) * renderHeight)
                .text(name)
                .attr("font-size", 6)
                .attr("fill", "#222")
                .attr("font-family", "sans-serif")
                .attr("paint-order", "stroke")
                .style("text-shadow", "0 0 2px rgba(255,255,255,0.8)");
        }
    });
}

async function init() {
    const [img, rows] = await Promise.all([
        new Promise((resolve, reject) => {
            const i = new Image();
            i.onload = () => resolve(i);
            i.onerror = reject;
            i.src = "Ward Map.png";
        }),
        d3.csv(DATA_URL),
    ]);
    cachedImg = img;
    cachedRows = rows;
    layout();
}

init().catch(() => {
    mapGroup.append("text").attr("x", 12).attr("y", 40).text("Failed to load Ward Map.png").attr("fill", "red");
});

let resizeTimer = null;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        svg.call(zoom.transform, d3.zoomIdentity);
        layout();
    }, 150);
});
