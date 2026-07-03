import environtment from "@/config/environtment";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { JWTExtended } from "./Types/Auth";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environtment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (token?.user?.role_name !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/petugas")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (token?.user?.role_name !== "Petugas") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/petugas") {
      return NextResponse.redirect(new URL("/petugas/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/mahasiswa")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (token?.user?.role_name !== "Mahasiswa") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/mahasiswa") {
      return NextResponse.redirect(
        new URL("/mahasiswa/dashboard", request.url),
      );
    }
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/petugas/:path*",
    "/mahasiswa/:path*",
    "/auth/:path*",
  ],
};
