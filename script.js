/* ============================================================
   ETS2 Paint Editor — script.js  v1.4
   ============================================================ */

const translations = {
    de: {
        app_title: "ETS2 Paint Editor",
        app_tagline: "Truck & Trailer Paint Modification",
        upload_hint: "Vehicle.sii Datei",
        btn_choose: "Datei auswählen",
        no_file: "Keine Datei ausgewählt",
        btn_download: "Download",
        loaded: "Geladen: ",
        last_edited: (d, t) => `Zuletzt bearbeitet: ${d} um ${t} Uhr`,
        placeholder: "Bitte lade eine Vehicle.sii Datei hoch, um zu starten.",
        placeholder_hint: "Die Datei muss entschlüsselt sein (Klartext-Format).",

        vehicle_config: "Fahrzeug-Konfiguration",
        type_truck: "Lkw",
        type_trailer: "Anhänger",
        info_brand: "Marke",
        info_model: "Modell",
        info_chassis: "Chassis",
        info_transmission: "Getriebe",
        info_engine: "Motor",
        info_paint_count: "Lackierbare Teile",
        not_available: "—",

        modal_old: "Alt",
        modal_new: "Neu",
        modal_cancel: "Abbruch",
        modal_save: "Speichern",
        btn_batch: "Alle färben",
        btn_batch_sub: "Alle",
        batch_title: (n) => `Alle: ${n}`,
        selection_title: (n) => `${n} Teile färben`,
        selection_count: (n) => n === 0 ? "Keine Auswahl" : (n === 1 ? "1 Teil ausgewählt" : `${n} Teile ausgewählt`),
        btn_select_all: "Alle auswählen",
        btn_clear_selection: "Zurücksetzen",
        btn_paint_selection: "Auswahl färben",

        // Top categories
        cat_exterior: "Lackierung Außen",
        cat_addons:   "Anbauteile",
        cat_wheels:   "Räder & Reifen",
        cat_misc:     "Sonstiges",

        // Sub-categories under "Sonstiges"
        sub_paint:    "Hauptlackierung",
        sub_exhaust:  "Auspuff",
        sub_badges:   "Embleme & Logos",
        sub_lights_ext: "Beleuchtung Außen",
        sub_lights_int: "Beleuchtung Innen",
        sub_interior: "Innenraum",
        sub_decor:    "Dekoration",
        sub_other:    "Verschiedenes",

        hex_label: "HEX",
        add_favorite: "Als Favorit speichern",
        tab_favorites: "Favoriten",
        tab_recents: "Kürzlich",
        favorites_empty: "Noch keine Favoriten gespeichert. Speichere deine erste Farbe mit dem Stern-Symbol.",
        recents_empty: "Noch keine Farben verwendet.",
        palette_persist_hint: "Favoriten und kürzlich verwendete Farben werden lokal in deinem Browser gespeichert und bleiben auch nach einem Neuladen der Seite erhalten.",
        fav_save_title: "Favorit speichern",
        fav_name_label: "Name (optional)",
        ctx_rename: "Umbenennen",
        ctx_delete: "Löschen",
        prompt_rename: "Neuer Name für den Favoriten:",

        err_encrypted: "Diese Datei scheint verschlüsselt zu sein. Bitte entschlüssele sie zuerst mit SII_Decrypt.",
        err_no_parts: "In dieser Datei wurden keine lackierbaren Teile gefunden. Möglicherweise ist es keine Vehicle.sii Datei.",
        footer_text: "ETS2 Paint Editor — by Carni",

        parts: {
            "paint_job": "Hauptlackierung",
            "decals": "Aufkleber",

            // Wheels
            "f_disc": "Felge Vorn", "r_disc": "Felge Hinten",
            "f_nuts": "Muttern Vorn", "r_nuts": "Muttern Hinten",
            "f_hub": "Nabe Vorn", "r_hub": "Nabe Hinten",
            "f_tire": "Reifen Vorn", "r_tire": "Reifen Hinten",
            "f_cover": "Felgenabdeckung Vorn", "r_cover": "Felgenabdeckung Hinten",

            // Exterior body — paintwork
            "f_bumper": "Frontstoßstange", "r_bumper": "Heckstoßstange",
            "sideskirt": "Seitenschweller",
            "f_fender": "Kotflügel Vorn", "r_fender": "Kotflügel Hinten",
            "f_fender_cab": "Kotflügel Vorn (Kabine)", "f_fender_chs": "Kotflügel Vorn (Chassis)",
            "r_fendr_top": "Kotflügelabdeckung",
            "f_mudflap": "Schmutzfänger Vorn", "r_mudflap": "Schmutzfänger Hinten",
            "tank": "Tank", "trlr_cables": "Anhängerkabel",
            "f_inlay_cab": "Front-Inlay (Kabine)", "f_inlay_chs": "Front-Inlay (Chassis)",
            "f_intake_cab": "Lufteinlass (Kabine)", "f_intake_chs": "Lufteinlass (Chassis)",
            "f_intk_b_cab": "Lufteinlass Unten (Kabine)", "f_intk_b_chs": "Lufteinlass Unten (Chassis)",
            "s_panel": "Seitenverkleidung", "r_chs_cover": "Chassisabdeckung",
            "s_deflector": "Seitendeflektor", "r_deflector": "Heckdeflektor",
            "cor_def": "Eckdeflektor",
            "s_strip": "Seitenleiste",
            "s_guard": "Seitenschutz",

            // Add-ons (Anbauteile)
            "r_grill": "Roofbar", "f_grill": "Frontgrill", "b_grill": "Lowbar",
            "mirror": "Spiegel", "f_mirror": "Frontspiegel", "s_mirror": "Seitenspiegel",
            "sunshld": "Sonnenblende", "sunshield": "Sonnenblende",
            "doorhndl": "Türgriffe", "doorstep": "Trittstufen",
            "f_wnd_frame": "Fensterrahmen", "hl_guard": "Scheinwerfergitter",
            "f_equip": "Frontausstattung",
            "r_horn": "Lufthorn Rechts", "l_horn": "Lufthorn Links",
            "f_intake_bar": "Lufteinlass-Strebe",
            "hook": "Abschlepphaken",

            // Exhaust (Sonstiges -> Auspuff)
            "exhaust": "Auspuff",
            "exhaust_l": "Auspuff Links", "exhaust_r": "Auspuff Rechts",
            "exhaust_m": "Auspuff Mitte",

            // Badges (Sonstiges -> Embleme & Logos)
            "badge": "Emblem", "f_logo": "Front-Logo",
            "c_badge": "Kabinen-Emblem", "s_badge": "Seiten-Emblem", "f_badge": "Front-Emblem",
            "badge_a": "Emblem A", "badge_b": "Emblem B", "badge_c": "Emblem C",
            "drv_plate": "Fahrer-Schild", "codrv_plate": "Beifahrer-Schild",

            // Exterior lights
            "r_light": "Rücklichter", "markers": "Markierungsleuchten", "beacon": "Rundumleuchten",
            "f_light_chs": "Zusatzscheinwerfer (Chassis)",
            "f_light_mid": "Zusatzscheinwerfer (Mitte)",
            "f_light_top": "Zusatzscheinwerfer (Dach)",
            "f_turn_light": "Blinker Vorn",
            "head_light": "Hauptscheinwerfer",
            "b_detector": "Hinderniserkennung",

            // Interior lights
            "intlight_bgr": "Innenlicht (Hintergrund)",
            "intlight_bck": "Innenlicht",

            // Interior
            "steering_w": "Lenkrad",
            "codrv_seat": "Beifahrersitz",
            "filter": "Filter", "carpet": "Teppich",
            "set_dashbrd": "Armaturenbrett-Set",
            "set_glass": "Glas-Set", "set_lglass": "Glas-Set (Links)",
            "frntglss_mid": "Frontglas (Mitte)",
            "curtain_f": "Vorhang Vorn",
            "l_pillow": "Kissen",
            "cup_holder": "Becherhalter",
            "cabin": "Kabine", "interior": "Innenraum",

            // Decoration
            "toyac": "Spielzeug AC", "toybed": "Spielzeug Bett",
            "toybig": "Spielzeug Groß", "toyseat": "Spielzeug Sitz",
            "toyhang": "Spielzeug Hängend",

            // Trailer parts
            "body": "Aufbau",
            "f_body": "Aufbau Vorn",
            "rear_body": "Aufbau Hinten",
            "r_banner": "Heck-Banner",
            "chassis": "Chassis",
            "frame": "Rahmen",
            "wheel": "Rad",
            "chs_f_l": "Chassis Vorn Links",
            "chs_f_r": "Chassis Vorn Rechts"
        }
    },
    en: {
        app_title: "ETS2 Paint Editor",
        app_tagline: "Truck & Trailer Paint Modification",
        upload_hint: "Vehicle.sii file",
        btn_choose: "Choose file",
        no_file: "No file selected",
        btn_download: "Download",
        loaded: "Loaded: ",
        last_edited: (d, t) => `Last edited: ${d} at ${t}`,
        placeholder: "Please upload a Vehicle.sii file to get started.",
        placeholder_hint: "The file must be decrypted (plain text format).",

        vehicle_config: "Vehicle Configuration",
        type_truck: "Truck",
        type_trailer: "Trailer",
        info_brand: "Brand",
        info_model: "Model",
        info_chassis: "Chassis",
        info_transmission: "Gearbox",
        info_engine: "Engine",
        info_paint_count: "Paintable parts",
        not_available: "—",

        modal_old: "Old",
        modal_new: "New",
        modal_cancel: "Cancel",
        modal_save: "Save",
        btn_batch: "Color all",
        btn_batch_sub: "All",
        batch_title: (n) => `All: ${n}`,
        selection_title: (n) => `Color ${n} parts`,
        selection_count: (n) => n === 0 ? "No selection" : (n === 1 ? "1 part selected" : `${n} parts selected`),
        btn_select_all: "Select all",
        btn_clear_selection: "Clear",
        btn_paint_selection: "Color selection",

        cat_exterior: "Exterior Paint",
        cat_addons:   "Add-ons",
        cat_wheels:   "Wheels & Tires",
        cat_misc:     "Miscellaneous",

        sub_paint:    "Main Paintjob",
        sub_exhaust:  "Exhaust",
        sub_badges:   "Badges & Logos",
        sub_lights_ext: "Exterior Lights",
        sub_lights_int: "Interior Lights",
        sub_interior: "Interior",
        sub_decor:    "Decoration",
        sub_other:    "Other",

        hex_label: "HEX",
        add_favorite: "Save as favorite",
        tab_favorites: "Favorites",
        tab_recents: "Recent",
        favorites_empty: "No favorites yet. Save your first color with the star icon.",
        recents_empty: "No colors used yet.",
        palette_persist_hint: "Favorites and recently used colors are stored locally in your browser and persist across page reloads.",
        fav_save_title: "Save favorite",
        fav_name_label: "Name (optional)",
        ctx_rename: "Rename",
        ctx_delete: "Delete",
        prompt_rename: "New name for this favorite:",

        err_encrypted: "This file appears to be encrypted. Please decrypt it first with SII_Decrypt.",
        err_no_parts: "No paintable parts found in this file. It may not be a Vehicle.sii file.",
        footer_text: "ETS2 Paint Editor — by Carni",

        parts: {
            "paint_job": "Main Paintjob",
            "decals": "Decals",

            "f_disc": "Front Disc", "r_disc": "Rear Disc",
            "f_nuts": "Front Nuts", "r_nuts": "Rear Nuts",
            "f_hub": "Front Hub", "r_hub": "Rear Hub",
            "f_tire": "Front Tire", "r_tire": "Rear Tire",
            "f_cover": "Front Hub Cover", "r_cover": "Rear Hub Cover",

            "f_bumper": "Front Bumper", "r_bumper": "Rear Bumper",
            "sideskirt": "Sideskirt",
            "f_fender": "Front Fender", "r_fender": "Rear Fender",
            "f_fender_cab": "Front Fender (Cab)", "f_fender_chs": "Front Fender (Chs)",
            "r_fendr_top": "Fender Top",
            "f_mudflap": "Front Mudflap", "r_mudflap": "Rear Mudflap",
            "tank": "Fuel Tank", "trlr_cables": "Trailer Cables",
            "f_inlay_cab": "Front Inlay (Cab)", "f_inlay_chs": "Front Inlay (Chs)",
            "f_intake_cab": "Air Intake (Cab)", "f_intake_chs": "Air Intake (Chs)",
            "f_intk_b_cab": "Lower Intake (Cab)", "f_intk_b_chs": "Lower Intake (Chs)",
            "s_panel": "Side Panel", "r_chs_cover": "Chassis Cover",
            "s_deflector": "Side Deflector", "r_deflector": "Rear Deflector",
            "cor_def": "Corner Deflector",
            "s_strip": "Side Strip",
            "s_guard": "Side Guard",

            "r_grill": "Roofbar", "f_grill": "Front Grill", "b_grill": "Lowbar",
            "mirror": "Mirror", "f_mirror": "Front Mirror", "s_mirror": "Side Mirror",
            "sunshld": "Sun Shield", "sunshield": "Sun Shield",
            "doorhndl": "Door Handles", "doorstep": "Door Step",
            "f_wnd_frame": "Window Frame", "hl_guard": "Headlight Guard",
            "f_equip": "Front Equipment",
            "r_horn": "Right Air Horn", "l_horn": "Left Air Horn",
            "f_intake_bar": "Intake Bar",
            "hook": "Tow Hook",

            "exhaust": "Exhaust",
            "exhaust_l": "Left Exhaust", "exhaust_r": "Right Exhaust",
            "exhaust_m": "Center Exhaust",

            "badge": "Badge", "f_logo": "Front Logo",
            "c_badge": "Cabin Badge", "s_badge": "Side Badge", "f_badge": "Front Badge",
            "badge_a": "Badge A", "badge_b": "Badge B", "badge_c": "Badge C",
            "drv_plate": "Driver Plate", "codrv_plate": "Co-driver Plate",

            "r_light": "Tail Lights", "markers": "Marker Lights", "beacon": "Beacons",
            "f_light_chs": "Aux Light (Chs)",
            "f_light_mid": "Aux Light (Mid)",
            "f_light_top": "Aux Light (Top)",
            "f_turn_light": "Front Turn Signal",
            "head_light": "Head Light",
            "b_detector": "Obstacle Detector",

            "intlight_bgr": "Interior Light (BG)",
            "intlight_bck": "Interior Light",

            "steering_w": "Steering Wheel",
            "codrv_seat": "Co-driver Seat",
            "filter": "Filter", "carpet": "Carpet",
            "set_dashbrd": "Dashboard Set",
            "set_glass": "Glass Set", "set_lglass": "Glass Set (Left)",
            "frntglss_mid": "Front Glass (Mid)",
            "curtain_f": "Front Curtain",
            "l_pillow": "Pillow",
            "cup_holder": "Cup Holder",
            "cabin": "Cabin", "interior": "Interior",

            "toyac": "Toy AC", "toybed": "Toy Bed",
            "toybig": "Toy Big", "toyseat": "Toy Seat",
            "toyhang": "Toy Hanging",

            "body": "Body",
            "f_body": "Front Body",
            "rear_body": "Rear Body",
            "r_banner": "Rear Banner",
            "chassis": "Chassis",
            "frame": "Frame",
            "wheel": "Wheel",
            "chs_f_l": "Chassis Front Left",
            "chs_f_r": "Chassis Front Right"
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
let offeneKategorien = new Set(); // top-cat keys (cat_exterior etc.)
let offeneSubKategorien = new Set(); // sub-cat keys (cat_misc:sub_exhaust)
let selectedTeile = new Set();
let pickerModus = "single"; // "single" | "category" | "subcategory" | "selection"
let batchKategorie = "";    // catKey for "category" mode
let batchSubKategorie = ""; // subKey for "subcategory" mode
let aktuellesTeilIndex = null;
let vehicleType = "truck";

/* Favorites & recents */
const STORAGE_FAV = "ets2_paint_favorites_v1";
const STORAGE_REC = "ets2_paint_recents_v1";
const MAX_RECENTS = 16;
let favorites = [];
let recents = [];
let activePalettePane = "favorites";
let pendingFavHex = null;
let ctxTargetIdx = null;

/* =========================================
   Brand & model names
   ========================================= */
const BRAND_NAMES = {
    "volvo.fh16": "Volvo",
    "volvo.fh16_2012": "Volvo",
    "volvo.fh_2024": "Volvo",
    "scania.r_2016": "Scania",
    "scania.s_2016": "Scania",
    "scania.r": "Scania",
    "scania.s": "Scania",
    "scania.streamline": "Scania",
    "mercedes.actros": "Mercedes-Benz",
    "mercedes.actros2014": "Mercedes-Benz",
    "mercedes.newactros": "Mercedes-Benz",
    "man.tgx": "MAN",
    "man.tgx_2020": "MAN",
    "daf.xf": "DAF",
    "daf.xf_euro6": "DAF",
    "daf.xf_2017": "DAF",
    "daf.xg": "DAF",
    "daf.xg_2021": "DAF",
    "renault.t": "Renault",
    "renault.premium": "Renault",
    "renault.magnum": "Renault",
    "renault.magnum_old": "Renault",
    "iveco.hiway": "Iveco",
    "iveco.sway": "Iveco",
    "iveco.stralis": "Iveco",
    "peterbilt.579": "Peterbilt",
    "kenworth.w900": "Kenworth"
};

const MODEL_NAMES = {
    "volvo.fh16": "FH16 (2012)",
    "volvo.fh16_2012": "FH16 (2012)",
    "volvo.fh_2024": "FH (2024)",
    "scania.r_2016": "R (2016)",
    "scania.s_2016": "S (2016)",
    "scania.r": "R",
    "scania.s": "S",
    "scania.streamline": "Streamline",
    "mercedes.actros": "Actros (MP3)",
    "mercedes.actros2014": "Actros MP4",
    "mercedes.newactros": "Actros (2024)",
    "man.tgx": "TGX",
    "man.tgx_2020": "TGX (2020)",
    "daf.xf": "XF",
    "daf.xf_euro6": "XF Euro 6",
    "daf.xf_2017": "XF (2017)",
    "daf.xg": "XG",
    "daf.xg_2021": "XG (2021)",
    "renault.t": "T",
    "renault.premium": "Premium",
    "renault.magnum": "Magnum",
    "renault.magnum_old": "Magnum (old)",
    "iveco.hiway": "Hi-Way",
    "iveco.sway": "S-Way",
    "iveco.stralis": "Stralis",
    "peterbilt.579": "579",
    "kenworth.w900": "W900"
};

/* =========================================
   Category & sub-category mapping
   ========================================= */

// Sub-category mapping for parts that fall into "cat_misc"
// Anything not listed here defaults to "sub_other"
const subKategorienMapping = {
    // Hauptlackierung & Aufkleber
    "paint_job": "sub_paint",
    "decals": "sub_paint",

    // Auspuff
    "exhaust":    "sub_exhaust",
    "exhaust_l":  "sub_exhaust",
    "exhaust_r":  "sub_exhaust",
    "exhaust_m":  "sub_exhaust",

    // Embleme & Logos
    "badge":      "sub_badges",
    "f_logo":     "sub_badges",
    "c_badge":    "sub_badges",
    "s_badge":    "sub_badges",
    "f_badge":    "sub_badges",
    "badge_a":    "sub_badges",
    "badge_b":    "sub_badges",
    "badge_c":    "sub_badges",
    "drv_plate":  "sub_badges",
    "codrv_plate":"sub_badges",

    // Beleuchtung außen
    "r_light":      "sub_lights_ext",
    "markers":      "sub_lights_ext",
    "beacon":       "sub_lights_ext",
    "f_light_chs":  "sub_lights_ext",
    "f_light_mid":  "sub_lights_ext",
    "f_light_top":  "sub_lights_ext",
    "f_turn_light": "sub_lights_ext",
    "head_light":   "sub_lights_ext",
    "b_detector":   "sub_lights_ext",

    // Beleuchtung innen
    "intlight_bgr": "sub_lights_int",
    "intlight_bck": "sub_lights_int",

    // Innenraum
    "steering_w":  "sub_interior",
    "codrv_seat":  "sub_interior",
    "filter":      "sub_interior",
    "carpet":      "sub_interior",
    "set_dashbrd": "sub_interior",
    "set_glass":   "sub_interior",
    "set_lglass":  "sub_interior",
    "frntglss_mid":"sub_interior",
    "curtain_f":   "sub_interior",
    "l_pillow":    "sub_interior",
    "cup_holder":  "sub_interior",
    "cabin":       "sub_interior",
    "interior":    "sub_interior",

    // Dekoration
    "toyac":   "sub_decor",
    "toybed":  "sub_decor",
    "toybig":  "sub_decor",
    "toyseat": "sub_decor",
    "toyhang": "sub_decor"
};

// Top-level category mapping
// cat_exterior — body paint surfaces (no add-ons, no exhaust, no badges/lights/interior)
// cat_addons   — bolt-on parts (mirrors, horns, grills, steps, handles, deflector grills)
// cat_wheels   — wheels, tires, hubs, nuts, covers
// cat_misc     — fallback for everything else; further split into sub-categories
const kategorienMapping = {
    // Wheels
    "f_disc": "cat_wheels", "r_disc": "cat_wheels",
    "f_nuts": "cat_wheels", "r_nuts": "cat_wheels",
    "f_hub":  "cat_wheels", "r_hub":  "cat_wheels",
    "f_tire": "cat_wheels", "r_tire": "cat_wheels",
    "f_cover":"cat_wheels", "r_cover":"cat_wheels",
    "wheel":  "cat_wheels",

    // Exterior body paint — surfaces of the visible bodywork
    "f_bumper": "cat_exterior", "r_bumper": "cat_exterior",
    "sideskirt": "cat_exterior",
    "f_fender": "cat_exterior", "r_fender": "cat_exterior",
    "f_fender_cab": "cat_exterior", "f_fender_chs": "cat_exterior",
    "r_fendr_top": "cat_exterior",
    "f_mudflap": "cat_exterior", "r_mudflap": "cat_exterior",
    "tank": "cat_exterior", "trlr_cables": "cat_exterior",
    "f_inlay_cab": "cat_exterior", "f_inlay_chs": "cat_exterior",
    "f_intake_cab": "cat_exterior", "f_intake_chs": "cat_exterior",
    "f_intk_b_cab": "cat_exterior", "f_intk_b_chs": "cat_exterior",
    "s_panel": "cat_exterior", "r_chs_cover": "cat_exterior",
    "s_deflector": "cat_exterior", "r_deflector": "cat_exterior",
    "cor_def": "cat_exterior",
    "s_strip": "cat_exterior",
    "s_guard": "cat_exterior",
    // Trailer body
    "body": "cat_exterior",
    "f_body": "cat_exterior",
    "rear_body": "cat_exterior",
    "r_banner": "cat_exterior",
    "chassis": "cat_exterior",
    "frame": "cat_exterior",
    "chs_f_l": "cat_exterior",
    "chs_f_r": "cat_exterior",

    // Add-ons (Anbauteile) — bolt-on accessories
    "r_grill": "cat_addons", "f_grill": "cat_addons", "b_grill": "cat_addons",
    "mirror": "cat_addons", "f_mirror": "cat_addons", "s_mirror": "cat_addons",
    "sunshld": "cat_addons", "sunshield": "cat_addons",
    "doorhndl": "cat_addons", "doorstep": "cat_addons",
    "f_wnd_frame": "cat_addons", "hl_guard": "cat_addons",
    "f_equip": "cat_addons",
    "r_horn": "cat_addons", "l_horn": "cat_addons",
    "f_intake_bar": "cat_addons",
    "hook": "cat_addons"

    // All other IDs (paint_job, decals, exhaust, badges, lights, interior, decor, unknown)
    // → cat_misc (fallback) → split into sub-categories via subKategorienMapping
};

/* =========================================
   UI helpers
   ========================================= */
function setLanguage(l) {
    currentLang = l;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        const v = translations[l][k];
        if (typeof v === 'string') el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const k = el.getAttribute('data-i18n-title');
        const v = translations[l][k];
        if (typeof v === 'string') el.title = v;
    });

    document.getElementById('btn-lang-de').classList.toggle('active', l === 'de');
    document.getElementById('btn-lang-en').classList.toggle('active', l === 'en');

    updateSelectionBar();
    if (geladeneTeile.length > 0) {
        renderDashboard();
        renderInfoPanel();
    }
}

function toggleKategorie(catKey) {
    if (offeneKategorien.has(catKey)) offeneKategorien.delete(catKey);
    else offeneKategorien.add(catKey);
    renderDashboard();
}

function toggleSubKategorie(catKey, subKey) {
    const key = `${catKey}:${subKey}`;
    if (offeneSubKategorien.has(key)) offeneSubKategorien.delete(key);
    else offeneSubKategorien.add(key);
    renderDashboard();
}

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
function isValidHex(h) { return /^#?[0-9a-fA-F]{6}$/.test(h.trim()); }
function normalizeHex(h) {
    h = h.trim();
    if (!h.startsWith('#')) h = '#' + h;
    return h.toUpperCase();
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
    document.getElementById('errorBannerText').textContent = msg;
    document.getElementById('errorBanner').hidden = false;
}
function hideError() {
    document.getElementById('errorBanner').hidden = true;
    document.getElementById('errorBannerText').textContent = "";
}

/* =========================================
   Vehicle detection helpers
   ========================================= */
function detectVehicleType(text) {
    if (/^\s*trailer\s*:/m.test(text)) return "trailer";
    if (/data_path:\s*"\/def\/vehicle\/trailer/.test(text)) return "trailer";
    return "truck";
}

function detectTruckSlug(text) {
    // Anchor on chassis path — accessories may come from foreign brands
    let m = text.match(/\/def\/vehicle\/truck\/([a-z0-9_.]+)\/chassis\//i);
    if (m) return m[1];
    m = text.match(/\/def\/vehicle\/truck\/([a-z0-9_.]+)\/cabin\//i);
    if (m) return m[1];
    m = text.match(/\/def\/vehicle\/truck\/([a-z0-9_.]+)\//i);
    return m ? m[1] : null;
}

function detectTrailerSlug(text) {
    // /def/vehicle/trailer/<slug>/ or /def/vehicle/trailer_owned/<slug>/
    let m = text.match(/\/def\/vehicle\/trailer_owned\/([a-z0-9_.]+)\//i);
    if (m) return m[1];
    m = text.match(/\/def\/vehicle\/trailer\/([a-z0-9_.]+)\//i);
    return m ? m[1] : null;
}

/* =========================================
   Parser
   ========================================= */
function analysiere(text) {
    if (text.startsWith('ScsC') || /[\x00-\x08\x0E-\x1F]/.test(text.substring(0, 200))) {
        showError(translations[currentLang].err_encrypted);
        document.getElementById('vehiclePlaceholder').hidden = false;
        document.getElementById('editorWrap').hidden = true;
        return;
    }

    originalBloecke = text.split('}');
    geladeneTeile = [];
    offeneKategorien.clear();
    offeneSubKategorien.clear();
    selectedTeile.clear();

    vehicleType = detectVehicleType(text);

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
            const catKey = kategorienMapping[katID] || "cat_misc";
            const subKey = catKey === "cat_misc" ? (subKategorienMapping[katID] || "sub_other") : null;
            geladeneTeile.push({
                blockIndex: index,
                colorType: cMatch[1],
                rawMatch: cMatch[0],
                katID: katID,
                catKey: catKey,
                subKey: subKey,
                r: r, g: g, b: b,
                hex: "#" + compToHex(r) + compToHex(g) + compToHex(b)
            });
        }
    });

    if (geladeneTeile.length === 0) {
        showError(translations[currentLang].err_no_parts);
        document.getElementById('vehiclePlaceholder').hidden = false;
        document.getElementById('editorWrap').hidden = true;
        return;
    }

    document.getElementById('vehiclePlaceholder').hidden = true;
    document.getElementById('editorWrap').hidden = false;

    buildVehicleInfo(text);
    renderDashboard();
    renderInfoPanel();
    updateSelectionBar();

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
}

/* =========================================
   Vehicle info extraction
   ========================================= */
let vehicleInfo = {
    type: "truck", brand: null, model: null,
    chassis: null, transmission: null, engine: null
};

function buildVehicleInfo(text) {
    vehicleInfo = {
        type: vehicleType,
        brand: null, model: null,
        chassis: null, transmission: null, engine: null
    };

    if (vehicleType === "truck") {
        const slug = detectTruckSlug(text);
        if (slug) {
            vehicleInfo.brand = BRAND_NAMES[slug] || slug.split('.')[0].replace(/^\w/, c => c.toUpperCase());
            vehicleInfo.model = MODEL_NAMES[slug] || slug.split('.').slice(1).join('.') || slug;
        }

        const escSlug = slug ? slug.replace(/\./g, '\\.') : null;

        // Chassis — anchored on truck slug
        let cMatch = null;
        if (escSlug) cMatch = text.match(new RegExp(`data_path:\\s*"(.*?/truck/${escSlug}/chassis/(.*?)\\.sii)"`));
        if (!cMatch) cMatch = text.match(/data_path:\s*"(.*?\/chassis\/(.*?)\.sii)"/);
        if (cMatch) vehicleInfo.chassis = humanizeAxleName(cMatch[2]);

        // Transmission
        let tMatch = null;
        if (escSlug) tMatch = text.match(new RegExp(`data_path:\\s*"(.*?/truck/${escSlug}/transmission/(.*?)\\.sii)"`));
        if (tMatch) {
            vehicleInfo.transmission = humanizeTransName(tMatch[2]);
        } else {
            // Foreign transmission (cross-brand modding)
            const generic = text.match(/data_path:\s*"(.*?\/truck\/([a-z0-9_.]+)\/transmission\/(.*?)\.sii)"/);
            if (generic) {
                const foreign = BRAND_NAMES[generic[2]] || generic[2].split('.')[0];
                vehicleInfo.transmission = humanizeTransName(generic[3]) + ` (${foreign})`;
            }
        }

        // Engine
        let eMatch = null;
        if (escSlug) eMatch = text.match(new RegExp(`data_path:\\s*"(.*?/truck/${escSlug}/engine/(.*?)\\.sii)"`));
        if (eMatch) {
            vehicleInfo.engine = humanizeEngineName(eMatch[2]);
        } else {
            const generic = text.match(/data_path:\s*"(.*?\/truck\/([a-z0-9_.]+)\/engine\/(.*?)\.sii)"/);
            if (generic) {
                const foreign = BRAND_NAMES[generic[2]] || generic[2].split('.')[0];
                vehicleInfo.engine = humanizeEngineName(generic[3]) + ` (${foreign})`;
            }
        }
    } else {
        // Trailer
        const slug = detectTrailerSlug(text);
        if (slug) {
            const parts = slug.split('.');
            vehicleInfo.brand = parts[0].replace(/^\w/, c => c.toUpperCase());
            vehicleInfo.model = parts.slice(1).join('.') || slug;
        }
        const cMatch = text.match(/data_path:\s*"(.*?\/chassis\/(.*?)\.sii)"/);
        if (cMatch) vehicleInfo.chassis = humanizeAxleName(cMatch[2]);

        if (!vehicleInfo.model) {
            const bodyMatch = text.match(/data_path:\s*"(.*?\/body\/(.*?)\.sii)"/);
            if (bodyMatch) vehicleInfo.model = humanizeName(bodyMatch[2]);
        }
    }
}

function humanizeAxleName(s) {
    s = s.replace(/_/g, ' ');
    s = s.replace(/(\d+)x(\d+) (\d+)/, '$1x$2/$3');
    return s.split(' ').map(w => /^\d+x/i.test(w) ? w : (w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
}

function humanizeName(s) {
    return s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function humanizeTransName(s) {
    if (/^[a-z]+\d+r?$/i.test(s)) return s.toUpperCase();
    let out = s.replace(/_/g, ' ');
    out = out.replace(/\bret\b|\bretarder\b/gi, '+ Retarder');
    out = out.replace(/(\d+)\s*speed/i, '$1-Gang');
    return out.replace(/\b\w/g, c => c.toUpperCase());
}

function humanizeEngineName(s) {
    let out = s.replace(/_/g, ' ');
    const hpMatch = out.match(/(\d{3,4})\s*$/);
    let hp = hpMatch ? hpMatch[1] : null;
    out = out.replace(/^engine\s*/i, '');
    out = out.replace(/\d{3,4}\s*$/, '').trim();
    out = out.toUpperCase();
    if (hp) out = (out ? out + ' ' : '') + hp + ' PS';
    return out || s;
}

function renderInfoPanel() {
    const t = translations[currentLang];
    const badge = document.getElementById('infoTypeBadge');
    badge.setAttribute('data-type', vehicleInfo.type);
    document.getElementById('infoTypeLabel').textContent =
        vehicleInfo.type === "trailer" ? t.type_trailer : t.type_truck;

    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (val) {
            el.textContent = val;
            el.classList.remove('muted');
        } else {
            el.textContent = t.not_available;
            el.classList.add('muted');
        }
    };

    setVal('infoBrand', vehicleInfo.brand);
    setVal('infoModel', vehicleInfo.model);
    setVal('infoChassis', vehicleInfo.chassis);
    setVal('infoTrans', vehicleInfo.transmission);
    setVal('infoEngine', vehicleInfo.engine);

    document.getElementById('infoPartCount').textContent = String(geladeneTeile.length);
    document.getElementById('infoPartCount').classList.remove('muted');

    const isTrailer = vehicleInfo.type === "trailer";
    document.getElementById('infoCellEngine').hidden = isTrailer;
    document.getElementById('infoCellTrans').hidden = isTrailer;
}

/* =========================================
   Selection management
   ========================================= */
function updateSelectionBar() {
    const bar = document.getElementById('selectionBar');
    if (!bar) return;
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
    document.querySelectorAll('.sub-cat-count').forEach(el => {
        const catKey = el.getAttribute('data-cat');
        const subKey = el.getAttribute('data-sub');
        const total = parseInt(el.getAttribute('data-total'), 10);
        const sel = geladeneTeile.filter((t, i) =>
            t.catKey === catKey && t.subKey === subKey && selectedTeile.has(i)
        ).length;
        if (sel > 0) {
            el.textContent = `${sel}/${total}`;
            el.classList.add('active');
            el.closest('.sub-cat-box').classList.add('has-selection');
        } else {
            el.textContent = total;
            el.classList.remove('active');
            el.closest('.sub-cat-box').classList.remove('has-selection');
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
function getPartLabel(katID) {
    const t = translations[currentLang];
    return (t.parts && t.parts[katID]) || katID;
}

function escapeAttr(s) {
    return String(s).replace(/&/g, "&amp;").replace(/'/g, "&#39;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildPartItemHtml(t, fName) {
    const safeName = escapeAttr(fName);
    const isSelected = selectedTeile.has(t.originalIndex);
    return `<div class="part-item ${isSelected ? 'selected' : ''}" data-idx="${t.originalIndex}">
        <input type="checkbox" class="part-check" data-idx="${t.originalIndex}" ${isSelected ? 'checked' : ''}>
        <span class="part-name">${escapeAttr(fName)}</span>
        <div class="color-preview" style="background-color: ${t.hex}" data-action="open-picker" data-idx="${t.originalIndex}" data-name="${safeName}" title="${safeName}"></div>
    </div>`;
}

// Disambiguate identical labels with (1), (2) ...
function buildDisambiguatedNames(parts) {
    const counts = {};
    parts.forEach(t => {
        const n = getPartLabel(t.katID);
        counts[n] = (counts[n] || 0) + 1;
    });
    const currentIdx = {};
    return parts.map(t => {
        const bName = getPartLabel(t.katID);
        if (counts[bName] > 1) {
            currentIdx[bName] = (currentIdx[bName] || 0) + 1;
            return { t, name: `${bName} (${currentIdx[bName]})` };
        }
        return { t, name: bName };
    });
}

function renderDashboard() {
    const db = document.getElementById('dashboard');
    db.innerHTML = "";
    const t18 = translations[currentLang];

    const gruppen = {};
    geladeneTeile.forEach((t, index) => {
        if (!gruppen[t.catKey]) gruppen[t.catKey] = [];
        gruppen[t.catKey].push({ ...t, originalIndex: index });
    });

    const order = ["cat_exterior", "cat_addons", "cat_wheels", "cat_misc"];
    const sortedKeys = order.filter(k => gruppen[k] && gruppen[k].length > 0);

    for (const catKey of sortedKeys) {
        const teile = gruppen[catKey];
        const istOffen = offeneKategorien.has(catKey);
        const uTitel = t18[catKey] || catKey;
        const safeKey = escapeAttr(catKey);
        const total = teile.length;
        const selInCat = teile.filter(t => selectedTeile.has(t.originalIndex)).length;
        const countLabel = selInCat > 0 ? `${selInCat}/${total}` : `${total}`;
        const countActive = selInCat > 0 ? 'active' : '';

        let html = `<article class="category-box ${istOffen ? '' : 'collapsed'}">
            <header class="category-header" data-action="toggle-cat" data-cat="${safeKey}">
                <div class="header-left">
                    <span class="chevron">▾</span>
                    <span class="category-dot" aria-hidden="true"></span>
                    <h3>${escapeAttr(uTitel)}</h3>
                </div>
                <div class="header-actions">
                    <span class="cat-count ${countActive}" data-cat="${safeKey}" data-total="${total}">${countLabel}</span>
                    <button class="btn-batch" type="button" data-action="batch-cat" data-cat="${safeKey}">${escapeAttr(t18.btn_batch)}</button>
                </div>
            </header>
            <div class="category-content">`;

        if (catKey === "cat_misc") {
            // Group by sub-category
            const subGroups = {};
            teile.forEach(t => {
                const sk = t.subKey || "sub_other";
                if (!subGroups[sk]) subGroups[sk] = [];
                subGroups[sk].push(t);
            });
            const subOrder = ["sub_paint", "sub_exhaust", "sub_badges", "sub_lights_ext", "sub_lights_int", "sub_interior", "sub_decor", "sub_other"];
            const subKeys = subOrder.filter(k => subGroups[k] && subGroups[k].length > 0);

            for (const subKey of subKeys) {
                const subParts = subGroups[subKey];
                const subTitel = t18[subKey] || subKey;
                const subOffen = offeneSubKategorien.has(`${catKey}:${subKey}`);
                const subTotal = subParts.length;
                const subSel = subParts.filter(t => selectedTeile.has(t.originalIndex)).length;
                const subCountLabel = subSel > 0 ? `${subSel}/${subTotal}` : `${subTotal}`;
                const subCountActive = subSel > 0 ? 'active' : '';
                const subSelClass = subSel > 0 ? 'has-selection' : '';

                html += `<div class="sub-cat-box ${subOffen ? '' : 'collapsed'} ${subSelClass}">
                    <header class="sub-cat-header" data-action="toggle-sub" data-cat="${safeKey}" data-sub="${escapeAttr(subKey)}">
                        <div class="header-left">
                            <span class="sub-chevron">▾</span>
                            <span class="sub-cat-dot" aria-hidden="true"></span>
                            <h4>${escapeAttr(subTitel)}</h4>
                        </div>
                        <div class="header-actions">
                            <span class="sub-cat-count ${subCountActive}" data-cat="${safeKey}" data-sub="${escapeAttr(subKey)}" data-total="${subTotal}">${subCountLabel}</span>
                            <button class="btn-batch-mini" type="button" data-action="batch-sub" data-cat="${safeKey}" data-sub="${escapeAttr(subKey)}">${escapeAttr(t18.btn_batch_sub)}</button>
                        </div>
                    </header>
                    <div class="sub-cat-content">`;

                buildDisambiguatedNames(subParts).forEach(({ t, name }) => {
                    html += buildPartItemHtml(t, name);
                });

                html += `</div></div>`;
            }
        } else {
            // Flat rendering for cat_exterior / cat_addons / cat_wheels
            buildDisambiguatedNames(teile).forEach(({ t, name }) => {
                html += buildPartItemHtml(t, name);
            });
        }

        html += `</div></article>`;
        db.innerHTML += html;
    }

    wireDashboardEvents();
}

function wireDashboardEvents() {
    // Top-cat header click
    document.querySelectorAll('[data-action="toggle-cat"]').forEach(el => {
        el.addEventListener('click', function (e) {
            // Don't toggle when clicking on header-actions or its children
            if (e.target.closest('.header-actions')) return;
            toggleKategorie(this.getAttribute('data-cat'));
        });
    });

    // Sub-cat header click
    document.querySelectorAll('[data-action="toggle-sub"]').forEach(el => {
        el.addEventListener('click', function (e) {
            if (e.target.closest('.header-actions')) return;
            toggleSubKategorie(this.getAttribute('data-cat'), this.getAttribute('data-sub'));
        });
    });

    // Top-cat "Alle färben"
    document.querySelectorAll('[data-action="batch-cat"]').forEach(el => {
        el.addEventListener('click', function (e) {
            e.stopPropagation();
            oeffneBatchPicker(this.getAttribute('data-cat'));
        });
    });

    // Sub-cat "Alle"
    document.querySelectorAll('[data-action="batch-sub"]').forEach(el => {
        el.addEventListener('click', function (e) {
            e.stopPropagation();
            oeffneSubBatchPicker(this.getAttribute('data-cat'), this.getAttribute('data-sub'));
        });
    });

    // Color preview click
    document.querySelectorAll('[data-action="open-picker"]').forEach(el => {
        el.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-idx'), 10);
            const name = this.getAttribute('data-name') || "";
            oeffnePicker(idx, name);
        });
    });

    // Checkbox change
    document.querySelectorAll('.part-check').forEach(cb => {
        cb.addEventListener('change', function () {
            const idx = parseInt(this.getAttribute('data-idx'), 10);
            toggleTeilAuswahl(idx, this.checked);
        });
        cb.addEventListener('click', function (e) { e.stopPropagation(); });
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
    document.getElementById('hexInput').value = hex.toUpperCase();
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
    renderPalettes();
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

function oeffneSubBatchPicker(catKey, subKey) {
    pickerModus = "subcategory";
    batchKategorie = catKey;
    batchSubKategorie = subKey;
    const t = geladeneTeile.find(x => x.catKey === catKey && x.subKey === subKey);
    if (!t) return;
    const subName = translations[currentLang][subKey] || subKey;
    presetModal(t, translations[currentLang].batch_title(subName));
}

function oeffneSelectionPicker() {
    if (selectedTeile.size === 0) return;
    pickerModus = "selection";
    const firstIdx = selectedTeile.values().next().value;
    const t = geladeneTeile[firstIdx];
    presetModal(t, translations[currentLang].selection_title(selectedTeile.size));
}

function applyHexToModal(hex) {
    if (!isValidHex(hex)) return;
    hex = normalizeHex(hex);
    const c = hexToRgb(hex);
    document.getElementById('sliderR').value = c.r;
    document.getElementById('sliderG').value = c.g;
    document.getElementById('sliderB').value = c.b;
    updateModalAnzeige(true);
}

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

document.getElementById('hexInput').addEventListener('change', function () {
    if (isValidHex(this.value)) {
        applyHexToModal(this.value);
    } else {
        const r = document.getElementById('sliderR').value;
        const g = document.getElementById('sliderG').value;
        const b = document.getElementById('sliderB').value;
        this.value = ("#" + compToHex(r) + compToHex(g) + compToHex(b)).toUpperCase();
    }
});

document.getElementById('hexInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') this.blur();
});

document.getElementById('btnCancel').addEventListener('click', closeModal);
document.getElementById('btnModalClose').addEventListener('click', closeModal);

document.getElementById('customColorModal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const m = document.getElementById('customColorModal');
        const fm = document.getElementById('favNameModal');
        if (!fm.hidden) closeFavNameModal();
        else if (!m.hidden) closeModal();
        hideContextMenu();
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
    } else if (pickerModus === "subcategory") {
        geladeneTeile.filter(t => t.catKey === batchKategorie && t.subKey === batchSubKategorie).forEach(upd);
    } else if (pickerModus === "selection") {
        selectedTeile.forEach(idx => upd(geladeneTeile[idx]));
    } else {
        upd(geladeneTeile[aktuellesTeilIndex]);
    }
    addToRecents(hex);
    closeModal();
    renderDashboard();
});

document.getElementById('btnSelectAll').addEventListener('click', selectAllParts);
document.getElementById('btnClearSelection').addEventListener('click', clearSelection);
document.getElementById('btnPaintSelection').addEventListener('click', oeffneSelectionPicker);

/* =========================================
   Favorites & recents (localStorage)
   ========================================= */
function loadFavorites() {
    try {
        const raw = localStorage.getItem(STORAGE_FAV);
        favorites = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(favorites)) favorites = [];
    } catch (e) { favorites = []; }
}
function saveFavorites() {
    try { localStorage.setItem(STORAGE_FAV, JSON.stringify(favorites)); } catch (e) {}
}
function loadRecents() {
    try {
        const raw = localStorage.getItem(STORAGE_REC);
        recents = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(recents)) recents = [];
    } catch (e) { recents = []; }
}
function saveRecents() {
    try { localStorage.setItem(STORAGE_REC, JSON.stringify(recents)); } catch (e) {}
}

function addToRecents(hex) {
    hex = normalizeHex(hex);
    recents = recents.filter(r => normalizeHex(r.hex) !== hex);
    recents.unshift({ hex: hex, ts: Date.now() });
    if (recents.length > MAX_RECENTS) recents = recents.slice(0, MAX_RECENTS);
    saveRecents();
}

function renderPalettes() {
    const favGrid = document.getElementById('favoritesGrid');
    const favEmpty = document.getElementById('favoritesEmpty');
    favGrid.innerHTML = "";
    if (favorites.length === 0) {
        favEmpty.hidden = false;
    } else {
        favEmpty.hidden = true;
        favorites.forEach((f, i) => {
            const sw = document.createElement('div');
            sw.className = 'swatch';
            if (f.name) sw.classList.add('has-name');
            sw.style.backgroundColor = f.hex;
            sw.title = f.name ? `${f.name} · ${f.hex}` : f.hex;
            sw.addEventListener('click', () => applyHexToModal(f.hex));
            sw.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                showContextMenu(e.clientX, e.clientY, i);
            });
            favGrid.appendChild(sw);
        });
    }

    const recGrid = document.getElementById('recentsGrid');
    const recEmpty = document.getElementById('recentsEmpty');
    recGrid.innerHTML = "";
    if (recents.length === 0) {
        recEmpty.hidden = false;
    } else {
        recEmpty.hidden = true;
        recents.forEach(r => {
            const sw = document.createElement('div');
            sw.className = 'swatch';
            sw.style.backgroundColor = r.hex;
            sw.title = r.hex;
            sw.addEventListener('click', () => applyHexToModal(r.hex));
            recGrid.appendChild(sw);
        });
    }
}

document.querySelectorAll('.palette-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const pane = this.getAttribute('data-pane');
        activePalettePane = pane;
        document.querySelectorAll('.palette-tab').forEach(t => t.classList.toggle('active', t === this));
        document.getElementById('paneFavorites').hidden = pane !== 'favorites';
        document.getElementById('paneRecents').hidden = pane !== 'recents';
    });
});

document.getElementById('btnFavoriteCurrent').addEventListener('click', function () {
    const r = parseInt(document.getElementById('sliderR').value);
    const g = parseInt(document.getElementById('sliderG').value);
    const b = parseInt(document.getElementById('sliderB').value);
    const hex = ("#" + compToHex(r) + compToHex(g) + compToHex(b)).toUpperCase();
    openFavNameModal(hex);
});

function openFavNameModal(hex) {
    pendingFavHex = hex;
    document.getElementById('favPreviewSwatch').style.backgroundColor = hex;
    document.getElementById('favPreviewHex').textContent = hex;
    document.getElementById('favNameInput').value = "";
    const m = document.getElementById('favNameModal');
    m.hidden = false;
    requestAnimationFrame(() => {
        m.classList.add('active');
        document.getElementById('favNameInput').focus();
    });
}
function closeFavNameModal() {
    const m = document.getElementById('favNameModal');
    m.classList.remove('active');
    setTimeout(() => { m.hidden = true; }, 220);
    pendingFavHex = null;
}

document.getElementById('btnFavCancel').addEventListener('click', closeFavNameModal);
document.getElementById('favNameModal').addEventListener('click', function (e) {
    if (e.target === this) closeFavNameModal();
});
document.getElementById('btnFavSave').addEventListener('click', function () {
    if (!pendingFavHex) return;
    const name = document.getElementById('favNameInput').value.trim();
    favorites.unshift({ hex: pendingFavHex, name: name, ts: Date.now() });
    saveFavorites();
    renderPalettes();
    closeFavNameModal();
});
document.getElementById('favNameInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') document.getElementById('btnFavSave').click();
});

function showContextMenu(x, y, idx) {
    ctxTargetIdx = idx;
    const menu = document.getElementById('favContextMenu');
    menu.hidden = false;
    const w = 160, h = 80;
    const px = Math.min(x, window.innerWidth - w - 8);
    const py = Math.min(y, window.innerHeight - h - 8);
    menu.style.left = px + 'px';
    menu.style.top = py + 'px';
}
function hideContextMenu() {
    document.getElementById('favContextMenu').hidden = true;
    ctxTargetIdx = null;
}
document.addEventListener('click', function (e) {
    if (!e.target.closest('#favContextMenu')) hideContextMenu();
});

document.getElementById('ctxRename').addEventListener('click', function () {
    if (ctxTargetIdx === null) return;
    const fav = favorites[ctxTargetIdx];
    const newName = prompt(translations[currentLang].prompt_rename, fav.name || "");
    if (newName !== null) {
        fav.name = newName.trim();
        saveFavorites();
        renderPalettes();
    }
    hideContextMenu();
});

document.getElementById('ctxDelete').addEventListener('click', function () {
    if (ctxTargetIdx === null) return;
    favorites.splice(ctxTargetIdx, 1);
    saveFavorites();
    renderPalettes();
    hideContextMenu();
});

/* =========================================
   Download — keeps the original filename
   ========================================= */
document.getElementById('btnDownload').addEventListener('click', function () {
    let out = originalBloecke.join('}');

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
loadFavorites();
loadRecents();
setLanguage(currentLang);
updateSelectionBar();
