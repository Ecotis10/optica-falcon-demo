/* ============================================================
   CONFIGURACIÓN GENERAL DE LA DEMO
   Cambia estos valores sin tocar el resto del código.
   ============================================================ */

window.FALCON_CONFIG = {
  // Número de WhatsApp con código de país, sin "+", espacios ni guiones.
  // PENDIENTE: poner el número real de la óptica (ej. "584121234567").
  whatsapp: "580000000000",

  // Fecha de la inauguración (hora de Venezuela, UTC-4).
  inauguracion: "2026-10-31T09:00:00-04:00",

  // Fondo del hero:
  //   "gradient" → fondo animado de gradiente (lo que se ve hoy)
  //   "video"    → un video en assets/ que avanza con el scroll
  //   "frames"   → fotogramas sueltos (más fluido en celular). Claude los genera desde el video.
  hero: {
    mode: "frames",
    video: {
      desktop: "assets/hero.mp4",          // 16:9
      mobile: "assets/hero-vertical.mp4",  // 9:16 (opcional; si no existe, usa el de escritorio)
    },
    frames: {
      desktop: { path: "assets/frames/desktop/frame_", count: 121 },
      // Video vertical (9:16). Los destellos forman los lentes en ~1,5 s (fotograma 36);
      // ese tramo ocupa el 60% del scroll y el giro final el 40% restante.
      mobile: { path: "assets/frames/mobile/frame_", count: 120, focusFrame: 36, focusAt: 0.6 },
      ext: ".webp",
      pad: 4, // frame_0001.webp
      // El enfoque del video termina cerca del fotograma 72 (3 s). Ese tramo ocupa
      // el 70% del scroll y los fotogramas finales, casi quietos, pasan en el 30% restante.
      focusFrame: 72,
      focusAt: 0.7,
      // Color de fondo del video, para rellenar cuando no cubre toda la pantalla (celular).
      bgTop: "#01195B",
      bgBottom: "#011450",
    },
  },
};
