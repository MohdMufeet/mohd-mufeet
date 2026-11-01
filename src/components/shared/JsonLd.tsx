type JsonLdProps = {
  data: Record<string, unknown> | readonly unknown[];
};

export function JsonLd({ data }: JsonLdProps) {
  const serialized = JSON.stringify(data).replace(/[<>&]/g, (character) => {
    const escaped: Record<string, string> = {
      "<": "\\u003c",
      ">": "\\u003e",
      "&": "\\u0026",
    };

    return escaped[character] ?? character;
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
