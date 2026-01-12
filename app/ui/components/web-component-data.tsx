import { raw } from "hono/html";
import type { FC } from "hono/jsx";

function serializeJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}

type WebComponentDataProps = {
  targetId: string;
  data: unknown;
};

const VALID_ID_PATTERN = /^[a-zA-Z][a-zA-Z0-9_-]*$/;

export const WebComponentData: FC<WebComponentDataProps> = ({ targetId, data }) => {
  if (!VALID_ID_PATTERN.test(targetId)) {
    throw new Error(`Invalid targetId: ${targetId}`);
  }
  const dataId = `${targetId}-data`;
  const json = serializeJson(data);
  const script = `const data = JSON.parse(document.getElementById("${dataId}")?.textContent ?? "{}");
const el = document.getElementById("${targetId}");
if (el) {
  el.data = data;
}`;

  return (
    <>
      <script type="application/json" id={dataId}>
        {raw(json)}
      </script>
      <script type="module">{raw(script)}</script>
    </>
  );
};
