"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, ArrowLeft, Clock, CheckCircle, AlertTriangle, FileText, Phone, Mail, Calendar, User } from "lucide-react"
import Link from "next/link"

export default function TrackComplaintPage() {
  const [complaintId, setComplaintId] = useState("")
  const [phone, setPhone] = useState("")
  const [complaintData, setComplaintData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setComplaintData(null)

    // Simulate API call
    setTimeout(() => {
      if (complaintId === "ADU-2024-001" && phone === "081234567890") {
        setComplaintData({
          id: "ADU-2024-001",
          status: "Dalam Proses",
          priority: "Tinggi",
          submittedDate: "15 Januari 2024",
          lastUpdate: "16 Januari 2024",
          assignedOfficer: "Dr. Sarah Wijaya",
          updates: [
            {
              date: "15 Januari 2024, 10:30",
              status: "Aduan Diterima",
              description: "Aduan Anda telah diterima dan sedang dalam proses verifikasi awal.",
            },
            {
              date: "15 Januari 2024, 14:20",
              status: "Verifikasi Selesai",
              description: "Aduan telah diverifikasi dan dikategorikan sebagai prioritas tinggi.",
            },
            {
              date: "16 Januari 2024, 09:15",
              status: "Ditugaskan ke Petugas",
              description: "Kasus telah ditugaskan kepada Dr. Sarah Wijaya untuk penanganan lebih lanjut.",
            },
            {
              date: "16 Januari 2024, 11:00",
              status: "Dalam Proses",
              description: "Petugas telah menghubungi Anda dan proses pendampingan dimulai.",
            },
          ],
        })
      } else {
        setError("ID Aduan atau nomor telepon tidak ditemukan. Pastikan data yang Anda masukkan benar.")
      }
      setLoading(false)
    }, 1500)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Dalam Proses":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "Selesai":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "Menunggu Verifikasi":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Dalam Proses":
        return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 font-medium">Dalam Proses</Badge>
      case "Selesai":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 font-medium">Selesai</Badge>
      case "Menunggu Verifikasi":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-1 font-medium">Menunggu Verifikasi</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Tinggi":
        return <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 font-medium">Prioritas Tinggi</Badge>
      case "Sedang":
        return <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 font-medium">Prioritas Sedang</Badge>
      case "Rendah":
        return <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 font-medium">Prioritas Rendah</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Lacak Status Aduan
              </h1>
              <p className="text-sm text-gray-600">Pantau perkembangan aduan Anda</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Form */}
        <Card className="mb-8 shadow-2xl border-0 bg-white/80 backdrop-blur-md">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              Cari Aduan Anda
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Masukkan ID aduan dan nomor telepon yang terdaftar untuk melihat status terkini
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="complaintId" className="text-gray-700 font-medium">ID Aduan *</Label>
                  <Input
                    id="complaintId"
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                    placeholder="ADU-2024-XXX"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                  <p className="text-sm text-gray-500">Format: ADU-YYYY-XXX (contoh: ADU-2024-001)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">Nomor Telepon *</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                  <p className="text-sm text-gray-500">Nomor telepon yang didaftarkan saat mengajukan aduan</p>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full md:w-auto h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mencari...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Search className="w-5 h-5 mr-2" />
                    Lacak Aduan
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Info */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md mr-2">Demo:</span>
                Gunakan ID "ADU-2024-001" dan nomor "081234567890" untuk melihat contoh status aduan.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Complaint Details */}
        {complaintData && (
          <div className="space-y-8">
            {/* Status Overview */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Status Aduan {complaintData.id}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                      Terakhir diperbarui: {complaintData.lastUpdate}
                    </CardDescription>
                  </div>
                  {getStatusBadge(complaintData.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <p className="text-sm font-medium text-gray-700">Tanggal Pengajuan</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{complaintData.submittedDate}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                      <p className="text-sm font-medium text-gray-700">Prioritas</p>
                    </div>
                    <div className="mt-1">{getPriorityBadge(complaintData.priority)}</div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center mb-2">
                      <User className="w-5 h-5 text-green-600 mr-2" />
                      <p className="text-sm font-medium text-gray-700">Petugas yang Menangani</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{complaintData.assignedOfficer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Riwayat Perkembangan
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Timeline lengkap penanganan aduan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {complaintData.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-4 relative">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                          {getStatusIcon(update.status)}
                        </div>
                        {index < complaintData.updates.length - 1 && (
                          <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent mx-auto mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 bg-gray-50/50 p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-gray-900">{update.status}</p>
                          <p className="text-sm text-gray-500">{update.date}</p>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{update.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Butuh Bantuan?
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Hubungi kami jika Anda memiliki pertanyaan tentang aduan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Hotline DP3AK</p>
                        <p className="text-lg font-semibold text-blue-600">(031) 123-4567</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Senin - Jumat, 08:00 - 16:00 WIB</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email</p>
                        <p className="text-lg font-semibold text-indigo-600">aduan@dp3ak.jatimprov.go.id</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Respon dalam 1x24 jam</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
