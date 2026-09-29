/* ============================================================
   INVENTARIO DE LA DEMO
   ------------------------------------------------------------
   Para AGREGAR un producto: copia un bloque { ... }, pégalo en la lista
   y cambia los datos. Para QUITARLO: borra su bloque.

   Campos:
     category  → id de la categoría (ver CATEGORIES abajo)
     name      → nombre del producto
     detail    → línea corta (material, tipo, etc.)
     price     → precio en dólares (número). Todos son REFERENCIALES.
     available → true = Disponible, false = Agotado
     cashea    → true si se puede pagar con Cashea
     image     → ruta a la foto (ej. "assets/productos/medanos.jpg").
                 Si se deja vacío, se muestra un dibujo de muestra.
     shape     → dibujo de muestra: round, rect, cateye, aviator, browline, oval, lens, contact
     benefit   → qué es y para qué sirve (se ve al abrir la ficha)
     features  → lista corta de características

   Nombres, precios y textos son DE EJEMPLO.
   ============================================================ */

window.CATEGORIES = [
  { id: "monturas", label: "Monturas" },
  { id: "cristales", label: "Cristales" },
  { id: "contacto", label: "Lentes de contacto" },
  // Para una categoría nueva, agrega una línea aquí, ej.:
  // { id: "sol", label: "Lentes de sol" },
];

window.PRODUCTS = [
  // ---------- MONTURAS ----------
  {
    category: "monturas",
    name: "Médanos",
    detail: "Acetato · Redonda",
    price: 45,
    available: true,
    cashea: true,
    image: "",
    shape: "round",
    benefit: "Montura redonda de acetato, liviana y resistente. Suaviza los rasgos de caras cuadradas o con mandíbula marcada.",
    features: ["Bisagras con resorte", "Apta para cristales de medida", "Disponible en azul y carey"],
  },
  {
    category: "monturas",
    name: "Paraguaná",
    detail: "Metal · Aviador",
    price: 60,
    available: true,
    cashea: true,
    image: "",
    shape: "aviator",
    benefit: "El clásico aviador en metal delgado. Queda bien en casi todas las caras y sirve tanto para lentes de medida como de sol.",
    features: ["Plaquetas ajustables", "Metal hipoalergénico", "Puente doble"],
  },
  {
    category: "monturas",
    name: "Adícora",
    detail: "Acetato · Ojo de gato",
    price: 55,
    available: true,
    cashea: true,
    image: "",
    shape: "cateye",
    benefit: "Ojo de gato con puntas levantadas. Levanta la mirada y le da un toque atrevido al look de todos los días.",
    features: ["Acetato pulido a mano", "Varillas con núcleo metálico", "Colores: negro, vino, azul"],
  },
  {
    category: "monturas",
    name: "La Vela",
    detail: "TR90 · Rectangular",
    price: 35,
    available: false,
    cashea: true,
    image: "",
    shape: "rect",
    benefit: "Rectangular en TR90, un material flexible que casi no pesa. Ideal para quien usa lentes todo el día o para los más pequeños.",
    features: ["Flexible y difícil de romper", "Muy liviana", "Buena para niños y adolescentes"],
  },
  {
    category: "monturas",
    name: "Cumarebo",
    detail: "Mixta · Browline",
    price: 70,
    available: true,
    cashea: true,
    image: "",
    shape: "browline",
    benefit: "Parte superior de acetato y parte inferior de metal. Un estilo retro que se ve serio y elegante en la oficina.",
    features: ["Combinación acetato y metal", "Plaquetas ajustables", "Estilo retro"],
  },
  {
    category: "monturas",
    name: "Churuguara",
    detail: "Titanio · Ovalada",
    price: 85,
    available: true,
    cashea: true,
    image: "",
    shape: "oval",
    benefit: "Ovalada en titanio, uno de los materiales más livianos y resistentes. Casi no se siente en la cara.",
    features: ["Titanio liviano", "No se oxida", "Diseño discreto"],
  },

  // ---------- CRISTALES ----------
  {
    category: "cristales",
    name: "Antirreflejo",
    detail: "Tratamiento",
    price: 25,
    available: true,
    cashea: true,
    image: "",
    shape: "lens",
    benefit: "Elimina los reflejos molestos en el cristal. Ves más nítido de noche, en pantallas y en fotos, y tus ojos se ven a través del lente.",
    features: ["Menos reflejos al manejar de noche", "Más nitidez en pantallas", "Fácil de limpiar"],
  },
  {
    category: "cristales",
    name: "Filtro de luz azul",
    detail: "Tratamiento",
    price: 30,
    available: true,
    cashea: true,
    image: "",
    shape: "lens",
    benefit: "Filtra parte de la luz azul de celulares y computadoras. Recomendado para quien pasa muchas horas frente a pantallas.",
    features: ["Menos cansancio visual", "Para trabajo y estudio", "Se combina con antirreflejo"],
  },
  {
    category: "cristales",
    name: "Fotocromáticos",
    detail: "Cristal inteligente",
    price: 50,
    available: true,
    cashea: true,
    image: "",
    shape: "lens",
    benefit: "Se oscurecen solos con el sol y se aclaran bajo techo. Un solo par de lentes para adentro y para afuera.",
    features: ["Protección UV", "Cambio automático de tono", "Ideal para el sol de Coro"],
  },

  // ---------- LENTES DE CONTACTO ----------
  {
    category: "contacto",
    name: "Diarios",
    detail: "Desechables · 30 unidades",
    price: 28,
    available: true,
    cashea: false,
    image: "",
    shape: "contact",
    benefit: "Te pones un par nuevo cada día y lo botas en la noche. No necesitan limpieza, ideales para empezar o para uso ocasional.",
    features: ["Sin líquido de limpieza", "Muy higiénicos", "Buenos para principiantes"],
  },
  {
    category: "contacto",
    name: "Mensuales",
    detail: "Reutilizables · 6 unidades",
    price: 35,
    available: true,
    cashea: true,
    image: "",
    shape: "contact",
    benefit: "Duran un mes con buen cuidado. La opción más económica para quien usa lentes de contacto todos los días.",
    features: ["Rinden más", "Requieren solución de limpieza", "Para uso diario"],
  },
  {
    category: "contacto",
    name: "De color",
    detail: "Cosméticos · Con o sin medida",
    price: 32,
    available: false,
    cashea: true,
    image: "",
    shape: "contact",
    benefit: "Cambian el color de tus ojos, con o sin fórmula. Para una ocasión especial o para variar el look.",
    features: ["Varios tonos", "Con o sin medida", "Te enseñamos a usarlos"],
  },
];
