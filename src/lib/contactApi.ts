import { CONTACT_ENDPOINT } from "../constants/site";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "network" | "server"; status?: number };

/**
 * Sends the audit request to the existing FM Digital AI API.
 *
 * Contract preserved exactly: POST /submit-contact with
 * { name, email, phone, website, message }.
 *
 * The endpoint only allows the production origin (fmdigitalai.com), so a real
 * submission cannot complete from localhost. Local verification stubs `fetch`
 * (see scripts/verify-contact.mjs); the true end-to-end test happens on the
 * production domain.
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        website: payload.website,
        message: payload.message,
      }),
    });

    if (!response.ok) return { ok: false, reason: "server", status: response.status };

    try {
      const data = (await response.json()) as { success?: boolean };
      if (data && data.success === false) return { ok: false, reason: "server", status: response.status };
    } catch {
      // A 2xx without a JSON body is still a success for this API.
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}
