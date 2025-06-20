"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, ArrowLeft, Upload, AlertTriangle, User, FileText, Phone, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterComplaintPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    nik: "",
    birthDate: "",
    address: "",
    phone: "",
    email: "",

    // Case Information
    caseType: "",
    incidentDate: "",
    location: "",
    description: "",
    evidenceFiles: [],

    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",

    // Consent
    dataConsent: false,
    truthDeclaration: false,
  })

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    // Here you would submit to your API
    console.log("Submitting complaint:", formData)
    alert("Aduan berhasil didaftarkan. Nomor tiket: ADU-2024-001")
  }

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return <User className="w-5 h-5" />
      case 2: return <FileText className="w-5 h-5" />
      case 3: return <Phone className="w-5 h-5" />
      case 4: return <CheckCircle className="w-5 h-5" />
      default: return <User className="w-5 h-5" />
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
                Pendaftaran Aduan
              </h1>
              <p className="text-sm text-gray-600">Langkah {step} dari 4</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Progress Pendaftaran</span>
            <span className="text-sm font-semibold text-blue-600">{step}/4</span>
          </div>
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  stepNumber <= step 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNumber < step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    getStepIcon(stepNumber)
                  )}
                </div>
                <span className={`text-xs font-medium ${
                  stepNumber <= step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {stepNumber === 1 && 'Data Pribadi'}
                  {stepNumber === 2 && 'Detail Kasus'}
                  {stepNumber === 3 && 'Kontak Darurat'}
                  {stepNumber === 4 && 'Konfirmasi'}
                </span>
              </div>
            ))}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Security Notice */}
        <Alert className="mb-6 border-blue-200 bg-blue-50/80 backdrop-blur-sm shadow-lg">
          <Shield className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-800 font-medium">
            <strong>Keamanan Data Terjamin:</strong> Semua informasi yang Anda berikan akan dienkripsi dan hanya dapat
            diakses oleh petugas yang berwenang dengan protokol keamanan tingkat tinggi.
          </AlertDescription>
        </Alert>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {step === 1 && "Informasi Pribadi"}
              {step === 2 && "Detail Kasus"}
              {step === 3 && "Kontak Darurat"}
              {step === 4 && "Konfirmasi & Persetujuan"}
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              {step === 1 && "Mohon isi data pribadi Anda dengan lengkap dan benar"}
              {step === 2 && "Berikan detail kasus kekerasan yang Anda alami"}
              {step === 3 && "Informasi kontak darurat untuk keamanan Anda"}
              {step === 4 && "Periksa kembali data Anda sebelum mengirim"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700 font-medium">Nama Lengkap *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Masukkan nama lengkap"
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nik" className="text-gray-700 font-medium">NIK *</Label>
                    <Input
                      id="nik"
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                      placeholder="16 digit NIK"
                      maxLength={16}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-gray-700 font-medium">Tanggal Lahir *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="08xxxxxxxxxx"
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700 font-medium">Alamat Lengkap *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email (Opsional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Case Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="caseType" className="text-gray-700 font-medium">Jenis Kasus *</Label>
                    <Select
                      value={formData.caseType}
                      onValueChange={(value) => setFormData({ ...formData, caseType: value })}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                        <SelectValue placeholder="Pilih jenis kasus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Kekerasan Fisik</SelectItem>
                        <SelectItem value="psychological">Kekerasan Psikis</SelectItem>
                        <SelectItem value="sexual">Kekerasan Seksual</SelectItem>
                        <SelectItem value="economic">Kekerasan Ekonomi</SelectItem>
                        <SelectItem value="multiple">Kekerasan Kombinasi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incidentDate" className="text-gray-700 font-medium">Tanggal Kejadian *</Label>
                    <Input
                      id="incidentDate"
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-700 font-medium">Lokasi Kejadian *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Masukkan lokasi kejadian"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700 font-medium">Deskripsi Kejadian *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Ceritakan kronologi kejadian dengan detail..."
                    rows={6}
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Berikan detail sebanyak mungkin untuk membantu proses penanganan kasus.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Bukti Pendukung (Opsional)</Label>
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-all duration-200">
                    <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4 font-medium">
                      Upload foto, dokumen, atau file audio/video sebagai bukti
                    </p>
                    <Button variant="outline" size="lg" className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200">
                      <Upload className="w-4 h-4 mr-2" />
                      Pilih File
                    </Button>
                    <p className="text-xs text-gray-500 mt-3">Format: JPG, PNG, PDF, MP3, MP4 (Max 10MB per file)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Emergency Contact */}
            {step === 3 && (
              <div className="space-y-6">
                <Alert className="border-orange-200 bg-orange-50/80 backdrop-blur-sm">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <AlertDescription className="text-orange-800 font-medium">
                    Kontak darurat akan dihubungi jika kami tidak dapat menghubungi Anda atau dalam situasi darurat.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName" className="text-gray-700 font-medium">Nama Kontak Darurat *</Label>
                    <Input
                      id="emergencyName"
                      value={formData.emergencyName}
                      onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                      placeholder="Nama lengkap"
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone" className="text-gray-700 font-medium">Nomor Telepon *</Label>
                    <Input
                      id="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                      placeholder="08xxxxxxxxxx"
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyRelation" className="text-gray-700 font-medium">Hubungan dengan Anda *</Label>
                  <Select
                    value={formData.emergencyRelation}
                    onValueChange={(value) => setFormData({ ...formData, emergencyRelation: value })}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                      <SelectValue placeholder="Pilih hubungan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Orang Tua</SelectItem>
                      <SelectItem value="sibling">Saudara Kandung</SelectItem>
                      <SelectItem value="friend">Teman Dekat</SelectItem>
                      <SelectItem value="relative">Kerabat</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="font-semibold mb-4 text-blue-900">Ringkasan Data Anda:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Nama:</span>
                      <span className="text-gray-900">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">NIK:</span>
                      <span className="text-gray-900">{formData.nik}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Jenis Kasus:</span>
                      <span className="text-gray-900">{formData.caseType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Tanggal Kejadian:</span>
                      <span className="text-gray-900">{formData.incidentDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Kontak Darurat:</span>
                      <span className="text-gray-900">{formData.emergencyName} ({formData.emergencyPhone})</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataConsent"
                      checked={formData.dataConsent}
                      onCheckedChange={(checked) => setFormData({ ...formData, dataConsent: checked as boolean })}
                      className="mt-1"
                    />
                    <Label htmlFor="dataConsent" className="text-sm leading-relaxed text-gray-700">
                      Saya memberikan persetujuan untuk pemrosesan data pribadi saya sesuai dengan Undang-Undang
                      Perlindungan Data Pribadi dan kebijakan privasi DP3AK Jawa Timur.
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="truthDeclaration"
                      checked={formData.truthDeclaration}
                      onCheckedChange={(checked) => setFormData({ ...formData, truthDeclaration: checked as boolean })}
                      className="mt-1"
                    />
                    <Label htmlFor="truthDeclaration" className="text-sm leading-relaxed text-gray-700">
                      Saya menyatakan bahwa semua informasi yang saya berikan adalah benar dan dapat
                      dipertanggungjawabkan secara hukum.
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={handlePrev} 
                disabled={step === 1}
                className="px-8 py-3 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Sebelumnya
              </Button>

              {step < 4 ? (
                <Button 
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Selanjutnya
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.dataConsent || !formData.truthDeclaration}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Kirim Aduan
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
