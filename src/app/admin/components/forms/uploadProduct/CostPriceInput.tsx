import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { UploadProduct } from "../productResolver";
import { formatPrice } from "@/utils/functions";

const CostPriceInput = () => {
  const {
    register,
    formState: { errors },
    getFieldState,
    trigger,
  } = useFormContext<UploadProduct>();
  const [value, setValue] = useState("");
  const valid =
    getFieldState("costPrice").isDirty && !getFieldState("costPrice").invalid;

  const onInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const number = Number(e.target.value);
    if (isNaN(number)) return;
    setValue(formatPrice(number));
  };

  const handleClickEnter: KeyboardEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    if (e.key != "Enter") return;
    e.currentTarget.blur();
  };
  const onBlur = async () => {
    await trigger("costPrice");
  };

  return (
    <div className="input-group relative flex flex-col pb-4">
      <label
        htmlFor="costPrice"
        className="text-sm font-semibold text-gray-600"
      >
        Costo
      </label>

      <input
        id="costPrice"
        type="number"
        inputMode="numeric"
        onInput={onInput}
        onKeyDown={handleClickEnter}
        {...register("costPrice", {
          onBlur: onBlur,
          onChange: () => trigger("costPrice"),
        })}
        className={`${errors["costPrice"] && "input-invalid"} ${valid && "input-valid"} input peer flex justify-between`}
        required
      />
      <span className="absolute right-20 top-0 text-green-600 peer-invalid:text-red-500">
        {value}
      </span>

      {errors["costPrice"] && (
        <span className="absolute bottom-0 text-xs font-semibold text-red-500">
          {errors["costPrice"]?.message}
        </span>
      )}
    </div>
  );
};

export default CostPriceInput;
