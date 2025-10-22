# PDF2HTML Converter - Frontend

[![Live Demo](https://img.shields.io/badge/Live%20Demo-frontend--pdf2html.vercel.app-brightgreen)](https://frontend-pdf2html.vercel.app/)
[![Backend Repository](https://img.shields.io/badge/Backend-GitHub-blue)](https://github.com/0GhOsTO/backend-pdf2html)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, responsive web application for converting PDF documents to HTML format using advanced OCR and document analysis technology.

## 🌟 Features

- **Drag & Drop Interface**: Intuitive file upload with drag-and-drop support
- **Real-time Processing**: Live progress indicators during conversion
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Material-UI Components**: Modern, accessible user interface
- **Error Handling**: Comprehensive error management and user feedback
- **File Validation**: Automatic PDF file type validation
- **Copy to Clipboard**: Easy HTML output copying functionality

## 🚀 Live Demo

Visit the live application: **[https://frontend-pdf2html.vercel.app/](https://frontend-pdf2html.vercel.app/)**

> **Note**: The service is currently configured with usage limits to manage AWS costs. Contact cho.yoonho023@gmail.com for access.

## 🛠️ Technology Stack

- **Framework**: React 19.1.0 with TypeScript
- **UI Library**: Material-UI (MUI) 7.3.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Emotion (CSS-in-JS)
- **Deployment**: Vercel
- **Backend**: Python Flask + AWS Services

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/0GhOsTO/frontend-pdf2html.git
   cd frontend-pdf2html
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
frontend-pdf2html/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   └── assets/          # Static assets
├── public/              # Public static files
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
└── README.md           # This file
```

## 🎯 Usage

1. **Upload PDF**: Click "Select PDF File" or drag & drop a PDF onto the upload area
2. **Convert**: Click "Convert to HTML" to start the processing
3. **View Results**: The converted HTML will be displayed in a formatted preview
4. **Copy Output**: Use the "Copy HTML" button to copy the converted code

## 🔗 API Integration

The frontend communicates with the backend API deployed on Render:
- **Backend URL**: `https://backend-pdf2html.onrender.com`
- **Endpoint**: `POST /upload`
- **Backend Repository**: [backend-pdf2html](https://github.com/0GhOsTO/backend-pdf2html)

## 🎨 Features in Detail

### User Interface
- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Loading States**: Animated loading indicators during processing
- **Responsive Layout**: Optimized for all screen sizes
- **Accessibility**: ARIA labels and keyboard navigation support

### File Handling
- **Multiple Upload Methods**: Drag-and-drop or button click
- **File Type Validation**: Accepts only PDF files
- **File Size Limits**: Configured for optimal performance
- **Error Feedback**: Clear error messages for invalid uploads

### Processing Workflow
1. File validation and upload
2. Backend processing with AWS Textract
3. Real-time progress tracking
4. HTML output generation and display

## 🚧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style

The project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** for code formatting (recommended)

## 🔄 Recent Updates

- ✅ Fixed double file dialog issue
- ✅ Added memory optimization for large files
- ✅ Improved error handling and user feedback
- ✅ Enhanced responsive design
- ✅ Added copy-to-clipboard functionality

## 🐛 Known Issues & Limitations

- **File Size**: Recommended maximum file size is 10MB
- **Page Limit**: Processing limited to 10 pages per PDF for performance
- **AWS Costs**: Service usage is monitored to manage cloud costs

## 🚀 Future Enhancements

- [ ] Batch file processing
- [ ] Advanced PDF parsing options
- [ ] Custom styling options for HTML output
- [ ] Progress tracking improvements
- [ ] Download functionality for converted files
- [ ] User authentication system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

**Andrew Cho**
- Email: cho.yoonho023@gmail.com
- GitHub: [@0GhOsTO](https://github.com/0GhOsTO)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- AWS Textract for document analysis
- Material-UI for the component library
- Vercel for hosting and deployment
- React community for excellent documentation

