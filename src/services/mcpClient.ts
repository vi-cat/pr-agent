const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const MODEL = "HuggingFaceH4/zephyr-7b-beta:featherless-ai";
const API_URL = "https://router.huggingface.co/v1/chat/completions";

export async function invokeTool(
  name: "generate_pr",
  input: { text: string }
): Promise<string> {
  if (name !== "generate_pr") throw new Error(`Unknown tool: ${name}`);

  // helper to time out after 30 seconds
  const timeoutPromise = (ms: number) =>
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms / 1000}s`)), ms)
    );

  const fetchPromise = (async () => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant writing PR descriptions.",
          },
          { role: "user", content: input.text },
        ],
      }),
    });

    if (!res.ok) {
      if (res.status === 504)
        throw new Error("Gateway timeout: model too slow.");
      throw new Error(`LLM call failed: ${res.status}`);
    }

    const data = await res.json();
    const message = data?.choices?.[0]?.message?.content?.trim();
    return message || "⚠️ No response from model.";
  })();

  try {
    // race the network request against the timeout
    return await Promise.race([fetchPromise, timeoutPromise(30000)]);
  } catch (err) {
    if (err instanceof Error && err.message.includes("Timeout")) {
      throw new Error(
        "The request to Hugging Face timed out. Try again later."
      );
    }
    if (err instanceof TypeError) {
      throw new Error("Network error: failed to reach Hugging Face API.");
    }
    throw err;
  }
}
