import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest){
    const res = NextResponse.next()
    res.headers.append('ACCESS-CONTROL-ALLOW-ORIGIN','*');
    return res;
}

export const config = {
    matcher: []
}

// // https://iam.cloud.ibm.com/identity/token
