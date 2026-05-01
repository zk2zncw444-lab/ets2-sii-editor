/* ============================================================
   ETS2 Vehicle Editor — script.js  v1.2
   ============================================================ */

const translations = {
    de: {
        app_title: "ETS2 Vehicle Editor",
        app_tagline: "Savegame & Truck Modification Suite",
        upload_hint: "Vehicle.sii Datei",
        btn_choose: "Datei auswählen",
        no_file: "Keine Datei ausgewählt",
        btn_download: "Download",
        loaded: "Geladen: ",
        last_edited: (d, t) => `Zuletzt bearbeitet: ${d} um ${t} Uhr`,
        placeholder: "Bitte lade eine Vehicle.sii Datei hoch, um zu starten.",
        placeholder_hint: "Die Datei muss entschlüsselt sein (Klartext-Format).",
        veh_paint: "Lackiererei",
        veh_workshop: "Werkstatt",
        ws_drivetrain: "Antriebsstrang",
        ws_engine: "Motor",
        ws_transmission: "Getriebe",
        ws_chassis_box: "Fahrgestell",
        ws_chassis: "Achsen",
        chassis_warn: "Hinweis: Nach einem Chassis-Wechsel können Anbauteile verschoben sein. Optimiere diese ingame in der Werkstatt.",
        stat_analysis: "Analyse",
        stat_power: "PS",
        stat_torque: "Nm",
        stat_gears: "Gänge",
        stat_normal: "Normal",
        stat_heavy: "Schwerlast",
        stat_maneuver: "Wendigkeit",
        stat_hill: "Steigung",
        stat_terrain: "Gelände",
        keep_orig: "— Original beibehalten —",
        keep_orig_with: (n) => `— Original: ${n} —`,
        modal_old: "Alt",
        modal_new: "Neu",
        modal_cancel: "Abbruch",
        modal_save: "Speichern",
        btn_batch: "Alle färben",
        batch_title: (n) => `Alle: ${n}`,
        selection_title: (n) => `${n} Teile färben`,
        selection_count: (n) => n === 0 ? "Keine Auswahl" : (n === 1 ? "1 Teil ausgewählt" : `${n} Teile ausgewählt`),
        btn_select_all: "Alle auswählen",
        btn_clear_selection: "Zurücksetzen",
        btn_paint_selection: "Auswahl färben",
        cat_paint: "Lackierung & Design",
        cat_wheels: "Räder & Reifen",
        cat_cab_ext: "Kabine Außen",
        cat_chs: "Chassis & Anbau",
        cat_logo: "Logos & Embleme",
        cat_light: "Beleuchtung",
        cat_int: "Innenraum",
        cat_trailer: "Auflieger",
        cat_misc: "Sonstiges",
        err_encrypted: "Diese Datei scheint verschlüsselt zu sein. Bitte entschlüssele sie zuerst mit SII_Decrypt.",
        err_no_parts: "In dieser Datei wurden keine lackierbaren Teile gefunden. Möglicherweise ist es keine Vehicle.sii Datei.",
        footer_text: "ETS2 Vehicle Editor — by Carni",
        parts: {
            "paint_job": "Hauptlackierung",
            "f_disc": "Felge Vorn", "r_disc": "Felge Hinten",
            "f_nuts": "Muttern Vorn", "r_nuts": "Muttern Hinten",
            "f_hub": "Nabe Vorn", "r_hub": "Nabe Hinten",
            "f_tire": "Reifen Vorn", "r_tire": "Reifen Hinten",
            "f_cover": "Felgenabdeckung Vorn", "r_cover": "Felgenabdeckung Hinten",
            "r_grill": "Roofbar", "f_grill": "Frontgrill", "b_grill": "Lowbar",
            "mirror": "Spiegel", "f_mirror": "Frontspiegel", "s_mirror": "Seitenspiegel",
            "sunshld": "Sonnenblende", "sunshield": "Sonnenblende",
            "doorhndl": "Türgriffe", "doorstep": "Trittstufen",
            "f_inlay_cab": "Front-Inlay (Kabine)", "f_intake_cab": "Lufteinlass (Kabine)",
            "f_wnd_frame": "Fensterrahmen", "hl_guard": "Scheinwerfergitter",
            "f_equip": "Frontausstattung", "r_horn": "Lufthorn Rechts", "l_horn": "Lufthorn Links",
            "f_intk_b_cab": "Lufteinlass Unten (Kabine)",
            "f_intake_bar": "Lufteinlass-Strebe",
            "f_bumper": "Frontstoßstange", "r_bumper": "Heckstoßstange",
            "sideskirt": "Seitenschweller",
            "f_fender": "Kotflügel Vorn", "r_fender": "Kotflügel Hinten",
            "f_fender_cab": "Kotflügel Vorn (Kabine)", "f_fender_chs": "Kotflügel Vorn (Chassis)",
            "r_fendr_top": "Kotflügelabdeckung",
            "exhaust": "Auspuff (Seite)", "exhaust_l": "Auspuff Links", "exhaust_m": "Auspuff Mitte",
            "r_mudflap": "Schmutzfänger Hinten", "f_mudflap": "Schmutzfänger Vorn",
            "tank": "Tank", "trlr_cables": "Anhängerkabel",
            "f_inlay_chs": "Front-Inlay (Chassis)", "f_intake_chs": "Lufteinlass (Chassis)",
            "s_panel": "Seitenverkleidung", "r_chs_cover": "Chassisabdeckung",
            "f_intk_b_chs": "Lufteinlass Unten (Chassis)",
            "s_deflector": "Seitendeflektor", "r_deflector": "Heckdeflektor",
            "hook": "Abschlepphaken",
            "badge": "Emblem", "f_logo": "Front-Logo",
            "c_badge": "Kabinen-Emblem", "s_badge": "Seiten-Emblem", "f_badge": "Front-Emblem",
            "decals": "Aufkleber",
            "r_light": "Rücklichter", "markers": "Markierungsleuchten", "beacon": "Rundumleuchten",
            "f_light_chs": "Zusatzscheinwerfer (Chs)",
            "f_light_mid": "Zusatzscheinwerfer (Mitte)",
            "f_light_top": "Zusatzscheinwerfer (Dach)",
            "f_turn_light": "Blinker Vorn",
            "steering_w": "Lenkrad", "intlight_bgr": "Innenlicht (Hintergrund)", "intlight_bck": "Innenlicht",
            "codrv_seat": "Beifahrersitz", "codrv_plate": "Beifahrer-Schild",
            "filter": "Filter", "carpet": "Teppich"
        }
    },
    en: {
        app_title: "ETS2 Vehicle Editor",
        app_tagline: "Savegame & Truck Modification Suite",
        upload_hint: "Vehicle.sii file",
        btn_choose: "Choose file",
        no_file: "No file selected",
        btn_download: "Download",
        loaded: "Loaded: ",
        last_edited: (d, t) => `Last edited: ${d} at ${t}`,
        placeholder: "Please upload a Vehicle.sii file to get started.",
        placeholder_hint: "The file must be decrypted (plain text format).",
        veh_paint: "Paint Shop",
        veh_workshop: "Workshop",
        ws_drivetrain: "Drivetrain",
        ws_engine: "Engine",
        ws_transmission: "Gearbox",
        ws_chassis_box: "Chassis",
        ws_chassis: "Axles",
        chassis_warn: "Note: After changing the chassis, addons may be misaligned. Adjust them in-game at the workshop.",
        stat_analysis: "Analysis",
        stat_power: "HP",
        stat_torque: "Nm",
        stat_gears: "Gears",
        stat_normal: "Normal",
        stat_heavy: "Heavy",
        stat_maneuver: "Maneuver",
        stat_hill: "Hill",
        stat_terrain: "Terrain",
        keep_orig: "— Keep original —",
        keep_orig_with: (n) => `— Original: ${n} —`,
        modal_old: "Old",
        modal_new: "New",
        modal_cancel: "Cancel",
        modal_save: "Save",
        btn_batch: "Color all",
        batch_title: (n) => `All: ${n}`,
        selection_title: (n) => `Color ${n} parts`,
        selection_count: (n) => n === 0 ? "No selection" : (n === 1 ? "1 part selected" : `${n} parts selected`),
        btn_select_all: "Select all",
        btn_clear_selection: "Clear",
        btn_paint_selection: "Color selection",
        cat_paint: "Paintjob & Design",
        cat_wheels: "Wheels & Tires",
        cat_cab_ext: "Cabin Exterior",
        cat_chs: "Chassis & Addons",
        cat_logo: "Logos & Badges",
        cat_light: "Lighting",
        cat_int: "Interior",
        cat_trailer: "Trailer",
        cat_misc: "Miscellaneous",
        err_encrypted: "This file appears to be encrypted. Please decrypt it first with SII_Decrypt.",
        err_no_parts: "No paintable parts found in this file. It may not be a Vehicle.sii file.",
        footer_text: "ETS2 Vehicle Editor — by Carni",
        parts: {
            "paint_job": "Main Paintjob",
            "f_disc": "Front Disc", "r_disc": "Rear Disc",
            "f_nuts": "Front Nuts", "r_nuts": "Rear Nuts",
            "f_hub": "Front Hub", "r_hub": "Rear Hub",
            "f_tire": "Front Tire", "r_tire": "Rear Tire",
            "f_cover": "Front Hub Cover", "r_cover": "Rear Hub Cover",
            "r_grill": "Roofbar", "f_grill": "Front Grill", "b_grill": "Lowbar",
            "mirror": "Mirror", "f_mirror": "Front Mirror", "s_mirror": "Side Mirror",
            "sunshld": "Sun Shield", "sunshield": "Sun Shield",
            "doorhndl": "Door Handles", "doorstep": "Door Step",
            "f_inlay_cab": "Front Inlay (Cab)", "f_intake_cab": "Air Intake (Cab)",
            "f_wnd_frame": "Window Frame", "hl_guard": "Headlight Guard",
            "f_equip": "Front Equipment", "r_horn": "Right Air Horn", "l_horn": "Left Air Horn",
            "f_intk_b_cab": "Lower Intake (Cab)",
            "f_intake_bar": "Intake Bar",
            "f_bumper": "Front Bumper", "r_bumper": "Rear Bumper",
            "sideskirt": "Sideskirt",
            "f_fender": "Front Fender", "r_fender": "Rear Fender",
            "f_fender_cab": "Front Fender (Cab)", "f_fender_chs": "Front Fender (Chs)",
            "r_fendr_top": "Fender Top",
            "exhaust": "Exhaust (Side)", "exhaust_l": "Left Exhaust", "exhaust_m": "Center Exhaust",
            "r_mudflap": "Rear Mudflap", "f_mudflap": "Front Mudflap",
            "tank": "Fuel Tank", "trlr_cables": "Trailer Cables",
            "f_inlay_chs": "Front Inlay (Chs)", "f_intake_chs": "Air Intake (Chs)",
            "s_panel": "Side Panel", "r_chs_cover": "Chassis Cover",
            "f_intk_b_chs": "Lower Intake (Chs)",
            "s_deflector": "Side Deflector", "r_deflector": "Rear Deflector",
            "hook": "Tow Hook",
            "badge": "Badge", "f_logo": "Front Logo",
            "c_badge": "Cabin Badge", "s_badge": "Side Badge", "f_badge": "Front Badge",
            "decals": "Decals",
            "r_light": "Tail Lights", "markers": "Marker Lights", "beacon": "Beacons",
            "f_light_chs": "Aux Light (Chs)",
            "f_light_mid": "Aux Light (Mid)",
            "f_light_top": "Aux Light (Top)",
            "f_turn_light": "Front Turn Signal",
            "steering_w": "Steering Wheel", "intlight_bgr": "Interior Light (BG)", "intlight_bck": "Interior Light",
            "codrv_seat": "Co-driver Seat", "codrv_plate": "Co-driver Plate",
            "filter": "Filter", "carpet": "Carpet"
        }
    }
};

/* =========================================
   Globaler State
   ========================================= */
let currentLang = navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
let geladeneTeile = [];
let originalBloecke = [];
let originalFileName = "";
let offeneKategorien = new Set();
let selectedTeile = new Set();
let pickerModus = "single"; // "single" | "category" | "selection"
let batchKategorie = "";
let aktuellesTeilIndex = null;
let aktiverSubTab = "werkstatt";
window.originalEngine = null;
window.originalTrans = null;
window.originalChassis = null;
window.truckModel = null;

/* =========================================
   Mappings
   ========================================= */
const kategorienMapping = {
    // Paintjob
    "paint_job": "cat_paint",
    "decals": "cat_paint",

    // Wheels
    "f_disc": "cat_wheels", "r_disc": "cat_wheels",
    "f_nuts": "cat_wheels", "r_nuts": "cat_wheels",
    "f_hub":  "cat_wheels", "r_hub":  "cat_wheels",
    "f_tire": "cat_wheels", "r_tire": "cat_wheels",
    "f_cover":"cat_wheels", "r_cover":"cat_wheels",

    // Cabin exterior
    "r_grill": "cat_cab_ext", "f_grill": "cat_cab_ext", "b_grill": "cat_cab_ext",
    "mirror": "cat_cab_ext", "f_mirror": "cat_cab_ext", "s_mirror": "cat_cab_ext",
    "sunshld": "cat_cab_ext", "sunshield": "cat_cab_ext",
    "doorhndl": "cat_cab_ext", "doorstep": "cat_cab_ext",
    "f_inlay_cab": "cat_cab_ext", "f_intake_cab": "cat_cab_ext",
    "f_wnd_frame": "cat_cab_ext", "hl_guard": "cat_cab_ext",
    "f_equip": "cat_cab_ext",
    "r_horn": "cat_cab_ext", "l_horn": "cat_cab_ext",
    "f_intk_b_cab": "cat_cab_ext", "f_intake_bar": "cat_cab_ext",
    "f_fender_cab": "cat_cab_ext",

    // Chassis
    "f_bumper": "cat_chs", "r_bumper": "cat_chs", "sideskirt": "cat_chs",
    "f_fender": "cat_chs", "r_fender": "cat_chs", "r_fendr_top": "cat_chs",
    "f_fender_chs": "cat_chs",
    "f_mudflap": "cat_chs", "r_mudflap": "cat_chs",
    "exhaust": "cat_chs", "exhaust_l": "cat_chs", "exhaust_m": "cat_chs",
    "tank": "cat_chs", "trlr_cables": "cat_chs",
    "f_inlay_chs": "cat_chs", "f_intake_chs": "cat_chs",
    "s_panel": "cat_chs", "r_chs_cover": "cat_chs",
    "f_intk_b_chs": "cat_chs",
    "s_deflector": "cat_chs", "r_deflector": "cat_chs",
    "hook": "cat_chs",

    // Logos & badges
    "badge": "cat_logo", "f_logo": "cat_logo",
    "s_badge": "cat_logo", "c_badge": "cat_logo", "f_badge": "cat_logo",

    // Lighting
    "r_light": "cat_light", "markers": "cat_light", "beacon": "cat_light",
    "f_light_chs": "cat_light", "f_light_mid": "cat_light", "f_light_top": "cat_light",
    "f_turn_light": "cat_light",

    // Interior
    "steering_w": "cat_int", "intlight_bgr": "cat_int", "intlight_bck": "cat_int",
    "codrv_seat": "cat_int", "codrv_plate": "cat_int",
    "filter": "cat_int", "carpet": "cat_int"
};

const truckDB = {
    engines: {
        "keep": { hp: "—", nm: "—", h: 0, hi: 0, n: 0, t: 0 },
        // Volvo FH 2024 (D17A, neue Modellgeneration) — verifiziert aus volvo.sii
        "/def/vehicle/truck/volvo.fh_2024/engine/d17a780.sii": { hp: 780, nm: 3800, h: 98, hi: 100, n: 95, t: 55 },
        // Volvo FH16 2012
        "/def/vehicle/truck/volvo.fh16_2012/engine/d16g750.sii": { hp: 750, nm: 3550, h: 90, hi: 92, n: 85, t: 50 },
        // Scania S 2016
        "/def/vehicle/truck/scania.s_2016/engine/dc16_770.sii": { hp: 770, nm: 3700, h: 95, hi: 98, n: 90, t: 50 },
        // Mercedes Actros 2014
        "/def/vehicle/truck/mercedes.actros2014/engine/engine_1863.sii": { hp: 625, nm: 3000, h: 70, hi: 75, n: 80, t: 45 }
    },
    transmissions: {
        "keep": { g: "—", hb: 0, hib: 0, m: 0 },
        "/def/vehicle/truck/scania.s_2016/transmission/grso925r.sii":     { g: 14, hb: 5,   hib: 5,   m: 45 },
        // MAN TGX 2020 Allison + Retarder — verifiziert aus volvo.sii
        "/def/vehicle/truck/man.tgx_2020/transmission/allison_retarder.sii": { g: 6,  hb: -15, hib: -5, m: 90 },
        "/def/vehicle/truck/peterbilt.579/transmission/allison.sii":      { g: 6,  hb: -20, hib: -10, m: 95 },
        "/def/vehicle/truck/volvo.fh16_2012/transmission/12_speed_ret.sii": { g: 12, hb: 0,   hib: 0,   m: 55 }
    },
    chassis: {
        "scania.s_2016": [
            { id: "/def/vehicle/truck/scania.s_2016/chassis/4x2.sii",         name: "4x2 Standard" },
            { id: "/def/vehicle/truck/scania.s_2016/chassis/6x2_midlift.sii", name: "6x2 Midlift" },
            { id: "/def/vehicle/truck/scania.s_2016/chassis/6x2_taglift.sii", name: "6x2 Taglift" },
            { id: "/def/vehicle/truck/scania.s_2016/chassis/6x4.sii",         name: "6x4 Schwerlast" },
            { id: "/def/vehicle/truck/scania.s_2016/chassis/8x4.sii",         name: "8x4 Schwerlast" }
        ],
        // Volvo FH16 (klassisches Modell, FH 2012-Reihe) — gelernt aus volvo.sii
        "volvo.fh16": [
            { id: "/def/vehicle/truck/volvo.fh16/chassis/4x2.sii",            name: "4x2 Standard" },
            { id: "/def/vehicle/truck/volvo.fh16/chassis/6x2_midlift.sii",    name: "6x2 Midlift" },
            { id: "/def/vehicle/truck/volvo.fh16/chassis/6x2_taglift.sii",    name: "6x2 Taglift" },
            { id: "/def/vehicle/truck/volvo.fh16/chassis/6x2_4_midlift.sii",  name: "6x2/4 Midlift" },
            { id: "/def/vehicle/truck/volvo.fh16/chassis/6x2_4_taglift.sii",  name: "6x2/4 Taglift" },
            { id: "/def/vehicle/truck/volvo.fh16/chassis/6x4.sii",            name: "6x4 Schwerlast" },
            { id: "/def/vehicle/truck/volvo.fh16/chassis/8x4.sii",            name: "8x4 Schwerlast" }
        ],
        // Volvo FH 2024 (neue Modellgeneration)
        "volvo.fh_2024": [
            { id: "/def/vehicle/truck/volvo.fh_2024/chassis/4x2.sii",         name: "4x2 Standard" },
            { id: "/def/vehicle/truck/volvo.fh_2024/chassis/6x2_midlift.sii", name: "6x2 Midlift" },
            { id: "/def/vehicle/truck/volvo.fh_2024/chassis/6x2_taglift.sii", name: "6x2 Taglift" },
            { id: "/def/vehicle/truck/volvo.fh_2024/chassis/6x4.sii",         name: "6x4 Schwerlast" },
            { id: "/def/vehicle/truck/volvo.fh_2024/chassis/8x4.sii",         name: "8x4 Schwerlast" }
        ]
    }
};

/* =========================================
   UI & Navigation
   ========================================= */
function switchSubTab(id, btn) {
    aktiverSubTab = id;
    document.querySelectorAll('.sub-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (btn) btn.classList.add('active');
}

function setLanguage(l) {
    currentLang = l;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        const v = translations[l][k];
        if (typeof v === 'string') el.textContent = v;
    });

    document.getElementById('btn-lang-de').classList.toggle('active', l === 'de');
    document.getElementById('btn-lang-en').classList.toggle('active', l === 'en');

    refreshKeepOptionLabels();
    updateSelectionBar();

    if (geladeneTeile.length > 0) renderDashboard();
}

function refreshKeepOptionLabels() {
    const t = translations[currentLang];
    const setKeep = (selectId, originalPath, type) => {
        const opt = document.querySelector(`#${selectId} option[value="keep"]`);
        if (!opt) return;
        if (originalPath) {
            opt.textContent = t.keep_orig_with(getFriendlyName(originalPath, type));
        } else {
            opt.textContent = t.keep_orig;
        }
    };
    setKeep('selEngine', window.originalEngine, 'engine');
    setKeep('selTrans', window.originalTrans, 'trans');
    setKeep('selChassis', window.originalChassis, 'chassis');
}

function toggleKategorie(catKey) {
    if (offeneKategorien.has(catKey)) offeneKategorien.delete(catKey);
    else offeneKategorien.add(catKey);
    renderDashboard();
}

/* =========================================
   Friendly names
   ========================================= */
function getFriendlyName(path, type) {
    if (!path) return "Unknown";
    const selId = type === 'engine' ? 'selEngine' : type === 'trans' ? 'selTrans' : 'selChassis';
    const sel = document.getElementById(selId);
    if (sel) {
        for (let i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === path && sel.options[i].value !== "keep") {
                return sel.options[i].textContent;
            }
        }
    }
    if (type === 'chassis' && window.truckModel && truckDB.chassis[window.truckModel]) {
        const found = truckDB.chassis[window.truckModel].find(c => c.id === path);
        if (found) return found.name;
    }
    const match = path.match(/\/([^\/]+)\.sii$/);
    return match ? match[1] : path;
}

/* =========================================
   Truck stats
   ========================================= */
window.updateTruckStats = function () {
    let selE = document.getElementById('selEngine').value;
    if (selE === "keep" && window.originalEngine) selE = window.originalEngine;

    let selT = document.getElementById('selTrans').value;
    if (selT === "keep" && window.originalTrans) selT = window.originalTrans;

    const e = truckDB.engines[selE] || truckDB.engines.keep;
    const t = truckDB.transmissions[selT] || truckDB.transmissions.keep;

    document.getElementById('valPower').textContent = e.hp;
    document.getElementById('valTorque').textContent = e.nm;
    document.getElementById('valGears').textContent = t.g;

    if (e.hp === "—") {
        ['Normal', 'Heavy', 'Man', 'Hill', 'Terrain'].forEach(b => {
            document.getElementById('bar' + b).style.width = "0%";
        });
    } else {
        document.getElementById('barNormal').style.width  = e.n + "%";
        document.getElementById('barHeavy').style.width   = clamp(e.h + t.hb, 0, 100) + "%";
        document.getElementById('barMan').style.width     = clamp(t.m, 0, 100) + "%";
        document.getElementById('barHill').style.width    = clamp(e.hi + t.hib, 0, 100) + "%";
        document.getElementById('barTerrain').style.width = e.t + "%";
    }
};

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

/* =========================================
   Color conversions
   ========================================= */
function scsToRgb(val) {
    return Math.max(0, Math.min(255, Math.pow(parseFloat(val), 1 / 2.2) * 255));
}
function rgbToScs(val) {
    return Math.pow(val / 255, 2.2).toFixed(6);
}
function compToHex(c) {
    const h = Math.round(c).toString(16);
    return h.length === 1 ? "0" + h : h;
}
function hexToRgb(h) {
    return {
        r: parseInt(h.slice(1, 3), 16),
        g: parseInt(h.slice(3, 5), 16),
        b: parseInt(h.slice(5, 7), 16)
    };
}

/* =========================================
   File handling
   ========================================= */
document.getElementById('fileInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    originalFileName = file.name;

    document.getElementById('uploadSection').classList.add('has-file');
    document.getElementById('fileNameDisplay').textContent = translations[currentLang].loaded + originalFileName;
    document.getElementById('btnDownload').hidden = false;
    hideError();

    const reader = new FileReader();
    reader.onload = function (event) { analysiere(event.target.result); };
    reader.onerror = function () { showError(translations[currentLang].err_encrypted); };
    reader.readAsText(file);
});

function showError(msg) {
    if (!msg) return;
    const banner = document.getElementById('errorBanner');
    document.getElementById('errorBannerText').textContent = msg;
    banner.hidden = false;
}
function hideError() {
    document.getElementById('errorBanner').hidden = true;
    document.getElementById('errorBannerText').textContent = "";
}

/* =========================================
   Parser
   ========================================= */
function analysiere(text) {
    if (text.startsWith('ScsC') || /[\x00-\x08\x0E-\x1F]/.test(text.substring(0, 200))) {
        showError(translations[currentLang].err_encrypted);
        document.getElementById('vehiclePlaceholder').hidden = false;
        document.getElementById('vehicleSubNav').hidden = true;
        document.querySelectorAll('.sub-content').forEach(el => el.classList.remove('active'));
        return;
    }

    originalBloecke = text.split('}');
    geladeneTeile = [];
    offeneKategorien.clear();
    selectedTeile.clear();

    originalBloecke.forEach((block, index) => {
        const cMatch = block.match(/(paint_color|base_color):\s*\((.*?),(.*?),(.*?)\)/);
        const pMatch = block.match(/data_path:\s*"(.*?)"/);
        if (cMatch && pMatch) {
            const pfad = pMatch[1];
            const pTeile = pfad.split('/');
            const katID = pfad.includes("paint_job") ? "paint_job" : pTeile[pTeile.length - 2];
            const r = scsToRgb(cMatch[2]);
            const g = scsToRgb(cMatch[3]);
            const b = scsToRgb(cMatch[4]);
            geladeneTeile.push({
                blockIndex: index,
                colorType: cMatch[1],
                rawMatch: cMatch[0],
                katID: katID,
                catKey: kategorienMapping[katID] || "cat_misc",
                r: r, g: g, b: b,
                hex: "#" + compToHex(r) + compToHex(g) + compToHex(b)
            });
        }
    });

    if (geladeneTeile.length === 0) {
        showError(translations[currentLang].err_no_parts);
        document.getElementById('vehiclePlaceholder').hidden = false;
        document.getElementById('vehicleSubNav').hidden = true;
        document.querySelectorAll('.sub-content').forEach(el => el.classList.remove('active'));
        return;
    }

    document.getElementById('vehiclePlaceholder').hidden = true;
    document.getElementById('vehicleSubNav').hidden = false;

    const subBtns = document.querySelectorAll('.sub-btn');
    let targetBtn = null;
    subBtns.forEach(btn => {
        const onclick = btn.getAttribute('onclick') || "";
        if (onclick.includes(`'${aktiverSubTab}'`)) targetBtn = btn;
    });
    if (!targetBtn) targetBtn = subBtns[0];
    switchSubTab(aktiverSubTab, targetBtn);

    renderDashboard();
    updateSelectionBar();

    // Reset hardware state
    window.originalEngine = null;
    window.originalTrans = null;
    window.originalChassis = null;
    window.truckModel = null;
    document.getElementById('selEngine').value = "keep";
    document.getElementById('selTrans').value = "keep";
    const chSel = document.getElementById('selChassis');
    chSel.innerHTML = `<option value="keep">${translations[currentLang].keep_orig}</option>`;
    chSel.disabled = true;
    document.getElementById('chassisWarn').hidden = true;

    const eMatch = text.match(/data_path:\s*"(.*?\/engine\/.*?\.sii)"/);
    if (eMatch) window.originalEngine = eMatch[1];

    const tMatch = text.match(/data_path:\s*"(.*?\/transmission\/.*?\.sii)"/);
    if (tMatch) window.originalTrans = tMatch[1];

    const cMatch = text.match(/data_path:\s*"(.*?\/chassis\/.*?\.sii)"/);
    if (cMatch) {
        window.originalChassis = cMatch[1];
        const mMatch = window.originalChassis.match(/\/vehicle\/truck\/(.*?)\/chassis/);
        if (mMatch) {
            window.truckModel = mMatch[1];
            if (truckDB.chassis[window.truckModel]) {
                chSel.disabled = false;
                truckDB.chassis[window.truckModel].forEach(ch => {
                    const opt = document.createElement('option');
                    opt.value = ch.id;
                    opt.textContent = ch.name;
                    chSel.appendChild(opt);
                });
            }
        }
    }

    // Detect existing signature timestamp (DE & EN)
    const sigMatch = text.match(/\/\/\s*made by Carni\s*-\s*(\d+)\.(\d+)\.(\d+)\s*-\s*(\d+):(\d+)/);
    const tsDisplay = document.getElementById('timeStampDisplay');
    if (sigMatch) {
        const dateStr = `${sigMatch[1]}.${sigMatch[2]}.${sigMatch[3]}`;
        const timeStr = `${sigMatch[4]}:${sigMatch[5].padStart(2, '0')}`;
        tsDisplay.textContent = translations[currentLang].last_edited(dateStr, timeStr);
        tsDisplay.hidden = false;
    } else {
        tsDisplay.hidden = true;
    }

    refreshKeepOptionLabels();
    updateTruckStats();
}

/* =========================================
   Selection management
   ========================================= */
function updateSelectionBar() {
    const bar = document.getElementById('selectionBar');
    const text = document.getElementById('selectionCountText');
    const btnPaint = document.getElementById('btnPaintSelection');
    const count = selectedTeile.size;
    text.textContent = translations[currentLang].selection_count(count);
    btnPaint.disabled = count === 0;
    bar.classList.toggle('has-selection', count > 0);
}

function toggleTeilAuswahl(index, checked) {
    if (checked) selectedTeile.add(index);
    else selectedTeile.delete(index);
    const item = document.querySelector(`.part-item[data-idx="${index}"]`);
    if (item) item.classList.toggle('selected', checked);
    updateSelectionBar();
    updateCategoryCounts();
}

function updateCategoryCounts() {
    document.querySelectorAll('.cat-count').forEach(el => {
        const catKey = el.getAttribute('data-cat');
        const total = parseInt(el.getAttribute('data-total'), 10);
        const sel = geladeneTeile.filter((t, i) => t.catKey === catKey && selectedTeile.has(i)).length;
        if (sel > 0) {
            el.textContent = `${sel}/${total}`;
            el.classList.add('active');
        } else {
            el.textContent = total;
            el.classList.remove('active');
        }
    });
}

function selectAllParts() {
    geladeneTeile.forEach((_, i) => selectedTeile.add(i));
    document.querySelectorAll('.part-check').forEach(cb => {
        cb.checked = true;
        cb.closest('.part-item').classList.add('selected');
    });
    updateSelectionBar();
    updateCategoryCounts();
}

function clearSelection() {
    selectedTeile.clear();
    document.querySelectorAll('.part-check').forEach(cb => {
        cb.checked = false;
        cb.closest('.part-item').classList.remove('selected');
    });
    updateSelectionBar();
    updateCategoryCounts();
}

/* =========================================
   Dashboard render
   ========================================= */
function renderDashboard() {
    const db = document.getElementById('dashboard');
    db.innerHTML = "";
    const gruppen = {};
    geladeneTeile.forEach((t, index) => {
        if (!gruppen[t.catKey]) gruppen[t.catKey] = [];
        gruppen[t.catKey].push({ ...t, originalIndex: index });
    });

    const order = ["cat_paint", "cat_wheels", "cat_cab_ext", "cat_chs", "cat_logo", "cat_light", "cat_int", "cat_trailer", "cat_misc"];
    const sortedKeys = Object.keys(gruppen).sort((a, b) => {
        const ia = order.indexOf(a), ib = order.indexOf(b);
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

    for (const catKey of sortedKeys) {
        const teile = gruppen[catKey];
        const istOffen = offeneKategorien.has(catKey);
        const uTitel = translations[currentLang][catKey] || catKey;
        const safeKey = catKey.replace(/'/g, "\\'");
        const total = teile.length;
        const selInCat = teile.filter(t => selectedTeile.has(t.originalIndex)).length;
        const countLabel = selInCat > 0 ? `${selInCat}/${total}` : `${total}`;
        const countActive = selInCat > 0 ? 'active' : '';

        let html = `<article class="category-box ${istOffen ? '' : 'collapsed'}">
            <header class="category-header" onclick="toggleKategorie('${safeKey}')">
                <div class="header-left">
                    <span class="chevron">▾</span>
                    <h3>${uTitel}</h3>
                </div>
                <div class="header-actions">
                    <span class="cat-count ${countActive}" data-cat="${safeKey}" data-total="${total}">${countLabel}</span>
                    <button class="btn-batch" type="button" onclick="event.stopPropagation(); oeffneBatchPicker('${safeKey}')">${translations[currentLang].btn_batch}</button>
                </div>
            </header>
            <div class="category-content">`;

        const counts = {};
        const currentIdx = {};
        teile.forEach(t => {
            const n = (translations[currentLang].parts && translations[currentLang].parts[t.katID]) || t.katID;
            counts[n] = (counts[n] || 0) + 1;
        });

        teile.forEach(t => {
            const bName = (translations[currentLang].parts && translations[currentLang].parts[t.katID]) || t.katID;
            const fName = counts[bName] > 1
                ? `${bName} (${currentIdx[bName] = (currentIdx[bName] || 0) + 1})`
                : bName;
            const safeName = fName.replace(/'/g, "\\'").replace(/"/g, "&quot;");
            const isSelected = selectedTeile.has(t.originalIndex);
            html += `<div class="part-item ${isSelected ? 'selected' : ''}" data-idx="${t.originalIndex}">
                <input type="checkbox" class="part-check" data-idx="${t.originalIndex}" ${isSelected ? 'checked' : ''}>
                <span class="part-name">${fName}</span>
                <div class="color-preview" style="background-color: ${t.hex}" onclick="oeffnePicker(${t.originalIndex}, '${safeName}')" title="${safeName}"></div>
            </div>`;
        });
        html += `</div></article>`;
        db.innerHTML += html;
    }

    // Wire up checkbox listeners after render
    document.querySelectorAll('.part-check').forEach(cb => {
        cb.addEventListener('change', function (e) {
            const idx = parseInt(this.getAttribute('data-idx'), 10);
            toggleTeilAuswahl(idx, this.checked);
        });
        cb.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });
}

/* =========================================
   Modal
   ========================================= */
function updateModalAnzeige(updPal = true) {
    const r = parseInt(document.getElementById('sliderR').value);
    const g = parseInt(document.getElementById('sliderG').value);
    const b = parseInt(document.getElementById('sliderB').value);
    document.getElementById('valR').textContent = r;
    document.getElementById('valG').textContent = g;
    document.getElementById('valB').textContent = b;
    const hex = "#" + compToHex(r) + compToHex(g) + compToHex(b);
    document.getElementById('modalNewColor').style.backgroundColor = hex;
    if (updPal) document.getElementById('masterColorPicker').value = hex;
    document.getElementById('modalScsCode').textContent =
        `SCS: (${rgbToScs(r)}, ${rgbToScs(g)}, ${rgbToScs(b)})`;
}

function openModal() {
    const m = document.getElementById('customColorModal');
    m.hidden = false;
    requestAnimationFrame(() => m.classList.add('active'));
}
function closeModal() {
    const m = document.getElementById('customColorModal');
    m.classList.remove('active');
    setTimeout(() => { m.hidden = true; }, 220);
}

function presetModal(refTeil, title) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalOldColor').style.backgroundColor = refTeil.hex;
    document.getElementById('modalNewColor').style.backgroundColor = refTeil.hex;
    document.getElementById('masterColorPicker').value = refTeil.hex;
    document.getElementById('sliderR').value = Math.round(refTeil.r);
    document.getElementById('sliderG').value = Math.round(refTeil.g);
    document.getElementById('sliderB').value = Math.round(refTeil.b);
    updateModalAnzeige(false);
    openModal();
}

function oeffnePicker(index, name) {
    pickerModus = "single";
    aktuellesTeilIndex = index;
    presetModal(geladeneTeile[index], name);
}

function oeffneBatchPicker(catKey) {
    pickerModus = "category";
    batchKategorie = catKey;
    const t = geladeneTeile.find(x => x.catKey === catKey);
    if (!t) return;
    const catName = translations[currentLang][catKey] || catKey;
    presetModal(t, translations[currentLang].batch_title(catName));
}

function oeffneSelectionPicker() {
    if (selectedTeile.size === 0) return;
    pickerModus = "selection";
    const firstIdx = selectedTeile.values().next().value;
    const t = geladeneTeile[firstIdx];
    presetModal(t, translations[currentLang].selection_title(selectedTeile.size));
}

/* Slider & picker listeners */
['sliderR', 'sliderG', 'sliderB'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => updateModalAnzeige(true));
});

document.getElementById('masterColorPicker').addEventListener('input', function () {
    const c = hexToRgb(this.value);
    document.getElementById('sliderR').value = c.r;
    document.getElementById('sliderG').value = c.g;
    document.getElementById('sliderB').value = c.b;
    updateModalAnzeige(false);
});

document.getElementById('btnCancel').addEventListener('click', closeModal);

document.getElementById('customColorModal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const m = document.getElementById('customColorModal');
        if (!m.hidden) closeModal();
    }
});

document.getElementById('btnSave').addEventListener('click', function () {
    const r = parseInt(document.getElementById('sliderR').value);
    const g = parseInt(document.getElementById('sliderG').value);
    const b = parseInt(document.getElementById('sliderB').value);
    const hex = "#" + compToHex(r) + compToHex(g) + compToHex(b);
    const upd = (t) => {
        t.r = r; t.g = g; t.b = b; t.hex = hex;
        const nStr = `${t.colorType}: (${rgbToScs(r)}, ${rgbToScs(g)}, ${rgbToScs(b)})`;
        originalBloecke[t.blockIndex] = originalBloecke[t.blockIndex].replace(t.rawMatch, nStr);
        t.rawMatch = nStr;
    };
    if (pickerModus === "category") {
        geladeneTeile.filter(t => t.catKey === batchKategorie).forEach(upd);
    } else if (pickerModus === "selection") {
        selectedTeile.forEach(idx => upd(geladeneTeile[idx]));
    } else {
        upd(geladeneTeile[aktuellesTeilIndex]);
    }
    closeModal();
    renderDashboard();
});

/* =========================================
   Selection bar buttons
   ========================================= */
document.getElementById('btnSelectAll').addEventListener('click', selectAllParts);
document.getElementById('btnClearSelection').addEventListener('click', clearSelection);
document.getElementById('btnPaintSelection').addEventListener('click', oeffneSelectionPicker);

/* =========================================
   Chassis warn
   ========================================= */
document.getElementById('selChassis').addEventListener('change', function () {
    document.getElementById('chassisWarn').hidden = this.value === "keep";
});

/* =========================================
   Download — keeps the original filename
   ========================================= */
function replaceHardwarePath(text, oldPath, newPath) {
    if (!oldPath || !newPath || oldPath === newPath) return text;
    const escaped = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(data_path:\\s*")${escaped}(")`, 'g');
    return text.replace(pattern, `$1${newPath}$2`);
}

document.getElementById('btnDownload').addEventListener('click', function () {
    let out = originalBloecke.join('}');

    const sEng = document.getElementById('selEngine').value;
    if (sEng !== "keep" && window.originalEngine) {
        out = replaceHardwarePath(out, window.originalEngine, sEng);
    }

    const sTra = document.getElementById('selTrans').value;
    if (sTra !== "keep" && window.originalTrans) {
        out = replaceHardwarePath(out, window.originalTrans, sTra);
    }

    const sCha = document.getElementById('selChassis').value;
    if (sCha !== "keep" && window.originalChassis) {
        out = replaceHardwarePath(out, window.originalChassis, sCha);
    }

    const d = new Date();
    out = out.replace(/\n*\/\/\s*made by Carni\s*-.*$/gm, '');
    out = out.replace(/\s+$/, '');
    const pad = (n) => String(n).padStart(2, '0');
    out += `\n\n// made by Carni - ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}\n`;

    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([out], { type: "text/plain" }));
    a.download = originalFileName || "vehicle.sii";
    a.click();
    URL.revokeObjectURL(a.href);
});

/* =========================================
   Init
   ========================================= */
setLanguage(currentLang);
updateSelectionBar();
