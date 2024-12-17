const brands = [
    "Alpina",
    "Colanta",
    "Pepsi",
    "Coca Cola",
    "Bavaria",
    "Postobon",
    "Nestle",
    "Doria",
    "Quala",
    "Nutresa",
    "Mondelez",
    "Unilever",
    "Johnson & Johnson",
    "Procter & Gamble",
    "Bimbo",
    "Grupo Familia",
    "Ramo"
] as const;

const categories = {
    canastaFamiliar: ['parva', 'arepas', 'granos', 'lácteos', 'enlatados', 'aceites', 'matequillas', 'condimentos', 'otros'] as const,
    higienePersonal: ['crema dental', 'jabón', 'shampoo', 'desodorante', 'talco', 'toallas higiénicas', 'cepillo de dientes', 'papel higiénico'] as const,
    mecato: ['paquetes', 'helados', 'gomitas', 'chocolates', 'galletas', 'snacks', 'dulces', 'otros'] as const,
    licor: ['cerveza', 'ron', 'aguardiente', 'vino', 'whisky', 'tequila', 'vodka', 'otros'] as const,
    aseo: ['jabón en polvo', 'lavaloza', 'limpiadores', 'esponjas', 'detergente', 'cloro', 'suavizante', 'otros'] as const,
    bebidas: ['gaseosas', 'jugos', 'agua', 'té', 'café', 'leche', 'bebidas energéticas', 'otros'] as const,
    mascotas: ['juguetes', 'alimento', 'accesorios', 'higiene', 'otros'] as const,
    otra: ['no aplica'] as const
} as const;

const units = ['bulevar', 'sendero', 'villa'] as const
type Unit = typeof units[number]

const deliveryFees: Record<Unit, number> = {
    bulevar: 1500,
    sendero: 1500,
    villa: 1500
}

export { categories, brands, units, deliveryFees };