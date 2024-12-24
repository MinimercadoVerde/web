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
    canastaFamiliar: ['parva', 'arepas', 'granos', 'lácteos', 'enlatados', 'aceites', 'matequillas', 'condimentos', 'otros'],
    higienePersonal: ['crema dental', 'jabón', 'shampoo', 'desodorante', 'talco', 'toallas higiénicas', 'cepillo de dientes', 'papel higiénico'],
    mecato: ['paquetes', 'helados', 'gomitas', 'chocolates', 'galletas', 'snacks', 'dulces', 'otros'] ,
    licor: ['cerveza', 'ron', 'aguardiente', 'vino', 'whisky', 'tequila', 'vodka', 'otros'] ,
    aseo: ['jabón en polvo', 'lavaloza', 'limpiadores', 'esponjas', 'detergente', 'cloro', 'suavizante', 'otros'] ,
    bebidas: ['gaseosas', 'jugos', 'agua', 'té', 'café', 'leche', 'bebidas energéticas', 'otros'] ,
    mascotas: ['juguetes', 'alimento', 'accesorios', 'higiene', 'otros'] ,
    otra: ['no aplica'] 
} as const;

const units = ['bulevar', 'sendero', 'villa'] as const
type Unit = typeof units[number]

const deliveryFees: Record<Unit, number> = {
    bulevar: 1500,
    sendero: 1500,
    villa: 1500
}

export { categories, brands, units, deliveryFees };