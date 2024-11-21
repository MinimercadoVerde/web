import { useFormContext } from "react-hook-form";
import { InputHTMLAttributes, KeyboardEventHandler, useContext, useEffect } from "react";
import { StageContext } from "./UploadProductForm";
import { UploadProduct } from "../productResolver";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: keyof UploadProduct;
    label: string;
    showAt: number;
}

const Input = ({ name, label, type = "text", onChange, hidden, showAt, ...props }: InputProps) => {
    const { register, formState: { errors }, getFieldState, trigger } = useFormContext<UploadProduct>();
    const valid = getFieldState(name).isDirty && !getFieldState(name).invalid
    const { stage, setStage } = useContext(StageContext)

    const handleClickEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key != 'Enter') return;
        e.currentTarget.blur();
    }

    const onBlur = async () => {
        await trigger(name);
        if (!(stage === showAt) || stage === 0 || getFieldState(name).invalid) return;
        setStage((stage) => stage + 1)
    }
    
    return (
        <> 
            {
                !hidden && stage >= showAt &&
                <div className="input-group pb-4 relative flex flex-col h-min">
                    <label htmlFor={name} className='text-sm font-semibold text-gray-600'>{label}</label>
                    <input
                        id={name}
                        type={type}
                        {...props}
                        {...register(name, { onBlur: onBlur, onChange: onChange })}
                        onKeyDown={handleClickEnter}
                        autoFocus={stage === showAt}
                        className={`${errors[name] && "input-invalid"} ${valid && "input-valid"} input`}
                        autoComplete="off"
                    />
                    {errors[name] && <span className="absolute bottom-0 text-xs font-semibold text-red-500">{errors[name]?.message}</span>}
                </div>
            }
        </>
    );
};

export default Input;