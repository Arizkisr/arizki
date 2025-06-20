import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, FileText, Phone, MapPin, Clock, ArrowRight, CheckCircle, Star, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  DP3AK Pemprov Jawa Timur
                </h1>
                <p className="text-sm text-gray-600">Layanan Aduan Perceraian Kasus Kekerasan</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Login Admin
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Bantuan
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-400/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-2xl mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Layanan Aduan
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Perceraian & Kekerasan
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kami menyediakan layanan yang aman dan terpercaya untuk membantu korban kekerasan dalam rumah tangga
              mengajukan aduan perceraian dengan perlindungan penuh dan pendampingan profesional.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register-complaint">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <FileText className="w-5 h-5 mr-2" />
                Daftar Aduan Baru
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/track-complaint">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
                <Clock className="w-5 h-5 mr-2" />
                Lacak Status Aduan
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>100% Aman & Terpercaya</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Layanan 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Pendampingan Penuh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Layanan Unggulan Kami</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Berbagai layanan profesional yang kami sediakan untuk membantu Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Keamanan Terjamin</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Data pribadi dan informasi sensitif Anda dilindungi dengan enkripsi tingkat tinggi dan sistem keamanan
                  berlapis yang memenuhi standar internasional.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Pendampingan Profesional</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Tim ahli kami siap memberikan pendampingan hukum dan psikologis selama proses penanganan kasus Anda
                  dengan pengalaman bertahun-tahun.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Respon Cepat</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Aduan Anda akan ditindaklanjuti dalam waktu maksimal 2x24 jam dengan prioritas tinggi dan
                  komunikasi yang transparan.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-orange-400/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-red-900 mb-4">Dalam Keadaan Darurat?</h3>
            <p className="text-red-800 mb-8 text-lg">Jika Anda dalam bahaya segera, hubungi nomor darurat di bawah ini:</p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto">
              <Card className="card-hover bg-white border-red-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <p className="font-bold text-red-900 mb-2">Hotline Darurat</p>
                  <p className="text-3xl font-bold text-red-600">119</p>
                  <p className="text-sm text-red-700 mt-2">24 Jam Non-Stop</p>
                </CardContent>
              </Card>
              <Card className="card-hover bg-white border-red-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <p className="font-bold text-red-900 mb-2">DP3AK Jatim</p>
                  <p className="text-2xl font-bold text-red-600">(031) 123-4567</p>
                  <p className="text-sm text-red-700 mt-2">Senin - Jumat</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Informasi Kontak</h3>
            <p className="text-xl text-gray-600">Hubungi kami untuk informasi lebih lanjut</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  Alamat Kantor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Jl. Pahlawan No. 110
                  <br />
                  Surabaya, Jawa Timur 60174
                  <br />
                  Indonesia
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  Jam Operasional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Senin - Jumat: 08:00 - 16:00 WIB
                  <br />
                  Sabtu: 08:00 - 12:00 WIB
                  <br />
                  Minggu: Tutup
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold">DP3AK Jawa Timur</h4>
            </div>
            <p className="text-gray-300 mb-4">© 2024 DP3AK Pemerintah Provinsi Jawa Timur. Semua hak dilindungi.</p>
            <p className="text-sm text-gray-400">
              Sistem ini dilindungi dengan enkripsi SSL dan keamanan tingkat tinggi.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
