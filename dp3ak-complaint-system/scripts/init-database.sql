-- Database initialization for DP3AK Complaint System
-- Create database and tables for the complaint management system

-- Create database (if using PostgreSQL)
-- CREATE DATABASE dp3ak_complaints;

-- Use the database
-- \c dp3ak_complaints;

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'officer', 'supervisor')),
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
    id SERIAL PRIMARY KEY,
    complaint_id VARCHAR(20) UNIQUE NOT NULL, -- Format: ADU-YYYY-XXX
    
    -- Personal Information (encrypted)
    full_name VARCHAR(100) NOT NULL,
    nik VARCHAR(16) NOT NULL,
    birth_date DATE NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    
    -- Case Information
    case_type VARCHAR(50) NOT NULL CHECK (case_type IN ('physical', 'psychological', 'sexual', 'economic', 'multiple')),
    incident_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    
    -- Emergency Contact
    emergency_name VARCHAR(100) NOT NULL,
    emergency_phone VARCHAR(20) NOT NULL,
    emergency_relation VARCHAR(50) NOT NULL,
    
    -- Case Management
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'in_progress', 'completed', 'rejected')),
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assigned_officer_id INTEGER REFERENCES users(id),
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Data consent and verification
    data_consent BOOLEAN DEFAULT false,
    truth_declaration BOOLEAN DEFAULT false,
    verified_at TIMESTAMP,
    verified_by INTEGER REFERENCES users(id)
);

-- Create evidence files table
CREATE TABLE IF NOT EXISTS evidence_files (
    id SERIAL PRIMARY KEY,
    complaint_id INTEGER REFERENCES complaints(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size INTEGER NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create case updates/notes table
CREATE TABLE IF NOT EXISTS case_updates (
    id SERIAL PRIMARY KEY,
    complaint_id INTEGER REFERENCES complaints(id) ON DELETE CASCADE,
    updated_by INTEGER REFERENCES users(id),
    update_type VARCHAR(30) NOT NULL CHECK (update_type IN ('status_change', 'note', 'assignment', 'verification')),
    old_value VARCHAR(100),
    new_value VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table for session management
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Create audit log table for security
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(50),
    record_id INTEGER,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_complaints_complaint_id ON complaints(complaint_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_priority ON complaints(priority);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at);
CREATE INDEX IF NOT EXISTS idx_complaints_assigned_officer ON complaints(assigned_officer_id);
CREATE INDEX IF NOT EXISTS idx_case_updates_complaint_id ON case_updates(complaint_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON complaints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate complaint ID
CREATE OR REPLACE FUNCTION generate_complaint_id()
RETURNS TRIGGER AS $$
DECLARE
    year_part VARCHAR(4);
    sequence_num INTEGER;
    new_id VARCHAR(20);
BEGIN
    year_part := EXTRACT(YEAR FROM CURRENT_DATE)::VARCHAR;
    
    -- Get the next sequence number for this year
    SELECT COALESCE(MAX(CAST(SUBSTRING(complaint_id FROM 10) AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM complaints
    WHERE complaint_id LIKE 'ADU-' || year_part || '-%';
    
    -- Format: ADU-YYYY-XXX
    new_id := 'ADU-' || year_part || '-' || LPAD(sequence_num::VARCHAR, 3, '0');
    
    NEW.complaint_id := new_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-generating complaint ID
CREATE TRIGGER generate_complaint_id_trigger
    BEFORE INSERT ON complaints
    FOR EACH ROW
    WHEN (NEW.complaint_id IS NULL)
    EXECUTE FUNCTION generate_complaint_id();

-- Insert default admin user (password should be hashed in production)
INSERT INTO users (username, email, password_hash, role, full_name, phone) 
VALUES (
    'admin',
    'admin@dp3ak.jatimprov.go.id',
    '$2b$10$rQZ8qVqQqQqQqQqQqQqQqOqQqQqQqQqQqQqQqQqQqQqQqQqQqQqQq', -- This should be properly hashed
    'admin',
    'Administrator DP3AK',
    '031-123-4567'
) ON CONFLICT (username) DO NOTHING;

-- Insert sample officers
INSERT INTO users (username, email, password_hash, role, full_name, phone) 
VALUES 
    ('sarah.wijaya', 'sarah.wijaya@dp3ak.jatimprov.go.id', '$2b$10$hashedpassword1', 'officer', 'Dr. Sarah Wijaya', '031-123-4568'),
    ('fitri.handayani', 'fitri.handayani@dp3ak.jatimprov.go.id', '$2b$10$hashedpassword2', 'officer', 'Dra. Fitri Handayani', '031-123-4569')
ON CONFLICT (username) DO NOTHING;

COMMENT ON TABLE complaints IS 'Main table storing all domestic violence complaint cases';
COMMENT ON TABLE evidence_files IS 'Stores file attachments and evidence for complaints';
COMMENT ON TABLE case_updates IS 'Tracks all updates and status changes for complaints';
COMMENT ON TABLE user_sessions IS 'Manages user authentication sessions';
COMMENT ON TABLE audit_logs IS 'Security audit trail for all system activities';
