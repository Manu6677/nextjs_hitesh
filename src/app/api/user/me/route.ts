import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log("userId from route me", userId);
    const user = await User.findOne({ _id: userId }).select(
      "-password -isAdmin -isVerfied"
    );
    console.log("user info from mongo", user);
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
