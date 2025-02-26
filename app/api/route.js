export async function GET(request) {
    return new Response(JSON.stringify({ message: "This is a test route!" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}