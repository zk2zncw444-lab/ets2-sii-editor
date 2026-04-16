// ---------------------------------------------------------
// 1. ÜBERSETZUNG (WÖRTERBUCH & SPRACH-LOGIK)
// ---------------------------------------------------------
const translations = {
    de: {
        app_title: "ETS2 Tools", nav_vehicle: "🚛 Vehicle.sii Editor", nav_game: "🎮 Game.sii Editor", nav_decoder: "🔓 SII Decoder",
        btn_choose: "📁 Datei auswählen", btn_choose_game: "📁 Game.sii wählen", no_file: "Keine Datei ausgewählt",
        btn_download: "📥 Datei herunterladen",
        placeholder: "Bitte lade eine Datei hoch...", placeholder_game: "Bitte lade eine entschlüsselte game.sii hoch...",
        decoder_info: "Nutze diesen integrierten Decoder, um verschlüsselte Savegames in lesbaren Text zu verwandeln, bevor du sie im Editor bearbeitest.",
        loaded: "Geladen: ", last_edited: (d, t) => `🕒 Zuletzt bearbeitet am ${d} um ${t} Uhr`,
        modal_old: "Alt", modal_new: "Neu", modal_palette: "Palette (Klicken)", modal_cancel: "Abbrechen", modal_save: "Speichern", btn_batch: "🎨 Alle",
        modal_title_color: "Farbe:", modal_title_all: "Alle:",
        
        veh_paint: "🎨 Lackiererei", veh_workshop: "🔧 Werkstatt",
        ws_drivetrain: "Antriebsstrang", ws_engine: "Motor (Engine):", ws_transmission: "Getriebe:",
        ws_chassis_box: "Fahrgestell (Chassis)", ws_chassis: "Achsen-Konfiguration:",
        ws_accessories: "Anbauteile & Tuning", ws_acc_info: "Das Auslesen der Anbauteile wird geladen, sobald du eine Datei importierst...",
        keep_orig: "-- Original beibehalten --",

        stat_analysis: "Fahrzeug-Analyse", stat_normal: "Normale Fracht", stat_heavy: "Schwerlast", 
        stat_maneuver: "Manövrierbarkeit", stat_hill: "Steigung", stat_terrain: "Unbefestigt",
        stat_power: "Leistung (PS)", stat_torque: "Drehmoment (Nm)", stat_gears: "Gänge",

        cat_paint: "Lackierung & Design", cat_wheels: "Räder & Reifen", cat_cab_ext: "Kabine Außen", cat_chs: "Chassis & Anbau", cat_logo: "Logos & Embleme",
        cat_light: "Beleuchtung", cat_int: "Innenraum", cat_trailer: "Auflieger", cat_misc: "Sonstiges",
        
        game_profile: "Spieler Profil", game_money: "Kontostand (€):", game_level: "Spieler-Level:", game_xp: "Erfahrungspunkte (XP):",
        game_maintenance: "Fuhrpark & Wartung", game_repair_info: "Setzt den Verschleiß deines gesamten Fuhrparks (Lkw, Auflieger) auf 0%.", 
        game_repair_btn: "Alle Fahrzeuge reparieren", game_skills: "Fähigkeiten (Level 0 - 6)", game_skills_max: "⭐ Alle auf Max",
        skill_adr: "ADR / Gefahrgut:", skill_long: "Fernfahrt:", skill_heavy: "Hochwertige Fracht:", 
        skill_fragile: "Zerbrechliche Fracht:", skill_urgent: "Just-in-Time (Eilig):", skill_eco: "Eco-Drive:",

        parts: {
            "paint_job": "Hauptlackierung", "f_disc": "Felge Vorne", "r_disc": "Felge Hinten", "f_nuts": "Muttern Vorn", "r_nuts": "Muttern Hinten",
            "f_hub": "Nabe Vorn", "r_hub": "Nabe Hinten", "f_tire": "Reifen Vorne", "r_tire": "Reifen Hinten", "r_grill": "Roofbar", "f_grill": "Frontgrill", 
            "b_grill": "Lowbar", "mirror": "Spiegel", "f_mirror": "Frontspiegel", "s_mirror": "Seitenspiegel", "sunshld": "Sonnenblende", 
            "doorhndl": "Türgriffe", "doorstep": "Trittstufen", "f_inlay_cab": "Front-Inlay (Kabine)", "f_intake_cab": "Lufteinlass (Kabine)", 
            "f_wnd_frame": "Fensterrahmen Vorne", "hl_guard": "Scheinwerfergitter", "f_equip": "Frontausstattung", "r_horn": "Lufthorn Rechts", 
            "l_horn": "Lufthorn Links", "f_intk_b_cab": "Lufteinlass Unten (Kabine)", "f_bumper": "Frontstoßstange", "r_bumper": "Heckstoßstange", 
            "sideskirt": "Seitenschweller", "f_fender": "Kotflügel Vorn", "r_fender": "Kotflügel Hinten", "r_fendr_top": "Kotflügelabdeckung Hinten", 
            "exhaust": "Auspuff (Seite)", "exhaust_l": "Auspuff Links", "exhaust_m": "Auspuff Mitte", "r_mudflap": "Schmutzfänger", "tank": "Kraftstofftank", 
            "trlr_cables": "Aufliegerkabel", "f_inlay_chs": "Front-Inlay (Chassis)", "f_intake_chs": "Lufteinlass (Chassis)", "s_panel": "Seitenverkleidung", 
            "r_chs_cover": "Chassisabdeckung Hinten", "f_intk_b_chs": "Lufteinlass Unten (Chassis)", "badge": "Emblem / Logo", "f_logo": "Front-Logo", 
            "c_badge": "Kabinen-Emblem", "s_badge": "Seiten-Emblem", "f_badge": "Front-Emblem", "r_light": "Rücklichter", "markers": "Markierungsleuchten", 
            "beacon": "Rundumleuchten", "f_light_chs": "Zusatzscheinwerfer (Chassis)", "f_light_mid": "Zusatzscheinwerfer (Mitte)", "f_light_top": "Zusatzscheinwerfer (Dach)",
            "steering_w": "Lenkrad", "intlight_bgr": "Innenraumbeleuchtung (Hintergrund)", "intlight_bck": "Innenraumbeleuchtung (Rückwand)",
            "chs_f_l": "Chassis Vorn Links", "chs_f_r": "Chassis Vorn Rechts", "chs_m_l": "Chassis Mitte Links", "chs_m_r": "Chassis Mitte Rechts",
            "chs_r_l": "Chassis Hinten Links", "chs_r_r": "Chassis Hinten Rechts", "rear_body": "Heckportal", "f_body": "Stirnwand", "r_banner": "Heck-Banner"
        }
    },
    en: {
        app_title: "ETS2 Tools", nav_vehicle: "🚛 Vehicle Editor", nav_game: "🎮 Game Editor", nav_decoder: "🔓 SII Decoder",
        btn_choose: "📁 Choose File", btn_choose_game: "📁 Select Game.sii", no_file: "No file selected",
        btn_download: "📥 Download File",
        placeholder: "Please upload a file...", placeholder_game: "Please upload a decrypted game.sii...",
        decoder_info: "Use this integrated decoder to convert encrypted savegames into readable text before editing them.",
        loaded: "Loaded: ", last_edited: (d, t) => `🕒 Last edited on ${d} at ${t}`,
        modal_old: "Old", modal_new: "New", modal_palette: "Palette (Click)", modal_cancel: "Cancel", modal_save: "Save", btn_batch: "🎨 All",
        modal_title_color: "Color:", modal_title_all: "All:",

        veh_paint: "🎨 Paint Shop", veh_workshop: "🔧 Workshop",
        ws_drivetrain: "Drivetrain", ws_engine: "Engine:", ws_transmission: "Transmission:",
        ws_chassis_box: "Chassis", ws_chassis: "Chassis Type:",
        ws_accessories: "Accessories & Tuning", ws_acc_info: "Reading accessories will be available once you import a file...",
        keep_orig: "-- Keep Original --",

        stat_analysis: "Truck Analysis", stat_normal: "Normal Cargo", stat_heavy: "Heavy Cargo", 
        stat_maneuver: "Maneuverability", stat_hill: "Hill Climb", stat_terrain: "Uneven Terrain",
        stat_power: "Power (HP)", stat_torque: "Torque (Nm)", stat_gears: "Gears",

        cat_paint: "Paintjob & Design", cat_wheels: "Wheels & Tires", cat_cab_ext: "Cabin Exterior", cat_chs: "Chassis & Addons", cat_logo: "Logos & Badges",
        cat_light: "Lighting", cat_int: "Interior", cat_trailer: "Trailer", cat_misc: "Misc",
        
        game_profile: "Player Profile", game_money: "Account Balance (€):", game_level: "Player Level:", game_xp: "Experience Points (XP):",
        game_maintenance: "Fleet & Maintenance", game_repair_info: "Sets the wear and tear of your entire fleet (Trucks, Trailers) to 0%.", 
        game_repair_btn: "Repair All Vehicles", game_skills: "Skills (Level 0 - 6)", game_skills_max: "⭐ Max All",
        skill_adr: "ADR / Hazmat:", skill_long: "Long Distance:", skill_heavy: "High Value Cargo:", 
        skill_fragile: "Fragile Cargo:", skill_urgent: "Just-in-Time (Urgent):", skill_eco: "Eco-Drive:",

        parts: {
            "paint_job": "Main Paintjob", "f_disc": "Front Disc", "r_disc": "Rear Disc", "f_nuts": "Front Nuts", "r_nuts": "Rear Nuts",
            "f_hub": "Front Hub", "r_hub": "Rear Hub", "f_tire": "Front Tire", "r_tire": "Rear Tire", "r_grill": "Roof Grill", "f_grill": "Front Grill", 
            "b_grill": "Bottom Grill", "mirror": "Mirror", "f_mirror": "Front Mirror", "s_mirror": "Side Mirror", "sunshld": "Sun Visor", 
            "doorhndl": "Door Handle", "doorstep": "Door Step", "f_inlay_cab": "Front Inlay (Cabin)", "f_intake_cab": "Intake (Cabin)", 
            "f_wnd_frame": "Window Frame", "hl_guard": "Headlight Guard", "f_equip": "Front Equip", "r_horn": "Right Horn", 
            "l_horn": "Left Horn", "f_intk_b_cab": "Bottom Intake (Cabin)", "f_bumper": "Front Bumper", "r_bumper": "Rear Bumper", 
            "sideskirt": "Sideskirt", "f_fender": "Front Fender", "r_fender": "Rear Fender", "r_fendr_top": "Rear Fender Top", 
            "exhaust": "Exhaust", "exhaust_l": "Left Exhaust", "exhaust_m": "Middle Exhaust", "r_mudflap": "Mudflap", "tank": "Fuel Tank", 
            "trlr_cables": "Trailer Cables", "f_inlay_chs": "Front Inlay (Chassis)", "f_intake_chs": "Intake (Chassis)", "s_panel": "Side Panel", 
            "r_chs_cover": "Chassis Cover", "f_intk_b_chs": "Bottom Intake (Chassis)", "badge": "Badge", "f_logo": "Front Logo", 
            "c_badge": "Cabin Badge", "s_badge": "Side Badge", "f_badge": "Front Badge", "r_light": "Rear Light", "markers": "Markers", 
            "beacon": "Beacon", "f_light_chs": "Chassis Lights", "f_light_mid": "Mid Lights", "f_light_top": "Top Lights",
            "steering_w": "Steering Wheel", "intlight_bgr": "Interior Light (BG)", "intlight_bck": "Interior Light (Back)",
            "chs_f_l": "Front Left Chassis", "chs_f_r": "Front Right Chassis", "chs_m_l": "Mid Left Chassis", "chs_m_r": "Mid Right Chassis",
            "chs_r_l": "Rear Left Chassis", "chs_r_r": "Rear Right Chassis", "rear_body": "Rear Body", "f_body": "Front Body", "r_banner": "Rear Banner"
        }
    }
};

let currentLang = 'en';

function initLanguage() {
    const savedLang = localStorage.getItem('ets2_editor_lang');
    if (savedLang) { currentLang = savedLang; } 
    else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('de')) { currentLang = 'de'; }
    }
    setLanguage(currentLang);
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ets2_editor_lang', lang);
    document.getElementById('btn-lang-de').classList.toggle('active', lang === 'de');
    document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) { el.textContent = translations[currentLang][key]; }
    });
    
    if (originalFileName) { document.getElementById('fileNameDisplay').textContent = translations[currentLang].loaded + originalFileName; }
    if (lastSignatureMatch) { document.getElementById('timeStampDisplay').textContent = translations[currentLang].last_edited(lastSignatureMatch[1], lastSignatureMatch[2]); }
    if (geladeneTeile.length > 0) { renderDashboard(); }
    if (gameFileName) { document.getElementById('gameFileNameDisplay').textContent = translations[currentLang].loaded + gameFileName; }
}

// ---------------------------------------------------------
// 2. TAB NAVIGATION & SUB-NAVIGATION
// ---------------------------------------------------------
function switchTab(tabId, btnElement) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btnElement.classList.add('active');
}

function switchSubTab(subTabId, btnElement) {
    document.querySelectorAll('.sub-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(subTabId).classList.add('active');
    btnElement.classList.add('active');
}

// ---------------------------------------------------------
// 3. TRUCK DATENBANK (PHYSIK & ANALYSE)
// ---------------------------------------------------------
const truckDB = {
    engines: {
        "keep": { hp: "---", nm: "---", heavy: 0, hill: 0, norm: 0, terr: 0 },
        "/def/vehicle/truck/volvo.fh16_2024/engine/d17_780.sii": { hp: 780, nm: 3800, heavy: 98, hill: 100, norm: 95, terr: 55 },
        "/def/vehicle/truck/scania.s_2016/engine/dc16_770.sii": { hp: 770, nm: 3700, heavy: 95, hill: 98, norm: 90, terr: 50 },
        "/def/vehicle/truck/volvo.fh16_2012/engine/d16g750.sii": { hp: 750, nm: 3550, heavy: 90, hill: 92, norm: 85, terr: 50 },
        "/def/vehicle/truck/mercedes.actros2014/engine/engine_1863.sii": { hp: 625, nm: 3000, heavy: 70, hill: 75, norm: 80, terr: 45 },
        "/def/vehicle/truck/daf.2021/engine/mx13_390.sii": { hp: 530, nm: 2600, heavy: 50, hill: 55, norm: 85, terr: 40 },
        "/def/vehicle/truck/renault.t/engine/dti13_520.sii": { hp: 520, nm: 2550, heavy: 45, hill: 50, norm: 85, terr: 40 }
    },
    transmissions: {
        "keep": { gears: "---", heavy_b: 0, hill_b: 0, man: 0, terr_b: 0 },
        "/def/vehicle/truck/scania.s_2016/transmission/grso925r.sii": { gears: 14, heavy_b: 5, hill_b: 5, man: 40, terr_b: 10 },
        "/def/vehicle/truck/volvo.fh16_2012/transmission/12_speed_ret.sii": { gears: 12, heavy_b: 0, hill_b: 0, man: 55, terr_b: 0 },
        "/def/vehicle/truck/peterbilt.579/transmission/allison.sii": { gears: 6, heavy_b: -20, hill_b: -10, man: 95, terr_b: -10 }
    }
};

window.updateTruckStats = function() {
    const selEng = document.getElementById('selEngine').value;
    const selTra = document.getElementById('selTrans').value;
    
    const eng = truckDB.engines[selEng] || truckDB.engines["keep"];
    const tra = truckDB.transmissions[selTra] || truckDB.transmissions["keep"];

    document.getElementById('valPower').textContent = eng.hp;
    document.getElementById('valTorque').textContent = eng.nm;
    document.getElementById('valGears').textContent = tra.gears;

    if(selEng === "keep" && selTra === "keep") {
        document.getElementById('barNormal').style.width = "0%";
        document.getElementById('barHeavy').style.width = "0%";
        document.getElementById('barMan').style.width = "0%";
        document.getElementById('barHill').style.width = "0%";
        document.getElementById('barTerrain').style.width = "0%";
    } else {
        document.getElementById('barNormal').style.width = Math.min(100, eng.norm) + "%";
        document.getElementById('barHeavy').style.width = Math.min(100, Math.max(0, eng.heavy + tra.heavy_b)) + "%";
        document.getElementById('barMan').style.width = Math.min(100, tra.man) + "%";
        document.getElementById('barHill').style.width = Math.min(100, Math.max(0, eng.hill + tra.hill_b)) + "%";
        document.getElementById('barTerrain').style.width = Math.min(100, Math.max(0, eng.terr + tra.terr_b)) + "%";
    }
}

// ---------------------------------------------------------
// 4. VEHICLE EDITOR LOGIK (FARBEN & WERKSTATT)
// ---------------------------------------------------------
const fileInput = document.getElementById('fileInput');
const dashboard = document.getElementById('dashboard');
const btnDownload = document.getElementById('btnDownload'); 
const vehiclePlaceholder = document.getElementById('vehiclePlaceholder');
const vehicleSubNav = document.getElementById('vehicleSubNav');

let aktuellesTeilIndex = null;
let geladeneTeile = []; 
let originalBloecke = []; 
let originalFileName = ""; 
let lastSignatureMatch = null; 

let offeneKategorien = new Set();
let batchModus = false;
let batchKategorie = "";

window.originalEngine = null;
window.originalTrans = null;

const kategorienMapping = {
    "paint_job": "cat_paint", "f_disc": "cat_wheels", "r_disc": "cat_wheels", "f_nuts": "cat_wheels", "r_nuts": "cat_wheels", 
    "f_hub": "cat_wheels", "r_hub": "cat_wheels", "f_tire": "cat_wheels", "r_tire": "cat_wheels", "r_grill": "cat_cab_ext", 
    "f_grill": "cat_cab_ext", "b_grill": "cat_cab_ext", "mirror": "cat_cab_ext", "f_mirror": "cat_cab_ext", "s_mirror": "cat_cab_ext", 
    "sunshld": "cat_cab_ext", "doorhndl": "cat_cab_ext", "doorstep": "cat_cab_ext", "f_inlay_cab": "cat_cab_ext", "f_intake_cab": "cat_cab_ext", 
    "f_wnd_frame": "cat_cab_ext", "hl_guard": "cat_cab_ext", "f_equip": "cat_cab_ext", "r_horn": "cat_cab_ext", "l_horn": "cat_cab_ext", 
    "f_intk_b_cab": "cat_cab_ext", "f_bumper": "cat_chs", "r_bumper": "cat_chs", "sideskirt": "cat_chs", "f_fender": "cat_chs", "r_fender": "cat_chs", 
    "r_fendr_top": "cat_chs", "exhaust": "cat_chs", "exhaust_l": "cat_chs", "exhaust_m": "cat_chs", "r_mudflap": "cat_chs", "tank": "cat_chs", 
    "trlr_cables": "cat_chs", "f_inlay_chs": "cat_chs", "f_intake_chs": "cat_chs", "s_panel": "cat_chs", "r_chs_cover": "cat_chs", "f_intk_b_chs": "cat_chs", 
    "badge": "cat_logo", "f_logo": "cat_logo", "s_badge": "cat_logo", "c_badge": "cat_logo", "f_badge": "cat_logo", "r_light": "cat_light", "markers": "cat_light", 
    "beacon": "cat_light", "f_light_chs": "cat_light", "f_light_mid": "cat_light", "f_light_top": "cat_light", "steering_w": "cat_int", 
    "intlight_bgr": "cat_int", "intlight_bck": "cat_int", "chs_f_l": "cat_trailer", "chs_f_r": "cat_trailer", "chs_m_l": "cat_trailer", 
    "chs_m_r": "cat_trailer", "chs_r_l": "cat_trailer", "chs_r_r": "cat_trailer", "rear_body": "cat_trailer", "f_body": "cat_trailer", "r_banner": "cat_trailer", "body": "cat_trailer"
};

if (!document.getElementById('modalStyle')) {
    const style = document.createElement('style');
    style.id = 'modalStyle';
    style.innerHTML = `
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 1000; visibility: hidden; opacity: 0; transition: opacity 0.2s; }
        .modal-overlay.active { visibility: visible; opacity: 1; }
        .modal-box { background: #252525; border: 2px solid #4CAF50; border-radius: 10px; padding: 25px; width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .modal-title { margin-top: 0; color: #4CAF50; font-size: 1.1rem; margin-bottom: 20px; text-align: center;}
        .color-compare { display: flex; height: 60px; border-radius: 6px; overflow: hidden; margin-bottom: 20px; border: 1px solid #555;}
        .color-compare div { flex: 1; display: flex; align-items: center; justify-content: center; text-shadow: 1px 1px 3px rgba(0,0,0,0.8); font-weight: bold; font-size: 1rem;}
        .visual-picker-container { margin-bottom: 20px; text-align: center; background: #1e1e1e; padding: 10px; border-radius: 6px; border: 1px solid #333;}
        .visual-picker-label { display: block; margin-bottom: 10px; color: #aaa; font-size: 0.8rem;}
        .master-color-picker { -webkit-appearance: none; border: none; width: 100%; height: 50px; border-radius: 6px; cursor: pointer; background: transparent; padding: 0;}
        .master-color-picker::-webkit-color-swatch { border: 2px solid #555; border-radius: 6px; }
        .slider-group { margin-bottom: 15px; }
        .slider-group label { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; color: #ccc;}
        .slider-group input[type="range"] { width: 100%; accent-color: #4CAF50; cursor: pointer; }
        .modal-code { background: #1a1a1a; padding: 12px; font-family: Consolas, monospace; color: #4CAF50; text-align: center; border-radius: 4px; margin-bottom: 20px; font-size: 0.85rem; border: 1px solid #333;}
        .modal-buttons { display: flex; justify-content: space-between; gap: 15px;}
        .modal-btn { flex: 1; padding: 10px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 0.9rem; }
        .btn-save { background: #4CAF50; color: #fff; }
        .btn-cancel { background: #555; color: #fff; }
    `;
    document.head.appendChild(style);
}

if (!document.getElementById('customColorModal')) {
    const modalHTML = `
        <div class="modal-box">
            <h3 id="modalTitle" class="modal-title">Farbe anpassen</h3>
            <div class="color-compare"><div id="modalOldColor" data-i18n="modal_old">Alt</div><div id="modalNewColor" data-i18n="modal_new">Neu</div></div>
            <div class="visual-picker-container"><span class="visual-picker-label" data-i18n="modal_palette">Palette</span><input type="color" id="masterColorPicker" class="master-color-picker"></div>
            <div class="slider-group"><label>R <span id="valR">0</span></label><input type="range" id="sliderR" min="0" max="255" value="0"></div>
            <div class="slider-group"><label>G <span id="valG">0</span></label><input type="range" id="sliderG" min="0" max="255" value="0"></div>
            <div class="slider-group"><label>B <span id="valB">0</span></label><input type="range" id="sliderB" min="0" max="255" value="0"></div>
            <div class="modal-code" id="modalScsCode">SCS: (0, 0, 0)</div>
            <div class="modal-buttons"><button id="btnCancel" class="modal-btn btn-cancel" data-i18n="modal_cancel">Abbrechen</button><button id="btnSave" class="modal-btn btn-save" data-i18n="modal_save">Speichern</button></div>
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

function scsToRgb(val) { return Math.max(0, Math.min(255, Math.pow(parseFloat(val), 1/2.2) * 255)); }
function rgbToScs(val) { return Math.pow(val / 255, 2.2).toFixed(6); }
function componentToHex(c) { var hex = Math.round(c).toString(16); return hex.length == 1 ? "0" + hex : hex; }
function hexToRgb(hex) { return { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) }; }

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    originalFileName = file.name;
    document.getElementById('fileNameDisplay').textContent = translations[currentLang].loaded + originalFileName;
    btnDownload.style.display = 'block';
    
    vehiclePlaceholder.style.display = 'none';
    vehicleSubNav.style.display = 'flex';
    document.querySelectorAll('.sub-content').forEach(el => el.classList.remove('active'));
    document.getElementById('lackiererei').classList.add('active');
    
    const reader = new FileReader();
    reader.onload = function(event) { 
        offeneKategorien.clear();
        analysiere(event.target.result); 
    };
    reader.readAsText(file);
});

function analysiere(text) {
    const signatureMatch = text.match(/\/\/ made by Carni - (.*?) - (.*?) Uhr/);
    if (signatureMatch) {
        lastSignatureMatch = signatureMatch;
        document.getElementById('timeStampDisplay').textContent = translations[currentLang].last_edited(signatureMatch[1], signatureMatch[2]);
        document.getElementById('timeStampDisplay').style.display = 'inline-block';
    } else {
        lastSignatureMatch = null;
        document.getElementById('timeStampDisplay').style.display = 'none';
    }

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
                blockIndex: index, colorType: colorMatch[1], rawMatch: colorMatch[0],
                katID: katID, catKey: kategorienMapping[katID] || "cat_misc",
                r: r, g: g, b: b, hex: "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
            });
        }
    });
    renderDashboard();

    window.originalEngine = null;
    window.originalTrans = null;
    document.getElementById('selEngine').value = "keep";
    document.getElementById('selTrans').value = "keep";
    updateTruckStats();

    const engineMatch = text.match(/data_path:\s*"(.*?\/engine\/.*?\.sii)"/);
    if(engineMatch) window.originalEngine = engineMatch[1]; 

    const transMatch = text.match(/data_path:\s*"(.*?\/transmission\/.*?\.sii)"/);
    if(transMatch) window.originalTrans = transMatch[1];
}

function toggleKategorie(catKey) {
    if (offeneKategorien.has(catKey)) { offeneKategorien.delete(catKey); } else { offeneKategorien.add(catKey); }
    renderDashboard();
}

function renderDashboard() {
    dashboard.innerHTML = "";
    const gruppen = {};
    geladeneTeile.forEach((t, index) => {
        if (!gruppen[t.catKey]) gruppen[t.catKey] = [];
        gruppen[t.catKey].push({...t, originalIndex: index});
    });

    for (const [catKey, teile] of Object.entries(gruppen)) {
        const istOffen = offeneKategorien.has(catKey);
        const uebersetzterTitel = translations[currentLang][catKey] || catKey;
        
        let html = `
        <div class="category-box ${istOffen ? '' : 'collapsed'}">
            <div class="category-header" onclick="toggleKategorie('${catKey}')">
                <div class="header-left"><span class="chevron">▼</span><h3>${uebersetzterTitel}</h3></div>
                <button class="btn-batch" onclick="event.stopPropagation(); oeffneBatchPicker('${catKey}')">
                    ${translations[currentLang].btn_batch}
                </button>
            </div>
            <div class="category-content">
        `;
        const counts = {};
        teile.forEach(t => { 
            const name = translations[currentLang].parts[t.katID] || t.katID;
            counts[name] = (counts[name] || 0) + 1; 
        });
        
        const currentIdx = {};
        teile.forEach(t => {
            let baseName = translations[currentLang].parts[t.katID] || t.katID;
            let finalName = baseName;
            if (counts[baseName] > 1) {
                currentIdx[baseName] = (currentIdx[baseName] || 0) + 1;
                finalName = `${baseName} (${currentIdx[baseName]})`;
            }
            html += `
                <div class="part-item">
                    <span>${finalName}</span>
                    <div class="color-preview" style="background-color: ${t.hex}" onclick="oeffnePicker(${t.originalIndex}, '${finalName}')"></div>
                </div>`;
        });
        html += `</div></div>`;
        dashboard.innerHTML += html;
    }
}

function oeffnePicker(index, anzeigeName) {
    batchModus = false; aktuellesTeilIndex = index; const teil = geladeneTeile[index];
    modalTitle.textContent = `${translations[currentLang].modal_title_color} ${anzeigeName}`; 
    modalOldColor.style.backgroundColor = teil.hex; modalNewColor.style.backgroundColor = teil.hex;
    masterColorPicker.value = teil.hex; sliderR.value = Math.round(teil.r); sliderG.value = Math.round(teil.g); sliderB.value = Math.round(teil.b);
    updateModalAnzeige(false); modal.classList.add('active');
}

function oeffneBatchPicker(catKey) {
    batchModus = true; batchKategorie = catKey; 
    const uebersetzterTitel = translations[currentLang][catKey] || catKey;
    const erstesTeil = geladeneTeile.find(t => t.catKey === catKey);
    modalTitle.textContent = `${translations[currentLang].modal_title_all} ${uebersetzterTitel}`; 
    modalOldColor.style.backgroundColor = erstesTeil.hex; modalNewColor.style.backgroundColor = erstesTeil.hex;
    masterColorPicker.value = erstesTeil.hex; sliderR.value = Math.round(erstesTeil.r); sliderG.value = Math.round(erstesTeil.g); sliderB.value = Math.round(erstesTeil.b);
    updateModalAnzeige(false); modal.classList.add('active');
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
    if (batchModus) {
        geladeneTeile.forEach(teil => {
            if (teil.catKey === batchKategorie) {
                teil.r = r; teil.g = g; teil.b = b; teil.hex = hex;
                const neuerScsString = `${teil.colorType}: (${rgbToScs(r)}, ${rgbToScs(g)}, ${rgbToScs(b)})`;
                originalBloecke[teil.blockIndex] = originalBloecke[teil.blockIndex].replace(teil.rawMatch, neuerScsString);
                teil.rawMatch = neuerScsString; 
            }
        });
    } else {
        const teil = geladeneTeile[aktuellesTeilIndex];
        teil.r = r; teil.g = g; teil.b = b; teil.hex = hex;
        const neuerScsString = `${teil.colorType}: (${rgbToScs(r)}, ${rgbToScs(g)}, ${rgbToScs(b)})`;
        originalBloecke[teil.blockIndex] = originalBloecke[teil.blockIndex].replace(teil.rawMatch, neuerScsString);
        teil.rawMatch = neuerScsString; 
    }
    modal.classList.remove('active');
    renderDashboard();
});

function getSignatureTimestamp() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    return `${dd}.${mm}.${now.getFullYear()} - ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}
function getFileNameTimestamp() {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
}

btnDownload.addEventListener('click', function() {
    let finalContent = originalBloecke.join('}');
    
    const selEngine = document.getElementById('selEngine').value;
    if(selEngine !== "keep" && window.originalEngine) {
        finalContent = finalContent.replace(window.originalEngine, selEngine);
    }

    const selTrans = document.getElementById('selTrans').value;
    if(selTrans !== "keep" && window.originalTrans) {
        finalContent = finalContent.replace(window.originalTrans, selTrans);
    }

    finalContent = finalContent.replace(/\/\/ made by Carni - .*? Uhr/g, '');
    finalContent += `\n\n// made by Carni - ${getSignatureTimestamp()} Uhr\n`;
    
    const blob = new Blob([finalContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const baseName = originalFileName.replace('.sii', '').replace('.txt', '');
    const a = document.createElement('a');
    a.href = url; a.download = `${baseName}_${getFileNameTimestamp()}.sii`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
});


// ---------------------------------------------------------
// 5. GAME.SII EDITOR LOGIK 
// ---------------------------------------------------------
const gameFileInput = document.getElementById('gameFileInput');
const gameDashboard = document.getElementById('gameDashboard');
const gamePlaceholder = document.getElementById('gamePlaceholder');
const btnGameDownload = document.getElementById('btnGameDownload');

const inpMoney = document.getElementById('inpMoney');
const inpLevel = document.getElementById('inpLevel');
const inpXp = document.getElementById('inpXp');

let gameFileContent = "";
let gameFileName = "";
let originalMoney = 0;
let originalXp = 0;

function getLevelFromXp(xp) { return Math.floor(-1.5 + Math.sqrt(2.25 + xp / 50)); }
function getXpFromLevel(level) { return 50 * level * level + 150 * level; }

inpXp.addEventListener('input', function() {
    const xp = parseInt(this.value) || 0;
    inpLevel.value = getLevelFromXp(xp);
});

inpLevel.addEventListener('input', function() {
    const lvl = parseInt(this.value) || 0;
    inpXp.value = getXpFromLevel(lvl);
});

window.resetMoney = function() { inpMoney.value = originalMoney; };
window.resetXp = function() {
    inpXp.value = originalXp;
    inpLevel.value = getLevelFromXp(originalXp);
};

gameFileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    gameFileName = file.name;
    document.getElementById('gameFileNameDisplay').textContent = translations[currentLang].loaded + gameFileName;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        gameFileContent = event.target.result;
        
        const moneyMatch = gameFileContent.match(/money_account:\s*(\d+)/);
        const xpMatch = gameFileContent.match(/experience_points:\s*(\d+)/);
        
        const adrMatch = gameFileContent.match(/adr:\s*(\d+)/);
        const longMatch = gameFileContent.match(/long_dist:\s*(\d+)/);
        const heavyMatch = gameFileContent.match(/heavy:\s*(\d+)/);
        const fragileMatch = gameFileContent.match(/fragile:\s*(\d+)/);
        const urgentMatch = gameFileContent.match(/urgent:\s*(\d+)/);
        const ecoMatch = gameFileContent.match(/mechanical:\s*(\d+)/);
        
        if (moneyMatch && xpMatch) {
            originalMoney = parseInt(moneyMatch[1]);
            originalXp = parseInt(xpMatch[1]);

            document.getElementById('origMoneyBadge').textContent = `Orig: ${originalMoney}`;
            document.getElementById('origXpBadge').textContent = `Orig: ${originalXp}`;
            
            inpMoney.value = originalMoney;
            inpXp.value = originalXp;
            inpLevel.value = getLevelFromXp(originalXp);
            
            document.getElementById('chkRepair').checked = false;

            const adrBits = adrMatch ? parseInt(adrMatch[1]) : 0;
            const adrLevel = adrBits.toString(2).replace(/0/g, "").length;
            document.getElementById('inpSkillAdr').value = adrLevel;

            document.getElementById('inpSkillLong').value = longMatch ? longMatch[1] : 0;
            document.getElementById('inpSkillHeavy').value = heavyMatch ? heavyMatch[1] : 0;
            document.getElementById('inpSkillFragile').value = fragileMatch ? fragileMatch[1] : 0;
            document.getElementById('inpSkillUrgent').value = urgentMatch ? urgentMatch[1] : 0;
            document.getElementById('inpSkillEco').value = ecoMatch ? ecoMatch[1] : 0;
            
            gamePlaceholder.style.display = 'none';
            gameDashboard.style.display = 'grid';
            btnGameDownload.style.display = 'block';
        } else {
            alert(currentLang === 'de' ? 
                "Fehler: Konnte Profil-Daten nicht finden. Ist die Datei wirklich eine entschlüsselte game.sii?" : 
                "Error: Could not find profile data. Is this a decrypted game.sii file?");
        }
    };
    reader.readAsText(file);
});

window.maxAllSkills = function() {
    document.getElementById('inpSkillAdr').value = 6;
    document.getElementById('inpSkillLong').value = 6;
    document.getElementById('inpSkillHeavy').value = 6;
    document.getElementById('inpSkillFragile').value = 6;
    document.getElementById('inpSkillUrgent').value = 6;
    document.getElementById('inpSkillEco').value = 6;
};

btnGameDownload.addEventListener('click', function() {
    const newMoney = inpMoney.value;
    const newXp = inpXp.value;
    
    const adrLevel = parseInt(document.getElementById('inpSkillAdr').value);
    const adrBitmaskMap = [0, 1, 3, 7, 15, 31, 63];
    const newAdr = adrBitmaskMap[Math.min(6, Math.max(0, adrLevel))]; 
    
    const sLong = document.getElementById('inpSkillLong').value;
    const sHeavy = document.getElementById('inpSkillHeavy').value;
    const sFragile = document.getElementById('inpSkillFragile').value;
    const sUrgent = document.getElementById('inpSkillUrgent').value;
    const sEco = document.getElementById('inpSkillEco').value;

    const doRepair = document.getElementById('chkRepair').checked;
    
    let newContent = gameFileContent.replace(/money_account:\s*\d+/, `money_account: ${newMoney}`);
    newContent = newContent.replace(/experience_points:\s*\d+/, `experience_points: ${newXp}`);
    
    newContent = newContent.replace(/adr:\s*\d+/, `adr: ${newAdr}`);
    newContent = newContent.replace(/long_dist:\s*\d+/, `long_dist: ${sLong}`);
    newContent = newContent.replace(/heavy:\s*\d+/, `heavy: ${sHeavy}`);
    newContent = newContent.replace(/fragile:\s*\d+/, `fragile: ${sFragile}`);
    newContent = newContent.replace(/urgent:\s*\d+/, `urgent: ${sUrgent}`);
    newContent = newContent.replace(/mechanical:\s*\d+/, `mechanical: ${sEco}`);

    if (doRepair) {
        newContent = newContent.replace(/wear:\s*[^\r\n]+/g, `wear: 0`);
    }
    
    const blob = new Blob([newContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const baseName = gameFileName.replace('.sii', '').replace('.txt', '');
    const a = document.createElement('a');
    a.href = url; a.download = `${baseName}_edited_${getFileNameTimestamp()}.sii`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
});

// START
initLanguage();