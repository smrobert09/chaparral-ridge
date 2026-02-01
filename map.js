const DATA_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4pqUIjZlED4nTXpQmlz9yJkBBY80RuzOSE3GO2ti-8Q4xI96mltA8TNBUjO547ooPbtM2PcY794mM/pub?gid=0&single=true&output=csv';

// D3: load 'Ward Map.png' and render it centered, preserving aspect ratio to fit Letter (11×8.5 in) landscape

        const root = d3.select("#d3-root");
        root.selectAll("*").remove();

        const svg = root
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("preserveAspectRatio", "xMidYMid meet");

        // Helper to render image into the svg once image dimensions are known
        async function renderImage(imgSrc) {
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => {
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;

            // Container size in CSS pixels
            const rect = root.node().getBoundingClientRect();
            const sw = rect.width;
            const sh = rect.height;

            const imageAspect = iw / ih;

            // Fit image inside sw x sh while preserving aspect ratio
            let renderWidth = sw;
            let renderHeight = renderWidth / imageAspect;
            if (renderHeight > sh) {
              renderHeight = sh;
              renderWidth = renderHeight * imageAspect;
            }

            const imgX = (sw - renderWidth) / 2;
            const imgY = (sh - renderHeight) / 2;

            // Use viewBox so SVG scales cleanly when printed
            svg.attr("viewBox", `0 0 ${sw} ${sh}`);

            // background
            svg
              .append("rect")
              .attr("width", sw)
              .attr("height", sh)
              .attr("fill", "#fff");

            // image element
            svg
              .append("image")
              .attr("href", imgSrc)
              .attr("x", imgX)
              .attr("y", imgY)
              .attr("width", renderWidth)
              .attr("height", renderHeight)
              .attr("preserveAspectRatio", "xMidYMid meet");

            // Scale factors to convert original image pixel coords -> rendered SVG coords
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

                // label (slightly offset to the right and up for readability)
                svg
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
            console.log(
              `households.csv (inlined): placed ${placed} labels, skipped ${skipped} rows (missing numeric X/Y or name)`
            );
          };
          img.onerror = () => {
            svg
              .append("text")
              .attr("x", 12)
              .attr("y", 40)
              .text("Failed to load Ward Map.png")
              .attr("fill", "red");
          };
        }

        renderImage("Ward Map.png");

        // Re-render on resize so it stays fit for different print/PPI conversions
        let resizeTimer = null;
        window.addEventListener("resize", () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            // remove and re-render
            root.selectAll("*").remove();
            renderImage("Ward Map.png");
          }, 150);
        });
