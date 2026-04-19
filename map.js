const DATA_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4pqUIjZlED4nTXpQmlz9yJkBBY80RuzOSE3GO2ti-8Q4xI96mltA8TNBUjO547ooPbtM2PcY794mM/pub?gid=0&single=true&output=csv';

const root = d3.select("#d3-root");
root.selectAll("*").remove();

const svg = root
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

// All map content lives in this group so zoom transforms everything together
const mapGroup = svg.append("g");

const zoom = d3.zoom()
    .scaleExtent([0.25, 12])
    .on("zoom", (event) => {
        mapGroup.attr("transform", event.transform);
    });

svg.call(zoom);

async function renderImage(imgSrc) {
    const img = new Image();
    img.src = imgSrc;
    img.onload = async () => {
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        const rect = root.node().getBoundingClientRect();
        const sw = rect.width;
        const sh = rect.height;

        const imageAspect = iw / ih;

        let renderWidth = sw;
        let renderHeight = renderWidth / imageAspect;
        if (renderHeight > sh) {
            renderHeight = sh;
            renderWidth = renderHeight * imageAspect;
        }

        const imgX = (sw - renderWidth) / 2;
        const imgY = (sh - renderHeight) / 2;

        svg.attr("viewBox", `0 0 ${sw} ${sh}`);

        mapGroup.selectAll("*").remove();

        mapGroup
            .append("image")
            .attr("href", imgSrc)
            .attr("x", imgX)
            .attr("y", imgY)
            .attr("width", renderWidth)
            .attr("height", renderHeight)
            .attr("preserveAspectRatio", "xMidYMid meet");

        const scaleX = renderWidth / iw;
        const scaleY = renderHeight / ih;

        const rows = await d3.csv(DATA_URL);
        let placed = 0;
        let skipped = 0;
        rows.forEach((r) => {
            const fx = r["X"] ? parseFloat(r["X"]) : NaN;
            const fy = r["Y"] ? parseFloat(r["Y"]) : NaN;
            const name = (r["Family Name"] || "").trim();
            if (!isNaN(fx) && !isNaN(fy) && name) {
                const tx = imgX + fx * scaleX;
                const ty = imgY + fy * scaleY;

                mapGroup
                    .append("text")
                    .attr("x", tx)
                    .attr("y", ty)
                    .text(name)
                    .attr("font-size", 6)
                    .attr("fill", "#222")
                    .attr("font-family", "sans-serif")
                    .attr("paint-order", "stroke")
                    .style("text-shadow", "0 0 2px rgba(255,255,255,0.8)");

                placed += 1;
            } else {
                skipped += 1;
            }
        });
        console.log(`placed ${placed} labels, skipped ${skipped} rows`);
    };
    img.onerror = () => {
        mapGroup
            .append("text")
            .attr("x", 12)
            .attr("y", 40)
            .text("Failed to load Ward Map.png")
            .attr("fill", "red");
    };
}

renderImage("Ward Map.png");

let resizeTimer = null;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        svg.call(zoom.transform, d3.zoomIdentity);
        renderImage("Ward Map.png");
    }, 150);
});
