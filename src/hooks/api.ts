import { AppContext } from "@/contexts/appContext";
import { useApp } from "./app";

export default function useApi() {
  const { token, apiUrl } = useApp();

  function getHeaders() {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  async function get(path: string): Promise<any> {
    const response = await fetch(`${apiUrl}${path}`, {
      method: "GET",
      headers: getHeaders(),
    });

    const data = await response.json();

    return {
      ...data,
      status: response.status,
    };
  }

  async function post(path: string, body: any): Promise<any> {
    const response = await fetch(`${apiUrl}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: getHeaders(),
    });

    const data = await response.json();

    return {
      ...data,
      status: response.status,
    };
  }

  async function put(path: string, body: any): Promise<any> {
    const response = await fetch(`${apiUrl}${path}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: getHeaders(),
    });

    const data = await response.json();

    return {
      ...data,
      status: response.status,
    };
  }

  async function del(path: string): Promise<any> {
    const response = await fetch(`${apiUrl}${path}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    const data = await response.json();

    return {
      ...data,
      status: response.status,
    };
  }

  async function patch(path: string, body: any): Promise<any> {
    const response = await fetch(`${apiUrl}${path}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: getHeaders(),
    });

    const data = await response.json();

    return {
      ...data,
      status: response.status,
    };
  }

  return {
    get,
    post,
    put,
    del,
    patch,
  };
}
