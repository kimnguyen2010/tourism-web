export const GRAPHQL_API_URL = import.meta.env.VITE_GRAPHQL_URL || "http://localhost:4000/graphql";

type GraphqlRequestOptions<TVariables> = {
  query: string;
  variables?: TVariables;
  token?: string | null;
};

type GraphqlResponse<TData> = {
  data?: TData;
  errors?: Array<{ message: string }>;
};

export async function graphqlRequest<TData, TVariables = Record<string, never>>({
  query,
  variables,
  token
}: GraphqlRequestOptions<TVariables>): Promise<TData> {
  const response = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const payload: GraphqlResponse<TData> = await response.json();

  if (!response.ok || payload.errors?.length || !payload.data) {
    throw new Error(payload.errors?.[0]?.message || "Không thể kết nối đến máy chủ.");
  }

  return payload.data;
}
