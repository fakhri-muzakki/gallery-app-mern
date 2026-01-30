export async function getData<T>(apiUrl: string): Promise<T> {
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`API Error : ${res.status}`);
  }

  return res.json();
}

export async function addData(body: FormData) {
  const res = await fetch("/api/products", {
    method: "POST",
    body,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create user");
  }

  return data;
}

export async function updateData(body: FormData, id: string) {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    body,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create user");
  }

  return data;
}

export async function deleteData(id: string) {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete user");
  return true;
}
