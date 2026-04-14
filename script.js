const fileInput = document.getElementById('fileInput');
const dashboard = document.getElementById('dashboard');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const btnDownload = document.getElementById('btnDownload'); 

let aktuellesTeilIndex = null;
let geladeneTeile = []; 
let originalBloecke = []; 
let originalFileName = ""; 

// ---------------------------------------------------------
// 1. UNSER EIGENER FARBWÄHLER
// ---------------------------------------------------------

if (!document.getElementById('modalStyle')) {
    const style = document.createElement('style');
    style.id = 'modalStyle';
    style.innerHTML = `
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 1000; visibility: hidden; opacity: 0; transition: opacity 0.2s; }
        .modal-overlay.active { visibility: visible; opacity: 1; }
        .modal-box { background: #252525; border: 2px solid #4CAF50; border-radius: 10px; padding: 25px; width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .modal-title { margin-top: 0; color: #4CAF50; font-size: 1.3rem; margin-bottom: 20px; text-align: center;}
        .color-compare { display: flex; height: 60px; border-radius: 6px; overflow: hidden; margin-bottom: 20px; border: 1px solid #555;}
        .color-compare div { flex: 1; display: flex; align-items: center; justify-content: center; text-shadow: 1px 1px 3px rgba(0,0,0,0.8); font-weight: bold; font-size: 1rem;}
        .visual-picker-container { margin-bottom: 20px; text-align: center; background: #1e1e1e; padding: 10px; border-radius: 6px; border: 1px solid #333;}
        .visual-picker-label { display: block; margin-bottom: 10px; color: #aaa; font-size: 0.9rem;}
        .master-color-picker { -webkit-appearance: none; border: none; width: 100%; height: 50px; border-radius: 6px; cursor: pointer; background: transparent; padding: 0;}
        .master-color-picker::-webkit-color-swatch-wrapper { padding: 0; }
        .master-color-picker::-webkit-color-swatch { border: 2px solid #555; border-radius: 6px; }
        .slider-group { margin-bottom: 15px; }
        .slider-group label { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.95rem; color: #ccc;}
        .slider-group input[type="range"] { width: 100%; accent-color: #4CAF50; cursor: pointer; }
        .modal-code { background: #1a1a1a; padding: 12px; font-family: Consolas, monospace; color: #4CAF50; text-align: center; border-radius: 4px; margin-bottom: 20px; font-size: 0.95rem; border: 1px solid #333;}
        .modal-buttons { display: flex; justify-content: space-between; gap: 15px;}
        .modal-btn { flex: 1; padding: 12px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 1rem; transition: background 0.2s;}
        .btn-save { background: #4CAF50; color: #fff; }
        .btn-save:hover { background: #45a049; }
        .btn-cancel { background: #555; color: #fff; }
        .btn-cancel:hover { background: #666; }
    `;
    document.head.appendChild(style);
}

if (!document.getElementById('customColorModal')) {
    const modalHTML = `
        <div class="modal-box">
            <h3 id="modalTitle" class="modal-title">Farbe anpassen</h3>
            <div class="color-compare"><div id="modalOldColor">Vorher</div><div id="modalNewColor">Nachher</div></div>
            <div class="visual-picker-container"><span class="visual-picker-label">Visuelle Farbpalette (Anklicken)</span><input type="color" id="masterColorPicker" class="master-color-picker"></div>
            <div class="slider-group"><label>Rot <span id="valR">0</span></label><input type="range" id="sliderR" min="0" max="255" value="0"></div>
            <div class="slider-group"><label>Grün <span id="valG">0</span></label><input type="range" id="sliderG" min="0" max="255" value="0"></div>
            <div class="slider-group"><label>Blau <span id="valB">0</span></label><input type="range" id="sliderB" min="0" max="255" value="0"></div>
            <div class="modal-code" id="modalScsCode">SCS: (0, 0, 0)</div>
            <div class="modal-buttons"><button id="btnCancel" class="modal-btn btn-cancel">Abbrechen</button><button id="btnSave" class="modal-btn btn-save">Übernehmen</button></div>
        </div>
    `;
    const modalContainer = document.createElement('div');
    modalContainer.id = 'customColorModal';
    modalContainer.className = 'modal-overlay';
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
}

const modal = document.getElementById('customColorModal');
const modalTitle = document.getElementById('modalTitle');
const modalOldColor = document.getElementById('modalOldColor');
const modalNewColor = document.getElementById('modalNewColor');
const masterColorPicker = document.getElementById('masterColorPicker');
const sliderR = document.getElementById('sliderR');
const sliderG = document.getElementById('sliderG');
const sliderB = document.getElementById('sliderB');
const valR = document.getElementById('valR');
const valG = document.getElementById('valG');
const valB = document.getElementById('valB');
const modalScsCode = document.getElementById('modalScsCode');
const btnCancel = document.getElementById('btnCancel');
const btnSave = document.getElementById('btnSave');

// ---------------------------------------------------------
// 2. WÖRTERBÜCHER & KATEGORIEN
// ---------------------------------------------------------

const kategorienMapping = {
    "paint_job": "Lackierung & Design",
    "f_disc": "Räder & Reifen", "r_disc": "Räder & Reifen", "f_nuts": "Räder & Reifen", "r_nuts": "Räder & Reifen", 
    "f_hub": "Räder & Reifen", "r_hub": "Räder & Reifen", "f_tire": "Räder & Reifen", "r_tire": "Räder & Reifen",
    "r_grill": "Kabine Außen", "f_grill": "Kabine Außen", "b_grill": "Kabine Außen", "mirror": "Kabine Außen", 
    "f_mirror": "Kabine Außen", "s_mirror": "Kabine Außen", "sunshld": "Kabine Außen", "doorhndl": "Kabine Außen", 
    "doorstep": "Kabine Außen", "f_inlay_cab": "Kabine Außen", "f_intake_cab": "Kabine Außen", "f_wnd_frame": "Kabine Außen",
    "hl_guard": "Kabine Außen", "f_equip": "Kabine Außen", "r_horn": "Kabine Außen", "l_horn": "Kabine Außen", "f_intk_b_cab": "Kabine Außen",
    "f_bumper": "Chassis & Anbau", "r_bumper": "Chassis & Anbau", "sideskirt": "Chassis & Anbau", "f_fender": "Chassis & Anbau", 
    "r_fender": "Chassis & Anbau", "r_fendr_top": "Chassis & Anbau", "exhaust": "Chassis & Anbau", "exhaust_l": "Chassis & Anbau", 
    "exhaust_m": "Chassis & Anbau", "r_mudflap": "Chassis & Anbau", "tank": "Chassis & Anbau", "trlr_cables": "Chassis & Anbau",
    "f_inlay_chs": "Chassis & Anbau", "f_intake_chs": "Chassis & Anbau", "s_panel": "Chassis & Anbau", "r_chs_cover": "Chassis & Anbau", "f_intk_b_chs": "Chassis & Anbau",
    "badge": "Logos & Embleme", "f_logo": "Logos & Embleme", "s_badge": "Logos & Embleme", "c_badge": "Logos & Embleme", "f_badge": "Logos & Embleme",
    "r_light": "Beleuchtung", "markers": "Beleuchtung", "beacon": "Beleuchtung", "f_light_chs": "Beleuchtung", "f_light_mid": "Beleuchtung", "f_light_top": "Beleuchtung",
    "steering_w": "Innenraum", "intlight_bgr": "Innenraum", "intlight_bck": "Innenraum",
    "chs_f_l": "Auflieger", "chs_f_r": "Auflieger", "chs_m_l": "Auflieger", "chs_m_r": "Auflieger", "chs_r_l": "Auflieger", "chs_r_r": "Auflieger", 
    "rear_body": "Auflieger", "f_body": "Auflieger", "r_banner": "Auflieger", "body": "Auflieger"
};

const scsLexikon = {
    "paint_job": "Hauptlackierung",
    "f_disc": "Felge Vorne", "r_disc": "Felge Hinten", "f_nuts": "Muttern Vorn", "r_nuts": "Muttern Hinten",
    "f_hub": "Nabe Vorn", "r_hub": "Nabe Hinten", "f_tire": "Reifen Vorne", "r_tire": "Reifen Hinten",
    "r_grill": "Roofbar", "f_grill": "Frontgrill", "b_grill": "Lowbar", "mirror": "Spiegel", "f_mirror": "Frontspiegel", 
    "s_mirror": "Seitenspiegel", "sunshld": "Sonnenblende", "doorhndl": "Türgriffe", "doorstep": "Trittstufen", 
    "f_inlay_cab": "Front-Inlay (Kabine)", "f_intake_cab": "Lufteinlass (Kabine)", "f_wnd_frame": "Fensterrahmen Vorne", 
    "hl_guard": "Scheinwerfergitter", "f_equip": "Frontausstattung", "r_horn": "Lufthorn Rechts", "l_horn": "Lufthorn Links", "f_intk_b_cab": "Lufteinlass Unten (Kabine)",
    "f_bumper": "Frontstoßstange", "r_bumper": "Heckstoßstange", "sideskirt": "Seitenschweller", "f_fender": "Kotflügel Vorn", 
    "r_fender": "Kotflügel Hinten", "r_fendr_top": "Kotflügelabdeckung Hinten", "exhaust": "Auspuff (Seite)", "exhaust_l": "Auspuff Links", 
    "exhaust_m": "Auspuff Mitte", "r_mudflap": "Schmutzfänger", "tank": "Kraftstofftank", "trlr_cables": "Aufliegerkabel", 
    "f_inlay_chs": "Front-Inlay (Chassis)", "f_intake_chs": "Lufteinlass (Chassis)", "s_panel": "Seitenverkleidung", "r_chs_cover": "Chassisabdeckung Hinten", "f_intk_b_chs": "Lufteinlass Unten (Chassis)",
    "badge": "Emblem / Logo", "f_logo": "Front-Logo", "c_badge": "Kabinen-Emblem", "s_badge": "Seiten-Emblem", "f_badge": "Front-Emblem",
    "r_light": "Rücklichter", "markers": "Markierungsleuchten", "beacon": "Rundumleuchten", "f_light_chs": "Zusatzscheinwerfer (Chassis)", 
    "f_light_mid": "Zusatzscheinwerfer (Mitte)", "f_light_top": "Zusatzscheinwerfer (Dach)",
    "steering_w": "Lenkrad", "intlight_bgr": "Innenraumbeleuchtung (Hintergrund)", "intlight_bck": "Innenraumbeleuchtung (Rückwand)",
    "chs_f_l": "Chassis Vorn Links", "chs_f_r": "Chassis Vorn Rechts", "chs_m_l": "Chassis Mitte Links", "chs_m_r": "Chassis Mitte Rechts",
    "chs_r_l": "Chassis Hinten Links", "chs_r_r": "Chassis Hinten Rechts", "rear_body": "Heckportal", "f_body": "Stirnwand", "r_banner": "Heck-Banner"
};

// ---------------------------------------------------------
// 3. LOGIK & BERECHNUNGEN
// ---------------------------------------------------------

function scsToRgb(val) { return Math.max(0, Math.min(255, Math.pow(parseFloat(val), 1/2.2) * 255)); }
function rgbToScs(val) { return Math.pow(val / 255, 2.2).toFixed(6); }
function componentToHex(c) { var hex = Math.round(c).toString(16); return hex.length == 1 ? "0" + hex : hex; }
function hexToRgb(hex) { return { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) }; }

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    originalFileName = file.name;
    fileNameDisplay.textContent = `Geladen: ${originalFileName}`;
    
    btnDownload.style.display = 'block';

    const reader = new FileReader();
    reader.onload = function(event) { analysiere(event.target.result); };
    reader.readAsText(file);
});

function analysiere(text) {
    originalBloecke = text.split('}'); 
    geladeneTeile = []; 

    originalBloecke.forEach((block, index) => {
        const colorMatch = block.match(/(paint_color|base_color):\s*\((.*?),(.*?),(.*?)\)/);
        const pathMatch = block.match(/data_path:\s*"(.*?)"/);

        if (colorMatch && pathMatch) {
            const pfad = pathMatch[1];
            const pfadTeile = pfad.split('/');
            const katID = pfad.includes("paint_job") ? "paint_job" : pfadTeile[pfadTeile.length - 2];
            
            const r = scsToRgb(colorMatch[2]);
            const g = scsToRgb(colorMatch[3]);
            const b = scsToRgb(colorMatch[4]);

            geladeneTeile.push({
                blockIndex: index,            
                colorType: colorMatch[1],     
                rawMatch: colorMatch[0],      
                name: scsLexikon[katID] || katID,
                kategorie: kategorienMapping[katID] || "Sonstiges",
                r: r, g: g, b: b,
                hex: "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
            });
        }
    });
    renderDashboard();
}

function renderDashboard() {
    dashboard.innerHTML = "";
    const gruppen = {};

    geladeneTeile.forEach((t, index) => {
        if (!gruppen[t.kategorie]) gruppen[t.kategorie] = [];
        gruppen[t.kategorie].push({...t, originalIndex: index});
    });

    for (const [titel, teile] of Object.entries(gruppen)) {
        let html = `<div class="category-box"><h3>${titel}</h3>`;
        const counts = {};
        teile.forEach(t => { counts[t.name] = (counts[t.name] || 0) + 1; });
        const currentIdx = {};
        
        teile.forEach(t => {
            let finalName = t.name;
            if (counts[t.name] > 1) {
                currentIdx[t.name] = (currentIdx[t.name] || 0) + 1;
                finalName = `${t.name} (${currentIdx[t.name]})`;
            }
            html += `
                <div class="part-item">
                    <span>${finalName}</span>
                    <div class="color-preview" style="background-color: ${t.hex}" onclick="oeffnePicker(${t.originalIndex}, '${finalName}')"></div>
                </div>`;
        });
        html += `</div>`;
        dashboard.innerHTML += html;
    }
}

// ---------------------------------------------------------
// 4. STEUERUNG DES NEUEN FENSTERS
// ---------------------------------------------------------

function oeffnePicker(index, anzeigeName) {
    aktuellesTeilIndex = index;
    const teil = geladeneTeile[index];

    modalTitle.textContent = `Farbe anpassen: ${anzeigeName}`;
    modalOldColor.style.backgroundColor = teil.hex;
    modalNewColor.style.backgroundColor = teil.hex;
    
    masterColorPicker.value = teil.hex;
    sliderR.value = Math.round(teil.r);
    sliderG.value = Math.round(teil.g);
    sliderB.value = Math.round(teil.b);
    
    updateModalAnzeige(false);
    modal.classList.add('active');
}

function updateModalAnzeige(updatePalette = true) {
    const r = parseInt(sliderR.value); const g = parseInt(sliderG.value); const b = parseInt(sliderB.value);
    valR.textContent = r; valG.textContent = g; valB.textContent = b;
    const hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    modalNewColor.style.backgroundColor = hex;
    
    if (updatePalette) masterColorPicker.value = hex;
    modalScsCode.textContent = `SCS: (${rgbToScs(r)}, ${rgbToScs(g)}, ${rgbToScs(b)})`;
}

masterColorPicker.addEventListener('input', function() {
    const rgb = hexToRgb(this.value);
    sliderR.value = rgb.r; sliderG.value = rgb.g; sliderB.value = rgb.b;
    updateModalAnzeige(false); 
});

sliderR.addEventListener('input', () => updateModalAnzeige(true));
sliderG.addEventListener('input', () => updateModalAnzeige(true));
sliderB.addEventListener('input', () => updateModalAnzeige(true));

btnCancel.addEventListener('click', function() { modal.classList.remove('active'); });

btnSave.addEventListener('click', function() {
    const r = sliderR.value; const g = sliderG.value; const b = sliderB.value;
    const hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    const teil = geladeneTeile[aktuellesTeilIndex];

    teil.r = r; teil.g = g; teil.b = b; teil.hex = hex;

    const neuerScsString = `${teil.colorType}: (${rgbToScs(r)}, ${rgbToScs(g)}, ${rgbToScs(b)})`;
    originalBloecke[teil.blockIndex] = originalBloecke[teil.blockIndex].replace(teil.rawMatch, neuerScsString);
    teil.rawMatch = neuerScsString; 

    modal.classList.remove('active');
    renderDashboard();
});

// ---------------------------------------------------------
// 5. DATEI HERUNTERLADEN (Mit Zeitstempel & Signatur)
// ---------------------------------------------------------

function getTimestamp() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    
    // Windows erlaubt keine "/" in Dateinamen! Daher nehmen wir Bindestriche.
    return `${dd}-${mm}-${yyyy}`;
}

btnDownload.addEventListener('click', function() {
    // Blöcke wieder zusammenbauen
    let finalContent = originalBloecke.join('}');
    
    // Signatur hinzufügen
    finalContent += "\n\n// made by Carni\n";

    // Datei für den Download generieren
    const blob = new Blob([finalContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const baseName = originalFileName.replace('.sii', '').replace('.txt', '');
    const newFileName = `${baseName}_${getTimestamp()}.sii`;

    const a = document.createElement('a');
    a.href = url;
    a.download = newFileName;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});