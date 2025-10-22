import React, { useRef, useState } from "react";
import { Box, Typography, Button, Container, Paper, Fade, CircularProgress } from "@mui/material";

const App: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [htmlContent, setHtmlContent] = useState<string | null>(null);

    //handling the submit button
    const handleSubmit = async () => {
        if (!selectedFile) return;
        setLoading(true);
        setHtmlContent(null);

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await fetch("https://backend-pdf2html.onrender.com/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (!data.html) throw new Error("No HTML returned");
            setHtmlContent(data.html);
            setLoading(false);

        } catch (err: unknown) {
            setLoading(false);
            if (err instanceof Error) {
                alert("Error: " + err.message);
            } else {
                alert("Error: " + String(err));
            }
        }
    };




    //handling the dropping.
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        //just in case other buttons are also called. Blocking the issue of it.
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    //handling the draging on the top
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };


    //handling the drag and leave
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleBoxClick = () => {
        //click the box and turn on the file
        inputRef.current?.click();
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FFF5F2 0%, #FED7CF 50%, #FFEBE8 100%)',
            py: 4
        }}>
            {loading && (
                <Fade in={loading}>
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(10px)",
                            zIndex: 9999,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <CircularProgress size={80} sx={{ mb: 3, color: '#e34e24' }} />
                        <Typography variant="h4" sx={{ color: '#e34e24', fontWeight: 'bold' }}>
                            Processing your PDF...
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, color: '#8B4513' }}>
                            Converting your document with precision
                        </Typography>
                    </Box>
                </Fade>
            )}
            
            <Container maxWidth="lg">
                <Fade in={true} timeout={1000}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 'bold',
                                color: '#2D1B1B',
                                mb: 2,
                                textShadow: '2px 2px 4px rgba(227,78,36,0.1)',
                                fontSize: { xs: '2.5rem', md: '3.75rem' }
                            }}
                        >
                            PDF to HTML Converter
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#8B4513',
                                fontWeight: 300,
                                fontSize: { xs: '1rem', md: '1.25rem' },
                                mb: 1
                            }}
                        >
                            Professional document conversion services
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#A0522D',
                                mt: 2,
                                fontSize: '0.9rem'
                            }}
                        >
                            Contact cho.yoonho023@gmail.com for access
                        </Typography>
                    </Box>
                </Fade>

                <Fade in={true} timeout={1500}>
                    <Paper
                        elevation={12}
                        sx={{
                            borderRadius: 4,
                            overflow: 'hidden',
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(227,78,36,0.2)',
                            boxShadow: '0 20px 40px rgba(227,78,36,0.15)'
                        }}
                    >
                        <Box
                            id="dragContainer"
                            sx={{
                                p: 6,
                                minHeight: 320,
                                border: `3px dashed ${dragActive ? '#e34e24' : 'rgba(227,78,36,0.4)'}`,
                                borderRadius: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                background: dragActive 
                                    ? "linear-gradient(45deg, rgba(227,78,36,0.08), rgba(255,69,0,0.08))" 
                                    : "transparent",
                                cursor: "pointer",
                                m: 3,
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: dragActive ? 'scale(1.02)' : 'scale(1)',
                                '&:hover': {
                                    transform: 'scale(1.01)',
                                    borderColor: '#e34e24',
                                    background: "linear-gradient(45deg, rgba(227,78,36,0.05), rgba(255,69,0,0.05))"
                                }
                            }}
                            onClick={handleBoxClick}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                accept=".pdf"
                                hidden
                                onChange={handleFileChange}
                            />
                            
                            {!selectedFile ? (
                                <>
                                    <Box
                                        sx={{
                                            width: 110,
                                            height: 110,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(45deg, #e34e24, #FF6347)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 3,
                                            animation: dragActive ? 'pulse 2s infinite' : 'none',
                                            boxShadow: '0 12px 40px rgba(227,78,36,0.3)',
                                            '@keyframes pulse': {
                                                '0%': { transform: 'scale(1)', boxShadow: '0 12px 40px rgba(227,78,36,0.3)' },
                                                '50%': { transform: 'scale(1.1)', boxShadow: '0 15px 50px rgba(227,78,36,0.5)' },
                                                '100%': { transform: 'scale(1)', boxShadow: '0 12px 40px rgba(227,78,36,0.3)' }
                                            }
                                        }}
                                    >
                                        <Box sx={{ 
                                            width: 60, 
                                            height: 60, 
                                            backgroundColor: 'white', 
                                            borderRadius: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Typography sx={{ fontSize: '1.5rem', color: '#e34e24', fontWeight: 'bold' }}>
                                                PDF
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            color: '#e34e24', 
                                            fontWeight: 'bold', 
                                            mb: 2,
                                            textAlign: 'center'
                                        }}
                                    >
                                        Upload your PDF document
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            color: '#8B4513', 
                                            mb: 4,
                                            textAlign: 'center',
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        Drag and drop your file here, or click to browse
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        size="large"
                                        sx={{
                                            background: 'linear-gradient(45deg, #e34e24, #FF6347)',
                                            borderRadius: 3,
                                            px: 5,
                                            py: 2,
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            boxShadow: '0 8px 32px rgba(227,78,36,0.4)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #d63916, #e34e24)',
                                                transform: 'translateY(-3px)',
                                                boxShadow: '0 15px 45px rgba(227,78,36,0.5)'
                                            },
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                        onClick={handleBoxClick}
                                    >
                                        Select PDF File
                                    </Button>
                                </>
                            ) : (
                                <Fade in={!!selectedFile}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 120,
                                                height: 120,
                                                borderRadius: 3,
                                                background: 'linear-gradient(45deg, #228B22, #32CD32)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 3,
                                                mx: 'auto',
                                                boxShadow: '0 12px 40px rgba(34,139,34,0.3)'
                                            }}
                                        >
                                            <Box sx={{ 
                                                width: 70, 
                                                height: 70, 
                                                backgroundColor: 'white', 
                                                borderRadius: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Typography sx={{ fontSize: '1.2rem', color: '#228B22', fontWeight: 'bold' }}>
                                                    ✓
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: '#228B22',
                                                fontWeight: 'bold',
                                                mb: 2
                                            }}
                                        >
                                            File Ready for Processing
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#8B4513',
                                                mb: 4,
                                                wordBreak: 'break-word',
                                                fontWeight: 500,
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            <strong>{selectedFile.name}</strong>
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                                            <Button
                                                variant="outlined"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedFile(null);
                                                }}
                                                sx={{
                                                    borderColor: '#e34e24',
                                                    color: '#e34e24',
                                                    borderRadius: 2,
                                                    px: 4,
                                                    py: 1.5,
                                                    fontSize: '1rem',
                                                    fontWeight: 'bold',
                                                    '&:hover': {
                                                        borderColor: '#d63916',
                                                        background: 'rgba(227,78,36,0.05)',
                                                        transform: 'translateY(-2px)'
                                                    },
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                Change File
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSubmit();
                                                }}
                                                sx={{
                                                    background: 'linear-gradient(45deg, #e34e24, #FF6347)',
                                                    borderRadius: 2,
                                                    px: 5,
                                                    py: 2,
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    textTransform: 'none',
                                                    boxShadow: '0 8px 32px rgba(227,78,36,0.4)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #d63916, #e34e24)',
                                                        transform: 'translateY(-3px)',
                                                        boxShadow: '0 15px 45px rgba(227,78,36,0.5)'
                                                    },
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                                }}
                                            >
                                                Convert to HTML
                                            </Button>
                                        </Box>
                                    </Box>
                                </Fade>
                            )}
                        </Box>
                    </Paper>
                </Fade>

                {htmlContent && (
                    <Fade in={!!htmlContent} timeout={1000}>
                        <Paper
                            elevation={12}
                            sx={{
                                mt: 4,
                                borderRadius: 4,
                                overflow: 'hidden',
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(227,78,36,0.2)',
                                boxShadow: '0 20px 40px rgba(227,78,36,0.15)'
                            }}
                        >
                            <Box sx={{ 
                                p: 4, 
                                borderBottom: '2px solid rgba(227,78,36,0.1)',
                                background: 'linear-gradient(90deg, rgba(227,78,36,0.05), rgba(255,99,71,0.05))'
                            }}>
                                <Typography 
                                    variant="h4" 
                                    sx={{ 
                                        color: '#e34e24', 
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        mb: 1
                                    }}
                                >
                                    Conversion Complete
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#8B4513', fontSize: '1.1rem' }}>
                                    Your PDF has been successfully converted to HTML
                                </Typography>
                            </Box>
                            <Box sx={{
                                maxHeight: "70vh",
                                overflow: "auto",
                                bgcolor: "#FFFAF9",
                                m: 3,
                                borderRadius: 3,
                                border: '2px solid rgba(227,78,36,0.1)',
                                position: 'relative'
                            }}>
                                <Box sx={{
                                    position: 'sticky',
                                    top: 0,
                                    bgcolor: '#FFF5F2',
                                    px: 4,
                                    py: 3,
                                    borderBottom: '2px solid rgba(227,78,36,0.1)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    zIndex: 1
                                }}>
                                    <Typography sx={{ 
                                        color: '#2D1B1B', 
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem'
                                    }}>
                                        HTML Output
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            navigator.clipboard.writeText(htmlContent);
                                        }}
                                        sx={{
                                            color: '#228B22',
                                            borderColor: '#228B22',
                                            fontSize: '0.85rem',
                                            fontWeight: 'bold',
                                            '&:hover': {
                                                borderColor: '#006400',
                                                background: 'rgba(34,139,34,0.1)',
                                                transform: 'translateY(-1px)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Copy HTML
                                    </Button>
                                </Box>
                                <Box sx={{ p: 4 }}>
                                    <pre style={{ 
                                        whiteSpace: "pre-wrap", 
                                        wordBreak: "break-word",
                                        color: "#2D1B1B",
                                        fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', monospace",
                                        fontSize: "14px",
                                        lineHeight: 1.6,
                                        margin: 0,
                                        background: 'transparent'
                                    }}>
                                        {htmlContent}
                                    </pre>
                                </Box>
                            </Box>
                        </Paper>
                    </Fade>
                )}
            </Container>
        </Box>
    );
};

export default App;

