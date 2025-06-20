import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, use actual database connection
const complaints = [
  {
    id: 1,
    complaint_id: "ADU-2024-001",
    full_name: "Siti Aminah",
    case_type: "physical",
    status: "in_progress",
    priority: "high",
    created_at: "2024-01-15",
    assigned_officer: "Dr. Sarah Wijaya",
  },
  {
    id: 2,
    complaint_id: "ADU-2024-002",
    full_name: "Ratna Sari",
    case_type: "psychological",
    status: "pending",
    priority: "medium",
    created_at: "2024-01-14",
    assigned_officer: null,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")

    let filteredComplaints = complaints

    if (status && status !== "all") {
      filteredComplaints = filteredComplaints.filter((c) => c.status === status)
    }

    if (priority && priority !== "all") {
      filteredComplaints = filteredComplaints.filter((c) => c.priority === priority)
    }

    return NextResponse.json({
      success: true,
      data: filteredComplaints,
      total: filteredComplaints.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch complaints" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "full_name",
      "nik",
      "birth_date",
      "address",
      "phone",
      "case_type",
      "incident_date",
      "location",
      "description",
      "emergency_name",
      "emergency_phone",
      "emergency_relation",
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Field ${field} is required` }, { status: 400 })
      }
    }

    // Generate complaint ID
    const year = new Date().getFullYear()
    const sequence = complaints.length + 1
    const complaint_id = `ADU-${year}-${sequence.toString().padStart(3, "0")}`

    // Create new complaint
    const newComplaint = {
      id: complaints.length + 1,
      complaint_id,
      ...body,
      status: "pending",
      priority: "medium",
      created_at: new Date().toISOString(),
      assigned_officer: null,
    }

    // In production, save to database with encryption for sensitive data
    complaints.push(newComplaint)

    // Log audit trail
    console.log(`New complaint created: ${complaint_id}`)

    return NextResponse.json(
      {
        success: true,
        data: {
          complaint_id,
          message: "Aduan berhasil didaftarkan",
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating complaint:", error)
    return NextResponse.json({ success: false, error: "Failed to create complaint" }, { status: 500 })
  }
}
