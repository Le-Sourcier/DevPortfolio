const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
const cvDir = path.join(uploadsDir, 'cv');
const coverLetterDir = path.join(uploadsDir, 'cover-letters');

[uploadsDir, cvDir, coverLetterDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'cv') {
      cb(null, cvDir);
    } else if (file.fieldname === 'coverLetter') {
      cb(null, coverLetterDir);
    } else {
      cb(null, uploadsDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();
    cb(null, `${file.fieldname}-${name}-${uniqueSuffix}${ext}`);
  }
});

// File filter - Only allow certain file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé. Formats acceptés: PDF, DOC, DOCX, TXT'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  }
});

// Middleware for handling application files
exports.uploadApplicationFiles = upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 }
]);

// Middleware for handling single CV
exports.uploadCV = upload.single('cv');

// Error handling middleware
exports.handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: true,
        message: 'FILE_TOO_LARGE',
        details: 'La taille du fichier ne doit pas dépasser 5MB'
      });
    }
    return res.status(400).json({
      error: true,
      message: 'UPLOAD_ERROR',
      details: err.message
    });
  } else if (err) {
    return res.status(400).json({
      error: true,
      message: 'UPLOAD_ERROR',
      details: err.message
    });
  }
  next();
};
