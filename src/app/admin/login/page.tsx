"use client";

import { useRouter } from "next/navigation";
import { adminAuth } from "../actions";
import { useState } from "react";

const AdminLogin = () => {
  const [tries, setTries] = useState(0);
  const [wrongPassword, setWrongPassword] = useState(false);

  const router = useRouter();

  const logHandler = async (data: FormData) => {
    const password = data.get("password")?.toString();
    const allowed = await adminAuth(password || "");
    if (!allowed) {
      setTries((prev) => prev + 1);
      setWrongPassword(true);
      return;
    }

    router.replace("/admin");
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-xl">Sección administrativa</h1>

      <form action={logHandler} className="my-20 flex flex-col gap-5">
        <label htmlFor="password" className="flex flex-col">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            id="password"
            className="pl-1"
          />
        </label>
        <span style={{ opacity: wrongPassword ? 1 : 0 }} className="text-red-500">
          Contraseña incorrecta. 
          {/* Tienes {5 - tries} intentos */}
        </span>
        <button
          type="submit"
          className="w-fit self-center rounded-full bg-blue-500 px-5 text-white"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
