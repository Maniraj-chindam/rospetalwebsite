import test from "node:test";
import assert from "node:assert/strict";

process.env.NEXT_PUBLIC_POS_API_BASE_URL = "https://api.example.invalid";
const { postEnquiry } = await import("../lib/enquiries.ts");
const payload = { kind: "contact", name: "Synthetic Customer", email: "synthetic@example.invalid", message: "Synthetic question about a dress." };

test("requires a committed reference and sends a stable request ID", async () => {
  const original = global.fetch;
  global.fetch = async (url, options) => {
    assert.equal(url, "https://api.example.invalid/api/enquiries");
    assert.equal(options.headers["x-request-id"], "12345678-1234-1234-1234-123456789abc");
    assert.equal(JSON.parse(options.body).kind, "contact");
    return Response.json({ reference: "RP-E-12345678" }, { status: 201 });
  };
  try { assert.equal(await postEnquiry(payload, "12345678-1234-1234-1234-123456789abc"), "RP-E-12345678"); }
  finally { global.fetch = original; }
});

test("does not show success for failure or an invalid acknowledgement", async () => {
  const original = global.fetch;
  try {
    global.fetch = async () => Response.json({ error: "Enter a valid email address" }, { status: 400 });
    await assert.rejects(postEnquiry(payload, "id"), /valid email/);
    global.fetch = async () => Response.json({ ok: true }, { status: 201 });
    await assert.rejects(postEnquiry(payload, "id"), /could not confirm/);
    global.fetch = async () => { throw new Error("network failure"); };
    await assert.rejects(postEnquiry(payload, "id"), /could not confirm/);
  } finally { global.fetch = original; }
});
