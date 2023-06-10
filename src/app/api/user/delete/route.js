import fs from "node:fs"
import { NextResponse } from "next/server"

async function deleteFile({ email }) {
  const filePath = `src/users/${email}.json`
  fs.unlinkSync(filePath)
}

export async function POST(req) {
  const { email } = await req.json()
  try {
    await deleteFile({ email })
    return NextResponse.json({ status: 204, email: email })
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: e.status })
  }
}
