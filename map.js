async function loadData(){
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4pqUIjZlED4nTXpQmlz9yJkBBY80RuzOSE3GO2ti-8Q4xI96mltA8TNBUjO547ooPbtM2PcY794mM/pub?gid=0&single=true&output=csv';
  const rows = await d3.csv(url, d3.autoType);
  console.log(rows);
}
loadData();


// D3: load 'Ward Map.png' and render it centered, preserving aspect ratio to fit Letter (11×8.5 in) landscape
      (function () {
        const root = d3.select("#d3-root");
        root.selectAll("*").remove();

        const svg = root
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("preserveAspectRatio", "xMidYMid meet");

        // Helper to render image into the svg once image dimensions are known
        function renderImage(imgSrc) {
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

            // Static inlined CSV data from households.csv
            const HOUSEHOLDS_CSV = `Street Address,Street,X,Y,Occupancy,Family Name,Member
Street Address,Street,X,Y,Occupancy,Family Name,Member
2380 S Arabian Way,Arabian,2960,65,,Allred,
2428 S Arabian Way,Arabian,2940,265,,Covington,
2444 S Arabian Way,Arabian,2960,385,,Halbert,
2460 S Arabian Way,Arabian,2970,495,,Carter,
2460 S Arabian Way,Arabian,2970,515,,Pineda,
2461 S Arabian Way,Arabian,3180,515,,Welch,
2472 S Arabian Way,Arabian,2975,645,,Heideman,
1001 E Birken St,Birken,,,,Hales,
1021 E Birken St,Birken,,,,,
1045 E Birken St,Birken,,,,,
1046 E Birken St,Birken,,,,Henrie,
1108 E Birken St,Birken,,,,,
1109 E Birken St,Birken,,,,,
1124 E Birken St,Birken,,,,,
1148 E Birken St,Birken,,,,,
1147 E Birken St,Birken,,,,Kurtz,
1160 E Birken St,Birken,,,,Lingard,
1165 E Birken St,Birken,,,,,
1180 E Birken St,Birken,,,,Allred,
1185 E Birken St,Birken,,,,,
1200 E Birken St,Birken,,,,,
1207 E Birken St,Birken,,,,,
1218 E Birken St,Birken,,,,Rhodes,
1225 E Birken St,Birken,,,,Crawford,
1238 E Birken St,Birken,,,,Bulloch,
1243 E Birken St,Birken,,,,,
1258 E Birken St,Birken,,,,Beck,
1263 E Birken St,Birken,,,,,
1278 E Birken St,Birken,,,,,
1279 E Birken St,Birken,,,,,
1298 E Birken St,Birken,,,,,
1314 E Birken St,Birken,,,,,
847 E Birken St,Birken,,,,,
854 E Birken St,Birken,,,,,
861 E Birken St,Birken,,,,,
866 E Birken St,Birken,1770,300,,"Borsh
Peterson",
882 E Birken St,Birken,,,,,
879 E Birken St,Birken,1850,100,,Allred,
901 E Birken St,Birken,1960,100,,Adams,
923 E Birken St,Birken,2080,100,,Ruesch,
928 E Birken St,Birken,2065,300,,Heisterman,
990 E Birken St,Birken,,,,,
993 E Birken St,Birken,,,,Dickerson,
1004 E Bramble Way,Bramble,,,,White,
1026 E Bramble Way,Bramble,,,,Riding,
1044 E Bramble Way,Bramble,,,,,
1066 E Bramble Way,Bramble,,,,Shields,
1088 E Bramble Way,Bramble,,,,Carlson,
1108 E Bramble Way,Bramble,,,,,
1109 E Bramble Way,Bramble,,,,Nunley,
1125 E Bramble Way,Bramble,,,,Nunley,
1150 E Bramble Way,Bramble,,,,,
1130 E Bramble Way,Bramble,,,,Anderson,
1185 E Bramble Way,Bramble,,,,Kenney,
895 E Bramble Way,Bramble,,,,,
906 E Bramble Way,Bramble,,,,Kelly,
931 E Bramble Way,Bramble,,,,"Newman
Villet",
920 E Bramble Way,Bramble,,,,,
942 E Bramble Way,Bramble,,,,Snow,
943 E Bramble Way,Bramble,,,,Prince,
964 E Bramble Way,Bramble,,,,,
982 E Bramble Way,Bramble,,,,Naylor,
993 E Bramble Way,Bramble,,,,,
2430 S Briar St,Briar,,,,Tippetts,
2445 S Briar St,Briar,,,,Forsey,
2446 S Briar St,Briar,,,,,
2461 S Briar St,Briar,,,,Tanner,
2462 S Briar St,Briar,,,,Coombs,
2477 S Briar St,Briar,,,,,
2478 S Briar St,Briar,,,,Brill,
2443 S Brushwood Dr,Brushwood,,,,,
2444 S Brushwood Dr,Brushwood,,,,,
2461 S Brushwood Dr,Brushwood,,,,,
2462 S Brushwood Dr,Brushwood,,,,"Diehl
Williams",
2388 S Camino Real,Camino,,,,,
2406 S. Camino Road,Camino,,,,"Chapman
Curtis",
2422 S Camino Real,Camino,,,,Warhurst,
2440 S Camino Real,Camino,,,,Schmidt,
2451 S Camino Real,Camino,,,,Fox,
2458 S Camino Real,Camino,,,,Rawley,
2473 S Camino Real,Camino,,,,Dewey,
2480 S Camino Real,Camino,,,,Peterson,
2494 S Camino Real,Camino,,,,Tonks,
2516 S Camino Real,Camino,,,,Fielding,
2546 S Camino Real,Camino,,,,Archibald,
2572 S Camino Real,Camino,,,,Racer,
2583 s Camino Real,Camino,,,,Bryan,
2596 S Camino Real,Camino,,,,Stam,
2599 S Camino Real,Camino,,,,"Lamoreaux
Tavoian",
2608 S Camino Real,Camino,,,,,
2637 S Camino Real,Camino,,,,Howells,
2638 S Camino Real,Camino,,,,"Lees
Welch",
2656 S Camino Real,Camino,,,,,
2659 S Camino Real,Camino,,,,Auldridge,
2680 S Camino Real,Camino,,,,,
2683 S Camino Real,Camino,,,,Hodson,
2702 S Camino Real,Camino,,,,Robertson,
2726 S Camino Real,Camino,,,,,
2748 S Camino Real,Camino,,,,Kelly,
2770 S Camino Real,Camino,,,,Simmons,
2781 S Camino Real,Camino,,,,,
2792 Camino Real,Camino,,,,Colf,
2795 S Camino Real,Camino,,,,Wharton,
1002 E Crooked Creek Dr,Crooked Creek,,,,Palmer,
1007 E Crooked Creek Dr,Crooked Creek,,,,Roundy,
1018 E Crooked Creek Dr,Crooked Creek,,,,Langeland,
1023 E Crooked Creek Dr,Crooked Creek,,,,,
1042 E Crooked Creek Dr,Crooked Creek,,,Vacant,,
1049 E Crooked Creek Dr,Crooked Creek,,,,Liebig,
1067 E Crooked Creek Dr,Crooked Creek,,,,,
1068 E Crooked Creek Dr,Crooked Creek,,,,Dalley,
1083 E Crooked Creek Dr,Crooked Creek,,,,Houghton,
897 E Crooked Creek Dr,Crooked Creek,,,,Button,
910 E Crooked Creek Dr,Crooked Creek,,,,Talbot,
913 E Crooked Creek Dr,Crooked Creek,,,,"Hatch
Martinez",
932 E Crooked Creek Dr,Crooked Creek,,,,No Resident,
935 E Crooked Creek Dr,Crooked Creek,,,Permanent,Robertson,
953 E Crooked Creek Dr,Crooked Creek,,,,,
956 E Crooked Creek Dr,Crooked Creek,,,,Van Orden,
957 E Crooked Creek Dr,Crooked Creek,,,,"Webster
Fauseett",
981 E Crooked Creek Dr,Crooked Creek,,,,Oborn,
2657 Desperado,Desperado,,,,Leroy,
2678 S Desperado Dr,Desperado,,,,Gustin,
2701 S Desperado Dr,Desperado,,,,Woodland,
2721 S Desperado Dr,Desperado,,,,Casperson,
2736 S Desperado Dr,Desperado,,,,Soelberg,
2741 S Desperado Dr,Desperado,,,,Christensen,
2762 S Desperado Dr,Desperado,,,,White,
2778 S Desperado Dr,Desperado,,,,Urrutia,
2804 S Desperado Dr,Desperado,,,,"Ford
Borgesen",
2785 S Desperado Dr,Desperado,,,,,
2763 S Desperado Dr,Desperado,,,,,
2712 S Desperado Dr,Desperado,,,Vacant,,
2378 S Eagles Nest Dr,Eagles Nest,,,,Key,
2430 S Eagles Nest Dr,Eagles Nest,,,,,
2442 So. Eagles Nest,Eagles Nest,,,,Box,
2445 S Eagles Nest,Eagles Nest,,,,Snyder,
2460 S Eagles Nest,Eagles Nest,,,,Rathje,
2463 Eagles Nest Drive,Eagles Nest,,,,Embleton,
2577 Hidden Canyon Dr,Hidden Canyon,,,,Wright,
2596 Hidden Canyon Dr,Hidden Canyon,,,,Willford,
1006 E High Noon Cir,High Noon,,,,Simmons,
1034 E High Noon Cir,High Noon,,,,Dockstader,
1035 E High Noon Cir,High Noon,,,,Watkins,
951 E High Noon Cir,High Noon,,,,Hurst,
968 E High Noon Cir,High Noon,,,,Zingleman,
971 E High Noon Cir,High Noon,,,,Stokes,
986 E High Noon Cir,High Noon,,,,Christensen,
948 E High Noon Cir,High Noon,,,,,
991 E High Noon Cir,High Noon,,,,,
1011 High Noon Cir,High Noon,,,,,
1007 E Lost Ridge Dr,Lost Ridge,,,,Andreasen,
1016 E Lost Ridge Dr,Lost Ridge,,,,Anderson,
1029 E Lost Ridge Dr,Lost Ridge,,,,Sullivan,
1038 E Lost Ridge Dr,Lost Ridge,,,,Wagstaff,
1045 E Lost Ridge Dr,Lost Ridge,,,Vacant,,
1062 E Lost Ridge Dr,Lost Ridge,,,,Blum,
1063 E Lost Ridge Dr,Lost Ridge,,,,Wagner,
1089 E Lost Ridge Dr,Lost Ridge,,,,Ogden/Stapley,
1113 E Lost Ridge Dr,Lost Ridge,,,,Olds,
1141 E Lost Ridge Dr,Lost Ridge,,,,,
1142 E Lost Ridge Dr,Lost Ridge,,,Vacant,,
1164 E Lost Ridge Dr,Lost Ridge,,,Vacant,,
1167 E Lost Ridge Dr,Lost Ridge,,,Vacant,,
583 E Lost Ridge Dr,Lost Ridge,,,,Miles,
586 E Lost Ridge Dr,Lost Ridge,,,,,
615 E Lost Ridge Dr,Lost Ridge,,,,,
620 E Lost Ridge Dr,Lost Ridge,,,,,
631 E Lost Ridge Dr,Lost Ridge,,,,Giacoletto,
636 E Lost Ridge Dr,Lost Ridge,,,,Cottam,
655 E Lost Ridge Dr,Lost Ridge,,,,,
658 E Lost Ridge Dr,Lost Ridge,,,,Kerksiek,
699 E Lost Ridge Dr,Lost Ridge,,,,Jeffris,
680 E Lost Ridge Dr,Lost Ridge,,,,,
700 E Lost Ridge Dr,Lost Ridge,,,,"Perrin
Trease",
720 E Lost Ridge Dr,Lost Ridge,,,,Smith,
675 E Lost Ridge Dr,Lost Ridge,,,,,
727 E Lost Ridge Dr,Lost Ridge,,,,Larsen,
742 E Lost Ridge Dr,Lost Ridge,,,,Hildebrand,
745 E Lost Ridge Dr,Lost Ridge,,,,Leavitt,
760 E Lost Ridge Dr,Lost Ridge,,,,,
763 E Lost Ridge Dr,Lost Ridge,,,,,
784 E Lost Ridge Dr,Lost Ridge,,,,,
789 E Lost Ridge Dr,Lost Ridge,,,,McAllister,
810 E Lost Ridge Dr,Lost Ridge,,,,,
817 E Lost Ridge Dr,Lost Ridge,,,,Honey,
824 E Lost Ridge Dr,Lost Ridge,,,,Nielson,
835 E Lost Ridge Dr,Lost Ridge,,,,,
840 E Lost Ridge Dr,Lost Ridge,,,,,
933 E Lost Ridge Dr,Lost Ridge,,,,Wilkinson,
936 E Lost Ridge Dr,Lost Ridge,,,,Carter,
915 E Lost Ridge Dr,Lost Ridge,,,,,
958 E Lost Ridge Dr,Lost Ridge,,,,,
979 E Lost Ridge Dr,Lost Ridge,,,,,
982 E Lost Ridge Dr,Lost Ridge,,,,,
994 E Lost Ridge Dr,Lost Ridge,,,,Fuller,
1019 E Outlaw Gulch,Outlaw Gulch,,,,Elkins,
1020 Outlaw Gulch,Outlaw Gulch,,,,Klungervik,
1031 E Outlaw Gulch,Outlaw Gulch,,,,Rick,
1054 E Outlaw Gulch,Outlaw Gulch,,,,Moore,
1059 E Outlaw Gulch,Outlaw Gulch,,,,Mingus,
987 Outloaw Gulch,Outlaw Gulch,,,,Snow,Confirm
969 Outlaw Gulch,Outlaw Gulch,,,Second Home,,
947 Outlaw Gulch,Outlaw Gulch,,,,Rosemeyer,
968 E Outlaw Gulch,Outlaw Gulch,,,,"Pratt
Lobb",
934 E Outlaw Gulch,Outlaw Gulch,,,Vacation,Adamson,Confirm
976 E Outlaw Gulch,Outlaw Gulch,,,,Romney,
998 E Outlaw Gulch,Outlaw Gulch,,,,Nebeker,
2651 S Washington Fields Rd,Washington Fields Rd,,,,Burnett,
1007 E Wild horse Rdg,Wild Horse,,,,Fischer,Confirm
1113 E Wild Horse Rdg,Wild Horse,,,Second Home,Evans,
1137 E Wild Horse Rdg,Wild Horse,,,,"Rasmussen
Robinson",
983 E Wild Horse Rdg,Wild Horse,,,,"Bevan
Dabling",
1053 E Wild Horse Rdg,Wild Horse,,,,,
1029 E Wild Horse Rdg,Wild Horse,,,,,
959 E Wild Horse Rdg,Wild Horse,,,Vacation,,`;

            const rows = d3.csvParse(HOUSEHOLDS_CSV);
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
      })();
