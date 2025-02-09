import { Category, Product } from "@/model/product";

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

const categories = ["alimentos básicos", "cuidado e higiene", "mecato", "licor", "aseo", "bebidas", "cárnicos", "frutas y verduras", "mascotas", "otra"] as const;

const subcategories: { [K in Category]: readonly string[]; } = {
  "alimentos básicos": [
    'parva',
    'arepas',
    'granos',
    'lácteos',
    'enlatados',
    'harinas y cereales',
    'aceites y untables',
    'condimentos',
    'café y chocolate',
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
  "cuidado e higiene": [
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
    'lonchera',
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
    'otros'
  ] as const,

  "bebidas": [
    'gaseosas',
    'jugos',
    'energéticas',
    'hidratantes',
    'refrescos instantáneos',
    'lácteas',
    'otros'
  ] as const,

  "mascotas": [
    'juguetes',
    'alimento',
    'accesorios',
    'ropa',
    'higiene y cuidado',
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

const productFiller: Product = {
  barcode: 'nobarcode',
  name: '',
  price: 0,
  costPrice: 0,
  image: 'minimarket/no-image',
  measure: '',
  category: 'otra',
  brand: '',
  stockStatus: 'out',
  subcategory: '',
  tags: [],
}

const units = ['bulevar', 'sendero', 'villa'] as const
type Unit = typeof units[number]

const deliveryFees: Record<Unit, number> = {
  bulevar: 1500,
  sendero: 1500,
  villa: 1500
}

export { tags, brands, subcategories, categories, units, deliveryFees, productFiller }