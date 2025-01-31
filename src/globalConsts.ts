import { Category } from "./model/product";

const tags = [
  "lonchera",
  "comida rápida",
  "parrilla",
  "piscina",
  "farmacia",
  "deportes",
  "accesorios de celular",
  "fiesta",
  "temporada escolar",
  "navidad",
  "halloween",
  "regalos y detalles",
  "cuidado de prendas",
  "+ 18"
];
const brands = [
  "Alpina",
  "Colanta",
  "Pepsi",
  "Coca Cola",
  "Bavaria",
  "Postobon",
  "Nestlé",
  "Doria",
  "Quala",
  "Nutresa",
  "Mondelez",
  "Unilever",
  "Johnson & Johnson",
  "Procter & Gamble",
  "Bimbo",
  "Grupo Familia",
  "Ramo",
  "Frito lay",
  "Quaker",
  "Mama Inés",
  "Colombina",
  "Natipan",
  "Marinela",
  "Super",
  "El Caribe",
  "Ron Viejo de Caldas",
  "Las Caseritas",
  "Casa Luker",
  "Corona",
  "Zenú",
  "Colgate-Palmolive",
  "Kellogg's",
  "Yupi",
  "Master Chips",
  "Maggi"
] as const;

const categories = ["canasta familiar", "higiene personal", "mecato", "licor", "aseo", "bebidas", "cárnicos", "frutas y verduras", "mascotas", "otra"] as const;

const subcategories: { [K in Category]: readonly string[]; } = {
  "canasta familiar": [
    'parva',
    'arepas',
    'granos',
    'lácteos',
    'enlatados',
    'aceites',
    'esparcibles',
    'condimentos',
    'café',
    'chocolates',
    'pulverizados',
    'otros'
  ] as const,

  "cárnicos": [
    "carnes rojas",
    "carnes blancas",
    "embutidos",
    "procesados",
    "otros"
  ],
  "frutas y verduras": [
    'frutas',
    'verduras',
    'legumbres',
    'frutas secos',
    'refrigeradas',
    'otros'
  ],
  "higiene personal": [
    'crema dental',
    'jabón',
    'shampoo y acondicionador',
    'desodorante',
    'toallas higiénicas',
    'cepillo de dientes',
    'papel higiénico',
    'afeitado y rasuradoras',
    'cuidado bucal', // Incluye enjuague bucal e hilo dental
    'cuidado del cabello', // Incluye gel, cera y lociones
    'otros'
  ] as const,

  "mecato": [
    'paquetes',
    'helados',
    'gomitas',
    'chocolates',
    'galletas',
    'snacks',
    'dulces',
    'ponqués',
    'otros'
  ] as const,

  "licor": [
    'cerveza',
    'ron',
    'aguardiente',
    'vino',
    'whisky',
    'tequila',
    'vodka',
    'champaña',
    'otros'
  ] as const,

  "aseo": [
    'productos de limpieza', // Incluye jabones, lavaloza, cloro, detergente, desinfectantes, etc.
    'utensilios de limpieza', // Incluye trapeadores, escobas, recogedores, guantes, esponjas
    'ambientadores',
    'bolsas de basura',
    'aseo para mascotas', // Incluye champús, cepillos, productos antipulgas
    'otros'
  ] as const,

  "bebidas": [
    'gaseosas',
    'jugos',
    'batidos y malteadas',
    'energéticas',
    'hidratantes',
    'otros'
  ] as const,

  "mascotas": [
    'juguetes',
    'alimento',
    'accesorios',
    'camas y transportadoras',
    'comedores y bebederos',
    'ropa para mascotas',
    'otros'
  ] as const,

  "otra": [
    'tecnología',
    'papelería',
    'farmacia',
    'decoración',
    'iluminación',
    'herramientas',
    'desechables',
    'deportes',
    'repostería',
    'otros'
  ] as const
};


const units = ['bulevar', 'sendero', 'villa'] as const
type Unit = typeof units[number]

const deliveryFees: Record<Unit, number> = {
  bulevar: 1500,
  sendero: 1500,
  villa: 1500
}

export { tags, brands, subcategories, categories, units, deliveryFees }