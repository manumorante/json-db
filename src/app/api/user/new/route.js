import fs from "node:fs"
import { NextResponse } from "next/server"

// api/user/new carga el usuario (email) que le digas o lo crea si no existe

async function saveFile({ email }) {
  try {
    const filePath = `src/users/${email}.json`
    const userData = {
      email,
      createdAt: new Date().toISOString(),
    }

    fs.writeFileSync(filePath, JSON.stringify(userData))
    return userData
  } catch (e) {
    return false
  }
}

async function readFile({ email }) {
  try {
    const filePath = `src/users/${email}.json`
    const userData = fs.readFileSync(filePath, "utf8")
    return JSON.parse(userData)
  } catch (e) {
    return false
  }
}

export async function POST(req) {
  const { email } = await req.json()
  try {
    let user = await readFile({ email })
    if (!user) {
      user = await saveFile({ email })
    }
    return NextResponse.json({ user })
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: e.status })
  }
}
