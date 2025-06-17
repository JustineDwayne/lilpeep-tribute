import clientPromise from "@/app/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lilpeep_merch");
    const merch = await db.collection("merch").find({}).toArray();
    return new Response(JSON.stringify(merch), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}