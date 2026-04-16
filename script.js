const translations = {
    de: {
        app_title: "ETS2 Tools", nav_vehicle: "🚛 Vehicle Editor", nav_game: "🎮 Game Editor", nav_decoder: "🔓 Decoder",
        btn_choose: "📁 Datei wählen", btn_choose_game: "📁 Game.sii wählen", no_file: "Keine Datei...", btn_download: "📥 Download",
        loaded: "Geladen: ", last_edited: (d, t) => `🕒 Zuletzt: ${d} ${t} Uhr`,
        veh_paint: "🎨 Lackiererei", veh_workshop: "🔧 Werkstatt", ws_drivetrain: "Antrieb", ws_engine: "Motor:", 
        ws_transmission: "Getriebe:", ws_chassis_box: "Chassis", ws_chassis: "Achsen:", stat_analysis: "Analyse", 
        stat_power: "PS", stat_torque: "Nm", stat_gears: "Gänge", stat_normal: "Normal", stat_heavy: "Schwerlast", 
        stat_maneuver: "Wendigkeit", stat_hill: "Steigung", stat_terrain: "Gelände", keep_orig: "-- Original --",
        modal_old: "Alt", modal_new: "Neu", modal_palette: "Palette", modal_cancel: "Abbruch", modal_save: "Speichern", btn_batch: "🎨 Alle",
        game_profile: "Profil", game_money: "Geld:", game_level: "Level:", game_xp: "XP:", game_maintenance: "Wartung", game_repair_btn: "Alles Reparieren",
        cat_paint: "Lackierung & Design", cat_wheels: "Räder & Reifen", cat_cab_ext: "Kabine Außen", cat_chs: "Chassis & Anbau", cat_logo: "Logos & Embleme",
        cat_light: "Beleuchtung", cat_int: "Innenraum", cat_trailer: "Auflieger", cat_misc: "Sonstiges",
        parts: {
            "paint_job": "Hauptlackierung", "f_disc": "Felge Vorn", "r_disc": "Felge Hinten", "f_nuts": "Muttern Vorn", "r_nuts": "Muttern Hinten",
            "f_hub": "Nabe Vorn", "r_hub": "Nabe Hinten", "f_tire": "Reifen Vorn", "r_tire": "Reifen Hinten", "r_grill": "Roofbar", "f_grill": "Frontgrill", 
            "b_grill": "Lowbar", "mirror": "Spiegel", "f_mirror": "Frontspiegel", "s_mirror": "Seitenspiegel", "sunshld": "Sonnenblende", 
            "doorhndl": "Türgriffe", "doorstep": "Trittstufen", "f_inlay_cab": "Front-Inlay (Kab)", "f_intake_cab": "Lufteinlass (Kab)", 
            "f_wnd_frame": "Fensterrahmen", "hl_guard": "Scheinwerfergitter", "f_equip": "Frontausstattung", "r_horn": "Lufthorn Rechts", 
            "l_horn": "Lufthorn Links", "f_intk_b_cab": "Lufteinlass Unten (Kab)", "f_bumper": "Frontstoßstange", "r_bumper": "Heckstoßstange", 
            "sideskirt": "Seitenschweller", "f_fender": "Kotflügel Vorn", "r_fender": "Kotflügel Hinten", "r_fendr_top": "Kotflügelabdeckung", 
            "exhaust": "Auspuff (Seite)", "exhaust_l": "Auspuff Links", "exhaust_m": "Auspuff Mitte", "r_mudflap": "Schmutzfänger", "tank": "Tank", 
            "trlr_cables": "Kabel", "f_inlay_chs": "Front-Inlay (Chs)", "f_intake_chs": "Lufteinlass (Chs)", "s_panel": "Seitenverkleidung", 
            "r_chs_cover": "Chassisabdeckung", "f_intk_b_chs": "Lufteinlass Unten (Chs)", "badge": "Emblem", "f_logo": "Front-Logo", 
            "c_badge": "Kabinen-Emblem", "s_badge": "Seiten-Emblem", "f_badge": "Front-Emblem", "r_light": "Rücklichter", "markers": "Markierungsleuchten", 
            "beacon": "Rundumleuchten", "f_light_chs": "Zusatzscheinwerfer", "f_light_mid": "Zusatzscheinwerfer", "f_light_top": "Zusatzscheinwerfer",
            "steering_w": "Lenkrad", "intlight_bgr": "Innenlicht", "intlight_bck": "Innenlicht"
        }
    },
    en: {
        app_title: "ETS2 Tools", nav_vehicle: "🚛 Vehicle Editor", nav_game: "🎮 Game Editor", nav_decoder: "🔓 Decoder",
        btn_choose: "📁 Select File", btn_choose_game: "📁 Select Game.sii", no_file: "No file...", btn_download: "📥 Download",
        loaded: "Loaded: ", last_edited: (d, t) => `🕒 Last: ${d} ${t}`,
        veh_paint: "🎨 Paint", veh_workshop: "🔧 Workshop", ws_drivetrain: "Drivetrain", ws_engine: "Engine:", 
        ws_transmission: "Gearbox:", ws_chassis_box: "Chassis", ws_chassis: "Axles:", stat_analysis: "Analysis", 
        stat_power: "HP", stat_torque: "Nm", stat_gears: "Gears", stat_normal: "Normal", stat_heavy: "Heavy", 
        stat_maneuver: "Maneuver", stat_hill: "Hill", stat_terrain: "Terrain", keep_orig: "-- Original --",
        modal_old: "Old", modal_new: "New", modal_palette: "Palette", modal_cancel: "Cancel", modal_save: "Save", btn_batch: "🎨 All",
        game_profile: "Profile", game_money: "Money:", game_level: "Level:", game_xp: "XP:", game_maintenance: "Maintenance", game_repair_btn: "Repair All",
        cat_paint: "Paintjob & Design", cat_wheels: "Wheels", cat_cab_ext: "Cabin Ext", cat_chs: "Chassis & Addons", cat_logo: "Logos",
        cat_light: "Lighting", cat_int: "Interior", cat_trailer: "Trailer", cat_misc: "Misc",
        parts: { "paint_job": "Main Paintjob" }
    }
};

let currentLang = navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
let geladeneTeile = [], originalBloecke = [], originalFileName = "", lastSignatureMatch = null;
let offeneKategorien = new Set(), batchModus = false, batchKategorie = "", aktuellesTeilIndex = null;
window.originalEngine = null; window.originalTrans = null; window.originalChassis = null; window.truckModel = null;

const kategorienMapping = {
    "paint_job": "cat_paint", "f_disc": "cat_wheels", "r_disc": "cat_wheels", "f_nuts": "cat_wheels", "r_nuts": "cat_wheels", "f_hub": "cat_wheels", "r_hub": "cat_wheels", "f_tire": "cat_wheels", "r_tire": "cat_wheels",
    "r_grill": "cat_cab_ext", "f_grill": "cat_cab_ext", "b_grill": "cat_cab_ext", "mirror": "cat_cab_ext", "f_mirror": "cat_cab_ext", "s_mirror": "cat_cab_ext", "sunshld": "cat_cab_ext", "doorhndl": "cat_cab_ext", "doorstep": "cat_cab_ext", "f_inlay_cab": "cat_cab_ext", "f_intake_cab": "cat_cab_ext", "f_wnd_frame": "cat_cab_ext", "hl_guard": "cat_cab_ext", "f_equip": "cat_cab_ext", "r_horn": "cat_cab_ext", "l_horn": "cat_cab_ext", "f_intk_b_cab": "cat_cab_ext",
    "f_bumper": "cat_chs", "r_bumper": "cat_chs", "sideskirt": "cat_chs", "f_fender": "cat_chs", "r_fender": "cat_chs", "r_fendr_top": "cat_chs", "exhaust": "cat_chs", "exhaust_l": "cat_chs", "exhaust_m": "cat_chs", "r_mudflap": "cat_chs", "tank": "cat_chs", "trlr_cables": "cat_chs", "f_inlay_chs": "cat_chs", "f_intake_chs": "cat_chs", "s_panel": "cat_chs", "r_chs_cover": "cat_chs", "f_intk_b_chs": "cat_chs",
    "badge": "cat_logo", "f_logo": "cat_logo", "s_badge": "cat_logo", "c_badge": "cat_logo", "f_badge": "cat_logo",
    "r_light": "cat_light", "markers": "cat_light", "beacon": "cat_light", "f_light_chs": "cat_light", "f_light_mid": "cat_light", "f_light_top": "cat_light",
    "steering_w": "cat_int", "intlight_bgr": "cat_int", "intlight_bck": "cat_int"
};

const truckDB = {
    engines: {
        "keep": { hp: "---", nm: "---", h: 0, hi: 0, n: 0, t: 0 },
        "/def/vehicle/truck/volvo.fh16_2024/engine/d17_780.sii": { hp: 780, nm: 3800, h: 98, hi: 100, n: 95, t: 55 },
        "/def/vehicle/truck/scania.s_2016/engine/dc16_770.sii": { hp: 770, nm: 3700, h: 95, hi: 98, n: 90, t: 50 },
        "/def/vehicle/truck/volvo.fh16_2012/engine/d16g750.sii": { hp: 750, nm: 3550, h: 90, hi: 92, n: 85, t: 50 },
        "/def/vehicle/truck/mercedes.actros2014/engine/engine_1863.sii": { hp: 625, nm: 3000, h: 70, hi: 75, n: 80, t: 45 }
    },
    transmissions: {
        "keep": { g: "---", hb: 0, hib: 0, m: 0 },
        "/def/vehicle/truck/scania.s_2016/transmission/grso925r.sii": { g: 14, hb: 5, hib: 5, m: 45 },
        "/def/vehicle/truck/peterbilt.579/transmission/allison.sii": { g: 6, hb: -20, hib: -10, m: 95 },
        "/def/vehicle/truck/volvo.fh16_2012/transmission/12_speed_ret.sii": { g: 12, hb: 0, hib: 0, m: 55 }
    },
    chassis: {
        "scania.s_2016": [
            { id: "/def/vehicle/truck/scania.s_2016/chassis/4x2.sii", name: "4x2 Standard" },
            { id: "/def/vehicle/truck/scania.s_2016/chassis/6x2_midlift.sii", name: "6x2 Midlift" },
            { id: "/def/vehicle/truck/scania.s_2016/chassis/6x2_taglift.sii", name: "6x2 Taglift" },
            { id: "/def/vehicle/truck/scania.s_2016/chassis/6x4.sii", name: "6x4 Schwerlast" },
            { id: "/def/vehicle/truck/scania.s_2016/chassis/8x4.sii", name: "8x4 Schwerlast (Highline)" }
        ]
    }
};

// UI TABS STEUERUNG
function switchTab(id, btn) {
    document.querySelectorAll('.tab-content, .nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active'); btn.classList.add('active');
}
function switchSubTab(id, btn) {
    document.querySelectorAll('.sub-content, .sub-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active'); btn.classList.add('active');
}

function setLanguage(l) {
    currentLang = l;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if(translations[l][k]) el.textContent = translations[l][k];
    });
    
    document.getElementById('btn-lang-de').classList.toggle('active', l === 'de');
    document.getElementById('btn-lang-en').classList.toggle('active', l === 'en');

    if (geladeneTeile.length > 0) renderDashboard();
}
setLanguage(currentLang);

// NAME EXTRACTOR FÜR VERBAUTE TEILE
function getFriendlyName(path, type) {
    if(!path) return "Unbekannt";
    let sel = document.getElementById(type === 'engine' ? 'selEngine' : type === 'trans' ? 'selTrans' : 'selChassis');
    for(let i=0; i<sel.options.length; i++) {
        if(sel.options[i].value === path && sel.options[i].value !== "keep") return sel.options[i].textContent;
    }
    if(type === 'chassis' && window.truckModel && truckDB.chassis[window.truckModel]) {
        let found = truckDB.chassis[window.truckModel].find(c => c.id === path);
        if(found) return found.name;
    }
    let match = path.match(/\/([^\/]+)\.sii$/);
    return match ? match[1] : path;
}

// WERKSTATT LOGIK (Balken)
window.updateTruckStats = function() {
    let selE = document.getElementById('selEngine').value;
    if (selE === "keep" && window.originalEngine) selE = window.originalEngine;
    
    let selT = document.getElementById('selTrans').value;
    if (selT === "keep" && window.originalTrans) selT = window.originalTrans;

    const e = truckDB.engines[selE] || truckDB.engines.keep;
    const t = truckDB.transmissions[selT] || truckDB.transmissions.keep;

    document.getElementById('valPower').textContent = e.hp;
    document.getElementById('valTorque').textContent = e.nm;
    document.getElementById('valGears').textContent = t.g;
    
    if(e.hp === "---") {
        ['Normal', 'Heavy', 'Man', 'Hill', 'Terrain'].forEach(b => document.getElementById('bar'+b).style.width = "0%");
    } else {
        document.getElementById('barNormal').style.width = e.n + "%";
        document.getElementById('barHeavy').style.width = Math.min(100, Math.max(0, e.h + t.hb)) + "%";
        document.getElementById('barMan').style.width = t.m + "%";
        document.getElementById('barHill').style.width = Math.min(100, Math.max(0, e.hi + t.hib)) + "%";
        document.getElementById('barTerrain').style.width = e.t + "%";
    }
};

// MODAL FARB-PICKER (Lackiererei)
if (!document.getElementById('customColorModal')) {
    const mHtml = `
        <style>
            .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 1000; visibility: hidden; opacity: 0; transition: 0.2s; }
            .modal-overlay.active { visibility: visible; opacity: 1; }
            .modal-box { background: #252525; border: 2px solid #779ecb; border-radius: 10px; padding: 25px; width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); }
            .modal-title { margin-top: 0; color: #779ecb; text-align: center; }
            .color-compare { display: flex; height: 60px; border-radius: 6px; overflow: hidden; margin-bottom: 20px; border: 1px solid #555;}
            .color-compare div { flex: 1; display: flex; align-items: center; justify-content: center; text-shadow: 1px 1px 3px rgba(0,0,0,0.8); font-weight: bold; }
            .visual-picker-container { margin-bottom: 20px; text-align: center; background: #1e1e1e; padding: 10px; border-radius: 6px; border: 1px solid #333;}
            .master-color-picker { -webkit-appearance: none; border: none; width: 100%; height: 50px; border-radius: 6px; cursor: pointer; background: transparent; padding: 0;}
            .master-color-picker::-webkit-color-swatch { border: 2px solid #555; border-radius: 6px; }
            .slider-group { margin-bottom: 15px; }
            .slider-group label { display: flex; justify-content: space-between; font-size: 0.9rem; color: #ccc;}
            .slider-group input { width: 100%; accent-color: #779ecb; cursor: pointer; }
            .modal-code { background: #1a1a1a; padding: 12px; font-family: monospace; color: #779ecb; text-align: center; border-radius: 4px; margin-bottom: 20px; border: 1px solid #333;}
            .modal-buttons { display: flex; gap: 15px;}
            .modal-btn { flex: 1; padding: 10px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
        </style>
        <div class="modal-box">
            <h3 id="modalTitle" class="modal-title">Farbe</h3>
            <div class="color-compare"><div id="modalOldColor" data-i18n="modal_old">Alt</div><div id="modalNewColor" data-i18n="modal_new">Neu</div></div>
            <div class="visual-picker-container"><input type="color" id="masterColorPicker" class="master-color-picker"></div>
            <div class="slider-group"><label>R <span id="valR">0</span></label><input type="range" id="sliderR" min="0" max="255" value="0"></div>
            <div class="slider-group"><label>G <span id="valG">0</span></label><input type="range" id="sliderG" min="0" max="255" value="0"></div>
            <div class="slider-group"><label>B <span id="valB">0</span></label><input type="range" id="sliderB" min="0" max="255" value="0"></div>
            <div class="modal-code" id="modalScsCode">SCS: (0, 0, 0)</div>
            <div class="modal-buttons"><button id="btnCancel" class="modal-btn" style="background:#555;color:#fff;" data-i18n="modal_cancel">Abbruch</button><button id="btnSave" class="modal-btn" style="background:#779ecb;color:#fff;" data-i18n="modal_save">Speichern</button></div>
        </div>`;
    const m = document.createElement('div'); m.id = 'customColorModal'; m.className = 'modal-overlay'; m.innerHTML = mHtml;
    document.body.appendChild(m);
}

function scsToRgb(val) { return Math.max(0, Math.min(255, Math.pow(parseFloat(val), 1/2.2) * 255)); }
function rgbToScs(val) { return Math.pow(val / 255, 2.2).toFixed(6); }
function compToHex(c) { var h = Math.round(c).toString(16); return h.length == 1 ? "0" + h : h; }
function hexToRgb(h) { return { r: parseInt(h.slice(1, 3), 16), g: parseInt(h.slice(3, 5), 16), b: parseInt(h.slice(5, 7), 16) }; }

// DATEI UPLOAD VEHICLE
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0]; if (!file) return;
    originalFileName = file.name;
    document.getElementById('fileNameDisplay').textContent = translations[currentLang].loaded + originalFileName;
    document.getElementById('btnDownload').style.display = 'block';
    document.getElementById('vehiclePlaceholder').style.display = 'none';
    document.getElementById('vehicleSubNav').style.display = 'flex';
    switchSubTab('werkstatt', document.querySelectorAll('.sub-btn')[1]);
    
    const reader = new FileReader();
    reader.onload = function(event) { analysiere(event.target.result); };
    reader.readAsText(file);
});

function analysiere(text) {
    originalBloecke = text.split('}');
    geladeneTeile = []; offeneKategorien.clear();
    
    // 1. Farben & Lackiererei
    originalBloecke.forEach((block, index) => {
        const cMatch = block.match(/(paint_color|base_color):\s*\((.*?),(.*?),(.*?)\)/);
        const pMatch = block.match(/data_path:\s*"(.*?)"/);
        if (cMatch && pMatch) {
            const pfad = pMatch[1];
            const pTeile = pfad.split('/');
            const katID = pfad.includes("paint_job") ? "paint_job" : pTeile[pTeile.length - 2];
            const r = scsToRgb(cMatch[2]), g = scsToRgb(cMatch[3]), b = scsToRgb(cMatch[4]);
            geladeneTeile.push({
                blockIndex: index, colorType: cMatch[1], rawMatch: cMatch[0],
                katID: katID, catKey: kategorienMapping[katID] || "cat_misc",
                r: r, g: g, b: b, hex: "#" + compToHex(r) + compToHex(g) + compToHex(b)
            });
        }
    });
    renderDashboard();

    // 2. Hardware Scanner & Werkstatt
    window.originalEngine = null; window.originalTrans = null; window.originalChassis = null; window.truckModel = null;
    document.getElementById('selEngine').value = "keep";
    document.getElementById('selTrans').value = "keep";
    const chSel = document.getElementById('selChassis');
    chSel.innerHTML = `<option value="keep">${translations[currentLang].keep_orig}</option>`;
    chSel.disabled = true;
    document.getElementById('chassisWarn').style.display = 'none';

    const eMatch = text.match(/data_path:\s*"(.*?\/engine\/.*?\.sii)"/);
    if(eMatch) window.originalEngine = eMatch[1];
    
    const tMatch = text.match(/data_path:\s*"(.*?\/transmission\/.*?\.sii)"/);
    if(tMatch) window.originalTrans = tMatch[1];
    
    const cMatch = text.match(/data_path:\s*"(.*?\/chassis\/.*?\.sii)"/);
    if(cMatch) {
        window.originalChassis = cMatch[1];
        const mMatch = window.originalChassis.match(/\/vehicle\/truck\/(.*?)\/chassis/);
        if(mMatch) {
            window.truckModel = mMatch[1];
            if(truckDB.chassis[window.truckModel]) {
                chSel.disabled = false;
                truckDB.chassis[window.truckModel].forEach(ch => {
                    const opt = document.createElement('option');
                    opt.value = ch.id; opt.textContent = ch.name;
                    chSel.appendChild(opt);
                });
            }
        }
    }

    // LABEL UPDATES
    document.querySelector('#selEngine option[value="keep"]').textContent = window.originalEngine ? `-- Orig: ${getFriendlyName(window.originalEngine, 'engine')} --` : translations[currentLang].keep_orig;
    document.querySelector('#selTrans option[value="keep"]').textContent = window.originalTrans ? `-- Orig: ${getFriendlyName(window.originalTrans, 'trans')} --` : translations[currentLang].keep_orig;
    document.querySelector('#selChassis option[value="keep"]').textContent = window.originalChassis ? `-- Orig: ${getFriendlyName(window.originalChassis, 'chassis')} --` : translations[currentLang].keep_orig;

    updateTruckStats();
}

// Lackiererei UI Update
function toggleKategorie(catKey) {
    if (offeneKategorien.has(catKey)) offeneKategorien.delete(catKey); else offeneKategorien.add(catKey);
    renderDashboard();
}

function renderDashboard() {
    const db = document.getElementById('dashboard');
    db.innerHTML = "";
    const gruppen = {};
    geladeneTeile.forEach((t, index) => {
        if (!gruppen[t.catKey]) gruppen[t.catKey] = [];
        gruppen[t.catKey].push({...t, originalIndex: index});
    });

    for (const [catKey, teile] of Object.entries(gruppen)) {
        const istOffen = offeneKategorien.has(catKey);
        const uTitel = translations[currentLang][catKey] || catKey;
        let html = `<div class="category-box ${istOffen ? '' : 'collapsed'}"><div class="category-header" onclick="toggleKategorie('${catKey}')"><div class="header-left"><span class="chevron">▼</span><h3>${uTitel}</h3></div><button class="btn-batch" onclick="event.stopPropagation(); oeffneBatchPicker('${catKey}')">${translations[currentLang].btn_batch}</button></div><div class="category-content">`;
        
        const counts = {}, currentIdx = {};
        teile.forEach(t => { const n = (translations[currentLang].parts && translations[currentLang].parts[t.katID]) || t.katID; counts[n] = (counts[n] || 0) + 1; });
        
        teile.forEach(t => {
            let bName = (translations[currentLang].parts && translations[currentLang].parts[t.katID]) || t.katID;
            let fName = counts[bName] > 1 ? `${bName} (${currentIdx[bName] = (currentIdx[bName] || 0) + 1})` : bName;
            html += `<div class="part-item"><span>${fName}</span><div class="color-preview" style="background-color: ${t.hex}" onclick="oeffnePicker(${t.originalIndex}, '${fName}')"></div></div>`;
        });
        html += `</div></div>`;
        db.innerHTML += html;
    }
}

// Color Picker Logik
function updateModalAnzeige(updPal = true) {
    const r = parseInt(document.getElementById('sliderR').value), g = parseInt(document.getElementById('sliderG').value), b = parseInt(document.getElementById('sliderB').value);
    document.getElementById('valR').textContent = r; document.getElementById('valG').textContent = g; document.getElementById('valB').textContent = b;
    const hex = "#" + compToHex(r) + compToHex(g) + compToHex(b);
    document.getElementById('modalNewColor').style.backgroundColor = hex;
    if(updPal) document.getElementById('masterColorPicker').value = hex;
    document.getElementById('modalScsCode').textContent = `SCS: (${rgbToScs(r)}, ${rgbToScs(g)}, ${rgbToScs(b)})`;
}

function oeffnePicker(index, name) {
    batchModus = false; aktuellesTeilIndex = index; const t = geladeneTeile[index];
    document.getElementById('modalTitle').textContent = name; 
    document.getElementById('modalOldColor').style.backgroundColor = t.hex;
    document.getElementById('masterColorPicker').value = t.hex;
    document.getElementById('sliderR').value = Math.round(t.r); document.getElementById('sliderG').value = Math.round(t.g); document.getElementById('sliderB').value = Math.round(t.b);
    updateModalAnzeige(false); document.getElementById('customColorModal').classList.add('active');
}

function oeffneBatchPicker(catKey) {
    batchModus = true; batchKategorie = catKey; const t = geladeneTeile.find(x => x.catKey === catKey);
    document.getElementById('modalTitle').textContent = `Alle: ${translations[currentLang][catKey] || catKey}`; 
    document.getElementById('modalOldColor').style.backgroundColor = t.hex;
    document.getElementById('masterColorPicker').value = t.hex;
    document.getElementById('sliderR').value = Math.round(t.r); document.getElementById('sliderG').value = Math.round(t.g); document.getElementById('sliderB').value = Math.round(t.b);
    updateModalAnzeige(false); document.getElementById('customColorModal').classList.add('active');
}

['sliderR','sliderG','sliderB'].forEach(id => document.getElementById(id).addEventListener('input', () => updateModalAnzeige(true)));
document.getElementById('masterColorPicker').addEventListener('input', function() {
    const c = hexToRgb(this.value);
    document.getElementById('sliderR').value = c.r; document.getElementById('sliderG').value = c.g; document.getElementById('sliderB').value = c.b;
    updateModalAnzeige(false); 
});
document.getElementById('btnCancel').addEventListener('click', () => document.getElementById('customColorModal').classList.remove('active'));

document.getElementById('btnSave').addEventListener('click', function() {
    const r = document.getElementById('sliderR').value, g = document.getElementById('sliderG').value, b = document.getElementById('sliderB').value;
    const hex = "#" + compToHex(r) + compToHex(g) + compToHex(b);
    const upd = (t) => {
        t.r = r; t.g = g; t.b = b; t.hex = hex;
        const nStr = `${t.colorType}: (${rgbToScs(r)}, ${rgbToScs(g)}, ${rgbToScs(b)})`;
        originalBloecke[t.blockIndex] = originalBloecke[t.blockIndex].replace(t.rawMatch, nStr);
        t.rawMatch = nStr;
    };
    if (batchModus) geladeneTeile.filter(t => t.catKey === batchKategorie).forEach(upd); else upd(geladeneTeile[aktuellesTeilIndex]);
    document.getElementById('customColorModal').classList.remove('active');
    renderDashboard();
});

document.getElementById('selChassis').addEventListener('change', function() { document.getElementById('chassisWarn').style.display = this.value !== "keep" ? 'block' : 'none'; });

// DATEI DOWNLOAD VEHICLE
function getTimestamp() { const d = new Date(); return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`; }
document.getElementById('btnDownload').addEventListener('click', function() {
    let out = originalBloecke.join('}');
    
    const sEng = document.getElementById('selEngine').value;
    if(sEng !== "keep" && window.originalEngine) out = out.replace(window.originalEngine, sEng);

    const sTra = document.getElementById('selTrans').value;
    if(sTra !== "keep" && window.originalTrans) out = out.replace(window.originalTrans, sTra);

    const sCha = document.getElementById('selChassis').value;
    if(sCha !== "keep" && window.originalChassis) out = out.replace(window.originalChassis, sCha);

    const d = new Date();
    out = out.replace(/\/\/ made by Carni - .*? Uhr/g, '');
    out += `\n\n// made by Carni - ${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()} Uhr\n`;

    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([out], {type: "text/plain"}));
    a.download = `${originalFileName.replace('.sii','')}_mod_${getTimestamp()}.sii`;
    a.click();
});

// GAME EDITOR LOGIK (Geld & XP)
function getLvl(xp) { return Math.floor(-1.5 + Math.sqrt(2.25 + xp / 50)); }
function getXp(lvl) { return 50 * lvl * lvl + 150 * lvl; }
document.getElementById('inpXp').addEventListener('input', function() { document.getElementById('inpLevel').value = getLvl(this.value); });
document.getElementById('inpLevel').addEventListener('input', function() { document.getElementById('inpXp').value = getXp(this.value); });

let gameFileText = "", gOrigMoney = 0, gOrigXp = 0;
window.resetMoney = () => document.getElementById('inpMoney').value = gOrigMoney;
window.resetXp = () => { document.getElementById('inpXp').value = gOrigXp; document.getElementById('inpLevel').value = getLvl(gOrigXp); };

document.getElementById('gameFileInput').addEventListener('change', function(e) {
    const f = e.target.files[0]; if(!f) return;
    document.getElementById('gameFileNameDisplay').textContent = translations[currentLang].loaded + f.name;
    const r = new FileReader();
    r.onload = function(evt) {
        gameFileText = evt.target.result;
        const mM = gameFileText.match(/money_account:\s*(\d+)/);
        const xM = gameFileText.match(/experience_points:\s*(\d+)/);
        if(mM && xM) {
            gOrigMoney = parseInt(mM[1]); gOrigXp = parseInt(xM[1]);
            document.getElementById('origMoneyBadge').textContent = `Orig: ${gOrigMoney}`;
            document.getElementById('origXpBadge').textContent = `Orig: ${gOrigXp}`;
            resetMoney(); resetXp();
            document.getElementById('gamePlaceholder').style.display = 'none';
            document.getElementById('gameDashboard').style.display = 'grid';
            document.getElementById('btnGameDownload').style.display = 'block';
        }
    };
    r.readAsText(f);
});

document.getElementById('btnGameDownload').addEventListener('click', function() {
    let out = gameFileText;
    out = out.replace(/money_account:\s*\d+/, `money_account: ${document.getElementById('inpMoney').value}`);
    out = out.replace(/experience_points:\s*\d+/, `experience_points: ${document.getElementById('inpXp').value}`);
    if(document.getElementById('chkRepair').checked) out = out.replace(/wear:\s*[^\r\n]+/g, `wear: 0`);
    
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([out], {type: "text/plain"}));
    a.download = `game_edited_${getTimestamp()}.sii`;
    a.click();
});