#!/usr/bin/env python3
"""
DS-1 PDR programmatic figures — matplotlib generators.

Produces seven figures (F-2.4, F-3.1, F-3.2, F-4.2, F-5.3, F-6.2, F-6.3) for the
DS-1 engineering specification. Palette and style follow docs/appendix-D2-figure-prompts.md
§D2.7. Data values are pulled directly from the spec — any change here must
propagate to docs/01-design-basis.md and the relevant subsystem document.

Run from this directory:
    python3 F-figures.py

Outputs land in ../  (i.e. docs/figures/F-*.png and .svg) at 300 dpi.

Source: docs/appendix-D2-figure-prompts.md §D2.6
"""

from __future__ import annotations

import os
from pathlib import Path

import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np

PALETTE = {
    "bg":       "#0a0e1a",
    "panel":    "#11151f",
    "amber":    "#f5a623",
    "cream":    "#f0e6d2",
    "white":    "#ffffff",
    "cyan":     "#4ec9b0",
    "red":      "#e74c3c",
    "green":    "#2ecc71",
    "text_dim": "#6d7380",
}

mpl.rcParams.update({
    "figure.facecolor":  PALETTE["bg"],
    "axes.facecolor":    PALETTE["bg"],
    "axes.edgecolor":    PALETTE["amber"],
    "axes.labelcolor":   PALETTE["cream"],
    "axes.titlecolor":   PALETTE["white"],
    "axes.titleweight":  "bold",
    "axes.titlesize":    11,
    "axes.labelsize":    9,
    "axes.grid":         True,
    "grid.color":        PALETTE["text_dim"],
    "grid.alpha":        0.25,
    "grid.linestyle":    ":",
    "xtick.color":       PALETTE["cream"],
    "ytick.color":       PALETTE["cream"],
    "xtick.labelsize":   8,
    "ytick.labelsize":   8,
    "text.color":        PALETTE["cream"],
    "legend.facecolor":  PALETTE["panel"],
    "legend.edgecolor":  PALETTE["amber"],
    "legend.labelcolor": PALETTE["cream"],
    "legend.fontsize":   8,
    "font.family":       "monospace",
    "font.size":         9,
    "savefig.dpi":       300,
    "savefig.bbox":      "tight",
    "savefig.facecolor": PALETTE["bg"],
})

OUT = Path(__file__).resolve().parent.parent  # docs/figures/


def _figure_id(ax, fid: str) -> None:
    """Stamp the figure ID in the bottom-right corner per D2.3 frame spec."""
    ax.figure.text(
        0.99, 0.01, fid,
        ha="right", va="bottom",
        color=PALETTE["cream"], fontsize=7,
        family="monospace",
    )


def _save(fig, fid: str) -> None:
    fig.savefig(OUT / f"{fid}.png")
    fig.savefig(OUT / f"{fid}.svg")
    plt.close(fig)
    print(f"  wrote {fid}.png + {fid}.svg")


# ============================================================================
# F-2.4 — Thermal gradient across sun/shade terminator
# ============================================================================
def fig_2_4() -> None:
    angles = np.array([0, 30, 60, 90, 120, 150, 180])
    temps  = np.array([390, 350, 280, 200, 140, 100, 70])

    fig, ax = plt.subplots(figsize=(8, 5))
    ax.plot(angles, temps, color=PALETTE["amber"], linewidth=2,
            marker="o", markerfacecolor=PALETTE["amber"],
            markeredgecolor=PALETTE["white"], markersize=6)
    ax.fill_between(angles, temps, 0, color=PALETTE["amber"], alpha=0.10)

    ax.axvline(90, color=PALETTE["cyan"], linestyle="--", alpha=0.6, linewidth=1)
    ax.text(91, 380, "TERMINATOR", color=PALETTE["cyan"], fontsize=8, va="top")

    # ΔT bracket
    ax.annotate("", xy=(15, 70), xytext=(15, 390),
                arrowprops=dict(arrowstyle="<->", color=PALETTE["red"], lw=1.5))
    ax.text(20, 230, "ΔT ≈ 320 K\nα·L·ΔT ≈ 360 m\ndifferential expansion",
            color=PALETTE["red"], fontsize=8, va="center")

    ax.set_xlim(0, 180)
    ax.set_ylim(0, 450)
    ax.set_xticks([0, 30, 60, 90, 120, 150, 180])
    ax.set_xlabel("ANGULAR POSITION FROM SUB-SOLAR POINT  (deg)")
    ax.set_ylabel("HULL TEMPERATURE  (K)")
    ax.set_title("F-2.4  HULL THERMAL GRADIENT — SUN-SIDE TO DEEP SHADOW")

    _figure_id(ax, "F-2.4")
    _save(fig, "F-2.4")


# ============================================================================
# F-3.1 — Reactor specific-energy vs required fuel-mass per shot (log-log)
# ============================================================================
def fig_3_1() -> None:
    # (label, specific energy J/kg, fuel mass per shot kg, color)
    data = [
        ("Li-ion battery",     1.0e6,  2.24e26, PALETTE["red"]),
        ("Supercapacitor",     3.6e4,  6.2e27,  PALETTE["red"]),
        ("D-T fusion",         3.4e14, 6.6e17,  PALETTE["amber"]),
        ("p-¹¹B fusion",       7.0e13, 3.2e18,  PALETTE["amber"]),
        ("Antimatter",         9.0e16, 2.5e15,  PALETTE["green"]),
        ("Hypermatter (canon)", 9.0e16, 2.5e15, PALETTE["cyan"]),
    ]

    fig, ax = plt.subplots(figsize=(9, 6))

    for label, se, mass, color in data:
        ax.scatter(se, mass, s=160, color=color,
                   edgecolor=PALETTE["white"], linewidth=1.5, zorder=5)
        # Offset hypermatter label downward to avoid antimatter overlap
        dy = -0.18 if label.startswith("Hypermatter") else 0.08
        ax.annotate(label, (se, mass),
                    xytext=(8, 12 if dy > 0 else -16), textcoords="offset points",
                    color=PALETTE["cream"], fontsize=8)

    # c² reference line
    c2 = 9.0e16
    ax.axvline(c2, color=PALETTE["cyan"], linestyle="--", linewidth=1, alpha=0.7)
    ax.text(c2 * 1.15, 1e26, "c² = 9 × 10¹⁶ J/kg",
            color=PALETTE["cyan"], fontsize=8, rotation=90, va="top")

    # station-mass reference
    station_mass = 1.0e18
    ax.axhline(station_mass, color=PALETTE["red"], linestyle=":",
               linewidth=1, alpha=0.7)
    ax.text(1e3, station_mass * 1.6, "DS-1 station mass = 1.0 × 10¹⁸ kg",
            color=PALETTE["red"], fontsize=8)

    # Callout
    ax.text(0.02, 0.04,
            "Only c²-class storage closes the gap.\nLi-ion / supercaps require >100× station mass per shot.",
            transform=ax.transAxes, color=PALETTE["amber"],
            fontsize=8, family="monospace",
            bbox=dict(facecolor=PALETTE["panel"], edgecolor=PALETTE["amber"], pad=6))

    ax.set_xscale("log")
    ax.set_yscale("log")
    ax.set_xlim(1e3, 1e18)
    ax.set_ylim(1e14, 1e29)
    ax.set_xlabel("SPECIFIC ENERGY  (J/kg)")
    ax.set_ylabel("FUEL MASS REQUIRED PER 2.24 × 10³² J SHOT  (kg)")
    ax.set_title("F-3.1  REACTOR SPECIFIC-ENERGY vs REQUIRED FUEL MASS")

    _figure_id(ax, "F-3.1")
    _save(fig, "F-3.1")


# ============================================================================
# F-3.2 — Hull radiated power vs temperature (Stefan-Boltzmann)
# ============================================================================
def fig_3_2() -> None:
    sigma = 5.670374419e-8       # Stefan-Boltzmann constant
    A_s = 4.52e10                # m² — DS-1 hull surface area at 120 km D
    T = np.linspace(100, 6000, 600)
    P = sigma * T**4 * A_s

    fig, ax = plt.subplots(figsize=(9, 6))
    ax.plot(T, P, color=PALETTE["amber"], linewidth=2)

    # Required-rejection line: 2.24e32 J / 86400 s ≈ 2.6e27 W (per-shot mean)
    P_req = 2.24e32 / 86400
    ax.axhline(P_req, color=PALETTE["red"], linestyle="--", linewidth=1.5)
    ax.text(120, P_req * 1.6,
            f"REQUIRED 24-h MEAN REJECTION = {P_req:.2e} W",
            color=PALETTE["red"], fontsize=8)

    # Temperature reference lines
    refs = [
        (300,  "AMBIENT 300 K",         PALETTE["cyan"]),
        (1000, "STRUCTURAL CEILING 1000 K", PALETTE["cyan"]),
        (2500, "TUNGSTEN MELT 2500 K",  PALETTE["amber"]),
        (5800, "SOLAR EFFECTIVE 5800 K", PALETTE["amber"]),
    ]
    for Tr, lbl, col in refs:
        ax.axvline(Tr, color=col, linestyle=":", linewidth=1, alpha=0.6)
        ax.text(Tr * 1.04, 1e8, lbl, color=col, fontsize=7,
                rotation=90, va="bottom")

    # Hatched "achievable region" ≤ 1000 K
    ax.axvspan(100, 1000, color=PALETTE["green"], alpha=0.07,
               hatch="//", edgecolor=PALETTE["green"])
    ax.text(180, 1e26, "STRUCTURAL\nLIMIT", color=PALETTE["green"],
            fontsize=8, family="monospace")

    ax.set_xscale("log")
    ax.set_yscale("log")
    ax.set_xlim(100, 6000)
    ax.set_ylim(1e8, 1e30)
    ax.set_xlabel("HULL TEMPERATURE  T  (K)")
    ax.set_ylabel("RADIATED POWER  P = σ T⁴ A_s  (W)   [A_s = 4.52 × 10¹⁰ m²]")
    ax.set_title("F-3.2  HULL RADIATED POWER vs TEMPERATURE  —  STEFAN-BOLTZMANN")

    _figure_id(ax, "F-3.2")
    _save(fig, "F-3.2")


# ============================================================================
# F-4.2 — Beam intensity at aperture vs material LIDT (log-x bars)
# ============================================================================
def fig_4_2() -> None:
    items = [
        ("Fused silica LIDT",       1.0e9,  PALETTE["green"]),
        ("KDP LIDT",                5.0e9,  PALETTE["green"]),
        ("NIF final-optic limit",   3.0e10, PALETTE["amber"]),
        ("Sapphire LIDT",           5.0e10, PALETTE["amber"]),
        ("Superlaser aperture",     2.85e20, PALETTE["red"]),
    ]
    labels = [it[0] for it in items]
    values = [it[1] for it in items]
    colors = [it[2] for it in items]

    fig, ax = plt.subplots(figsize=(9, 5))
    y = np.arange(len(items))
    ax.barh(y, values, color=colors, edgecolor=PALETTE["white"], linewidth=1)
    ax.set_yticks(y)
    ax.set_yticklabels(labels)
    ax.set_xscale("log")
    ax.set_xlim(1e8, 1e22)
    ax.set_xlabel("INTENSITY  (W/cm²)")
    ax.set_title("F-4.2  BEAM INTENSITY AT APERTURE vs MATERIAL DAMAGE THRESHOLD")

    # Value labels next to each bar
    for yi, v in zip(y, values):
        ax.text(v * 1.5, yi, f"{v:.2e}", va="center",
                color=PALETTE["cream"], fontsize=8)

    # Hatched "refractive-impossible" region
    ax.axvspan(5e10, 1e22, color=PALETTE["red"], alpha=0.06,
               hatch="\\\\", edgecolor=PALETTE["red"])
    ax.text(2e15, 0.25, "REFRACTIVE-IMPOSSIBLE",
            color=PALETTE["red"], fontsize=8, ha="center")
    ax.text(2e15, -0.25, "GAP = 10¹⁰ ORDERS",
            color=PALETTE["red"], fontsize=9, ha="center", fontweight="bold")

    _figure_id(ax, "F-4.2")
    _save(fig, "F-4.2")


# ============================================================================
# F-5.3 — Lentz-soliton scaling: field energy vs bubble size
# ============================================================================
def fig_5_3() -> None:
    # Anchor points from spec.
    # Use Lentz's 200-m / c reference at ~1.8e46 J ≈ 0.1 M_sun rest energy,
    # plus DS-1 anchor at 10^45 J for a 120-km bubble (per docs/05-propulsion.md).
    # Power-law fit between these anchors yields a useful illustrative curve.
    R = np.logspace(np.log10(50), np.log10(2e5), 300)  # 50 m to 200 km
    R_a, E_a = 200,    1.8e46
    R_b, E_b = 1.2e5,  1.0e45
    n = np.log(E_b / E_a) / np.log(R_b / R_a)
    E = E_a * (R / R_a) ** n

    fig, ax = plt.subplots(figsize=(9, 5.5))
    ax.plot(R, E, color=PALETTE["amber"], linewidth=2,
            label=f"interpolated scaling  E ∝ R^{n:+.2f}")

    # Anchor markers
    ax.scatter([R_a], [E_a], s=120, color=PALETTE["red"],
               edgecolor=PALETTE["white"], linewidth=1.5, zorder=5,
               label="Lentz 2021 anchor: 200 m, c, 0.1 M☉")
    ax.scatter([R_b], [E_b], s=120, color=PALETTE["cyan"],
               edgecolor=PALETTE["white"], linewidth=1.5, zorder=5,
               label="DS-1 spec anchor: 120 km, ~10⁴⁵ J")

    # Reference: 0.1 M_sun rest energy
    ax.axhline(1.8e46, color=PALETTE["red"], linestyle=":", linewidth=1)
    ax.text(60, 2.5e46, "0.1 M☉ rest-energy = 1.8 × 10⁴⁶ J",
            color=PALETTE["red"], fontsize=8)

    # Voyager-mass-equivalent-energy marker (White 2011 illustrative)
    voyager_E = 722 * 9e16
    ax.axhline(voyager_E, color=PALETTE["green"], linestyle=":", linewidth=1)
    ax.text(60, voyager_E * 0.4,
            f"Voyager-mass equivalent (722 kg × c²) = {voyager_E:.1e} J",
            color=PALETTE["green"], fontsize=8)

    ax.set_xscale("log")
    ax.set_yscale("log")
    ax.set_xlabel("WARP-BUBBLE DIAMETER  R  (m)")
    ax.set_ylabel("REQUIRED FIELD ENERGY  E  (J)")
    ax.set_title("F-5.3  LENTZ-CLASS SOLITON SCALING — FIELD ENERGY vs BUBBLE SIZE")
    ax.legend(loc="lower right")

    _figure_id(ax, "F-5.3")
    _save(fig, "F-5.3")


# ============================================================================
# F-6.2 — Internal transit mode comparison (great-circle 188 km)
# ============================================================================
def fig_6_2() -> None:
    # Times in minutes — converted from D2.6 hours / minutes.
    items = [
        ("Walk (5 km/h)",                    37.7 * 60),
        ("Turbolift (50 km/h)",              3.76 * 60),
        ("Officer monorail (150 km/h)",      1.25 * 60),
        ("Hyperloop (Mach 5 ≈ 6,120 km/h)",  3.07),
    ]
    labels = [it[0] for it in items]
    times  = [it[1] for it in items]
    colors = [PALETTE["red"], PALETTE["amber"], PALETTE["cyan"], PALETTE["green"]]

    fig, ax = plt.subplots(figsize=(9, 5))
    y = np.arange(len(items))
    ax.barh(y, times, color=colors, edgecolor=PALETTE["white"], linewidth=1)
    ax.set_yticks(y)
    ax.set_yticklabels(labels)
    ax.set_xscale("log")
    ax.set_xlabel("END-TO-END TRANSIT TIME  (minutes, log scale)")
    ax.set_title("F-6.2  INTERNAL TRANSIT — 188 km GREAT-CIRCLE ARC")

    for yi, t in zip(y, times):
        if t >= 60:
            label = f"{t:.0f} min  ({t/60:.1f} h)"
        else:
            label = f"{t:.2f} min"
        ax.text(t * 1.15, yi, label, va="center",
                color=PALETTE["cream"], fontsize=8)

    ax.set_xlim(1, 5000)

    _figure_id(ax, "F-6.2")
    _save(fig, "F-6.2")


# ============================================================================
# F-6.3 — Hangar volumetric allocation
# ============================================================================
def fig_6_3() -> None:
    items = [
        ("TIE/ln + Interceptor + Bomber", 2.3e7),
        ("Assault shuttles",              1.8e7),
        ("AT-AT / AT-ST walkers",         2.0e7),
        ("Dropships",                     0.5e7),
        ("Strike cruisers",               0.4e7),
    ]
    labels = [it[0] for it in items]
    values = [it[1] for it in items]
    colors = [PALETTE["amber"], PALETTE["cyan"], PALETTE["green"],
              PALETTE["cream"], PALETTE["red"]]
    total = sum(values)
    station_volume = 9.05e14  # m³, DS-1
    fraction_pct = 100 * total / station_volume

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 5.5),
                                   gridspec_kw={"width_ratios": [1, 1.2]})

    # Pie chart
    wedges, _ = ax1.pie(values, colors=colors, startangle=90,
                        wedgeprops=dict(edgecolor=PALETTE["bg"], linewidth=2))
    ax1.set_title("F-6.3a  HANGAR VOLUME SHARES")
    ax1.legend(wedges, [f"{l}  {v/1e7:.2f} × 10⁷ m³"
                        for l, v in zip(labels, values)],
               loc="center left", bbox_to_anchor=(1.0, 0.5),
               fontsize=8, frameon=True)

    # Horizontal bar (sorted)
    order = np.argsort(values)[::-1]
    sorted_labels = [labels[i] for i in order]
    sorted_values = [values[i] for i in order]
    sorted_colors = [colors[i] for i in order]
    y = np.arange(len(items))
    ax2.barh(y, sorted_values, color=sorted_colors,
             edgecolor=PALETTE["white"], linewidth=1)
    ax2.set_yticks(y)
    ax2.set_yticklabels(sorted_labels)
    ax2.invert_yaxis()
    ax2.set_xlabel("VOLUME  (m³)")
    ax2.set_title("F-6.3b  HANGAR ALLOCATION (sorted)")
    for yi, v in zip(y, sorted_values):
        ax2.text(v * 1.02, yi, f"{v:.2e}", va="center",
                 color=PALETTE["cream"], fontsize=8)
    ax2.set_xlim(0, max(sorted_values) * 1.4)

    fig.suptitle(
        f"HANGAR FOOTPRINT  {total/1e7:.2f} × 10⁷ m³   "
        f"=  {fraction_pct:.4f}% of station volume  ({station_volume:.2e} m³)",
        color=PALETTE["amber"], fontsize=10, y=0.99,
    )

    _figure_id(ax2, "F-6.3")
    _save(fig, "F-6.3")


# ============================================================================
def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    print(f"Output directory: {OUT}")
    fig_2_4()
    fig_3_1()
    fig_3_2()
    fig_4_2()
    fig_5_3()
    fig_6_2()
    fig_6_3()
    print("Done — 7 figures rendered.")


if __name__ == "__main__":
    main()
