/**
 * This file is used to disable Draft Mode, which will stop loading Visual Editing
 * and return to published content
 */

import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();
  
  return NextResponse.redirect(new URL("/", request.url));
}
