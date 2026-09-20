const albums = [
  {
    category: "FESTIVAL STADIUM SERIES",
    title: "Summer Music Concert",
    description:
      "Unbridled open-air energy, festival illumination towers, and ecstatic crowd transcendence at apex volume.",
    location: "AUSTIN, TX",
    plates: "48 PLATES",
    year: "2024",
    alt: "An expansive summer outdoor music festival stage engulfed in intense mint green and electric blue stadium lighting beams with tens of thousands of audience hands reaching upward in silhouettes against billowing smoke and stage pyro.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkwef5_jrt1Gu-1r3_k3V88iRnGHwZ5UFDk5XFkNNPaMgtTuO1B1YPAKK7Br7biSibX4G4lAjXGoHA4eXTsE1xGTa3UeBpC5augKK2QtQr-WvS1_pKHKzWQkbLlolCY9fWtRf3f-RP4V7wYWBs4bOZatMwpsY_-5UO0caMkuDYj0Uk2OxyvsxATmNDiLLARvsA4Q6pm18hpR7Wlprh1baUyCXejGfa6LIawwLhW0KI-MLUDaHs-DE",
  },
  {
    category: "SUB-TERRA MONOGRAPH",
    title: "Neon Underground Rave",
    description:
      "Heavy concrete vaults, 145 BPM laser trails, and sub-bass resonance caught across midnight Berlin dancefloors.",
    location: "BERLIN, DE",
    plates: "64 PLATES",
    year: "2024",
    alt: "An industrial concrete techno bunker warehouse in Berlin lit with rapid cyan and acid green strobe light trails, blurred dancing figures in motion, and heavy smoke haze creating an authentic raw underground rave atmosphere.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1OE-TUN8X0SPjW0n56fstJCZGpEm-DVJF4sEx3KdC84nu2Dhxg_8JVTAoJJrq8-RVcyk3ZcvCKi5nUOkI9czVEegcLOBcalvygw3dBYptMvqp-O9kluB9o92PrNeUNdRNLVxIc3EyHfKj6YQqB-1cVgOVTz3kIif77ZZacIfhtZQp-Ngd_w-40oLJo-lnc8usSWr5BjFfCiIjVpwnvxS1_VTPa405p4xdC32OQ2soKrgEQR32Mhc",
  },
  {
    category: "ACOUSTIC RETROSPECTIVE",
    title: "Echoes in the Valley",
    description:
      "Folk nuances captured at golden hour dusk, featuring acoustic harmonics and pastoral stage ambiance.",
    location: "BIG SUR, CA",
    plates: "32 PLATES",
    year: "2023",
    alt: "An intimate outdoor twilight acoustic folk concert in a rustic mountain amphitheater with warm amber lantern glow reflecting against performers and subtle teal dusk sky in background with a calm mesmerized audience.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjWYY4QHgRPcQjBsRdPwbrlFmg5zgJgj0W5hltpKSBI2oTwURSeALSXeA8_GQyLrH0LpMwbsubnJVSxJI5E8edMyFtwxtImsuwKXVGfi_N7KaZ2UB5k-j0SxGY_U8_0-aayAGGaURczIHhgSxISJ_oyggHodhFhfEHsnt7B-tqLre0PaYa-FjBnGOkLt_LJWW3U2pu7AwWo94TumG5h5Dh_Xdi2BxygmAfhQSOFoeK5z-mDpyEmrQ",
  },
  {
    category: "STADIUM VISUALS",
    title: "Apex Electronic Arena",
    description:
      "Pyro bursts, monumental synth-wave lighting towers, and synchronized electronic adrenaline.",
    location: "TOKYO, JP",
    plates: "80 PLATES",
    year: "2024",
    alt: "Massive stadium electronic music production featuring vertical flame cannons shooting into the dark night sky, modular LED video walls glowing with cyan geometry, and a silhouette DJ figure elevated on a futuristic pedestal.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAklTDHAf_rPsD9BdZq0uOzYgGdHYTnM6dYdFxJNlYmt_Bo15wAeFqyGfEnYKbyUxEBpYsCsCDZkrTX8SKsZgKcU9QtgNgovBM7hSJTdLpxPBOjTMkkTBh2jCUl77KlF_YPTm7KfsffIS--FI0gOk-Veve5aqo_XLnwiSGBKMgqy8rb_MM-0_Tq2_Nyoi4qgmQFGkMjE7C-0x6IgoSwxmTK4DOysWUxNXuWZhV-JrUS1A6tvfRB_0Q",
  },
  {
    category: "DOCUMENTARY POLAROIDS",
    title: "Backstage Chronicles",
    description:
      "Unscripted pre-show anticipation, cigarette smoke, and private dressing-room rituals captured on pushed monochrome film.",
    location: "LONDON, UK",
    plates: "42 PLATES",
    year: "2023",
    alt: "Grainy high-contrast black and white documentary portrait taken backstage in a chaotic green room dressing room, showing musicians tuning vintage guitars and laughing before taking the main concert stage.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAuxevJpTVsQsS6X65IxYpjJ54OfRiqMwLTjR4emxDBk5QSyqGoB6gG1zghOAJkpnS3fcDY3hby94nw7HbYV2jZ5r9hgkfXc8GDFUPituPFIN-jWGpl3csG94TxCRr6jvyxVVMkJJIZNt6-hPzxhFabjAQ8l-fSSUfjqmOrixbi3ta4WqOAun3wFz7e7PvGk3xk3It-0O2V4veVVPvXuNK48U9I8Rla_OuhN6EHefy0ym-cV2dbaM",
  },
  {
    category: "JAZZ & BLUES QUARTET",
    title: "Velvet Lounge Sessions",
    description:
      "Subterranean brass reflections, smoky candlelight, and nuanced acoustic warmth in historic basement clubs.",
    location: "NEW ORLEANS, LA",
    plates: "28 PLATES",
    year: "2023",
    alt: "Moody cinematic shot of a brass saxophone player reflecting warm stage spotlights in an intimate subterranean jazz club with velvet textures, dark teal atmospheric shadows, and wine glasses on candlelit small tables.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgFAbOBBN-kZ05p9Naw4R_vu2sdMBo6-wuyO4EoiC1F87YPcXdqF7k8qmJfCMle40WgvPu1SlceLSZFQAmISwoyXwS1g0nxfIU9GEGHxfdJ_AEFGS3jUgbY4HMWI8vRabq8p9agls7SpamgKbSX1LowxDFz0YnLseLTCrOVrFU0aFWXZFtMymh_LeBVbHiNKsygRXrjZuHTihcNbLdF7pWH6QCgMlLecp5r8yPpg6opYLrdASqP_A",
  },
];

export default function AlbumsGrid() {
  return (
    <section
      id="portfolio"
      className="px-margin-mobile md:px-margin-desktop py-space-2xl md:py-space-3xl max-w-[1600px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl border-b border-outline-variant/40 pb-space-md gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-primary-container"></span>
            <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
              ARCHIVAL EXHIBITIONS
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary-container uppercase tracking-tight">
            SELECTED EXHIBITIONS &amp; ALBUMS
          </h2>
        </div>
        <div className="text-label-md font-label-md text-on-surface-variant flex items-center gap-2">
          <span>INDEX: 01 — 06</span>
          <span className="text-primary-container font-bold">
            / COMPLETE ARCHIVE
          </span>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album) => (
          <article
            key={album.title}
            className="card-group relative flex flex-col bg-surface-container-low border border-outline-variant/30 hover:border-primary-container/70 transition-all duration-200"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-lowest">
              <img
                className="w-full h-full object-cover img-desat"
                alt={album.alt}
                src={album.src}
              />
              <div className="absolute top-3 left-3 bg-surface/90 px-2.5 py-1 border border-outline-variant/40 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary-container"></span>
                <span className="text-label-sm font-label-sm text-on-surface tracking-wider uppercase">
                  {album.plates}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-surface/90 px-2 py-0.5 border border-outline-variant/30 text-label-sm font-label-sm text-primary-container font-mono">
                {album.year}
              </div>
            </div>
            <div className="p-space-md flex flex-col justify-between flex-grow">
              <div>
                <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase mb-1 block">
                  {album.category}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs font-semibold group-hover:text-primary-container transition-colors">
                  {album.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  {album.description}
                </p>
              </div>
              <div className="pt-space-sm mt-space-sm border-t border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary-container">
                    location_on
                  </span>
                  {album.location}
                </span>
                <span className="text-primary-container tracking-wider uppercase hover:underline flex items-center gap-1 font-semibold">
                  VIEW SERIES →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
