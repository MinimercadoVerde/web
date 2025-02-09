import { brands } from "@/utils/consts";
import Input from "./Input";

const BrandInput = () => {
    return (
        <>
            <Input name="brand" label="Marca" list="brands" />
            <datalist id="brands">
                {brands.map((brand) => (
                    <option key={brand} value={brand}>
                        {brand}
                    </option>
                ))}
            </datalist>

        </>
    )
}

export default BrandInput;