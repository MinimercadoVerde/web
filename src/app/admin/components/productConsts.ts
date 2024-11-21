import { Brand, Category, Subcategories } from "@/model/product";

const brands: Brand[] = [
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
    "Bayer",
    "Bimbo",
    "Grupo Familia",
    "Ramo"
];

const subcategories: { [K in keyof Subcategories]: Subcategories[K][] } = {
    canastaFamiliar: ['parva', 'arepas', 'granos', 'lácteos', 'enlatados', 'aceites', 'matequillas', 'condimentos', 'otros'],
    higienePersonal: ['crema dental', 'jabón', 'shampoo', 'desodorante', 'talco', 'toallas higiénicas', 'cepillo de dientes', 'papel higiénico'],
    mecato: ['paquetes', 'helados', 'gomitas', 'chocolates', 'galletas', 'snacks', 'dulces', 'otros'],
    licor: ['cerveza', 'ron', 'aguardiente', 'vino', 'whisky', 'tequila', 'vodka', 'otros'],
    aseo: ['jabón en polvo', 'lavaloza', 'limpiadores', 'esponjas', 'detergente', 'cloro', 'suavizante', 'otros'],
    bebidas: ['gaseosas', 'jugos', 'agua', 'té', 'café', 'leche', 'bebidas energéticas', 'otros'],
    mascotas: ['juguetes', 'alimento', 'accesorios', 'higiene', 'otros'],
};

const categories: Category[] = ['canastaFamiliar', 'higienePersonal', 'mecato', 'licor', 'aseo', 'bebidas', 'mascotas'];

export { categories, subcategories, brands };