import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //Check user Exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user do not exist" }, { status: 400 });
    }

    //Check if password is correct or not
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Password is not valid" },
        { status: 400 }
      );
    }

    //create token data
    const tokenData = {
      _id: user.email,
      name: user.username,
      email: user.email,
      password: user.password,
    };

    //create token

    const token = await jwt.sign(tokenData, process.env.TOKEM_SECRET!, {
      expiresIn: "1hr",
    });

    const response = NextResponse.json({
      message: "Login successfull",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
