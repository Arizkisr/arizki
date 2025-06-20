import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock user database - in production, use actual database with hashed passwords
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123", // In production, this should be hashed
    role: "admin",
    full_name: "Administrator DP3AK",
    email: "admin@dp3ak.jatimprov.go.id",
  },
  {
    id: 2,
    username: "sarah.wijaya",
    password: "officer123",
    role: "officer",
    full_name: "Dr. Sarah Wijaya",
    email: "sarah.wijaya@dp3ak.jatimprov.go.id",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username dan password harus diisi" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.username === username && u.password === password)

    if (!user) {
      return NextResponse.json({ success: false, error: "Username atau password salah" }, { status: 401 })
    }

    // Create session token (in production, use JWT or secure session management)
    const sessionToken = `session_${user.id}_${Date.now()}`

    // Set secure cookie
    const cookieStore = await cookies()
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // Log audit trail
    console.log(`User login: ${user.username} at ${new Date().toISOString()}`)

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          full_name: user.full_name,
          email: user.email,
        },
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Terjadi kesalahan sistem" }, { status: 500 })
  }
}
