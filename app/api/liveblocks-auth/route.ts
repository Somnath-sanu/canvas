import { Liveblocks } from "@liveblocks/node";

import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_AlSjvsMllpPE8BnPsnmHuewvBkI4FJB6F8xo3Ju_3f_AOtowpK0H4cxPxjywiU_B",
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorised", { status: 403 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorised" , {status : 403});
  }

  const userInfo = {
    name: user.firstName || "Teammate",
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}