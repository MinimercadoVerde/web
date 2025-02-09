'use client'
import { querySearch } from "@/lib/mongo/products"
import { Product } from "@/model/product"
import { useEffect, useRef, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { IoIosClose, IoIosSearch } from "react-icons/io"
import ProductImage from "@/components/ProductImage"
import { formatPrice } from "@/utils/functions"
import ProductDialogCard from "./ProductDialogCard"

const SearchBar = () => {
    const [results, setResults] = useState<Product[]>([])
    const [query, setQuery] = useDebounceValue<string>("", 600);
    const [loading, setLoading] = useState(false)
    const input = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState<string>("")

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            if (query) {
                const response = await querySearch(query);
                const results = response as Product[];
                setResults(results);
                setLoading(false);
            } else {
                setResults([]);
            }

        };
        fetchResults();
    }, [query]);


    const resetSearch = () => {
        setLoading(false)
        setInputValue('');     
        setQuery('');
        setResults([]);
    }

    return (
        <div className="bg-white relative flex flex-row grow max-w-xl z-50 rounded-full border-gray-200 border-2 py-2">
            <input
                className="w-full outline-hidden px-5 bg-transparent text-2xl"
                placeholder="Buscar producto"
                value={inputValue}
                onChange={(e) => {setInputValue(e.target.value); setQuery(e.target.value)}}
                ref={input}
            />
            {
                results.length > 0 &&
                <ul className="fixed left-0 md:absolute translate-y-10  w-full shadow-md " >
                    {results.map((result) => (
                        <ProductListItem key={result.barcode} product={result} />
                    ))}
                </ul>
            }
            {
                results.length < 1 && inputValue.length > 0 && (
                    <div className=" bg-slate-50 fixed left-0 md:absolute translate-y-10  w-full shadow-md p-4 text-center text-lg">
                    {
                        loading ? <span>Buscando...</span> :
                        <span> Lo sentimos, no tenemos resultados para esta búsqueda</span>
                    }
                    </div>
                )
            } 
            
            <div className="text-4xl px-3 text-slate-600">

                {
                    query.length === 0 ? <IoIosSearch /> : <IoIosClose onClick={resetSearch} />
                }
            </div>
        </div>
    )
}

const ProductListItem = ({ product }: { product: Product }) => {
    const { name, brand, measure, price, image, stockStatus } = product;
    return (
        <li className="relative max-w-full w-full odd:bg-gray-100 even:bg-gray-50">
            <ProductDialogCard product={product} />
            <div className="flex size-full items-center">
                <div className="min-w-16 md:min-w-20">
                    <ProductImage src={image} alt={name} />
                </div>
                <div className="*:mx-2 items-baseline grow max-w-full ">
                    <b className="line-clamp-1">{name}</b>
                    <span className="text-sm">{brand}</span>
                    <span className="text-sm">{measure}</span>
                    {stockStatus === 'out' && <span className="text-red-600 font-semibold text-sm">Agotado</span>}
                </div>
                <b className="mx-2 text-nowrap text-sm">
                    {formatPrice(price)}
                </b>
            </div>
        </li>
    )
}
export default SearchBar;