-- Seed sample data for testing the DP3AK Complaint System
-- This script adds sample complaints for demonstration purposes

-- Insert sample complaints
INSERT INTO complaints (
    full_name, nik, birth_date, address, phone, email,
    case_type, incident_date, location, description,
    emergency_name, emergency_phone, emergency_relation,
    status, priority, assigned_officer_id,
    data_consent, truth_declaration
) VALUES 
(
    'Siti Aminah',
    '3578123456789012',
    '1985-03-15',
    'Jl. Merdeka No. 123, Surabaya, Jawa Timur',
    '081234567890',
    'siti.aminah@email.com',
    'physical',
    '2024-01-10',
    'Rumah pribadi, Surabaya',
    'Saya mengalami kekerasan fisik berulang dari suami saya. Kejadian terakhir pada tanggal 10 Januari 2024, saya dipukul hingga memar di wajah dan lengan. Saya sudah tidak tahan lagi dan ingin mengajukan perceraian karena kekerasan ini sudah berlangsung selama 2 tahun.',
    'Fatimah (Ibu)',
    '081234567891',
    'parent',
    'in_progress',
    'high',
    2, -- Dr. Sarah Wijaya
    true,
    true
),
(
    'Ratna Sari',
    '3578234567890123',
    '1990-07-22',
    'Jl. Diponegoro No. 456, Malang, Jawa Timur',
    '082345678901',
    'ratna.sari@email.com',
    'psychological',
    '2024-01-12',
    'Rumah pribadi, Malang',
    'Suami saya selalu memaki, menghina, dan mengancam saya setiap hari. Dia juga melarang saya bekerja dan bertemu dengan keluarga. Saya merasa tertekan secara mental dan ingin mengakhiri pernikahan ini.',
    'Dewi Sartika (Adik)',
    '082345678902',
    'sibling',
    'pending',
    'medium',
    NULL,
    true,
    true
),
(
    'Maya Indira',
    '3578345678901234',
    '1988-11-08',
    'Jl. Pahlawan No. 789, Kediri, Jawa Timur',
    '083456789012',
    'maya.indira@email.com',
    'economic',
    '2024-01-05',
    'Rumah pribadi, Kediri',
    'Suami saya mengontrol semua keuangan keluarga dan tidak memberikan nafkah yang cukup. Dia juga melarang saya bekerja dan mengambil semua penghasilan saya. Anak-anak sering tidak bisa makan dengan layak.',
    'Budi Santoso (Kakak)',
    '083456789013',
    'sibling',
    'completed',
    'low',
    3, -- Dra. Fitri Handayani
    true,
    true
),
(
    'Rina Wulandari',
    '3578456789012345',
    '1992-05-18',
    'Jl. Veteran No. 321, Blitar, Jawa Timur',
    '084567890123',
    'rina.wulandari@email.com',
    'multiple',
    '2024-01-14',
    'Rumah pribadi, Blitar',
    'Saya mengalami berbagai bentuk kekerasan dari suami: dipukul, diancam, dikontrol keuangannya, dan dipaksa melakukan hal-hal yang tidak saya inginkan. Saya takut untuk melaporkan karena dia mengancam akan menyakiti anak-anak kami.',
    'Sari Dewi (Teman)',
    '084567890124',
    'friend',
    'verified',
    'urgent',
    2, -- Dr. Sarah Wijaya
    true,
    true
);

-- Insert sample case updates
INSERT INTO case_updates (complaint_id, updated_by, update_type, old_value, new_value, notes) VALUES
(1, 2, 'status_change', 'pending', 'in_progress', 'Kasus telah diverifikasi dan ditugaskan untuk penanganan lebih lanjut'),
(1, 2, 'note', NULL, NULL, 'Telah melakukan wawancara awal dengan korban. Diperlukan pendampingan psikologis segera.'),
(3, 3, 'status_change', 'in_progress', 'completed', 'Kasus telah diselesaikan. Korban telah mendapat bantuan hukum dan proses perceraian sedang berjalan.'),
(4, 1, 'status_change', 'pending', 'verified', 'Kasus telah diverifikasi dan dikategorikan sebagai prioritas tinggi'),
(4, 2, 'assignment', NULL, 'Dr. Sarah Wijaya', 'Kasus ditugaskan kepada Dr. Sarah Wijaya untuk penanganan segera');

-- Insert sample evidence files (metadata only)
INSERT INTO evidence_files (complaint_id, file_name, file_path, file_type, file_size) VALUES
(1, 'foto_luka_wajah.jpg', '/uploads/complaints/ADU-2024-001/foto_luka_wajah.jpg', 'image/jpeg', 245760),
(1, 'foto_luka_lengan.jpg', '/uploads/complaints/ADU-2024-001/foto_luka_lengan.jpg', 'image/jpeg', 189440),
(1, 'surat_keterangan_dokter.pdf', '/uploads/complaints/ADU-2024-001/surat_keterangan_dokter.pdf', 'application/pdf', 512000),
(4, 'rekaman_ancaman.mp3', '/uploads/complaints/ADU-2024-004/rekaman_ancaman.mp3', 'audio/mpeg', 1024000),
(4, 'chat_whatsapp.pdf', '/uploads/complaints/ADU-2024-004/chat_whatsapp.pdf', 'application/pdf', 256000);

-- Insert sample audit logs
INSERT INTO audit_logs (user_id, action, table_name, record_id, new_values, ip_address, user_agent) VALUES
(1, 'LOGIN', 'users', 1, '{"login_time": "2024-01-15 08:00:00"}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
(2, 'UPDATE_COMPLAINT', 'complaints', 1, '{"status": "in_progress", "assigned_officer_id": 2}', '192.168.1.101', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
(3, 'UPDATE_COMPLAINT', 'complaints', 3, '{"status": "completed"}', '192.168.1.102', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

COMMENT ON TABLE complaints IS 'Sample data includes various types of domestic violence cases with different statuses and priorities';
