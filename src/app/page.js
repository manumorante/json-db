"use client"
import cx from "clsx"
import { useEffect, useState } from "react"
import { login, deleteUser } from "@/lib/auth"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  // Al iniciar intentamos obtener el usuario de localStorage
  useEffect(() => {
    async function asyncEffect() {
      const localEmail = localStorage.getItem("email")
      if (!localEmail) return

      const data = await login({ email: localEmail })
      if (data.user) {
        setUser(data.user)
      }
      return
    }
    asyncEffect()
  }, [])

  // Si el email cambia, lo guardamos en localStorage
  // Si el email es null, lo eliminamos de localStorage
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem("email", user.email)
    } else {
      localStorage.removeItem("email")
    }
  }, [user])

  function handleLogout() {
    setUser(null)
  }

  async function handleDeleteUser() {
    if (!user?.email) return

    setLoading(true)

    await deleteUser({ email })

    setUser(null)
    setLoading(false)
  }

  async function handleLogin({ email }) {
    if (!email) return

    setLoading(true)

    const data = await login({ email })
    if (!data?.user) return

    setUser(data.user)
    setLoading(false)
  }

  return (
    <div>
      <div>
        {user ? (
          <div>
            <div className="p-4 my-4 bg-gray-300">
              <div>
                <div>Nombre: {user.name}</div>
                <div>Email: {user.email}</div>
                <div>Creado: {user.createdAt}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className='"inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-gray-500 hover:bg-gray-400 transition ease-in-out duration-150"'
            >
              {loading ? "Saliendo ..." : "Salir"}
            </button>

            <button
              onClick={handleDeleteUser}
              className='"inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-red-500 hover:bg-red-400 transition ease-in-out duration-150"'
            >
              {loading ? "Borrando ..." : "Borrar usuario"}
            </button>
          </div>
        ) : (
          <div>
            <p className="font-bold mb-4">No hay usuario</p>
            <input
              id="email"
              className="block w-full border border-gray-300 rounded-md p-2 mb-4"
              type="email"
              placeholder="Tu email"
              defaultValue="manu@estadologico.com"
            />
            <button
              onClick={() => {
                handleLogin({ email: document.getElementById("email").value })
              }}
              className={cx(
                "inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
              )}
            >
              {loading ? "Entrando ..." : "Entrar"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
