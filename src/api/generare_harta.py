import sys
import folium
import json

json_file_path = sys.argv[1]

with open(json_file_path) as json_file:
    data = json.load(json_file)

coordonate_judete = {
    "ALBA": (46.0667, 23.5833),
    "ARAD": (46.1833, 21.3167),
    "ARGES": (44.9333, 24.8667),
    "BACAU": (46.5667, 26.9),
    "BIHOR": (47.05, 21.9333),
    "BISTRITA-NASAUD": (47.3333, 24.3333),
    "BOTOSANI": (47.75, 26.6667),
    "BRĂILA": (45.2667, 27.9833),
    "BRASOV": (45.75, 25.3333),
    "BUCURESTI": (44.439663, 26.096306),
    "BUZAU": (45.1667, 26.8333),
    "CALARASI": (44.2, 27.3333),
    "CARAS-SEVERIN": (45.0667, 21.9),
    "CLUJ": (46.7667, 23.6),
    "CONSTANTA": (44.1833, 28.65),
    "COVASNA": (45.8667, 26.1667),
    "DAMBOVITA": (44.9333, 25.4333),
    "DOLJ": (44.1, 23.4),
    "GALATI": (45.45, 28.05),
    "GIURGIU": (43.9167, 25.9667),
    "GORJ": (45.0333, 23.2333),
    "HARGHITA": (46.5833, 25.9333),
    "HUNEDOARA": (45.8333, 22.9),
    "IALOMITA": (44.6167, 27.3833),
    "IASI": (47.1667, 27.6),
    "ILFOV": (44.5667, 26.1667),
    "MARAMURES": (47.65, 24.15),
    "MEHEDINTI": (44.6167, 22.6333),
    "MURES": (46.55, 24.6),
    "NEAMT": (47.1667, 26.3333),
    "OLT": (44.8833, 24.8667),
    "PRAHOVA": (44.9333, 26.0167),
    "SATU MARE": (47.8, 22.8833),
    "SALAJ": (47.1833, 23.05),
    "SIBIU": (45.8, 24.15),
    "SUCEAVA": (47.6333, 26.25),
    "TELEORMAN": (44.0667, 25.3333),
    "TIMIS": (45.75, 21.2167),
    "TULCEA": (45.1667, 28.8),
    "VALCEA": (45.1, 24.3667),
    "VASLUI": (46.6333, 27.7333),
    "VRANCEA": (45.7, 27.1833),
}

harta = folium.Map(location=[45.9432, 24.9668], zoom_start=6)

for judet, numar in data.items():
    if judet in coordonate_judete:
        color = "green" if numar < 20 else "orange" if numar < 50 else "red"
        folium.CircleMarker(
            location=coordonate_judete[judet],
            radius=5,
            color="black",
            fill=True,
            fill_color=color,
            fill_opacity=0.7,
        ).add_to(harta)


harta.save("generated_map.html")
