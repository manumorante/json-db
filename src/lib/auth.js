export async function login({ email }) {
  const response = await fetch("/api/user/new", {
    method: "POST",
    body: JSON.stringify({ email }),
  })

  const data = await response.json()

  if (data.error) {
    console.error(data.error)
    return
  }

  return data
}

export async function deleteUser({ email }) {
  const response = await fetch(`/api/user/delete`, {
    method: "POST",
    body: JSON.stringify({ email: email }),
  })

  const data = await response.json()

  if (data.error) {
    console.error(data.error)
  }
}
