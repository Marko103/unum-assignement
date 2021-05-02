const defaults = {
  headers: { "Content-Type": "application/json" },
};

const beUrl = "https://localhost:5001/";

export const fetcher = async <T>(relativeUrl: string, initials: any) => {
  const response = await fetch(beUrl + relativeUrl, {
    ...defaults,
    ...initials,
  });

  const responseBody: T = await response.json();

  return responseBody;
};
