const tags = [
    "bebidas",
    "lacteos",
    "cereales",
    "bebidas alcoholicas",
    "frutas",
    "verduras",
    "carnes",
    "legumbres",
    "panaderia",
    "snacks",
    "bebidas sin alcohol",
    "papas",
    "cereales y legumbres",
    "huevos",
    "pastas",
    "salud y belleza",
    "congelados",
    "despensas",
    "bebidas de agua",
    "carnes y derivados",
    "frutas y verduras",
    "panes",
    "chocolates",
    "galletas",
    "parva",
    "papitas"
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
    "Zenú"
] as const;

const categories = ["canastaFamiliar", "higienePersonal", "mecato", "licor", "aseo", "bebidas", "mascotas", "otra"] as const;

const units = ['bulevar', 'sendero', 'villa'] as const
type Unit = typeof units[number]

const deliveryFees: Record<Unit, number> = {
    bulevar: 1500,
    sendero: 1500,
    villa: 1500
}

export { brands, units, deliveryFees, categories,tags };